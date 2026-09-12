/* Builds the scene once at boot. Geometry only; motion lives in CSS and the
   camera loop. */

import { prism } from '../iso';
import { CHAPTERS, TOTEM_FACES, type Chapter } from './chapters';
import { SEGMENTS, LANDINGS, BOUNDS } from './path';
import { segmentSvg, landingSvg } from './walkway';
import { monumentSvg } from './monuments';

const PAD_X = 360;
const PAD_TOP = 420;
const PAD_BOTTOM = 300;

export const WORLD = {
  x: BOUNDS.minX - PAD_X,
  y: BOUNDS.minY - PAD_TOP,
  w: BOUNDS.maxX - BOUNDS.minX + PAD_X * 2,
  h: BOUNDS.maxY - BOUNDS.minY + PAD_TOP + PAD_BOTTOM,
};

/** Each stretch of route wears the palette of the chapter it belongs to, so the
    climb reads as a sequence of chapters rather than one long ribbon. */
function toneFor(s: number): string {
  const c = CHAPTERS.reduce((best, ch) => (Math.abs(ch.s - s) < Math.abs(best.s - s) ? ch : best));
  return `--chapter-top:${c.top};--chapter-left:${c.left};--chapter-right:${c.right}`;
}

/** Later segments flagged `under` are painted first so earlier ones cross over. */
function routeSvg(): string {
  const back = SEGMENTS.filter((sg) => sg.under);
  const front = SEGMENTS.filter((sg) => !sg.under);
  let out = '';
  for (const seg of back) {
    out += `<g class="way way--under" style="${toneFor(seg.s0 + seg.len / 2)}">${segmentSvg(seg)}</g>`;
  }
  for (const seg of front) {
    out += `<g class="way" style="${toneFor(seg.s0 + seg.len / 2)}">${segmentSvg(seg)}</g>`;
  }
  for (const l of LANDINGS) out += `<g style="${toneFor(l.s)}">${landingSvg(l)}</g>`;
  return out;
}

function elbowSvg(): string {
  const seg = SEGMENTS.find((s) => s.kind === 'elbow');
  if (!seg) return '';
  return (
    `<g class="elbow" data-state="broken" transform="translate(${seg.ax} ${seg.ay})">` +
      `<g class="elbow-spin">${segmentSvg({ ...seg, ax: 0, ay: 0, bx: seg.bx - seg.ax, by: seg.by - seg.ay })}</g>` +
      `<circle class="elbow-handle" cx="0" cy="0" r="15"/>` +
    `</g>`
  );
}

function nearLayer(): string {
  let monuments = '';
  CHAPTERS.forEach((c, i) => { monuments += monumentSvg(c, i); });
  return (
    `<svg class="near-svg" width="${WORLD.w}" height="${WORLD.h}" ` +
    `viewBox="${WORLD.x} ${WORLD.y} ${WORLD.w} ${WORLD.h}" aria-hidden="true">` +
      monuments + routeSvg() + elbowSvg() +
    `</svg>`
  );
}

/* ---- Far layer: fog bands and two clusters of distant spires ------------- */
function farLayer(): string {
  const spire = (x: number, y: number, w: number, h: number) =>
    `<path class="spire" d="M${x - w},${y} L${x},${y - h} L${x + w},${y} Z"/>` +
    `<ellipse class="spire" cx="${x}" cy="${y}" rx="${w}" ry="${w * 0.4}"/>`;

  const cluster =
    spire(180, 520, 46, 210) + spire(268, 520, 34, 140) + spire(96, 520, 30, 120) +
    spire(760, 500, 52, 240) + spire(860, 500, 36, 155) + spire(668, 500, 28, 110);

  const fog =
    `<rect class="fog fog--1" x="-200" y="360" width="2200" height="220" fill="url(#fogGrad)"/>` +
    `<rect class="fog fog--2" x="-200" y="440" width="2200" height="200" fill="url(#fogGrad)"/>` +
    `<rect class="fog fog--3" x="-200" y="300" width="2200" height="180" fill="url(#fogGrad)"/>`;

  return (
    `<svg class="far-svg" width="2000" height="700" viewBox="0 0 2000 700" aria-hidden="true">` +
      `<defs><linearGradient id="fogGrad" x1="0" y1="0" x2="0" y2="1">` +
        `<stop offset="0" stop-color="var(--fog)" stop-opacity="0"/>` +
        `<stop offset="0.45" stop-color="var(--fog)" stop-opacity="0.85"/>` +
        `<stop offset="1" stop-color="var(--fog)" stop-opacity="0"/>` +
      `</linearGradient></defs>` +
      `<g class="spires">${cluster}</g>${fog}` +
    `</svg>`
  );
}

