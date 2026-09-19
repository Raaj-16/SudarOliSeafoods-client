import { useState } from 'react'
import ProductCard from './ProductCard.jsx'
import { PRODUCTS } from '../data/products.js'

export default function Shop({ onOpenPDP }) {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const q = search.toLowerCase().trim()
  const list = PRODUCTS.filter((p) => {
    const matchCat = filter === 'all' || p.cat === filter
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.local.toLowerCase().includes(q)
    return matchCat && matchQ
  })

  return (
    <section className="section" id="shop">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2>Today's rack</h2>
            <p>Every batch shows real stock — what's sold out stays listed so you can ask us to notify you.</p>
          </div>
        </div>

        <div className="filters">
          <button className={`chip${filter === 'all' ? ' active' : ''}`} onClick={() => setFilter('all')}>
            All
          </button>
          <button className={`chip${filter === 'Raw' ? ' active' : ''}`} onClick={() => setFilter('Raw')}>
            Raw fish
          </button>
          <button className={`chip${filter === 'Cleaned' ? ' active' : ''}`} onClick={() => setFilter('Cleaned')}>
            Cleaned fish
          </button>
          <div className="search-box">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4A4436" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search dry fish…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid">
          {list.length ? (
            list.map((p) => <ProductCard key={p.id} product={p} onOpenPDP={onOpenPDP} />)
          ) : (
            <p style={{ color: 'var(--ink-soft)', padding: '20px 0' }}>
              No dry fish matches "{search}" — try another name.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
