'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { CaseStudy } from '@/lib/types';
import ProjectPlate from './ProjectPlate';
import BriefModal from './BriefModal';
import { LockGlyph } from './CursorPill';

/* The featured case studies, one open row each: the hero image, then the copy.

   A row opens the short form in a dialog rather than navigating, so the long
   form is a deliberate second step. It stays a real link underneath, so it
   still works without JavaScript and middle-click opens the page.

   The tag reveal runs while the pointer is on the image or on "Read the
   summary", or while the row has keyboard focus. Not the whole row: the
   reveal should answer a move toward the work, not a pass over the copy. */

function Card({
  study,
  circleX,
  onOpen,
}: {
  study: CaseStudy;
  circleX: number;
  onOpen: () => void;
}) {
  const [active, setActive] = useState(false);

  const reveal = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') setActive(true);
  };
  const conceal = () => setActive(false);

  return (
    <li>
      <Link
        href={`/work/${study.slug}`}
        prefetch={study.protected ? false : undefined}
        onClick={(e) => {
          if (study.comingSoon) return;
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
          e.preventDefault();
          onOpen();
        }}
        onFocus={(e) => e.currentTarget.matches(':focus-visible') && setActive(true)}
        onBlur={conceal}
        aria-haspopup={study.comingSoon ? undefined : 'dialog'}
        className="group grid items-center gap-10 rounded-2xl sm:grid-cols-[minmax(0,36rem)_1fr] sm:gap-14"
      >
        <div onPointerEnter={reveal} onPointerLeave={conceal}>
          <ProjectPlate study={study} active={active} circleX={circleX} />
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
            {study.comingSoon ? 'Case study coming soon.' : study.summary}
          </p>

          {/* Styled as a button, but the whole row is already the link, and a
              button cannot sit inside a link. The row's click handles it. */}
          <span
            onPointerEnter={reveal}
            onPointerLeave={conceal}
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-full border border-ink/15 bg-paper px-4 text-[0.8125rem] font-medium text-ink shadow-[0_1px_2px_rgba(26,23,20,0.06)] transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-paper"
          >
            {study.comingSoon ? 'Coming soon' : 'Read more'}
            <span aria-hidden="true">
              &rarr;
            </span>
          </span>
        </div>
      </Link>
    </li>
  );
}

export default function WorkRows({ studies }: { studies: CaseStudy[] }) {
  const [active, setActive] = useState<CaseStudy | null>(null);

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="overflow-x-clip pb-24 pt-16"
    >
      <h2 id="work-heading" className="sr-only">
        Selected work
      </h2>

      {/* Generous gaps: with no borders, space is what separates the rows.
          The section clips sideways so tags flying in from outside the plate
          never widen the page; the vertical overflow stays free. */}
      <ul className="mx-auto flex max-w-6xl flex-col gap-24 px-6">
        {studies.map((study, i) => (
          <Card
            key={study.slug}
            study={study}
            circleX={30 + (studies.length > 1 ? (i / (studies.length - 1)) * 40 : 20)}
            onOpen={() => setActive(study)}
          />
        ))}
      </ul>

      {active && <BriefModal study={active} onClose={() => setActive(null)} />}
    </section>
  );
}
