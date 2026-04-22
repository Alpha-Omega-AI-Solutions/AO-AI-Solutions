import { useState, useEffect } from 'react'
import AOLogo from './AOLogo'
import { trackGetWebsiteClick, trackBookDemoClick } from '../lib/analytics'

// MANUAL EDIT: Update these labels — only use verified, factual claims
const metrics = [
  '24/7 AI Response Rate',
  '48hr Average Launch',
  'DC Metro Area',
]

export default function Hero() {
  const [metricsVisible, setMetricsVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMetricsVisible(true), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #C9D9FF 0%, #7A9CFF 100%)' }}
    >
      {/* Radial glow overlay */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width:  '900px',
          height: '700px',
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.35) 0%, transparent 65%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-20">

        {/* Logo */}
        <div
          className="flex justify-center mb-5"
          style={{ animation: 'fadeIn 0.7s ease 0.1s both' }}
        >
          <AOLogo
            className="w-auto"
            color="#D4AF37"
            style={{ height: '140px', filter: 'drop-shadow(0 4px 16px rgba(212,175,55,0.4))' }}
          />
        </div>

        {/* AI Solutions label */}
        <p
          className="font-dm font-medium text-ao-gold uppercase mb-4"
          style={{
            fontSize: '18px',
            letterSpacing: '0.3em',
            animation: 'fadeIn 0.7s ease 0.2s both',
          }}
        >
          AI SOLUTIONS
        </p>

        {/* H1 */}
        <h1
          className="font-heading font-bold text-ao-dark leading-tight mb-5"
          style={{
            fontSize: 'clamp(36px, 6vw, 72px)',
            animation: 'fadeUp 0.7s ease 0.3s both',
          }}
        >
          Alpha Omega Artificial Intelligence
        </h1>

        {/* Subhead 1 */}
        <p
          className="font-dm text-ao-dark mb-3"
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            animation: 'fadeUp 0.7s ease 0.4s both',
          }}
        >
          End-to-end digital systems, AI, and automation
        </p>

        {/* Subhead 2 */}
        <p
          className="font-dm text-ao-gray mb-10"
          style={{
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            animation: 'fadeUp 0.7s ease 0.5s both',
          }}
        >
          Built for ownership, performance, and scale
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
          style={{ animation: 'fadeUp 0.7s ease 0.6s both' }}
        >
          <a
            href="#contact"
            aria-label="Get started with an AI website"
            className="font-dm font-medium text-ao-dark px-8 py-3.5 rounded-full text-base transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #E8C84A)',
              boxShadow: '0 4px 20px rgba(212,175,55,0.35)',
              letterSpacing: '0.04em',
            }}
            onClick={() => trackGetWebsiteClick('hero')}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #E8C84A, #F0D060)'
              e.currentTarget.style.boxShadow = '0 6px 28px rgba(212,175,55,0.5)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #D4AF37, #E8C84A)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,175,55,0.35)'
            }}
          >
            Get Started →
          </a>
          <a
            href="#contact"
            aria-label="Book a free strategy demo call"
            className="font-dm text-ao-dark px-8 py-3.5 rounded-full text-base transition-all duration-200 hover:-translate-y-0.5"
            style={{ border: '1.5px solid #D4AF37' }}
            onClick={() => trackBookDemoClick('hero')}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(212,175,55,0.08)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
            }}
          >
            Book a Demo
          </a>
        </div>

        {/* Metric badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {metrics.map((m, i) => (
            <div
              key={m}
              className="font-dm text-sm text-ao-dark px-4 py-2 rounded-full bg-white/60"
              style={{
                border: '1px solid rgba(212,175,55,0.25)',
                opacity: metricsVisible ? 1 : 0,
                transform: metricsVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.55s ease ${i * 100}ms, transform 0.55s ease ${i * 100}ms`,
              }}
            >
              <span className="text-ao-gold font-medium">{m.split(' ')[0]}</span>{' '}
              {m.split(' ').slice(1).join(' ')}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
