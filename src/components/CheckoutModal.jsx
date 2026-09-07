import { useState } from 'react'
import { payWithRazorpay } from '../utils/payments.js'

export default function CheckoutModal({ amount, items, onClose, onPaid, onError }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [localError, setLocalError] = useState('')

  function submit(e) {
    e.preventDefault()
    setLocalError('')
    setLoading(true)
    payWithRazorpay({
      amount,
      items,
      customer: { name: name.trim(), phone: phone.trim(), email: email.trim() },
      onSuccess: (result) => {
        setLoading(false)
        onPaid(result)
      },
      onError: (message) => {
        setLoading(false)
        setLocalError(message)
        onError?.(message)
      },
    })
  }

  return (
    <div className="overlay show" onClick={onClose} style={{ zIndex: 200 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'var(--salt)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius)',
          padding: 24,
          width: 'min(360px, 92vw)',
          boxShadow: 'var(--shadow)',
          zIndex: 201,
        }}
      >
        <h3 style={{ fontSize: 18, marginBottom: 4 }}>Pay ₹{amount.toLocaleString('en-IN')}</h3>
        <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginBottom: 16 }}>
          UPI, cards, netbanking &amp; wallets via Razorpay.
        </p>
        <form onSubmit={submit}>
          <div style={{ marginBottom: 10 }}>
            <input
              type="text"
              placeholder="Full name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <input
              type="tel"
              placeholder="Phone number"
              required
              pattern="[0-9]{10}"
              title="10-digit phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: 14 }}>
            <input
              type="email"
              placeholder="Email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>
          {localError && (
            <div style={{ color: 'var(--rust-deep)', fontSize: 12.5, marginBottom: 10 }}>{localError}</div>
          )}
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="button" className="btn btn-outline" onClick={onClose} style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ flex: 1 }}>
              {loading ? 'Opening…' : 'Pay now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  border: '1px solid var(--line)',
  borderRadius: 'var(--radius)',
  padding: '10px 12px',
  fontSize: 13.5,
  fontFamily: 'inherit',
  background: 'var(--sand)',
  color: 'var(--ink)',
}
