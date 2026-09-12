/* Camera, walking, thresholds and routing. Phase 1 mechanics driving the
   Phase 2 geometry. */

import '@fontsource/outfit/latin-300.css';
import '@fontsource/outfit/latin-400.css';
import '@fontsource/atkinson-hyperlegible/latin-400.css';
import '@fontsource/atkinson-hyperlegible/latin-700.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/scene.css';

import {
  CHAPTERS, ROUTE_LENGTH, LABEL_RANGE, THRESHOLD,
  chapterById, thresholdAt, nearestChapter, skyBlend, type Chapter,
} from './scene/chapters';
import { pointAt, nearestS } from './scene/path';
import { buildScene, WORLD } from './scene/build';
import { Input } from './scene/input';

const WALK = 340;
const AUTO = 430;
const ACCEL = 2400;
const DECEL = 2000;
const SNAP = 170;
const STAIR_FACTOR = 0.7;   // the climb is slower, which is what sells it
const LOOKAHEAD = 120;
const CAM_EASE = 0.12;
const START_S = 40;

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);

const viewport = document.getElementById('viewport') as HTMLElement;
buildScene(viewport);

const far = document.getElementById('layer-far') as HTMLElement;
const mid = document.getElementById('layer-mid') as HTMLElement;
const near = document.getElementById('layer-near') as HTMLElement;
const figure = document.getElementById('figure') as HTMLElement;
const hint = document.getElementById('hint') as HTMLElement;
const skyRects = [...document.querySelectorAll<SVGRectElement>('.sky-rect')];
const labelEls = new Map<string, HTMLElement>();
for (const c of CHAPTERS) {
  const el = document.querySelector<HTMLElement>(`.label[data-for="${c.id}"]`);
  if (el) labelEls.set(c.id, el);
}
const platform = document.querySelector<SVGGElement>('.elbow');

const motion = matchMedia('(prefers-reduced-motion: reduce)');
const reduced = () => motion.matches;

let s = restore();          // distance along the route
let vel = 0;
let camX = 0;
let camY = 0;
let camReady = false;
let target: number | null = null;
let pendingOpen: string | null = null;
let standing: Chapter | null = null;
let raf = 0;
let last = 0;

