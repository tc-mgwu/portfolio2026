import Link from 'next/link';
import type { CaseStudy } from '@/lib/types';
import { collections } from '@/content/collections';
import PlateArt from './PlateArt';

/* The three groupings, side by side.

   Each card leads with one project, then lists the rest of its collection, so
   the row works as a thirty-second read of what kind of designer Toni is
   before anyone commits to a case study. */

export default function Collections({ studies }: { studies: CaseStudy[] }) {
  return (
    <section aria-labelledby="collections-heading" className="border-t border-hair py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="collections-heading" className="sr-only">
          What I work on
        </h2>

        <ul className="grid gap-5 md:grid-cols-3">
          {collections.map((c) => {
            const members = studies.filter((s) => s.collection === c.id);
            const featured = members[0];

            return (
              <li
                key={c.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-hair bg-paper-2/40"
              >
                <div className="border-b border-hair px-5 py-3">
                  <p className="label-sc">{c.label}</p>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-5">
                  {featured && (
                    <div
                      className="overflow-hidden rounded-xl border border-hair bg-paper-2"
                      style={{ aspectRatio: '16 / 9' }}
                      role="img"
                      aria-label={featured.heroAlt}
                    >
                      <PlateArt slug={featured.slug} />
                    </div>
                  )}

                  <h3 className="font-display text-[1.1875rem] leading-[1.22] tracking-[-0.012em]">
                    {c.title}
                  </h3>

                  <p className="text-[0.875rem] leading-[1.6] text-ink-2">{c.blurb}</p>

                  <p className="mt-auto label-sc">
                    {members.length} {members.length === 1 ? 'project' : 'projects'}
                  </p>

                  <p>
                    <Link
                      href={`/collections/${c.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-ink px-4 py-2 text-[0.8125rem] font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
                    >
                      See the projects
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
