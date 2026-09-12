/* Every monument is 3-6 stacked primitives plus one accent shape that names it.
   No windows, no doors, no texture. Colour comes from CSS custom properties set
   on the group, so the three-tone rule is applied in exactly one place. */

import { ISO, prism, stairs, project } from '../iso';
import type { Chapter } from './chapters';

/** A cylinder: top cap in the light tone, body split into mid and dark halves. */
function cylinder(x: number, y: number, z: number, r: number, h: number, cls = ''): string {
  const [tx, ty] = project(x, y + h, z);
  const [bx, by] = project(x, y, z);
  const rx = r * ISO.hw * 2;
  const ry = r * ISO.hh * 2;
  const c = cls ? ` ${cls}` : '';
  return (
    `<path class="f-left${c}" d="M${tx - rx},${ty} L${bx - rx},${by} A${rx},${ry} 0 0 0 ${bx},${by + ry} L${tx},${ty + ry} A${rx},${ry} 0 0 1 ${tx - rx},${ty} Z"/>` +
    `<path class="f-right${c}" d="M${tx + rx},${ty} L${bx + rx},${by} A${rx},${ry} 0 0 1 ${bx},${by + ry} L${tx},${ty + ry} A${rx},${ry} 0 0 0 ${tx + rx},${ty} Z"/>` +
    `<ellipse class="f-top${c}" cx="${tx}" cy="${ty}" rx="${rx}" ry="${ry}"/>`
  );
}

function at(x: number, y: number, z: number): string {
  const [px, py] = project(x, y, z);
  return `${px} ${py}`;
}

/* ---- 1. Bell: a block, a stair run, an open arch holding a bell ---------- */
function bell(): string {
  return (
    stairs(-2.4, 0, 0.9, 3, 0.8, 1.2, 0.32) +
    prism(0, 0, 0, 3, 3, 1.05) +
    prism(0.5, 1.05, 0.5, 2, 2, 0.5) +
    // The arch: two posts and a lintel, left open.
    prism(0.62, 1.55, 0.8, 0.32, 0.32, 1.5) +
    prism(2.06, 1.55, 0.8, 0.32, 0.32, 1.5) +
    prism(0.62, 3.05, 0.8, 1.76, 0.32, 0.28) +
    `<g class="accent-bell"><path class="accent" d="M${at(1.52, 2.72, 0.96)} m-9,0 a9,11 0 0 1 18,0 l2,4 -22,0 Z"/>` +
    `<circle class="accent" cx="${project(1.52, 2.52, 0.96)[0]}" cy="${project(1.52, 2.52, 0.96)[1]}" r="2.4"/></g>`
  );
}

/* ---- 2. Totem: a square pillar whose faces carry the archive labels ------ */
function totem(): string {
  const plus =
    `<path class="accent" d="M-5,-16 h10 v10 h10 v10 h-10 v10 h-10 v-10 h-10 v-10 h10 Z"/>`;
  const wave =
    `<path class="accent-line" d="M-18,-4 q6,-11 12,0 t12,0 t12,0"/>`;
  return (
    prism(0, 0, 0, 2.6, 2.6, 0.55) +
    `<g class="totem-spin" data-face="0">` +
      prism(0.55, 0.55, 0.55, 1.5, 1.5, 3.1) +
      // Face insets identify each side beyond its text.
      `<g class="totem-inset totem-inset--left" transform="translate(${project(1.3, 2.0, 2.05)})">${plus}</g>` +
      `<g class="totem-inset totem-inset--right" transform="translate(${project(2.05, 2.0, 1.3)})">${wave}</g>` +
    `</g>`
  );
}

/* ---- 3. Columns: a stepped base, four thin prisms, one lintel ------------ */
function columns(): string {
  let shafts = '';
  for (let i = 3; i >= 0; i--) {
    shafts += prism(0.55 + i * 0.72, 0.95, 0.55 + i * 0.06, 0.3, 0.3, 2.15);
  }
  return (
    prism(0, 0, 0, 4, 3.2, 0.5) +
    prism(0.35, 0.5, 0.35, 3.3, 2.5, 0.45) +
    shafts +
    prism(0.4, 3.1, 0.4, 3.2, 0.9, 0.36, 'is-accent')
  );
}

