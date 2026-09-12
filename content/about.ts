/* The About section's content. Edit here, never in the component. */

export interface Role {
  title: string;
  dates: string;
  /** Team or product line, under the title. */
  team?: string;
  summary?: string;
  bullets: string[];
}

export interface Employer {
  company: string;
  /** Two characters read best in the chip. */
  monogram: string;
  roles: Role[];
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export interface Credential {
  title: string;
  org: string;
  href?: string;
}

export const statement = '[DESIGNING PRODUCTS THAT — ONE LINE ON WHAT YOU DO.]';

export const bio =
  '[TWO OR THREE SENTENCES. What you specialise in, the kinds of teams and ' +
  'problems you work with, and the shape of the work you want next. Keep it ' +
  'concrete: name the industries, the team sizes, and the constraints.]';

/* Newest first. A company with more than one role nests them, so a promotion
   reads as one tenure rather than two jobs. */
export const experience: Employer[] = [
  {
    company: '[COMPANY ONE]',
    monogram: 'C1',
    roles: [
      {
        title: 'Senior Product Designer',
        dates: '[MONTH YEAR] — Present',
        team: '[TEAM OR PRODUCT LINE]',
        summary: '[ONE LINE ON SCOPE: what you own and who you work with.]',
        bullets: [
          '[AN OUTCOME WITH A NUMBER IN IT.]',
          '[A DECISION YOU DROVE, AND WHAT IT CHANGED.]',
          '[SOMETHING YOU BUILT THAT OTHER TEAMS NOW USE.]',
        ],
      },
      {
        title: 'Product Designer',
        dates: '[MONTH YEAR] — [MONTH YEAR]',
        bullets: ['[AN OUTCOME FROM THE EARLIER ROLE.]'],
      },
    ],
  },
  {
    company: '[COMPANY TWO]',
    monogram: 'C2',
    roles: [
      {
        title: 'Product Designer',
        dates: '[MONTH YEAR] — [MONTH YEAR]',
        team: '[TEAM OR PRODUCT LINE]',
        summary: '[ONE LINE ON SCOPE.]',
        bullets: [
          '[AN OUTCOME WITH A NUMBER IN IT.]',
          '[A SECOND OUTCOME.]',
        ],
      },
    ],
  },
  {
    company: '[COMPANY THREE]',
    monogram: 'C3',
    roles: [
      {
        title: 'Product Designer',
        dates: '[MONTH YEAR] — [MONTH YEAR]',
        bullets: ['[AN OUTCOME FROM EARLY IN YOUR CAREER.]'],
      },
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    group: '[SKILL GROUP ONE]',
    items: ['[SKILL]', '[SKILL]', '[SKILL]', '[SKILL]'],
  },
  {
    group: '[SKILL GROUP TWO]',
    items: ['[SKILL]', '[SKILL]', '[SKILL]'],
  },
  {
    group: '[SKILL GROUP THREE]',
    items: ['[SKILL]', '[SKILL]', '[SKILL]', '[SKILL]'],
  },
];

export const education: Credential[] = [
  { title: '[DEGREE]', org: '[INSTITUTION]' },
];

export const certificates: Credential[] = [
  { title: '[CERTIFICATE]', org: '[ISSUER]' },
  { title: '[CERTIFICATE]', org: '[ISSUER]' },
];
