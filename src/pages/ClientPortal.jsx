import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { LayoutDashboard, MessageSquare, FileText, LogOut, Zap } from 'lucide-react'
import AOLogo from '../components/AOLogo'

const navItems = [
  { label: 'Dashboard',     icon: LayoutDashboard, href: '#' },
  { label: 'AI Chat Logs',  icon: MessageSquare,   href: '#' },
  { label: 'Reports',       icon: FileText,         href: '#' },
  { label: 'Automations',   icon: Zap,              href: '#' },
]

export default function ClientPortal() {
  const [user,    setUser]    = useState(null)
  const [profile, setProfile] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { navigate('/login'); return }
      setUser(user)
      supabase.from('profiles').select('*').eq('id', user.id).single()
        .then(({ data }) => setProfile(data))
    })
  }, [navigate])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F7F9FF' }}>

      {/* Sidebar */}
      <aside
        className="w-60 flex-shrink-0 flex flex-col bg-white"
        style={{
          borderRight: '1px solid rgba(122,156,255,0.15)',
          minHeight: '100vh',
        }}
      >
        {/* Gradient accent strip at top */}
        <div style={{ height: '4px', background: 'linear-gradient(135deg, #C9D9FF 0%, #7A9CFF 100%)' }} />

        {/* Logo */}
        <div
          className="flex items-center gap-2.5 px-6 py-5"
          style={{ borderBottom: '1px solid rgba(122,156,255,0.12)' }}
        >
          <AOLogo className="h-7 w-auto" color="#D4AF37" />
          <span className="font-heading font-bold text-sm text-ao-dark">AO AI</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navItems.map(item => {
            const Icon = item.icon
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-dm text-sm text-ao-gray hover:text-ao-gold transition-colors duration-200"
                style={{ cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(201,217,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Icon size={16} color="#7A9CFF" />
                {item.label}
              </a>
            )
          })}
        </nav>

        {/* Sign out */}
        <div className="px-3 pb-5" style={{ borderTop: '1px solid rgba(122,156,255,0.12)', paddingTop: '16px' }}>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-dm text-sm text-ao-gray hover:text-red-500 transition-colors duration-200 w-full"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-ao-dark mb-1" style={{ fontSize: '26px' }}>
            Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}
          </h1>
          <p className="font-dm text-sm text-ao-gray">
            Here's an overview of your AI system activity.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {[
            { label: 'Leads This Month',   value: '—', sub: 'Connect Supabase to activate' },
            { label: 'AI Conversations',   value: '—', sub: 'Connect Supabase to activate' },
            { label: 'Appointments Booked',value: '—', sub: 'Connect Supabase to activate' },
            { label: 'Avg Response Time',  value: '< 3s', sub: '24/7 active' },
          ].map((card, i) => (
            <div
              key={i}
              className="rounded-xl p-5 bg-white"
              style={{
                border: '1px solid rgba(122,156,255,0.18)',
                boxShadow: '0 2px 16px rgba(122,156,255,0.08)',
              }}
            >
              <div className="font-dm text-xs text-ao-gray mb-2">{card.label}</div>
              <div className="font-heading font-bold text-ao-gold mb-1" style={{ fontSize: '28px' }}>
                {card.value}
              </div>
              <div className="font-dm text-xs text-ao-gray" style={{ opacity: 0.7 }}>{card.sub}</div>
            </div>
          ))}
        </div>

        {/* Activity placeholder */}
        <div
          className="rounded-xl p-7 text-center bg-white"
          style={{
            border: '1px solid rgba(122,156,255,0.18)',
            boxShadow: '0 2px 16px rgba(122,156,255,0.08)',
          }}
        >
          <div className="font-heading font-bold text-ao-dark mb-2" style={{ fontSize: '18px' }}>
            Recent Activity
          </div>
          <p className="font-dm text-sm text-ao-gray mb-4">
            Activity feed will populate once your Supabase project is connected and the{' '}
            <code
              className="text-ao-gold text-xs px-1 py-0.5 rounded"
              style={{ backgroundColor: 'rgba(212,175,55,0.10)' }}
            >
              leads
            </code>{' '}
            table is created.
          </p>
          <Link to="/" className="font-dm text-sm text-ao-gold underline underline-offset-4">
            Back to main site
          </Link>
        </div>
      </main>
    </div>
  )
}
