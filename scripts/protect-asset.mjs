#!/usr/bin/env node
/* Encrypt an image for the password gate.

     node scripts/protect-asset.mjs <slug> <file> [<file> ...]

   Writes private/work/<slug>/<name>.enc using ASSET_KEY from .env.local, and
   deletes nothing. Then make the public, unreadable preview yourself, from the
   original, at 96px wide:

     sips -Z 96 original.png --out public/work/<slug>/<name>-redacted.png

   and point the content at both: `src` for the preview, `protectedSrc` for
   /api/asset/<slug>/<name>. Keep the original out of the repository. */
import { createCipheriv, randomBytes } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const [slug, ...files] = process.argv.slice(2);
if (!slug || !files.length) {
  console.error('usage: node scripts/protect-asset.mjs <slug> <file> [...]');
  process.exit(1);
}

let key = process.env.ASSET_KEY;
if (!key && existsSync('.env.local')) {
  const m = readFileSync('.env.local', 'utf8').match(/^ASSET_KEY=(.+)$/m);
  if (m) key = m[1].trim();
}
if (!key) { console.error('ASSET_KEY not set (env or .env.local)'); process.exit(1); }
const k = Buffer.from(key, 'base64');

const dir = path.join('private', 'work', slug);
mkdirSync(dir, { recursive: true });
for (const f of files) {
  const iv = randomBytes(12);
  const c = createCipheriv('aes-256-gcm', k, iv);
  const ct = Buffer.concat([c.update(readFileSync(f)), c.final()]);
  const out = path.join(dir, path.basename(f) + '.enc');
  writeFileSync(out, Buffer.concat([iv, c.getAuthTag(), ct]));
  console.log(`${f} -> ${out}`);
}
