/* A line drawing of a hand making a peace sign, for the open column beside
   the home headline. Strokes take the text colour, so it follows the theme,
   and draw themselves on once when the page loads (see .hand-draw in
   globals.css; still under prefers-reduced-motion). */
export default function PeaceHand({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 310"
      aria-hidden="true"
      className={`hand-draw ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
    <path style={{ "--i": 0 } as React.CSSProperties} d="M83.4 181.6 L63.4 99.6 A15 15 0 0 1 92.6 92.4 L112.6 174.4" />
    <path style={{ "--i": 1 } as React.CSSProperties} d="M113.3 169.1 L131.3 77.1 A15 15 0 0 1 160.7 82.9 L142.7 174.9" />
    <path style={{ "--i": 2 } as React.CSSProperties} d="M142.7 174.9 C170 172 186 190 178 206 C172 218 154 218 146 210" />
    <path style={{ "--i": 3 } as React.CSSProperties} d="M148 214 C168 214 178 230 170 244 C164 254 148 256 140 250" />
    <path style={{ "--i": 4 } as React.CSSProperties} d="M140 250 C136 262 130 272 122 280" />
    <path style={{ "--i": 5 } as React.CSSProperties} d="M83.4 181.6 C62 186 48 204 52 226 C55 242 72 250 86 242 C96 236 100 224 96 214" />
    <path style={{ "--i": 6 } as React.CSSProperties} d="M54 234 C54 252 62 268 76 278" />
    <path style={{ "--i": 7 } as React.CSSProperties} d="M74 284 C88 294 108 294 122 284" />
    <path style={{ "--i": 8 } as React.CSSProperties} d="M80.2 139.1 L95.8 135.3" opacity={0.5} />
    <path style={{ "--i": 9 } as React.CSSProperties} d="M128.2 129.3 L144 132.3" opacity={0.5} />
    <path style={{ "--i": 10 } as React.CSSProperties} d="M104 202 C112 212 122 218 136 220" opacity={0.5} />
    </svg>
  );
}
