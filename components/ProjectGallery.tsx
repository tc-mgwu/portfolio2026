import Image from 'next/image';
import Link from 'next/link';
import type { CaseStudy } from '@/lib/types';
import ProjectPlate from './ProjectPlate';
import { LockGlyph } from './CursorPill';

/* The gallery a collection opens into.

   Each card is a tinted plate with the work sitting on it like a screen on a
   desk, then the company, the title and one line. Three up on desktop, two on
   tablet, one on a phone. */

export default function ProjectGallery({ studies }: { studies: CaseStudy[] }) {
  return (
    <ul className="grid gap-6 overflow-x-clip sm:grid-cols-2 lg:grid-cols-3">
      {studies.map((study, i) => (
        <li key={study.slug}>
          <Link
            href={`/work/${study.slug}`}
            prefetch={study.protected ? false : undefined}
            className="group flex h-full flex-col rounded-[22px] border border-black/[0.04] bg-white shadow-[0_2px_30px_-12px_rgba(26,23,20,0.18)] transition-shadow duration-300 hover:shadow-[0_18px_50px_-18px_rgba(26,23,20,0.3)] dark:border-white/[0.06] dark:bg-paper-2"
          >
            {/* Inset, so the tags and the growing screen have room to break
                past the panel on hover. Extra on top, where the screen rises.
                The card does not clip: nothing inside it sits flush any more. */}
            <div className="px-7 pb-0 pt-7">
              <ProjectPlate study={study} circleX={i % 2 ? 62 : 38} />
            </div>

            <div className="flex flex-1 flex-col gap-2.5 p-5">
              <p className="flex items-center gap-2 text-[0.875rem] text-ink-2">
                {study.logo ? (
                  <Image
                    src={study.logo}
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5 shrink-0 rounded-[6px] ring-1 ring-hair"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="grid h-5 w-5 shrink-0 place-items-center rounded-[6px] bg-ink font-display text-[9px] text-paper"
                  >
                    {study.monogram}
                  </span>
                )}
                {study.kicker ?? study.company}
              </p>

              <h3 className="font-display text-[1.25rem] leading-[1.2] tracking-[-0.015em] text-ink">
                {study.title}
                {study.protected && (
                  <>
                    {' '}
                    <LockGlyph className="inline h-3.5 w-3 align-baseline text-ink-3" />
                    <span className="sr-only">, password protected</span>
                  </>
                )}
              </h3>

              <p className="text-[0.9375rem] leading-[1.55] text-ink-2">
                {study.comingSoon && study.summary.startsWith('[') ? 'Case study coming soon.' : study.summary}
              </p>

              {/* Always visible, pinned to the card's bottom so every button in
                  a row lines up whatever the summary length. Styled as a button,
                  but the card itself is the link. */}
              <span
                aria-hidden="true"
                className="mt-auto inline-flex h-9 w-fit items-center gap-2 rounded-full border border-ink/15 px-4 text-[0.8125rem] font-medium text-ink transition-colors duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-white group-focus-visible:border-accent group-focus-visible:bg-accent group-focus-visible:text-white"
              >
                {study.comingSoon ? 'Coming soon' : 'View project'}
                <span className="text-accent transition-colors duration-200 group-hover:text-white group-focus-visible:text-white">
                  &rarr;
                </span>
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
