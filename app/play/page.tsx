import type { Metadata } from 'next';
import PlayMosaic from '@/components/PlayMosaic';
import { playIntro, playItems, playTitle } from '@/content/play';

export const metadata: Metadata = {
  title: 'Play — Toni Chen',
  description: 'Contract work, experiments and the occasional detour.',
};

export default function PlayPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-28 pt-28">
      <header>
        <h1 className="font-display text-[clamp(1.5rem,2.8vw,2.1rem)] leading-[1.1] tracking-[-0.02em]">
          {playTitle}
        </h1>
        <p className="mt-4 text-[0.9375rem] leading-[1.7] text-ink-2">{playIntro}</p>
      </header>
      <div className="mt-12">
        <PlayMosaic items={playItems} />
      </div>
    </div>
  );
}
