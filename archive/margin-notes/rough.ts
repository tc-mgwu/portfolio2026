/* Hand-drawn strokes, generated rather than traced.

   A deterministic pseudo-random walk offsets each sample point, so a line has
   the waver of a pen without ever being random between renders. Every mark is
   drawn twice with different seeds, which is what makes a felt-tip circle read
   as hand-made instead of as a wobbly vector. */

function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const round = (n: number) => Math.round(n * 10) / 10;

/** A wavering line from a to b. */
export function line(
  x1: number, y1: number, x2: number, y2: number,
  seed = 1, wobble = 1.6,
): string {
  const rand = rng(seed);
  const steps = Math.max(3, Math.round(Math.hypot(x2 - x1, y2 - y1) / 28));
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // Ends stay put; the middle is free to wander.
    const damp = Math.sin(t * Math.PI);
    const ox = (rand() - 0.5) * wobble * 2 * damp;
    const oy = (rand() - 0.5) * wobble * 2 * damp;
    pts.push(`${round(x1 + (x2 - x1) * t + ox)},${round(y1 + (y2 - y1) * t + oy)}`);
  }
  return `M${pts.join(' L')}`;
}

/** An ellipse drawn as an overshooting loop, the way a pen circles something. */
export function circle(
  cx: number, cy: number, rx: number, ry: number,
  seed = 1, wobble = 2.4,
): string {
  const rand = rng(seed);
  const steps = 26;
  // Start a little past the top and overshoot the close, like a real pen stroke.
  const start = -0.35;
  const end = Math.PI * 2 + 0.22;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const a = start + ((end - start) * i) / steps;
    const ox = (rand() - 0.5) * wobble;
    const oy = (rand() - 0.5) * wobble;
    pts.push(`${round(cx + Math.cos(a) * rx + ox)},${round(cy + Math.sin(a) * ry + oy)}`);
  }
  return `M${pts.join(' L')}`;
}

/** A curved arrow from a to b, with a two-stroke head. */
export function arrow(
  x1: number, y1: number, x2: number, y2: number,
  bend = 0.3, seed = 1,
): { shaft: string; head: string } {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  // Push the control point perpendicular to the run, so the shaft arcs.
  const cx = mx - dy * bend;
  const cy = my + dx * bend;

  const rand = rng(seed);
  const j = () => (rand() - 0.5) * 1.6;
  const shaft = `M${round(x1 + j())},${round(y1 + j())} Q${round(cx)},${round(cy)} ${round(x2 + j())},${round(y2 + j())}`;

  // Head aligns with the tangent at the end, which points away from the control.
  const ang = Math.atan2(y2 - cy, x2 - cx);
  const len = 11;
  const spread = 0.42;
  const hx1 = x2 - Math.cos(ang - spread) * len;
  const hy1 = y2 - Math.sin(ang - spread) * len;
  const hx2 = x2 - Math.cos(ang + spread) * len;
  const hy2 = y2 - Math.sin(ang + spread) * len;
  const head =
    `M${round(hx1)},${round(hy1)} L${round(x2)},${round(y2)} L${round(hx2)},${round(hy2)}`;

  return { shaft, head };
}

/** Two overlapping strokes under a run of text. */
export function underline(x1: number, x2: number, y: number, seed = 1): string {
  return `${line(x1, y, x2, y, seed, 1.5)} ${line(x1 + 3, y + 2.5, x2 - 2, y + 2.5, seed + 7, 1.2)}`;
}
