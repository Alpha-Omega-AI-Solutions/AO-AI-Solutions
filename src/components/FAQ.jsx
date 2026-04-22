import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'

const faqs = [
  {
    question: 'What is an AI-powered website?',
    answer:
      'An AI-powered website goes beyond a traditional site. It includes a trained AI chatbot, smart lead forms, automated scheduling, and 24/7 customer response — so your website works as an employee even when you\'re not available.',
  },
  {
    question: 'How long does it take to launch an AI website?',
    answer:
      'Most projects launch within 48 to 72 hours after onboarding. Complex custom AI integrations may take 1–2 weeks depending on scope. We\'ll give you a clear timeline on your free strategy call.',
  },
  {
    question: 'What industries do you serve?',
    answer:
      'We work with law firms, dental practices, med spas, real estate agencies, roofing companies, HVAC contractors, and other local service businesses across the United States.',
  },
  {
    question: 'Do I need technical knowledge to manage my AI website?',
    answer:
      'No. We build and manage everything for you. Your AI system is monitored, updated, and maintained by our team on an ongoing basis — you just run your business.',
  },
  {
    question: 'What is included in the monthly maintenance plan?',
    answer:
      'Monthly plans include AI performance monitoring, automation updates, analytics dashboards, content refreshes, and feature upgrades to keep your system current and effective.',
  },
  {
    question: 'How does the free strategy call work?',
    answer:
      'After you submit the contact form, we schedule a free 30-minute strategy call where we learn about your business and show you exactly what we\'d build for you — with no commitment required.',
  },
  {
    question: 'Can my AI website integrate with my existing tools?',
    answer:
      'Yes. We integrate with CRMs, booking platforms, email marketing tools, SMS providers, and more. If you use it in your business, we can likely connect it to your AI system.',
  },
  {
    question: 'What makes AO AI Solutions different from a regular web agency?',
    answer:
      'We are AI Systems Engineers, not web designers. We build infrastructure that generates leads, qualifies them, follows up automatically, and books appointments — all without you lifting a finger.',
  },
]

function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <div
      className="rounded-xl overflow-hidden bg-white"
      style={{
        border: isOpen
          ? '1px solid rgba(212,175,55,0.3)'
          : '1px solid rgba(122,156,255,0.18)',
        boxShadow: isOpen ? '0 4px 20px rgba(212,175,55,0.08)' : 'none',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      <button
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        className="w-full text-left flex items-center justify-between gap-4 px-6 py-5 focus-visible:outline-none"
        style={{ cursor: 'pointer' }}
      >
        <span className="font-dm font-medium text-ao-dark" style={{ fontSize: '15px' }}>
          {faq.question}
        </span>
        <ChevronDown
          size={18}
          color="#D4AF37"
          style={{
            flexShrink: 0,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s ease',
          }}
        />
      </button>

      <div
        style={{
          maxHeight: isOpen ? '300px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
      >
        <p
          className="font-dm font-light text-ao-gray leading-relaxed px-6 pb-5"
          style={{ fontSize: '14px' }}
        >
          {faq.answer}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const [headerRef, headerVisible] = useScrollReveal()
  const [listRef,   listVisible]   = useScrollReveal()

  const handleToggle = (index) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="section-pad"
      style={{ backgroundColor: '#F7F9FF' }}
    >
      <div className="max-w-3xl mx-auto">

        <div ref={headerRef} className="text-center mb-12">
          <p className="font-dm font-medium tracking-widest uppercase text-sm text-ao-gold mb-3" style={revealStyle(headerVisible)}>
            FAQ
          </p>
          <h2
            className="font-heading font-bold text-ao-dark mb-4"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              ...revealStyle(headerVisible, 60),
            }}
          >
            Frequently Asked Questions
          </h2>
          <p
            className="font-dm font-light text-ao-gray"
            style={{ fontSize: '17px', ...revealStyle(headerVisible, 100) }}
          >
            Everything you need to know before getting started.
          </p>
        </div>

        <div ref={listRef} className="flex flex-col gap-3" style={revealStyle(listVisible)}>
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={handleToggle}
            />
          ))}
        </div>

        <div
          className="text-center mt-10"
          style={{
            opacity: listVisible ? 1 : 0,
            transition: 'opacity 0.5s ease 400ms',
          }}
        >
          <p className="font-dm font-light text-ao-gray text-sm">
            Still have questions?{' '}
            <a
              href="#contact"
              className="text-ao-gold underline underline-offset-4 hover:text-ao-gold-light transition-colors"
              aria-label="Contact AO AI Solutions with your question"
            >
              Send us a message
            </a>
          </p>
        </div>

      </div>
    </section>
  )
}
