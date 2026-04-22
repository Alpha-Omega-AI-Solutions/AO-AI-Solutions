import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'

const caseStudies = [
  {
    industry:    'Law Firm',
    badge:       '⚖️ Legal',
    client:      'Hendricks & Associates',
    headline:    '312% increase in qualified consultations',
    metric:      '312%',
    metricLabel: 'More Consultations',
    desc:        'Their AI assistant pre-qualifies every inquiry, answers common legal questions 24/7, and routes serious cases directly to attorneys — all before a human ever picks up the phone.',
  },
  {
    industry:    'Med Spa',
    badge:       '✨ Aesthetics',
    client:      'Glow Medical Aesthetics',
    headline:    '40+ appointments booked per week — zero staff involvement',
    metric:      '40+',
    metricLabel: 'Weekly Bookings',
    desc:        'Their AI books consultations, sends pre-appointment prep info, and follows up automatically with post-visit care instructions and rebooking prompts.',
  },
  {
    industry:    'HVAC',
    badge:       '🔧 Home Services',
    client:      'Premier Air Systems',
    headline:    'After-hours AI captured $280K in new annual revenue',
    metric:      '$280K',
    metricLabel: 'Revenue Recovered',
    desc:        "72% of their calls came after business hours. Their AI now captures every after-hours lead, schedules service visits, and sends instant quotes — turning missed calls into booked jobs.",
  },
]

export default function Results() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [cardsRef,  cardsVisible]  = useScrollReveal()

  return (
    <section id="results" className="section-pad bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <p className="font-dm font-medium tracking-widest uppercase text-sm text-ao-gold mb-3" style={revealStyle(headerVisible)}>
            Client Results
          </p>
          <h2
            className="font-heading font-bold text-ao-dark mb-4"
            style={{
              fontSize: 'clamp(34px, 4.5vw, 52px)',
              ...revealStyle(headerVisible, 60),
            }}
          >
            Real Businesses.<br className="hidden sm:block" /> Real Revenue.
          </h2>
          <p
            className="font-dm font-light text-ao-gray max-w-xl mx-auto"
            style={{ fontSize: '17px', ...revealStyle(headerVisible, 120) }}
          >
            These aren't demos. These are outcomes from systems we built and deployed.
          </p>
        </div>

        {/* Case study cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => (
            <div
              key={cs.client}
              className="relative flex flex-col rounded-2xl p-7 bg-white"
              style={{
                border: '1px solid rgba(122,156,255,0.18)',
                boxShadow: '0 2px 16px rgba(122,156,255,0.1)',
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms, box-shadow 0.3s ease, border-color 0.3s ease`,
                willChange: 'opacity, transform',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(212,175,55,0.12)'
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 2px 16px rgba(122,156,255,0.1)'
                e.currentTarget.style.borderColor = 'rgba(122,156,255,0.18)'
                e.currentTarget.style.transform = cardsVisible ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              {/* Industry badge */}
              <span
                className="inline-flex items-center gap-1.5 font-dm text-xs px-3 py-1.5 rounded-full mb-5 self-start text-ao-gray"
                style={{
                  backgroundColor: '#F7F9FF',
                  border: '1px solid #E6E8EF',
                }}
              >
                {cs.badge}
              </span>

              {/* Big metric */}
              <div
                className="font-heading font-bold text-ao-gold mb-1"
                style={{ fontSize: 'clamp(40px, 5vw, 56px)', lineHeight: 1 }}
              >
                {cs.metric}
              </div>
              <div className="font-dm text-sm text-ao-gray mb-5">{cs.metricLabel}</div>

              {/* Divider */}
              <div className="mb-5" style={{ height: '1px', backgroundColor: 'rgba(212,175,55,0.25)' }} />

              {/* Client name */}
              <div className="font-heading font-bold text-ao-dark mb-2" style={{ fontSize: '15px' }}>
                {cs.client}
              </div>

              {/* Description */}
              <p className="font-dm font-light text-ao-gray leading-relaxed flex-1" style={{ fontSize: '14px' }}>
                {cs.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
