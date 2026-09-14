import type { Metadata } from 'next';
import { caseStudies } from '@/content';
import { collections } from '@/content/collections';
import ProjectGallery from '@/components/ProjectGallery';

/* Every case study in one gallery, ordered by collection but not divided by
   it, so the page reads as one body of work. */

export const metadata: Metadata = {
  title: 'Work — Toni Chen',
  description: 'A selection of work. For anything before 2020, a full case study can be provided by request.',
};

export default function WorkPage() {
  /* One flat gallery, in collection order. */
  const ordered = collections.flatMap((c) => caseStudies.filter((s) => s.collection === c.id));

  return (
    <div className="mx-auto max-w-6xl px-6 pb-28 pt-28">
      <header className="max-w-[46rem]">
        <h1 className="font-display text-[clamp(1.8rem,3.6vw,2.6rem)] leading-[1.08] tracking-[-0.02em]">
          Work
        </h1>
        <p className="mt-5 max-w-[62ch] text-[1.0625rem] leading-[1.7] text-ink-2">
          A selection of work. For anything before 2020, a full case study can
          be provided by request.
        </p>
      </header>

      <div className="mt-16">
        <ProjectGallery studies={ordered} />
      </div>
    </div>
  );
}
