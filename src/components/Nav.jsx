import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import AOLogo from './AOLogo'
import { trackBookDemoClick, trackGetWebsiteClick } from '../lib/analytics'

const links = [
  { label: 'Services',     href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Results',      href: '#results' },
  { label: 'Pricing',      href: '#pricing' },
  { label: 'Contact',      href: '#contact' },
]

export default function Nav() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = () => setMobileOpen(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        backgroundColor: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.92)',
        borderBottom: '1px solid rgba(122,156,255,0.15)',
        boxShadow: scrolled ? '0 2px 20px rgba(122,156,255,0.08)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group" aria-label="AO AI Solutions home">
          <AOLogo className="h-8 w-auto" color="#D4AF37" />
          <span className="font-heading font-bold text-base text-ao-dark hidden sm:block" style={{ letterSpacing: '-0.01em' }}>
            AI Solutions
          </span>
        </a>

        {/* Center links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="font-dm text-sm text-ao-gray hover:text-ao-gold transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Right CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="/login"
            className="font-dm text-sm text-ao-gray hover:text-ao-gold transition-colors duration-200"
            aria-label="Client portal login"
          >
            Client Login
          </a>
          <a
            href="#contact"
            aria-label="Book a free strategy demo call"
            className="font-dm font-medium text-sm text-ao-gold px-5 py-2 rounded-full transition-all duration-200 hover:-translate-y-px"
            style={{
              border: '1.5px solid #D4AF37',
            }}
            onClick={() => trackBookDemoClick('nav')}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(212,175,55,0.08)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
            }}
          >
            Book a Demo
          </a>
          <a
            href="#contact"
            aria-label="Get started with an AI website"
            className="font-dm text-sm font-medium text-ao-dark px-5 py-2 rounded-full transition-all duration-200 hover:-translate-y-px"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #E8C84A)',
              boxShadow: '0 4px 20px rgba(212,175,55,0.35)',
            }}
            onClick={() => trackGetWebsiteClick('nav')}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #E8C84A, #F0D060)'
              e.currentTarget.style.boxShadow = '0 6px 28px rgba(212,175,55,0.5)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #D4AF37, #E8C84A)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,175,55,0.35)'
            }}
          >
            Get AI Website
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-ao-dark p-1.5"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: mobileOpen ? '440px' : '0' }}
      >
        <div
          className="bg-white px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ borderTop: '1px solid rgba(122,156,255,0.10)' }}
        >
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={handleLink}
              className="font-dm text-sm text-ao-gray hover:text-ao-gold transition-colors py-1"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/login"
            onClick={handleLink}
            className="font-dm text-sm text-ao-gray hover:text-ao-gold transition-colors py-1"
          >
            Client Login
          </a>
          <div className="flex flex-col gap-3 pt-2">
            <a
              href="#contact"
              aria-label="Book a free strategy demo call"
              onClick={() => { handleLink(); trackBookDemoClick('nav-mobile') }}
              className="font-dm text-sm text-ao-gold text-center px-5 py-2.5 rounded-full"
              style={{ border: '1.5px solid #D4AF37' }}
            >
              Book a Demo
            </a>
            <a
              href="#contact"
              aria-label="Get started with an AI website"
              onClick={() => { handleLink(); trackGetWebsiteClick('nav-mobile') }}
              className="font-dm text-sm font-medium text-ao-dark text-center px-5 py-2.5 rounded-full"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #E8C84A)' }}
            >
              Get AI Website
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
