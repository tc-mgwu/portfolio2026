import type { ArchiveItem, CaseStudy } from '@/lib/types';
import fountainReferrals from './work/fountain-referrals';
import senseChatbot from './work/sense-chatbot';
import medalAnnotations from './work/medal-annotations';
import orionCommand from './work/orion-command';
import fountainHireGo from './work/fountain-hire-go';
import senseMessaging from './work/sense-messaging';
import senseChatbot2 from './work/sense-chatbot-2';
import edutechPlatform from './work/edutech-platform';
import agenticAssistant from './work/agentic-assistant';

/* Add a case study by creating a file in ./work and listing it here.
   Order is the order it appears, newest first within each collection. */
export const caseStudies: CaseStudy[] = [
  // Built from the ground up
  fountainReferrals,
  senseChatbot,
  medalAnnotations,
  orionCommand,
  // Enhanced with agentic AI or re-architecture
  fountainHireGo,
  senseMessaging,
  senseChatbot2,
  // Independent and contract
  edutechPlatform,
  agenticAssistant,
];

/* The home page shows these three. Everything else lives on the collection
   pages, so the front page stays a thirty-second read. Collections with no
   featured project are skipped rather than rendered empty. */
export const featured: CaseStudy[] = [
  fountainReferrals,
  senseChatbot,
  senseMessaging,
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

/* Previous/next skip studies that have no write-up yet, so the footer never
   points at a coming-soon page. */
export function neighbours(slug: string): { prev?: CaseStudy; next?: CaseStudy } {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  if (i === -1) return {};
  const readable = (c?: CaseStudy) => c && !c.comingSoon;
  let prev: CaseStudy | undefined;
  for (let j = i - 1; j >= 0; j--) if (readable(caseStudies[j])) { prev = caseStudies[j]; break; }
  let next: CaseStudy | undefined;
  for (let j = i + 1; j < caseStudies.length; j++) if (readable(caseStudies[j])) { next = caseStudies[j]; break; }
  return { prev, next };
}

export const protectedSlugs: string[] = caseStudies
  .filter((c) => c.protected)
  .map((c) => c.slug);

export const archive: ArchiveItem[] = [];
