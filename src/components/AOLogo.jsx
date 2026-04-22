// SVG recreation of the A|O geometric logo mark
export default function AOLogo({ className = 'h-8 w-auto', color = '#D4AF37' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 90 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AO AI Solutions logo"
    >
      {/* A — geometric chevron/triangle letterform */}
      <path
        d="M4 40 L18 6 L32 40"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* A crossbar */}
      <line
        x1="9"
        y1="27"
        x2="27"
        y2="27"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Vertical divider | */}
      <line
        x1="45"
        y1="4"
        x2="45"
        y2="40"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* O — circle */}
      <circle
        cx="71"
        cy="23"
        r="17"
        stroke={color}
        strokeWidth="4"
        fill="none"
      />
    </svg>
  )
}
