import { useEffect, useRef } from 'react';

/* Three depth layers of stars on one canvas.

   Every star is a pre-rendered radial-gradient sprite with a hot core and a
   soft falloff, so they bloom rather than reading as flat dots. Sprites are
   rasterised once per (radius, tint) pair and blitted, which keeps the per
   frame cost to drawImage calls. */

type Layer = { parallax: number; radius: [number, number]; alpha: [number, number] };

const LAYERS: Layer[] = [
  { parallax: 0.06, radius: [0.5, 1.1], alpha: [0.22, 0.5] },  // far
  { parallax: 0.16, radius: [0.9, 1.8], alpha: [0.34, 0.7] },  // mid
  { parallax: 0.34, radius: [1.5, 2.9], alpha: [0.5, 0.95] },  // near
];

/** Mostly warm white, with a few cool and violet stars for depth. */
const TINTS = ['#FFF4E4', '#FFF4E4', '#FFF4E4', '#FFE8CC', '#BFE9E3', '#C6BCF2'];

interface StarPt {
  x: number; y: number;
  layer: number; sprite: number;
  alpha: number; amp: number;
  phase: number; speed: number;
}

interface Shot { t: number; life: number; x: number; y: number; vx: number; vy: number; len: number }

function rand(a: number, b: number) { return a + Math.random() * (b - a); }

function tintedSprite(radius: number, tint: string): HTMLCanvasElement {
  const size = Math.max(8, Math.ceil(radius * 8));
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  const g = c.getContext('2d')!;
  const m = size / 2;
  const grad = g.createRadialGradient(m, m, 0, m, m, m);
  grad.addColorStop(0, '#FFFFFF');
  grad.addColorStop(0.14, tint);
  grad.addColorStop(0.34, `${tint}59`);
  grad.addColorStop(0.62, `${tint}1A`);
  grad.addColorStop(1, `${tint}00`);
  g.fillStyle = grad;
  g.beginPath();
  g.arc(m, m, m, 0, Math.PI * 2);
  g.fill();
  return c;
}

/** Fewer stars on small screens and on devices that report little parallelism. */
function budget(w: number, h: number): number {
  const cores = navigator.hardwareConcurrency ?? 4;
  const area = w * h;
  let n = Math.round(area / 2600);
  if (cores <= 4) n *= 0.6;
  if (w < 760) n *= 0.62;
  return Math.max(90, Math.min(460, Math.round(n)));
}

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let stars: StarPt[] = [];
    let sprites: HTMLCanvasElement[] = [];
    let w = 0, h = 0, dpr = 1, fieldH = 0;
    let raf = 0;
    let shot: Shot | null = null;
    let nextShot = performance.now() + rand(9000, 22000);

    function buildSprites() {
      sprites = [];
      for (const layer of LAYERS) {
        for (let i = 0; i < 3; i++) {
          const r = rand(layer.radius[0], layer.radius[1]);
          for (const tint of TINTS) sprites.push(tintedSprite(r, tint));
        }
      }
    }

    function seed() {
      const n = budget(w, h);
      fieldH = Math.max(h * 2, document.documentElement.scrollHeight || h * 2);
      stars = [];
      const perLayer = [0.52, 0.32, 0.16];
      for (let li = 0; li < LAYERS.length; li++) {
        const count = Math.round(n * perLayer[li]);
        const base = li * (sprites.length / LAYERS.length);
        for (let i = 0; i < count; i++) {
          stars.push({
            x: Math.random() * w,
            y: Math.random() * fieldH,
            layer: li,
            sprite: Math.floor(base + Math.random() * (sprites.length / LAYERS.length)),
            alpha: rand(LAYERS[li].alpha[0], LAYERS[li].alpha[1]),
            amp: rand(0.1, 0.4),
            phase: Math.random() * Math.PI * 2,
            speed: rand(0.0004, 0.0016),
          });
        }
      }
    }

    function resize() {
      const cv = ref.current;
      if (!cv) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildSprites();
      seed();
      draw(performance.now());
    }

    function draw(t: number) {
      const g = ctx!;
      g.clearRect(0, 0, w, h);
      const scroll = reduce.matches ? 0 : window.scrollY;

      for (const s of stars) {
        const layer = LAYERS[s.layer];
        let y = s.y - scroll * layer.parallax;
        y = ((y % fieldH) + fieldH) % fieldH;
        if (y < -20 || y > h + 20) continue;

        const twinkle = reduce.matches ? 1 : 1 + Math.sin(t * s.speed + s.phase) * s.amp;
        const sprite = sprites[s.sprite];
        g.globalAlpha = Math.max(0, Math.min(1, s.alpha * twinkle));
        g.drawImage(sprite, s.x - sprite.width / 2, y - sprite.height / 2);
      }

      if (shot) drawShot(g, t);
      g.globalAlpha = 1;
    }

    function drawShot(g: CanvasRenderingContext2D, t: number) {
      if (!shot) return;
      const age = (t - shot.t) / shot.life;
      if (age >= 1) { shot = null; return; }
      const x = shot.x + shot.vx * age;
      const y = shot.y + shot.vy * age;
      // Fade in and out so it never pops.
      const a = Math.sin(age * Math.PI) * 0.85;
      const tailX = x - (shot.vx / Math.hypot(shot.vx, shot.vy)) * shot.len;
      const tailY = y - (shot.vy / Math.hypot(shot.vx, shot.vy)) * shot.len;
      const grad = g.createLinearGradient(x, y, tailX, tailY);
      grad.addColorStop(0, `rgba(255,244,228,${a})`);
      grad.addColorStop(1, 'rgba(255,244,228,0)');
      g.globalAlpha = 1;
      g.strokeStyle = grad;
      g.lineWidth = 1.4;
      g.lineCap = 'round';
      g.beginPath();
      g.moveTo(tailX, tailY);
      g.lineTo(x, y);
      g.stroke();
    }

    function maybeShoot(t: number) {
      if (shot || t < nextShot) return;
      const fromLeft = Math.random() > 0.5;
      const dist = rand(w * 0.3, w * 0.55);
      shot = {
        t, life: rand(900, 1500),
        x: fromLeft ? rand(0, w * 0.3) : rand(w * 0.7, w),
        y: rand(h * 0.05, h * 0.45),
        vx: (fromLeft ? 1 : -1) * dist,
        vy: dist * rand(0.25, 0.5),
        len: rand(60, 130),
      };
      nextShot = t + rand(16000, 42000);
    }

    function frame(t: number) {
      maybeShoot(t);
      draw(t);
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (raf || reduce.matches) return;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
    }

    resize();
    start();

    const onVisibility = () => (document.hidden ? stop() : start());
    const onMotion = () => { stop(); resize(); start(); };

    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    reduce.addEventListener('change', onMotion);

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      reduce.removeEventListener('change', onMotion);
    };
  }, []);

  return <canvas ref={ref} className="starfield" aria-hidden="true" />;
}
