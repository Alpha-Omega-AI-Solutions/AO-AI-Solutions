import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Users, Inbox, LogOut, LayoutDashboard, RefreshCw } from 'lucide-react'
import AOLogo from '../components/AOLogo'

const STATUS_COLORS = {
  new:         { bg: 'rgba(212,175,55,0.12)',  border: 'rgba(212,175,55,0.35)',  text: '#D4AF37' },
  contacted:   { bg: 'rgba(122,156,255,0.12)', border: 'rgba(122,156,255,0.35)', text: '#7A9CFF' },
  qualified:   { bg: 'rgba(74,222,128,0.10)',  border: 'rgba(74,222,128,0.30)',  text: '#16a34a' },
  closed:      { bg: 'rgba(139,92,246,0.10)',  border: 'rgba(139,92,246,0.30)',  text: '#7c3aed' },
  lost:        { bg: 'rgba(239,68,68,0.10)',   border: 'rgba(239,68,68,0.30)',   text: '#dc2626' },
}

export default function AdminPortal() {
  const [leads,    setLeads]    = useState([])
  const [loading,  setLoading]  = useState(true)
  const [updating, setUpdating] = useState(null)
  const navigate = useNavigate()

  const fetchLeads = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) console.error('[Admin] Supabase error:', error.message)
    setLeads(data || [])
    setLoading(false)
  }

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { navigate('/login'); return }
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
      if (profile?.role !== 'admin') { navigate('/portal'); return }
      fetchLeads()
    })
  }, [navigate])

  const updateStatus = async (id, status) => {
    setUpdating(id)
    await supabase.from('leads').update({ status }).eq('id', id)
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
    setUpdating(null)
  }

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

        <div
          className="flex items-center gap-2.5 px-6 py-5"
          style={{ borderBottom: '1px solid rgba(122,156,255,0.12)' }}
        >
          <AOLogo className="h-7 w-auto" color="#D4AF37" />
          <span className="font-heading font-bold text-sm text-ao-dark">Admin</span>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {[
            { label: 'Overview',  icon: LayoutDashboard, href: '#' },
            { label: 'Leads',     icon: Inbox,           href: '#' },
            { label: 'Clients',   icon: Users,            href: '#' },
          ].map(item => {
            const Icon = item.icon
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-dm text-sm text-ao-dark transition-colors duration-200"
                style={{ backgroundColor: 'rgba(201,217,255,0.2)' }}
              >
                <Icon size={16} color="#7A9CFF" />
                {item.label}
              </a>
            )
          })}
        </nav>

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

      {/* Main */}
      <main className="flex-1 px-8 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading font-bold text-ao-dark mb-1" style={{ fontSize: '26px' }}>
              Leads
            </h1>
            <p className="font-dm text-sm text-ao-gray">
              {leads.length} total submissions
            </p>
          </div>
          <button
            onClick={fetchLeads}
            className="flex items-center gap-2 font-dm text-sm text-ao-gray hover:text-ao-gold transition-colors duration-200 px-4 py-2 rounded-lg bg-white"
            style={{ border: '1px solid rgba(122,156,255,0.2)' }}
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>

        {/* Leads table */}
        <div
          className="rounded-xl overflow-hidden bg-white"
          style={{ border: '1px solid rgba(122,156,255,0.18)', boxShadow: '0 2px 16px rgba(122,156,255,0.08)' }}
        >
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <span className="font-dm text-sm text-ao-gray">Loading leads…</span>
            </div>
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="font-heading font-bold text-ao-dark mb-2" style={{ fontSize: '18px' }}>No leads yet</div>
              <p className="font-dm text-sm text-ao-gray mb-4 max-w-xs">
                Leads from your contact form will appear here once the Supabase{' '}
                <code
                  className="text-ao-gold text-xs px-1 py-0.5 rounded"
                  style={{ backgroundColor: 'rgba(212,175,55,0.10)' }}
                >
                  leads
                </code>{' '}
                table is set up.
              </p>
              <Link to="/" className="font-dm text-sm text-ao-gold underline underline-offset-4">
                Go to site
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: '#F7F9FF', borderBottom: '1px solid rgba(122,156,255,0.12)' }}>
                    {['Name', 'Company', 'Email', 'Service', 'Date', 'Status'].map(col => (
                      <th
                        key={col}
                        className="font-dm text-xs text-ao-gray px-4 py-3 text-left"
                        style={{ letterSpacing: '0.04em' }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, i) => {
                    const sc = STATUS_COLORS[lead.status] || STATUS_COLORS.new
                    return (
                      <tr
                        key={lead.id}
                        style={{
                          backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#F7F9FF',
                          borderBottom: '1px solid #E6E8EF',
                        }}
                      >
                        <td className="font-dm text-sm text-ao-dark px-4 py-3">{lead.full_name}</td>
                        <td className="font-dm text-sm text-ao-gray px-4 py-3">{lead.company}</td>
                        <td className="font-dm text-sm text-ao-gray px-4 py-3">{lead.email}</td>
                        <td className="font-dm text-sm text-ao-gray px-4 py-3">{lead.service}</td>
                        <td className="font-dm text-xs text-ao-gray px-4 py-3">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={lead.status || 'new'}
                            onChange={e => updateStatus(lead.id, e.target.value)}
                            disabled={updating === lead.id}
                            className="font-dm text-xs px-2.5 py-1 rounded-full cursor-pointer outline-none"
                            style={{
                              backgroundColor: sc.bg,
                              border: `1px solid ${sc.border}`,
                              color: sc.text,
                            }}
                          >
                            {Object.keys(STATUS_COLORS).map(s => (
                              <option key={s} value={s}>
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
