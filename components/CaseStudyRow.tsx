'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { CaseStudy } from '@/lib/types';
import { PillBody, LockGlyph, useCursorPill } from './CursorPill';
import { useUnlock } from './Unlock';
import Magnetic from './Magnetic';
import { useParallax } from '@/lib/useParallax';
import PlateArt from './PlateArt';

/* A full-width structured row: year and company, title, one-line summary, two
   labelled fields, an image slot, and the read link. Layout alternates. */

export default function CaseStudyRow({ study, index }: { study: CaseStudy; index: number }) {
  const { show, hide, pointerFine } = useCursorPill();
  const { open } = useUnlock();
  const [focused, setFocused] = useState(false);
  const row = useRef<HTMLElement>(null);
  // The plate drifts further than the text, which gives the row depth without
  // anything visibly detaching from its own section.
  const art = useParallax<HTMLDivElement>(72);
  const stamp = useParallax<HTMLParagraphElement>(-16);

  const pill = {
    company: study.company,
    role: study.role,
    monogram: study.monogram,
    locked: study.protected,
  };

  const flipped = index % 2 === 1;

  return (
    <motion.article
      ref={row}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative border-t border-hair py-14 sm:py-20 ${
        focused ? 'rounded-sm ring-2 ring-accent ring-offset-4 ring-offset-paper' : ''
      }`}
      aria-labelledby={`row-${study.slug}-title`}
    >
      <div
        className={`mx-auto grid max-w-6xl gap-x-12 gap-y-8 px-6 lg:grid-cols-12 lg:items-center ${
          flipped ? '' : ''
        }`}
      >
        {/* Text column */}
        <div className={`lg:col-span-5 ${flipped ? 'lg:order-2 lg:col-start-8' : 'lg:order-1'}`}>
          <p ref={stamp} className="label-sc">
            {study.year} &nbsp;·&nbsp; {study.company}
          </p>

          <h3
            id={`row-${study.slug}-title`}
            className="mt-4 font-display text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.04] tracking-[-0.02em]"
          >
            {study.title}
          </h3>

          <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-2">
            {study.summary}
          </p>

          <dl className="mt-8 flex flex-wrap gap-x-14 gap-y-5">
            <div>
              <dt className="label-sc">Project type</dt>
              <dd className="mt-1.5 text-[0.9375rem] text-ink">{study.projectType}</dd>
            </div>
            <div>
              <dt className="label-sc">Role</dt>
              <dd className="mt-1.5 text-[0.9375rem] text-ink">{study.role}</dd>
            </div>
          </dl>

          {/* Coarse pointers get a static badge instead of a cursor pill. */}
          {!pointerFine && (
            <div className="mt-8 inline-flex max-w-full">
              <PillBody data={pill} />
            </div>
          )}

          <p className="mt-8">
            <Magnetic>
            <Link
              href={`/work/${study.slug}`}
              prefetch={study.protected ? false : undefined}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onMouseEnter={() => pointerFine && show(pill)}
              onMouseLeave={() => pointerFine && hide()}
              onClick={(e) => {
                // Stays a real link without JS; middleware guards the route either way.
                if (!study.protected) return;
                e.preventDefault();
                open({ slug: study.slug, title: study.title });
              }}
              className={`inline-flex items-center gap-2 rounded-full border border-ink px-5 py-2.5 text-[0.875rem] font-medium text-ink transition-colors duration-200 hover:bg-ink hover:text-paper ${
                pointerFine ? 'cursor-none-here' : ''
              }`}
            >
              Read case study
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

        {/* Image slot */}
        <div className={`lg:col-span-6 ${flipped ? 'lg:order-1 lg:col-start-1' : 'lg:order-2 lg:col-start-7'}`}>
          <figure className="m-0">
            <div
              onMouseEnter={() => pointerFine && show(pill)}
              onMouseLeave={() => pointerFine && hide()}
              className={`group/slot relative overflow-hidden rounded-xl border border-hair bg-paper-2 ${
                pointerFine ? 'cursor-none-here' : ''
              }`}
              style={{ aspectRatio: String(study.heroAspect) }}
              role="img"
              aria-label={study.heroAlt}
            >
              {/* Taller than the frame, so it can travel without exposing an edge. */}
              <div ref={art} className="absolute inset-x-0 -top-[12%] h-[124%]">
                {/* Scale lives on its own layer: the parallax hook writes an
                    inline transform and would otherwise cancel it. */}
                <div className="h-full w-full motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-out motion-safe:group-hover/slot:scale-[1.03]">
                  <PlateArt slug={study.slug} />
                </div>
              </div>
              <span className="label-sc absolute bottom-3 right-4 bg-paper-2/70 px-1.5 py-0.5 backdrop-blur-sm">
                Placeholder art
              </span>
            </div>
            <figcaption className="mt-3 text-[0.8125rem] text-ink-3">{study.heroCaption}</figcaption>
          </figure>
        </div>
      </div>

      {/* Keyboard equivalent: the same pill, anchored to the row. */}
      {focused && (
        <div className="pointer-events-none absolute right-6 top-6 z-20 hidden lg:block">
          <PillBody data={pill} />
        </div>
      )}
    </motion.article>
  );
}
