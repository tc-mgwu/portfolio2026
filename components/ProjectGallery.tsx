import Link from 'next/link';
import type { CaseStudy } from '@/lib/types';
import PlateArt from './PlateArt';
import { LockGlyph } from './CursorPill';

/* The gallery a collection opens into.

   Each card is a tinted plate with the work sitting on it like a screen on a
   desk, then the company, the title and one line. Two up on desktop, so the
   plates stay big enough to carry a real product screenshot later. */

export default function ProjectGallery({ studies }: { studies: CaseStudy[] }) {
  return (
    <ul className="grid gap-8 lg:grid-cols-2">
      {studies.map((study) => (
        <li key={study.slug}>
          <Link
            href={`/work/${study.slug}`}
            prefetch={study.protected ? false : undefined}
            className="group block h-full overflow-hidden rounded-[22px] border border-hair bg-paper shadow-[0_2px_30px_-12px_rgba(26,23,20,0.18)] transition-shadow duration-300 hover:shadow-[0_18px_50px_-18px_rgba(26,23,20,0.3)]"
          >
            {/* Tinted plate. The inner panel reads as a screen resting on it. */}
            <div
              className="p-5 sm:p-7"
              style={{
                background: `linear-gradient(135deg, ${study.tint[0]}, ${study.tint[1]})`,
              }}
            >
              <div
                className="overflow-hidden rounded-lg bg-paper shadow-[0_10px_30px_-10px_rgba(26,23,20,0.45)] transition-transform duration-500 ease-out motion-safe:group-hover:-translate-y-1"
                style={{ aspectRatio: '16 / 10' }}
                role="img"
                aria-label={study.heroAlt}
              >
                <PlateArt slug={study.slug} />
              </div>
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
