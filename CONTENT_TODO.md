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

**Written so far:** Sense Chatbot, Sense Messaging, Sense Chatbot 2.0 and
one unlisted study. Use them as the model. The other six are
flagged `comingSoon: true` and show a coming-soon page until written; drop the
flag when each is done. Each needs:

- [ ] `summary` — one line, shown on the collection cards
- [ ] `projectType` and `role`
- [ ] `facts` — Timeline, Team, Impact, shown as the strip under the title
- [ ] `details` — Role, Team, Timeline, Tools, shown on the case study page
- [ ] `brief` — the five blocks: Background, Project context, The problem, The solution, The outcome
- [ ] `sections` — the long-form body: Overview, Problem, Process, Solution, Outcome
- [ ] `heroAlt` (read out for the hero on the home page and in galleries), plus alt text and captions on every image block. `heroCaption` is kept in the content files but no longer shown: the case study page no longer repeats the hero.

Files: `fountain-referrals`, `medal-annotations`, `orion-command`,
`fountain-hire-go`, `edutech-platform`,
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
