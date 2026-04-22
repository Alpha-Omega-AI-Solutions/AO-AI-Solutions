import { Globe, Zap, Cpu, Server, RefreshCw, Sparkles } from 'lucide-react'
import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'

const services = [
  {
    icon: Globe,
    title: 'AI-Powered Websites',
    desc: 'Your website becomes an AI employee — with a trained chatbot, smart lead forms, automated scheduling, and 24/7 customer support.',
    tag: 'Core Product',
    tagStyle: 'gold',
  },
  {
    icon: Zap,
    title: 'Lead Automation Systems',
    desc: 'Never lose a lead again. AI chat intake, SMS follow-ups, email sequences, CRM sync, and booking bots that convert visitors while you sleep.',
    tag: null,
  },
  {
    icon: Cpu,
    title: 'Custom AI Integrations',
    desc: 'Internal AI assistants, document automation, knowledge base AI, and workflow tools tailored to how your business actually operates.',
    tag: 'Advanced',
    tagStyle: 'gold',
  },
  {
    icon: Server,
    title: 'Cloud Infrastructure',
    desc: 'Secure, fast, always-on. We manage hosting, AI infrastructure, API pipelines, and uptime so you never have to think about it.',
    tag: null,
  },
  {
    icon: RefreshCw,
    title: 'Ongoing AI Maintenance',
    desc: 'Monthly plans that keep your AI sharp. Includes updates, automation monitoring, analytics dashboards, and feature upgrades.',
    tag: null,
  },
  {
    icon: Sparkles,
    title: 'Smart Sites',
    desc: 'Websites that update themselves, generate content, adapt to each visitor, and optimize conversions automatically using AI.',
    tag: 'Coming Soon',
    tagStyle: 'muted',
    comingSoon: true,
  },
]

function ServiceCard({ service, delay, isVisible }) {
  const Icon = service.icon

  return (
    <div
      className="group relative rounded-2xl p-6 bg-white transition-all duration-300 cursor-default"
      style={{
        border: service.comingSoon
          ? '1px dashed rgba(122,156,255,0.18)'
          : '1px solid rgba(122,156,255,0.18)',
        boxShadow: '0 2px 16px rgba(122,156,255,0.1)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms, box-shadow 0.3s ease, border-color 0.3s ease`,
        willChange: 'opacity, transform',
      }}
      onMouseEnter={e => {
        if (!service.comingSoon) {
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(212,175,55,0.12)'
          e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 2px 16px rgba(122,156,255,0.1)'
        e.currentTarget.style.borderColor = service.comingSoon ? 'rgba(122,156,255,0.18)' : 'rgba(122,156,255,0.18)'
        e.currentTarget.style.transform = isVisible ? 'translateY(0)' : 'translateY(16px)'
      }}
    >
      {/* Icon container */}
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-ao-blue-start/20">
        <Icon size={18} color={service.comingSoon ? 'rgba(212,175,55,0.45)' : '#D4AF37'} />
      </div>

      {/* Tag */}
      {service.tag && (
        <span
          className="inline-block font-dm text-xs mb-3 px-2.5 py-0.5 rounded-full"
          style={
            service.tagStyle === 'gold'
              ? {
                  color: '#D4AF37',
                  backgroundColor: 'rgba(212,175,55,0.10)',
                  border: '1px solid rgba(212,175,55,0.25)',
                }
              : {
                  color: '#718096',
                  backgroundColor: 'rgba(113,128,150,0.08)',
                  border: '1px solid rgba(113,128,150,0.18)',
                }
          }
        >
          {service.tag}
        </span>
      )}

      <h3 className="font-heading font-bold text-ao-dark mb-2.5" style={{ fontSize: '18px' }}>
        {service.title}
      </h3>
      <p className="font-dm font-light text-ao-gray leading-relaxed mb-4" style={{ fontSize: '14px' }}>
        {service.desc}
      </p>

      {!service.comingSoon && (
        <span className="font-dm text-sm text-ao-gold font-medium">Learn More →</span>
      )}
    </div>
  )
}

export default function Services() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [gridRef,   gridVisible]   = useScrollReveal()

  return (
    <section id="services" className="section-pad" style={{ backgroundColor: '#F7F9FF' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p className="font-dm font-medium tracking-widest uppercase text-sm text-ao-gold mb-3" style={revealStyle(headerVisible)}>
            Our Services
          </p>
          <h2
            className="font-heading font-bold text-ao-dark mb-4"
            style={{
              fontSize: 'clamp(36px, 5vw, 52px)',
              ...revealStyle(headerVisible, 60),
            }}
          >
            Everything Your Business Needs<br className="hidden sm:block" /> to Run on AI
          </h2>
          <p
            className="font-dm font-light text-ao-gray max-w-lg mx-auto"
            style={{ fontSize: '17px', ...revealStyle(headerVisible, 120) }}
          >
            One system. Five layers. Built to work while you sleep.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} delay={i * 80} isVisible={gridVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}
