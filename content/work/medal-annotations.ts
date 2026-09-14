import type { CaseStudy } from '@/lib/types';

/* One file per case study. Edit copy here, never inside a component.
   Set `protected: true` to put this route behind the password gate.

   Copy is adapted from the 2026 write-up of work done in late 2019. Imagery
   comes from the 2022 portfolio site; the original Sketch sources live in
   ~/Documents/Medal 2019. Screens show mock records only. Medal and Ciox
   Health are named because the acquisition was public. */

const A = '/work/medal-annotations';

const medalAnnotations: CaseStudy = {
  slug: 'medal-annotations',
  collection: 'zero-to-one',
  year: '2019',
  company: 'Medal',
  logo: '/logos/medal-tile-2.png',
  kicker: 'Medal',
  monogram: 'ME',
  title: 'Collaborative annotation for clinical AI',
  summary:
    'I was the sole designer on the platform medical experts used to review ' +
    'and correct AI-extracted data from medical records: per-session ' +
    'versioning, an admin-built labeling system, and a faster annotation ' +
    'menu. Ciox Health acquired Medal 6 months after the work shipped.',
  projectType: 'Clinical review tooling',
  role: 'Sole Product Designer',
  protected: false,
  tint: ['#DDE2F0', '#7E88BE'],
  tags: ['0 to 1', 'Tooling', 'Shipped'],
  art: 'bars',
  heroAspect: 16 / 10,
  heroCaption: 'The annotation view with the categorized, color-coded label menu open.',
  heroAlt:
    'A medical record open in the Medal annotation tool, with a categorized ' +
    'label menu beside the highlighted text.',
  facts: [
    { label: 'Timeline', value: 'About 2 months, from November 2019' },
    { label: 'Team', value: '6, 1 designer' },
    { label: 'Impact', value: 'Versioning, admin portal and menu shipped' },
  ],
  details: [
    { label: 'Role', value: 'Sole Product Designer' },
    {
      label: 'Team',
      value: '2 front-end engineers, two back-end engineers, a PM, a machine learning advisor, me',
    },
    { label: 'Timeline', value: 'About 2 months, starting November 2019' },
    { label: 'Tools', value: 'Figma, Sketch' },
  ],
  brief: [
    {
      label: 'Background',
      body:
        'Medal was a San Francisco biomedical NLP company. Its software ' +
        'extracted structured data from the unstructured parts of medical ' +
        'records, and clinical experts reviewed and corrected the output before ' +
        'anyone could trust it. Ciox Health acquired Medal in July 2020 to ' +
        'supply research-grade real-world data.',
    },
    {
      label: 'Project context',
      body:
        'I was the only designer, working with 4 engineers, a product ' +
        'manager and a machine learning advisor, for about 2 months from ' +
        'November 2019. All patient data fell under HIPAA.',
    },
    {
      label: 'The problem',
      body:
        'The review tool slowed experts down. Labels lived in one long dropdown ' +
        'with a search field and no grouping, and annotators had no way to keep ' +
        'independent versions of their work on the same document.',
    },
    {
      label: 'The solution',
      body:
        'Each annotator’s session saves as its own version, visible only to ' +
        'them and the admin, who compares versions and selects one. An admin ' +
        'portal where teams build their own label menus, categories first, with ' +
        'a live contrast-safe preview. A categorized, color-coded label menu ' +
        'with hotkeys.',
    },
    {
      label: 'The outcome',
      body:
        'Versioning, the admin portal and the menu redesign shipped; CSV import ' +
        'followed later. A notification-based design was killed before build, ' +
        'avoiding a HIPAA risk. Medal was acquired before long-term adoption ' +
        'could be measured, and the page says so.',
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
            'I was the sole designer for Medal’s clinical annotation platform. ' +
            'Medical experts used it to review and correct AI-extracted data from ' +
            'medical records. I designed per-session versioning, an admin-managed ' +
            'labeling system, and a faster annotation menu, over about two months ' +
            'starting November 2019.',
        },
        {
          kind: 'list',
          items: [
            'I shipped a versioning system that let multiple annotators work on ' +
              'the same document independently.',
            'I killed a notification-based design before build. That avoided a ' +
              'HIPAA risk and engineering work that did not fit the timeline.',
            'I interviewed three medical coders and one physician. The interviews ' +
              'surfaced the annotation menu as a workflow bottleneck, and my ' +
              'findings put the menu redesign on the roadmap.',
            'Ciox Health acquired Medal six months after my work ended. The ' +
              'announcement credits consensus review by clinical experts; my ' +
              'system was the tool for that review. The acquisition is context, ' +
              'not my result.',
          ],
        },
        {
          kind: 'p',
          text:
            'Medal was acquired before long-term adoption could be measured. The ' +
            'results here are what I can verify: what shipped, what I cut before ' +
            'build, and what the research changed.',
        },
        {
          kind: 'image',
          src: `${A}/hero.png`,
          lightbox: false,
          aspect: 2388 / 1442,
          alt:
            'Two Medal screens: the admin portal with Manage Annotations open, ' +
            'and the annotation tool with a medical record and its labels.',
          caption: 'The admin portal and the annotation tool, as shipped.',
        },
      ],
    },
    {
      id: 'about',
      title: 'About Medal',
      blocks: [
        {
          kind: 'p',
          text:
            'Medal was a San Francisco biomedical NLP company. Its software ' +
            'extracted structured data from the unstructured parts of medical ' +
            'records: surgical reports, pathology reports, discharge summaries. ' +
            'It installed alongside any EMR system and created a secure, ' +
            'HIPAA-compliant shared record for each patient encounter.',
        },
        {
          kind: 'p',
          text:
            'Expert review made the extracted data trustworthy. The acquisition ' +
            'announcement says clinical expert reviewers guided Medal’s NLP ' +
            'approach through consensus. My job was to design the workflow those ' +
            'reviewers used. Ciox Health retrieves more than 100 million medical ' +
            'records each year, and acquired Medal in July 2020 to supply ' +
            'research-grade real-world data to pharma, biotech and government ' +
            'researchers.',
        },
      ],
    },
    {
      id: 'challenge',
      title: 'The challenge',
      blocks: [
        {
          kind: 'p',
          text:
            'Medal’s NLP extracted clinical data from unstructured records. ' +
            'Experts had to review and correct the output before anyone could ' +
            'trust it. Errors in clinical data reach real decisions about real ' +
            'patients.',
        },
        {
          kind: 'p',
          text:
            'The existing tool slowed that review down. Labels lived in one long ' +
            'dropdown with a search field and no grouping. Annotators had no way ' +
            'to keep independent versions of their work on the same document. The ' +
            'constraints: a small team, HIPAA rules on all patient data, and ' +
            'about two months.',
        },
      ],
    },
    {
      id: 'versioning',
      title: 'Versioning instead of notifications',
      blocks: [
        {
          kind: 'p',
          text:
            'My first concept was a task list with email notifications. Each ' +
            'notification would link to an updated document version. I killed it ' +
            'for two reasons. We could not build version-linked notifications ' +
            'within the timeline. And HIPAA limited the email content to “An ' +
            'update on [file] made on [date],” which told the reader nothing.',
        },
        {
          kind: 'gallery',
          items: [
            {
              src: `${A}/sketch.jpg`,
              lightbox: false,
              aspect: 4 / 3,
              alt: 'A pencil sketch of an annotation task list and the screens around it.',
              caption: 'The first sketch: a task list with notifications.',
            },
            {
              src: `${A}/post-its.jpg`,
              lightbox: false,
              aspect: 4 / 3,
              alt:
                'Green and blue post-its arranged as an original document, one ' +
                'user’s changes, and a second user’s view of them.',
              caption: 'Working out a changelog with post-its, before versioning replaced it.',
            },
          ],
        },
        {
          kind: 'p',
          text:
            'So I versioned the work instead of pushing updates. Each ' +
            'annotator’s session saves as its own version. Only that annotator ' +
            'and the admin can see it. Annotators work in parallel without ' +
            'conflicts. The admin compares all versions and selects one to show ' +
            'on the patient profile, and can invite specific users to annotate a ' +
            'version.',
        },
        {
          kind: 'p',
          text:
            'The tradeoff: no real-time collaboration and no visibility between ' +
            'annotators. For clinical review, that independence has a benefit. ' +
            'Each annotator forms their own judgment instead of anchoring on the ' +
            'first version they see.',
        },
        {
          kind: 'gallery',
          items: [
            {
              src: `${A}/editor-flow.png`,
              aspect: 3426 / 2312,
              alt:
                'A flow diagram of an annotator opening a document, editing, and ' +
                'saving a version only they and the admin can see.',
              caption: 'Editor view: each session saves as its own version.',
            },
            {
              src: `${A}/admin-flow.png`,
              aspect: 3342 / 1842,
              alt:
                'A flow diagram of an admin comparing every annotator’s version ' +
                'and selecting one for the patient profile.',
              caption: 'Admin view: compare all versions, select one, invite others.',
            },
          ],
        },
      ],
    },
    {
      id: 'labels',
      title: 'Categories before labels',
      blocks: [
        {
          kind: 'p',
          text:
            'Label sets differ by team and record type. I could not design one ' +
            'taxonomy for everyone, so I designed the tool that lets admins build ' +
            'their own. The admin portal requires a category before any label, ' +
            'which forces admins to structure the menu their team will use.',
        },
        {
          kind: 'image',
          src: `${A}/manage-annotations.svg`,
          aspect: 1200 / 1000,
          alt:
            'The Manage Annotations page in the admin portal: categories such as ' +
            'Clinical Summary and Identity, each holding color-coded labels with ' +
            'their codes.',
          caption: 'Manage Annotations: categories first, then the labels inside them.',
        },
        {
          kind: 'p',
          text:
            'Labels take custom colors. I worried about contrast, because a ' +
            'misread label has clinical consequences. I added a live preview and ' +
            'forced black or white text based on the chosen color. CSV bulk ' +
            'import was designed but deferred past the MVP; it was implemented ' +
            'later.',
        },
        {
          kind: 'gallery',
          items: [
            {
              src: `${A}/admin-first-run.svg`,
              aspect: 1200 / 1000,
              alt: 'The empty Manage Annotations page prompting an admin to add a first category.',
              caption: 'First run: nothing exists until a category does.',
            },
            {
              src: `${A}/edit-label.svg`,
              aspect: 1200 / 1000,
              alt: 'Editing a label inline, with a color picker and a live preview of the label chip.',
              caption: 'Editing a label: the preview shows the chip in its final contrast.',
            },
            {
              src: `${A}/delete-category.svg`,
              aspect: 1200 / 1000,
              alt: 'A confirmation dialog before deleting a category and the labels inside it.',
              caption: 'Deleting a category asks first, since its labels go with it.',
            },
          ],
        },
      ],
    },
    {
      id: 'menu',
      title: 'Improved annotations menu',
      blocks: [
        {
          kind: 'p',
          text:
            'I interviewed three medical coders and one physician. The annotators ' +
            'asked for a faster way to move through the label menu. Search ' +
            'helped, but they still scrolled a long flat list, and the open menu ' +
            'covered document text they needed to read. The menu was not on the ' +
            'roadmap. I recorded a session, presented my findings, and made the ' +
            'case that annotation speed was the product’s core loop. The team ' +
            'prioritized the redesign.',
        },
        {
          kind: 'gallery',
          items: [
            {
              src: `${A}/menu-exploration-1.svg`,
              aspect: 1200 / 1000,
              alt: 'Annotated wireframes exploring how the label menu opens and where it sits.',
              caption: 'Exploration: where the menu opens.',
            },
            {
              src: `${A}/menu-exploration-2.svg`,
              aspect: 1200 / 1000,
              alt: 'Annotated wireframes exploring keyboard shortcuts for moving through the menu.',
              caption: 'Exploration: hotkeys.',
            },
            {
              src: `${A}/menu-exploration-3.svg`,
              aspect: 1200 / 1000,
              alt: 'Annotated wireframes comparing a short menu with a long scrolling one.',
              caption: 'Exploration: menu length against the document.',
            },
          ],
        },
        {
          kind: 'p',
          text:
            'I added hotkeys for frequent users and color-coded labels for ' +
            'recognition at a glance. Default colors match Medal’s patient ' +
            'summary conventions: blue for problems, purple for allergies, orange ' +
            'for medications.',
        },
        {
          kind: 'gallery',
          items: [
            {
              src: `${A}/menu-final-explorations.png`,
              aspect: 1345 / 1929,
              alt: 'Several small variants of the color-coded label menu laid out side by side.',
              caption: 'Final rounds of the color-coded menu.',
            },
            {
              src: `${A}/annotation-tool.png`,
              aspect: 1700 / 2000,
              alt:
                'The shipped annotation tool: a medical record with highlighted ' +
                'terms carrying blue, purple and orange labels.',
              caption: 'As shipped: labels colored by category, hotkeys for the frequent ones.',
            },
          ],
        },
      ],
    },
    {
      id: 'iterations',
      title: 'Iterations',
      blocks: [
        {
          kind: 'table',
          columns: ['First version', 'What shipped', 'What changed it'],
          rows: ['Collaboration', 'Label menu', 'Label colors'],
          values: [
            ['Task list with email notifications', 'Per-session versioning with an admin compare view', 'HIPAA limits on email content, and the timeline'],
            ['Flat searchable dropdown', 'Categorized, color-coded menu with hotkeys', 'User interviews'],
            ['Open color picker', 'Live preview with forced black or white text', 'The contrast risk I identified'],
          ],
        },
      ],
    },
    {
      id: 'impact',
      title: 'Impact',
      blocks: [
        {
          kind: 'p',
          text:
            'The versioning system, the admin portal and the menu redesign ' +
            'shipped. CSV import followed later. Ciox acquired Medal in July 2020 ' +
            'to power its real-world data business. The announcement credits ' +
            'consensus review by clinical experts. I designed the tool for that ' +
            'review. I cannot claim the acquisition, and I don’t.',
        },
      ],
    },
    {
      id: 'reflection',
      title: 'Reflection',
      blocks: [
        {
          kind: 'p',
          text:
            'The lesson is that I left before the feedback loop closed. Next ' +
            'time I would instrument the work ' +
            'before shipping. Light measures would do: how many admins built ' +
            'custom menus in month one, or median time to apply a label before ' +
            'and after hotkeys. A design’s value should not depend on the ' +
            'designer being in the room. Instrumentation is now part of my design ' +
            'specs.',
        },
      ],
    },
    {
      id: 'questions',
      title: 'Questions I get asked',
      blocks: [
        {
          kind: 'qa',
          items: [
            {
              q: 'How do you know this worked? You left after two months.',
              a:
                'I don’t have longitudinal metrics, and I won’t pretend to. I can ' +
                'verify three things. The work shipped. My interview findings ' +
                'changed the roadmap. And the expert-review approach my system ' +
                'supported was still central at acquisition, six months later. The ' +
                'missing instrumentation is the thing I would fix.',
            },
            {
              q: 'Why was the menu worth reprioritizing?',
              a:
                'Annotation speed was the business. Medal sold expert-corrected ' +
                'data. Every second spent scrolling the dropdown was cost. When ' +
                'interviewees hit the same wall, that was the core loop degrading, ' +
                'not a cosmetic issue.',
            },
            {
              q: 'Was a first solution wrong?',
              a:
                'Yes, the notification system. The only HIPAA-compliant email we ' +
                'could send carried no useful information, and we could not build ' +
                'version-linked notifications in the timeline. I reframed the ' +
                'problem: version each session instead of pushing updates. The ' +
                'admin’s side-by-side view answered “what changed” better than ' +
                'email could.',
            },
            {
              q: 'How does this hold up as a system?',
              a:
                'The admin portal. I did not design a label taxonomy. I designed ' +
                'the machinery for admins to build their own, with guardrails like ' +
                'forced text contrast.',
            },
            {
              q: 'How early was engineering involved?',
              a:
                'Early. The notification concept died on feasibility before I ' +
                'invested in high-fidelity work. With four engineers and a short ' +
                'timeline, designing over the wall was not an option.',
            },
            {
              q: 'What changed between design and ship?',
              a:
                'CSV bulk import was deferred. Manual label creation shipped ' +
                'first, and import followed.',
            },
          ],
        },
      ],
    },
  ],
};

export default medalAnnotations;
