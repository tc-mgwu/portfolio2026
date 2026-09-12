'use client';

import { useEffect, useRef } from 'react';

/* Scroll parallax on a single shared listener.

   Every subscriber is measured and written in one rAF pass, so ten parallax
   elements cost one layout read per frame rather than ten. Transform only. */

type Sub = { el: HTMLElement; speed: number };

const subs = new Set<Sub>();
let frame = 0;
let listening = false;
let allowed = true;

function tick() {
  frame = 0;
  const mid = window.innerHeight / 2;
  for (const s of subs) {
    const rect = s.el.getBoundingClientRect();
    // How far this element's centre is from the viewport's centre, normalised.
    const offset = (rect.top + rect.height / 2 - mid) / window.innerHeight;
    const shift = allowed ? -offset * s.speed : 0;
    s.el.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
  }
}

function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(tick);
}

function listen() {
  if (listening) return;
  listening = true;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  allowed = !motion.matches;
  motion.addEventListener('change', () => {
    allowed = !motion.matches;
    schedule();
  });
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
}

/**
 * `speed` is the travel in pixels across a full viewport of scroll. Keep it
 * small: past about 60 the element visibly detaches from its own section.
 */
export function useParallax<T extends HTMLElement>(speed: number) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.willChange = 'transform';
    const sub: Sub = { el, speed };
    subs.add(sub);
    listen();
    schedule();
    return () => {
      subs.delete(sub);
      el.style.transform = '';
      el.style.willChange = '';
    };
  }, [speed]);

  return ref;
}
