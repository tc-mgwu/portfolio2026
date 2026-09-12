'use client';

import { useParallax } from '@/lib/useParallax';

/* A slow warm wash behind the page.

   Four large radial fields drift on long, deliberately mismatched loops, so the
   composition never repeats a pose. Only transform animates; the blur is static,
   which keeps it off the compositor's repaint path. The whole field also creeps
   on scroll, which ties it to the page rather than floating over it. */

export default function AmbientGradient() {
  const field = useParallax<HTMLDivElement>(-90);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div ref={field} className="absolute inset-0">
        <span className="blob blob--a" />
        <span className="blob blob--b" />
        <span className="blob blob--c" />
        <span className="blob blob--d" />
      </div>
      <div className="grain-layer" />
    </div>
  );
}
