'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { CaseStudy } from '@/lib/types';
import { collections } from '@/content/collections';
import PlateArt from './PlateArt';
import BriefModal from './BriefModal';
import { LockGlyph, useCursorPill } from './CursorPill';
import { useParallax } from '@/lib/useParallax';

/* Every case study as a horizontal card, grouped by collection.

   A card opens the short form in a dialog rather than navigating, so the long
   form is a deliberate second step. It stays a real link underneath, so it
   still works without JavaScript and middle-click opens the page. */

function Card({ study, onOpen }: { study: CaseStudy; onOpen: () => void }) {
  const { show, hide, pointerFine } = useCursorPill();
  const art = useParallax<HTMLDivElement>(28);

  const pill = {
    company: study.company,
    role: study.role,
    monogram: study.monogram,
    locked: study.protected,
  };

  return (
    <li>
      <Link
        href={`/work/${study.slug}`}
        prefetch={study.protected ? false : undefined}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
          e.preventDefault();
          onOpen();
        }}
        onMouseEnter={() => pointerFine && show(pill)}
        onMouseLeave={() => pointerFine && hide()}
        aria-haspopup="dialog"
        className={`group grid items-center gap-6 rounded-2xl border border-hair bg-paper-2/30 p-4 transition-colors duration-300 hover:border-ink/25 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8 sm:p-5 ${
          pointerFine ? 'cursor-none-here' : ''
        }`}
      >
        <div
          className="overflow-hidden rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${study.tint[0]}, ${study.tint[1]})`,
          }}
        >
          <div className="p-3">
            <div
              className="overflow-hidden rounded-md bg-paper shadow-[0_8px_22px_-10px_rgba(26,23,20,0.5)]"
              style={{ aspectRatio: '16 / 10' }}
              role="img"
              aria-label={study.heroAlt}
            >
              <div ref={art} className="h-full w-full">
                <PlateArt art={study.art} />
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0 pb-1 sm:pr-4">
          <p className="label-sc">
            {study.year} &nbsp;·&nbsp; {study.company}
          </p>

          <h3 className="mt-2 font-display text-[clamp(1.25rem,2.2vw,1.6rem)] leading-[1.18] tracking-[-0.015em] text-ink">
            {study.title}
            {study.protected && (
              <>
                {' '}
                <LockGlyph className="inline h-3 w-2.5 align-baseline text-ink-3" />
                <span className="sr-only">, password protected</span>
              </>
            )}
          </h3>

          <p className="mt-2 max-w-[56ch] text-[0.9375rem] leading-[1.6] text-ink-2">
            {study.summary}
          </p>

          <p className="mt-4 inline-flex items-center gap-2 text-[0.8125rem] text-ink-3 transition-colors group-hover:text-accent">
            Read the summary
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              &rarr;
            </span>
          </p>
        </div>
      </Link>
    </li>
  );
}

export default function WorkRows({ studies }: { studies: CaseStudy[] }) {
  const [active, setActive] = useState<CaseStudy | null>(null);

  return (
    <section id="work" aria-labelledby="work-heading" className="pb-24">
      <h2 id="work-heading" className="sr-only">
        Selected work
      </h2>

      {collections.map((c) => {
        const members = studies.filter((s) => s.collection === c.id);
        if (!members.length) return null;

        return (
          <div key={c.id} id={`c-${c.id}`} className="scroll-mt-24 border-t border-hair">
            <div className="mx-auto max-w-6xl px-6 pb-7 pt-14">
              <p className="label-sc">{c.label}</p>
              <h3 className="mt-2 max-w-[34ch] font-display text-[clamp(1.25rem,2.2vw,1.6rem)] leading-[1.2] tracking-[-0.015em]">
                <Link href={`/collections/${c.id}`} className="hover:text-accent">
                  {c.title}
                </Link>
              </h3>
            </div>

            <ul className="mx-auto flex max-w-6xl flex-col gap-4 px-6 pb-14">
              {members.map((study) => (
                <Card key={study.slug} study={study} onOpen={() => setActive(study)} />
              ))}
            </ul>
          </div>
        );
      })}

      {active && <BriefModal study={active} onClose={() => setActive(null)} />}
    </section>
  );
}
