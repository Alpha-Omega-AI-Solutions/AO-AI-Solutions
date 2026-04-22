import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'

const steps = [
  {
    number: '01',
    emoji: '🔨',
    title: 'Build',
    desc: 'We design and build your AI-powered website, trained on your business, services, and brand voice.',
  },
  {
    number: '02',
    emoji: '⚙️',
    title: 'Integrate',
    desc: 'We connect your AI chatbot, lead capture, CRM, SMS automation, and booking systems in one pipeline.',
  },
  {
    number: '03',
    emoji: '🚀',
    title: 'Launch & Scale',
    desc: 'Go live in days. Your AI system starts capturing leads and responding to customers immediately.',
  },
]

export default function HowItWorks() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [stepsRef,  stepsVisible]  = useScrollReveal()

  return (
    <section
      id="how-it-works"
      className="section-pad"
      style={{ background: 'linear-gradient(135deg, rgba(201,217,255,0.80) 0%, rgba(122,156,255,0.80) 100%)' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p className="font-dm font-medium tracking-widest uppercase text-sm text-ao-gold mb-3" style={revealStyle(headerVisible)}>
            The Process
          </p>
          <h2
            className="font-heading font-bold text-ao-dark mb-4"
            style={{
              fontSize: 'clamp(36px, 5vw, 52px)',
              ...revealStyle(headerVisible, 60),
            }}
          >
            From Zero to AI-Powered in Days
          </h2>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="relative">

          {/* Connecting dashed line — desktop only */}
          <div
            className="hidden lg:block absolute top-[44px] left-[calc(16.6%+20px)] right-[calc(16.6%+20px)] h-px"
            style={{
              borderTop: '2px dashed rgba(212,175,55,0.30)',
              opacity: stepsVisible ? 1 : 0,
              transition: 'opacity 0.8s ease 400ms',
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="flex flex-col items-center text-center lg:items-center"
                style={{
                  opacity: stepsVisible ? 1 : 0,
                  transform: stepsVisible ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.55s ease ${i * 100}ms, transform 0.55s ease ${i * 100}ms`,
                  willChange: 'opacity, transform',
                }}
              >
                {/* Number circle */}
                <div
                  className="relative w-[88px] h-[88px] rounded-full flex items-center justify-center mb-6 z-10 bg-white/70"
                  style={{
                    border: '2px solid rgba(212,175,55,0.4)',
                    boxShadow: '0 4px 16px rgba(212,175,55,0.15)',
                  }}
                >
                  <span className="font-heading font-bold text-ao-gold" style={{ fontSize: '28px' }}>
                    {step.number}
                  </span>
                </div>

                <div className="text-3xl mb-3">{step.emoji}</div>

                <h3 className="font-heading font-bold text-ao-dark mb-3" style={{ fontSize: '22px' }}>
                  {step.title}
                </h3>
                <p className="font-dm font-light text-ao-dark leading-relaxed max-w-xs" style={{ fontSize: '15px' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
