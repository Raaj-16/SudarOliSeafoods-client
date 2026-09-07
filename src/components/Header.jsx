import { useEffect, useRef, useState } from 'react'
import logo220 from '../assets/logo-220.png'
import ProductIcon from './ProductIcon.jsx'
import { PRODUCTS, stockLabel, minPrice } from '../data/products.js'

export default function Header({ view, onNavHome, onNavShop, onNavProcess, onNavContact, onOpenPDP, cartCount, onOpenCart }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const wrapRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    function onDocClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setSearchOpen(false)
    }
    function onKeyDown(e) {
      if (e.key === 'Escape') setSearchOpen(false)
    }
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  function toggleSearch() {
    const willShow = !searchOpen
    setSearchOpen(willShow)
    if (willShow) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }

  const q = query.toLowerCase().trim()
  const matches = q
    ? PRODUCTS.filter(
        (p) => p.name.toLowerCase().includes(q) || p.local.toLowerCase().includes(q) || p.cat.includes(q)
      )
    : []

  const navKey =
    view === 'pdp' || view === 'shop' ? 'shop' : view === 'process' ? 'process' : view === 'contact' ? 'contact' : 'home'

  return (
    <header className="site">
      <div className="header-inner">
        <a
          href="#"
          className="logo"
          onClick={(e) => {
            e.preventDefault()
            onNavHome()
          }}
        >
          <img className="logo-mark" src={logo220} alt="Sudar Oli Dry Sea Foods emblem" />
          <span className="logo-text">
            <span className="top">Sudar Oli</span>
            <span className="bottom"> Dry Sea Foods</span>
          </span>
        </a>

        <nav className="main-nav" aria-label="Primary">
          <button className={navKey === 'home' ? 'active' : ''} onClick={onNavHome}>
            Home
          </button>
          <button className={navKey === 'shop' ? 'active' : ''} onClick={onNavShop}>
            Shop
          </button>
          <button className={navKey === 'process' ? 'active' : ''} onClick={onNavProcess}>
            How We Dry
          </button>
          <button className={navKey === 'contact' ? 'active' : ''} onClick={onNavContact}>
            Contact
          </button>
        </nav>

        <div className="header-actions">
          <div className="header-search" ref={wrapRef}>
            <button
              className="icon-btn"
              aria-label="Search"
              aria-expanded={searchOpen}
              onClick={toggleSearch}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#221F1A" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <div className={`search-panel${searchOpen ? ' show' : ''}`}>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search karuvadu…"
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="search-results">
                {!q && <div className="sr-hint">Try "vanjaram", "nethili", "choora"…</div>}
                {q && matches.length === 0 && <div className="sr-empty">No dry fish matches "{q}".</div>}
                {q &&
                  matches.map((p) => (
                    <button
                      key={p.id}
                      className="sr-item"
                      onClick={() => {
                        setSearchOpen(false)
                        onOpenPDP(p.id)
                      }}
                    >
                      <span className="sr-ico">
                        <ProductIcon icon={p.icon} image={p.image} alt={p.name} />
                      </span>
                      <span>
                        <span className="sr-name" style={{ display: 'block' }}>
                          {p.name} — {stockLabel(p)}
                        </span>
                        <span className="sr-sub">
                          {p.local} · from ₹{minPrice(p)}
                        </span>
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <button className="icon-btn" aria-label="Open cart" onClick={onOpenCart}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#221F1A" strokeWidth="2">
              <path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 8H6" />
              <circle cx="9" cy="21" r="1" />
              <circle cx="18" cy="21" r="1" />
            </svg>
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
