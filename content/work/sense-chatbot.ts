import type { CaseStudy } from '@/lib/types';

/* One file per case study. Edit copy here, never inside a component.
   Set `protected: true` to put this route behind the password gate.

   Imagery lives in /public/work/sense-chatbot. Copy is adapted from the
   2020 write-up. Customer names and contract values are left out on purpose:
   the page is public. Results are stated relative to targets instead. */

const A = '/work/sense-chatbot';

const senseChatbot: CaseStudy = {
  slug: 'sense-chatbot',
  collection: 'zero-to-one',
  year: '2020',
  company: 'Sense',
  logo: '/logos/sense-tile-3.png',
  kicker: 'Chatbot',
  monogram: 'SE',
  title: 'Recruiting through conversation',
  summary:
    'I designed Sense’s first chatbot end to end, from the recruiter’s setup ' +
    'flow to the candidate’s conversation, taking repetitive work off ' +
    'recruiters and giving candidates answers at any hour. Shipped in 6 months.',
  projectType: '0 to 1 product design',
  role: 'Lead Designer',
  protected: false,
  tint: ['#F6D8E9', '#D14A9E'],
  tags: ['0 to 1', 'Conversational AI', 'Shipped', 'WCAG'],
  art: 'grid',
  heroSrc: '/work/sense-chatbot/hero.png',
  heroAspect: 16 / 10,
  heroCaption: 'The Conversation Flow Designer, mid-build.',
  heroAlt:
    'The Conversation Flow Designer: a vertical flow from Start through greeting, ' +
    'introduction and closing nodes, with the add menu open offering a question, ' +
    'a message, a summary or a jump.',
  facts: [
    { label: 'Role', value: 'Lead Designer' },
    { label: 'Timeline', value: '6 months' },
    { label: 'Impact', value: '10 paying customers by December' },
  ],
  details: [
    { label: 'Role', value: 'Lead Designer' },
    { label: 'Team', value: 'ML engineer, PM, front-end engineer, me' },
    { label: 'Timeline', value: '6 months' },
    { label: 'Tools', value: 'Figma, Notion, UserTesting' },
  ],
  brief: [
    {
      label: 'Company',
      body:
        'Sense sells recruiting agencies personalized candidate communication ' +
        'that integrates with their ATS. In 2020 it had 2 products, Engage and ' +
        'Messaging, and the chatbot became its third.',
    },
    {
      label: 'Problem',
      body:
        'Recruiters at staffing agencies spend their days on candidate calls and ' +
        'manual data entry, with up to 60% of their time going to entering data ' +
        'by hand. Many introductory calls only verify a resume or read out a job ' +
        'description, and the time is wasted when the candidate turns out to be ' +
        'unqualified or unavailable. Agencies wanted a bot that collects that ' +
        'data, pre-screens, and writes answers back to their ATS without ' +
        'candidates feeling processed. The pandemic drove heavy contract churn, ' +
        'so Sense compressed the roadmap and sold the chatbot to customers before ' +
        'it was finished.',
    },
    {
      label: 'Solution',
      body:
        'I joined a month before the team had a product manager, so I did the initial ' +
        'product research and competitive feature analysis that gave the team a ' +
        'shared understanding of the space before we scoped the MVP to a web ' +
        'data-collection bot first, with SMS deferred. For candidates, I built an ' +
        'accessible WCAG compliant design system, and our product team ran internal ' +
        'testing and UserTesting rounds that led us to add answer validation and ' +
        'clearer error handling. For recruiters, I designed the Conversation Flow ' +
        'Designer, a self-service tool for building their own chatbot conversations ' +
        'to collect preliminary data from applicants, pre-screen them, and write the ' +
        'answers back to the ATS without having to manually input the data ' +
        'themselves.',
    },
    {
      label: 'Outcome',
      body:
        'Recruiters can collect and pre-screen applicant data through a conversation ' +
        'they built themselves, with the answers landing in their ATS without a phone ' +
        'call or manual entry. Candidates get a conversation that validates their ' +
        'answers as they go and tells them clearly when something doesn\u2019t fit. The ' +
        'product shipped in 6 months and signed its first paying customer within ' +
        'weeks of launch.',
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
            "Sense's third product: a chatbot that talks to candidates, and the " +
            'canvas recruiters use to decide what it says. Both shipped in six ' +
            'months, in the middle of 2020, and by December ten agencies were ' +
            'paying for it.',
        },
        {
          kind: 'p',
          text:
            'Sense sells automation to recruiting agencies: personalized outreach ' +
            'that keeps candidates engaged and writes what it learns back into the ' +
            'applicant tracking system. When the pandemic hit, the chatbot was ' +
            'already on the roadmap with an ambitious timeline. Staffing was one of ' +
            'the hardest-hit industries, contracts were churning, and the plan ' +
            'became a sprint: get to market with something customers would pay for ' +
            'before the market disappeared.',
        },
        {
          kind: 'image',
          src: `${A}/flow-designer-and-mobile.png`,
          lightbox: false,
          aspect: 2624 / 1584,
          alt:
            'The Conversation Flow Designer canvas with a branching pre-screening ' +
            'flow, and a phone showing the resulting chat with Reva.',
          caption:
            'What shipped: a conversation built on the canvas, and the same ' +
            'conversation as a candidate sees it.',
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
            'Recruiters juggle too many candidates to give each one real ' +
            'attention. Much of the early contact is mundane: confirming what is ' +
            'already on a résumé, reading out a job description. When the candidate ' +
            'turns out to be unqualified or unavailable, that call was wasted for ' +
            'both people. Meanwhile sourcing candidates was, by the industry’s ' +
            'own account, the hardest part of the job, and it had been for years ' +
            'before the pandemic made it harder.',
        },
        {
          kind: 'p',
          text:
            'Three groups had to get something out of a chatbot for it to work.',
        },
        {
          kind: 'list',
          items: [
            'Agencies wanted lower acquisition cost per candidate, and workflows ' +
              'that ran the same way at scale.',
            'Recruiters wanted less manual data entry (up to 60% of their time), ' +
              'fewer conversations with unqualified or unavailable candidates, and ' +
              'better relationships with the ones in their pipeline.',
            'Candidates wanted to feel that they mattered to someone, and to hear ' +
              'back clearly and consistently.',
          ],
        },
        {
          kind: 'quote',
          text:
            'How do we accelerate hiring for recruiters while keeping the ' +
            'candidate experience genuinely good?',
        },
        {
          kind: 'p',
          text:
            'The goal was a chatbot for three common jobs: data collection, ' +
            'pre-screening, and job matching. The foundation was data collection, ' +
            "because it exercised Sense's core strength: the answers a candidate " +
            'gives update the ATS automatically. The team was four people, an ML ' +
            'engineer, a product manager, a front-end engineer and me, leading all ' +
            'design.',
        },
      ],
    },
    {
      id: 'research',
      title: 'Learning the territory',
      blocks: [
        {
          kind: 'p',
          text:
            'I had never worked on chatbots or in recruiting, which was part of ' +
            'the appeal. I started with the basics: what a recruiting chatbot is, ' +
            'where they are good and bad, what the best ones do. No formal method, ' +
            'just reading. Since we had no product manager yet and I could not ' +
            'assume the next hire would know the space either, I wrote everything ' +
            'up in Notion as the onboarding document for the chatbot team.',
        },
        {
          kind: 'image',
          src: `${A}/research-notes.png`,
          lightbox: false,
          aspect: 3292 / 1215,
          alt:
            'Pages from the research notes: what a chatbot is, common issues, a ' +
            'feature comparison of recruiting chatbots, and a feature brainstorm.',
          caption:
            'The onboarding notes: chatbot fundamentals, a feature analysis of ' +
            'competing recruiting bots, and the first feature brainstorm.',
        },
        {
          kind: 'p',
          text:
            'A feature analysis of the leading recruiting chatbots showed what we ' +
            'would eventually need to match. Our first version would be a sliver ' +
            'of that, but the one advantage none of them had was that ours would ' +
            'sit inside Engage and Messaging, the products agencies already used. ' +
            'The findings lined up with what customers were asking for: automate ' +
            'the introductory data-collection calls, pre-screen, and write the ' +
            'results back to the ATS. When the product manager joined, we used the ' +
            'list to scope the MVP: a web chatbot for data collection first, SMS ' +
            'second.',
        },
      ],
    },
    {
      id: 'reva',
      title: 'Designing Reva',
      blocks: [
        {
          kind: 'p',
          text:
            'A demo had been in progress for months before I joined, understood ' +
            'only loosely as a web bot that would use natural language processing ' +
            'to tie a conversation back to ATS fields. Our ML engineer was building ' +
            'the write-back API to Bullhorn and the validation that keeps bad data ' +
            'out: ask for a zip code, check that a real one came back. My part was ' +
            'the style guide, and choosing with the PM which scenario to demo.',
        },
        {
          kind: 'image',
          src: `${A}/early-concepts.png`,
          lightbox: false,
          aspect: 4488 / 2430,
          alt:
            'Early concepts for Reva on desktop and mobile: a welcome screen with ' +
            'a circular multicolour mark, and a chat with a zip code question and ' +
            'shift buttons.',
          caption:
            'Early concepts. The soft circular mark takes its cue from Cortana; ' +
            'the conversation follows the conventions people already know.',
        },
        {
          kind: 'p',
          text:
            "The early concepts took their cue from Microsoft's Cortana: a soft " +
            'glow over an unassuming circle felt simple and inviting, which was the ' +
            'character we wanted. The conversation itself followed the conventions ' +
            'of every messaging app, on purpose: bubbles, a typing indicator that ' +
            'doubles as a loading state, and a layout that is comfortable on a ' +
            'phone.',
        },
        {
          kind: 'p',
          text:
            'The design system for the candidate side was derived from the styles ' +
            'already in Engage, with one addition: colours for the rating scale, ' +
            'chosen against contrast requirements so the whole thing met WCAG. Our ' +
            'brand designer was working on a new website with beige at its centre, ' +
            'so I tried beige chat bubbles. They looked awkward. Grey, or a lighter ' +
            'version of our Hawaiian Blue, won every round of feedback for being ' +
            'easy on the eyes.',
        },
        {
          kind: 'image',
          src: `${A}/style-guide.png`,
          lightbox: false,
          aspect: 5628 / 5376,
          alt:
            'The Reva style guide: colours including a five-step rating scale, ' +
            'typography, buttons, headers, message bubbles, inputs, indicators and ' +
            'icons, each specified for mobile and for tablet and web.',
          caption:
            'The chatbot style guide, specified at two breakpoints. Kept neutral ' +
            'so agencies could apply their own branding.',
        },
        {
          kind: 'p',
          text:
            'Two months in, the first candidate-facing demo was ready and we put ' +
            'it in front of the whole company. A Slack channel collected feedback, ' +
            'bug screenshots and opinions; my research plan focused on how the ' +
            'conversation felt and on whether the collected data actually landed in ' +
            'Bullhorn. Much of it was positive. Some of it overturned assumptions we ' +
            'had been carrying.',
        },
        {
          kind: 'image',
          src: `${A}/reva-demo.gif`,
          lightbox: false,
          aspect: 1936 / 1378,
          alt:
            'Recording of the Reva chat: the bot greets John, asks for his zip ' +
            'code, and he types a reply.',
          caption: 'The dogfooding build, February 2020.',
        },
        {
          kind: 'list',
          items: [
            'The bot could not parse conversational answers like "My phone ' +
              'number is 415 222 1111." Now it can.',
            'Multiple-choice questions had no way to say "none of these." We ' +
              'added an out.',
            'People wanted the bot to confirm what it had recorded. It now does, ' +
              'before moving on.',
            'Error states were vague. Validation replies became conversational: ' +
              '"Sorry, I can’t find that zip code."',
            'The tone read as robotic. I wrote a library of softer phrases to ' +
              'draw from.',
          ],
        },
        {
          kind: 'p',
          text:
            'From there the candidate experience went through UserTesting rounds ' +
            'to validate the data-reactivation and pre-screening use cases, and ' +
            'into trial accounts for two of our largest customers to run with ' +
            'their top agencies.',
        },
      ],
    },
    {
      id: 'designer',
      title: 'The Conversation Flow Designer',
      blocks: [
        {
          kind: 'p',
          text:
            'In parallel I was designing the other half of the MVP: the tool ' +
            'recruiters use to build a conversation. Custom messages, questions, ' +
            'response options, and which ATS field each answer writes back to. Three ' +
            'things we knew going in, and two constraints.',
        },
        {
          kind: 'list',
          items: [
            'Customers wanted a bot that collects data and records it to their ATS.',
            'Customers wanted a bot that pre-screens candidates for qualifications ' +
              'and required skills.',
            'Existing customers wanted it inside Engage Journeys, so it fit the ' +
              'workflow they already had.',
            'Constraint: if we lived inside Journeys we could not change its page ' +
              'hierarchy or layout.',
            'Constraint: every agency names its ATS variables differently, and ' +
              'two agencies’ different names can point at the same Bullhorn field.',
        ],
        },
        {
          kind: 'p',
          text:
            'The canvas needed a few things to be legible at a glance. A subtle ' +
            'dot grid, so the background reads as a workspace and the flow stands ' +
            'off it. Arrows for direction. Two node types, message and question, ' +
            'that look different because they do different things. Variables ' +
            'limited to candidate fields, since the bot only ever talks to ' +
            'candidates. And a way to edit a node that could grow as we added ' +
            'fields.',
        },
        {
          kind: 'gallery',
          items: [
            {
              src: `${A}/layout-branching.png`,
              aspect: 1480 / 1600,
              alt: 'Canvas option with a side toolbox and nodes connected by a curving arrow.',
              caption: 'Flowchart: omnidirectional, with a drag-in toolbox.',
            },
            {
              src: `${A}/layout-vertical.png`,
              aspect: 1480 / 1600,
              alt: 'Canvas option with nodes in a single vertical column.',
              caption: 'Vertical: one node per row, top to bottom.',
            },
            {
              src: `${A}/layout-columns.png`,
              aspect: 1480 / 1600,
              alt: 'Canvas option with nodes wrapping into two columns.',
              caption: 'Columns: rows that wrap, to save vertical space.',
            },
          ],
          caption:
            'Three layouts for the canvas. We chose the vertical flow: the least ' +
            'expressive, and the only one engineering could position reliably in ' +
            'the time we had.',
        },
        {
          kind: 'p',
          text:
            'Editing was the harder question. My first idea, borrowed from Adobe, ' +
            'was a small toolbox that could snap to the grid or float free: ' +
            'unobtrusive, and easy to move out of the way. Drag and drop was out ' +
            'of scope for the MVP. The second was to edit directly inside the node ' +
            'on the canvas, which could not scale as fields were added. The third, ' +
            'a floating modal, had the room of a form and kept the canvas ' +
            'navigable. We went with the modal.',
        },
        {
          kind: 'gallery',
          items: [
            {
              src: `${A}/edit-toolbox.svg`,
              aspect: 1440 / 1515,
              alt: 'A floating toolbox listing questions to drag onto the canvas.',
              caption: 'Toolbox: drag a question in. Out of scope.',
            },
            {
              src: `${A}/edit-inline.svg`,
              aspect: 1440 / 1515,
              alt: 'A question node expanded into a form directly on the canvas.',
              caption: 'Inline: the node is the form. Would not scale.',
            },
            {
              src: `${A}/edit-modal.svg`,
              aspect: 1440 / 1515,
              alt: 'An Add a Question panel beside the canvas with a searchable question list.',
              caption: 'Modal: room for fields, canvas stays usable. Shipped.',
            },
          ],
        },
        {
          kind: 'p',
          text:
            'With editing settled, I explored the nodes themselves. The question ' +
            'node would be the most used, so I studied how survey builders handle ' +
            'question types and split it by the kind of answer it takes. The ' +
            'selling point was in the last field: pick the ATS field the answer ' +
            'writes back to, and a recruiter never types that data again.',
        },
        {
          kind: 'gallery',
          items: [
            {
              src: `${A}/node-question.svg`,
              aspect: 2961 / 2736,
              alt: 'States of the Add Question Node modal: empty, naming, tooltip, dropdown, and a binary response.',
              caption: 'Question node: from empty state to a validated answer.',
            },
            {
              src: `${A}/node-responses.svg`,
              aspect: 2961 / 2736,
              alt: 'Multiple response options with ATS values and toggles, and a custom question with editable buttons.',
              caption: 'Response options, and a fully custom question.',
            },
            {
              src: `${A}/node-conditions.svg`,
              aspect: 2961 / 2736,
              alt: 'Three versions of a conditions node built as an if, then, else sentence.',
              caption: 'Condition node: three ways to write if, then, else.',
            },
          ],
        },
      ],
    },
    {
      id: 'branching',
      title: 'Branching',
      blocks: [
        {
          kind: 'p',
          text:
            'By June we wanted a condition node in before the public launch, so a ' +
            'flow could route on what it had learned: compare a collected answer ' +
            'to a value, from the ATS or typed in, and send the candidate down one ' +
            'path or another. That was the first branch, and the design got harder ' +
            'immediately. A branch is one permutation. Users can keep branching, ' +
            'and a conversation with real pre-screening depth becomes a canvas ' +
            'nobody can read.',
        },
        {
          kind: 'p',
          text:
            'Conversations wander; a chatbot’s wandering just has a purpose. ' +
            'Our first use cases were simple, but what if a customer wanted to go ' +
            'deep on a candidate’s answers? I took the question back to the ' +
            'team.',
        },
        {
          kind: 'list',
          items: [
            'Engineering: branching is hard. The simpler we keep it now, the ' +
              'better it scales later.',
            'Product: it has to be easy to do and easy to undo. We do not want to ' +
              'limit how far people customize.',
            'Customers: we want the option, so we can automate more complex ' +
              'interviews and eventually match candidates to open jobs.',
          ],
        },
        {
          kind: 'image',
          src: `${A}/branching-options.png`,
          href: 'https://www.figma.com/file/ZbqcLEEKudYjv3eQ9WqWkn/Branching-Options',
          aspect: 2 / 1,
          fit: 'contain',
          background: '#3A4655',
          alt:
            'Four rows of canvas screens labelled V1 to V4, each a different way ' +
            'of creating and displaying a branch.',
          caption:
            'Four approaches to branching, from splitting a response automatically ' +
            'to letting users draw the path themselves.',
        },
      ],
    },
    {
      id: 'standalone',
      title: 'A product in its own right',
      blocks: [
        {
          kind: 'p',
          text:
            'The MVP assumed chatbot creation would live inside Engage, Sense’s ' +
            'main platform. Engage already had a workflow for outreach campaigns, ' +
            'and merging roadmaps meant borrowing engineers and shipping faster. ' +
            'We printed the mocks and taped them to a wall. The informality did ' +
            'something a review meeting would not have: people from sales, ' +
            'customer success and marketing stopped, asked what it was, and gave ' +
            'us perspectives we would not have heard from our usual stakeholders.',
        },
        {
          kind: 'p',
          text:
            'After a few iterations we decided against it. The Engage codebase at ' +
            'the time made every small change a large effort. And we had started ' +
            'to see the chatbot as a product in its own right rather than a ' +
            'feature: a third line alongside Engage and Messaging, which mattered ' +
            'to revenue and to how the company looked to investors.',
        },
        {
          kind: 'links',
          items: [
            {
              label: 'Figma: conversation flow inside Engage',
              href: 'https://www.figma.com/file/JB0wGRTXrLYNod3k688dh4/Chatbot-MVP-Conversion-Flow',
            },
            {
              label: 'Figma: chatbot MVP',
              href: 'https://www.figma.com/file/Lxsn8lQEaNwT48XtCxQXyQ/Chatbot-MVP',
            },
          ],
        },
      ],
    },
    {
      id: 'scaling',
      title: 'What scaled poorly',
      blocks: [
        {
          kind: 'p',
          text:
            'As development proceeded for our first enterprise customer, I grew ' +
            'uneasy about the ' +
            'form-led modal. Every new field added a row; every row made it ' +
            'taller. I raised it with the PM and engineering and we agreed it ' +
            'would become unwieldy. It did. A year later we moved the modal to a ' +
            'tabbed layout, which I had been pushing for since launch. It was not ' +
            'done sooner because in 2020 the priority was delivery, not ' +
            'refinement.',
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
            'The Conversation Flow Designer launched six months after the work ' +
            'began. Contracts churned through the pandemic and we sold the chatbot ' +
            'to customers before it was finished, but it shipped, and it helped ' +
            'keep the company in business. Not everything survived: SMS, the most ' +
            'requested channel, was pushed to the following quarter.',
        },
        {
          kind: 'timeline',
          items: [
            { date: 'Jun 14, 2020', title: 'Sense announced the chatbot.' },
            { date: 'Jul 28, 2020', title: 'The Conversation Flow Designer launched.' },
            {
              date: 'Aug 6, 2020',
              title: 'First paying customer.',
              text:
                'A national staffing firm ran a three-month pilot across five of ' +
                'its top clients. The chatbot was now the third product after ' +
                'Engage and Messaging.',
            },
            { date: 'Aug 11, 2020', title: 'Outbound pre-screening supported in the designer.' },
            {
              date: 'Dec 14, 2020',
              title: 'First enterprise-wide rollout.',
              text:
                'Every branch and unlimited bots, making that agency our largest ' +
                'customer by revenue.',
            },
            {
              date: 'Dec 20, 2020',
              title: 'Ten signed chatbot customers.',
              text: 'More than double the revenue we had set as the stretch goal for the year.',
            },
          ],
        },
        {
          kind: 'p',
          text:
            'Those numbers are modest out of context. In context, Sense was in ' +
            'survival mode and the aim was to stay above water; we came out ahead. ' +
            'Two years on, the picture had changed scale.',
        },
        {
          kind: 'table',
          columns: ['Use case', 'Conversations started', 'Unique candidates', 'Active bots'],
          rows: ['Data enrichment', 'Pre-screening', 'Sourcing'],
          protectedSrc: '/api/asset/sense-chatbot/usage-by-use-case.json',
          caption:
            'Usage by mid-2022, by use case. Data enrichment, the first use case, ' +
            'remained the most used. Figures are confidential; unlock with the ' +
            'password to see them.',
        },
        {
          kind: 'table',
          columns: ['Channel', 'Conversations started'],
          rows: ['SMS', 'Mobile web', 'Desktop web', 'Unknown'],
          protectedSrc: '/api/asset/sense-chatbot/usage-by-channel.json',
          caption:
            'Conversations started by channel, mid-2022. SMS, the channel we had ' +
            'to cut from the MVP, carried most of the volume.',
        },
        {
          kind: 'table',
          columns: ['Month', 'Typical day', 'Busiest day'],
          rows: ['September 2021', 'November 2021', 'January 2022', 'March 2022', 'May 2022'],
          protectedSrc: '/api/asset/sense-chatbot/unique-conversations.json',
          caption:
            'Unique conversations per day, September 2021 to May 2022, read from ' +
            'the daily chart, so approximate.',
        },
        {
          kind: 'p',
          text:
            'What I enjoyed most was the pace: finding the technical limits and ' +
            'designing against them forces a kind of creativity. I also look back ' +
            'at some of these screens and wish I had had the time to refine them. ' +
            'The team did the best work it could with what it had. The experience ' +
            'that shipped still left a lot to be desired, and saying so is part of ' +
            'the job.',
        },
        {
          kind: 'callout',
          text: 'Want to see the next version of chatbot?',
          cta: 'Read about Chatbot 2.0 here',
          href: '/work/sense-chatbot-2',
        },
      ],
    },
  ],
};

export default senseChatbot;
