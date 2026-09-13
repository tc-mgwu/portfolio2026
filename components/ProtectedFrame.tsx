'use client';

import { useEffect, useRef, useState } from 'react';
import type { Picture } from '@/lib/types';
import { useUnlock } from './Unlock';
import { LockGlyph } from './CursorPill';

/* A redacted picture. What ships in the page is a 96-pixel-wide preview,
   upscaled and blurred, which carries the colour and shape of the original
   and none of its text. The real file is requested from the asset route; it
   arrives only if the unlock cookie is present, and the frame swaps to it as
   soon as it loads. Until then, one button, which opens the password dialog.

   Plain <img>, not next/image: the original is private and served by our
   own route, so there is nothing for the optimiser to do. */

export default function ProtectedFrame({
  picture,
  slug,
  title,
}: {
  picture: Picture;
  slug: string;
  title: string;
}) {
  const { open, unlocks } = useUnlock();
  const [shown, setShown] = useState(false);
  const real = useRef<HTMLImageElement>(null);

  /* A returning visitor already holds the cookie, so the real file can finish
     loading before React has attached onLoad. Check the element itself. */
  useEffect(() => {
    const img = real.current;
    if (img?.complete && img.naturalWidth > 0) setShown(true);
  }, [unlocks]);

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-hair bg-paper-2"
      style={{ aspectRatio: String(picture.aspect) }}
    >
      {picture.src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={picture.src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl"
        />
      )}

      {picture.protectedSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={real}
          key={unlocks}
          src={picture.protectedSrc}
          alt={picture.alt}
          onLoad={() => setShown(true)}
          onError={() => setShown(false)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            shown ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {!shown && (
        <div className="absolute inset-0 grid place-items-center">
          <button
            type="button"
            onClick={() => open({ slug, title, redacted: true })}
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper/90 px-4 py-2 text-[0.8125rem] font-medium text-ink shadow-[0_8px_24px_-8px_rgba(26,23,20,0.35)] backdrop-blur transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            <LockGlyph className="h-3.5 w-3" />
            Unlock to view
          </button>
          <span className="sr-only">Chart hidden until unlocked: {picture.alt}</span>
        </div>
      )}
    </div>
  );
}
