import type { CaseStudy } from '@/lib/types';

/* One file per case study. Edit copy here, never inside a component.
   Set `protected: true` to put this route behind the password gate.

   Copy is adapted from the September 2026 write-up. No imagery yet: the
   thirteen visual slots are listed in CONTENT_TODO.md by priority. Customer
   accounts are described, never named. The feature had not shipped when the
   write-up was made, and the page says so wherever a result would go. */

const fountainHireGo: CaseStudy = {
  slug: 'fountain-hire-go',
  collection: 'agentic',
  year: '2026',
  company: 'Fountain',
  logo: '/logos/fountain-tile-3.png',
  monogram: 'FO',
  title: 'Configurable Opening Flows',
  summary:
    'Hire Go activation moved from prompts only engineers could edit to ' +
    'configuration admins own and an agent runs, with one rule: an admin can ' +
    'never break activation for the account.',
  projectType: 'Admin configuration for an AI agent',
  role: 'Lead Product Designer',
  protected: true,
  tint: ['#EADDF3', '#9A6CC2'],
  tags: ['Agentic AI', 'Workflows', 'Design complete'],
  art: 'grid',
  heroAspect: 16 / 10,
  heroCaption: 'The flow builder, with the default flow locked at the top of the list.',
  heroAlt:
    'The Opening Flows builder in Hire Go: a list of flows with the default ' +
    'row locked, and a question editor beside it.',
  facts: [
    { label: 'Role', value: 'Lead Product Designer' },
    { label: 'Timeline', value: 'About 3.5 weeks' },
    { label: 'Impact', value: 'Design complete; shipped after I left' },
  ],
  details: [
    { label: 'Role', value: 'Lead Product Designer' },
    {
      label: 'Team',
      value: '1 product manager, 1 engineering lead, 2 engineers, 1 QA lead',
    },
    { label: 'Timeline', value: 'About 3.5 weeks from kickoff to design complete' },
    { label: 'Tools', value: 'Claude Design, Figma' },
  ],
  brief: [
    {
      label: 'Background',
      body:
        'Hire Go lets frontline managers activate a job opening through a chat. ' +
        'That chat predates Cue, Fountain’s AI agent: its questions and rules ' +
        'lived in prompts engineers edited by hand, routed by customer ID and ' +
        'feature flag. 3 enterprise accounts ran custom versions.',
    },
    {
      label: 'Project context',
      body:
        'I owned the admin flow builder, the configuration model as it surfaces ' +
        'in UI, preview and test, the account settings page the builder lives ' +
        'in, and how Cue and the fallback form honor a configured flow. About ' +
        '3 and a half weeks, on a weekly loop of prototype, customer call, ' +
        'engineering review. I was laid off before the feature shipped.',
    },
    {
      label: 'The problem',
      body:
        'Every change to how a customer activated an opening went customer, ' +
        'implementation manager, engineering, deploy. Cue could not run the ' +
        'custom accounts’ questions, so it bounced them to a 2-year-old ' +
        'legacy chat. The bet was to move activation logic into configuration ' +
        'an admin owns. The tension: the more an admin can configure, the more ' +
        'ways they have to break activation for every opening.',
    },
    {
      label: 'The solution',
      body:
        'A flow builder with one mandatory, condition-free default that cannot ' +
        'be deleted, so self-serve is safe to hand over. Standard and custom ' +
        'questions with a description Cue reads, one flow-level instruction, ' +
        'preview and Test with Cue. On the agent path, Cue reads the openings ' +
        'the admin can see, proposes a flow, and lands it in the same builder ' +
        'to confirm.',
    },
    {
      label: 'The outcome',
      body:
        'The success test written into the epic: a new multi-flow customer ' +
        'configured end to end with zero code changes, zero deploys and no ' +
        'per-customer feature flag. 3 custom accounts and the legacy chat ' +
        'were gated on it. I left before launch, so these are the criteria the ' +
        'team committed to, not measured outcomes.',
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
            'Hire Go activation moved from prompts only engineers could edit to ' +
            'configuration admins own and an agent runs, with a rule that an ' +
            'admin can never break activation for the account. I was laid off ' +
            'before the feature shipped, so the results here are the criteria the ' +
            'team committed to, not measured outcomes.',
        },
        {
          kind: 'list',
          items: [
            'A hardcoded chat became self-serve configuration. Before, every ' +
              'change to how a customer activated an opening went customer, ' +
              'implementation manager, engineering, deploy. After, an admin edits ' +
              'the flow in a builder and Cue, Fountain’s AI agent, runs it. The ' +
              'success test in the epic: a new multi-flow customer configured end ' +
              'to end with zero code changes, zero deploys and no per-customer ' +
              'feature flag.',
            'Three enterprise accounts and a two-year-old legacy system were gated ' +
              'on it. Cue could already activate openings for standard customers ' +
              'but redirected the custom accounts to the legacy chat because it ' +
              'could not run their questions. This work lets the legacy chat retire ' +
              'and returns engineering time from prompt maintenance to new work.',
            'One default flow always exists and cannot be deleted. The backend has ' +
              'no fallback: an opening with no flow cannot be activated. I rejected ' +
              'draft-and-publish versioning for a single mandatory, condition-free ' +
              'default. That is the decision that made self-serve safe to ship.',
            'The agent infers the flow from the openings and the admin confirms it ' +
              'in the builder. Instead of a blank box, Cue reads the openings the ' +
              'admin can see and the attributes they share, proposes a ' +
              'configuration, and lands it where the admin can correct it. Chat for ' +
              'intake, structure for consequence.',
            'I drew the MVP line knowing two of three accounts could not migrate on ' +
              'it. Conditional questions, per-question validation and structured ' +
              'preconditions are sequenced after MVP. That cost is tracked as a ' +
              'prerequisite to retiring legacy, not hidden.',
          ],
        },
      ],
    },
    {
      id: 'problem',
      title: 'The problem',
      subtitle: 'Customers waited on release cycles to change a question.',
      blocks: [
        {
          kind: 'p',
          text:
            'Hire Go lets frontline managers activate a job opening through a ' +
            'chat. That chat predates Cue: its questions and rules lived in prompts ' +
            'engineers edited by hand, routed by customer ID and feature flag. Most ' +
            'customers ran one default. Three enterprise accounts ran custom ' +
            'versions: pay hidden because compensation is owned centrally, ' +
            'hiring-manager lists pulled from an external HR system, ' +
            'customer-specific questions, different hiring caps.',
        },
        {
          kind: 'p',
          text:
            'The cost was on both sides. Engineering capacity went to maintaining ' +
            'bespoke prompts instead of building. Customers waited on a release ' +
            'cycle to change a single question. And Cue, which the product org ' +
            'wanted running across the whole platform, had to bounce the custom ' +
            'accounts to the legacy chat. Two parallel chat experiences confused ' +
            'managers and stalled Cue adoption where it mattered most.',
        },
        {
          kind: 'flow',
          rows: [
            {
              label: 'Before: the only self-serve control was which of two pre-built variants an opening landed on',
              steps: [
                { title: 'Customer' },
                { title: 'Implementation manager' },
                { title: 'Engineering' },
                { title: 'Deploy' },
              ],
            },
            {
              label: 'After: logic moves from prompts into configuration',
              steps: [
                { title: 'Admin' },
                { title: 'Flow builder' },
                { title: 'Cue runs it' },
              ],
            },
          ],
        },
        {
          kind: 'p',
          text:
            'The strategic bet: move activation logic out of prompts and code and ' +
            'into configuration an admin owns. The tension inside that bet: the ' +
            'more an admin can configure, the more ways they have to break ' +
            'activation for every opening in the account.',
        },
      ],
    },
    {
      id: 'users',
      title: 'Designing for two users',
      blocks: [
        {
          kind: 'p',
          text:
            'The admin configures activation for the whole organization, on ' +
            'desktop, once. They need to change a question without a ticket, and ' +
            'they need to be unable to take activation down.',
        },
        {
          kind: 'p',
          text:
            'The frontline manager activates an opening from a phone in minutes, ' +
            'often without pay or hours data because their employer holds ' +
            'compensation centrally. They need the flow to ask only what they can ' +
            'answer, and to say plainly when it cannot start.',
        },
      ],
    },
    {
      id: 'research',
      title: 'What the live system taught me',
      blocks: [
        {
          kind: 'p',
          text:
            'Not a formal study. I worked from the research notes on the anchor ' +
            'account, read the production prompts, one default plus the custom ' +
            'variants, diffed them, read the proposed schema, and sat in weekly ' +
            'customer calls and four internal design reviews. Four things came ' +
            'out of it.',
        },
        {
          kind: 'list',
          items: [
            '“Required” was never one concept. Across the prompts a field ' +
              'could be asked, confirmed, shown but locked, preset silently, or ' +
              'excluded entirely. That killed the required toggle. Presentation ' +
              'types stayed in MVP because they are the parity requirement, and the ' +
              'five standard questions are exposed in the builder: how many hires, ' +
              'pay, job hours, interview host, application deadline.',
            'Custom question labels are customer jargon. One account collects a ' +
              'timekeeping-system field under a label that means something to their ' +
              'admins and nothing to an agent. That produced the optional ' +
              'description field: what the field is and why, for Cue to read.',
            'An opening with no flow cannot be activated. Earlier designs let an ' +
              'admin edit or deactivate the default and leave openings with nothing ' +
              'to run. That produced the default guardrail.',
            'Custom flows differ on the same few dimensions. Diffing the prompts ' +
              'showed the variants diverge on pay, hours, hiring cap, a precondition ' +
              'gate, and one or two custom questions, and the routing that picks a ' +
              'flow keys off position, location and opening attributes. That is what ' +
              'made the agent path possible: if the differences are predictable from ' +
              'the openings, the agent can propose most of a flow before the admin ' +
              'types anything.',
          ],
        },
      ],
    },
    {
      id: 'default',
      title: 'Decision 1: every account keeps a default flow',
      subtitle: 'The default flow is the guardrail that makes self-serve safe.',
      blocks: [
        {
          kind: 'p',
          text:
            'Signal: in review, engineering asked whether editing the default ' +
            'could leave openings uncovered. It could, and the backend has no ' +
            'fallback.',
        },
        {
          kind: 'p',
          text:
            'Options: draft-and-publish versioning, the tempting one; free-form ' +
            'flows with routing rules; or one mandatory, condition-free default ' +
            'that everything falls through to.',
        },
        {
          kind: 'p',
          text:
            'Call: the mandatory default. It applies to all openings, cannot be ' +
            'deleted, has no conditions, and can be copied to start a custom flow. ' +
            'Flow states collapse to Active and Inactive.',
        },
        {
          kind: 'p',
          text:
            'Cost: no draft state and less flexibility. What it buys: an admin ' +
            'cannot break activation for the account, which is the only condition ' +
            'under which handing them the builder is responsible.',
        },
      ],
    },
    {
      id: 'mvp',
      title: 'Decision 2: the MVP',
      subtitle: 'Ship the core builder first and sequence conditionals and validation after it.',
      blocks: [
        {
          kind: 'p',
          text:
            'Signal: after the second engineering review, the engineering lead’s read was ' +
            'that the model was drifting toward a workflow editor. Conditionals ' +
            'referenced location, prior answers and a hardcoded state list; ' +
            'validation caps were literal per flow; none of it had a schema.',
        },
        {
          kind: 'p',
          text:
            'Options: full parity with the legacy prompts on day one, or ship the ' +
            'core builder and sequence the rest.',
        },
        {
          kind: 'table',
          columns: ['In MVP', 'Sequenced later'],
          rows: ['Questions', 'Behaviour', 'Safety', 'Checking'],
          values: [
            ['Standard and custom questions, presentation types, the description field', 'Conditional questions'],
            ['One flow-level instruction', 'Per-question validation'],
            ['The default guardrail', 'Structured preconditions'],
            ['Preview, and Test with Cue', 'Existing conditionals stay hardcoded and view-only, with a banner'],
          ],
          caption:
            'Where the line fell. Existing conditionals stay view-only, with a ' +
            'banner that the flow may change based on opening conditions.',
        },
        {
          kind: 'p',
          text:
            'Cost: the MVP cannot migrate two of the three custom accounts on its ' +
            'own, since both depend on branching.',
        },
      ],
    },
    {
      id: 'instruction',
      title: 'Decision 3: telling the agent what to collect',
      subtitle: 'The agent is told what it is collecting rather than how to say it.',
      blocks: [
        {
          kind: 'p',
          text:
            'Signal: Cue uses late extraction. It reads the whole conversation at ' +
            'the end and pulls values out, so exact wording cannot be guaranteed, ' +
            'and any free text an admin writes becomes instruction the agent ' +
            'follows.',
        },
        {
          kind: 'p',
          text:
            'Options: show admins the prompt; a free-text AI instruction on every ' +
            'question, the tempting one; or a neutral description per question ' +
            'plus one flow-level instruction and a summary of collected values ' +
            'before activation.',
        },
        {
          kind: 'p',
          text:
            'Call: the third. Per-question instructions were removed after the ' +
            'final review. Each one was customer-written text fed straight ' +
            'into what Cue runs, and a careless or hostile instruction could skip ' +
            'a gate or write the wrong value. A form fallback honors the same ' +
            'flow, and preview runs against a real opening.',
        },
        {
          kind: 'p',
          text:
            'Cost: admins cannot dictate phrasing except through an exact-wording ' +
            'override, capped at 500 characters, kept findable but deliberately ' +
            'off the default path. It exists for legally signed-off copy, not for ' +
            'tone.',
        },
      ],
    },
    {
      id: 'loop',
      title: 'A weekly loop earned the design',
      subtitle: 'Every week ran the same loop of a prototype, a customer call, an engineering review and a revision.',
      blocks: [
        {
          kind: 'p',
          text:
            'The customer call was the customer, the PM and me. The engineering ' +
            'review followed in the same week, so what a customer said on Tuesday ' +
            'was in front of engineering by Thursday. The work ran in four stages, ' +
            'in order, each depending on the last: the manual flow and its ' +
            'configuration model first, since nothing else could be designed until ' +
            'the model held; then the settings page the builder lives in; then the ' +
            'mobile experience, because Hire Go is responsive and the settings page ' +
            'had no mobile standard; and only then the Cue experience.',
        },
        {
          kind: 'p',
          text:
            'The prototypes were built in Claude Design, not Figma, because the ' +
            'question each week was “does this model make sense to a customer ' +
            'admin,” not “is this pixel right.” A working prototype in front ' +
            'of a customer beat a static frame, and it could be rebuilt before the ' +
            'next engineering review. Figma came in once the interaction model ' +
            'stopped moving. The artifact I shipped to reviews was closer to the ' +
            'thing engineering would build than a spec would have been.',
        },
        {
          kind: 'p',
          text: 'Three places the loop changed what shipped in the design.',
        },
        {
          kind: 'list',
          items: [
            'Question tags went from four to two. The first pass tagged every ' +
              'question with its source, its data type and more, and reviewers ' +
              'could not tell what the tags were for. They collapsed to Standard and ' +
              'Custom, and that tag now carries whether the question is locked to ' +
              'the data model or editable.',
            'The required toggle came off every question. Once the prompt diff ' +
              'showed “required” was five different behaviors, the toggle was a ' +
              'lie. Standard questions lock to the data model; custom questions are ' +
              'editable.',
            'The per-question AI instruction field was removed after the final ' +
              'review and replaced with one flow-level instruction, for the reasons ' +
              'in Decision 3.',
          ],
        },
        {
          kind: 'timeline',
          items: [
            { date: 'Week 1', title: 'Kickoff.', text: 'Prompt diff, schema review, the first Claude Design prototype.' },
            { date: 'Week 1', title: 'Preview and test ruled out of scope.' },
            { date: 'Week 2', title: 'Engineering review.', text: 'The model is drifting toward a workflow editor; preview and test reopened.' },
            { date: 'Week 3', title: 'Test with Cue designed.', text: 'Rather than letting “publish to sandbox first” stand as the answer.' },
            { date: 'Week 3', title: 'Review: per-question instructions removed.', text: 'One flow-level instruction replaces them.' },
            { date: 'Week 4', title: 'Design complete.', text: 'Builder, settings home, mobile standard and the Cue path handed over.' },
          ],
        },
      ],
    },
    {
      id: 'settings-home',
      title: 'The builder needed a home that did not exist',
      blocks: [
        {
          kind: 'p',
          text:
            'Once the flow model was settled with the team and customers, it ' +
            'needed somewhere to live. Hire Go had no account-level settings ' +
            'paradigm. Its Settings page held the logged-in user’s notifications ' +
            'and language, which made it a user-level page. Opening Flows needed ' +
            'an organization-level home, so I designed the new Hire Go account ' +
            'settings page as an extensible container: Opening Flows is the first ' +
            'section, not the reason the page exists. User notification settings ' +
            'moved to the user profile, the old Settings entry became an admin-only ' +
            'shortcut to the account page, and a Notifications item in navigation ' +
            'kept the settings managers still needed reachable.',
        },
      ],
    },
    {
      id: 'mobile',
      title: 'The mobile standard came out of this page',
      blocks: [
        {
          kind: 'p',
          text:
            'Fountain had a desktop settings standard. It had never documented ' +
            'the mobile patterns, and Hire Go is mobile responsive, so every ' +
            'settings screen I shipped would have been an ad hoc mobile layout. ' +
            'With the settings page fixed on desktop, I wrote the mobile standard ' +
            'for the platform settings page: how sections stack, how a section ' +
            'opens into a full-page editor, where actions sit, and how a locked ' +
            'row reads at phone width. It is the standard the rest of Hire Go’s ' +
            'account settings will follow, not a one-off for Opening Flows.',
        },
      ],
    },
    {
      id: 'agent',
      title: 'Designing for an agent that runs a flow it did not write',
      subtitle: 'The agent infers and the admin confirms.',
      blocks: [
        {
          kind: 'p',
          text:
            'The builder is the manual path and the system of record. Fountain’s ' +
            'product org has a mandate to bring agentic capability into every ' +
            'product, and Cue is the one agent across the platform, so Opening ' +
            'Flows needed a parallel agentic path. This was the fourth and last ' +
            'stage on purpose: the configuration model, its settings home and its ' +
            'mobile behavior all had to be stable before an agent could propose ' +
            'configurations inside them. The Cue path was not live when I left, so ' +
            'everything below is designed intent. Agentic products do not have ' +
            'mature patterns yet; these are original calls, and the assumptions ' +
            'they overturned are the useful part.',
        },
        {
          kind: 'p',
          text:
            'Traditional configuration starts from a blank form. An agent should ' +
            'not. Most customer admins do not have the vocabulary to describe an ' +
            'activation flow from scratch, and a blank prompt box assumes they do. ' +
            'So the agent path starts from what the account already has. Cue reads ' +
            'everything in the account the current user can read: the openings, ' +
            'their positions and locations, whether pay and hours data are present ' +
            'or withheld, and the custom opening attributes already defined. From ' +
            'that it proposes a flow: which standard questions to keep, which to ' +
            'exclude because the data is held centrally, what precondition gate ' +
            'the flow needs, and which openings it should apply to. The admin sees ' +
            'the full proposal, corrects any part, and confirms. It lands in the ' +
            'same builder as a manually built flow, editable the same way.',
        },
        {
          kind: 'p',
          text:
            'The scope of the inference is the scope of the user’s permissions, ' +
            'and that is a design decision, not a limitation. A user with access to ' +
            'one location’s positions gets a proposal built from those openings ' +
            'and no others. It also means the proposal is only as complete as the ' +
            'user’s view: most Hire Go users are recruiters and managers who do ' +
            'not have access to Fountain Hire, the parent product where openings ' +
            'are configured, so what they see is the data that has flowed down to ' +
            'them. The design has to make that boundary visible rather than ' +
            'pretend the agent saw everything.',
        },
        {
          kind: 'quote',
          text: 'The agent’s first job is to make the admin’s first draft, not to ask them for one.',
        },
      ],
    },
    {
      id: 'structure',
      title: 'Using chat for intake and structure for consequences',
      blocks: [
        {
          kind: 'p',
          text:
            'Conversation is the right surface for describing what you want. It ' +
            'is the wrong surface for reviewing something that changes how every ' +
            'opening in the account activates. Cue handles intake and proposal ' +
            'in chat. The moment a ' +
            'configuration would be saved, or an opening activated, the design ' +
            'materializes structure around the conversation: the full proposed ' +
            'configuration as a card, the collected activation values as a ' +
            'summary, and a confirm step. Nothing saves from a chat turn alone. ' +
            'The same rule holds at activation for managers: Cue collects values ' +
            'conversationally, then shows every collected value before anything ' +
            'is written.',
        },
        {
          kind: 'p',
          text:
            'Inferred is labeled as inferred. When Cue proposes a flow, the admin ' +
            'needs to know what the agent guessed and what it read. A question ' +
            'excluded because pay is withheld on every opening the user can see is ' +
            'a fact from the data model. A hiring cap of three is a guess from ' +
            'common practice. The proposal shows which is which, so the admin’s ' +
            'attention goes to the guesses, and it says when its view was partial. ' +
            'This is confidence calibration as a design deliverable: who inferred ' +
            'what, which system is authoritative, and where the admin’s judgment ' +
            'is required.',
        },
        {
          kind: 'p',
          text:
            'The platform owns the orchestrator. Cue is one agent across the whole ' +
            'platform. Opening Flows does not own the conversation, the memory, or ' +
            'the order in which a user arrives at it. An admin might ask Cue to set ' +
            'up a flow midway through a different task, with context from an ' +
            'earlier session, and with other tools competing for the same intent. ' +
            'I could not design a golden path. I designed a capability that ' +
            'survives any entry point: the proposal is self-contained, the confirm ' +
            'step is the same regardless of how the user got there, and the ' +
            'builder is always the fallback. That shaped four rules I designed to, ' +
            'none of them measured yet.',
        },
        {
          kind: 'list',
          items: [
            'Interruptibility: the admin corrects any part of a proposal before ' +
              'confirming; the manager fixes any value before activating.',
            'Calibrated friction: a confirm step only where consequence is high. ' +
              'The default guardrail holds through Cue too; that is a rule I set, ' +
              'not a shipped behavior.',
            'Legible failure: one specific sentence per precondition gate, not a ' +
              'generic error. “This flow can’t start because pay data isn’t set ' +
              'on this opening,” not “something went wrong.”',
            'Bounded authority: Cue inherits the user’s permissions and never ' +
              'exceeds them, for what it reads and what it writes. The form ' +
              'fallback covers what the agent cannot run.',
          ],
        },
      ],
    },
    {
      id: 'measures',
      title: 'What the team committed to measure',
      subtitle: 'I left before the feature shipped, so this is the instrumentation plan rather than results.',
      blocks: [
        {
          kind: 'table',
          columns: ['Measure', 'Target'],
          rows: [
            'Time to configure a new multi-flow customer',
            'Custom accounts migrated off legacy',
            'Cue activation rate for those accounts',
            'Engineering tickets for activation changes',
            'Exact-wording override usage',
            'Correction rate on Cue’s proposed flows',
          ],
          values: [
            ['Zero code, zero deploys'],
            ['Three of three'],
            ['Tracked from launch'],
            ['Toward zero'],
            ['Leading indicator: if admins pin every question, we have rebuilt bespoke prompting with a UI on top'],
            ['Leading indicator: if admins rewrite most of a proposal, the inference is reading the wrong signals'],
          ],
        },
      ],
    },
  ],
};

export default fountainHireGo;