/* ---- Position memory ---------------------------------------------------- */
function restore(): number {
  // #s=<distance> addresses any point on the route; #at=<chapter> a landing.
  const along = /(?:^|[#&])s=(\d+(?:\.\d+)?)/.exec(location.hash)?.[1];
  if (along) return clamp(parseFloat(along), 0, ROUTE_LENGTH);
  const hash = /(?:^|[#&])at=([\w-]+)/.exec(location.hash)?.[1];
  const id = hash ?? sessionStorage.getItem('journey.at') ?? '';
  return chapterById(id)?.s ?? START_S;
}

function remember(id: string): void {
  try { sessionStorage.setItem('journey.at', id); } catch { /* private mode */ }
}

if (sessionStorage.getItem('journey.platform') === 'aligned') {
  platform?.setAttribute('data-state', 'aligned');
}

const labelLayer = document.getElementById('layer-ui') as HTMLElement;

/* ---- Render ------------------------------------------------------------- */
function cameraTarget(): { x: number; y: number } {
  const vw = viewport.clientWidth;
  const vh = viewport.clientHeight;
  const ahead = pointAt(Math.min(ROUTE_LENGTH, s + LOOKAHEAD));
  const here = pointAt(s);
  const fx = here.x * 0.55 + ahead.x * 0.45;
  const fy = here.y * 0.55 + ahead.y * 0.45;
  return {
    x: clamp(fx - vw * 0.44, WORLD.x, Math.max(WORLD.x, WORLD.x + WORLD.w - vw)),
    y: clamp(fy - vh * 0.58, WORLD.y, Math.max(WORLD.y, WORLD.y + WORLD.h - vh)),
  };
}

function render(): void {
  const t = cameraTarget();
  if (!camReady) { camX = t.x; camY = t.y; camReady = true; }

  const ox = -(camX - WORLD.x);
  const oy = -(camY - WORLD.y);
  far.style.transform = `translate3d(${ox * 0.2}px,${oy * 0.2}px,0)`;
  mid.style.transform = `translate3d(${ox * 0.5}px,${oy * 0.5}px,0)`;
  near.style.transform = `translate3d(${ox}px,${oy}px,0)`;
  labelLayer.style.transform = `translate3d(${ox}px,${oy}px,0)`;

  const here = pointAt(s);
  figure.style.transform =
    `translate3d(${here.x - WORLD.x + ox}px,${here.y - WORLD.y + oy}px,0)`;
  figure.dataset.terrain = here.seg.kind === 'stairs' ? 'stairs' : 'flat';

  const { a, b, t: blend } = skyBlend(s);
  skyRects.forEach((r, i) => {
    const o = i === a ? 1 - blend : i === b ? (a === b ? 1 : blend) : 0;
    r.setAttribute('opacity', String(o));
  });

  const chapter = CHAPTERS[blend > 0.5 ? b : a];
  viewport.style.setProperty('--path-top', chapter.top);
  viewport.style.setProperty('--path-face', chapter.left);
  viewport.style.setProperty('--chapter-top', chapter.top);
  viewport.style.setProperty('--chapter-left', chapter.left);
  viewport.style.setProperty('--chapter-right', chapter.right);
  viewport.style.setProperty('--chapter-accent', chapter.accent);
  viewport.style.setProperty('--fog', chapter.skyBottom);

  const now = thresholdAt(s);
  for (const c of CHAPTERS) {
    const el = labelEls.get(c.id);
    if (!el) continue;
    el.style.transform = `translate(${c.x - WORLD.x - 0}px, ${c.y - WORLD.y - 250}px) translateX(-50%)`;
    el.classList.toggle('is-near', Math.abs(c.s - s) <= LABEL_RANGE);
    el.classList.toggle('is-threshold', c === now);
  }
  if (now !== standing) {
    standing = now;
    viewport.dataset.at = now ? now.id : '';
  }
}

/* ---- Loop --------------------------------------------------------------- */
function ensureLoop(): void {
  if (raf || reduced()) return;
  last = performance.now();
  raf = requestAnimationFrame(tick);
}

function tick(now: number): void {
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;

  const on = pointAt(s);
  const stair = on.seg.kind === 'stairs';
  const speed = stair ? WALK * STAIR_FACTOR : WALK;

  let desired = 0;
  if (input.dir !== 0) {
    target = null;
    pendingOpen = null;
    desired = input.dir * speed;
  } else if (target !== null) {
    const ds = target - s;
    if (Math.abs(ds) < 2) {
      s = target; vel = 0; target = null; arrive();
    } else {
      const auto = stair ? AUTO * STAIR_FACTOR : AUTO;
      desired = Math.sign(ds) * auto * clamp(Math.abs(ds) / 140, 0.14, 1);
    }
  }

  const rate = desired === 0 ? DECEL : ACCEL;
  const d = desired - vel;
  const stepSize = rate * dt;
  vel += Math.abs(d) <= stepSize ? d : Math.sign(d) * stepSize;

  if (vel !== 0) {
    s = clamp(s + vel * dt, 0, ROUTE_LENGTH);
    if (s === 0 || s === ROUTE_LENGTH) vel = 0;
    // Face the screen direction of the segment being walked, not "forward".
    const seg = pointAt(s).seg;
    const screenDx = (seg.bx - seg.ax) * Math.sign(vel || 1);
    figure.dataset.facing = screenDx >= 0 ? 'right' : 'left';
  }

  // Step bob on stairs is keyed to step width, so the feet match the geometry.
  if (stair) {
    const along = s - on.seg.s0;
    const stepLen = on.seg.len / (on.seg.steps ?? 8);
    figure.style.setProperty('--step-phase', String((along % stepLen) / stepLen));
  }

  const t = cameraTarget();
  camX += (t.x - camX) * CAM_EASE;
  camY += (t.y - camY) * CAM_EASE;

  const moving = Math.abs(vel) > 1 || target !== null
    || Math.abs(t.x - camX) > 0.5 || Math.abs(t.y - camY) > 0.5;
  figure.dataset.state = Math.abs(vel) > 1 ? 'walk' : 'idle';
  render();

  if (moving) raf = requestAnimationFrame(tick);
  else { raf = 0; vel = 0; settle(); }
}

function settle(): void {
  if (input.dir !== 0 || target !== null) return;
  const c = nearestChapter(s);
  const gap = Math.abs(c.s - s);
  if (gap > THRESHOLD && gap <= SNAP) { target = c.s; ensureLoop(); }
}

function arrive(): void {
  render();
  if (!pendingOpen) return;
  const c = chapterById(pendingOpen);
  pendingOpen = null;
  if (c) open(c);
}

/* ---- Activation --------------------------------------------------------- */
function open(c: Chapter): void {
  remember(c.id);
  location.href = c.href;
}

function walkTo(id: string): void {
  const c = chapterById(id);
  if (!c) return;
  if (reduced()) { warp(c); open(c); return; }
  target = c.s;
  pendingOpen = id;
  ensureLoop();
}

function warp(c: Chapter): void {
  s = c.s; vel = 0; target = null; camReady = false;
  viewport.classList.add('is-warping');
  render();
  window.setTimeout(() => viewport.classList.remove('is-warping'), 200);
}

function step(delta: -1 | 1): void {
  const i = CHAPTERS.findIndex((c) => c.id === standing?.id);
  const next = i === -1 ? nearestChapter(s) : CHAPTERS[clamp(i + delta, 0, CHAPTERS.length - 1)];
  warp(next);
}

function rotatePlatform(): void {
  if (!platform || platform.getAttribute('data-state') === 'aligned') return;
  platform.setAttribute('data-state', 'aligned');
  try { sessionStorage.setItem('journey.platform', 'aligned'); } catch { /* ignore */ }
}

/* ---- Wiring -------------------------------------------------------------- */
const input = new Input(viewport, {
  onActivate: () => { if (standing) open(standing); },
  onEscape: () => { /* Phase 3: close the teahouse interior */ },
  onSpace: () => rotatePlatform(),
  onWalkTo: (wx, wy) => {
    if (reduced()) return;
    target = nearestS(wx, wy); pendingOpen = null; ensureLoop();
  },
  onWalkToMonument: walkTo,
  onRotate: rotatePlatform,
  onStep: step,
  onFirstInput: () => hint.classList.add('is-gone'),
}, reduced, () => ({ x: camX - WORLD.x, y: camY - WORLD.y }));

// Labels live outside the svg, so hover has to be wired up by hand.
for (const c of CHAPTERS) {
  const monument = document.querySelector<SVGAElement>(`.monument[data-id="${c.id}"]`);
  const label = labelEls.get(c.id);
  if (!monument || !label) continue;
  monument.addEventListener('mouseenter', () => label.classList.add('is-near'));
  monument.addEventListener('mouseleave', () => {
    if (Math.abs(c.s - s) > LABEL_RANGE) label.classList.remove('is-near');
  });
}

window.addEventListener('resize', render, { passive: true });

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    document.body.classList.add('is-paused');
  } else {
    document.body.classList.remove('is-paused');
    if (Math.abs(vel) > 1 || target !== null) ensureLoop();
  }
});

render();
document.body.classList.add('is-ready');
