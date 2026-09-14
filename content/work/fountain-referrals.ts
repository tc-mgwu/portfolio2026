import type { CaseStudy } from '@/lib/types';
import { bodySkeleton } from '../skeleton';

/* One file per case study. Edit copy here, never inside a component.
   Set `protected: true` to put this route behind the password gate. */
const fountainReferrals: CaseStudy = {
  slug: 'fountain-referrals',
  collection: 'zero-to-one',
  year: '2025',
  company: 'Fountain',
  logo: '/logos/fountain-tile-3.png',
  kicker: 'Referrals',
  monogram: 'FO',
  title: 'Sourcing through employees',
  summary:
    'I designed a 0 to 1 referral product end to end, from the employer\u2019s ' +
    'campaign tooling on web to the worker\u2019s mobile referral flow. Live in 12 ' +
    'customer contracts within 6 months of GA.',
  projectType: '[PROJECT TYPE]',
  role: '[ROLE]',
  protected: false,
  comingSoon: true,
  tint: ['#F4D9C4', '#C9724A'],
  tags: ['0 to 1', 'Workflows', 'Shipped'],
  art: 'rings',
  heroSrc: '/work/fountain-referrals/hero.png',
  heroAspect: 1596 / 1000,
  heroCaption: 'The Referrals pipeline, as shipped.',
  heroAlt:
    'The Referrals pipeline in Fountain: five counts across the top, from ' +
    'self-identified to retained, above a table of referred candidates with ' +
    'status, job, campaign, referrer and relationship.',
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
  sections: bodySkeleton('Fountain Referrals Product'),
};

export default fountainReferrals;
