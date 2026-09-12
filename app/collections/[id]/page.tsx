import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies } from '@/content';
import { collections } from '@/content/collections';
import ProjectGallery from '@/components/ProjectGallery';

export function generateStaticParams() {
  return collections.map((c) => ({ id: c.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
): Promise<Metadata> {
  const { id } = await params;
  const c = collections.find((x) => x.id === id);
  if (!c) return {};
  return { title: `${c.title} — Toni Chen`, description: c.blurb };
}

export default async function CollectionPage(
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const collection = collections.find((c) => c.id === id);
  if (!collection) notFound();

  const studies = caseStudies.filter((s) => s.collection === collection.id);
  const others = collections.filter((c) => c.id !== collection.id);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-28 pt-32 sm:pt-36">
      <Link href="/" className="label-sc inline-block hover:text-ink">
        &larr; All work
      </Link>

      <header className="mt-8 max-w-[46rem]">
        <p className="label-sc">{collection.label}</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.06] tracking-[-0.022em]">
          {collection.title}
        </h1>
        <p className="mt-5 max-w-[62ch] text-[1.0625rem] leading-[1.7] text-ink-2">
          {collection.blurb}
        </p>
      </header>

      <div className="mt-14">
        {studies.length > 0 ? (
          <ProjectGallery studies={studies} />
        ) : (
          <p className="rounded-xl border border-hair bg-paper-2/50 p-8 text-ink-3">
            Nothing in this collection yet.
          </p>
        )}
      </div>

      {/* The other two collections, so the page is not a dead end. */}
      <nav aria-label="Other collections" className="mt-24 border-t border-hair pt-10">
        <p className="label-sc">Elsewhere</p>
        <ul className="mt-5 flex flex-wrap gap-3">
          {others.map((c) => (
            <li key={c.id}>
              <Link
                href={`/collections/${c.id}`}
                className="inline-flex rounded-full border border-hair px-5 py-2.5 text-[0.875rem] text-ink-2 transition-colors hover:border-ink hover:text-ink"
              >
                {c.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
