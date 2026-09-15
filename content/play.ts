/* The Play page: things made off the clock. Each item is a tile in the
   mosaic. Leave `src` out and the tile renders as a labelled slot until the
   picture exists; `tone` colours a slot instead of hatching it. Aspect is
   width / height. */

export type PlayShape = 'portrait' | 'square' | 'wide' | 'landscape' | 'screen';

export interface PlayItem {
  title: string;
  /** Short category shown at the right of the caption: Clay, Type, Cats, Paper. */
  kind: string;
  shape: PlayShape;
  src?: string;
  alt?: string;
  /** For an empty slot: what the picture will be, e.g. 'ceramics photo'. */
  /** `landscape` is a two-column tile at 7:5; `screen` a two-column tile at 16:9. */
  slot?: string;
  tone?: 'ink' | 'accent';
  /** Show the whole picture on a plain ground instead of cropping to the tile: for sprites and transparent art. */
  contain?: boolean;
}

export const playIntro = ['Made in my free time. ', 'Just cause.'] as const;

export const playItems: PlayItem[] = [
  {
    title: 'Audiobook voice picker, a concept',
    kind: 'Product',
    shape: 'landscape',
    src: '/play/audiobook-voices.png',
    alt: 'A concept for choosing an audiobook narrator: a grid of AI voices with tone tags, and a panel to preview a chapter and adjust cadence, pitch and speed.',
  },
  {
    title: 'Thought Stream, watching an AI agent reason',
    kind: 'Product',
    shape: 'screen',
    src: '/play/thought-stream.png',
    alt: 'A dark interface: a chat log on the left, a ribbon of flowing coloured lines in the middle, and a Thought Stream panel on the right showing schemas, a function call and a JSON result.',
  },
  {
    title: 'Zombie Critters, a mobile game',
    kind: 'Games',
    shape: 'screen',
    src: '/play/zombie-critters.png',
    alt: 'Three phone screens from Zombie Critters: the title screen with a carrot-shaped Play button, the instructions card, and a night forest level with zombie critters and bombs.',
  },
  {
    title: 'Jackalope, a game sprite',
    kind: 'Games',
    shape: 'square',
    src: '/play/jackalope.gif',
    alt: 'A looping animation of a grinning purple jackalope with antlers, waving a small fish.',
    contain: true,
  },
  { title: 'Wobbly teacups, set of six', kind: 'Clay', shape: 'portrait', slot: 'ceramics photo' },
  { title: 'Lettering for a tea tin', kind: 'Type', shape: 'square', slot: 'type experiment' },
  { title: 'Mochi, judging', kind: 'Cats', shape: 'square', slot: 'cat portrait', tone: 'ink' },
  { title: 'Risograph, two colours', kind: 'Paper', shape: 'square', slot: 'poster', tone: 'accent' },
  { title: 'Sketchbook, spring, mostly hands', kind: 'Paper', shape: 'wide', slot: 'sketchbook spread' },
  { title: 'A bowl that came out fine', kind: 'Clay', shape: 'square', slot: 'ceramics photo' },
];
