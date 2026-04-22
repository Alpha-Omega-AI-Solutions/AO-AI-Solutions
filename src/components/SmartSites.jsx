import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'

const capabilities = [
  {
    title: 'Responds to leads in real-time',
    desc: 'Every visitor inquiry gets an instant, intelligent AI response — day or night.',
  },
  {
    title: 'Generates and updates its own content',
    desc: 'Your site writes SEO blog posts, service descriptions, and FAQs automatically.',
  },
  {
    title: 'Adapts to each visitor\'s behavior',
    desc: 'Personalized layouts, offers, and copy based on how each user interacts.',
  },
  {
    title: 'Books appointments without human input',
    desc: 'AI-powered scheduling that syncs with your calendar and confirms instantly.',
  },
]

function MatrixGrid() {
  const cells = Array.from({ length: 48 })
  return (
    <div
      className="relative rounded-2xl overflow-hidden p-6"
      style={{
        background: 'linear-gradient(135deg, #C9D9FF 0%, #7A9CFF 100%)',
        border: '1px solid rgba(122,156,255,0.3)',
      }}
    >
      {/* Grid overlay */}
      <div className="grid grid-cols-8 gap-1.5 opacity-80">
        {cells.map((_, i) => (
          <div
            key={i}
            className="grid-cell rounded-sm aspect-square"
            style={{
              border: '1px solid rgba(212,175,55,0.12)',
              animationDelay: `${(i * 137) % 3000}ms`,
              animationDuration: `${2500 + (i * 97) % 2000}ms`,
            }}
          />
        ))}
      </div>

      {/* Center glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: '180px',
          height: '180px',
          background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)',
        }}
      />

      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className="text-center px-5 py-4 rounded-xl bg-white/90"
          style={{
            border: '1px solid rgba(212,175,55,0.3)',
            boxShadow: '0 4px 24px rgba(212,175,55,0.15)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="font-heading font-bold text-ao-gold mb-1" style={{ fontSize: '28px' }}>
            Smart Site
          </div>
          <div className="font-dm text-ao-gray text-xs">AI-native infrastructure</div>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {['AI', 'Auto', 'Live'].map(tag => (
              <span
                key={tag}
                className="font-dm text-[10px] px-2 py-0.5 rounded-full text-ao-gold"
                style={{ backgroundColor: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-4 left-4 w-4 h-4" style={{ borderTop: '2px solid rgba(212,175,55,0.5)', borderLeft: '2px solid rgba(212,175,55,0.5)' }} />
      <div className="absolute top-4 right-4 w-4 h-4" style={{ borderTop: '2px solid rgba(212,175,55,0.5)', borderRight: '2px solid rgba(212,175,55,0.5)' }} />
      <div className="absolute bottom-4 left-4 w-4 h-4" style={{ borderBottom: '2px solid rgba(212,175,55,0.5)', borderLeft: '2px solid rgba(212,175,55,0.5)' }} />
      <div className="absolute bottom-4 right-4 w-4 h-4" style={{ borderBottom: '2px solid rgba(212,175,55,0.5)', borderRight: '2px solid rgba(212,175,55,0.5)' }} />
    </div>
  )
}

export default function SmartSites() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [leftRef,   leftVisible]   = useScrollReveal()
  const [rightRef,  rightVisible]  = useScrollReveal()

  return (
    <section id="smart-sites" className="section-pad bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p className="font-dm font-medium tracking-widest uppercase text-sm text-ao-gold mb-3" style={revealStyle(headerVisible)}>
            Smart Sites
          </p>
          <h2
            className="font-heading font-bold text-ao-dark mb-4"
            style={{
              fontSize: 'clamp(34px, 4.5vw, 52px)',
              ...revealStyle(headerVisible),
            }}
          >
            The Future of Web Is Already Here
          </h2>
          <p
            className="font-dm font-light text-ao-gray max-w-xl mx-auto"
            style={{ fontSize: '17px', ...revealStyle(headerVisible, 100) }}
          >
            Smart Sites aren't websites. They're AI-native business infrastructure.
          </p>
        </div>

        {/* Split content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left — feature list */}
          <div ref={leftRef}>
            <ul className="flex flex-col gap-6">
              {capabilities.map((cap, i) => (
                <li
                  key={cap.title}
                  className="flex gap-4 items-start"
                  style={{
                    opacity: leftVisible ? 1 : 0,
                    transform: leftVisible ? 'translateX(0)' : 'translateX(-10px)',
                    transition: `opacity 0.55s ease ${i * 80}ms, transform 0.55s ease ${i * 80}ms`,
                    willChange: 'opacity, transform',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 bg-ao-blue-start/20"
                    style={{ border: '1px solid rgba(212,175,55,0.25)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7L5.5 10.5L12 3" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-ao-dark mb-1" style={{ fontSize: '16px' }}>
                      {cap.title}
                    </div>
                    <div className="font-dm font-light text-ao-gray leading-relaxed" style={{ fontSize: '14px' }}>
                      {cap.desc}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div style={{ opacity: leftVisible ? 1 : 0, transition: 'opacity 0.6s ease 500ms' }}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-dm font-medium text-sm text-ao-gold mt-10 px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                style={{ border: '1.5px solid #D4AF37' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(212,175,55,0.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                Get Early Access
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right — animated matrix visual */}
          <div ref={rightRef} style={revealStyle(rightVisible, 200)}>
            <MatrixGrid />
          </div>
        </div>
      </div>
    </section>
  )
}
