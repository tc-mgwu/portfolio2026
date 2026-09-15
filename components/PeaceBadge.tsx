/* The site mark: a terracotta disc with a line-drawn peace sign, beside the
   name in the header. Decorative; the name carries the link text. */
export default function PeaceBadge({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <circle cx="20" cy="20" r="20" className="fill-accent" />
      <g
        fill="none"
        stroke="#FAF8F5"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(20 20) scale(0.62) translate(-20 -20)"
      >
        <path d="M15.5 22.5 L11.2 9.6 A2.6 2.6 0 0 1 16.2 8 L19.6 19.4" />
        <path d="M19.6 19.4 L22.6 7.2 A2.6 2.6 0 0 1 27.6 8.6 L24.8 22.4" />
        <path d="M24.8 22.4 C29 21.2 31.4 24.4 29.8 27 C28.6 29 25.6 29 24.2 27.6" />
        <path d="M25 29 C28.4 29.2 30 32 28.2 34 C26.8 35.6 24 35.4 22.6 34.2" />
        <path d="M15.5 22.5 C11.6 23 9.4 26.4 10.4 29.8 C11.2 32.4 14.2 33.4 16.4 31.8" />
        <path d="M11 30.6 C11.2 33.6 12.6 35.6 14.6 36.6 M22.6 34.2 C21.4 35.6 19.6 36.6 17.6 36.8" />
      </g>
    </svg>
  );
}
