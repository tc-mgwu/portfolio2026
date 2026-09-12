/* Coded placeholder artwork for the image slots.

   These exist so the slots read as designed rather than empty, and so there is
   internal detail for the parallax to move against. They are geometry in the
   site palette, not illustration, and they are meant to be replaced by real
   product screens. */

const ART: Record<string, React.ReactNode> = {
  // Concentric arcs: a system settling into alignment.
  sense: (
    <>
      <rect width="600" height="440" fill="var(--color-paper-2)" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <circle
          key={i}
          cx="392"
          cy="318"
          r={54 + i * 52}
          fill="none"
          stroke="var(--color-ink)"
          strokeOpacity={0.13 - i * 0.012}
          strokeWidth="1.5"
        />
      ))}
      <circle cx="392" cy="318" r="42" fill="var(--color-accent)" fillOpacity="0.9" />
      <rect x="54" y="70" width="196" height="1.5" fill="var(--color-ink)" fillOpacity="0.22" />
      <rect x="54" y="104" width="128" height="1.5" fill="var(--color-ink)" fillOpacity="0.16" />
      <rect x="54" y="138" width="164" height="1.5" fill="var(--color-ink)" fillOpacity="0.16" />
      <rect x="54" y="196" width="92" height="92" rx="6" fill="var(--color-ink)" fillOpacity="0.07" />
    </>
  ),

  // A field of rules with one block breaking the grid.
  meridian: (
    <>
      <rect width="600" height="440" fill="var(--color-paper-2)" />
      {Array.from({ length: 13 }, (_, i) => (
        <rect
          key={i}
          x={40 + i * 42}
          y="40"
          width="1.5"
          height="360"
          fill="var(--color-ink)"
          fillOpacity={0.1}
        />
      ))}
      <rect x="166" y="132" width="212" height="148" rx="8" fill="var(--color-accent)" fillOpacity="0.14" />
      <rect x="166" y="132" width="212" height="148" rx="8" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeOpacity="0.7" />
      <rect x="188" y="300" width="168" height="1.5" fill="var(--color-ink)" fillOpacity="0.3" />
      <circle cx="378" cy="132" r="7" fill="var(--color-accent)" />
    </>
  ),

  // Stacked bars stepping up: a system being built in layers.
  lantern: (
    <>
      <rect width="600" height="440" fill="var(--color-paper-2)" />
      {[
        { x: 66, h: 96 }, { x: 150, h: 158 }, { x: 234, h: 124 },
        { x: 318, h: 212 }, { x: 402, h: 168 }, { x: 486, h: 248 },
      ].map((b, i) => (
        <rect
          key={b.x}
          x={b.x}
          y={370 - b.h}
          width="52"
          height={b.h}
          rx="5"
          fill={i === 5 ? 'var(--color-accent)' : 'var(--color-ink)'}
          fillOpacity={i === 5 ? 0.85 : 0.08 + i * 0.015}
        />
      ))}
      <rect x="66" y="372" width="472" height="1.5" fill="var(--color-ink)" fillOpacity="0.2" />
      <rect x="66" y="60" width="150" height="1.5" fill="var(--color-ink)" fillOpacity="0.22" />
      <rect x="66" y="88" width="98" height="1.5" fill="var(--color-ink)" fillOpacity="0.14" />
    </>
  ),
};

/* Until real product screens land, each project gets one of the compositions,
   picked from its slug so a given project always looks the same. */
const VARIANTS = ['sense', 'meridian', 'lantern'] as const;

function variantFor(slug: string): string {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return VARIANTS[h % VARIANTS.length];
}

export default function PlateArt({ slug }: { slug: string }) {
  const art = ART[variantFor(slug)];
  return (
    <svg
      viewBox="0 0 600 440"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      {art}
    </svg>
  );
}
