'use client';

import { Fragment } from 'react';
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
          className="pointer-events-none absolute right-6 top-1/2 hidden w-[clamp(160px,19vw,260px)] -translate-y-1/2 sm:block lg:right-8"
        >
          {/* Fades up a beat after the intro, so the hero arrives as one piece. */}
          <motion.div
            className="desk-drawing aspect-[763/748] w-full bg-ink"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.1,
              delay: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>
        <h1 className="font-display text-[clamp(1.6rem,3.6vw,2.8rem)] font-normal leading-[1.1] tracking-[-0.014em] sm:max-w-[65%]">
          {/* One flowing sentence that wraps to the page width. Each word
              fades and rises on its own, a few milliseconds after the last,
              so the headline visibly arrives rather than just appearing. */}
          {(() => {
            let n = 0;
            return heroLines.flatMap((line, i) =>
              line.flatMap((w, j) =>
                w.t
                  .split(' ')
                  .filter(Boolean)
                  .map((word, k) => {
                    const idx = n++;
                    const inner = w.em ? (
                      <em className="italic text-accent">{word}</em>
                    ) : (
                      word
                    );
                    return (
                      <Fragment key={`${i}-${j}-${k}`}>
                        <motion.span
                          className="inline-block"
                          initial={{ opacity: 0, y: '0.35em' }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.7,
                            delay: 0.06 + idx * 0.045,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          {inner}
                        </motion.span>{' '}
                      </Fragment>
                    );
                  }),
              ),
            );
          })()}
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
