/* 2:1 dimetric projection.

   One step along a grid axis moves 2 units across and 1 unit down, so every
   horizontal edge in the scene sits at the same 26.57 degree slope. Sharing one
   helper is what keeps a hand-built isometric scene from looking broken.

   Note: the spec says "±30°" alongside "2 units across = 1 unit down". Those
   describe different angles; 2:1 is the one that keeps geometry on the unit
   grid, so that is what this implements. */

export const ISO = {
  /** Half tile width: grid step along x or z, horizontally. */
  hw: 24,
  /** Half tile height: grid step along x or z, vertically. */
  hh: 12,
  /** Screen rise of one unit of height. */
  vh: 24,
} as const;

export type Point = readonly [number, number];

export function project(x: number, y: number, z: number): Point {
  return [(x - z) * ISO.hw, (x + z) * ISO.hh - y * ISO.vh];
}

function poly(points: Point[]): string {
  return points.map(([x, y]) => `${round(x)},${round(y)}`).join(' ');
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

export interface Faces {
  /** Lightest: the face you look down on. */
  top: string;
  /** Mid tone: the face at z + d, falling away to the lower left. */
  left: string;
  /** Darkest: the face at x + w, falling away to the lower right. */
  right: string;
}

/**
 * The three visible faces of a cuboid whose near-bottom corner is (x, y, z),
 * measured in grid units.
 */
export function cuboid(
  x: number, y: number, z: number,
  w: number, d: number, h: number,
): Faces {
  const t = y + h;
  return {
    top: poly([
      project(x, t, z),
      project(x + w, t, z),
      project(x + w, t, z + d),
      project(x, t, z + d),
    ]),
    left: poly([
      project(x, t, z + d),
      project(x + w, t, z + d),
      project(x + w, y, z + d),
      project(x, y, z + d),
    ]),
    right: poly([
      project(x + w, t, z),
      project(x + w, t, z + d),
      project(x + w, y, z + d),
      project(x + w, y, z),
    ]),
  };
}

/** A cuboid as SVG markup, painted back to front. */
export function prism(
  x: number, y: number, z: number,
  w: number, d: number, h: number,
  cls = '',
): string {
  const f = cuboid(x, y, z, w, d, h);
  const c = cls ? ` ${cls}` : '';
  return (
    `<polygon class="f-left${c}" points="${f.left}"/>` +
    `<polygon class="f-right${c}" points="${f.right}"/>` +
    `<polygon class="f-top${c}" points="${f.top}"/>`
  );
}

/** A flat diamond at height y: used for path tiles and platform caps. */
export function slab(x: number, y: number, z: number, w: number, d: number, h = 0.22, cls = ''): string {
  return prism(x, y, z, w, d, h, cls);
}

/** A stepped run of prisms, each one unit higher than the last. */
export function stairs(
  x: number, y: number, z: number,
  steps: number, w: number, d: number, rise = 0.5,
  cls = '',
): string {
  let out = '';
  for (let i = steps - 1; i >= 0; i--) {
    out += prism(x + i * w, y, z, w, d, (i + 1) * rise, cls);
  }
  return out;
}
