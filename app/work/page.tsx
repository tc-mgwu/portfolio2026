import type { Metadata } from 'next';
import { caseStudies, featured } from '@/content';
import ProjectGallery from '@/components/ProjectGallery';

/* Every case study in one gallery, grouped by company but not divided by
   headings, so the page reads as one body of work. */

export const metadata: Metadata = {
  title: 'Work — Toni Chen',
  description: 'A selection of work. For anything before 2020, a full case study can be provided by request.',
};

export default function WorkPage() {
  /* One flat gallery, grouped by company in this order. Anything from a
     company not listed follows, in collection order. */
  const COMPANIES = ['Fountain', 'Sense', 'Medal', 'Orion'];
  const rank = (s: (typeof caseStudies)[number]) => {
    const i = COMPANIES.indexOf(s.company);
    return i === -1 ? COMPANIES.length : i;
  };
  /* Unwritten studies stay off this page unless they are featured on the
     home page, so the gallery ends with real work rather than placeholders. */
  const shown = caseStudies.filter((s) => !s.comingSoon || featured.includes(s));
  const ordered = [...shown].sort((a, b) => rank(a) - rank(b));

  return (
    <div className="mx-auto max-w-6xl px-6 pb-28 pt-28">
      <header>
        <h1 className="font-display text-[clamp(1.5rem,2.8vw,2.1rem)] leading-[1.1] tracking-[-0.02em]">
          Selected Work
        </h1>
        <p className="mt-4 text-[0.9375rem] leading-[1.7] text-ink-2">
          A collection of work I&rsquo;m most proud of. Any work before 2020 is
          viewable by request.
        </p>
      </header>

      <div className="mt-16">
        <ProjectGallery studies={ordered} />
      </div>
    </div>
  );
}
