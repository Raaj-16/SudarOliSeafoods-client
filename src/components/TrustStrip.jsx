export default function TrustStrip() {
  return (
    <div className="trust-strip">
      <div className="wrap trust-grid">
        <div className="trust-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
          </svg>
          <div>
            <div className="t">Sun-dried, not machine-dried</div>
            <div className="s">3–5 days on open racks</div>
          </div>
        </div>
        <div className="trust-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 15h11l2 4h3a2 2 0 0 0 2-2v-2H3v-2Z" />
            <circle cx="7" cy="18" r="2" />
            <circle cx="17" cy="18" r="2" />
            <path d="M6 9h10l2 6H4l2-6Z" />
          </svg>
          <div>
            <div className="t">Same-day delivery in Chennai before 3 PM</div>
            <div className="s">Other TN districts in 2–3 days</div>
          </div>
        </div>
        <div className="trust-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 10h18" />
          </svg>
          <div>
            <div className="t">UPI, COD & WhatsApp orders Available</div>
          </div>
        </div>
        <div className="trust-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1 3-6Z" />
          </svg>
          <div>
            <div className="t">FSSAI licensed</div>
            <div className="s">Lic. No. 22426246001221</div>
          </div>
        </div>
      </div>
    </div>
  )
}
