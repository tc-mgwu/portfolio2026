# Toni Chen — portfolio

Next.js (App Router) + TypeScript + Tailwind. Static where possible, with
middleware guarding the password-protected case studies.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build, run this before deploying
```

## Where the content lives

Nothing user-facing is written inside a component. Everything is in `content/`.

| File | What it holds |
| --- | --- |
| `content/home.ts` | Hero statement lines, subline, current role |
| `content/about.ts` | About page: statement, bio, experience, skills, education, certificates |
| `content/collections.ts` | The three groupings and their descriptions |
| `content/work/<slug>.ts` | One file per case study |
| `content/index.ts` | Which case studies exist, their order, and which three are featured on the home page |

### Adding a case study

1. Copy any file in `content/work/` and rename it.
2. Set `slug` (this becomes `/work/<slug>`), `collection`, `year`, `company`,
   `monogram`, `title`, and the copy.
3. Import it in `content/index.ts` and add it to `caseStudies`, newest first
   within its collection.

That is the whole job. The collection cards, their project counts, the gallery
pages, the prev/next links and the static routes all derive from that array.

### The hero statement

`content/home.ts` holds it as an array of lines, because each line reveals
behind its own mask wipe. Mark a word `em: true` to set it in the accent italic.

## Password protection

Protected case studies are gated in `middleware.ts`, not hidden in the client.
Without a valid cookie the request is rewritten to the unlock page and the
protected HTML is never produced.

**To protect a case study:** set `protected: true` in its content file.

**To set the password:** two environment variables, both required.

| Variable | Purpose |
| --- | --- |
| `CASE_PASSWORD` | The shared password for every protected case study |
| `SITE_SECRET` | Signs the unlock cookie. Use a long random string. |

Locally these live in `.env.local`, which is gitignored. In Vercel, set them
under Settings → Environment Variables for Production, Preview and Development.
**If `SITE_SECRET` is missing the gate throws**, so set it before the first
deploy.

Per-project passwords need no code change: set `CASE_PASSWORD_<SLUG>`, with the
slug uppercased and dashes as underscores, e.g. `CASE_PASSWORD_EDUTECH_PLATFORM`.
That project then uses its own password and its own cookie scope.

## Deploying

Vercel, zero configuration beyond the two environment variables above.
`vercel.json` is already in the repo.

1. Push to GitHub.
2. In Vercel, New Project → import the repository.
3. Add `CASE_PASSWORD` and `SITE_SECRET` before the first build.
4. Deploy.

## Images

Every image is a coded placeholder right now. `components/PlateArt.tsx` draws
them, and each case study declares a `tint` gradient pair for the plate behind
it. Replacing a placeholder with a real screenshot means swapping `PlateArt` for
an `Image`, keeping the same `heroAspect` so nothing shifts.

## Notes

- `next dev` generates `AGENTS.md` and `CLAUDE.md`. They are not part of the site.
- Next 16 has renamed middleware to proxy. The current file still works; the
  migration is `npx @next/codemod@canary middleware-to-proxy .`
