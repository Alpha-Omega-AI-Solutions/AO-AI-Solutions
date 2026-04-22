import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'
import { trackPricingCtaClick } from '../lib/analytics'

const plans = [
  {
    tier:     'Starter',
    label:    'Launch',
    setup:    '$2,000',
    monthly:  '$250/mo',
    features: [
      'AI-powered website',
      'Trained AI chatbot',
      'Lead capture automation',
      'Hosting & deployment',
      'Basic analytics',
    ],
    cta:        'Get Started',
    ctaHref:    '#contact',
    highlight:  false,
  },
  {
    tier:     'Growth',
    label:    'Scale',
    badge:    'Most Popular',
    setup:    '$4,000',
    monthly:  '$500/mo',
    features: [
      'Everything in Starter',
      'CRM integration',
      'SMS + email automation',
      'Booking system',
      'Monthly AI updates',
      'Priority support',
    ],
    cta:        'Get Started',
    ctaHref:    '#contact',
    highlight:  true,
  },
  {
    tier:     'Enterprise',
    label:    'Custom',
    setup:    'Custom quote',
    monthly:  'Starting at $1,000/mo',
    features: [
      'Full custom AI systems',
      'Internal AI assistants',
      'White-glove onboarding',
      'Dedicated AI engineer',
      'SLA guarantee',
    ],
    cta:        'Book a Call',
    ctaHref:    '#contact',
    highlight:  false,
  },
]

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5">
      <path d="M2 7L5.5 10.5L12 3" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Pricing() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [cardsRef,  cardsVisible]  = useScrollReveal()

  return (
    <section id="pricing" className="section-pad bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <p className="font-dm font-medium tracking-widest uppercase text-sm text-ao-gold mb-3" style={revealStyle(headerVisible)}>
            Pricing
          </p>
          <h2
            className="font-heading font-bold text-ao-dark mb-4"
            style={{
              fontSize: 'clamp(34px, 4.5vw, 52px)',
              ...revealStyle(headerVisible, 60),
            }}
          >
            AI Agency Pricing.<br className="hidden sm:block" /> Real Business Results.
          </h2>
          <p
            className="font-dm font-light text-ao-gray max-w-lg mx-auto"
            style={{ fontSize: '17px', ...revealStyle(headerVisible, 100) }}
          >
            No web designer rates. This is AI infrastructure.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {plans.map((plan, i) => (
            <div
              key={plan.tier}
              className="relative flex flex-col rounded-2xl p-7 transition-all duration-300"
              style={{
                background: plan.highlight
                  ? 'linear-gradient(135deg, #C9D9FF 0%, #7A9CFF 100%)'
                  : '#FFFFFF',
                border: plan.highlight
                  ? '2px solid #D4AF37'
                  : '1px solid rgba(122,156,255,0.18)',
                boxShadow: plan.highlight
                  ? '0 8px 32px rgba(212,175,55,0.2)'
                  : '0 2px 16px rgba(122,156,255,0.1)',
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.55s ease ${i * 80}ms, transform 0.55s ease ${i * 80}ms, box-shadow 0.3s ease`,
                willChange: 'opacity, transform',
              }}
              onMouseEnter={e => {
                if (!plan.highlight) {
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(212,175,55,0.12)'
                  e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={e => {
                if (!plan.highlight) {
                  e.currentTarget.style.boxShadow = '0 2px 16px rgba(122,156,255,0.1)'
                  e.currentTarget.style.borderColor = 'rgba(122,156,255,0.18)'
                  e.currentTarget.style.transform = cardsVisible ? 'translateY(0)' : 'translateY(16px)'
                }
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span
                    className="font-dm text-xs font-medium text-ao-dark px-3.5 py-1 rounded-full whitespace-nowrap"
                    style={{ background: 'linear-gradient(135deg, #D4AF37, #E8C84A)' }}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Tier */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span
                    className={`font-heading font-bold ${plan.highlight ? 'text-ao-gold' : 'text-ao-dark'}`}
                    style={{ fontSize: '22px' }}
                  >
                    {plan.tier}
                  </span>
                  <span
                    className="font-dm text-xs px-2 py-0.5 rounded-full text-ao-gray"
                    style={{ backgroundColor: 'rgba(113,128,150,0.10)', border: '1px solid rgba(113,128,150,0.15)' }}
                  >
                    {plan.label}
                  </span>
                </div>
              </div>

              {/* Pricing */}
              <div
                className="mb-6 pb-6"
                style={{ borderBottom: plan.highlight ? '1px solid rgba(212,175,55,0.3)' : '1px solid rgba(122,156,255,0.15)' }}
              >
                <div className="font-heading font-bold text-ao-gold" style={{ fontSize: '36px' }}>
                  {plan.setup}
                </div>
                <div className="font-dm text-sm text-ao-gray mt-0.5">one-time setup</div>
                <div className="font-dm font-medium text-ao-gold mt-3" style={{ fontSize: '18px' }}>
                  + {plan.monthly}
                </div>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckIcon />
                    <span className="font-dm font-light text-ao-gray" style={{ fontSize: '14px' }}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={plan.ctaHref}
                aria-label={`Get started with the ${plan.tier} plan`}
                className="block text-center font-dm font-medium py-3 rounded-full text-sm transition-all duration-200 hover:-translate-y-0.5"
                style={
                  plan.highlight
                    ? {
                        background: 'linear-gradient(135deg, #D4AF37, #E8C84A)',
                        color: '#0F1115',
                        boxShadow: '0 4px 20px rgba(212,175,55,0.35)',
                      }
                    : {
                        color: '#D4AF37',
                        border: '1.5px solid #D4AF37',
                        background: 'transparent',
                      }
                }
                onClick={() => trackPricingCtaClick(plan.tier)}
                onMouseEnter={e => {
                  if (plan.highlight) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #E8C84A, #F0D060)'
                    e.currentTarget.style.boxShadow = '0 6px 28px rgba(212,175,55,0.5)'
                  } else {
                    e.currentTarget.style.background = 'rgba(212,175,55,0.08)'
                  }
                }}
                onMouseLeave={e => {
                  if (plan.highlight) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #D4AF37, #E8C84A)'
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,175,55,0.35)'
                  } else {
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
