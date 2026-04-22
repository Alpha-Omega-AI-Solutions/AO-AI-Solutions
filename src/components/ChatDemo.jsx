import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'

const SEQUENCE = [
  { type: 'typing',  delay: 0 },
  { type: 'msg',     delay: 700,   sender: 'ai',   text: "Hey! I'm the AI assistant for Riverside Dental. What can I help you with today? 😊" },
  { type: 'msg',     delay: 2400,  sender: 'user',  text: "I've been thinking about dental implants. How much do they cost?" },
  { type: 'typing',  delay: 2900 },
  { type: 'msg',     delay: 3900,  sender: 'ai',    text: "Great question! Implants typically range from $3,000–$5,000 per tooth. The best way to get an exact quote is a free consultation — I can book that for you right now." },
  { type: 'msg',     delay: 6000,  sender: 'user',  text: "That works. What's available this week?" },
  { type: 'typing',  delay: 6500 },
  { type: 'msg',     delay: 7400,  sender: 'ai',    text: "I have Wednesday at 2pm or Friday at 10am. Which works better for you?" },
  { type: 'msg',     delay: 9200,  sender: 'user',  text: "Wednesday at 2pm" },
  { type: 'typing',  delay: 9700 },
  { type: 'msg',     delay: 10500, sender: 'ai',    text: "Perfect — you're booked! A confirmation is on its way to your phone. See you Wednesday at 2pm! 🎉" },
]

const LOOP_AT = 24000

const bullets = [
  'Answers questions instantly — 24/7',
  'Qualifies and captures every lead',
  'Books appointments automatically',
  'Follows up with SMS and email',
  'Escalates urgent cases to your team',
]