function midLayer(): string {
  let out = '';
  const slabs: Array<[number, number, number]> = [
    [160, 220, 2.4], [620, 120, 1.7], [1080, 300, 2.9], [1520, 160, 2.1],
  ];
  for (const [x, y, w] of slabs) {
    out += `<g class="cloud-slab" transform="translate(${x} ${y})">${prism(0, 0, 0, w, w * 0.7, 0.16)}</g>`;
  }
  return `<svg class="mid-svg" width="2000" height="700" viewBox="0 0 2000 700" aria-hidden="true">${out}</svg>`;
}

function skyLayer(): string {
  const defs = CHAPTERS.map((c, i) =>
    `<linearGradient id="sky${i}" x1="0" y1="0" x2="0" y2="1">` +
      `<stop offset="0" stop-color="${c.skyTop}"/><stop offset="1" stop-color="${c.skyBottom}"/>` +
    `</linearGradient>`).join('');
  const rects = CHAPTERS.map((_, i) =>
    `<rect class="sky-rect" data-sky="${i}" x="0" y="0" width="100%" height="100%" fill="url(#sky${i})" opacity="${i === 0 ? 1 : 0}"/>`).join('');
  return `<svg class="sky-svg" preserveAspectRatio="none" aria-hidden="true"><defs>${defs}</defs>${rects}</svg>`;
}

function birds(): string {
  const one = `<path class="bird-wing" d="M-11,0 q5.5,-8 11,0 q5.5,-8 11,0"/>`;
  return (
    `<div class="bird bird--1" aria-hidden="true"><svg viewBox="-14 -10 28 20">${one}</svg></div>` +
    `<div class="bird bird--2" aria-hidden="true"><svg viewBox="-14 -10 28 20">${one}</svg></div>`
  );
}

function labels(): string {
  return CHAPTERS.map((c) => {
    const extra = c.id === 'totem'
      ? `<span class="label-face" data-face="0">${TOTEM_FACES[0].label}</span>` : '';
    return (
      `<div class="label" data-for="${c.id}" style="--pill:${c.right}">` +
        `<span class="label-name">${c.name}</span>` +
        `<span class="label-industry">${c.industry}</span>${extra}` +
        `<span class="label-enter">Enter</span>` +
      `</div>`
    );
  }).join('');
}

function character(): string {
  return (
    `<div id="figure" data-state="idle" data-facing="right">` +
      `<svg viewBox="-16 -44 32 48" aria-hidden="true">` +
        `<g class="fig-bob">` +
          `<path class="fig-body" d="M0,-26 L11,0 A11,3.4 0 0 1 -11,0 Z"/>` +
          `<g class="fig-head"><circle class="fig-body" cx="0" cy="-33" r="7.5"/></g>` +
        `</g>` +
      `</svg>` +
    `</div>`
  );
}

export function buildScene(root: HTMLElement): void {
  root.insertAdjacentHTML('beforeend',
    skyLayer() +
    `<div class="layer" id="layer-far">${farLayer()}</div>` +
    `<div class="layer" id="layer-mid">${midLayer()}${birds()}</div>` +
    `<div class="layer" id="layer-near">${nearLayer()}</div>` +
    `<div class="layer" id="layer-ui">${labels()}</div>` +
    character() +
    `<div id="beacon" aria-hidden="true"><svg width="130" height="130" viewBox="-66 -116 132 132">` +
      prism(0, 0, 0, 2.4, 2.4, 0.7) + prism(-0.3, 0.7, -0.3, 3, 3, 0.18) +
      prism(0.5, 0.88, 0.5, 1.4, 1.4, 0.6) + prism(0.1, 1.48, 0.1, 2.2, 2.2, 0.16) +
    `</svg></div>` +
    `<p id="hint"><kbd>&larr;</kbd> <kbd>&rarr;</kbd> to walk &middot; <kbd>Enter</kbd> to visit</p>`,
  );
}

export type { Chapter };
