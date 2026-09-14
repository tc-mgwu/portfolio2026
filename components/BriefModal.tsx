'use client';

import { useEffect, useId, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { CaseStudy } from '@/lib/types';
import { LockGlyph } from './CursorPill';

/* The short form, in a side panel.

   Enough to decide whether the long form is worth opening: the five blocks, the
   facts strip, and one way through. Full height on the right edge, so it fits
   with little scrolling and the page stays in view. Escape closes, focus is
   trapped while open and handed back to the card that opened it. */

export default function BriefModal({
  study,
  onClose,
}: {
  study: CaseStudy;
  onClose: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    panel.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      opener?.focus?.();
    };
  }, [onClose]);

  function trap(e: React.KeyboardEvent) {
    if (e.key !== 'Tab' || !panel.current) return;
    const items = panel.current.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])',
    );
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/35 backdrop-blur-[2px]"
      />

      {/* A panel on the right edge, full height, so the whole brief fits with
          little or no scrolling and the page stays visible behind it. */}
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={trap}
        className="absolute inset-y-0 right-0 flex w-full max-w-[38rem] flex-col border-l border-hair bg-paper shadow-[-24px_0_80px_-24px_rgba(26,23,20,0.45)] outline-none motion-safe:animate-[drawer-in_260ms_cubic-bezier(0.22,1,0.36,1)]"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-hair px-6 pb-4 pt-5 text-ink sm:px-7">
          <div className="flex items-center gap-3">
            {study.logo && (
              <Image
                src={study.logo}
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 shrink-0 rounded-[8px] ring-1 ring-hair"
              />
            )}
            <h2
              id={titleId}
              className="font-display text-[1.375rem] leading-[1.15] tracking-[-0.015em]"
            >
              {study.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1.5 -mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full opacity-70 transition-opacity hover:opacity-100"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 3l10 10M13 3 3 13" />
            </svg>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5 sm:px-7">
          <dl className="grid grid-cols-3 gap-x-4 gap-y-3 border-b border-hair pb-4">
            {study.facts.map((f) => (
              <div key={f.label}>
                <dt className="label-sc">{f.label}</dt>
                <dd className="mt-1 text-[0.8125rem] leading-snug text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>

          <dl className="mt-4 space-y-3.5">
            {study.brief.map((b) => (
              <div key={b.label}>
                <dt className="label-sc">{b.label}</dt>
                <dd className="mt-1 text-[0.9375rem] leading-[1.5] text-ink-2">
                  {b.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex shrink-0 items-center gap-4 border-t border-hair px-6 py-2.5 sm:px-7">
          <Link
            href={`/work/${study.slug}`}
            prefetch={study.protected ? false : undefined}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 text-[0.8125rem] font-medium text-paper transition-opacity hover:opacity-85"
          >
            Read the full case study
            <span aria-hidden="true">&rarr;</span>
            {study.protected && (
              <>
                <LockGlyph className="h-3 w-2.5" />
                <span className="sr-only">, password protected</span>
              </>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
