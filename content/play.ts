/* The Play page: things made off the clock. Each item is a tile in the
   mosaic. Leave `src` out and the tile renders as a labelled slot until the
   picture exists; `tone` colours a slot instead of hatching it. Aspect is
   width / height. */

export type PlayShape = 'portrait' | 'square' | 'wide' | 'landscape';

export interface PlayItem {
  title: string;
  /** Short category shown at the right of the caption: Clay, Type, Cats, Paper. */
  kind: string;
  shape: PlayShape;
  src?: string;
  alt?: string;
  /** For an empty slot: what the picture will be, e.g. 'ceramics photo'. */
  /** `landscape` is a two-column tile at 7:5, for a full interface mock. */
  slot?: string;
  tone?: 'ink' | 'accent';
}

export const playIntro = ['Off the clock, ', 'on the table.'] as const;

export const playItems: PlayItem[] = [
  {
    title: 'Audiobook voice picker, a concept',
    kind: 'Product',
    shape: 'landscape',
    slot: 'interface mock',
  },
  { title: 'Wobbly teacups, set of six', kind: 'Clay', shape: 'portrait', slot: 'ceramics photo' },
  { title: 'Lettering for a tea tin', kind: 'Type', shape: 'square', slot: 'type experiment' },
  { title: 'Mochi, judging', kind: 'Cats', shape: 'square', slot: 'cat portrait', tone: 'ink' },
  { title: 'Risograph, two colours', kind: 'Paper', shape: 'square', slot: 'poster', tone: 'accent' },
  { title: 'Sketchbook, spring, mostly hands', kind: 'Paper', shape: 'wide', slot: 'sketchbook spread' },
  { title: 'A bowl that came out fine', kind: 'Clay', shape: 'square', slot: 'ceramics photo' },
];
