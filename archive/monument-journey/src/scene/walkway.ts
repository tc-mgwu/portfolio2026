/* Turns route segments into walkway geometry: a top face, one shadow face that
   hangs from the near edge, and a lighter trim line along the outer edge. */

import { ISO } from '../iso';
import { CROSS, STAIR_RUN, STAIR_RISE, type Segment, type Landing } from './path';

const HALF = 0.62;      // walkway half width, in cross-axis units
const THICK = 20;       // how far the shadow face hangs below the near edge
const LAND_HALF = 1.5;  // landings are wider platforms

const p = (x: number, y: number) => `${Math.round(x * 10) / 10},${Math.round(y * 10) / 10}`;

interface Cross { nx: number; ny: number; sign: number; }

function crossOf(seg: Segment, half: number): Cross {
  const c = CROSS[seg.dir];
  return { nx: c.x * half, ny: c.y * half, sign: c.y >= 0 ? 1 : -1 };
}

/** One straight walkway run. */
function run(ax: number, ay: number, bx: number, by: number, c: Cross, cls: string): string {
  const s = c.sign;
  // Near edge carries the drop; far edge carries the trim.
  const an = [ax + c.nx * s, ay + c.ny * s];
  const bn = [bx + c.nx * s, by + c.ny * s];
  const af = [ax - c.nx * s, ay - c.ny * s];
  const bf = [bx - c.nx * s, by - c.ny * s];

  return (
    `<polygon class="way-top ${cls}" points="${p(af[0], af[1])} ${p(bf[0], bf[1])} ${p(bn[0], bn[1])} ${p(an[0], an[1])}"/>` +
    `<polygon class="way-face ${cls}" points="${p(an[0], an[1])} ${p(bn[0], bn[1])} ${p(bn[0], bn[1] + THICK)} ${p(an[0], an[1] + THICK)}"/>` +
    `<path class="way-trim" d="M${p(af[0], af[1])} L${p(bf[0], bf[1])}"/>`
  );
}

/** A stair run, drawn as individual steps so the climb reads as steps. */
function stairs(seg: Segment): string {
  const n = seg.steps ?? 8;
  const dirX = seg.bx > seg.ax ? 1 : -1;
  const c = crossOf(seg, HALF);
  let out = '';
  // Painted from the back of the run forward, so each step overlaps the last.
  for (let i = n - 1; i >= 0; i--) {
    const ax = seg.ax + dirX * STAIR_RUN * i;
    const ay = seg.ay - STAIR_RISE * i;
    const bx = ax + dirX * STAIR_RUN;
    const by = ay - STAIR_RISE;
    const tone = i % 2 === 0 ? 'step-a' : 'step-b';
    const s = c.sign;
    const an = [bx + c.nx * s, by + c.ny * s];
    const bn = [ax + c.nx * s, ay + c.ny * s];
    const af = [bx - c.nx * s, by - c.ny * s];
    const bf = [ax - c.nx * s, ay - c.ny * s];
    out +=
      `<polygon class="way-top ${tone}" points="${p(af[0], af[1])} ${p(an[0], an[1])} ${p(bn[0], bn[1])} ${p(bf[0], bf[1])}"/>` +
      `<polygon class="way-face ${tone}" points="${p(an[0], an[1])} ${p(bn[0], bn[1])} ${p(bn[0], bn[1] + STAIR_RISE + 6)} ${p(an[0], an[1] + STAIR_RISE + 6)}"/>`;
  }
  return out;
}

export function segmentSvg(seg: Segment): string {
  if (seg.kind === 'stairs') return stairs(seg);
  const c = crossOf(seg, HALF);
  const cls = seg.kind === 'elbow' ? 'is-elbow' : '';
  return run(seg.ax, seg.ay, seg.bx, seg.by, c, cls);
}

/** The wider platform a monument stands on, at a route elbow. */
export function landingSvg(l: Landing): string {
  const hw = ISO.hw * LAND_HALF;
  const hh = ISO.hh * LAND_HALF;
  const top = `${p(l.x, l.y - hh)} ${p(l.x + hw, l.y)} ${p(l.x, l.y + hh)} ${p(l.x - hw, l.y)}`;
  return (
    `<g class="landing">` +
      `<polygon class="way-face" points="${p(l.x - hw, l.y)} ${p(l.x, l.y + hh)} ${p(l.x, l.y + hh + THICK + 10)} ${p(l.x - hw, l.y + THICK + 10)}"/>` +
      `<polygon class="way-face" points="${p(l.x, l.y + hh)} ${p(l.x + hw, l.y)} ${p(l.x + hw, l.y + THICK + 10)} ${p(l.x, l.y + hh + THICK + 10)}"/>` +
      `<polygon class="way-top" points="${top}"/>` +
      `<path class="way-trim" d="M${p(l.x - hw, l.y)} L${p(l.x, l.y - hh)} L${p(l.x + hw, l.y)}"/>` +
    `</g>`
  );
}
