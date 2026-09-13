import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { cookies } from 'next/headers';
import { UNLOCK_COOKIE, tokenUnlocks } from '@/lib/auth';
import { ASSET_TYPES, decryptAsset } from '@/lib/assets';

/* Serves a redacted asset to a request that holds the unlock cookie for the
   case study it belongs to. The path is /api/asset/<slug>/<file>; the file is
   read from /private/work/<slug>/<file>.enc and decrypted on the way out.
   Anyone else gets 401 and nothing. */

const SEGMENT = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: parts } = await params;
  if (!parts || parts.length < 2 || parts.some((p) => !SEGMENT.test(p) || p.includes('..'))) {
    return new Response(null, { status: 404 });
  }

  const [slug] = parts;
  const token = (await cookies()).get(UNLOCK_COOKIE)?.value;
  if (!(await tokenUnlocks(token, slug))) {
    return new Response(null, { status: 401, headers: { 'cache-control': 'no-store' } });
  }

  const type = ASSET_TYPES[path.extname(parts[parts.length - 1]).toLowerCase()];
  if (!type) return new Response(null, { status: 404 });

  let encrypted: Buffer;
  try {
    encrypted = await readFile(path.join(process.cwd(), 'private', 'work', ...parts) + '.enc');
  } catch {
    return new Response(null, { status: 404 });
  }

  return new Response(new Uint8Array(decryptAsset(encrypted)), {
    headers: {
      'content-type': type,
      'cache-control': 'private, no-store',
      'x-content-type-options': 'nosniff',
    },
  });
}
