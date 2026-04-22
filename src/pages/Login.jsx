import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import AOLogo from '../components/AOLogo'

export default function Login() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    if (profile?.role === 'admin') {
      navigate('/admin')
    } else {
      navigate('/portal')
    }
    setLoading(false)
  }

  const inputBase = {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E6E8EF',
    color: '#0F1115',
    outline: 'none',
    width: '100%',
    borderRadius: '10px',
    padding: '12px 16px',
    fontSize: '14px',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: 'linear-gradient(135deg, #C9D9FF 0%, #7A9CFF 100%)' }}
    >
      {/* Card */}
      <div
        className="w-full max-w-sm rounded-2xl p-8 flex flex-col bg-white"
        style={{
          border: '1px solid rgba(122,156,255,0.2)',
          boxShadow: '0 4px 24px rgba(122,156,255,0.2)',
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <AOLogo className="h-12 w-auto mb-3" color="#D4AF37" />
          <span className="font-heading font-bold text-ao-dark" style={{ fontSize: '18px' }}>
            AO AI Solutions
          </span>
          <span className="font-dm text-sm text-ao-gray mt-1">Client Portal</span>
        </div>

        {/* Error */}
        {error && (
          <div
            className="font-dm text-xs text-red-600 mb-5 px-4 py-3 rounded-lg"
            style={{ backgroundColor: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.20)' }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="font-dm font-medium text-ao-dark text-xs mb-1.5 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="you@company.com"
              style={inputBase}
              className="placeholder:text-ao-gray/40"
              onFocus={e => {
                e.target.style.borderColor = '#D4AF37'
                e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.1)'
              }}
              onBlur={e => {
                e.target.style.borderColor = '#E6E8EF'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          <div>
            <label className="font-dm font-medium text-ao-dark text-xs mb-1.5 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={inputBase}
              className="placeholder:text-ao-gray/40"
              onFocus={e => {
                e.target.style.borderColor = '#D4AF37'
                e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.1)'
              }}
              onBlur={e => {
                e.target.style.borderColor = '#E6E8EF'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full font-dm font-medium text-ao-dark py-3 rounded-full text-sm mt-2 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #E8C84A)',
              boxShadow: '0 4px 20px rgba(212,175,55,0.35)',
            }}
            onMouseEnter={e => {
              if (!loading) {
                e.currentTarget.style.background = 'linear-gradient(135deg, #E8C84A, #F0D060)'
                e.currentTarget.style.boxShadow = '0 6px 28px rgba(212,175,55,0.5)'
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #D4AF37, #E8C84A)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,175,55,0.35)'
            }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="font-dm text-xs text-ao-gray hover:text-ao-gold transition-colors duration-200"
          >
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  )
}
