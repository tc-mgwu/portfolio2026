'use client';

import { useState, type ReactNode } from 'react';
import { useUnlock } from './Unlock';
import { LockGlyph } from './CursorPill';

/* A picture that links out, where the destination is confidential. The image
   is public; the URL lives in the encrypted asset store and is fetched on
   click. Without the unlock cookie the store answers 401 and the password
   dialog opens instead. Opens in a new tab, like every other link-out. */
export default function GatedLink({
  href,
  label,
  slug,
  title,
  alt,
  children,
  variant = 'frame',
}: {
  /** The gated JSON, e.g. /api/asset/<slug>/figma-tour.json, holding { href }. */
  href: string;
  label: string;
  slug: string;
  title: string;
  alt: string;
  children?: ReactNode;
  /** `frame` wraps a picture with a hover badge; `pill` is a standalone button. */
  variant?: 'frame' | 'pill';
}) {
  const { open } = useUnlock();
  const [busy, setBusy] = useState(false);

  async function go() {
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch(href, { credentials: 'same-origin', cache: 'no-store' });
      if (res.status === 401) {
        open({ slug, title, redacted: true });
        return;
      }
      if (!res.ok) return;
      const data = (await res.json()) as { href?: string };
      if (data.href) window.open(data.href, '_blank', 'noopener,noreferrer');
    } catch {
      /* Network hiccup: nothing to do but let them click again. */
    } finally {
      setBusy(false);
    }
  }

  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={go}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-hair px-4 py-2 text-[0.8125rem] text-ink transition-colors hover:border-ink"
      >
        <LockGlyph className="h-3.5 w-3 text-ink-3" />
        {busy ? 'Checking…' : label}
        <span aria-hidden="true">&#8599;</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={go}
      aria-label={`${label}: ${alt}`}
      className="group/zoom relative block w-full cursor-pointer rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
    >
      <div className="rounded-xl transition-[transform,box-shadow] duration-300 ease-out group-hover/zoom:-translate-y-0.5 group-hover/zoom:shadow-[0_18px_40px_-18px_rgba(26,23,20,0.35)] group-focus-visible/zoom:-translate-y-0.5">
        {children}
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-[rgba(20,17,14,0.82)] px-5 py-2.5 text-[0.875rem] font-medium text-[#FAF8F5] opacity-0 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)] backdrop-blur transition-opacity duration-200 group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100"
      >
        <LockGlyph className="h-3.5 w-3" />
        {busy ? 'Checking…' : label}
        <svg viewBox="0 0 12 12" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3.5 1.5h7v7M10.5 1.5 1.5 10.5" />
        </svg>
      </span>
    </button>
  );
}
