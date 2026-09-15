/* The About section's content. Edit here, never in the component.

   Adapted from the 2026 resume. Dates are years only, and dollar figures are
   left out: the page is public. The resume itself is not linked, since it
   carries the case study password. */

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

export interface Contact {
  label: string;
  value: string;
  href: string;
}

export const statement =
  'Designing products that turn messy workflows into things people can actually use.';

/* One entry per paragraph. */
export const bio: string[] = [
  'I\u2019m a lead product designer with over ten years designing AI agents and ' +
    'workflow-heavy B2B software across startups and consulting, as a founding ' +
    'designer and later a design manager. I\u2019m at my best at 0\u21921, when the ' +
    'problem is real and the product doesn\u2019t exist yet. I care about making ' +
    'tools people actually want to use, especially the ones they\u2019re required ' +
    'to. I work closely with engineering and product to turn an ambiguous brief ' +
    'into a product people rely on.',
  'Recently, I\u2019ve been leaning into vibe coding with Claude Code. In fact, ' +
    'this whole website was created using Claude Code!',
  'Off the clock I’m usually brewing tea (currently deep in a research hole on ' +
    'Ruyao and Jingdezhen ceramics) or fostering kittens through the Feral Cat ' +
    'Foundation, which is a lot like design work: delightful, chaotic, and ' +
    'worth it.',
];

/* The page leads with these, in place of a full work history. The resume
   carries the rest and is a gated download. Newest first. */
export const achievements: string[] = [
  'Owned the end-to-end agentic AI experience for the Fountain Platform and ' +
    'its copilot, Cue: self-service onboarding through the agent, the ' +
    'patterns for when it is working, needs confirmation or fails, and its ' +
    'quick actions and workflows across 3 product areas.',
  'Took Fountain Referrals from nothing to GA, a platform that turns employee ' +
    'networks into a hiring channel, live in 12 customer contracts within 6 ' +
    'months of launch.',
  'Designed the Sense AI chatbot end to end and shipped it in 6 months to 10 ' +
    'paying customers, more than double the revenue stretch goal, then led its ' +
    'evolution into Chatbot 2.0 around natural-language understanding.',
  'Designed the chatbot’s fallback, escalation and dead-end recovery states at ' +
    'a scale of 2M+ conversations, cutting cost-to-hire by 30% and raising ' +
    'hiring rates by 55%.',
  'Led Sense Scheduler, automated interview scheduling that doubled candidate ' +
    'engagement and cut time-to-hire by 30%.',
  'Rearchitected Sense Messaging across web and mobile on a new design system ' +
    'and information architecture, after a pilot exposed the usability problems ' +
    'the old interface had been hiding.',
  'Founding designer at Medal: the clinical annotation platform, per-session ' +
    'versioning and an admin-built labeling system. Ciox Health acquired Medal ' +
    '6 months after the work shipped.',
  'Launched Orion Labs’ Command Center MVP at IWCE 2017 on a tight timeline, ' +
    'then designed the self-service funnel that sold it.',
];

export const contact: Contact[] = [
  { label: 'Email', value: 'itonichen@gmail.com', href: 'mailto:itonichen@gmail.com' },
];

/* Newest first. A company with more than one role nests them, so a promotion
   reads as one tenure rather than two jobs. */