export default function ChatDemo() {
  const [messages,     setMessages]     = useState([])
  const [showTyping,   setShowTyping]   = useState(false)
  const messagesContainerRef             = useRef(null)
  const [headerRef, headerVisible]      = useScrollReveal()
  const [contentRef, contentVisible]    = useScrollReveal()

  useEffect(() => {
    let timers = []

    const runSequence = () => {
      setMessages([])
      setShowTyping(false)

      SEQUENCE.forEach(step => {
        const t = setTimeout(() => {
          if (step.type === 'typing') {
            setShowTyping(true)
          } else {
            setShowTyping(false)
            setMessages(prev => [...prev, { id: Date.now() + Math.random(), sender: step.sender, text: step.text }])
          }
        }, step.delay)
        timers.push(t)
      })

      const loop = setTimeout(() => {
        setMessages([])
        setShowTyping(false)
        setTimeout(runSequence, 600)
      }, LOOP_AT)
      timers.push(loop)
    }

    runSequence()
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const container = messagesContainerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [messages, showTyping])

  return (
    <section
      id="chat-demo"
      className="section-pad bg-white"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <p className="font-dm font-medium tracking-widest uppercase text-sm text-ao-gold mb-3" style={revealStyle(headerVisible)}>
            Live Demo
          </p>
          <h2
            className="font-heading font-bold text-ao-dark mb-4"
            style={{
              fontSize: 'clamp(34px, 4.5vw, 50px)',
              ...revealStyle(headerVisible),
            }}
          >
            Watch the AI Work
          </h2>
          <p
            className="font-dm font-light text-ao-gray"
            style={{ fontSize: '17px', ...revealStyle(headerVisible, 100) }}
          >
            This is what your website does while you're busy running your business.
          </p>
        </div>

        {/* Split layout */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left — what the AI handles */}
          <div style={revealStyle(contentVisible)}>
            <h3 className="font-heading font-bold text-ao-dark mb-3" style={{ fontSize: '26px' }}>
              Your AI works around the clock
            </h3>
            <p className="font-dm font-light text-ao-gray mb-8 leading-relaxed" style={{ fontSize: '15px' }}>
              Every visitor gets an instant, intelligent response. No hold music. No missed leads. No after-hours gaps.
            </p>
            <ul className="flex flex-col gap-4">
              {bullets.map(b => (
                <li key={b} className="flex items-start gap-3">
                  <span
                    className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 bg-ao-blue-start/20"
                    style={{ border: '1px solid rgba(212,175,55,0.3)' }}
                  >
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="font-dm font-light text-ao-gray" style={{ fontSize: '15px' }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — mock chat UI in gradient blue wrapper */}
          <div style={revealStyle(contentVisible, 150)}>
            <div
              className="rounded-2xl p-4"
              style={{ background: 'linear-gradient(135deg, #C9D9FF 0%, #7A9CFF 100%)' }}
            >
              {/* Fake browser chrome */}
              <div
                className="rounded-xl overflow-hidden bg-white"
                style={{ boxShadow: '0 4px 24px rgba(122,156,255,0.2)' }}
              >
                {/* Browser top bar */}
                <div
                  className="flex items-center gap-3 px-4 py-3"
                  style={{ backgroundColor: '#F7F9FF', borderBottom: '1px solid rgba(122,156,255,0.15)' }}
                >
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-ao-silver" />
                    <div className="w-3 h-3 rounded-full bg-ao-silver" />
                    <div className="w-3 h-3 rounded-full bg-ao-silver" />
                  </div>
                  <div
                    className="flex-1 rounded-md px-3 py-1 font-dm text-xs text-ao-gray text-center"
                    style={{ backgroundColor: '#E6E8EF', border: '1px solid rgba(122,156,255,0.15)' }}
                  >
                    yourbusiness.com
                  </div>
                </div>

                {/* Browser page content area */}
                <div className="relative" style={{ backgroundColor: '#F7F9FF', minHeight: '380px' }}>
                  {/* Fake page background */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="h-10 mx-6 mt-6 rounded" style={{ backgroundColor: 'rgba(122,156,255,0.25)' }} />
                    <div className="h-3 mx-6 mt-4 rounded w-3/4" style={{ backgroundColor: 'rgba(0,0,0,0.06)' }} />
                    <div className="h-3 mx-6 mt-2 rounded w-1/2" style={{ backgroundColor: 'rgba(0,0,0,0.04)' }} />
                    <div className="h-3 mx-6 mt-2 rounded w-2/3" style={{ backgroundColor: 'rgba(0,0,0,0.04)' }} />
                  </div>

                  {/* Chat widget — bottom right */}
                  <div className="absolute bottom-4 right-4 flex flex-col items-end" style={{ width: '260px' }}>

                    {/* Chat bubble */}
                    <div
                      className="w-full rounded-2xl overflow-hidden mb-3 bg-white"
                      style={{
                        border: '1px solid rgba(122,156,255,0.2)',
                        boxShadow: '0 8px 32px rgba(122,156,255,0.15)',
                      }}
                    >
                      {/* Chat header */}
                      <div
                        className="flex items-center justify-between px-3.5 py-2.5"
                        style={{
                          background: 'linear-gradient(135deg, rgba(201,217,255,0.6) 0%, rgba(122,156,255,0.3) 100%)',
                          borderBottom: '1px solid rgba(122,156,255,0.15)',
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center bg-ao-blue-start/40"
                          >
                            <MessageCircle size={12} color="#D4AF37" />
                          </div>
                          <span className="font-dm text-xs font-medium text-ao-dark">AI Assistant</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: '0 0 4px rgba(74,222,128,0.8)' }} />
                        </div>
                        <X size={12} color="#718096" />
                      </div>

                      {/* Messages area */}
                      <div
                        ref={messagesContainerRef}
                        className="px-3 py-3 flex flex-col gap-2 overflow-y-auto bg-white"
                        style={{ maxHeight: '220px', minHeight: '220px' }}
                      >
                        {messages.map(msg => (
                          <div
                            key={msg.id}
                            className={`message-enter flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className="font-dm text-xs leading-relaxed px-3 py-2 rounded-xl max-w-[90%]"
                              style={
                                msg.sender === 'ai'
                                  ? {
                                      backgroundColor: '#F7F9FF',
                                      border: '1px solid rgba(122,156,255,0.2)',
                                      color: '#0F1115',
                                      borderBottomLeftRadius: '4px',
                                    }
                                  : {
                                      background: 'linear-gradient(135deg, #D4AF37, #E8C84A)',
                                      color: '#0F1115',
                                      borderBottomRightRadius: '4px',
                                    }
                              }
                            >
                              {msg.text}
                            </div>
                          </div>
                        ))}

                        {/* Typing indicator */}
                        {showTyping && (
                          <div className="message-enter flex justify-start">
                            <div
                              className="flex items-center gap-1 px-3 py-2.5 rounded-xl"
                              style={{
                                backgroundColor: '#F7F9FF',
                                border: '1px solid rgba(122,156,255,0.15)',
                                borderBottomLeftRadius: '4px',
                              }}
                            >
                              {[0, 1, 2].map(j => (
                                <span
                                  key={j}
                                  className="typing-dot w-1.5 h-1.5 rounded-full"
                                  style={{ backgroundColor: '#D4AF37', animationDelay: `${j * 200}ms` }}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Input bar */}
                      <div
                        className="flex items-center gap-2 px-3 py-2.5"
                        style={{ borderTop: '1px solid rgba(122,156,255,0.12)' }}
                      >
                        <div
                          className="flex-1 rounded-lg px-2.5 py-1.5 font-dm text-xs text-ao-gray"
                          style={{ backgroundColor: '#F7F9FF', border: '1px solid rgba(122,156,255,0.15)' }}
                        >
                          Type a message...
                        </div>
                        <div
                          className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                          style={{ background: 'linear-gradient(135deg, #D4AF37, #E8C84A)' }}
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M1 5H9M9 5L6 2M9 5L6 8" stroke="#0F1115" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Chat launcher button */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #D4AF37, #E8C84A)',
                        boxShadow: '0 4px 20px rgba(212,175,55,0.45)',
                      }}
                    >
                      <MessageCircle size={18} color="#0F1115" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
