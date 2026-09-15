'use client';

import { motion } from 'framer-motion';
import { heroLines, heroSupport } from '@/content/home';

/* The statement reveals line by line behind a soft mask wipe. Behind it a single
   large gradient blob drifts almost imperceptibly. Calm, not a light show. */

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-12">
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Line drawing in the column the text leaves open. It is an alpha
            mask painted with the text colour, so it follows the theme and
            carries no paper of its own. */}
        <div
          aria-hidden="true"
          className="desk-drawing pointer-events-none absolute right-6 top-1/2 hidden aspect-[956/693] w-[clamp(220px,28vw,380px)] -translate-y-1/2 bg-ink sm:block lg:right-8"
        />
        <h1 className="font-display text-[clamp(1.6rem,3.6vw,2.8rem)] font-normal leading-[1.1] tracking-[-0.014em] sm:max-w-[65%]">
          {/* One flowing sentence that wraps to the page width, revealed in a
              single wipe. The lines in content are joined with spaces. */}
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className="block"
              initial={{ y: '108%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {heroLines.flatMap((line, i) => [
                ...(i > 0 ? [<span key={`sp-${i}`}> </span>] : []),
                ...line.map((w, j) =>
                  w.em ? (
                    <em key={`${i}-${j}`} className="italic text-accent [margin-inline-end:0.05em]">
                      {w.t}
                    </em>
                  ) : (
                    <span key={`${i}-${j}`}>{w.t}</span>
                  ),
                ),
              ])}
            </motion.span>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          className="mt-6 flex flex-col gap-1.5 sm:mt-7"
        >
          <p className="text-[1.0625rem] leading-[1.65] text-ink-2 sm:max-w-[65%]">
            {heroSupport}
          </p>
        </motion.div>
      </div>

    </section>
  );
}
