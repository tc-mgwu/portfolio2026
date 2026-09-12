'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import type { CaseStudy } from '@/lib/types';
import { CoverFace, PlateFace, TextFace, ColophonFace } from './FolioPages';

/* A folio of case studies.

   Papers are stacked over the right half of the spread and rotate around the
   spine. Paper i shows `front` on the right of spread i, and `back` on the left
   of spread i + 1, which is how a real book works.

   Both the flipped state and the z-index are derived from `turned` on every
   render. The snippet this grew from set z-index inside a setTimeout, which
   races the transition: click quickly and pages settle in the wrong order. */

interface Paper {
  front: ReactNode;
  back: ReactNode;
  /** Announced when this spread becomes the visible one. */
  label: string;
}

function buildPapers(studies: CaseStudy[]): Paper[] {
  const papers: Paper[] = [];

  papers.push({
    front: <CoverFace />,
    back: studies[0] ? <PlateFace study={studies[0]} /> : <ColophonFace />,
    label: 'Cover',
  });

  studies.forEach((study, i) => {
    const nextStudy = studies[i + 1];
    papers.push({
      front: <TextFace study={study} page={i + 1} />,
      back: nextStudy ? <PlateFace study={nextStudy} /> : <ColophonFace />,
      label: study.title,
    });
  });

  return papers;
}

export default function Folio({ studies }: { studies: CaseStudy[] }) {
  const papers = buildPapers(studies);
  const last = papers.length;
  const [turned, setTurned] = useState(0);

  const next = useCallback(() => setTurned((t) => Math.min(last, t + 1)), [last]);
  const prev = useCallback(() => setTurned((t) => Math.max(0, t - 1)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      if (el && el !== document.body && el.closest('input, textarea')) return;
      if (e.key === 'ArrowRight') { next(); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { prev(); e.preventDefault(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const spreadLabel =
    turned === 0 ? 'Cover' : turned >= last ? 'End of folio' : papers[turned].label;

  return (
    <>
      {/* Desktop folio. A 3D book on a phone is unusable, so small screens get
          the plain stacked reading order below instead. */}
      <div className="hidden lg:block">
        <div className="folio-stage mx-auto w-fit">
          <div className="relative aspect-[16/10] h-[min(58vh,36rem)] rounded-xl bg-paper-2 shadow-[0_30px_80px_-40px_rgba(26,23,20,0.45)]">
            {/* The static left page, revealed once the cover is open. */}
            <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden rounded-l-xl">
              <div className="folio-gutter--left grid h-full place-items-center bg-paper-2">
                <p className="label-sc">{turned === 0 ? 'Closed' : 'Folio'}</p>
              </div>
            </div>

            {papers.map((paper, i) => {
              const flipped = i < turned;
              return (
                <div
                  key={i}
                  data-flipped={flipped}
                  className="folio-paper"
                  // Two separate bands so a flipped paper and an unflipped one
                  // can never share a value: unflipped sit above all flipped.
                  style={{ zIndex: flipped ? i : papers.length * 2 - i }}
                >
                  <div
                    className="folio-face rounded-r-xl"
                    inert={flipped || i !== turned ? true : undefined}
                    aria-hidden={i !== turned}
                  >
                    {paper.front}
                  </div>
                  <div
                    className="folio-face folio-face--back rounded-l-xl"
                    inert={!flipped || i !== turned - 1 ? true : undefined}
                    aria-hidden={i !== turned - 1}
                  >
                    {paper.back}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={prev}
              disabled={turned === 0}
              className="rounded-full border border-hair px-5 py-2.5 text-[0.875rem] transition-colors enabled:hover:border-ink disabled:opacity-35"
            >
              &larr; Back
            </button>

            <p aria-live="polite" className="label-sc min-w-[12rem] text-center">
              {spreadLabel}
            </p>

            <button
              type="button"
              onClick={next}
              disabled={turned >= last}
              className="rounded-full border border-ink px-5 py-2.5 text-[0.875rem] font-medium transition-colors enabled:hover:bg-ink enabled:hover:text-paper disabled:opacity-35"
            >
              Next &rarr;
            </button>
          </div>

          <p className="mt-4 text-center text-[0.75rem] text-ink-3">
            Use the arrow keys to turn pages.
          </p>
        </div>
      </div>

      {/* Small screens: the same content, in order, no 3D. */}
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
