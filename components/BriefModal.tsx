'use client';

import { useEffect, useId, useRef } from 'react';
import Link from 'next/link';
import type { CaseStudy } from '@/lib/types';
import { LockGlyph } from './CursorPill';

/* The short form, in a dialog.

   Enough to decide whether the long form is worth opening: the five blocks, the
   facts strip, and one way through. Escape closes, focus is trapped while open
   and handed back to the card that opened it. */

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
    <div className="fixed inset-0 z-[70] grid place-items-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/40 backdrop-blur-[3px]"
      />

      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={trap}
        className="relative flex max-h-[86svh] w-full max-w-[46rem] flex-col overflow-hidden rounded-2xl border border-hair bg-paper shadow-[0_28px_80px_-24px_rgba(26,23,20,0.5)] outline-none motion-safe:animate-[pill-in_200ms_cubic-bezier(0.22,1,0.36,1)]"
      >
        <div
          className="shrink-0 px-7 pb-6 pt-7"
          style={{ background: `linear-gradient(135deg, ${study.tint[0]}, ${study.tint[1]})` }}
        >
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ink/60">
            {study.year} &nbsp;·&nbsp; {study.company} &nbsp;·&nbsp; {study.projectType}
          </p>
          <h2
            id={titleId}
            className="mt-3 font-display text-[clamp(1.5rem,3.4vw,2.1rem)] leading-[1.12] tracking-[-0.018em] text-ink"
          >
            {study.title}
          </h2>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-7 py-7">
          <dl className="grid gap-3 border-b border-hair pb-6 sm:grid-cols-3">
            {study.facts.map((f) => (
              <div key={f.label}>
                <dt className="label-sc">{f.label}</dt>
                <dd className="mt-1 text-[0.875rem] text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>

          <dl className="mt-7 space-y-6">
            {study.brief.map((b) => (
              <div key={b.label}>
                <dt className="label-sc">{b.label}</dt>
                <dd className="mt-2 max-w-[64ch] text-[0.9375rem] leading-[1.7] text-ink-2">
                  {b.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-4 border-t border-hair px-7 py-5">
          <Link
            href={`/work/${study.slug}`}
            prefetch={study.protected ? false : undefined}
            className="inline-flex items-center gap-2 rounded-full border border-ink px-5 py-2.5 text-[0.875rem] font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Read the full case study
            {study.protected && (
              <>
                <LockGlyph className="h-3 w-2.5" />
                <span className="sr-only">, password protected</span>
              </>
            )}
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="text-[0.875rem] text-ink-3 transition-colors hover:text-ink"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
