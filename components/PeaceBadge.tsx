/* The site mark: the ✌ character, monochrome and in rust, inside a soft
   disc beside the name. The variation selector asks for the text glyph, not
   the emoji. Decorative; the name carries the link text. */
export default function PeaceBadge({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid place-items-center rounded-full bg-accent-soft text-accent ${className}`}
    >
      <span className="translate-y-[0.02em] text-[1.15em] leading-none">{'✌︎'}</span>
    </span>
  );
}
