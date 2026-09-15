import type { Metadata } from 'next';
import PlayMosaic from '@/components/PlayMosaic';
import { playIntro, playItems } from '@/content/play';

export const metadata: Metadata = {
  title: 'Play — Toni Chen',
  description: 'Ceramics, lettering, prints and a cat: things made off the clock.',
};

export default function PlayPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-28 pt-28">
      <header>
        <h1 className="font-display text-[clamp(1.8rem,3.6vw,2.6rem)] leading-[1.08] tracking-[-0.02em]">
          {playIntro[0]}
          <em className="italic text-accent">{playIntro[1]}</em>
        </h1>
      </header>
      <div className="mt-12">
        <PlayMosaic items={playItems} />
      </div>
    </div>
  );
}
