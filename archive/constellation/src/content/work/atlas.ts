import type { CaseStudy } from '../../lib/types';

/* One file per case study. Edit the copy here, not in components.
   Constellation geometry lives here too, so a new shape is a content change. */
const atlas: CaseStudy = {
  slug: 'atlas',
  title: '[CASE STUDY 1 TITLE]',
  subtitle: '[SHORT SUBTITLE]',
  problem: '[ONE LINE OF PROBLEM FRAMING]',
  outcome: '[ONE LINE OF OUTCOME, INCLUDING A METRIC]',
  tags: ['B2B SaaS', '0 to 1', 'Design system'],
  constellation: {
    // A rising arc with a trailing tail: ascent, abstracted.
    shape: 'a rising arc with a trailing tail',
    stars: [
      { x: 12, y: 74, mag: 0.9, label: 'Research' },
      { x: 28, y: 58, mag: 1.2, label: 'Journeys' },
      { x: 44, y: 39, mag: 0.8, label: 'Prototype' },
      { x: 63, y: 27, mag: 1.4, label: 'System' },
      { x: 82, y: 18, mag: 1.0, label: 'Launch' },
      { x: 56, y: 62, mag: 0.7, label: 'Testing' },
      { x: 71, y: 79, mag: 0.9, label: 'Handoff' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5], [5, 6]],
  },
};

export default atlas;
