'use client';

import Link from 'next/link';
import type { CaseStudy } from '@/lib/types';
import PlateArt from './PlateArt';
import { LockGlyph, useCursorPill } from './CursorPill';
import Magnetic from './Magnetic';
import { useParallax } from '@/lib/useParallax';

/* Short-form summaries: enough to decide whether to open the full case study,
   without making anyone open it to find out. Plate on one side, the five
   labelled blocks on the other, alternating down the page. */

function Summary({ study, index }: { study: CaseStudy; index: number }) {
  const { show, hide, pointerFine } = useCursorPill();
  const art = useParallax<HTMLDivElement>(52);
  const flipped = index % 2 === 1;

  const pill = {
    company: study.company,
    role: study.role,
    monogram: study.monogram,
    locked: study.protected,
  };

  return (
    <article
      aria-labelledby={`sum-${study.slug}`}
      className="border-t border-hair py-16 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-x-14 gap-y-10 px-6 lg:grid-cols-12">
        {/* Plate */}
        <div className={`lg:col-span-5 ${flipped ? 'lg:order-2 lg:col-start-8' : 'lg:order-1'}`}>
          <div className="lg:sticky lg:top-28">
            <div
              onMouseEnter={() => pointerFine && show(pill)}
              onMouseLeave={() => pointerFine && hide()}
              className={`group/slot overflow-hidden rounded-[20px] p-4 sm:p-6 ${
                pointerFine ? 'cursor-none-here' : ''
              }`}
              style={{ background: `linear-gradient(135deg, ${study.tint[0]}, ${study.tint[1]})` }}
            >
              <div
                className="overflow-hidden rounded-lg bg-paper shadow-[0_12px_34px_-12px_rgba(26,23,20,0.5)]"
                style={{ aspectRatio: String(study.heroAspect) }}
                role="img"
                aria-label={study.heroAlt}
              >
                <div ref={art} className="h-full w-full">
                  <PlateArt art={study.art} />
                </div>
              </div>
            </div>

            {!pointerFine && (
              <p className="mt-4 flex items-center gap-2 text-[0.875rem] text-ink-2">
                <span
                  aria-hidden="true"
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-[7px] bg-ink font-display text-[10px] text-paper"
                >
                  {study.monogram}
                </span>
                {study.company} &middot; {study.role}
              </p>
            )}
          </div>
        </div>

        {/* Copy */}
        <div className={`lg:col-span-7 ${flipped ? 'lg:order-1 lg:col-start-1' : 'lg:order-2'}`}>
          <p className="label-sc">
            {study.year} &nbsp;·&nbsp; {study.company} &nbsp;·&nbsp; {study.projectType}
          </p>

          <h3
            id={`sum-${study.slug}`}
            className="mt-3 font-display text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.1] tracking-[-0.02em]"
          >
            {study.title}
          </h3>

          <dl className="mt-9 space-y-7">
            {study.brief.map((b) => (
              <div key={b.label}>
                <dt className="label-sc">{b.label}</dt>
                <dd className="mt-2 max-w-[62ch] text-[1rem] leading-[1.7] text-ink-2">
                  {b.body}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-10">
            <Magnetic>
              <Link
                href={`/work/${study.slug}`}
                prefetch={study.protected ? false : undefined}
                onMouseEnter={() => pointerFine && show(pill)}
                onMouseLeave={() => pointerFine && hide()}
                className={`inline-flex items-center gap-2 rounded-full border border-ink px-5 py-2.5 text-[0.875rem] font-medium text-ink transition-colors duration-200 hover:bg-ink hover:text-paper ${
                  pointerFine ? 'cursor-none-here' : ''
                }`}
              >
                Read the full case study
                {study.protected && (
                  <>
                    <LockGlyph className="h-3 w-2.5" />
                    <span className="sr-only">, password protected</span>
                  </>
                )}
              </Link>
            </Magnetic>
          </p>
        </div>
      </div>
    </article>
  );
}

export default function CaseSummaries({ studies }: { studies: CaseStudy[] }) {
  return (
    <section id="work" aria-labelledby="work-heading">
      <h2 id="work-heading" className="sr-only">
        Case studies
      </h2>
      {studies.map((s, i) => (
        <Summary key={s.slug} study={s} index={i} />
      ))}
    </section>
  );
}
