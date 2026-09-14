'use client';

import { useEffect, useState } from 'react';
import type { Section } from '@/lib/types';
import { titleCase } from '@/lib/text';

/* Sticky contents rail. Clicking scrolls to the section; an IntersectionObserver
   keeps the current item marked while the reader scrolls on their own. */

export default function TableOfContents({ sections }: { sections: Section[] }) {
  const [current, setCurrent] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    // The current section is the last one whose heading has passed reading
    // position. An IntersectionObserver picks the topmost intersecting element
    // instead, which marks the previous section while you read the next one.
    const READING_LINE = 140;
    let frame = 0;

    const measure = () => {
      frame = 0;
      let active = targets[0].id;
      for (const el of targets) {
        if (el.getBoundingClientRect().top <= READING_LINE) active = el.id;
        else break;
      }
      setCurrent(active);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sections]);

  return (
    <nav aria-label="On this page" className="text-[0.875rem]">
      <p className="label-sc mb-4">Contents</p>
      <ol className="space-y-1">
        {sections.map((s) => {
          const active = current === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active ? 'true' : undefined}
                className={`flex items-center gap-3 rounded-md py-1.5 pl-3 pr-2 transition-colors ${
                  active
                    ? 'bg-paper-2 text-ink'
                    : 'text-ink-3 hover:text-ink'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-4 w-px shrink-0 transition-colors ${
                    active ? 'bg-accent' : 'bg-hair'
                  }`}
                />
                {titleCase(s.title)}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
