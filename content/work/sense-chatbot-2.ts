import type { CaseStudy } from '@/lib/types';

/* One file per case study. Edit copy here, never inside a component.
   Set `protected: true` to put this route behind the password gate.

   Imagery lives in /public/work/sense-chatbot-2, cropped from the 2023 case
   study deck. Adoption and rating charts are redacted behind the password;
   the table of customer agencies was left out entirely. */

const A = '/work/sense-chatbot-2';

const senseChatbot2: CaseStudy = {
  slug: 'sense-chatbot-2',
  collection: 'agentic',
  year: '2023',
  company: 'Sense',
  logo: '/logos/sense-tile-3.png',
  monogram: 'SE',
  title: 'Chatbot 2.0',
  summary:
    'Rebuilding the chatbot around natural-language understanding, and ' +
    'settling a design freeze with 6 recruiters and a user test.',
  projectType: 'AI-enabled redesign',
  role: 'Lead Product Designer',
  protected: false,
  tint: ['#DAE6F6', '#5F8ED2'],
  tags: ['Agentic AI', 'Conversational AI', 'Shipped'],
  art: 'grid',
  heroAspect: 16 / 10,
  heroCaption: 'The Chatbot 2.0 builder with the preset question library open.',
  heroAlt:
    'A laptop showing the Chatbot 2.0 conversation builder: a flow on a dotted ' +
    'canvas and a side panel listing preset questions.',
  facts: [
    { label: 'Role', value: 'Lead Product Designer' },
    { label: 'Timeline', value: 'About 18 months, with stops' },
    { label: 'Impact', value: 'Candidates rate 2.0 above 1.0' },
  ],
  details: [
    { label: 'Role', value: 'Lead Product Designer' },
    {
      label: 'Team',
      value: 'Directors of product and engineering, PM, 3 engineering managers, 7 engineers including 2 in ML, me',
    },
    { label: 'Timeline', value: '2022 to May 2023' },
    { label: 'Tools', value: 'Figma, UserTesting' },
  ],
  brief: [
    {
      label: 'Background',
      body:
        'Sense Chatbot 1.0, which I designed from scratch in 2020, talks to ' +
        'candidates in fixed, button-led steps. By 2022 the machine learning ' +
        'team could classify what a candidate meant from free text, which made a ' +
        'very different chatbot possible.',
    },
    {
      label: 'Project context',
      body:
        'I was the one designer on a 14-person team spanning product, ' +
        'engineering and ML, over roughly 18 months with several stops ' +
        'for rescoping and for the model to catch up.',
    },
    {
      label: 'The problem',
      body:
        'Conversations felt robotic: the bot could not understand natural ' +
        'language, so it repeated questions when candidates answered in their ' +
        'own words, and drop-off rose. On the other side, building a bot from ' +
        'scratch was so much work that implementation teams did it for customers.',
    },
    {
      label: 'The solution',
      body:
        'A builder organised around preset questions: trained questions that ' +
        'understand varied answers and write the right data to the right ATS ' +
        'field. After a design freeze over one contested field, a six-person ' +
        'user test settled the direction. The shipped design opens the question ' +
        'library first.',
    },
    {
      label: 'The outcome',
      body:
        'Live in May 2023. Candidates rate 2.0 conversations higher than 1.0. ' +
        'A month in, most questions built were still custom, half of them with a ' +
        'preset equivalent, so adoption work continues while 1.0 is retired.',
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
            'Sense Chatbot 2.0 understands what candidates are asking for, ' +
            'reading natural language, working out the intent, acting on it, ' +
            'and writing what it learns back into the agency’s ATS. This is how we ' +
            'redesigned the tool recruiters use to build it, including the month ' +
            'we could not agree on one field.',
        },
        {
          kind: 'p',
          text:
            'Improving the conversation and widening what the bot can do meant ' +
            'higher completion rates, a far better candidate experience, and more ' +
            'value to customers in a market where every recruiting platform was ' +
            'adding a chatbot.',
        },
        {
          kind: 'image',
          src: `${A}/hero-laptop.jpg`,
          lightbox: false,
          aspect: 2044 / 1340,
          alt:
            'A laptop showing the Chatbot 2.0 builder: a conversation flow on a ' +
            'canvas with a New Question side panel listing preset questions.',
          caption: 'Chatbot 2.0: the builder, with the preset library open.',
        },
      ],
    },
    {
      id: 'problem',
      title: 'The problem',
      blocks: [
        {
          kind: 'split',
          blocks: [
            {
              kind: 'p',
              text:
                'Chatbot 1.0 conversations are linear and transactional. The bot ' +
                'leans on buttons, and because it does not comprehend natural ' +
                'language, a candidate who answers in their own words gets the same ' +
                'question again. It feels robotic, and people leave.',
            },
            {
              kind: 'list',
              items: [
                'Candidates: no real language understanding, so frustrating exchanges and a robotic feel whenever a button is required.',
                'Builders: creating a chatbot from scratch felt like too much work, so implementation teams ended up doing it for customers.',
              ],
            },
            {
              kind: 'p',
              text:
                'I designed 1.0 from the ground up, and its limits were technical ' +
                'from day one. We needed a field for validating data types, for ' +
                'example, because the bot had no way to detect one. With better ML, ' +
                '2.0 could collect data accurately based on which preset question was ' +
                'asked, and that field could go.',
            },
          ],
          picture: {
            src: `${A}/chatbot-1-canvas-and-modal.png`,
            lightbox: false,
            bare: true,
            aspect: 1718 / 1820,
            alt:
              'Two Chatbot 1.0 screens: the conversation canvas with an Add question ' +
              'menu, and the Add Question Node modal with its Validation Type field.',
            caption: 'Chatbot 1.0: the canvas, and the question modal with the field 2.0 would retire.',
          },
        },
      ],
    },
    {
      id: 'intents',
      title: 'Teaching the bot to listen',
      blocks: [
        {
          kind: 'split',
          blocks: [
            {
              kind: 'p',
              text:
                'The core of the project was an intent recognition model that ' +
                'classifies what a candidate types into categories. While I worked ' +
                'on the design, the ML team kept training it on more intent classes ' +
                'as training data came in from customers.',
            },
            {
              kind: 'p',
              text:
                'That model made a new object possible: the preset question. A ' +
                'preset is a question we selected and trained to gather one specific ' +
                'piece of data and to understand however people phrase the answer. ' +
                'Ask "What\u2019s your name?" and one candidate says "My name\u2019s John ' +
                'Doe," another "I go by John Doe," and the bot extracts the name from ' +
                'both. We curated a library of the most common ones.',
            },
            {
              kind: 'p',
              text:
                'The design question was how to show that mapping. Users wanted to ' +
                'choose which ATS field data writes back to, and to understand what ' +
                'was being collected. The constraint: a preset question\u2019s slot is ' +
                'defined by the bot and cannot be changed.',
            },
          ],
          picture: {
            src: `${A}/mapping.png`,
            lightbox: false,
            maxWidth: '20rem',
            aspect: 1400 / 1400,
            alt: 'A diagram: a candidate response flows to a preset question and its data slot, and on to the ATS record.',
            caption: 'How a response reaches the ATS: preset question, data slot, record.',
          },
        },
      ],
    },
    {
      id: 'explorations',
      title: 'Three ways to build a conversation',
      blocks: [
        {
          kind: 'image',
          src: `${A}/three-ways-composite.png`,
          bare: true,
          lightbox: false,
          aspect: 6879 / 2169,
          alt: 'Early screens in the legacy interface: a feature picker for a new chatbot, a question library, and a canvas with a fixed left editing panel.',
          caption:
            'Early designs, still in the legacy interface while the new design ' +
            'system was being built: creation by use case, questions added from ' +
            'a library, nodes edited in a fixed left panel.',
        },
        {
          kind: 'p',
          text:
            'The first iteration treated questions as blocks of information. Add ' +
            'a categorised block, such as personal information, and its common ' +
            'questions land in sequence at once, which cuts the time to build a ' +
            'flow. Editing moved to a fixed right panel.',
        },
        {
          kind: 'gallery',
          items: [
            {
              src: `${A}/iteration-1-blocks.jpg`,
              aspect: 1836 / 1340,
              alt: 'The canvas with an Add a question block panel listing personal information, job history and employment preference groups with toggles.',
              caption: 'Iteration 1: add questions as categorised blocks.',
            },
            {
              src: `${A}/iteration-1-panel.jpg`,
              aspect: 1836 / 1340,
              alt: 'The canvas with a single question open for editing in a fixed right panel.',
              caption: 'Iteration 1: edit a question in a fixed right panel.',
            },
          ],
        },
        {
          kind: 'p',
          text:
            'The second surfaced the library inside the node itself. Creating a ' +
            'node shows a searchable list of preset questions in place, so people ' +
            'discover what exists while they build, and can add a whole block or ' +
            'one question at a time.',
        },
        {
          kind: 'image',
          src: `${A}/iteration-2.jpg`,
          aspect: 2968 / 1072,
          alt: 'Two canvas screens: a search field inside a new node suggesting preset questions, and the chosen question open in the side panel.',
          caption: 'Iteration 2: the node is a search box for the library.',
        },
      ],
    },
    {
      id: 'freeze',
      title: 'The design freeze',
      blocks: [
        {
          kind: 'p',
          text:
            'After more rounds, design reviews across teams and a near-final MVP ' +
            'more than once, we stopped. The director of engineering called a ' +
            'design freeze because the PM and I could not agree on adding one ' +
            'more required field: the data type each question collects.',
        },
        {
          kind: 'split',
          blocks: [
            {
              kind: 'p',
              text:
                'The hypothesis for adding it: a "data captured" field would drive ' +
                'adoption of presets and make data more accurate, because it would ' +
                'auto-detect the type as you typed a question and convert your custom ' +
                'question into the smarter preset equivalent, so nobody would have to ' +
                'convert by hand.',
            },
            {
              kind: 'p',
              text: 'From a usability standpoint I disagreed, for three reasons.',
            },
            {
              kind: 'list',
              items: [
                'It was redundant: we already had a data validation field, and this would not replace it.',
                'It was error-prone and confusing: the field auto-fills as you type, but if you then pick a type by hand your question silently converts into a preset.',
                'It needed a lot of copy to explain, and our users do not read that copy.',
              ],
            },
          ],
          picture: {
            src: `${A}/data-captured-2.png`,
            lightbox: false,
            maxWidth: '18rem',
            aspect: 1381 / 2008,
            alt: 'Two states of the question editor with a Data Captured dropdown: None detected, then Full Name detected with a Replace with prompt.',
            caption: 'The contested field, in both states.',
          },
        },
      ],
    },
    {
      id: 'research',
      title: 'Six recruiters settle it',
      blocks: [
        {
          kind: 'p',
          text:
            'To end the debate I ran a user test with people who would actually ' +
            'use the thing. Two goals: get feedback on two designs for adding a ' +
            'question, one creation-focused and one discovery-focused, and find ' +
            'out whether recruiters understood "data captured" as shown. ' +
            'Unmoderated, on UserTesting, with six participants from staffing and ' +
            'HR of average to advanced web skill.',
        },
        {
          kind: 'gallery',
          items: [
            {
              src: `${A}/creation-focused.jpg`,
              aspect: 3072 / 1728,
              alt: 'Four annotated screens: Add Question opens a custom question, suggestions appear as you type, Data Captured auto-fills, and the question converts to a preset.',
              caption:
                'Creation-focused: straight into editing, with Data Captured as the second field.',
            },
            {
              src: `${A}/discovery-focused.jpg`,
              aspect: 3072 / 1728,
              alt: 'Four annotated screens: Add Question opens a library of preset questions, browse by category or search, and the chosen preset fills the side panel.',
              caption:
                'Discovery-focused: the library first, custom question at the bottom, Data Captured as the first field.',
            },
          ],
        },
        {
          kind: 'quote',
          text:
            'Three preferred discovery-focused, three preferred creation-focused. ' +
            'All six failed to understand data captured, found it frustrating, ' +
            'and ignored the copy explaining it in both prototypes.',
        },
        {
          kind: 'p',
          text:
            'The split on layout was a coin toss. The field was not. That was ' +
            'the answer the team needed, and it came from users rather than from ' +
            'either of us.',
        },
      ],
    },
    {
      id: 'shipped',
      title: 'What shipped',
      blocks: [
        {
          kind: 'p',
          text:
            'The MVP went live on May 5th, 2023, library first. Opening the ' +
            'library on "Add question" lets people discover presets on their own, ' +
            'which is the adoption we wanted, with a custom question always one ' +
            'click away at the bottom.',
        },
        {
          kind: 'image',
          src: `${A}/mvp.jpg`,
          aspect: 2020 / 1700,
          alt: 'The shipped builder: a flow on the canvas with a node type menu, and the New Question panel listing preset categories with a search field and an Add Custom Question button.',
          caption: 'The shipped MVP: the preset library opens first.',
        },
        {
          kind: 'p',
          text:
            'We keep watching adoption, and launched a "Copy to Chatbot 2.0" ' +
            'flow to move existing bots across. The goal is to sunset 1.0 within ' +
            'a few months of launch.',
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
            'A little over a month in, most questions being built were still ' +
            'custom, and about half of those had a preset equivalent. We did not ' +
            'expect full conversion yet, but it says product education has work ' +
            'to do before people know what the library can do for them.',
        },
        {
          kind: 'table',
          columns: ['Questions in use', 'Count', 'Share'],
          rows: ['Custom', 'Preset'],
          protectedSrc: '/api/asset/sense-chatbot-2/questions-by-type.json',
          caption: 'Bot questions in use, one month after launch. Confidential; unlock to view.',
        },
        {
          kind: 'table',
          columns: ['Custom questions', 'Count', 'Share'],
          rows: ['Preset available', 'No preset available'],
          protectedSrc: '/api/asset/sense-chatbot-2/custom-with-preset.json',
          caption: 'Of the custom questions in use, about half had a preset equivalent.',
        },
        {
          kind: 'p',
          text: 'Candidates, meanwhile, rate Chatbot 2.0 conversations higher than 1.0.',
        },
        {
          kind: 'table',
          columns: ['Month', 'Chatbot 1.0', 'Chatbot 2.0'],
          rows: ['January 2023', 'February 2023', 'March 2023', 'April 2023', 'May 2023'],
          protectedSrc: '/api/asset/sense-chatbot-2/ratings.json',
          caption:
            'Average candidate rating by month, out of 5. Chatbot 2.0 launched in ' +
            'March. Read from the monthly chart, so approximate.',
        },
        {
          kind: 'list',
          items: [
            'Adoption: preset versus custom questions in use.',
            'Candidate friction: the feedback node keeps collecting experience data.',
            'Builder experience: NPS and CSAT surveys with the recruiters who build bots.',
          ],
        },
        {
          kind: 'p',
          text:
            'Two lessons. Data is king: when stakeholders need a consensus, ' +
            'reframe the problem around the user’s interest and let a test point ' +
            'the way. And AI-assisted creation tools are still new to most ' +
            'people: our audience’s technical confidence varies, and erring on ' +
            'the side of over-explaining builds the trust the feature needs.',
        },
      ],
    },
  ],
};

export default senseChatbot2;
