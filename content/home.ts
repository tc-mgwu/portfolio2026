/* Home page copy. The hero statement is split into lines because each line
   reveals behind its own mask wipe; `em` marks the words that get the
   contrasting treatment. */

export interface Word {
  t: string;
  em?: boolean;
}

export const heroLines: Word[][] = [
  [{ t: 'Product ' }, { t: 'designer', em: true }, { t: ' specializing in' }],
  [{ t: 'software that rewards ' }, { t: 'expertise', em: true }],
  [{ t: 'without requiring it.' }],
];

export const heroSupport =
  'Ten years in B2B taught me what makes a system complete; game design ' +
  'taught me what makes one fun to operate.';

export const heroCurrent = '[ROLE] at [COMPANY]';
