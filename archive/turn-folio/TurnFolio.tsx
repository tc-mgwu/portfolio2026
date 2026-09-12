'use client';

import { useEffect, useRef, useState } from 'react';
import type { CaseStudy } from '@/lib/types';
import { folioMarkup } from '@/lib/folioMarkup';
import { useUnlock } from './Unlock';
import { PlateFace, TextFace, ColophonFace } from './FolioPages';

/* turn.js gives the real page-turn: peel, drag, gradients, hard covers.

   It is jQuery-based and rewrites the DOM it is handed, so the pages are
   injected once as raw HTML and React never reconciles inside the flipbook.
   Clicks on protected case studies are caught by delegation, which keeps the
   unlock modal working even though the markup is not React-rendered. */

declare global {
  interface Window {
    jQuery?: unknown;
    $?: unknown;
  }
}

const RATIO = 0.62; // page height relative to spread width
const MAX_W = 1040;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[data-vendor="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === 'true') resolve();
      else existing.addEventListener('load', () => resolve(), { once: true });
      return;
    }
    const el = document.createElement('script');
    el.src = src;
    el.async = false;
    el.dataset.vendor = src;
    el.addEventListener('load', () => { el.dataset.loaded = 'true'; resolve(); }, { once: true });
    el.addEventListener('error', () => reject(new Error(`failed to load ${src}`)), { once: true });
    document.head.appendChild(el);
  });
}

export default function TurnFolio({ studies }: { studies: CaseStudy[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const book = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  // A ref, not the state, so the handlers can read it without the effect
  // depending on it. Depending on `ready` tore the book down and re-ran init
  // against a container turn.js had already emptied.
  const inited = useRef(false);
  const [failed, setFailed] = useState(false);
  const { open } = useUnlock();

  useEffect(() => {
    const el = book.current;
    if (!el) return;

    let killed = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let $: any;

    function measure() {
      const host = wrap.current;
      if (!host) return { w: MAX_W, h: Math.round(MAX_W * RATIO) };
      const w = Math.min(MAX_W, Math.max(560, host.clientWidth));
      const capped = Math.min(w, Math.round((window.innerHeight * 0.62) / RATIO));
      return { w: capped, h: Math.round(capped * RATIO) };
    }

    async function boot() {
      try {
        await loadScript('/vendor/jquery.js');
        await loadScript('/vendor/turn.js');
        if (killed) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        $ = (window as any).jQuery;
        if (!$ || !$.fn?.turn) throw new Error('turn.js did not register');

        const { w, h } = measure();
        $(el).turn({
          width: w,
          height: h,
          autoCenter: true,
          display: 'double',
          acceleration: true,
          gradients: true,
          elevation: 50,
          duration: 900,
        });
        if (killed) return;
        inited.current = true;
        setReady(true);
      } catch (err) {
        console.error('turn.js init failed:', err);
        if (!killed) setFailed(true);
      }
    }

    boot();

    function onResize() {
      if (!$ || !inited.current) return;
      const { w, h } = measure();
      try { $(el).turn('size', w, h); } catch { /* not initialised yet */ }
    }

    function onKey(e: KeyboardEvent) {
      if (!$ || !inited.current) return;
      const focused = document.activeElement;
      if (focused && focused !== document.body && focused.closest('input, textarea')) return;
      if (e.key === 'ArrowRight') { $(el).turn('next'); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { $(el).turn('previous'); e.preventDefault(); }
    }

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('keydown', onKey);

    return () => {
      killed = true;
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKey);
      inited.current = false;
      try { $?.(el).turn('destroy'); } catch { /* never initialised */ }
    };
  }, []);

  // Protected links live in injected HTML, so the modal is reached by delegation.
  function onClick(e: React.MouseEvent) {
    const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('.fb-btn');
    if (!link || link.dataset.protected !== 'true') return;
    e.preventDefault();
    open({ slug: link.dataset.slug ?? '', title: link.dataset.title ?? '' });
  }

  return (
    <>
      <div className="hidden lg:block">
        {failed ? (
          <p className="rounded-xl border border-hair bg-paper-2 p-6 text-ink-2">
            The flipbook could not load. The same work is on{' '}
            <a href="/#work" className="text-accent underline underline-offset-4">the main page</a>.
          </p>
        ) : (
          <div ref={wrap} className="fb-wrap" data-ready={ready} onClick={onClick}>
            <div
              ref={book}
              className="flipbook"
              // Injected once; turn.js owns these nodes from here on.
              dangerouslySetInnerHTML={{ __html: folioMarkup(studies) }}
            />
            <p className="mt-8 text-center text-[0.75rem] text-ink-3">
              Drag a corner to turn the page, or use the arrow keys.
            </p>
          </div>
        )}
      </div>

      {/* Small screens: the same content in reading order, no flipbook. */}
      <div className="space-y-6 lg:hidden">
        {studies.map((study, i) => (
          <div key={study.slug} className="overflow-hidden rounded-xl border border-hair">
            <PlateFace study={study} />
            <TextFace study={study} page={i + 1} />
          </div>
        ))}
        <div className="overflow-hidden rounded-xl border border-hair">
          <ColophonFace />
        </div>
      </div>
    </>
  );
}
