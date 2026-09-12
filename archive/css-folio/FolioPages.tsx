import Link from 'next/link';
import type { CaseStudy } from '@/lib/types';
import { LockGlyph } from './CursorPill';

/* The two faces of a spread. A folio page is either the left-hand plate or the
   right-hand text page, so each is written once and reused across papers. */

export function CoverFace() {
  return (
    <div className="flex h-full flex-col justify-between bg-ink p-10 text-paper">
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-paper/55">
        [YOUR NAME]
      </p>
      <div>
        <h2 className="font-display text-[clamp(1.9rem,3.2vw,2.9rem)] leading-[1.05] tracking-[-0.02em]">
          Selected work
        </h2>
        <p className="mt-4 max-w-[30ch] text-[0.9375rem] leading-relaxed text-paper/65">
          Three projects, front to back. Turn the page.
        </p>
      </div>
      <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-paper/40">
        Folio &nbsp;·&nbsp; 2022&ndash;2024
      </p>
    </div>
  );
}

export function PlateFace({ study }: { study: CaseStudy }) {
  return (
    <div className="folio-gutter flex h-full flex-col bg-paper-2 p-8">
      <p className="label-sc">
        {study.year} &nbsp;·&nbsp; {study.company}
      </p>
      <div
        className="mt-5 flex-1 overflow-hidden rounded-lg border border-hair bg-paper"
        role="img"
        aria-label={study.heroAlt}
      >
        <div className="grid h-full w-full place-items-center">
          <span className="label-sc">Image slot &nbsp;·&nbsp; {study.heroAspect.toFixed(2)}:1</span>
        </div>
      </div>
      <p className="mt-4 text-[0.8125rem] text-ink-3">{study.heroCaption}</p>
    </div>
  );
}

export function TextFace({ study, page }: { study: CaseStudy; page: number }) {
  return (
    <div className="folio-gutter--left flex h-full flex-col bg-paper p-10">
      <p className="label-sc">{study.projectType}</p>

      <h2 className="mt-4 font-display text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.06] tracking-[-0.02em]">
        {study.title}
      </h2>

      <p className="mt-4 max-w-[38ch] text-[1rem] leading-relaxed text-ink-2">
        {study.summary}
      </p>

      <dl className="mt-8 space-y-5">
        <div>
          <dt className="label-sc">Role</dt>
          <dd className="mt-1 text-[0.9375rem]">{study.role}</dd>
        </div>
        <div>
          <dt className="label-sc">Project type</dt>
          <dd className="mt-1 text-[0.9375rem]">{study.projectType}</dd>
        </div>
      </dl>

      <div className="mt-auto pt-8">
        <Link
          href={`/work/${study.slug}`}
          className="inline-flex items-center gap-2 rounded-full border border-ink px-5 py-2.5 text-[0.875rem] font-medium text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
        >
          Read case study
          {study.protected && (
            <>
              <LockGlyph className="h-3 w-2.5" />
              <span className="sr-only">, password protected</span>
            </>
          )}
        </Link>
        <p className="mt-6 text-[0.6875rem] uppercase tracking-[0.16em] text-ink-3">
          {String(page).padStart(2, '0')}
        </p>
      </div>
    </div>
  );
}

export function ColophonFace() {
  return (
    <div className="folio-gutter flex h-full flex-col justify-center bg-paper-2 p-10">
      <p className="label-sc">End of folio</p>
      <h2 className="mt-4 font-display text-[clamp(1.6rem,2.8vw,2.3rem)] leading-tight">
        Want the rest?
      </h2>
      <p className="mt-4 max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink-2">
        Older work and the full archive live on the main page.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link
          href="/#work"
          className="rounded-full border border-ink px-5 py-2.5 text-[0.875rem] font-medium transition-colors hover:bg-ink hover:text-paper"
        >
          All work
        </Link>
        <a
          href="mailto:[EMAIL]"
          className="rounded-full border border-hair px-5 py-2.5 text-[0.875rem] text-ink-2 transition-colors hover:border-ink hover:text-ink"
        >
          Get in touch
        </a>
      </div>
    </div>
  );
}
