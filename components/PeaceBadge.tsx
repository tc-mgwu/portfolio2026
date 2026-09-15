/* The site mark: the ✌ character, monochrome and in rust, beside the name.
   The variation selector asks for the text glyph, not the emoji.
   Decorative; the name carries the link text. */
export default function PeaceBadge({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`grid place-items-center text-accent ${className}`}>
      <span className="text-[1.35em] leading-none">{'✌︎'}</span>
    </span>
  );
}
