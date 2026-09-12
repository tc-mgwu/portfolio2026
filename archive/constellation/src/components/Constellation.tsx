import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useMotionAllowed } from '../lib/useMotionAllowed';
import type { CaseStudy } from '../lib/types';

/* A constellation draws itself edge by edge as the section scrolls into view.
   Scrubbing back undraws it, because the draw is bound to scroll position
   rather than fired once by an observer. */

interface Props { study: CaseStudy; index: number; }

function Edge({
  a, b, progress, from, to, animate,
}: {
  a: { x: number; y: number };
  b: { x: number; y: number };
  progress: MotionValue<number>;
  from: number;
  to: number;
  animate: boolean;
}) {
  const length = useTransform(progress, [from, to], [0, 1], { clamp: true });
  // Resting state is a plain, complete line. Handing it to motion when we are
  // not animating leaves a dash array behind and the stroke renders dotted.
  if (!animate) return <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="con-line" />;
  return (
    <motion.line
      x1={a.x} y1={a.y} x2={b.x} y2={b.y}
      className="con-line"
      style={{ pathLength: length }}
    />
  );
}

export default function Constellation({ study, index }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const animate = useMotionAllowed();
  const [active, setActive] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ['start 0.85', 'center 0.45'],
  });

  // Lines finish at 0.8 so the card has room to arrive after the shape closes.
  const cardOpacity = useTransform(scrollYProgress, [0.72, 0.92], [0, 1], { clamp: true });
  const cardY = useTransform(scrollYProgress, [0.72, 0.92], [18, 0], { clamp: true });

  const { stars, edges, shape } = study.constellation;
  const span = 0.8 / Math.max(1, edges.length);
  const filterId = `glow-${study.slug}`;
  const haloId = `halo-${study.slug}`;

  return (
    <section
      className="con"
      ref={wrap}
      aria-labelledby={`con-${study.slug}-title`}
      data-index={index}
    >
      <div className="con-inner shell">
        <div className="con-sky">
          <svg viewBox="0 0 100 100" role="img"
               aria-label={`Constellation for ${study.title}: ${shape}.`}>
            <defs>
              <filter id={filterId} x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="0.45" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Stars fall off smoothly; a flat disc at low opacity reads as
                  a hard-edged circle, which is the thing to avoid. */}
              <radialGradient id={haloId}>
                <stop offset="0" stop-color="var(--star)" stop-opacity="0.5" />
                <stop offset="0.3" stop-color="var(--star)" stop-opacity="0.17" />
                <stop offset="0.62" stop-color="var(--star)" stop-opacity="0.05" />
                <stop offset="1" stop-color="var(--star)" stop-opacity="0" />
              </radialGradient>
            </defs>

            <g filter={`url(#${filterId})`}>
              {edges.map(([ai, bi], i) => (
                <Edge
                  key={`${ai}-${bi}`}
                  a={stars[ai]} b={stars[bi]}
                  progress={scrollYProgress}
                  from={i * span}
                  to={(i + 1) * span}
                  animate={animate}
                />
              ))}
            </g>

            {stars.map((s, i) => (
              <g key={s.label} className="con-star" data-on={active === i || undefined}>
                <circle cx={s.x} cy={s.y} r={s.mag * 4.2} className="con-halo"
                        fill={`url(#${haloId})`} />
                <circle cx={s.x} cy={s.y} r={s.mag * 0.95} className="con-core" />
                <circle
                  cx={s.x} cy={s.y} r={5}
                  className="con-hit"
                  tabIndex={0}
                  role="button"
                  aria-label={`${s.label}, a star in ${study.title}`}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive((v) => (v === i ? null : v))}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive((v) => (v === i ? null : v))}
                />
                <text x={s.x} y={s.y - s.mag * 3.6} className="con-tag" textAnchor="middle">
                  {s.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <motion.div
          className="con-card"
          style={animate ? { opacity: cardOpacity, y: cardY } : undefined}
        >
          <p className="label">Constellation {String(index + 1).padStart(2, '0')}</p>
          <h2 id={`con-${study.slug}-title`}>{study.title}</h2>
          <p className="con-problem">{study.problem}</p>
          <p className="con-outcome">{study.outcome}</p>
          <ul className="con-tags">
            {study.tags.map((t) => <li key={t}>{t}</li>)}
          </ul>
          <a className="con-link" href={`/work/${study.slug}`}>
            Read case study
            <span aria-hidden="true" className="con-arrow">&rarr;</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
