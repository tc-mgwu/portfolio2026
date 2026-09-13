import Link from 'next/link';
import type { CaseStudy } from '@/lib/types';
import ProjectPlate from './ProjectPlate';
import { LockGlyph } from './CursorPill';

/* The gallery a collection opens into.

   Each card is a tinted plate with the work sitting on it like a screen on a
   desk, then the company, the title and one line. Two up on desktop, so the
   plates stay big enough to carry a real product screenshot later. */

export default function ProjectGallery({ studies }: { studies: CaseStudy[] }) {
  return (
    <ul className="grid gap-8 overflow-x-clip lg:grid-cols-2">
      {studies.map((study, i) => (
        <li key={study.slug}>
          <Link
            href={`/work/${study.slug}`}
            prefetch={study.protected ? false : undefined}
            className="group block h-full rounded-[22px] border border-hair bg-paper shadow-[0_2px_30px_-12px_rgba(26,23,20,0.18)] transition-shadow duration-300 hover:shadow-[0_18px_50px_-18px_rgba(26,23,20,0.3)]"
          >
            {/* Inset, so the tags and the growing screen have room to break
                past the panel on hover. Extra on top, where the screen rises.
                The card does not clip: nothing inside it sits flush any more. */}
            <div className="px-10 pb-0 pt-10">
              <ProjectPlate study={study} circleX={i % 2 ? 62 : 38} />
            </div>

            <div className="flex flex-col gap-3 p-6 sm:p-7">
              <p className="flex items-center gap-2.5 text-[0.9375rem] text-ink-2">
                <span
                  aria-hidden="true"
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-[7px] bg-ink font-display text-[10px] text-paper"
                >
                  {study.monogram}
                </span>
                {study.company}
              </p>

              <h3 className="font-display text-[clamp(1.375rem,2.4vw,1.75rem)] leading-[1.18] tracking-[-0.015em] text-ink">
                {study.title}
                {study.protected && (
                  <>
                    {' '}
                    <LockGlyph className="inline h-3.5 w-3 align-baseline text-ink-3" />
                    <span className="sr-only">, password protected</span>
                  </>
                )}
              </h3>

              <p className="text-[1rem] leading-relaxed text-ink-2">{study.summary}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
