/* The route is an ordered polyline. Segments may only run along the 2:1 iso
   diagonals or climb as stair runs; there are no horizontal or free-angle
   pieces. The character's position is a single scalar s (distance along the
   route), so "forward" is always forward no matter which way the screen
   direction points. */

import { ISO } from '../iso';

export type Dir = 'ru' | 'rd' | 'lu' | 'ld';

/** Screen-space unit vectors for the four iso ground directions. */
const STEP: Record<Dir, { x: number; y: number }> = {
  rd: { x: ISO.hw, y: ISO.hh },    // right and down: along +x
  ru: { x: ISO.hw, y: -ISO.hh },   // right and up:   along -z
  ld: { x: -ISO.hw, y: ISO.hh },   // left and down:  along +z
  lu: { x: -ISO.hw, y: -ISO.hh },  // left and up:    along -x
};

/** The cross axis of each direction, used to give the walkway its width. */
const CROSS: Record<Dir, { x: number; y: number }> = {
  rd: { x: -ISO.hw, y: ISO.hh },
  ru: { x: ISO.hw, y: ISO.hh },
  ld: { x: ISO.hw, y: -ISO.hh },
  lu: { x: -ISO.hw, y: -ISO.hh },
};

export const STAIR_RUN = 22;   // screen x advance per step
export const STAIR_RISE = 17;  // screen y climb per step

type Op =
  | { kind: 'diag'; dir: Dir; units: number; under?: boolean }
  | { kind: 'stairs'; steps: number; left?: boolean }
  | { kind: 'landing'; chapter: string }
  | { kind: 'elbow' };

/* The climb: bottom-left to top-right, monuments on landings, each landing
   higher than the last. Career as ascent. */
const ROUTE: Op[] = [
  { kind: 'diag', dir: 'ru', units: 7 },
  { kind: 'landing', chapter: 'bell' },
  { kind: 'diag', dir: 'ru', units: 3 },
  { kind: 'stairs', steps: 8 },
  { kind: 'diag', dir: 'rd', units: 6 },
  { kind: 'landing', chapter: 'totem' },
  { kind: 'diag', dir: 'ru', units: 5 },
  { kind: 'stairs', steps: 9 },
  { kind: 'diag', dir: 'rd', units: 5 },
  { kind: 'landing', chapter: 'columns' },
  { kind: 'diag', dir: 'ru', units: 8 },
  { kind: 'stairs', steps: 8 },
  { kind: 'diag', dir: 'rd', units: 4 },
  { kind: 'landing', chapter: 'gate' },
  { kind: 'diag', dir: 'ru', units: 6 },
  { kind: 'stairs', steps: 10 },
  // Doubles back to the left at height, crossing over earlier geometry.
  { kind: 'diag', dir: 'lu', units: 7, under: true },
  { kind: 'diag', dir: 'ru', units: 11 },
  { kind: 'landing', chapter: 'telescope' },
  { kind: 'diag', dir: 'ru', units: 4 },
  { kind: 'stairs', steps: 8 },
  { kind: 'elbow' },
  { kind: 'diag', dir: 'ru', units: 7 },
  { kind: 'landing', chapter: 'teahouse' },
];

export interface Segment {
  kind: 'diag' | 'stairs' | 'elbow';
  dir: Dir;
  ax: number; ay: number;
  bx: number; by: number;
  /** Distance along the route at which this segment starts. */
  s0: number;
  len: number;
  steps?: number;
  under?: boolean;
}

export interface Landing {
  chapter: string;
  x: number; y: number;
  s: number;
}

const START = { x: 140, y: 1180 };

export const SEGMENTS: Segment[] = [];
export const LANDINGS: Landing[] = [];

(function buildRoute() {
  let x = START.x;
  let y = START.y;
  let s = 0;
  let lastDir: Dir = 'ru';

  for (const op of ROUTE) {
    if (op.kind === 'landing') {
      LANDINGS.push({ chapter: op.chapter, x, y, s });
      continue;
    }

    let bx = x;
    let by = y;
    let dir: Dir = lastDir;
    let steps: number | undefined;

    if (op.kind === 'diag') {
      dir = op.dir;
      bx = x + STEP[dir].x * op.units;
      by = y + STEP[dir].y * op.units;
    } else if (op.kind === 'stairs') {
      const sign = op.left ? -1 : 1;
      dir = op.left ? 'lu' : 'ru';
      steps = op.steps;
      bx = x + sign * STAIR_RUN * op.steps;
      by = y - STAIR_RISE * op.steps;
    } else {
      // The rotation elbow: a short run that only connects once aligned.
      dir = 'ru';
      bx = x + STEP.ru.x * 3;
      by = y + STEP.ru.y * 3;
    }

    const len = Math.hypot(bx - x, by - y);
    SEGMENTS.push({
      kind: op.kind === 'stairs' ? 'stairs' : op.kind === 'elbow' ? 'elbow' : 'diag',
      dir, ax: x, ay: y, bx, by, s0: s, len, steps,
      under: op.kind === 'diag' ? op.under : undefined,
    });

    x = bx; y = by; s += len; lastDir = dir;
  }
})();

export const TOTAL = SEGMENTS.reduce((n, seg) => n + seg.len, 0);

export const BOUNDS = (() => {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const seg of SEGMENTS) {
    minX = Math.min(minX, seg.ax, seg.bx);
    maxX = Math.max(maxX, seg.ax, seg.bx);
    minY = Math.min(minY, seg.ay, seg.by);
    maxY = Math.max(maxY, seg.ay, seg.by);
  }
  return { minX, maxX, minY, maxY };
})();

export function segmentAt(s: number): Segment {
  const c = Math.max(0, Math.min(TOTAL, s));
  for (let i = SEGMENTS.length - 1; i >= 0; i--) if (c >= SEGMENTS[i].s0) return SEGMENTS[i];
  return SEGMENTS[0];
}

export interface RoutePoint { x: number; y: number; seg: Segment; local: number; }

export function pointAt(s: number): RoutePoint {
  const c = Math.max(0, Math.min(TOTAL, s));
  const seg = segmentAt(c);
  const local = seg.len === 0 ? 0 : (c - seg.s0) / seg.len;
  return {
    x: seg.ax + (seg.bx - seg.ax) * local,
    y: seg.ay + (seg.by - seg.ay) * local,
    seg,
    local,
  };
}

/** Nearest point on the polyline to a screen-world coordinate, as a distance s. */
export function nearestS(px: number, py: number): number {
  let best = 0;
  let bestD = Infinity;
  for (const seg of SEGMENTS) {
    const dx = seg.bx - seg.ax;
    const dy = seg.by - seg.ay;
    const l2 = dx * dx + dy * dy;
    const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((px - seg.ax) * dx + (py - seg.ay) * dy) / l2));
    const cx = seg.ax + dx * t;
    const cy = seg.ay + dy * t;
    const d = Math.hypot(px - cx, py - cy);
    if (d < bestD) { bestD = d; best = seg.s0 + seg.len * t; }
  }
  return best;
}

export function landingFor(chapter: string): Landing | undefined {
  return LANDINGS.find((l) => l.chapter === chapter);
}

export { STEP, CROSS };
