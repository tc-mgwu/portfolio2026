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
    'campaign tooling on web to the worker\u2019s mobile referral flow.',
  projectType: '0 to 1 product design',
  role: 'Lead Product Designer',
  protected: false,
  comingSoon: true,
  tint: ['#F8DCC4', '#E0763A'],
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
    { label: 'Role', value: 'Lead Product Designer' },
    { label: 'Timeline', value: '6 months' },
    {
      label: 'Impact',
      value:
        'Tens of thousands of referrals submitted by workers across dozens of ' +
        'customers since GA, with referral volume up year over year',
    },
  ],
  details: [
    { label: 'Role', value: 'Lead Product Designer' },
    { label: 'Team', value: 'PM, engineering lead, 2 engineers, QA engineer, me' },
    { label: 'Timeline', value: '6 months' },
    { label: 'Tools', value: 'Figma, FigJam' },
  ],
  brief: [
    {
      label: 'Company',
      body:
        'Fountain sells hiring and workforce management software to employers of ' +
        'frontline workers. Referrals is the module that turns their existing ' +
        'workforce into a sourcing channel.',
    },
    {
      label: 'Problem',
      body:
        'Talent acquisition teams ran referrals through email, spreadsheets, or a ' +
        'separate CRM. Referred candidates got lost among job board applicants, ' +
        'and bonus payouts were tracked by hand. Workers typed referral details ' +
        'into forms and never learned whether their referee was hired or when ' +
        'they would be paid. Strategic accounts had asked Fountain for a ' +
        'referrals product to cut applicant acquisition costs, and 3 discovery ' +
        'calls confirmed the same gaps at UPS, Brightside Health and Home Instead.',
    },
    {
      label: 'Solution',
      body:
        'The brief was a free, always-on program covering every opening. I ' +
        'pushed to add targeted incentives so customers had a reason to launch, ' +
        'which turned the program into campaigns aimed at specific roles and ' +
        'locations. MVP wireframes reviewed with engineering set scope, and we ' +
        'shipped campaign creation, a worker portal with general and per-opening ' +
        'share links, a prepopulated share message I specified as a template for ' +
        'engineering, and milestone-based payouts.',
    },
    {
      label: 'Outcome',
      body:
        'Workers now share a referral link from their phone in 2 taps and see ' +
        'each referee\u2019s status and payout in the portal. Employers see ' +
        'referred applicants tagged in their pipeline and pull incentive reports ' +
        'for payroll instead of tracking by hand. Since GA, workers across dozens ' +
        'of customers have enrolled as referrers and submitted tens of thousands ' +
        'of referrals, and referral volume in the most recent year was higher ' +
        'than the year before.',
    },
  ],
  sections: bodySkeleton('Fountain Referrals Product'),
};

export default fountainReferrals;
