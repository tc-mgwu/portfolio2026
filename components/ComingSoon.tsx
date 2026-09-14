import Link from 'next/link';
import type { CaseStudy } from '@/lib/types';

/* Stands in for a case study whose write-up is still being made. One centred
   message, the study named quietly above it, and two ways onward: home, or
   the full gallery. Nothing here depends on the study beyond its title. */

export default function ComingSoon({ study }: { study: CaseStudy }) {
  return (
    <div className="mx-auto grid min-h-[70svh] max-w-6xl place-items-center px-6 pb-28 pt-28">
      <div className="max-w-[34rem] text-center">
        <p className="label-sc">{study.title}</p>
        <h1 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,2.6rem)] leading-[1.1] tracking-[-0.02em]">
          This case study is being written.
        </h1>
        <p className="mt-4 text-[1.0625rem] leading-[1.6] text-ink-2">
          Check back soon, or{' '}
          <a href="/about#contact" className="text-accent underline underline-offset-4">
            ask me about it
          </a>{' '}
          in the meantime.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-[0.875rem] font-medium text-paper transition-opacity hover:opacity-85"
          >
            Go home
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full border border-hair px-5 py-2.5 text-[0.875rem] font-medium text-ink transition-colors hover:border-ink"
          >
            Browse all work
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