export const experience: Employer[] = [
  {
    company: 'Fountain',
    monogram: 'FO',
    roles: [
      {
        title: 'Lead Product Designer',
        dates: '2024 — 2026',
        team: 'Referrals, Platform, Hire Go and the I9 Center',
        summary:
          'Owned the end-to-end agentic AI experience for the unified Fountain ' +
          'Platform and its copilot, Cue.',
        bullets: [
          'Owned product design for the Referrals beta and GA releases, a ' +
            'platform that turns employee networks into a hiring channel, live in ' +
            '12 customer contracts within 6 months of launch.',
          'Designed Cue’s self-service onboarding: the agent prompts and the ' +
            'interaction patterns for when the agent is working, needs ' +
            'confirmation, or fails midway, so new users could set up through the ' +
            'agent and recover without leaving the flow.',
          'Designed Cue’s custom prompts, quick actions and workflows across ' +
            'Hire Go, I9 and Platform, shaping how users delegate tasks to the agent.',
          'Ran async usability testing with interactive prototypes for the ' +
            'Support product, using the findings to drive rapid iterations.',
        ],
      },
    ],
  },
  {
    company: 'Sense',
    monogram: 'SE',
    roles: [
      {
        title: 'Lead Product Designer',
        dates: '2019 — 2023',
        team: 'Chatbot, Scheduler, Messaging and generative AI',
        summary:
          'Led the design of core products: conversational chatbots, interview ' +
          'scheduling, recruitment automation and generative AI features.',
        bullets: [
          'Led the end-to-end design of the Sense AI chatbot, launched in 2020, ' +
            'and its evolution into Chatbot 2.0.',
          'Designed the chatbot’s fallback, escalation-to-human and dead-end ' +
            'recovery states at a scale of 2M+ conversations, reducing ' +
            'cost-to-hire by 30% and increasing hiring rates by 55%.',
          'Led design for Sense Scheduler, automated interview scheduling with ' +
            'templates and reminders, which doubled candidate engagement and cut ' +
            'time-to-hire by 30%.',
          'Led the redesign of Sense Messaging on web and mobile: a new design ' +
            'system, and a new information architecture and navigation.',
          'Ran UX research through UserTesting, feeding continuous improvements ' +
            'to the candidate chatbot experience.',
        ],
      },
    ],
  },
  {
    company: 'Medal',
    monogram: 'ME',
    roles: [
      {
        title: 'Lead Product Designer',
        dates: '2018 — 2019',
        team: 'Founding designer',
        summary:
          'Oversaw all design as the founding designer: product, marketing and ' +
          'internal tooling.',
        bullets: [
          'Owned strategic design projects end to end, from discovery and ' +
            'roadmap prioritization through validation and implementation.',
          'Led user interviews for the Annotation Tool, recording sessions and ' +
            'synthesizing them into the product vision.',
          'Ran stakeholder sessions on business goals and the competitive ' +
            'landscape to prioritize design effort.',
        ],
      },
    ],
  },
  {
    company: 'Orion Labs',
    monogram: 'OR',
    roles: [
      {
        title: 'Senior Product Designer, Web',
        dates: '2016 — 2018',
        team: 'Enterprise web products and internal tooling',
        bullets: [
          'Launched the Command Center MVP at the International Wireless ' +
            'Communications Expo 2017 on a tight timeline, generating leads for ' +
            'the next funding round.',
          'Designed the self-service funnel: a new Command Center landing page, ' +
            'enterprise onboarding, and a subscription purchase flow with ' +
            'service upgrades.',
          'Ran user research and iterative testing to refine the interface and ' +
            'the experience.',
        ],
      },
    ],
  },
  {
    company: 'Independent',
    monogram: 'IN',
    roles: [
      {
        title: 'Founding Product Designer',
        dates: '2024',
        team: 'Olympian.ai',
        bullets: [
          'Designed and launched the MVP, then led a full app and website refresh.',
          'Designed onboarding for an AI receptionist, so businesses could set ' +
            'its greetings, questions and responses for capturing leads.',
        ],
      },
      {
        title: 'Lead Product Designer',
        dates: '2024',
        team: 'Stealth AI company',
        bullets: [
          'Designed a developer tool exposing a model’s reasoning stream, with a ' +
            'factor-graph editor for inspecting and manipulating it, built on ' +
            'active inference theory.',
        ],
      },
      {
        title: 'Product Designer',
        dates: '2023',
        team: 'Stealth fintech AI company',
        bullets: [
          'Led design of purchase-order matching for autonomous invoice ' +
            'verification, and contributed to resource allocation across projects.',
        ],
      },
      {
        title: 'Product Designer',
        dates: '2022',
        team: 'Stealth education platform',
        bullets: [
          'Designed the website, program marketplace and e-learning journeys, a ' +
            'learner dashboard shaped with current learners, a design system, and ' +
            'a self-service enrollment planner.',
        ],
      },
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    group: 'Design',
    items: [
      'Interaction and UI design',
      'Information architecture and user flows',
      'Rapid prototyping and high-fidelity mockups',
      'Design systems',
      'Responsive web and mobile',
      'Accessibility, WCAG 2.0 and Section 508',
    ],
  },
  {
    group: 'Research',
    items: [
      'User interviews and usability testing',
      'Qualitative and quantitative research',
      'Journey maps and task analysis',
      'Heuristic evaluation and accessibility audits',
    ],
  },
  {
    group: 'AI and tools',
    items: [
      'Agent and copilot design, prompt authoring',
      'Claude Design, Claude Code, Figma Make',
      'Figma, Sketch, Miro, Storybook',
      'UserTesting, FullStory, Amplitude, Looker',
      'HTML and CSS, Vercel, Replit',
    ],
  },
];

export const education: Credential[] = [
  { title: 'MFA, Game Design, 2016', org: 'Academy of Art University, San Francisco' },
  { title: 'BA, Media Arts, 2011', org: 'University of California, San Diego' },
];

export const certificates: Credential[] = [
  { title: 'iOS Development, 2014', org: 'MakeSchool, San Francisco' },
];
