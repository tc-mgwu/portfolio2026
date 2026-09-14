import Link from 'next/link';
import type { CaseStudy } from '@/lib/types';

/* Stands in for a case study whose write-up is still being made. Same
   container and header as the finished pages, so the title, year and company
   read the same; the body is one honest line and a way onward. */

export default function ComingSoon({
  study,
  prev,
  next,
}: {
  study: CaseStudy;
  prev?: CaseStudy;
  next?: CaseStudy;
}) {
  const written = [prev, next].filter((s): s is CaseStudy => Boolean(s && !s.comingSoon));
  return (
    <div className="mx-auto max-w-6xl px-6 pb-28 pt-28">
      {/* No contents rail here, so the article starts under the logo. */}
      <div>
        <article className="min-w-0">
          <header className="space-y-6">
            <p className="label-sc">
              {study.year} &nbsp;·&nbsp; {study.company}
            </p>
            <h1 className="max-w-[24ch] font-display text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.1] tracking-[-0.02em]">
              {study.title}
            </h1>
          </header>

          <div className="mt-12 max-w-[50rem] rounded-xl border border-hair bg-paper-2/60 p-8">
            <p className="label-sc">Coming soon</p>
            <p className="mt-3 text-[1.0625rem] leading-[1.6] text-ink">
              This case study is being written. Check back soon, or{' '}
              <a href="/#contact" className="text-accent underline underline-offset-4">
                ask me about it
              </a>{' '}
              in the meantime.
            </p>
          </div>

          <nav aria-label="More work" className="mt-16 flex flex-wrap gap-3">
            <Link
              href="/#work"
              className="inline-flex rounded-full border border-ink px-5 py-2.5 text-[0.875rem] font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              &larr; All work
            </Link>
            {written.map((s) => (
              <Link
                key={s.slug}
                href={`/work/${s.slug}`}
                className="inline-flex rounded-full border border-hair px-5 py-2.5 text-[0.875rem] text-ink-2 transition-colors hover:border-ink hover:text-ink"
              >
                {s.title}
              </Link>
            ))}
          </nav>
        </article>
      </div>
    </div>
  );
}
