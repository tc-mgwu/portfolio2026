'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/* A control that leans toward the cursor and springs back.

   The pull is capped and eased, so it reads as weight rather than as the button
   chasing the pointer. Skipped entirely on coarse pointers and reduced motion. */

export default function Magnetic({
  children,
  strength = 0.28,
  max = 9,
  className = '',
}: {
  children: ReactNode;
  strength?: number;
  max?: number;
  className?: string;
}) {
  const wrap = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || motion.matches) return;

    let frame = 0;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };

    const clamp = (v: number) => Math.max(-max, Math.min(max, v));

    function run() {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      el!.style.transform = `translate3d(${pos.x.toFixed(2)}px, ${pos.y.toFixed(2)}px, 0)`;
      if (Math.abs(target.x - pos.x) > 0.05 || Math.abs(target.y - pos.y) > 0.05) {
        frame = requestAnimationFrame(run);
      } else {
        frame = 0;
      }
    }

    function start() { if (!frame) frame = requestAnimationFrame(run); }

    function onMove(e: PointerEvent) {
      const r = el!.getBoundingClientRect();
      target.x = clamp((e.clientX - (r.left + r.width / 2)) * strength);
      target.y = clamp((e.clientY - (r.top + r.height / 2)) * strength);
      start();
    }

    function onLeave() { target.x = 0; target.y = 0; start(); }

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
      el.style.transform = '';
    };
  }, [strength, max]);

  return (
    <span ref={wrap} className={`inline-block will-change-transform ${className}`}>
      {children}
    </span>
  );
}
