import 'server-only';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { CaseStudy } from '@/lib/types';
import { decryptAsset } from '@/lib/assets';

/* Unlisted case studies. Nothing about them lives in the source: not the
   slug, not the copy, not the imagery. Each is an encrypted JSON file in
   /private/hidden/<slug>.json.enc, decrypted with ASSET_KEY when a request
   that already passed the password gate asks for it. The slug is random and
   appears in no list, sitemap, neighbour link or static build. */

const SLUG = /^[a-z0-9][a-z0-9-]{2,60}$/;

export async function loadHiddenStudy(slug: string): Promise<CaseStudy | undefined> {
  if (!SLUG.test(slug)) return undefined;
  try {
    const enc = await readFile(path.join(process.cwd(), 'private', 'hidden', `${slug}.json.enc`));
    return JSON.parse(decryptAsset(enc).toString('utf8')) as CaseStudy;
  } catch {
    return undefined;
  }
}
