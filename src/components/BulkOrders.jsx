import { useMemo, useState } from 'react'
import { PRODUCTS } from '../data/products.js'
import ProductIcon from './ProductIcon.jsx'
import { WHATSAPP_NUMBER } from '../config.js'

const initialForm = {
  name: '',
  business: '',
  phone: '',
  location: '',
  notes: '',
}

const fishChoices = PRODUCTS.filter((product, index, arr) => {
  return arr.findIndex((item) => item.name === product.name) === index
}).slice(0, 8)

export default function BulkOrders({ onBackHome, onBackShop }) {
  const [form, setForm] = useState(initialForm)
  const [selectedFish, setSelectedFish] = useState([])

  const selectedDisplay = useMemo(() => {
    if (!selectedFish.length) return 'Select fish'
    return `${selectedFish.length} fish selected`
  }, [selectedFish])

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function toggleFish(product) {
    setSelectedFish((prev) => {
      const exists = prev.some((item) => item.product.id === product.id)
      if (exists) {
        return prev.filter((item) => item.product.id !== product.id)
      }
      return [...prev, { product, qtyKg: 2 }]
    })
  }

  function changeQty(productId, delta) {
    setSelectedFish((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, qtyKg: Math.max(2, item.qtyKg + delta) } : item,
      ),
    )
  }

  function submitBulkOrder(e) {
    e.preventDefault()

    if (!selectedFish.length) {
      window.alert('Please select at least one fish type before sending the bulk inquiry.')
      return
    }

    const lines = [
      'Hi Sudar Oli Dry Sea Foods, I would like to place a bulk / wholesale order.',
      '',
      `Name: ${form.name || 'Not provided'}`,
      `Business / restaurant: ${form.business || 'Not provided'}`,
      `Contact number: ${form.phone || 'Not provided'}`,
      `Fish selected: ${selectedFish.map((item) => `${item.product.name} (${item.qtyKg} kg)`).join(', ')}`,
      `Delivery location: ${form.location || 'Not provided'}`,
      `Notes: ${form.notes || 'None'}`,
    ]

    const message = lines.join('\n')
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div id="view-bulk">
      <div className="wrap" style={{ paddingTop: 26 }}>
        <div className="breadcrumb">
          <button onClick={onBackHome}>Home</button> / <button onClick={onBackShop}>Shop</button> / <span>Bulk Orders</span>
        </div>

        <section style={{ maxWidth: 760, marginBottom: 32 }}>
          <div className="eyebrow">Bulk / wholesale</div>
          <h1 style={{ fontSize: 'clamp(30px,4vw,44px)', lineHeight: 1.08 }}>
            Custom orders for restaurants, caterers and stores.
          </h1>
          <p className="lead" style={{ marginTop: 16 }}>
            Choose the fish you need, set the quantity in 2 kg steps and send the request directly to WhatsApp.
          </p>
        </section>

        <div className="bulk-layout">
          <form className="bulk-form" onSubmit={submitBulkOrder}>
            <div className="bulk-product-picker">
              <div className="label">Choose fish</div>
              <div className="bulk-grid">
                {fishChoices.map((product) => (
                  <button
                    type="button"
                    key={product.id}
                    className={`bulk-product${selectedFish.some((fish) => fish.product.id === product.id) ? ' active' : ''}`}
                    onClick={() => toggleFish(product)}
                  >
                    <span className="bulk-product-ico">
                      <ProductIcon icon={product.icon} image={product.image} alt={product.name} viewBox="0 0 120 80" />
                    </span>
                    <span className="bulk-product-name">{product.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bulk-qty-block">
              <div className="label">Selected fish quantities</div>
              <div className="bulk-selected">{selectedDisplay}</div>

              {selectedFish.length > 0 && (
                <div className="bulk-qty-list">
                  {selectedFish.map((item) => (
                    <div key={item.product.id} className="bulk-qty-item">
                      <div className="bulk-qty-name">{item.product.name}</div>
                      <div className="stepper bulk-stepper">
                        <button type="button" aria-label={`Decrease quantity for ${item.product.name}`} onClick={() => changeQty(item.product.id, -2)}>
                          −
                        </button>
                        <div className="val">{item.qtyKg} kg</div>
                        <button type="button" aria-label={`Increase quantity for ${item.product.name}`} onClick={() => changeQty(item.product.id, 2)}>
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <label>
              Name
              <input value={form.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Your name" />
            </label>

            <label>
              Business / restaurant
              <input
                value={form.business}
                onChange={(e) => updateField('business', e.target.value)}
                placeholder="Example: Hotel, canteen, retail store"
              />
            </label>

            <label>
              Contact number
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </label>

            <label>
              Delivery location
              <input
                value={form.location}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder="City / delivery pincode"
              />
            </label>

            <label>
              Notes
              <textarea
                rows="4"
                value={form.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                placeholder="Preferred delivery dates, packing needs, or any special request"
              />
            </label>

            <button type="submit" className="btn btn-primary btn-block">
              Send bulk inquiry on WhatsApp
            </button>
          </form>

          <aside className="bulk-side">
            <h3>Why bulk buyers choose us</h3>
            <ul>
              <li>Freshly landed and salted within hours</li>
              <li>Natural sun-dried batches without shortcuts</li>
              <li>Flexible quantities for restaurants, retailers and events</li>
              <li>Fast WhatsApp follow-up for pricing and delivery</li>
            </ul>
            <div className="bulk-callout">
              <strong>Need a quick answer?</strong>
              <p>Message us directly on WhatsApp and we’ll confirm availability the same day.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
