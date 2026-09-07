export default function About({ onSeeProcess }) {
  return (
    <section className="section" id="about" style={{ background: 'var(--sand-deep)' }}>
      <div className="wrap" style={{ maxWidth: 760 }}>
        <h2 style={{ fontSize: 26, marginBottom: 14 }}>From the drying yard to your kitchen</h2>
        <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7, fontSize: 15 }}>
          Sudar Oli works with fishing families along the Rameshwaram coast — cleaned, salted and sun-racked the
          traditional way, with no chemical dryers or bleaching agents. That's also why stock runs out some weeks
          rather than being backordered.
        </p>
        <button className="btn btn-outline" style={{ marginTop: 18 }} onClick={onSeeProcess}>
          See the full drying process →
        </button>
      </div>
    </section>
  )
}
