import Link from 'next/link';
import type { CaseStudy } from '@/lib/types';
import TableOfContents from '@/components/TableOfContents';
import CaseBody from '@/components/CaseBody';

/* The case study page proper: contents rail, header, details, body, and the
   previous/next links. Shared by the public /work route and the unlisted
   /secretwork route, which differ only in where the study comes from. */

export default function CaseStudyView({
  study,
  prev,
  next,
}: {
  study: CaseStudy;
  prev?: CaseStudy;
  next?: CaseStudy;
}) {
  return (
    /* Same container as the header, so the contents rail starts under the
       logo and the article ends under the theme toggle. Rail 18rem, gap 4rem,
       which leaves the article the 50rem measure CaseBody uses for its text:
       pictures, tables and paragraphs all end on the container's right edge. */
    <div className="mx-auto max-w-6xl px-6 pb-28 pt-28">
      <div className="lg:grid lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-x-16">
        {/* Contents rail */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <TableOfContents sections={study.sections} />
          </div>
        </aside>

        {/* Main column */}
        <article className="min-w-0">
          <header className="space-y-6">
            <p className="label-sc">
              {study.year} &nbsp;·&nbsp; {study.company}
            </p>
            <h1 className="max-w-[24ch] font-display text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.1] tracking-[-0.02em]">
              {study.title}
            </h1>
            <p className="max-w-[50rem] text-[1.0625rem] leading-[1.6] text-ink-2">
              {study.summary}
            </p>
          </header>

          {/* Details as rows: a narrow label column, the value beside it. A
              long value wraps in place instead of stretching a card. */}
          <dl className="mt-10 max-w-[50rem] border-t border-ink/60">
            {study.details.map((d) => (
              <div
                key={d.label}
                className="grid grid-cols-[7rem_1fr] gap-x-6 border-b border-hair py-3 sm:grid-cols-[9rem_1fr]"
              >
                <dt className="label-sc pt-[0.2rem]">{d.label}</dt>
                <dd className="text-[0.9375rem] leading-[1.55] text-ink">{d.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-20">
            <CaseBody sections={study.sections} slug={study.slug} title={study.title} />
          </div>

          {(prev || next) && (
            <nav aria-label="More work" className="mt-24 grid gap-6 border-t border-hair pt-10 sm:grid-cols-2">
              {prev ? (
                <Link href={`/work/${prev.slug}`} className="group">
                  <span className="label-sc">Previous</span>
                  <span className="mt-2 block font-display text-[1.25rem] text-ink group-hover:text-accent">
                    {prev.title}
                  </span>
                </Link>
              ) : <span />}
              {next && (
                <Link href={`/work/${next.slug}`} className="group sm:text-right">
                  <span className="label-sc">Next</span>
                  <span className="mt-2 block font-display text-[1.25rem] text-ink group-hover:text-accent">
                    {next.title}
                  </span>
                </Link>
              )}
            </nav>
          )}
        </article>
      </div>
    </div>
  );
}
