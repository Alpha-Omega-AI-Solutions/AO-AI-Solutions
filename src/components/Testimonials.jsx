import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'

const testimonials = [
  {
    quote:   "Within 30 days of launching our AI website, we were booking 3x more consultations. The system follows up with every lead automatically — it's like having a full-time receptionist that never sleeps.",
    name:    'Marcus T.',
    role:    'Managing Partner',
    company: 'Hendricks & Associates',
    initials:'MT',
  },
  {
    quote:   "I was skeptical at first, but our AI chatbot now handles 80% of our booking inquiries without any staff involvement. Revenue is up and my team can focus on actual patient care instead of answering the same questions all day.",
    name:    'Dr. Sarah L.',
    role:    'Owner & Lead Injector',
    company: 'Glow Medical Aesthetics',
    initials:'SL',
  },
  {
    quote:   "The after-hours lead capture alone paid for the entire system in the first month. We used to lose so many jobs because nobody could answer at 9pm. Now the AI books the appointment and sends a quote instantly.",
    name:    'Ryan P.',
    role:    'Operations Director',
    company: 'Premier Air Systems',
    initials:'RP',
  },
]

export default function Testimonials() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [cardsRef,  cardsVisible]  = useScrollReveal()

  return (
    <section id="testimonials" className="section-pad" style={{ backgroundColor: '#F7F9FF' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <p className="font-dm font-medium tracking-widest uppercase text-sm text-ao-gold mb-3" style={revealStyle(headerVisible)}>
            What Clients Say
          </p>
          <h2
            className="font-heading font-bold text-ao-dark mb-4"
            style={{
              fontSize: 'clamp(34px, 4.5vw, 52px)',
              ...revealStyle(headerVisible, 60),
            }}
          >
            Built on Trust.<br className="hidden sm:block" /> Proven by Results.
          </h2>
          <p
            className="font-dm font-light text-ao-gray max-w-lg mx-auto"
            style={{ fontSize: '17px', ...revealStyle(headerVisible, 120) }}
          >
            Hear from the business owners whose operations we've transformed with AI.
          </p>
        </div>

        {/* Testimonial cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl p-7 bg-white"
              style={{
                border: '1px solid rgba(122,156,255,0.18)',
                boxShadow: '0 2px 16px rgba(122,156,255,0.1)',
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease ${i * 110}ms, transform 0.6s ease ${i * 110}ms, box-shadow 0.3s ease`,
                willChange: 'opacity, transform',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(212,175,55,0.12)'
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 2px 16px rgba(122,156,255,0.1)'
                e.currentTarget.style.borderColor = 'rgba(122,156,255,0.18)'
              }}
            >
              {/* Gold quote mark */}
              <div className="font-heading text-ao-gold mb-4" style={{ fontSize: '56px', lineHeight: 1, opacity: 0.6 }}>
                "
              </div>

              {/* Quote text */}
              <p className="font-dm font-light text-ao-gray leading-relaxed flex-1 mb-7" style={{ fontSize: '15px' }}>
                "{t.quote}"
              </p>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill="#D4AF37">
                    <path d="M7 1l1.55 3.14L12 4.63l-2.5 2.44.59 3.43L7 8.77l-3.09 1.63.59-3.43L2 4.63l3.45-.49L7 1z" />
                  </svg>
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-dm font-medium text-sm text-ao-gold"
                  style={{
                    backgroundColor: 'rgba(201,217,255,0.4)',
                    border: '1px solid rgba(212,175,55,0.3)',
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-dm font-medium text-ao-dark" style={{ fontSize: '14px' }}>
                    {t.name}
                  </div>
                  <div className="font-dm font-light text-ao-gray text-xs">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
