'use client'
import { useId } from 'react'

export default function FCLogo({ size = 48 }: { size?: number }) {
  const uid = useId().replace(/:/g, '-')

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Fraccionadora Carhué"
    >
      <defs>
        {/* Top arc: counterclockwise through top — baseline at r=86 */}
        <path id={`top-${uid}`} d="M 14,100 A 86,86 0 0,0 186,100" />
        {/* Bottom arc: clockwise through bottom — baseline at r=86 */}
        <path id={`bot-${uid}`} d="M 14,100 A 86,86 0 0,1 186,100" />
        {/* Clip to just inside inner ring so ribbon doesn't overdraw it */}
        <clipPath id={`clip-${uid}`}>
          <circle cx="100" cy="100" r="77" />
        </clipPath>
      </defs>

      {/* ── Background circle ── */}
      <circle cx="100" cy="100" r="100" fill="#452C6E" />

      {/* ── Outer ring ── */}
      <circle cx="100" cy="100" r="93" fill="none" stroke="white" strokeWidth="2.5" />

      {/* ── Inner ring ── */}
      <circle cx="100" cy="100" r="78" fill="none" stroke="white" strokeWidth="1.5" />

      {/* ── Ribbon background (slightly darker purple) ── */}
      <rect
        x="0" y="76" width="200" height="57"
        fill="#3a1e62"
        clipPath={`url(#clip-${uid})`}
      />

      {/* ── Ribbon separator lines ── */}
      {/* Top: at y=76, inner-ring x-span ≈ 26–174 */}
      <line x1="26" y1="76" x2="174" y2="76" stroke="white" strokeWidth="1.5" />
      {/* Bottom: at y=133, inner-ring x-span ≈ 28–172 */}
      <line x1="28" y1="133" x2="172" y2="133" stroke="white" strokeWidth="1.5" />

      {/* ── Left decorative stripes (≡) ── */}
      <rect x="24" y="94"  width="36" height="2.5" fill="white" rx="1" />
      <rect x="24" y="103" width="36" height="2.5" fill="white" rx="1" />
      <rect x="24" y="112" width="36" height="2.5" fill="white" rx="1" />

      {/* ── Right decorative stripes (≡) ── */}
      <rect x="140" y="94"  width="36" height="2.5" fill="white" rx="1" />
      <rect x="140" y="103" width="36" height="2.5" fill="white" rx="1" />
      <rect x="140" y="112" width="36" height="2.5" fill="white" rx="1" />

      {/* ── FC ── */}
      <text
        x="100" y="121"
        textAnchor="middle"
        fill="white"
        fontSize="47"
        fontWeight="900"
        fontStyle="italic"
        fontFamily="Poppins, Arial, sans-serif"
      >
        FC
      </text>

      {/* ── 1990 ── */}
      <text
        x="100" y="131"
        textAnchor="middle"
        fill="white"
        fontSize="10"
        fontWeight="600"
        letterSpacing="3"
        fontFamily="Poppins, Arial, sans-serif"
      >
        1990
      </text>

      {/* ── FRACCIONADORA – top arc ── */}
      <text
        fill="white"
        fontSize="11.5"
        fontWeight="700"
        letterSpacing="2"
        fontFamily="Poppins, Arial, sans-serif"
      >
        <textPath href={`#top-${uid}`} startOffset="50%" textAnchor="middle">
          FRACCIONADORA
        </textPath>
      </text>

      {/* ── CARHUÉ – bottom arc ── */}
      <text
        fill="white"
        fontSize="12.5"
        fontWeight="700"
        letterSpacing="9"
        fontFamily="Poppins, Arial, sans-serif"
      >
        <textPath href={`#bot-${uid}`} startOffset="50%" textAnchor="middle">
          CARHUÉ
        </textPath>
      </text>
    </svg>
  )
}