/* ---- 4. Gate: two towers and a span the path runs through ---------------- */
function gate(): string {
  return (
    prism(-0.9, 0, 0.4, 1.1, 2.4, 3.3) +
    prism(2.7, 0, 0.4, 1.1, 2.4, 3.3) +
    prism(-0.9, 3.3, 0.4, 4.7, 2.4, 0.42) +
    // The threshold itself: a pale sliver of light under the span.
    `<polygon class="accent-soft" points="${[
      at(0.2, 3.3, 1.0), at(2.7, 3.3, 1.0), at(2.7, 2.1, 1.0), at(0.2, 2.1, 1.0),
    ].join(' ')}"/>`
  );
}

/* ---- 5. Telescope: a drum on a stepped base, with a tilted barrel -------- */
function telescope(): string {
  const [px, py] = project(1.5, 2.45, 1.5);
  return (
    prism(0, 0, 0, 3, 3, 0.55) +
    prism(0.4, 0.55, 0.4, 2.2, 2.2, 0.5) +
    cylinder(1.5, 1.05, 1.5, 0.7, 1.4) +
    `<g class="scope" transform="translate(${px} ${py}) rotate(-32)">` +
      `<rect class="f-left" x="-6" y="-9" width="54" height="18" rx="9"/>` +
      `<rect class="f-right" x="-6" y="0" width="54" height="9" rx="4.5"/>` +
      `<circle class="accent" cx="46" cy="0" r="7.5"/>` +
    `</g>`
  );
}

/* ---- 6. Teahouse: a pagoda stack, a glowing doorway, a chimney ----------- */
function teahouse(): string {
  return (
    prism(0, 0, 0, 3.6, 3.6, 0.45) +
    prism(0.45, 0.45, 0.45, 2.7, 2.7, 1.0) +
    prism(-0.15, 1.45, -0.15, 4.2, 4.2, 0.22) +
    prism(0.95, 1.67, 0.95, 1.7, 1.7, 0.85) +
    prism(0.45, 2.52, 0.45, 2.7, 2.7, 0.2) +
    prism(1.35, 2.72, 1.35, 0.9, 0.9, 0.6) +
    `<polygon class="accent-glow" points="${[
      at(1.35, 1.45, 3.15), at(2.25, 1.45, 3.15), at(2.25, 0.45, 3.15), at(1.35, 0.45, 3.15),
    ].join(' ')}"/>` +
    `<g class="smoke" transform="translate(${project(1.8, 3.32, 1.8)})">` +
      `<path class="smoke-line" d="M0,0 C8,-16 -8,-30 2,-46 C10,-58 -2,-68 4,-80"/>` +
    `</g>`
  );
}

const BUILDERS: Record<string, () => string> = {
  bell, totem, columns, gate, telescope, teahouse,
};

/** Roughly centres each monument's mass over its threshold on the path. */
const OFFSET: Record<string, number> = {
  bell: -12, totem: -6, columns: -26, gate: -30, telescope: -16, teahouse: -34,
};

export function monumentSvg(c: Chapter, index: number): string {
  const build = BUILDERS[c.id];
  const style = `--top:${c.top};--left:${c.left};--right:${c.right};--accent:${c.accent}`;
  // Desynchronised bob, so the group never pulses in unison.
  const bob = `--bob:${(6 + (index % 4) * 0.9).toFixed(1)}s;--bob-delay:-${(index * 1.7).toFixed(1)}s`;
  return (
    `<a class="monument" data-id="${c.id}" href="${c.href}" tabindex="-1" ` +
    `transform="translate(${c.x + OFFSET[c.id]} ${c.y - 14})" style="${style};${bob}">` +
    `<g class="monument-bob">${build()}</g>` +
    `</a>`
  );
}
