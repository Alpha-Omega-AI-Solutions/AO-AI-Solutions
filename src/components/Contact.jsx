import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Clock, Phone, Shield } from 'lucide-react'
import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'
import AOLogo from './AOLogo'
import { supabase } from '../lib/supabase'
import { trackContactFormSubmit } from '../lib/analytics'

const schema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  company:  z.string().min(2, 'Company name is required'),
  email:    z.string().email('Please enter a valid email'),
  phone:    z.string().optional(),
  service:  z.string().min(1, 'Please select a service'),
  message:  z.string().optional(),
})

const valueProps = [
  {
    icon: Clock,
    title: 'Response within 24 hours',
    desc:  'We review every submission personally and follow up fast.',
  },
  {
    icon: Phone,
    title: 'Free strategy call included',
    desc:  "A 30-minute call where we map out exactly what we'd build for you.",
  },
  {
    icon: Shield,
    title: 'No commitment required',
    desc:  'Explore your options with zero pressure. We earn your business.',
  },
]

const inputBase = {
  backgroundColor: '#FFFFFF',
  color: '#0F1115',
  outline: 'none',
  width: '100%',
  borderRadius: '8px',
  padding: '12px 16px',
  fontSize: '14px',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

export default function Contact() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [contentRef, contentVisible] = useScrollReveal()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    // 1. Insert lead into Supabase leads table
    const { error } = await supabase.from('leads').insert([{
      full_name:  data.fullName,
      company:    data.company,
      email:      data.email,
      phone:      data.phone || null,
      service:    data.service,
      message:    data.message || null,
      status:     'new',
      created_at: new Date().toISOString(),
    }])
    if (error) {
      console.error('[Contact] Supabase insert error:', error.message)
    }

    // 2. Send email notification → michael.smith@aoaisolutions.dev
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    } catch (err) {
      console.error('[Contact] Email notification error:', err.message)
    }

    // 3. GA4 lead conversion event
    trackContactFormSubmit()
  }

  return (
    <section
      id="contact"
      className="section-pad"
      style={{ background: 'linear-gradient(135deg, #C9D9FF 0%, #7A9CFF 100%)' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <p className="font-dm font-medium tracking-widest uppercase text-sm text-ao-gold mb-3" style={revealStyle(headerVisible)}>
            Get Started
          </p>
          <h2
            className="font-heading font-bold text-ao-dark mb-4"
            style={{
              fontSize: 'clamp(34px, 4.5vw, 52px)',
              ...revealStyle(headerVisible, 60),
            }}
          >
            Ready to Build Your<br className="hidden sm:block" /> AI Business System?
          </h2>
          <p
            className="font-dm font-light text-ao-dark max-w-xl mx-auto"
            style={{ fontSize: '17px', ...revealStyle(headerVisible, 100) }}
          >
            Tell us about your business. We'll show you exactly what we'd build.
          </p>
        </div>

        {/* Split layout */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — Form */}
          <div style={revealStyle(contentVisible)}>
            {isSubmitSuccessful ? (
              <div
                className="flex flex-col items-center justify-center text-center py-16 rounded-2xl bg-white"
                style={{
                  border: '1px solid rgba(212,175,55,0.25)',
                  boxShadow: '0 4px 24px rgba(122,156,255,0.2)',
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-5 bg-ao-blue-start/20"
                  style={{ border: '1px solid rgba(212,175,55,0.3)' }}
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M3 11L8 16L19 5" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-ao-dark mb-2" style={{ fontSize: '22px' }}>
                  Message Received
                </h3>
                <p className="font-dm font-light text-ao-gray mb-6" style={{ fontSize: '15px' }}>
                  We'll be in touch within 24 hours to schedule your free strategy call.
                </p>
                <button
                  onClick={() => reset()}
                  className="font-dm text-sm text-ao-gold underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-2xl p-7 flex flex-col gap-5 bg-white"
                style={{
                  border: '1px solid rgba(122,156,255,0.18)',
                  boxShadow: '0 4px 24px rgba(122,156,255,0.2)',
                }}
              >
                {/* Row: Name + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-dm font-medium text-ao-dark text-xs mb-1.5 block">Full Name *</label>
                    <input
                      {...register('fullName', { required: 'Required' })}
                      placeholder="Jane Smith"
                      style={{
                        ...inputBase,
                        border: errors.fullName ? '1px solid rgba(255,80,80,0.5)' : '1px solid #E6E8EF',
                      }}
                      className="placeholder:text-ao-gray/40"
                      onFocus={e => {
                        e.target.style.borderColor = '#D4AF37'
                        e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.1)'
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = errors.fullName ? 'rgba(255,80,80,0.5)' : '#E6E8EF'
                        e.target.style.boxShadow = 'none'
                      }}
                    />
                    {errors.fullName && (
                      <span className="font-dm text-xs text-red-500 mt-1 block">{errors.fullName.message}</span>
                    )}
                  </div>
                  <div>
                    <label className="font-dm font-medium text-ao-dark text-xs mb-1.5 block">Company Name *</label>
                    <input
                      {...register('company', { required: 'Required' })}
                      placeholder="Riverside Dental"
                      style={{
                        ...inputBase,
                        border: errors.company ? '1px solid rgba(255,80,80,0.5)' : '1px solid #E6E8EF',
                      }}
                      className="placeholder:text-ao-gray/40"
                      onFocus={e => {
                        e.target.style.borderColor = '#D4AF37'
                        e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.1)'
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = errors.company ? 'rgba(255,80,80,0.5)' : '#E6E8EF'
                        e.target.style.boxShadow = 'none'
                      }}
                    />
                    {errors.company && (
                      <span className="font-dm text-xs text-red-500 mt-1 block">{errors.company.message}</span>
                    )}
                  </div>
                </div>

                {/* Row: Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-dm font-medium text-ao-dark text-xs mb-1.5 block">Email *</label>
                    <input
                      {...register('email', {
                        required: 'Required',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                      })}
                      type="email"
                      placeholder="jane@company.com"
                      style={{
                        ...inputBase,
                        border: errors.email ? '1px solid rgba(255,80,80,0.5)' : '1px solid #E6E8EF',
                      }}
                      className="placeholder:text-ao-gray/40"
                      onFocus={e => {
                        e.target.style.borderColor = '#D4AF37'
                        e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.1)'
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = errors.email ? 'rgba(255,80,80,0.5)' : '#E6E8EF'
                        e.target.style.boxShadow = 'none'
                      }}
                    />
                    {errors.email && (
                      <span className="font-dm text-xs text-red-500 mt-1 block">{errors.email.message}</span>
                    )}
                  </div>
                  <div>
                    <label className="font-dm font-medium text-ao-dark text-xs mb-1.5 block">Phone <span className="opacity-50">(optional)</span></label>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="(555) 000-0000"
                      style={{ ...inputBase, border: '1px solid #E6E8EF' }}
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
                </div>

                {/* Service Interest */}
                <div>
                  <label className="font-dm font-medium text-ao-dark text-xs mb-1.5 block">Service Interest *</label>
                  <select
                    {...register('service', { required: 'Please select an option' })}
                    className="w-full font-dm text-sm text-ao-dark rounded-lg px-4 py-3 outline-none transition-all duration-200 cursor-pointer"
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: errors.service ? '1px solid rgba(255,80,80,0.5)' : '1px solid #E6E8EF',
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = '#D4AF37'
                      e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.1)'
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = errors.service ? 'rgba(255,80,80,0.5)' : '#E6E8EF'
                      e.target.style.boxShadow = 'none'
                    }}
                  >
                    <option value="">Select a service...</option>
                    <option value="ai-website">AI Website</option>
                    <option value="lead-automation">Lead Automation</option>
                    <option value="custom-ai">Custom AI</option>
                    <option value="not-sure">Not sure yet</option>
                  </select>
                  {errors.service && (
                    <span className="font-dm text-xs text-red-500 mt-1 block">{errors.service.message}</span>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="font-dm font-medium text-ao-dark text-xs mb-1.5 block">Tell us about your business</label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    placeholder="What does your business do? What problems are you trying to solve with AI?"
                    className="w-full font-dm text-sm text-ao-dark rounded-lg px-4 py-3 outline-none transition-all duration-200 resize-none placeholder:text-ao-gray/40"
                    style={{ border: '1px solid #E6E8EF', backgroundColor: '#FFFFFF' }}
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

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-dm font-medium text-ao-dark py-3.5 rounded-full text-sm transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37, #E8C84A)',
                    boxShadow: '0 4px 20px rgba(212,175,55,0.35)',
                    letterSpacing: '0.04em',
                  }}
                  onMouseEnter={e => {
                    if (!isSubmitting) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #E8C84A, #F0D060)'
                      e.currentTarget.style.boxShadow = '0 6px 28px rgba(212,175,55,0.5)'
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #D4AF37, #E8C84A)'
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,175,55,0.35)'
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Start My AI Website →'}
                </button>
              </form>
            )}
          </div>

          {/* Right — value props + logo */}
          <div
            className="flex flex-col gap-6 lg:pt-4"
            style={revealStyle(contentVisible, 180)}
          >
            {valueProps.map((vp, i) => {
              const Icon = vp.icon
              return (
                <div
                  key={vp.title}
                  className="flex gap-4 items-start"
                  style={{
                    opacity: contentVisible ? 1 : 0,
                    transform: contentVisible ? 'translateX(0)' : 'translateX(10px)',
                    transition: `opacity 0.55s ease ${150 + i * 80}ms, transform 0.55s ease ${150 + i * 80}ms`,
                    willChange: 'opacity, transform',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 bg-white/60"
                    style={{ border: '1px solid rgba(212,175,55,0.3)' }}
                  >
                    <Icon size={16} color="#D4AF37" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-ao-dark mb-1" style={{ fontSize: '16px' }}>
                      {vp.title}
                    </div>
                    <div className="font-dm font-light text-ao-dark leading-relaxed" style={{ fontSize: '14px' }}>
                      {vp.desc}
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Logo watermark */}
            <div
              className="flex justify-center mt-8"
              style={{
                opacity: contentVisible ? 0.2 : 0,
                transition: 'opacity 0.8s ease 600ms',
              }}
            >
              <AOLogo className="h-20 w-auto" color="#D4AF37" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
