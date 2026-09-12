'use client';

import {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,
  type ReactNode,
} from 'react';

/* The pill that replaces the cursor over case study rows.

   It tracks the pointer in a requestAnimationFrame loop with a 0.12 lerp, so it
   trails slightly and reads as a physical object rather than a label pinned to
   the pointer. The loop only runs while a pill is showing. */

export interface PillData {
  company: string;
  role: string;
  monogram: string;
  locked: boolean;
}

interface PillContext {
  show: (data: PillData) => void;
  hide: () => void;
  /** True when a fine pointer is available, so rows can skip hover wiring. */
  pointerFine: boolean;
}

const Ctx = createContext<PillContext>({
  show: () => {},
  hide: () => {},
  pointerFine: false,
});

export const useCursorPill = () => useContext(Ctx);

const LERP = 0.12;
const OFFSET_X = 14;
const OFFSET_Y = 14;

export function LockGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 14" aria-hidden="true" className={className} fill="none">
      <path
        d="M3 6V4a3 3 0 1 1 6 0v2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <rect x="1.2" y="6" width="9.6" height="7.2" rx="2" fill="currentColor" />
    </svg>
  );
}

/** The pill's own markup, shared by the cursor version and the anchored one. */
export function PillBody({ data }: { data: PillData }) {
  return (
    <div className="flex items-center gap-2.5 rounded-[14px] border border-black/5 bg-white/90 py-1.5 pl-1.5 pr-3.5 shadow-[0_6px_20px_-6px_rgba(26,23,20,0.3)] backdrop-blur-md">
      <span
        aria-hidden="true"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-ink font-display text-[11px] tracking-tight text-paper"
      >
        {data.monogram}
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-[13px] leading-[1.25] font-medium text-ink">
          <span className="truncate">{data.company}</span>
          {data.locked && <LockGlyph className="h-2.5 w-2 shrink-0 text-ink-3" />}
        </span>
        <span className="block truncate text-[13px] leading-[1.25] text-ink-3">
          {data.role}
        </span>
      </span>
    </div>
  );
}

export function CursorPillProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PillData | null>(null);
  const [pointerFine, setPointerFine] = useState(false);
  const [reduced, setReduced] = useState(false);

  const pill = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const seeded = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncFine = () => setPointerFine(fine.matches);
    const syncMotion = () => setReduced(motion.matches);
    syncFine();
    syncMotion();
    fine.addEventListener('change', syncFine);
    motion.addEventListener('change', syncMotion);
    return () => {
      fine.removeEventListener('change', syncFine);
      motion.removeEventListener('change', syncMotion);
    };
  }, []);

  useEffect(() => {
    if (!pointerFine) return;
    const onMove = (e: PointerEvent) => {
      target.current = { x: e.clientX + OFFSET_X, y: e.clientY + OFFSET_Y };
      if (!seeded.current) {
        pos.current = { ...target.current };
        seeded.current = true;
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [pointerFine]);

  useEffect(() => {
    if (!data || !pointerFine) {
      if (raf.current) { cancelAnimationFrame(raf.current); raf.current = 0; }
      seeded.current = false;
      return;
    }

    const step = () => {
      const el = pill.current;
      if (el) {
        if (reduced) {
          pos.current = { ...target.current };
        } else {
          pos.current.x += (target.current.x - pos.current.x) * LERP;
          pos.current.y += (target.current.y - pos.current.y) * LERP;
        }
        el.style.transform =
          `translate3d(${Math.round(pos.current.x)}px, ${Math.round(pos.current.y)}px, 0)`;
      }
      raf.current = requestAnimationFrame(step);
    };

    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) { cancelAnimationFrame(raf.current); raf.current = 0; }
    };
  }, [data, pointerFine, reduced]);

  const show = useCallback((next: PillData) => setData(next), []);
  const hide = useCallback(() => setData(null), []);
  const value = useMemo(() => ({ show, hide, pointerFine }), [show, hide, pointerFine]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {pointerFine && data && (
        <div
          ref={pill}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-50 will-change-transform"
        >
          <div
            className={
              reduced
                ? 'origin-top-left'
                : 'origin-top-left motion-safe:animate-[pill-in_160ms_cubic-bezier(0.22,1,0.36,1)]'
            }
          >
            <PillBody data={data} />
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
