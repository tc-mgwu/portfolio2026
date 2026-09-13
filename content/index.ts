import type { ArchiveItem, CaseStudy } from '@/lib/types';
import fountainReferrals from './work/fountain-referrals';
import senseChatbot from './work/sense-chatbot';
import medalAnnotations from './work/medal-annotations';
import orionCommand from './work/orion-command';
import fountainHireGo from './work/fountain-hire-go';
import senseMessaging from './work/sense-messaging';
import senseChatbot2 from './work/sense-chatbot-2';
import arinsightsPremium from './work/arinsights-premium';
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
  arinsightsPremium,
  // Independent and contract
  edutechPlatform,
  agenticAssistant,
];

/* The home page shows these four. Everything else lives on the collection
   pages, so the front page stays a thirty-second read. Collections with no
   featured project are skipped rather than rendered empty. */
export const featured: CaseStudy[] = [
  fountainReferrals,
  senseChatbot,
  fountainHireGo,
  senseMessaging,
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function neighbours(slug: string): { prev?: CaseStudy; next?: CaseStudy } {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  if (i === -1) return {};
  return { prev: caseStudies[i - 1], next: caseStudies[i + 1] };
}

export const protectedSlugs: string[] = caseStudies
  .filter((c) => c.protected)
  .map((c) => c.slug);

export const archive: ArchiveItem[] = [];
