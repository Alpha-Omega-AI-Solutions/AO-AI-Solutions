import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'

const team = [
  {
    name:     'Michael Smith',
    title:    'AI Systems Engineer · Founder',
    bio:      'Designs full-stack AI infrastructure, automation pipelines, and the backend intelligence behind every Smart Site.',
    initials: 'MS',
    email:    'michael.smith@aoaisolutions.dev',
  },
]

export default function Team() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [biosRef,   biosVisible]   = useScrollReveal()

  return (
    <section
      id="team"
      aria-label="Meet the founders of AO AI Solutions"
      className="section-pad"
      style={{ backgroundColor: '#F7F9FF' }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <div ref={headerRef} className="text-center mb-14">
          <p className="font-dm font-medium tracking-widest uppercase text-sm text-ao-gold mb-3" style={revealStyle(headerVisible)}>
            Our Team
          </p>
          <h2
            className="font-heading font-bold text-ao-dark mb-4"
            style={{
              fontSize: 'clamp(34px, 4.5vw, 52px)',
              ...revealStyle(headerVisible, 60),
            }}
          >
            Built by AI Engineers,<br className="hidden sm:block" /> Not Web Designers
          </h2>
          <p
            className="font-dm font-light text-ao-gray max-w-lg mx-auto"
            style={{ fontSize: '17px', ...revealStyle(headerVisible, 100) }}
          >
            We don't just build websites. We engineer intelligent business systems.
          </p>
        </div>

        {/* Founder bio cards */}
        <div ref={biosRef} className="grid grid-cols-1 gap-5 max-w-md mx-auto">
          {team.map((person, i) => (
            <div
              key={person.name}
              className="rounded-xl p-6 bg-white"
              style={{
                border: '1px solid rgba(122,156,255,0.18)',
                boxShadow: '0 2px 16px rgba(122,156,255,0.08)',
                opacity: biosVisible ? 1 : 0,
                transform: biosVisible ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms`,
                willChange: 'opacity, transform',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-ao-blue-start/20"
                  aria-hidden="true"
                  style={{ border: '1px solid rgba(212,175,55,0.3)' }}
                >
                  <span className="font-dm font-medium text-ao-gold" style={{ fontSize: '13px' }}>
                    {person.initials}
                  </span>
                </div>
                <div>
                  <div className="font-heading font-bold text-ao-dark" style={{ fontSize: '16px' }}>
                    {person.name}
                  </div>
                  <div className="font-dm text-xs text-ao-gold mt-0.5">{person.title}</div>
                </div>
              </div>
              <p className="font-dm font-light text-ao-gray leading-relaxed" style={{ fontSize: '14px' }}>
                {person.bio}
              </p>
              <a
                href={`mailto:${person.email}`}
                className="font-dm text-xs text-ao-gold hover:text-ao-gold-light transition-colors duration-200 mt-3 inline-block"
              >
                {person.email}
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
