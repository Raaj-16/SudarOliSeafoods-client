import ProductIcon from './ProductIcon.jsx'
import { stockStatus, stockLabel, minPrice } from '../data/products.js'

export default function ProductCard({ product: p, onOpenPDP, isFavorite, onToggleFavorite }) {
  const s = stockStatus(p)

  return (
    <div className={`card${s === 'out' ? ' disabled' : ''}`}>
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
          className={`card-fav ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite(p.id)
          }}
          aria-label={isFavorite ? `Remove ${p.name} from favourites` : `Add ${p.name} to favourites`}
          title={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
        >
          {isFavorite ? '♥' : '♡'}
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
}
