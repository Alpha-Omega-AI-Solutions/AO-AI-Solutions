import { useScrollReveal, revealStyle } from '../hooks/useScrollReveal'

const industries = [
  'Law Firms',
  'Dental Practices',
  'Med Spas',
  'Real Estate',
  'Roofing',
  'HVAC',
  'Contractors',
]

export default function SocialProof() {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section
      ref={ref}
      className="py-6 px-6 bg-white"
      style={{
        borderTop:    '1px solid #E6E8EF',
        borderBottom: '1px solid #E6E8EF',
        ...revealStyle(isVisible),
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4 justify-center sm:justify-start">
        <span className="font-dm font-medium tracking-widest uppercase text-xs text-ao-gold whitespace-nowrap mr-2">
          Trusted by businesses in:
        </span>
        {industries.map((industry, i) => (
          <span
            key={industry}
            className="font-dm text-sm text-ao-gray px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors duration-200 hover:text-ao-gold"
            style={{
              border: '1px solid #E6E8EF',
              backgroundColor: '#F7F9FF',
              opacity: isVisible ? 1 : 0,
              transition: `opacity 0.5s ease ${100 + i * 50}ms, color 0.2s ease`,
              willChange: 'opacity',
            }}
          >
            {industry}
          </span>
        ))}
      </div>
    </section>
  )
}
