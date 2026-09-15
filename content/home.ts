/* Home page copy. The hero statement is split into lines because each line
   reveals behind its own mask wipe; `em` marks the words that get the
   contrasting treatment. */

export interface Word {
  t: string;
  em?: boolean;
}

export const heroLines: Word[][] = [
  [{ t: 'Product designer specializing in' }],
  [{ t: 'software that rewards expertise' }],
  [{ t: 'without requiring it.', em: true }],
];

export const heroSupport =
  '👋 Hi, I\u2019m Toni. I\u2019m based in California and have spent ten years ' +
  'in enterprise software, from workflow tools to AI agents. I thrive in ' +
  'ambiguity and enjoy defining the logic underneath the chaos.';
