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
  'Ten years designing B2B software, from data-heavy dashboards to AI agents. ' +
  'I thrive in ambiguity and enjoy defining the logic underneath the chaos.';
