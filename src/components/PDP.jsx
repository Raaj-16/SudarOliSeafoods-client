import { useState } from 'react'
import ProductIcon from './ProductIcon.jsx'
import ProductCard from './ProductCard.jsx'
import { PRODUCTS, stockStatus, stockLabel, CAT_LABEL } from '../data/products.js'

export default function PDP({ productId, onBackHome, onBackShop, onOpenPDP, onAddToCart, onBuyOnWhatsapp }) {
  const p = PRODUCTS.find((x) => x.id === productId)
  const [weightIdx, setWeightIdx] = useState(0)
  const [qty, setQty] = useState(1)
  const [openAcc, setOpenAcc] = useState([true, false, false])
  const [notifyValue, setNotifyValue] = useState('')
  const [notifySubmitted, setNotifySubmitted] = useState(false)

  if (!p) return null

  const s = stockStatus(p)
  const price = p.weights[weightIdx].price
  const total = price * qty

  function changeQty(delta) {
    const max = Math.min(p.stockQty, 20) || 1
    setQty((q) => Math.max(1, Math.min(max, q + delta)))
  }

  function toggleAcc(i) {
    setOpenAcc((arr) => arr.map((v, idx) => (idx === i ? !v : v)))
  }

  function submitNotify(e) {
    e.preventDefault()
    if (!notifyValue.trim()) return
    setNotifySubmitted(true)
  }

  const related = PRODUCTS.filter((x) => x.id !== p.id && x.cat === p.cat).slice(0, 4)
  const relatedList = related.length ? related : PRODUCTS.filter((x) => x.id !== p.id).slice(0, 4)

  const accItems = [
    {
      title: 'Storage & shelf life',
      body: 'Keep Away from refrigerator or keep in an airtight container away from moisture. Best used within 3 months of purchase for full flavour. Sun-dried fish naturally intensifies in saltiness over time — a light rinse before cooking is recommended.',
    },
    {
      title: 'Delivery & packaging',
      body: 'Vacuum-sealed in food-grade pouches to control odour in transit. Chennai orders placed before 3 PM are delivered the same day. Other Tamil Nadu districts: 2–3 working days.',
    },
    {
      title: "Where it's from",
      body: 'Sourced weekly from fishing families along the Tamil Nadu coast. Batches are seasonal — availability shifts with the catch, weather and drying time, which is why some weeks a variety may run low or sell out.',
    },
  ]

  return (
    <div id="view-pdp">
      <div className="wrap" style={{ paddingTop: 26 }}>
        <div className="breadcrumb">
          <button onClick={onBackHome}>Home</button> /{' '}
          <button onClick={onBackShop}>Shop</button> / <span>{p.name}</span>
        </div>

        <div className="pdp-grid">
          {/* Gallery */}
          <div>
            <div className="pdp-gallery-main">
              <span className={`badge ${s}`}>{stockLabel(p)}</span>
              <ProductIcon icon={p.icon} image={p.image} alt={p.name} viewBox="0 0 120 80" />
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="pdp-local">{p.local}</div>
            <h1 className="pdp-title">{p.name}</h1>
            <div className="pdp-meta-row">
              <div className="stars">
                ★★★★☆ <span style={{ color: 'var(--ink-soft)', fontSize: 12.5 }}>(126 orders)</span>
              </div>
              <span style={{ color: 'var(--line)' }}>|</span>
              <span style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>{CAT_LABEL[p.cat]}</span>
            </div>
            <p className="pdp-desc">
              {p.desc} Sourced and salted within a day of landing, then dried on open racks for a natural,
              additive-free finish.
            </p>

            {/* Stock status */}
            <div className="stock-panel">
              {s === 'ok' && (
                <>
                  <div className="stock-row">
                    <span className="dot ok"></span>In stock — ready to pack
                  </div>
                  <div className="stock-sub">{p.stockQty} units currently on hand at our Chennai store.</div>
                </>
              )}
              {s === 'low' && (
                <>
                  <div className="stock-row">
                    <span className="dot low"></span>Low stock — only {p.stockQty} left
                  </div>
                  <div className="stock-sub">This batch is almost out. Next drying run is expected in 4–5 days.</div>
                </>
              )}
              {s === 'out' && (
                <>
                  <div className="stock-row">
                    <span className="dot out"></span>Sold out
                  </div>
                  <div className="stock-sub">
                    This variety is off the rack for now — the next batch is being salted. Ask us to notify you
                    below.
                  </div>
                </>
              )}
            </div>

            {/* Weight / price selector */}
            <div className="weight-select">
              <div className="label">Choose weight</div>
              <div className="weight-opts">
                {p.weights.map((w, i) => (
                  <button
                    key={w.label}
                    className={`wopt${i === weightIdx ? ' active' : ''}`}
                    disabled={s === 'out'}
                    onClick={() => setWeightIdx(i)}
                  >
                    <span className="g">{w.label}</span>
                    <span className="p">₹{w.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + total */}
            <div className="qty-row" style={s === 'out' ? { opacity: 0.35, pointerEvents: 'none' } : undefined}>
              <div className="stepper">
                <button aria-label="Decrease quantity" onClick={() => changeQty(-1)}>
                  −
                </button>
                <div className="val">{qty}</div>
                <button aria-label="Increase quantity" onClick={() => changeQty(1)}>
                  +
                </button>
              </div>
              <div className="total-line">
                Total: <b>₹{total.toLocaleString('en-IN')}</b>
              </div>
            </div>

            <div className="pdp-actions">
              <button
                className="btn btn-primary btn-block"
                style={{ flex: 1 }}
                disabled={s === 'out'}
                onClick={() => onAddToCart(p, p.weights[weightIdx], qty)}
              >
                {s === 'out' ? 'Sold out' : 'Add to cart'}
              </button>
              <button className="btn btn-outline" onClick={() => onBuyOnWhatsapp(p, p.weights[weightIdx], qty)}>
                Order on WhatsApp
              </button>
            </div>

            {/* Notify me */}
            {s === 'out' && (
              <div className="notify-box">
                <h4>Out of stock right now</h4>
                <p>Leave your WhatsApp number or email — we'll message you the moment this batch is back on the rack.</p>
                {!notifySubmitted && (
                  <form className="notify-form" onSubmit={submitNotify}>
                    <input
                      type="text"
                      placeholder="Phone or email"
                      required
                      value={notifyValue}
                      onChange={(e) => setNotifyValue(e.target.value)}
                    />
                    <button type="submit" className="btn btn-rust btn-sm">
                      Notify me
                    </button>
                  </form>
                )}
                <div className="notify-confirm" style={{ display: notifySubmitted ? 'flex' : 'none' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3E6B4F" strokeWidth="2.5">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>
                    We'll message {notifyValue} the moment {p.name} is back.
                  </span>
                </div>
              </div>
            )}

            {/* Accordion */}
            <div className="accordion">
              {accItems.map((item, i) => (
                <div className={`acc-item${openAcc[i] ? ' open' : ''}`} key={item.title}>
                  <button className="acc-head" onClick={() => toggleAcc(i)}>
                    {item.title} <span className="plus">+</span>
                  </button>
                  <div className="acc-body">{item.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="related-strip">
          <h3 style={{ fontSize: 20, marginBottom: 16 }}>You may also like</h3>
          <div className="grid">
            {relatedList.map((rp) => (
              <ProductCard key={rp.id} product={rp} onOpenPDP={onOpenPDP} />
            ))}
          </div>
        </div>
      </div>
      <div style={{ height: 50 }}></div>
    </div>
  )
}
