import ProductIcon from './ProductIcon.jsx'

export default function CartDrawer({ open, cart, onClose, onRemove, onCheckout, onBrowse, onPayOnline }) {
  const subtotal = cart.reduce((a, c) => a + c.price * c.qty, 0)

  return (
    <>
      <div className={`overlay${open ? ' show' : ''}`} onClick={onClose}></div>
      <aside className={`drawer${open ? ' show' : ''}`} aria-label="Shopping cart">
        <div className="drawer-head">
          <h3>Your cart</h3>
          <button className="drawer-close" onClick={onClose} aria-label="Close cart">
            ×
          </button>
        </div>
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 8H6" />
                <circle cx="9" cy="21" r="1" />
                <circle cx="18" cy="21" r="1" />
              </svg>
              <p>
                Your cart is empty.
                <br />
                Head back to the rack and pick something out.
              </p>
              <button className="btn btn-outline btn-sm" onClick={onBrowse}>
                Shop dry fish
              </button>
            </div>
          ) : (
            cart.map((c, i) => (
              <div className="cart-item" key={i}>
                <div className="ci-img">
                  <ProductIcon icon={c.icon} image={c.image} alt={c.name} />
                </div>
                <div className="ci-info">
                  <div className="ci-name">{c.name}</div>
                  <div className="ci-meta">
                    {c.weight} · ₹{c.price} each
                  </div>
                  <div className="ci-row">
                    <span className="mono">Qty: {c.qty}</span>
                    <button className="ci-remove" onClick={() => onRemove(i)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="drawer-foot">
            <div className="subtotal-row">
              <span>Subtotal</span>
              <b>₹{subtotal.toLocaleString('en-IN')}</b>
            </div>
            <button className="btn btn-primary btn-block" onClick={onPayOnline} style={{ marginBottom: 10 }}>
              Pay online (UPI / Card)
            </button>
            <button className="btn btn-outline btn-block" onClick={onCheckout}>
              Checkout on WhatsApp
            </button>
            <div className="drawer-note">Delivery charge calculated on WhatsApp based on your pincode.</div>
          </div>
        )}
      </aside>
    </>
  )
}
