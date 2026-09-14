import type { CaseStudy } from '@/lib/types';

/* One file per case study. Edit copy here, never inside a component.
   Set `protected: true` to put this route behind the password gate.

   Imagery lives in /public/work/arinsights-premium, taken from the redesign
   one-pager. Copy is adapted from the September 2026 write-up. Beta customer
   names are left out on purpose: the page is public and the names need
   clearance. Figures that came from observation rather than measurement say
   so. */

const A = '/work/arinsights-premium';

const arinsightsPremium: CaseStudy = {
  slug: 'arinsights-premium',
  collection: 'agentic',
  year: '2026',
  company: 'ARInsights',
  monogram: 'AR',
  title: 'ARInsights Premium Content 2.0',
  summary:
    'Rebuilding analyst-content search around trust, and replacing a rotting ' +
    'taxonomy with collections users own.',
  projectType: 'Platform rebuild, six phases',
  role: 'Sole Product Designer, acting PM for reporting',
  protected: false,
  tint: ['#D7E4E8', '#6F94A4'],
  tags: ['Re-architecture', 'Search', 'Shipped'],
  art: 'rings',
  heroAspect: 16 / 10,
  heroCaption: 'Content Search in Premium Content 2.0, with the additional filters open.',
  heroAlt:
    'The Premium Content 2.0 search page: one search bar across analyst research, ' +
    'blogs and social posts, with source, type, firm and influencer filters below it.',
  facts: [
    { label: 'Timeline', value: 'March 2025 to September 2026' },
    { label: 'Team', value: 'One designer, one engineering team' },
    { label: 'Impact', value: 'Reporting prep from hours to under ten minutes' },
  ],
  details: [
    { label: 'Role', value: 'Sole Product Designer; acting PM for Phase 4, Reporting' },
    { label: 'Team', value: 'One engineering team, two PMs in sequence, the services and CX team, me' },
    { label: 'Timeline', value: 'March 2025 discovery to GA on September 15, 2026' },
    { label: 'Tools', value: 'Figma' },
  ],
  brief: [
    {
      label: 'Background',
      body:
        'Industry analysts at firms like Gartner, Forrester and IDC shape what ' +
        'enterprise buyers purchase. Analyst relations teams manage that standing ' +
        'in ARchitect, and Premium Content is its paid add-on: a database of what ' +
        'analysts publish about a company, its competitors and its market. The ' +
        'legacy version was distrusted enough that customers rebuilt the truth in ' +
        'spreadsheets.',
    },
    {
      label: 'Project context',
      body:
        'The rebuild was sized XXL, the largest tier on the roadmap, in a company ' +
        'of about twenty-five people. I was the only designer across all six ' +
        'phases, from discovery in March 2025 to general availability in September ' +
        '2026, and covered product definition with a colleague during a five-month ' +
        'gap between product managers.',
    },
    {
      label: 'The problem',
      body:
        'Every report rested on coverages, hand-maintained tags that went stale ' +
        'with each rebrand and reorg and could only be changed by support ticket. ' +
        'Search returned noise, so AR managers opened every result by hand. In ' +
        'interviews the ask was not faster search. It was search they could believe.',
    },
    {
      label: 'The solution',
      body:
        'Keyword search with Boolean operators and deduplication, AI summaries and ' +
        'sentiment on every result, and Collections: rules users own that replace ' +
        'the taxonomy outright. Reporting draws on those collections through seven ' +
        'presentation-ready templates and a custom builder, with the source items ' +
        'under every chart.',
    },
    {
      label: 'The outcome',
      body:
        'Twenty-five accounts ran the beta. Observed reporting prep fell from hours ' +
        'of spreadsheet cleaning to under ten minutes, the heaviest account built ' +
        'seven share-of-voice reports in three variants each, and the migrated ' +
        'release went live in July 2026 with GA on September 15.',
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
            'Premium Content is the part of ARchitect that tells an analyst ' +
            'relations team what analysts are saying about them. The legacy ' +
            'version held the data and nobody believed it. Over eighteen months I ' +
            'designed its replacement end to end: search, Collections, saved ' +
            'searches, reporting, uploaded content and alerts.',
        },
        {
          kind: 'list',
          items: [
            'I was the only designer on the company’s biggest bet, across all six ' +
              'phases, and covered product definition during a five-month PM gap.',
            'Users did not want faster search. They wanted search they could ' +
              'believe. That reframing drove deduplication, Boolean search, AI ' +
              'summaries and match highlighting.',
            'I replaced the product’s organizing concept. Hand-maintained coverage ' +
              'tags became keywords in collections that users own.',
            'Testing reversed two of my own decisions: a five-keyword ceiling and a ' +
              'collection-first prerequisite. We shipped eight keyword groups and a ' +
              'no-collection path instead.',
            'Twenty-five accounts ran the beta, and the time savings showed up in ' +
              'observation: reporting prep went from hours to under ten minutes.',
          ],
        },
        {
          kind: 'image',
          src: `${A}/search.png`,
          aspect: 2880 / 1168,
          alt:
            'The Premium Content 2.0 Content Search page: one search field across ' +
            'analyst research, blogs and social media, with additional filters for ' +
            'source, type, firm, influencer group and influencer.',
          caption:
            'Content Search in 2.0: one place to search analyst research, blogs and ' +
            'social posts, with the filters that used to be the only way in.',
        },
      ],
    },
    {
      id: 'background',
      title: 'Background',
      blocks: [
        {
          kind: 'p',
          text:
            'Industry analysts at research firms such as Gartner, Forrester and IDC ' +
            'publish reports that influence what enterprise buyers purchase. ' +
            'Analyst relations (AR) teams manage their company’s standing with ' +
            'those analysts, and ARchitect is the platform they do it in. Premium ' +
            'Content is its paid add-on: a database of what analysts publish about ' +
            'a company, its competitors and its market, which the industry calls ' +
            'coverage. Customers distrusted the legacy version enough to rebuild the ' +
            'truth in spreadsheets. One engineering epic was literally named ' +
            '“End the PowerBI nightmare.”',
        },
        {
          kind: 'p',
          text:
            'ARInsights has about twenty-five employees. There was no design system ' +
            'team, no researcher and no second designer. The rebuild was sized XXL, ' +
            'the largest tier on the roadmap, and shipped in six phases on a rolling ' +
            'basis, each designed against what the database migration could support ' +
            'that sprint.',
        },
      ],
    },
    {
      id: 'coverages',
      title: 'The problem: coverages',
      subtitle: 'Organization by the system’s guess, maintained by the user’s labor.',
      blocks: [
        {
          kind: 'p',
          text:
            'To see why the rebuild had to go this deep, you have to understand ' +
            'coverages, the legacy product’s organizing concept. Confusingly named, ' +
            'since “coverage” also means what analysts write about you, a ' +
            'coverage here was a tag-based bucket. Content was auto-tagged into ' +
            'topic areas, and customers could request custom coverages, configured ' +
            'on the back end by their customer experience manager. On paper, content ' +
            'organized itself. In practice, coverages failed on five fronts.',
        },
        {
          kind: 'list',
          items: [
            'Auto-tagging created noise faster than users could clean it. Acronym ' +
              'and common-word brands broke it worst: one customer’s research was ' +
              'routinely tagged into unrelated buckets, and the untagging piled up ' +
              'and skewed reporting when skipped.',
            'Changing anything meant a support ticket. A new competitor, product ' +
              'line or event to track meant filing a request and waiting. Most ' +
              'customers routed around the wait and kept the truth in spreadsheets.',
            'Tags went stale. One enterprise customer’s terminology changed about ' +
              'twice a year with reorgs, orphaning prior tags. Nobody owned pruning ' +
              'them, because pruning also took a ticket.',
            'Reports inherited every upstream error. One missed or mis-tagged item ' +
              'and the report was silently wrong, which is exactly how you get an ' +
              'AR manager opening every result by hand.',
            'The interface showed raw data, not answers. The grid-first UI failed ' +
              'accessibility standards, buried the analyst and firm behind extra ' +
              'clicks, and had no real keyword search.',
          ],
        },
        {
          kind: 'quote',
          text: 'Getting started took, in one customer’s words, “a data management degree.”',
        },
        {
          kind: 'image',
          src: `${A}/legacy-grid.png`,
          aspect: 1080 / 894,
          alt:
            'The legacy Premium Content Summary page: a blue header, a row of ' +
            'checkbox filters, and a dense data grid with a long snapshot of an ' +
            'analyst blog post in one cell.',
          caption:
            'What I inherited: the legacy grid, organized by coverage tags, with ' +
            'the analyst and firm several clicks away.',
        },
        {
          kind: 'p',
          text:
            'The decision that followed was the most consequential of the project: ' +
            'kill coverages entirely. Every coverage becomes a keyword inside a ' +
            'collection the user owns. I argued for replacing the taxonomy outright ' +
            'rather than patching it, because any tag system starts rotting again ' +
            'after the next customer reorg. It was also the riskiest call. One ' +
            'account had built all its reporting on the grouped filtering coverages ' +
            'gave them; another was alarmed the removal would break tags they used ' +
            'elsewhere in ARchitect; a third had a competitor report seven years in ' +
            'the making, built on exclusions, that had to survive the migration ' +
            'intact. In beta, one account called the replacement “dramatically ' +
            'easier,” and another confirmed a drop in manual untagging.',
        },
      ],
    },
    {
      id: 'search',
      title: 'Search',
      subtitle: 'Users didn’t want faster search. They wanted search they could believe.',
      blocks: [
        {
          kind: 'p',
          text:
            'In April 2025 I ran jobs-to-be-done interviews and workflow audits with ' +
            'customers. We tested four hypothesized jobs: find content fast, build ' +
            'reports efficiently, track coverage over time, extract trends. The jobs ' +
            'held. The priority did not.',
        },
        {
          kind: 'p',
          text:
            'An AR manager at one enterprise account told us she opened every ' +
            'single result, read it, and weeded out noise by hand. She rated her ' +
            'confidence in the data as low and did not use the product for reports ' +
            'at all. The pattern repeated: search once, distrust the output, rebuild ' +
            'it in a spreadsheet. So the brief became trust, and trust meant showing ' +
            'the system’s reasoning.',
        },
        {
          kind: 'list',
          items: [
            'Deduplication by default, so the same article never appears five times.',
            'Advanced search with AND, OR, NOT and exact-phrase matching, because ' +
              'companies with common-word names drown in noise.',
            'AI does the first read: every item gets a generated summary, key ' +
              'insights and sentiment, so users can judge relevance without opening it.',
          ],
        },
        {
          kind: 'p',
          text:
            'Internal QA rounds in December 2025 and February 2026 confirmed the ' +
            'diagnosis from another angle. Testers’ top ask was “why did this ' +
            'appear?”: they wanted the search match highlighted in each result. ' +
            'When a beta account flagged that known coverage was missing from the ' +
            'Research content type, I treated it as UX feedback and fed it into the ' +
            'requirements for the pipeline that pulls content in. Design cannot fix ' +
            'trust if the data underneath is incomplete.',
        },
        {
          kind: 'p',
          text:
            'The reframing held for fifteen months. Every later decision that ' +
            'exposed the system’s reasoning, from sentiment shown with its ' +
            'confidence and supporting quotes to match highlighting to the blocking ' +
            'migration state described below, bought more trust than raw speed did.',
        },
      ],
    },
    {
      id: 'collections',
      title: 'Collections',
      subtitle: 'Organizing coverage shouldn’t be a support ticket.',
      blocks: [
        {
          kind: 'p',
          text:
            'Collections replaced the coverage model. Instead of a taxonomy the ' +
            'system guesses and a support team maintains, users set a rule once: ' +
            'name the collection, define the criteria, and new matching coverage ' +
            'joins as it arrives. I designed the rules builder, manual add and ' +
            'remove, copying a collection to duplicate a complex definition in one ' +
            'step, archiving, a twelve-month change history, and per-collection ' +
            'notification controls across in-app, email digest and Slack.',
        },
        {
          kind: 'image',
          src: `${A}/collections.png`,
          aspect: 2880 / 1168,
          alt:
            'The Collections page in ARchitect: a table of named collections with ' +
            'creator, item count, last content update and an auto-update toggle, ' +
            'and a row menu offering Copy and Delete.',
          caption:
            'Collections: a saved layer of keywords and filters that stays current ' +
            'as content arrives, with copy and archive for the definitions people ' +
            'spent years getting right.',
        },
        {
          kind: 'p',
          text:
            'Rapid usability testing on high-fidelity prototypes shaped the details. ' +
            'Blank-slate onboarding gave way to pre-populated collections and sample ' +
            'reports after testing showed people could not see the product’s ' +
            'value without data in it. The concept research from June to August ' +
            '2025, with seven participants, produced my favorite artifact of the ' +
            'project: a prioritized feature matrix with verbatim proof quotes for ' +
            'relevancy scoring, saved-search alerts, notification controls and ' +
            'collection cloning. Messy feedback in, ranked decisions out.',
        },
        {
          kind: 'p',
          text:
            'Notifications did not exist yet when the January 2026 beta sessions ' +
            'ran, so I tested Figma mocks inside the live staging walkthrough. ' +
            'Users’ answers set the notification defaults and confirmed the ' +
            'change-history feature before a line of code was written.',
        },
      ],
    },
    {
      id: 'migration',
      title: 'The migration constraint',
      subtitle: 'A design constraint, not a backend detail.',
      blocks: [
        {
          kind: 'p',
          text:
            'The migrated release shipped with two years of content, and the ' +
            'migration architecture shaped the experience in ways no user would ' +
            'call elegant. The clearest case: editing a collection’s search ' +
            'parameters triggers a full background re-run of that search to ' +
            'repopulate it, and the database could not handle the user leaving ' +
            'mid-update. My options were an optimistic interface that could silently ' +
            'show a wrong collection, or an honest wait.',
        },
        {
          kind: 'p',
          text:
            'I shipped a blocking state: a popup telling users to stay on the page ' +
            'until the collection finished updating against their saved filters. It ' +
            'is the least graceful screen in the product, and it was the right call. ' +
            'A collection that quietly holds stale or partial content would have ' +
            'recreated the exact trust problem the rebuild existed to solve. The ' +
            'same rolling collaboration with engineering ran through every phase: ' +
            'because features shipped incrementally, I designed each one against ' +
            'what the migration could actually support that sprint, not against an ' +
            'idealized end state.',
        },
      ],
    },
    {
      id: 'reporting',
      title: 'Reporting',
      subtitle: 'One job: prove the program’s value.',
      blocks: [
        {
          kind: 'p',
          text:
            'I owned reporting end to end: why users needed it, what reports were ' +
            'actually being made and for whom, and what the creation experience ' +
            'should be while keeping customization intact. The why came out of ' +
            'interviews in March 2025 with our services and CX team, who built ' +
            'reports on customers’ behalf and were the closest thing the legacy ' +
            'product had to power users. AR teams report upward to executives who ' +
            'are often unfamiliar with what AR does, so the report is the ' +
            'program’s proof of value. And reports drive decisions: the recurring ' +
            'question was gap analysis, which analysts mention us that we are not ' +
            'engaging, and which do we engage heavily who never mention us.',
        },
        {
          kind: 'p',
          text:
            'The same interviews showed what reporting cost. It was the “I hate ' +
            'it but I have to do it” job. One customer’s quarterly report was a ' +
            'stacked bar chart rebuilt in Google Sheets every quarter, numbers ' +
            'pulled by hand from a table and synced into PowerPoint, because the ' +
            'product’s output was not readable enough for senior leadership: ' +
            'labels overlapped the bars. Everything in the legacy product was a sum, ' +
            'so quarter-over-quarter comparison meant exporting to Excel. People ' +
            'toggled between the legacy report builder, which was more functional, ' +
            'and the analytics page, which was prettier, pulling numbers from one ' +
            'and screenshotting the other.',
        },
        {
          kind: 'quote',
          text: 'It’s a bunch of data, but you have to be able to tell a story with that data.',
        },
        {
          kind: 'p',
          text:
            'Those findings became the requirements I defined and prioritized: ' +
            'presentation-ready charts that go into an executive deck without ' +
            'rework, templates that encode the formats people rebuilt by hand each ' +
            'cycle, control over timeframe and sources, a table of the source items ' +
            'under the chart in every report so a surprising number can be ' +
            'validated instead of doubted, and a custom builder plus keyword groups ' +
            'so the templates never became a ceiling. Share of voice, how a ' +
            'company’s coverage volume compares with its competitors’, was the ' +
            'first requirement.',
        },
        {
          kind: 'p',
          text:
            'Before designing screens I built the AR Reporting Strategy Matrix, ' +
            'mapping roughly fifteen real AR use cases to report types and ' +
            'groupings, with linked Figma explorations per row. The matrix proved a ' +
            'small set of shapes covers most questions, which gave us the structure: ' +
            'three report types, seven templates, one custom builder.',
        },
        {
          kind: 'image',
          src: `${A}/report-builder.png`,
          aspect: 6510 / 3552,
          alt:
            'The report type picker over the Reports page, offering Mention Report, ' +
            'Share of Voice and Sentiment Analysis with templates below, beside the ' +
            'share-of-voice chart and source table it generates.',
          caption:
            'The report type picker and the share-of-voice output it generates: a ' +
            'chart ready for a deck, with the source items in a table beneath it.',
        },
      ],
    },
    {
      id: 'testing',
      title: 'Testing and iteration',
      subtitle: 'A limit is a design decision, even when engineering sets it.',
      blocks: [
        {
          kind: 'p',
          text:
            'In January 2026 I walked beta users through the live builder on ' +
            'staging, scripted around real tasks. Two of my own decisions did not ' +
            'survive.',
        },
        {
          kind: 'list',
          items: [
            'The keyword ceiling blocked a core task. I asked users to track three ' +
              'competitors as one category. The modal allowed five keywords or ' +
              'groups, and users hit the wall immediately. The number had come from ' +
              'engineering, and I had accepted it as a technical detail instead of ' +
              'testing it as a design decision. Shipped: eight keyword groups, with ' +
              'validation before the report runs.',
            'The collection prerequisite was a gate, not a shortcut. My flow ' +
              'required a collection before a report. I mock-tested the opposite in ' +
              'Figma, users wanted it, and we shipped a custom-dataset path. A ' +
              'collection became a convenience, not a requirement.',
            'Internal QA added a third correction. Two testers independently failed ' +
              'to add keywords in the report modal, because there was no visible add ' +
              'button and pressing Enter was not discoverable. Two independent ' +
              'failures on one control is not noise. I redesigned the input, and we ' +
              'moved the data table below the chart to match every other ARchitect ' +
              'report. Consistency beats novelty on a reporting surface.',
          ],
        },
        {
          kind: 'p',
          text:
            'The structural payoff: reports draw on live keyword collections rather ' +
            'than hand-maintained coverages, so a competitor rebrand no longer ' +
            'quietly breaks next month’s numbers.',
        },
        {
          kind: 'flow',
          rows: [
            {
              label: 'Legacy Premium Content',
              steps: [
                { title: 'Search content', detail: 'battle acronym noise' },
                { title: 'Capture data', detail: 'build a dataset by hand' },
                { title: 'Export data', detail: 'to other platforms' },
                { title: 'Clean data', detail: 'in a spreadsheet' },
                { title: 'Categorize', detail: 'by firm or competitor' },
                { title: 'Visualize', detail: 'charts in Excel or PowerPoint' },
                { title: 'Format', detail: 'for executive reports' },
              ],
            },
            {
              label: 'Premium Content 2.0',
              steps: [
                { title: 'Select template', detail: 'seven presentation-ready' },
                { title: 'Pick data source', detail: 'collection or dataset' },
                { title: 'Configure dimensions', detail: 'competitors, firms' },
                { title: 'Generate', detail: 'quotes and AI summaries' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'beta',
      title: 'The beta',
      subtitle: 'A research instrument, not a soft launch.',
      blocks: [
        {
          kind: 'p',
          text:
            'No phase rolled out wider until beta accounts had actually used the ' +
            'previous one, so trust failures were caught while they were still ' +
            'cheap to fix. Twenty-five customer accounts, several of them household ' +
            'names in enterprise technology, ran structured three-week cycles from ' +
            'December 2025 into spring 2026: kickoff, a self-serve window, an exit ' +
            'interview. High-touch onboarding with seven enterprise accounts ' +
            'followed the July 2026 migrated release, capturing reactions from ' +
            'working AR managers on their own production data. My part was the ' +
            'feedback loop: I ran the staging walkthroughs and usability sessions, ' +
            'tested unbuilt concepts as Figma mocks inside the live product, and ' +
            'turned findings into design changes.',
        },
        {
          kind: 'p',
          text:
            'One participant praised the navigation and named Collections a ' +
            'favorite, and in the same breath flagged that Research-type results ' +
            'were missing coverage she needed for executive reporting. That was the ' +
            'single most valuable bug report of the program, because it was a trust ' +
            'failure, not a UI failure. Another called out the sentiment snapshot in ' +
            'View Details as a highlight and asked for webinars to be excluded from ' +
            'the Research content type. Both went into the tracker as requirements, ' +
            'not anecdotes. Two QA rounds ran alongside and produced the keyword ' +
            'input redesign, the data table under the chart, date-range presets, ' +
            'and renaming Saved Views to saved searches.',
        },
        {
          kind: 'p',
          text:
            'The beta workbook defined quantitative targets: an NPS of thirty or ' +
            'more, a median of two hours a week saved, a ninety-five percent ' +
            'checklist pass rate at exit. The formal targets were never scored. The ' +
            'evidence I can stand behind is behavioral: our heaviest account did not ' +
            'complete tasks and leave. They built seven share-of-voice reports in ' +
            'three variants each and kept using them.',
        },
        {
          kind: 'timeline',
          items: [
            { date: 'Mar 2025', title: 'Discovery begins.', text: 'Interviews with the services and CX team who built reports on customers’ behalf.' },
            { date: 'Apr 2025', title: 'Jobs-to-be-done interviews and workflow audits.', text: 'The jobs held; the priority became trust.' },
            { date: 'Jun to Aug 2025', title: 'Concept research, seven participants.', text: 'Prioritized feature matrix with verbatim proof quotes.' },
            { date: 'Dec 2025', title: 'Beta cycles and first QA round.', text: 'Twenty-five accounts, three-week cycles. Match highlighting becomes the top ask.' },
            { date: 'Jan 2026', title: 'Staging walkthroughs of the report builder.', text: 'The keyword ceiling and the collection prerequisite both fail with users.' },
            { date: 'Feb 2026', title: 'Second QA round.', text: 'Keyword input redesigned; data table moved under the chart.' },
            { date: 'Jul 21, 2026', title: 'Migrated release goes live with two years of content.' },
            { date: 'Sep 15, 2026', title: 'General availability.', text: 'Vendor sentiment and mention prominence launch alongside it; the legacy product retires after cutover.' },
          ],
        },
      ],
    },
    {
      id: 'pm-gap',
      title: 'The PM gap',
      subtitle: 'Research became the roadmap.',
      blocks: [
        {
          kind: 'p',
          text:
            'From December 2025 to April 2026, between two product managers, the ' +
            'team had no one in the seat. A colleague and I covered product ' +
            'definition: what to build, in what order, and why. The gap coincided ' +
            'with Phase 4, Reporting, where I was the acting PM. There was no time ' +
            'for formal PRDs or acceptance criteria. The prioritization instrument ' +
            'we had was the research I had been running since March 2025, and it ' +
            'turned out to be enough.',
        },
        {
          kind: 'p',
          text:
            'The keyword-group expansion, the no-collection report path, the ' +
            'notification defaults, the date presets: every one of those calls ' +
            'traces to a specific session with a specific user, not to a ' +
            'requirements document. When the January sessions surfaced the ' +
            'five-keyword failure, that finding was the ticket. This is the part of ' +
            'the project I would defend hardest: a research practice rigorous enough ' +
            'that when the formal product function paused, the roadmap did not.',
        },
      ],
    },
    {
      id: 'outcome',
      title: 'Outcomes',
      subtitle: 'The feedback answered the problem statement.',
      blocks: [
        {
          kind: 'p',
          text:
            'The migrated release went live on July 21, 2026 with two years of ' +
            'content. General availability follows on September 15, 2026, and the ' +
            'legacy product retires after cutover. The clearest way to read the ' +
            'results is against the three legacy pains the project set out to kill.',
        },
        {
          kind: 'table',
          columns: ['Legacy pain', 'Before', 'In beta'],
          rows: ['Taxonomy burden', 'Distrusted results', 'Reporting'],
          values: [
            ['“A data management degree” to get started', '“Dramatically easier”; less manual untagging'],
            ['Open every result by hand', 'About 3× fewer clicks to key mentions (estimated)'],
            ['Hours of spreadsheet cleaning', 'Under 10 minutes (observed)'],
          ],
          caption:
            'Read against the three pains. The time figures come from time-to-task ' +
            'observation in beta, not from a controlled study.',
        },
        {
          kind: 'p',
          text:
            'The AI-assisted result cards drew specific callouts. One participant ' +
            'named the sentiment snapshot a highlight; another preferred the card ' +
            'view because it was easier to screenshot and share with stakeholders, ' +
            'the cards doing the executive-communication work that used to need a ' +
            'spreadsheet. In the onboarding wave, the presentation-ready templates ' +
            'were well received by several accounts, and one smaller vendor pointed ' +
            'out the angle that mattered to them: share of voice over time, not ' +
            'absolute counts.',
        },
        {
          kind: 'p',
          text:
            'Not all feedback was praise, and the critical items shaped what shipped ' +
            'next. Missing coverage in Research-type results went straight into the ' +
            'content-pipeline requirements. Webinars are being excluded from the ' +
            'Research type. One account asked whether collections could learn from ' +
            'manual add and remove actions instead of running a static search, ' +
            'which points directly at the entity-matching work below.',
        },
        {
          kind: 'p',
          text:
            'The success bars the beta was designed against still stand as the ' +
            'definition of done: an AR manager produces a chart-plus-table mentions ' +
            'report from a saved collection in under five minutes without help, and ' +
            'builds a defensible competitive share-of-voice view with no engineering ' +
            'or data-science support. That is the PowerBI nightmare, ended.',
        },
      ],
    },
    {
      id: 'next',
      title: 'What’s next',
      blocks: [
        {
          kind: 'p',
          text:
            'The beta surfaced the ceiling of keyword matching, and two findings ' +
            'changed the product’s direction. First, acronym noise: when a company ' +
            'name is also a common word, keyword search returns hits users have to ' +
            'verify by hand. One financial-services account still spends about five ' +
            'minutes every morning weeding out matches against unrelated crypto and ' +
            'banking content. We are moving to LLM-based entity matching and ' +
            'semantic tagging, so the system treats a company as an entity rather ' +
            'than a text string. Second, sentiment misalignment: broad topic ' +
            'sentiment misread a negative market trend as negative news for every ' +
            'company named in the article. We scrapped topic sentiment for ' +
            'vendor-specific scoring, judged only in the context of the company ' +
            'being tracked.',
        },
        {
          kind: 'image',
          src: `${A}/sentiment-prominence.png`,
          aspect: 2880 / 1879,
          alt:
            'The 2.0 results page with a result expanded in a side panel: an AI ' +
            'summary, company sentiment with a positive chip for one company and a ' +
            'negative chip for another, mention prominence, and key insights.',
          caption:
            'In progress at the time of writing: vendor sentiment and mention ' +
            'prominence in the expanded result view, launching with GA.',
        },
        {
          kind: 'p',
          text:
            'The measurement I still owe this project comes after that: ' +
            'completed-reports rate, time-to-first-report, and collection reuse. ' +
            'The longer arc is pre-context: systems that carry what a user cares ' +
            'about, their competitors, their products, their market, so relevance ' +
            'is decided before results render. That is my current work, and a ' +
            'different case study.',
        },
      ],
    },
  ],
};

export default arinsightsPremium;
