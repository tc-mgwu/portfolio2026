import type { Metadata } from 'next';
import Link from 'next/link';
import TurnFolio from '@/components/TurnFolio';
import { caseStudies } from '@/content';

export const metadata: Metadata = {
  title: 'Folio — [YOUR NAME]',
  description: 'Selected work as a folio you can page through.',
};

export default function BookPage() {
  return (
    <div className="mx-auto max-w-[76rem] px-6 pb-28 pt-32">
      <header className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="label-sc">Book version</p>
          <h1 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.05] tracking-[-0.025em]">
            The folio
          </h1>
        </div>
        <Link
          href="/"
          className="rounded-full border border-hair px-5 py-2.5 text-[0.875rem] text-ink-2 transition-colors hover:border-ink hover:text-ink"
        >
          Switch to the list version
        </Link>
      </header>

      <TurnFolio studies={caseStudies} />
    </div>
  );
}
