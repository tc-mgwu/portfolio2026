/* A cat at a laptop, in one weight of line. Strokes take the current text
   colour so the drawing sits with the type in both themes; the heart on the
   screen is the accent. Decorative: hidden from assistive tech. */

export default function CatAtLaptop({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 240"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* desk line */}
      <path d="M14 212h292" />

      {/* laptop: base, then the open screen leaning back to the left */}
      <path d="M70 212l14-30h116l-6 30" />
      <path d="M88 188h100" strokeWidth="1.5" />
      <path d="M84 182L66 92c-1-5 3-9 8-9h108c5 0 8 4 7 9l-14 90" />
      <path d="M76 88h104" strokeWidth="1.5" opacity=".5" />
      {/* the heart on the screen */}
      <path
        d="M132 138c-6-8-18-6-18 4 0 9 12 16 18 22 6-6 18-13 18-22 0-10-12-12-18-4z"
        stroke="var(--color-accent)"
      />

      {/* cat: body behind the laptop, head above the screen edge */}
      <path d="M208 212c-2-26 4-54 22-70" />
      <path d="M298 212c4-30-2-58-18-74" />
      <path d="M230 142c6-6 14-9 22-9 12 0 24 6 32 16" />
      {/* head */}
      <path d="M226 128c-4-24 8-42 30-44 22-2 40 14 40 38 0 20-16 32-36 32-18 0-30-10-34-26z" />
      {/* ears */}
      <path d="M232 100l-4-30 24 18" />
      <path d="M290 100l6-30-24 16" />
      {/* eyes, closed and content */}
      <path d="M246 118c4 4 8 4 12 0" />
      <path d="M270 118c4 4 8 4 12 0" />
      {/* nose and mouth */}
      <path d="M262 130l2 3 2-3z" />
      <path d="M264 133c-3 4-6 5-9 4M264 133c3 4 6 5 9 4" strokeWidth="1.75" />
      {/* whiskers */}
      <path d="M244 132l-22-4M244 138l-22 2M284 132l22-4M284 138l22 2" strokeWidth="1.5" />
      {/* front paws resting on the laptop base */}
      <path d="M204 182c-10 0-16 6-14 12s10 6 18 4" />
      <path d="M214 178c-6 4-10 10-8 16s12 6 18 2" />
      {/* tail, curling up beside the body */}
      <path d="M298 200c14-6 20-22 12-36-6-10-20-10-24 0" />

      {/* mug with steam */}
      <path d="M26 212v-26h34v26" />
      <path d="M60 192c8-2 12 4 10 10s-8 6-10 4" />
      <path d="M36 176c-3-4 3-8 0-12M48 176c-3-4 3-8 0-12" strokeWidth="1.5" opacity=".7" />
    </svg>
  );
}
