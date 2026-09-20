import ProductIcon from './ProductIcon.jsx'
import { PRODUCTS, stockLabel, minPrice, stockStatus } from '../data/products.js'

export default function FavouritesPage({ favoriteIds, setFavoriteIds, onOpenPDP, onBackShop }) {
  const favProducts = PRODUCTS.filter((p) => favoriteIds.includes(p.id))

  function toggleFavorite(productId) {
    setFavoriteIds((prev) => prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId])
  }

  return (
    <section className="section" id="favourites-page">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2>Your favourites</h2>
            <p>Saved products from the shop, kept here for quick ordering.</p>
          </div>
          <button className="btn btn-outline btn-sm" onClick={onBackShop}>Shop</button>
        </div>

        {favProducts.length === 0 ? (
          <div className="cart-empty" style={{ maxWidth: 560, margin: '24px auto 0' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 21s-6.7-4.35-9.33-8.07C.74 10.76 2.12 5 7.12 5c2.12 0 3.4 1.15 4.88 2.8C13.48 6.15 14.76 5 16.88 5c5 0 6.38 5.76 4.45 7.93C18.7 16.65 12 21 12 21z" />
            </svg>
            <p>
              No favourites saved yet.
              <br />
              Tap the heart on any fish card to save it here.
            </p>
            <button className="btn btn-outline btn-sm" onClick={onBackShop}>Go to shop</button>
          </div>
        ) : (
          <div className="grid">
            {favProducts.map((p) => {
              const s = stockStatus(p)
              return (
                <div className={`card${s === 'out' ? ' disabled' : ''}`} key={p.id}>
                  <div className="card-img-wrap">
                    <button
                      className="card-img"
                      style={{ border: 'none', padding: 0, width: '100%', cursor: 'pointer' }}
                      onClick={() => onOpenPDP(p.id)}
                      aria-label={`View ${p.name}`}
                    >
                      <span className={`badge ${s}`}>{stockLabel(p)}</span>
                      <ProductIcon icon={p.icon} image={p.image} alt={p.name} />
                    </button>

                    <button
                      type="button"
                      className="card-fav active"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(p.id)
                      }}
                      aria-label={`Remove ${p.name} from favourites`}
                      title="Remove from favourites"
                    >
                      ♥
                    </button>
                  </div>

                  <div className="card-body">
                    <div className="local">{p.local}</div>
                    <h3>{p.name}</h3>
                    <div className="desc">{p.desc}</div>
                    <div className="card-foot">
                      <div className="price-from">
                        <span>From</span>₹{minPrice(p)}
                      </div>
                      <button className="view" onClick={() => onOpenPDP(p.id)}>
                        {s === 'out' ? 'View' : 'Select'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
