import Image from 'next/image';
import type { PlayItem } from '@/content/play';
import type { Picture } from '@/lib/types';
import { Zoomable } from './Lightbox';

/* A mosaic of off-the-clock work. Tiles flow into three columns on desktop
   with their own shapes, so the page reads like a pinboard rather than a
   grid of identical cards. No captions: a tile opens in the lightbox, which
   steps through every picture on the page. A tile without a picture shows a
   hatched slot naming what will go there. */

const RATIO: Record<PlayItem['shape'], number> = {
  portrait: 4 / 5,
  square: 1,
  wide: 16 / 7,
  landscape: 7 / 5,
  screen: 16 / 9,
  phone: 9 / 16,
};

const toPicture = (item: PlayItem): Picture => ({
  src: item.src,
  aspect: RATIO[item.shape],
  alt: item.alt ?? item.title,
  caption: item.title,
});

const ASPECT: Record<PlayItem['shape'], string> = {
  portrait: 'aspect-[4/5]',
  square: 'aspect-square',
  wide: 'aspect-[16/7]',
  landscape: 'aspect-[7/5]',
  screen: 'aspect-video',
  phone: 'aspect-[9/16]',
};

const SPAN: Record<PlayItem['shape'], string> = {
  portrait: '',
  square: '',
  wide: 'md:col-span-2',
  landscape: 'md:col-span-2 md:row-span-2',
  screen: 'md:col-span-2',
  phone: '',
};

export default function PlayMosaic({ items }: { items: PlayItem[] }) {
  const pictures = items.filter((i) => i.src).map(toPicture);
  return (
    <ul className="grid grid-flow-dense gap-5 sm:grid-cols-2 md:grid-cols-3">
      {items.map((item) => {
        const picture = toPicture(item);
        const index = pictures.findIndex((p) => p.src === item.src);
        return (
          <li key={item.title} className={`${SPAN[item.shape]} ${item.shape === 'portrait' || item.shape === 'phone' ? 'md:row-span-2' : ''}`}>
            <Zoomable picture={picture} group={pictures} index={index < 0 ? 0 : index} disabled={Boolean(item.video)}>
              <div
                className={`relative overflow-hidden rounded-2xl ${ASPECT[item.shape]} ${
                  item.tone === 'ink'
                    ? 'bg-ink text-paper'
                    : item.tone === 'accent'
                      ? 'bg-accent text-paper'
                      : item.contain || item.video || item.src
                      ? 'bg-paper-2'
                      : 'play-slot text-ink-3'
                } ${item.tone === 'accent' ? 'md:-rotate-1' : ''}`}
              >
                {item.video ? (
                  /* Muted and looping, so it plays inline without a click. */
                  <video
                    src={item.video}
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={item.alt ?? item.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : item.src && item.contain ? (
                  /* Native pixel size, centred, never enlarged. */
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.src}
                    alt={item.alt ?? item.title}
                    width={item.width}
                    height={item.height}
                    className="absolute inset-0 m-auto max-h-[80%] max-w-[80%]"
                    style={{
                      width: item.width && item.width * (item.scale ?? 1),
                      height: item.height && item.height * (item.scale ?? 1),
                    }}
                  />
                ) : item.src ? (
                  <Image
                    src={item.src}
                    alt={item.alt ?? item.title}
                    fill
                    sizes="(min-width: 768px) 66vw, (min-width: 640px) 50vw, 100vw"
                    unoptimized={item.src.endsWith('.gif')}
                    className="object-cover"
                  />
                ) : (
                  <span className="absolute inset-0 grid place-items-center font-mono text-[0.75rem] tracking-[0.08em] opacity-80">
                    {item.slot ?? 'picture'} &nbsp;·&nbsp; {item.shape}
                  </span>
                )}
              </div>
            </Zoomable>
          </li>
        );
      })}
    </ul>
  );
}
