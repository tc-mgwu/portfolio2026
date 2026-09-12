import type { CaseStudy } from '@/lib/types';
import { bodySkeleton } from '../skeleton';

/* One file per case study. Edit copy here, never inside a component.
   Set `protected: true` to put this route behind the password gate. */
const fountainHireGo: CaseStudy = {
  slug: 'fountain-hire-go',
  collection: 'agentic',
  year: '2026',
  company: 'Fountain',
  monogram: 'FO',
  title: 'Fountain Hire Go',
  summary: '[ONE LINE ON THE PROBLEM OR THE OUTCOME]',
  projectType: '[PROJECT TYPE]',
  role: '[ROLE]',
  protected: false,
  tint: ['#E7DFF2', '#8B79B8'],
  art: 'grid',
  heroAspect: 16 / 10,
  heroCaption: '[CAPTION FOR THE HERO VISUAL]',
  heroAlt: '[ALT TEXT FOR THE HERO VISUAL]',
  facts: [
    { label: 'Timeline', value: '[TIMELINE]' },
    { label: 'Team', value: '[TEAM]' },
    { label: 'Impact', value: '[IMPACT]' },
  ],
  details: [
    { label: 'Role', value: '[ROLE]' },
    { label: 'Team', value: '[TEAM]' },
    { label: 'Timeline', value: '[TIMELINE]' },
    { label: 'Tools', value: '[TOOLS]' },
  ],
  brief: [
    { label: 'Background', body: '[THE COMPANY AND THE MARKET, IN TWO OR THREE SENTENCES.]' },
    { label: 'Project context', body: '[WHAT YOU OWNED, WHO WAS ON THE TEAM, AND THE CONSTRAINT.]' },
    { label: 'The problem', body: '[WHO WAS STRUGGLING, WITH WHAT, AND HOW YOU FRAMED IT.]' },
    { label: 'The solution', body: '[WHAT SHIPPED. DESCRIBE THE DESIGN, NOT THE PROCESS.]' },
    { label: 'The outcome', body: '[WHAT CHANGED, WITH A NUMBER IN IT.]' },
  ],
  sections: bodySkeleton('Fountain Hire Go'),
};

export default fountainHireGo;
