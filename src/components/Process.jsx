const STEPS = [
  {
    n: '01',
    title: 'The catch comes in',
    body: 'Boats land at first light. We buy directly from crews along the Nagapattinam and Karaikal coast — nothing frozen, nothing held over from a previous day.',
    path: 'M6 30c8-14 26-18 36-8-6 10-20 14-30 10 5-6 6-12 2-18',
    path2: 'M6 30l4 8M40 22l4-6',
  },
  {
    n: '02',
    title: 'Cleaned within hours',
    body: "Fish is gutted, scaled and rinsed the same morning it's landed. Bigger fish like vanjaram and choora are cut into steaks at this stage.",
    path: 'M10 12h28l-4 24H14L10 12Z',
    path2: 'M16 12V8h16v4',
  },
  {
    n: '03',
    title: 'Hand-salted',
    body: 'Rock salt is rubbed in by hand at a ratio tuned to each fish — enough to preserve and season, not so much that it overpowers the cooking.',
    circles: true,
  },
  {
    n: '04',
    title: 'Racked in open sun',
    body: 'Laid out on bamboo racks and turned twice a day. Depending on the fish and the weather, this takes three to five days — no shortcuts, no machine dryers.',
    lines: true,
  },
  {
    n: '05',
    title: 'Packed & shipped',
    body: 'Sorted by weight, vacuum-sealed in food-grade pouches, and shipped out — Chennai orders the same evening, other Tamil Nadu districts in 2–3 days.',
    rect: true,
  },
]

function StepIcon({ step }) {
  if (step.circles) {
    return (
      <svg viewBox="0 0 48 48" fill="none" stroke="#1E3341" strokeWidth="2">
        <circle cx="24" cy="24" r="4" />
        <circle cx="14" cy="16" r="2" />
        <circle cx="34" cy="14" r="2" />
        <circle cx="16" cy="34" r="2" />
        <circle cx="34" cy="32" r="2" />
        <circle cx="24" cy="10" r="2" />
      </svg>
    )
  }
  if (step.lines) {
    return (
      <svg viewBox="0 0 48 48" fill="none" stroke="#1E3341" strokeWidth="2">
        <line x1="6" y1="14" x2="42" y2="14" />
        <line x1="6" y1="34" x2="42" y2="34" />
        <line x1="12" y1="14" x2="12" y2="34" />
        <line x1="20" y1="14" x2="20" y2="34" />
        <line x1="28" y1="14" x2="28" y2="34" />
        <line x1="36" y1="14" x2="36" y2="34" />
      </svg>
    )
  }
  if (step.rect) {
    return (
      <svg viewBox="0 0 48 48" fill="none" stroke="#1E3341" strokeWidth="2">
        <rect x="10" y="14" width="28" height="24" rx="2" />
        <path d="M10 22h28" />
        <path d="M18 14v-4h12v4" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="#1E3341" strokeWidth="2">
      <path d={step.path} />
      <path d={step.path2} />
    </svg>
  )
}

export default function Process({ onBackHome, onShopClick }) {
  return (
    <div id="view-process">
      <div className="wrap" style={{ paddingTop: 26 }}>
        <div className="breadcrumb">
          <button onClick={onBackHome}>Home</button> / <span>How We Dry It</span>
        </div>

        <section style={{ maxWidth: 720, marginBottom: 44 }}>
          <div className="eyebrow">Our process</div>
          <h1 style={{ fontSize: 'clamp(28px,4vw,42px)', lineHeight: 1.08 }}>
            From the boat to the rack, in one day.
          </h1>
          <p className="lead" style={{ marginTop: 16 }}>
            No chemical dryers, no bleaching agents, no cold-storage shortcuts. Every batch of Sudar Oli dry fish
            goes through the same five steps our families have used along the Nagapattinam coast for generations —
            which is also why some weeks a variety sells out rather than being restocked on demand.
          </p>
        </section>

        <div className="process-steps">
          {STEPS.map((step) => (
            <div className="pstep" key={step.n}>
              <div className="pstep-n">{step.n}</div>
              <div className="pstep-ico">
                <StepIcon step={step} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>

        <section
          style={{
            maxWidth: 720,
            margin: '50px 0',
            padding: 24,
            background: 'var(--sand-deep)',
            borderRadius: 'var(--radius)',
          }}
        >
          <h3 style={{ fontSize: 18, marginBottom: 10 }}>Why stock runs out sometimes</h3>
          <p style={{ color: 'var(--ink-soft)', fontSize: 14.5, lineHeight: 1.65 }}>
            Because everything here depends on the catch, the weather and a multi-day drying window, we never hold
            more stock than what actually comes off the racks. When a variety sells out on the shop page, it's
            genuinely out — not a pricing trick. Use the "Notify me" option on that product and we'll message you the
            moment the next batch is ready.
          </p>
        </section>

        <div style={{ marginBottom: 60 }}>
          <button className="btn btn-primary" onClick={onShopClick}>
            Shop today's rack
          </button>
        </div>
      </div>
    </div>
  )
}
