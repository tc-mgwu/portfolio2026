import type { Section } from '@/lib/types';

/** The section rhythm every case study follows. Replace the bracketed copy. */
export function bodySkeleton(label: string): Section[] {
  return [
    {
      id: 'overview',
      title: 'Overview',
      blocks: [
        { kind: 'lead', text: `[${label} — TWO SENTENCE OVERVIEW. What the product is, and what changed.]` },
        { kind: 'p', text: '[CONTEXT PARAGRAPH. The business situation and why this work was commissioned.]' },
        { kind: 'image', aspect: 16 / 9, caption: '[CAPTION FOR THE OPENING VISUAL]', alt: '[ALT TEXT]' },
      ],
    },
    {
      id: 'problem',
      title: 'Problem',
      blocks: [
        { kind: 'p', text: '[FRAME THE PROBLEM. Who was struggling, with what, and what it cost.]' },
        { kind: 'list', items: ['[EVIDENCE ONE]', '[EVIDENCE TWO]', '[EVIDENCE THREE]'] },
        { kind: 'quote', text: '[A LINE FROM RESEARCH THAT SHARPENED THE PROBLEM.]' },
      ],
    },
    {
      id: 'process',
      title: 'Process',
      blocks: [
        { kind: 'p', text: '[HOW YOU WORKED. Research, explorations, and the constraints that shaped the work.]' },
        { kind: 'image', aspect: 4 / 3, caption: '[CAPTION: EXPLORATION OR RESEARCH ARTEFACT]', alt: '[ALT TEXT]' },
        { kind: 'p', text: '[A DECISION YOU MADE AND WHY. Name the option you rejected.]' },
      ],
    },
    {
      id: 'solution',
      title: 'Solution',
      blocks: [
        { kind: 'p', text: '[WHAT SHIPPED. Describe the design, not the process.]' },
        { kind: 'image', aspect: 16 / 10, caption: '[CAPTION: THE SHIPPED DESIGN]', alt: '[ALT TEXT]' },
        { kind: 'list', items: ['[KEY MOVE ONE]', '[KEY MOVE TWO]', '[KEY MOVE THREE]'] },
      ],
    },
    {
      id: 'outcome',
      title: 'Outcome',
      blocks: [
        { kind: 'p', text: '[WHAT CHANGED, WITH A METRIC. Include what you would do differently.]' },
        { kind: 'image', aspect: 16 / 9, caption: '[CAPTION: RESULT OR AFTER STATE]', alt: '[ALT TEXT]' },
      ],
    },
  ];
}
