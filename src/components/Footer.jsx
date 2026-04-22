import AOLogo from './AOLogo'

const footerLinks = [
  { label: 'Services',     href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Results',      href: '#results' },
  { label: 'Pricing',      href: '#pricing' },
  { label: 'FAQ',          href: '#faq' },
  { label: 'Contact',      href: '#contact' },
]

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #C9D9FF 0%, #7A9CFF 100%)' }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

          {/* Left — Logo + tagline */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <AOLogo className="h-8 w-auto" color="#D4AF37" />
              <span className="font-heading font-bold text-base text-ao-dark">
                AO AI Solutions
              </span>
            </div>
            <p
              className="font-dm font-light text-ao-dark leading-relaxed mb-5"
              style={{ fontSize: '13px', maxWidth: '240px' }}
            >
              We turn normal websites into intelligent AI-powered business systems.
            </p>
            <p className="font-dm text-xs text-ao-gray" style={{ opacity: 0.7 }}>
              © {new Date().getFullYear()} AO AI Solutions. All rights reserved.
            </p>
            <div className="flex flex-col gap-1 mt-4">
              <a
                href="mailto:claire.lindstrom@aoaisolutions.dev"
                className="font-dm text-xs text-ao-gray hover:text-ao-gold transition-colors duration-200"
              >
                claire.lindstrom@aoaisolutions.dev
              </a>
              <a
                href="mailto:michael.smith@aoaisolutions.dev"
                className="font-dm text-xs text-ao-gray hover:text-ao-gold transition-colors duration-200"
              >
                michael.smith@aoaisolutions.dev
              </a>
            </div>
          </div>

          {/* Center — Nav links */}
          <div className="flex flex-col gap-3 md:items-center">
            <div className="font-dm font-medium text-ao-dark tracking-wide uppercase text-xs mb-1">
              Navigation
            </div>
            {footerLinks.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="font-dm text-sm text-ao-dark hover:text-ao-gold transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right — CTA */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <div
              className="font-dm font-light text-ao-dark text-sm leading-relaxed md:text-right"
              style={{ maxWidth: '220px' }}
            >
              Ready to turn your website into an AI system?
            </div>
            <a
              href="#contact"
              className="font-dm font-medium text-ao-dark px-6 py-3 rounded-full text-sm transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #E8C84A)',
                boxShadow: '0 4px 20px rgba(212,175,55,0.35)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #E8C84A, #F0D060)'
                e.currentTarget.style.boxShadow = '0 6px 28px rgba(212,175,55,0.5)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #D4AF37, #E8C84A)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,175,55,0.35)'
              }}
            >
              Book a Free Demo
            </a>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="w-1.5 h-1.5 rounded-full bg-green-500"
                style={{ boxShadow: '0 0 6px rgba(34,197,94,0.9)' }}
              />
              <span className="font-dm text-xs text-ao-dark">Accepting new clients</span>
            </div>
          </div>
        </div>

        {/* Gold divider + copyright */}
        <div
          className="mt-10 pt-6"
          style={{ borderTop: '1px solid rgba(212,175,55,0.2)' }}
        >
          <p className="font-dm font-light text-ao-gray text-sm text-center">
            Built with AI. Powered by AOAI Solutions.
          </p>
        </div>
      </div>
    </footer>
  )
}
