import { API_BASE_URL, isSecureApiUrl } from '../config.js'

/**
 * Loads the Razorpay Checkout script if it isn't already on the page
 * (it's included via a <script> tag in index.html, but this is a safe
 * fallback in case that tag is ever removed or blocked).
 */
function ensureRazorpayLoaded() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve()
    const existing = document.querySelector('script[src*="checkout.razorpay.com"]')
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('Failed to load Razorpay script')))
      return
    }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Razorpay script'))
    document.body.appendChild(script)
  })
}

/**
 * Full pay flow: create-order on the backend -> open Razorpay Checkout ->
 * verify the payment signature on the backend -> report success/failure.
 *
 * @param {object} params
 * @param {number} params.amount - rupees (not paise)
 * @param {Array}  params.items - cart items, sent to the backend for the order record
 * @param {{name:string, phone:string, email?:string}} params.customer
 * @param {(result:{paymentId:string, orderId:string}) => void} params.onSuccess
 * @param {(message:string) => void} params.onError
 */
export async function payWithRazorpay({ amount, items = [], customer, onSuccess, onError }) {
  try {
    if (!customer?.name || !customer?.phone) {
      onError?.('Please enter your name and phone number.')
      return
    }

    if (!API_BASE_URL || !isSecureApiUrl()) {
      onError?.('Online payments are temporarily unavailable. Please contact us on WhatsApp.')
      return
    }

    if (!Number.isFinite(amount) || amount <= 0 || !Array.isArray(items) || items.length === 0) {
      onError?.('Your cart is empty or invalid. Please add an item and try again.')
      return
    }

    const normalizedPhone = customer.phone.replace(/\D/g, '')
    if (!/^\d{10}$/.test(normalizedPhone)) {
      onError?.('Please enter a valid 10-digit phone number.')
      return
    }

    if (customer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      onError?.('Please enter a valid email address or leave it blank.')
      return
    }

    const orderItems = items.map(({ id, weight, qty }) => ({ id, weight, qty }))
    const orderRes = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: orderItems,
        customer: { ...customer, phone: normalizedPhone },
      }),
    })
    const orderData = await orderRes.json().catch(() => ({}))
    if (!orderRes.ok || !orderData.ok) {
      onError?.(orderData.error || 'Could not start the payment. Please try again.')
      return
    }

    if (!orderData.keyId || !orderData.amount || !orderData.currency || !orderData.orderId) {
      onError?.('The payment service returned an incomplete order. Please try again.')
      return
    }

    await ensureRazorpayLoaded()

    const rzp = new window.Razorpay({
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      order_id: orderData.orderId,
      name: 'Sudar Oli Dry Sea Foods',
      description: 'Karuvadu order',
      prefill: {
        name: customer.name,
        contact: customer.phone,
        email: customer.email || undefined,
      },
      theme: { color: '#1F5C63' },
      modal: {
        ondismiss: () => onError?.('Payment cancelled.'),
      },
      handler: async (response) => {
        try {
          const verifyRes = await fetch(`${API_BASE_URL}/api/payment/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          })
          const verifyData = await verifyRes.json().catch(() => ({}))
          if (verifyRes.ok && verifyData.ok) {
            onSuccess?.({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
            })
          } else {
            onError?.('Payment could not be verified. If money was deducted, please contact us with your payment ID: ' + response.razorpay_payment_id)
          }
        } catch {
          onError?.('Payment made, but verification failed to reach our server. Please contact us with payment ID: ' + response.razorpay_payment_id)
        }
      },
    })

    rzp.on('payment.failed', (resp) => {
      onError?.(resp.error?.description || 'Payment failed. Please try again.')
    })

    rzp.open()
  } catch (err) {
    onError?.(err.message || 'Something went wrong starting the payment.')
  }
}
