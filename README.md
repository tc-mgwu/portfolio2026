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
3. Add `CASE_PASSWORD`, `SITE_SECRET` and `ASSET_KEY` before the first build. `ASSET_KEY` must be the same value used locally to encrypt redacted assets (see below).
4. Deploy.

## Images

**In case study bodies.** An `image` block takes a `src` under `/public`, its
`aspect` (width / height of the file), `alt`, and a `caption`. Leave `src` off
and the slot is drawn empty at that ratio, so a page can be laid out before the
imagery exists. Two more blocks help with process work: `gallery` shows two or
three pictures side by side for comparing options, `links` renders a row of
external references such as Figma files, and `callout` is a banner that points
to related work (Chatbot 1.0 and 2.0 point at each other this way). Put files in
`public/work/<slug>/` at their original resolution: the page serves a sized
copy through the image optimiser, and the lightbox opens the full file. Keep
vector sources as SVG (run them through `npx svgo --multipass` first; they
halve). GIFs and SVGs are served as-is, since the optimiser would flatten a GIF
to one frame and has nothing to add to a vector. Per picture, `lightbox: false`
turns off click-to-zoom, `bare: true` drops the frame for a transparent
composite, and `href` makes the picture link out (a "View in Figma" badge
appears on hover in place of the lightbox). A section can carry a `subtitle`, one italic line under its heading for the
section's thesis. A before/after of a workflow goes in a `flow` block (rows of steps,
the last row drawn as the present). Dated events go in a `timeline` block
(`date` as "Jun 14, 2020", `title`, optional `text`), drawn along a rail. Figures go in a `table` block
rather than a chart screenshot: `columns`, `rows` (the row labels) and
`values`, one array per row. `content/work/sense-chatbot.ts` is a complete example. A study that is not
written yet carries `comingSoon: true`: its cards say "Case study coming
soon", the button reads "Coming soon", and its page shows a short note with
links onward instead of the body. Remove the flag when the write-up lands.

**Redacted images.** For a picture that only password holders may see, the
repository (which is public) never contains the original in the clear. Run

```bash
node scripts/protect-asset.mjs <slug> path/to/original.png
```

to write `private/work/<slug>/original.png.enc`, encrypted with `ASSET_KEY`
from `.env.local`. Then make the public preview from the original at 96px
wide, which keeps the shape and colour and none of the text:

Confidential figures work the same way: write `{ "values": [[...], ...] }` to
a JSON file, encrypt it with the script above, and give the `table` block a
`protectedSrc` of `/api/asset/<slug>/<name>.json` instead of `values`. The
labels ship with the page; the numbers stay blurred until the password is
entered.

```bash
sips -Z 96 path/to/original.png --out public/work/<slug>/original-redacted.png
```

In the content, set `src` to the preview and `protectedSrc` to
`/api/asset/<slug>/original.png`. The page shows the preview blurred with an
"Unlock to view" button; the asset route serves the decrypted original only to
a request carrying the unlock cookie for that slug, and never caches it. Keep
the original itself out of the repository. Sense Chatbot's two usage charts
work this way.

**Hero plates.** The home page and gallery heroes are still coded placeholders.
`components/PlateArt.tsx` draws them, and each case study declares a `tint`
pair for the circle behind. Replacing one with a real screenshot means swapping
`PlateArt` for an `Image` in `components/ProjectPlate.tsx`, keeping the same
`heroAspect` so nothing shifts.

## Notes

- `next dev` generates `AGENTS.md` and `CLAUDE.md`. They are not part of the site.
- Next 16 has renamed middleware to proxy. The current file still works; the
  migration is `npx @next/codemod@canary middleware-to-proxy .`
