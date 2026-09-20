import ProductIcon from './ProductIcon.jsx'
import { PRODUCTS, stockStatus, minPrice } from '../data/products.js'

export default function Hero({ onShopClick, onAboutClick, onOpenPDP }) {
  const featured = PRODUCTS.filter((p) => stockStatus(p) !== 'out').slice(0, 6)

  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <div className="eyebrow">Tamil Nadu coast · Sun-dried this week</div>
          <h1>
            Salted by the sea,
            <br />
            <em>dried under our sun.</em>
          </h1>
          <p className="lead">
            Karuvadu sourced straight from Tamil Nadu fishing villages — cleaned, salted and sun-racked the
            traditional way, no cold storage shortcuts. Ordered today, packed today.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={onShopClick}>
              Shop the catch
            </button>
            <button className="btn btn-outline" onClick={onAboutClick}>
              How we dry it
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="n">25+</div>
              <div className="l">Years of industry experience</div>
            </div>
            <div className="stat">
              <div className="n">6+</div>
              <div className="l">Varieties in season</div>
            </div>
            <div className="stat">
              <div className="n">0°</div>
              <div className="l">Preservatives added</div>
            </div>
          </div>
        </div>

        {/* Signature element: the drying line */}
        <div
          className="line-rig"
          role="img"
          aria-label="Illustration of dry fish hanging on a line, as if drying in the sun"
        >
          <div className="rope"></div>
          <div className="peg-row">
            {featured.map((p) => (
              <div className="peg" key={p.id}></div>
            ))}
          </div>
          <div className="hang-strip">
            {featured.map((p) => (
              <button
                className="hang-card"
                style={{ border: 'none', cursor: 'pointer' }}
                key={p.id}
                onClick={() => onOpenPDP(p.id)}
                aria-label={`View ${p.name}`}
              >
                <div className="clip"></div>
                <div className="fish-ico">
                  <ProductIcon icon={p.icon} image={p.image} alt={p.name} />
                </div>
                <div className="name">{p.name}</div>
                <div className="tag-price">from ₹{minPrice(p)}</div>
              </button>
            ))}
          </div>
          <div className="rope"></div>
        </div>
      </div>
    </section>
  )
}
