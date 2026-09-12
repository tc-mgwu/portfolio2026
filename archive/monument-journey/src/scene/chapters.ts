/* Chapter palettes, transcribed exactly from the spec. Nothing in the scene may
   use a colour that is not in this file, plus ink and the character cream. */

export const INK = '#3D3A50';
export const CREAM = '#F7F3EC';

import { landingFor, TOTAL } from './path';

export interface Chapter {
  id: string;
  /** Sign copy: [BRACKETS] are placeholders for Toni. */
  name: string;
  industry: string;
  /** Position on the route, filled in from the path's landings. */
  x: number;
  y: number;
  s: number;
  href: string;
  skyTop: string;
  skyBottom: string;
  top: string;
  left: string;
  right: string;
  accent: string;
}

const RAW: Array<Omit<Chapter, "x" | "y" | "s">> = [
  {
    id: 'bell', name: '[SCHOOL]', industry: "Master's thesis",
    href: '/work/thesis/',
    skyTop: '#DCEBF5', skyBottom: '#F3F0EA',
    top: '#C5DCEC', left: '#9FBFD9', right: '#7E9FC0', accent: '#F0C987',
  },
  {
    id: 'totem', name: 'Archives', industry: '[EARLIER WORK]',
    href: '/work/archives/',
    skyTop: '#E4DEF2', skyBottom: '#F5EFEA',
    top: '#CFC3E8', left: '#AC9CD4', right: '#8B7BB8', accent: '#F0C987',
  },
  {
    id: 'columns', name: '[COMPANY]', industry: 'Legal software',
    href: '/work/legal/',
    skyTop: '#F2E4D4', skyBottom: '#F7EFE4',
    top: '#EACFA8', left: '#D3AE84', right: '#B48F68', accent: '#8B7BB8',
  },
  {
    id: 'gate', name: 'Sense', industry: 'Recruiting tech',
    href: '/work/sense/',
    skyTop: '#F4DCDC', skyBottom: '#F7EDE6',
    top: '#EBB8BE', left: '#D695A0', right: '#B87684', accent: '#F7F3EC',
  },
  {
    id: 'telescope', name: 'ARInsights', industry: 'Analyst relations',
    href: '/work/arinsights/',
    skyTop: '#CFE5E2', skyBottom: '#EFF2EA',
    top: '#A8CFC9', left: '#7FB0AC', right: '#5E8F8D', accent: '#F0C987',
  },
  {
    id: 'teahouse', name: 'Teahouse', industry: 'About and contact',
    href: '/about/',
    skyTop: '#F6D9B8', skyBottom: '#F3E2CE',
    top: '#F0BE8E', left: '#DA9C6C', right: '#BC7E52', accent: '#FFE9C4',
  },
];

export const CHAPTERS: Chapter[] = RAW.map((c) => {
  const l = landingFor(c.id);
  if (!l) throw new Error(`chapters: no landing for "${c.id}"`);
  return { ...c, x: l.x, y: l.y, s: l.s };
});

export const ROUTE_LENGTH = TOTAL;

/** Measured along the route now, not in screen pixels. */
export const LABEL_RANGE = 170;
export const THRESHOLD = 90;

export const TOTEM_FACES = [
  { id: 'health', label: 'Health tech', href: '/work/health-tech/' },
  { id: 'telecom', label: 'Telecommunications tech', href: '/work/telecom/' },
];

export function chapterById(id: string): Chapter | undefined {
  return CHAPTERS.find((c) => c.id === id);
}

export function thresholdAt(s: number): Chapter | null {
  for (const c of CHAPTERS) if (Math.abs(c.s - s) <= THRESHOLD) return c;
  return null;
}

export function nearestChapter(s: number): Chapter {
  return CHAPTERS.reduce((best, c) => (Math.abs(c.s - s) < Math.abs(best.s - s) ? c : best));
}

/**
 * Which two chapter skies are in play at world x, and how far between them.
 * Used to crossfade stacked gradient rects rather than rebuilding a gradient.
 */
export function skyBlend(s: number): { a: number; b: number; t: number } {
  if (s <= CHAPTERS[0].s) return { a: 0, b: 0, t: 0 };
  const lastIdx = CHAPTERS.length - 1;
  if (s >= CHAPTERS[lastIdx].s) return { a: lastIdx, b: lastIdx, t: 0 };
  for (let i = 0; i < lastIdx; i++) {
    const from = CHAPTERS[i].s;
    const to = CHAPTERS[i + 1].s;
    if (s >= from && s < to) {
      // Hold each chapter's own atmosphere near its monument; blend between.
      const raw = (s - from) / (to - from);
      const t = Math.min(1, Math.max(0, (raw - 0.25) / 0.5));
      return { a: i, b: i + 1, t };
    }
  }
  return { a: lastIdx, b: lastIdx, t: 0 };
}
