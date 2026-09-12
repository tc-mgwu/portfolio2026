import type { CollectionId } from '@/lib/types';

/* The three groupings called out on the home page. Order is display order. */
export interface Collection {
  id: CollectionId;
  /** Small label at the top of the card. */
  label: string;
  /** The headline that explains the grouping. */
  title: string;
  blurb: string;
}

export const collections: Collection[] = [
  {
    id: 'zero-to-one',
    label: '0 to 1',
    title: 'Products I built from the ground up',
    blurb:
      'Work that started with nothing: no users, no patterns, no agreement on ' +
      'what the thing was. Shaping the first version and the arguments that ' +
      'got it shipped.',
  },
  {
    id: 'agentic',
    label: 'Agentic AI & re-architecture',
    title: 'Products I enhanced with agentic AI or systematic re-architecture',
    blurb:
      'Existing products rebuilt rather than restyled: agentic workflows where ' +
      'AI had to earn its place, and the information architecture and design ' +
      'systems underneath them.',
  },
  {
    id: 'special',
    label: 'Special projects',
    title: 'Independent and contract work',
    blurb:
      'Projects taken on alone or as a contractor, where the constraint was ' +
      'usually time, scope, or being the only designer in the room.',
  },
];
