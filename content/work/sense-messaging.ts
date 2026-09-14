import type { CaseStudy } from '@/lib/types';

/* One file per case study. Edit copy here, never inside a component.
   Set `protected: true` to put this route behind the password gate.

   Imagery lives in /public/work/sense-messaging, cropped from the 2023 case
   study deck. Survey quotes are kept anonymous; the CSAT table is redacted
   behind the password. */

const A = '/work/sense-messaging';

const senseMessaging: CaseStudy = {
  slug: 'sense-messaging',
  collection: 'agentic',
  year: '2024',
  company: 'Sense',
  logo: '/logos/sense-tile-3.png',
  kicker: 'Messaging',
  monogram: 'SE',
  title: 'Hiring through messaging',
  summary:
    'I rearchitected Sense Messaging across mobile and desktop after a design ' +
    'system pilot exposed foundational usability problems the old UI had been ' +
    'hiding. What began as a reskin became a rebuild for recruiters, hiring ' +
    'managers and candidates.',
  projectType: 'Re-architecture and design system adoption',
  role: 'Lead Product Designer',
  protected: false,
  tint: ['#DCE6DF', '#7B9A88'],
  tags: ['Information Architecture', 'Design systems', 'Shipped'],
  art: 'bars',
  heroAspect: 16 / 10,
  heroCaption: 'The redesigned inbox inside the Chrome extension.',
  heroAlt:
    'The redesigned Sense Messaging inbox inside the Chrome extension, beside ' +
    'an applicant tracking system: inbox list, conversation and compose bar.',
  facts: [
    { label: 'Timeline', value: '7 months to beta, 8 to market' },
    { label: 'Team', value: '10, one lead designer' },
    { label: 'Impact', value: '2 fixes shipped from 121 beta responses' },
  ],
  details: [
    { label: 'Role', value: 'Lead Product Designer' },
    {
      label: 'Team',
      value: 'PM, design system designer, junior designer, 2 EMs, 4 engineers, me',
    },
    { label: 'Timeline', value: '8 months' },
    { label: 'Tools', value: 'Figma, FigJam, in-product survey' },
  ],
  brief: [
    {
      label: 'Background',
      body:
        'Sense Messaging is how recruiters talk to candidates over SMS and ' +
        'WhatsApp, mostly from a Chrome extension docked beside their applicant ' +
        'tracking system. It is 1 of the most used things Sense makes, and it ' +
        'was built without a designer.',
    },
    {
      label: 'Project context',
      body:
        'I led design for moving Messaging onto the new company design system, ' +
        'with a PM, a design system designer, a junior designer and a six-person ' +
        'engineering team. Web app and Chrome extension; the mobile app was out ' +
        'of scope.',
    },
    {
      label: 'The problem',
      body:
        'The interface was dated, cluttered and short of accessibility ' +
        'standards, and its information architecture could not take the ' +
        'integrations the business wanted next, starting with AI-written ' +
        'messages. New recruiters struggled to find features; support tickets ' +
        'said so.',
    },
    {
      label: 'The solution',
      body:
        'A four-level architecture (global bar, inbox, conversation, details ' +
        'panel) chosen from two options through user testing, the app reskinned ' +
        'on the new system, the compose bar rebuilt, and everything else at ' +
        'feature parity. Priorities came out of a three-day workshop with sales, ' +
        'support, product and engineering.',
    },
    {
      label: 'The outcome',
      body:
        'Beta went to 860 recruiters; 121 answered a survey and 45 wrote ' +
        'comments. Satisfaction skewed negative, as it does after a big change, ' +
        'and the two most common complaints became the first two post-launch ' +
        'fixes.',
    },
  ],
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      blocks: [
        {
          kind: 'lead',
          text:
            'Sense Messaging is the app recruiters keep open all day: SMS and ' +
            'WhatsApp with candidates, in a Chrome extension docked beside the ' +
            'applicant tracking system. It had never had a designer. This is how ' +
            'we moved it onto the new design system and a new architecture, and ' +
            'what recruiters told us when we did.',
        },
        {
          kind: 'p',
          text:
            'The brief was a reskin. The real work was underneath it: an ' +
            'information architecture that could carry the integrations the ' +
            'business wanted next, and a modernised, accessible interface that ' +
            'people would trust enough to keep using.',
        },
        {
          kind: 'image',
          src: `${A}/beta-design.jpg`,
          lightbox: false,
          aspect: 2368 / 1338,
          alt:
            'The redesigned Messaging inbox in the Chrome extension, docked beside ' +
            'an ATS: inbox list on the left, conversation and compose bar on the right.',
          caption: 'The design that went to beta, inside the Chrome extension.',
        },
      ],
    },
    {
      id: 'problem',
      title: 'The problem',
      blocks: [
        {
          kind: 'p',
          text:
            'Messaging gives recruiters a fast way to engage candidates, but the ' +
            'app had grown by accretion. Most of its functionality had been ' +
            'designed by engineers and the PM, and it showed.',
        },
        {
          kind: 'list',
          items: [
            'An outdated design system that fell short of current accessibility standards.',
            'A cluttered interface that made onboarding new recruiters slow and drove support tickets.',
            'An information architecture that could not scale to the product integrations coming next.',
          ],
        },
        {
          kind: 'image',
          src: `${A}/known-issues.jpg`,
          aspect: 2440 / 1760,
          alt:
            'The old Messaging interface with pink boxes marking the scattered ' +
            'navigation, the actions menu and the oversized details panel.',
          caption:
            'The old app, marked up. Navigation in three places, an actions menu ' +
            'that took extra clicks, a primary colour that pulled attention the ' +
            'wrong way, and conversation owners in a spot that made no sense.',
        },
        {
          kind: 'p',
          text:
            'We also watched a Slack channel of user feedback. Recruiters did not ' +
            'know they could control their message view, wanted more control over ' +
            'how inboxes were organised, and were unhappy about delivery issues, ' +
            'which design alone could not fix. The recruiters themselves wanted ' +
            'to find and contact suitable candidates fast, stay organised, and ' +
            'coordinate with clients; their pain was engaging at scale, giving ' +
            'clients real-time updates, and losing opportunities to usability.',
        },
        {
          kind: 'image',
          src: `${A}/current-ia.jpg`,
          aspect: 3072 / 1600,
          alt:
            'A sitemap of the existing Messaging app, with the multi-inbox panel ' +
            'at the top, inbox and account levels in the middle, and a row of ' +
            'extra steps and third-panel actions at the bottom.',
          caption:
            'The architecture as it stood. The band at the bottom is every ' +
            'action that took an extra step.',
        },
      ],
    },
    {
      id: 'alignment',
      title: 'Getting agreement before pixels',
      blocks: [
        {
          kind: 'p',
          text:
            'We knew the UX problems. The harder question was how to make the ' +
            'next Messaging future-proof while getting buy-in from the people who ' +
            'would fund and sell it. Sense sells itself as a cohesive ecosystem, ' +
            'and with AI arriving across the company this was the moment to ask ' +
            'how it might help recruiters write. So before designing anything I ' +
            'ran a three-day workshop with sales, customer success, product and ' +
            'engineering, judged against three pillars: business objectives, ' +
            'build effort and UX principles.',
        },
        {
          kind: 'list',
          items: [
            'Post-it brainstorm, then voting on favourites.',
            'Grouping into themes.',
            'Team prioritisation by effort and severity.',
            'Synthesis into next steps: what we do now, what waits.',
          ],
        },
        {
          kind: 'p',
          text:
            'Now: help recruiters write better messages (later, with AI-generated ' +
            'content), build trust with a current-looking interface, and cut the ' +
            'usability problems that fed support. Later: stability, a proper ' +
            'Broadcast workflow, a more holistic view of the hiring pipeline, and ' +
            'better notifications in the mobile app. Each of those needed research ' +
            'or resources we did not have yet, and saying so out loud kept them ' +
            'from creeping back in.',
        },
        {
          kind: 'p',
          text:
            'With the other designers and the engineering leads I then proposed ' +
            'the launch order: reskin on the new design system; move main ' +
            'navigation under each inbox to match the new architecture; rebuild ' +
            'the compose bar; reach feature parity on everything else; no ' +
            'integrations yet, but a layout engineering knew would have to take ' +
            'them. Two-week sprints, with design QA in every one.',
        },
        {
          kind: 'gallery',
          items: [
            {
              src: `${A}/workshop-board.jpg`,
              aspect: 1850 / 2160,
              alt: 'A FigJam board of colour-coded sticky notes grouped into themes, with Do Now and Do Next lanes at the bottom.',
              caption: 'The workshop board: ideas, themes, and the now/next split.',
            },
            {
              src: `${A}/figma-file.jpg`,
              aspect: 1324 / 2160,
              alt: 'An overview of the Figma file with sections for Messages, Broadcast, New Messages, Contacts and Settings, each marked MVP or not.',
              caption: 'The working file, section by section, each marked in or out of the MVP.',
            },
          ],
        },
      ],
    },
    {
      id: 'architecture',
      title: 'Two architectures, tested',
      blocks: [
        {
          kind: 'p',
          text:
            'After looking at how TextUs and Intercom organise the same job, we ' +
            'drew two options on the same four levels: a global app bar for ' +
            'future integrations, an inbox level listing conversations by ' +
            'channel, the conversation itself, and a details panel that only ' +
            'opens when an action needs it. The difference was where the ' +
            'secondary navigation lived and how much compose sat in view.',
        },
        {
          kind: 'gallery',
          items: [
            {
              src: `${A}/ia-options.png`,
              aspect: 840 / 1780,
              alt: 'Two wireframe schematics numbered one to four, showing the global bar, inbox, conversation and a dashed details panel.',
              caption: 'The two layouts as schematics.',
            },
            {
              src: `${A}/ia-option-1.jpg`,
              aspect: 1528 / 1642,
              alt: 'Option one: a narrow icon rail, an inbox list, and a conversation with a minimal compose bar.',
              caption: 'Option 1: closer to the old app.',
            },
            {
              src: `${A}/ia-option-2.jpg`,
              aspect: 1564 / 1642,
              alt: 'Option two: inbox with a New Message button and channel filters, and a conversation with a fuller compose bar.',
              caption: 'Option 2: compose actions up front.',
            },
          ],
        },
        {
          kind: 'p',
          text:
            'I wrote a research plan and we tested both with recruiters, customer ' +
            'success managers and implementation experts. Option 2 won: it read ' +
            'panel by panel like the patterns people already knew from messaging ' +
            'apps, and it kept more of the compose actions in front of the user.',
        },
      ],
    },
    {
      id: 'beta',
      title: 'What the beta said',
      blocks: [
        {
          kind: 'p',
          text:
            'We put the new design in front of 860 recruiters in beta and, after ' +
            'four days of use, asked them a two-question survey inside the ' +
            'product. 121 answered, and 45 left comments. Satisfaction skewed ' +
            'negative: about half were dissatisfied, a third satisfied. That is ' +
            'roughly what a big change to a daily tool does, and the people most ' +
            'likely to write a comment are the ones who are unhappy. The comments ' +
            'were where the value was.',
        },
        {
          kind: 'gallery',
          items: [
            {
              src: `${A}/beta-survey.png`,
              aspect: 1456 / 1114,
              alt: 'The in-product survey: a five-point satisfaction scale and a free-text box asking what to improve.',
              caption: 'The survey, shown after four days in beta.',
            },
            {
              src: `${A}/csat-redacted.png`,
              protectedSrc: '/api/asset/sense-messaging/csat.png',
              aspect: 1642 / 1548,
              alt: 'A table of satisfaction scores across five levels with counts and percentages.',
              caption: 'Satisfaction scores. Confidential; unlock to view.',
            },
            {
              src: `${A}/complaint-themes.png`,
              aspect: 1594 / 1572,
              alt: 'A table of complaint themes with counts: extra clicks for user details 13, inbox panel too big 7, change resistance 10, bugs 6, then templates, text alignment, enhancements and font size.',
              caption: 'Comment themes. Two of them were fixable design problems.',
            },
          ],
        },
        {
          kind: 'p',
          text:
            'The three most common complaints: candidate information now sat ' +
            'behind an ellipsis, one click further away; the left navigation ' +
            'panel took up too much room and could not be collapsed; and bugs, ' +
            'from hard-to-read text to a scheduled message that would not send. A ' +
            'good share of the rest was preferring the old design, which we noted ' +
            'and did not act on.',
        },
      ],
    },
    {
      id: 'fixes',
      title: 'Three fixes from the beta',
      blocks: [
        {
          kind: 'p',
          text:
            'Recruiters wanted a candidate’s name, phone and email in view, ' +
            'because they used them constantly, often to pick up the phone. Two ' +
            'comments put it plainly: one wanted to see details on the main ' +
            'screen in case they needed to call someone; another said the old ' +
            'side panel had been convenient and the three dots were an extra, ' +
            'unnecessary step.',
        },
        {
          kind: 'gallery',
          items: [
            {
              src: `${A}/issue-user-details.jpg`,
              aspect: 1580 / 2160,
              alt: 'The beta conversation panel with the ellipsis menu circled and an arrow to the candidate details panel it opened.',
              caption: 'Before: details behind the ellipsis.',
            },
            {
              src: `${A}/issue-user-details-fix.jpg`,
              aspect: 1440 / 2160,
              alt: 'The fixed conversation panel with a details icon in the header, phone and email under the name, and the details panel open.',
              caption: 'After: a one-click details icon, and phone and email in the header.',
            },
          ],
        },
        {
          kind: 'p',
          text:
            'The fix: in one- and two-panel views, a details icon opens the ' +
            'candidate panel in a click; in three-panel views, or wherever there ' +
            'is room, the details panel shows by default instead of the submenu; ' +
            'and phone and email sit under the name in the header. The trade-off ' +
            'was avatars: to keep the header responsive we show only the account ' +
            'holder’s.',
        },
        {
          kind: 'p',
          text:
            'The second issue was the inbox navigation panel. It took too much ' +
            'space, was hard to close at some resolutions, and people wanted to ' +
            'collapse it. Rather than surfacing it automatically in two- and ' +
            'three-panel views, we show the details panel there instead, since ' +
            'messaging candidates is the job. To keep other inboxes’ activity ' +
            'visible, a notification badge went onto the menu button.',
        },
        {
          kind: 'gallery',
          items: [
            {
              src: `${A}/issue-submenu.jpg`,
              aspect: 1740 / 2160,
              alt: 'The inbox navigation panel taking up most of the width, with a note that its width is fluid rather than fixed.',
              caption: 'Before: the submenu panel, fluid and wide.',
            },
            {
              src: `${A}/issue-submenu-fix.jpg`,
              aspect: 1920 / 2160,
              alt: 'The three-panel view with the inbox list, the conversation and the candidate details panel in place of the submenu.',
              caption: 'After: details panel by default, submenu on demand.',
            },
          ],
        },
        {
          kind: 'list',
          items: [
            'Message text hard to read: moved from grey to our darkest primary colour.',
            '"Add template" button missing: designed.',
            'Support tab covering the view: right padding added to panel views.',
            'Scheduled messages not sending: an engineering fix.',
          ],
        },
        {
          kind: 'image',
          src: `${A}/post-launch.jpg`,
          aspect: 3072 / 1059,
          alt: 'Three views of the launched Messaging app at different widths: three panels, two panels and one.',
          caption: 'The iteration that shipped, at three widths.',
        },
      ],
    },
    {
      id: 'outcome',
      title: 'Outcome',
      blocks: [
        {
          kind: 'p',
          text:
            'Messaging launched on the new design system with the new ' +
            'architecture, at feature parity, eight months in. The two most ' +
            'common beta complaints were the first two things fixed after launch. ' +
            'Success is being measured three ways.',
        },
        {
          kind: 'list',
          items: [
            'Adoption: how often features that were rarely used before are used now, such as conversation context and conversation owner.',
            'Friction: CSAT and NPS surveys with free-text fields, so we hear the why.',
            'Efficiency: time to send, time to respond, SMS delivery rate, and the carrier filtering rate.',
          ],
        },
        {
          kind: 'p',
          text:
            'Two things I took from it. You cannot predict the future, but you ' +
            'can try: Messaging had a history of re-implementing features, and ' +
            'validating the vision against known data with stakeholders is what ' +
            'kept now and later apart. And change resistance is real. A popular ' +
            'app’s new architecture will be met by people who liked the old one. ' +
            'That is normal; the job is to be patient while they find their way ' +
            'around, and to listen for the complaints that are actually design ' +
            'problems.',
        },
      ],
    },
  ],
};

export default senseMessaging;
