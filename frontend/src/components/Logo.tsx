type LogoProps = { className?: string; size?: number };

/**
 * Pinakes logo — Pi (Π) glyph inside a circular Greek key (meander) frame.
 * Uses `currentColor` throughout: set color via CSS (e.g. text-[#C8892A] in Tailwind).
 * Crisp at 16px (favicon) through full display sizes.
 */
export function Logo({ className, size = 32 }: LogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Pinakes"
      fill="none"
    >
      {/* Outer circle border */}
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.5" />

      {/* Greek key meander accent — 4 cardinal axis ticks + 4 corner L-motifs */}
      {/* Top tick */}
      <path
        d="M26,6 L26,4 L38,4 L38,6 M26,8 L26,4 M38,8 L38,4"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
        opacity="0.4"
      />
      {/* Right tick */}
      <path
        d="M58,26 L60,26 L60,38 L58,38 M56,26 L60,26 M56,38 L60,38"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
        opacity="0.4"
      />
      {/* Bottom tick */}
      <path
        d="M26,58 L26,60 L38,60 L38,58 M26,56 L26,60 M38,56 L38,60"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
        opacity="0.4"
      />
      {/* Left tick */}
      <path
        d="M6,26 L4,26 L4,38 L6,38 M8,26 L4,26 M8,38 L4,38"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
        opacity="0.4"
      />
      {/* NE corner meander L */}
      <path
        d="M44,8 L48,8 L48,12 M44,12 L48,12"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
        opacity="0.4"
      />
      {/* SE corner meander L */}
      <path
        d="M52,44 L56,44 L56,48 M52,48 L56,48"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
        opacity="0.4"
      />
      {/* SW corner meander L */}
      <path
        d="M8,44 L12,44 L12,48 M8,48 L12,48"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
        opacity="0.4"
      />
      {/* NW corner meander L */}
      <path
        d="M8,12 L12,12 L12,16 M8,16 L12,16"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
        opacity="0.4"
      />

      {/* Pi (Π) glyph — crossbar + two vertical descenders */}
      <path
        d="M20,23 L44,23 M23,23 L23,44 M41,23 L41,44"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
