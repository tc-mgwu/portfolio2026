# Content to fill

Everything in brackets is a placeholder. Grouped by file.

## `content/home.ts`
Nothing outstanding. The hero is fully written.

## `content/about.ts`
- [ ] `statement` — one line on what you do
- [ ] `bio` — two or three sentences
- [ ] `experience` — three employers, each with roles, dates, team, scope and bullets
- [ ] `skills` — three groups, each with its items
- [ ] `education` — degree and institution
- [ ] `certificates` — two entries, title and issuer

## `content/work/*.ts` — nine case studies

**Written so far:** Sense Chatbot, Sense Messaging, Sense Chatbot 2.0, Fountain
Hire Go (Configurable Opening Flows), Medal Annotations and one unlisted study.
Use them as the model. The other four are flagged `comingSoon: true` and show a
coming-soon page until written; drop the flag when each is done. Each needs:

- [ ] `summary` — one line, shown on the collection cards
- [ ] `projectType` and `role`
- [ ] `facts` — Timeline, Team, Impact, shown as the strip under the title
- [ ] `details` — Role, Team, Timeline, Tools, shown on the case study page
- [ ] `brief` — the five blocks: Background, Project context, The problem, The solution, The outcome
- [ ] `sections` — the long-form body: Overview, Problem, Process, Solution, Outcome
- [ ] `heroAlt` (read out for the hero on the home page and in galleries), plus alt text and captions on every image block. `heroCaption` is kept in the content files but no longer shown: the case study page no longer repeats the hero.

Files: `fountain-referrals`, `orion-command`, `edutech-platform`,
`agentic-assistant`.

## Open questions
- [ ] **Sense Chatbot year.** Listed as 2023, but the copy describes 2020 and a
      pandemic-compressed timeline. One of the two is wrong.
- [ ] **Which case studies are under NDA?** Only `edutech-platform` is marked
      protected. Set `protected: true` on any others.

## Not yet built
- [ ] Contact section. The nav links to `/#contact`, which does not exist yet.
- [ ] Resume PDF, if you want it linked.
- [ ] Real images for every plate and image slot. Sense Chatbot, Sense Messaging and Sense Chatbot 2.0 are done; the other seven still show empty slots.

## Unlisted case studies
One study lives outside the source as an encrypted file in `private/hidden/`,
with its imagery in `private/work/<slug>/`. See "Unlisted case studies" in the
README for how to edit it. Its open items are kept off this public list.

## `content/work/fountain-hire-go.ts`
Written from the September 2026 write-up. No imagery yet. Slots, by the
write-up's own priority, to add as `image` blocks in the sections named:

Must have
- [ ] Visual 1, hero: the flow builder with the locked default row, desktop (Overview)
- [ ] Visual 12, second hero: Cue's proposed-configuration card beside the resulting flow in the builder, inferred items marked (Designing for an agent)
- [ ] Visuals 8 and 9: question row, four tags to two; question editor with and without the required toggle (A weekly loop)

Should have
- [ ] Visual 6: the description field, and the flow settings panel with the single instruction field (Decision 3)
- [ ] Visual 7: a Claude Design prototype screen or short capture, captioned with the week and what the customer call changed (A weekly loop)
- [ ] Visuals 11 and 11b: the account settings page, desktop beside mobile, with two or three mobile rules annotated (settings home, mobile standard)
- [ ] Visual 13: manager activation in Cue on mobile, the collected-values summary before confirm (Chat for intake)

Nice to have
- [ ] Visual 3: cross-prompt diff as a table (pay, hours, cap, gate, custom questions by variant); needs the cell values
- [ ] Visual 4: default row action menu (reuse Visual 1 if tight)
- [ ] Visual 5: view-only conditional with the banner
- [ ] Visual 10: per-question instruction field to flow-level instruction (reuse Visual 6 if tight)

The before/after diagram (Visual 2) is built as a `flow` block, not an image.

Open questions from the write-up, for Toni
- [ ] Reflection: the "What I got wrong going in" section is the write-up's best
      guess at a reversal. Confirm it is true, or replace it with the belief you
      actually held at the start.
- [ ] Optional: one thing a Claude Design prototype revealed on a customer call
      that a static frame would not have (A weekly loop).
- [ ] Reading check: the page says most Hire Go users do *not* have access to
      Fountain Hire. Confirm that is the right way round.

## `content/work/medal-annotations.ts`
Written from the 2026 write-up. No imagery yet. The write-up names three
Figma frames; the Sketch sources are in `~/Documents/Medal 2019`.

- [ ] Decision 1: the post-it changelog exploration and the final versioning flow
- [ ] Decision 2: the Manage Annotations flow and label creation with live preview
- [ ] Decision 3: hotkey explorations and the final color-coded menu
- [ ] A hero: the annotation view with the categorized menu open
- [ ] Screens must show no real patient data (HIPAA); use the demo records only.
