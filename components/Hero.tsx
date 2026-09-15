'use client';

import { motion } from 'framer-motion';
import { heroLines, heroSupport } from '@/content/home';

/* The statement reveals line by line behind a soft mask wipe. Behind it a single
   large gradient blob drifts almost imperceptibly. Calm, not a light show. */

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-12">
      <div className="relative mx-auto max-w-6xl px-6">
        <h1 className="max-w-[44rem] font-display text-[clamp(1.6rem,3.6vw,2.8rem)] font-normal leading-[1.1] tracking-[-0.014em]">
          {heroLines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: '108%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: 0.85,
                  delay: 0.08 + i * 0.11,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {line.map((w, j) =>
                  w.em ? (
                    <em key={j} className="italic text-accent [margin-inline-end:0.05em]">
                      {w.t}
                    </em>
                  ) : (
                    <span key={j}>{w.t}</span>
                  ),
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          className="mt-6 flex flex-col gap-1.5 sm:mt-7"
        >
          <p className="max-w-[44rem] text-[1.0625rem] leading-[1.65] text-ink-2">
            {heroSupport}
          </p>
        </motion.div>
      </div>

    </section>
  );
}
