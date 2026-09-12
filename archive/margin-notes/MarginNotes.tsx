'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { arrow, circle, underline } from '@/lib/rough';

/* The annotation layer.

   Notes are anchored to elements by id and measured against the nearest
   positioned ancestor, so no scroll listener is needed: the layer moves with
   the page because it is inside it. Only resize and font load force a remeasure.

   Nothing here carries information that is not already in the page. Turning
   notes off must never cost the reader anything. */

export type NoteKind = 'circle' | 'arrow' | 'underline';

export interface Note {
  id: string;
  /** Element the mark attaches to. */
  target: string;
  kind: NoteKind;
  /** Optional aside, set in the page's own type rather than a script face. */
  text?: string;
  /** Where the text sits relative to the mark. */
  side?: 'left' | 'right';
  /** Nudges, in pixels, for fine placement. */
  dx?: number;
  dy?: number;
}

interface Resolved extends Note {
  d: string;
  head?: string;
  tx: number;
  ty: number;
  width: number;
  anchor: 'start' | 'end';
}

/* Position from the offset chain rather than getBoundingClientRect, because
   rects include animated transforms. A note measured while the hero is still
   sliding into place lands a line low and stays there. */
function offsetWithin(el: HTMLElement, host: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== host) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y, width: el.offsetWidth, height: el.offsetHeight };
}

const SEEDS: Record<string, number> = {};
function seedFor(id: string): number {
  if (!SEEDS[id]) {
    let h = 0;
    for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
    SEEDS[id] = h || 1;
  }
  return SEEDS[id];
}

export default function MarginNotes({ notes }: { notes: Note[] }) {
  const layer = useRef<HTMLDivElement>(null);
  const [marks, setMarks] = useState<Resolved[]>([]);
  const [on, setOn] = useState(true);

  useEffect(() => {
    try {
      setOn(localStorage.getItem('notes') !== 'off');
    } catch { /* private mode */ }
  }, []);

  const measure = useCallback(() => {
    const host = layer.current?.parentElement;
    if (!host) return;
    const out: Resolved[] = [];
    const limit = host.offsetWidth;

    for (const note of notes) {
      const el = document.getElementById(note.target);
      if (!el) continue;
      const r = offsetWithin(el, host);
      const x = r.x + (note.dx ?? 0);
      const y = r.y + (note.dy ?? 0);
      const seed = seedFor(note.id);
      const side = note.side ?? 'right';

      if (note.kind === 'circle') {
        const cx = x + r.width / 2;
        const cy = y + r.height / 2;
        const rx = r.width / 2 + 12;
        const ry = r.height / 2 + 7;
        out.push({
          ...note,
          d: circle(cx, cy, rx, ry, seed),
          tx: side === 'right' ? cx + rx + 14 : cx - rx - 14,
          ty: cy + 4,
          width: 160,
          anchor: side === 'right' ? 'start' : 'end',
        });
      } else if (note.kind === 'underline') {
        out.push({
          ...note,
          d: underline(x, x + r.width, y + r.height + 5, seed),
          tx: x + r.width + 14,
          ty: y + r.height + 10,
          width: 150,
          anchor: 'start',
        });
      } else {
        // Arrow: starts out in the margin and lands on the element's edge.
        const toX = side === 'right' ? x + r.width + 4 : x - 4;
        const toY = y + r.height / 2;
        const fromX = side === 'right' ? toX + 96 : toX - 96;
        const fromY = toY - 40;
        const a = arrow(fromX, fromY, toX, toY, side === 'right' ? 0.26 : -0.26, seed);
        out.push({
          ...note,
          d: a.shaft,
          head: a.head,
          tx: fromX + (side === 'right' ? 6 : -6),
          ty: fromY - 10,
          width: 170,
          anchor: side === 'right' ? 'start' : 'end',
        });
      }
    }

    // A note that runs off the page is worse than no note: flip it inward.
    for (const m of out) {
      const right = m.anchor === 'start' ? m.tx + m.width : m.tx;
      const left = m.anchor === 'start' ? m.tx : m.tx - m.width;
      if (right > limit - 8) { m.anchor = 'end'; m.tx = Math.min(m.tx, limit - 8); }
      else if (left < 8) { m.anchor = 'start'; m.tx = Math.max(m.tx, 8); }
    }

    setMarks(out);
  }, [notes]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    const host = layer.current?.parentElement;
    if (host) ro.observe(host);
    // Remeasure once webfonts land, or every mark sits against fallback metrics.
    document.fonts?.ready.then(measure).catch(() => {});
    window.addEventListener('resize', measure, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  function toggle() {
    setOn((v) => {
      const next = !v;
      try { localStorage.setItem('notes', next ? 'on' : 'off'); } catch { /* ignore */ }
      return next;
    });
  }

  return (
    <>
      <div
        ref={layer}
        aria-hidden="true"
        data-on={on}
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500 data-[on=false]:opacity-0"
      >
        <svg className="h-full w-full overflow-visible" fill="none">
          {marks.map((m, i) => (
            <g key={m.id} className="notes-mark" style={{ animationDelay: `${i * 180}ms` }}>
              <path d={m.d} className="notes-stroke" />
              {m.head && <path d={m.head} className="notes-stroke" />}
              {m.text && (
                <foreignObject
                  x={m.anchor === 'start' ? m.tx : m.tx - m.width}
                  y={m.ty - 26}
                  width={m.width}
                  height={72}
                >
                  <p className="notes-text" style={{ textAlign: m.anchor === 'start' ? 'left' : 'right' }}>
                    {m.text}
                  </p>
                </foreignObject>
              )}
            </g>
          ))}
        </svg>
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        className="fixed bottom-6 right-6 z-40 rounded-full border border-hair bg-paper/85 px-4 py-2.5 text-[0.8125rem] text-ink-2 backdrop-blur-md transition-colors hover:border-ink hover:text-ink"
      >
        Notes {on ? 'on' : 'off'}
      </button>
    </>
  );
}
