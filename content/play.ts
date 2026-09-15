/* The Play page: things made off the clock. Each item is a tile in the
   mosaic. Leave `src` out and the tile renders as a labelled slot until the
   picture exists; `tone` colours a slot instead of hatching it. Aspect is
   width / height. */

export type PlayShape = 'portrait' | 'square' | 'wide' | 'landscape' | 'screen' | 'phone';

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
  /** Show the picture at its own pixel size on a plain ground, never enlarged: for sprites and transparent art. */
  contain?: boolean;
  /** Pixel size of a contained picture, so it is never upscaled. */
  width?: number;
  height?: number;
  /** A muted, looping video instead of a picture. `phone` is the 9:16 tile for screen recordings. */
  video?: string;
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
    title: 'Jackalope, a game sprite',
    kind: 'Games',
    shape: 'square',
    src: '/play/jackalope.gif',
    alt: 'A looping animation of a grinning purple jackalope with antlers, waving a small fish.',
    contain: true,
    width: 205,
    height: 210,
  },
  {
    title: 'Zombie Critters, in play',
    kind: 'Games',
    shape: 'phone',
    video: '/play/zombie-critters.mp4',
    alt: 'A screen recording of Zombie Critters being played: bombs thrown at critters in a night forest.',
  },
  {
    title: 'Kitsune with a rose',
    kind: 'Illustration',
    shape: 'portrait',
    src: '/play/kitsune.jpg',
    alt: 'A fox spirit in a rose-coloured dress kneels on a rock under a crescent moon, holding a red rose to her face, her long orange tail curling around her, misty pine forest behind.',
  },
  { title: 'Wobbly teacups, set of six', kind: 'Clay', shape: 'portrait', slot: 'ceramics photo' },
  { title: 'Lettering for a tea tin', kind: 'Type', shape: 'square', slot: 'type experiment' },
  { title: 'Mochi, judging', kind: 'Cats', shape: 'square', slot: 'cat portrait', tone: 'ink' },
  { title: 'Risograph, two colours', kind: 'Paper', shape: 'square', slot: 'poster', tone: 'accent' },
  { title: 'Sketchbook, spring, mostly hands', kind: 'Paper', shape: 'wide', slot: 'sketchbook spread' },
  { title: 'A bowl that came out fine', kind: 'Clay', shape: 'square', slot: 'ceramics photo' },
];
