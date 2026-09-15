import Image from 'next/image';
import type { PlayItem } from '@/content/play';

/* A mosaic of off-the-clock work. Tiles flow into three columns on desktop
   with their own shapes, so the page reads like a pinboard rather than a
   grid of identical cards. A tile without a picture shows a hatched slot
   naming what will go there. */

const ASPECT: Record<PlayItem['shape'], string> = {
  portrait: 'aspect-[4/5]',
  square: 'aspect-square',
  wide: 'aspect-[16/7]',
  landscape: 'aspect-[7/5]',
};

const SPAN: Record<PlayItem['shape'], string> = {
  portrait: '',
  square: '',
  wide: 'md:col-span-2',
  landscape: 'md:col-span-2 md:row-span-2',
};

export default function PlayMosaic({ items }: { items: PlayItem[] }) {
  return (
    <ul className="grid grid-flow-dense gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
      {items.map((item) => (
        <li key={item.title} className={`${SPAN[item.shape]} ${item.shape === 'portrait' ? 'md:row-span-2' : ''}`}>
          <figure>
            <div
              className={`relative overflow-hidden rounded-2xl ${ASPECT[item.shape]} ${
                item.tone === 'ink'
                  ? 'bg-ink text-paper'
                  : item.tone === 'accent'
                    ? 'bg-accent text-paper'
                    : 'play-slot text-ink-3'
              } ${item.tone === 'accent' ? 'md:-rotate-1' : ''}`}
            >
              {item.src ? (
                <Image
                  src={item.src}
                  alt={item.alt ?? item.title}
                  fill
                  sizes="(min-width: 768px) 66vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <span className="absolute inset-0 grid place-items-center font-mono text-[0.75rem] tracking-[0.08em] opacity-80">
                  {item.slot ?? 'picture'} &nbsp;·&nbsp; {item.shape}
                </span>
              )}
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-[0.875rem]">
              <span className="text-ink">{item.title}</span>
              <span className="shrink-0 text-ink-3">{item.kind}</span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
