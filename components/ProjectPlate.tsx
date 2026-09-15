'use client';

import { useEffect, useRef, useState } from 'react';
import type { CaseStudy } from '@/lib/types';
import Image from 'next/image';
import PlateArt from './PlateArt';

/* A project plate: a soft circular gradient, the work sitting on top of it as
   a screen, and three tags that arrive over the screen on hover.

   At rest only the circle and the screen show. On reveal the circle eases a
   little away from the screen, the screen grows slightly and lifts, and the
   tags come in from outside, blurred and transparent, and settle sharp and
   solid over the screen. On conceal everything folds back.

   `circleX` places the circle, as a share of the plate's width, so a list of
   plates can stagger it from left to right. `active` drives the reveal from
   outside, which lets the home rows trigger it from "Read more" as well as
   from the image. Leave it out and the plate reveals on its own hover and on
   focus of the link it sits in. */

/* Where the tags land, as offsets from the plate centre in cqw/cqh, so they
   measure the plate rather than the tag's own box. All three sit over the
   screen. The squared bubble corner faces outward, where the tag came from. */
const ENDS = [
  { x: -30, y: -30, rot: -6, delay: 0, radius: '0 1.333em 1.333em 1.333em' },
  { x: 33, y: -8, rot: 4, delay: 60, radius: '1.333em 0 1.333em 1.333em' },
  { x: -28, y: 30, rot: -4, delay: 120, radius: '1.333em 1.333em 1.333em 0' },
];

/* How much further out each tag starts, as a multiple of where it lands. Well
   clear of the plate, so the run in over the screen is the whole point. */
const SPREAD = 2.2;

/* The screen's margins on the plate, as a share of the plate's width. */
const PAD_Y = 5;
const PAD_X = 5;

export default function ProjectPlate({
  study,
  active,
  circleX = 50,
  className = '',
}: {
  study: CaseStudy;
  active?: boolean;
  circleX?: number;
  className?: string;
}) {
  const controlled = active !== undefined;
  const [hoveredSelf, setHoveredSelf] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const revealed = controlled ? active : hoveredSelf;

  /* Uncontrolled: follow focus on the link the plate sits in. Only a visible
     focus counts, so a click does not leave the tags standing open. */
  useEffect(() => {
    if (controlled) return;
    const el = ref.current;
    if (!el) return;
    const target: HTMLElement = el.closest('a') ?? el;
    const onIn = () => target.matches(':focus-visible') && setHoveredSelf(true);
    const onOut = (e: FocusEvent) => {
      if (!target.contains(e.relatedTarget as Node | null)) setHoveredSelf(false);
    };
    target.addEventListener('focusin', onIn);
    target.addEventListener('focusout', onOut);
    return () => {
      target.removeEventListener('focusin', onIn);
      target.removeEventListener('focusout', onOut);
    };
  }, [controlled]);

  /* Uncontrolled: a plate that scrolls out from under a still cursor gets no
     pointerleave, which would leave it stuck open. */
  useEffect(() => {
    if (controlled || !hoveredSelf) return;
    const el = ref.current;
    if (!el) return;
    const check = () => {
      if (!el.matches(':hover') && !el.contains(document.activeElement)) setHoveredSelf(false);
    };
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, [controlled, hoveredSelf]);

  /* The circle moves off away from the screen: outward on whichever side it
     already sits, and down, opposite to the screen's lift. */
  const away = circleX < 50 ? -1 : circleX > 50 ? 1 : 0;

  return (
    <div
      ref={ref}
      className={`plate relative isolate ${className}`}
      data-revealed={revealed || undefined}
      onPointerEnter={controlled ? undefined : (e) => e.pointerType === 'mouse' && setHoveredSelf(true)}
      onPointerLeave={controlled ? undefined : () => setHoveredSelf(false)}
    >
      {/* The circle. Its edge fades out, so it reads as a glow, not a disc. */}
      <div
        aria-hidden="true"
        className="plate-circle absolute top-1/2 aspect-square rounded-full"
        style={
          {
            left: `${circleX}%`,
            '--away-x': `${away * 6}cqw`,
            background: `radial-gradient(circle, ${study.tint[1]} 0%, ${study.tint[0]} 42%, transparent 70%)`,
          } as React.CSSProperties
        }
      />

      {/* The screen. */}
      <div className="plate-screen-wrap relative" style={{ padding: `${PAD_Y}% ${PAD_X}%` }}>
        <div
          className="plate-screen relative overflow-hidden rounded-lg bg-paper"
          style={{ aspectRatio: String(study.heroAspect) }}
          role="img"
          aria-label={study.heroAlt}
        >
          {study.heroSrc ? (
            <Image
              src={study.heroSrc}
              alt=""
              fill
              sizes="(min-width: 640px) 36rem, 100vw"
              className="object-cover object-left-top"
            />
          ) : (
            <PlateArt art={study.art} />
          )}
        </div>
      </div>

      {/* Tags. Decorative: the same labels are content on the case study. */}
      <div aria-hidden="true" className="plate-tags pointer-events-none absolute inset-0">
        {study.tags.slice(0, ENDS.length).map((tag, i) => {
          const end = ENDS[i];
          return (
            <span
              key={tag}
              className="plate-tag"
              style={
                {
                  '--x': `${end.x}cqw`,
                  '--y': `${end.y}cqh`,
                  '--from-x': `${end.x * SPREAD}cqw`,
                  '--from-y': `${end.y * SPREAD}cqh`,
                  '--rot': `${end.rot}deg`,
                  '--delay': `${end.delay}ms`,
                  borderRadius: end.radius,
                } as React.CSSProperties
              }
            >
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
}
