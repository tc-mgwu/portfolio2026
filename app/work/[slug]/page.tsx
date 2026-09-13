import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { caseStudies, getCaseStudy, neighbours } from '@/content';
import { collections } from '@/content/collections';
import TableOfContents from '@/components/TableOfContents';
import CaseBody from '@/components/CaseBody';

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return { title: `${study.title} — Toni Chen`, description: study.summary };
}

export default async function CaseStudyPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const { prev, next } = neighbours(slug);
  const collection = collections.find((c) => c.id === study.collection);

  return (
    <div className="mx-auto max-w-[86rem] px-6 pb-28 pt-28">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
        {/* Contents rail */}
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-28 space-y-8">
            <Link
              href={collection ? `/collections/${collection.id}` : '/'}
              className="label-sc inline-block hover:text-ink"
            >
              &larr; {collection ? collection.label : 'All work'}
            </Link>
            <TableOfContents sections={study.sections} />
          </div>
        </aside>

        {/* Main column */}
        <article className="lg:col-span-9">
          <header className="space-y-6">
            <p className="label-sc">
              {study.year} &nbsp;·&nbsp; {study.company} &nbsp;·&nbsp; {study.projectType}
            </p>
            <h1 className="max-w-[22ch] font-display text-[clamp(2.2rem,5.2vw,3.9rem)] leading-[1.05] tracking-[-0.025em]">
              {study.title}
            </h1>
            <p className="max-w-[68ch] text-[1.1875rem] leading-[1.65] text-ink-2">
              {study.summary}
            </p>
          </header>

          {/* Summary strip */}
          <dl className="mt-10 grid gap-6 border-y border-hair py-6 sm:grid-cols-3">
            {study.facts.map((f) => (
              <div key={f.label}>
                <dt className="label-sc">{f.label}</dt>
                <dd className="mt-1.5 text-[0.9375rem] text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>

          {/* Details rail sits inline on the way into the body */}
          <dl className="mt-12 grid gap-6 rounded-xl border border-hair bg-paper-2/60 p-6 sm:grid-cols-4">
            {study.details.map((d) => (
              <div key={d.label}>
                <dt className="label-sc">{d.label}</dt>
                <dd className="mt-1.5 text-[0.9375rem] text-ink">{d.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-20">
            <CaseBody sections={study.sections} />
          </div>

          {/* Prev / next */}
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
        </article>
      </div>
    </div>
  );
}
