/* Password gating for NDA case studies.

   The cookie holds an HMAC of a scope string, not the password, so the secret
   never leaves the server and the cookie cannot be forged without SITE_SECRET.
   Everything here uses Web Crypto so it runs in middleware on the edge. */

export const UNLOCK_COOKIE = 'cs_unlock';
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/** One shared password today. Per-project passwords need only this lookup. */
export function passwordFor(slug: string): string | undefined {
  const perProject = process.env[`CASE_PASSWORD_${slug.toUpperCase().replace(/-/g, '_')}`];
  return perProject ?? process.env.CASE_PASSWORD;
}

/** Scope lets a future cookie unlock one slug instead of everything. */
export function scopeFor(slug: string): string {
  return process.env[`CASE_PASSWORD_${slug.toUpperCase().replace(/-/g, '_')}`] ? slug : 'all';
}

function secret(): string {
  const s = process.env.SITE_SECRET;
  if (!s) throw new Error('SITE_SECRET is not set');
  return s;
}

function toBase64Url(bytes: ArrayBuffer): string {
  const bin = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function signScope(scope: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(scope));
  return `${scope}.${toBase64Url(sig)}`;
}

/** Constant-time comparison, so a wrong token cannot be probed byte by byte. */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** True when this slug has its own password, which is then the only key to it. */
export function hasOwnPassword(slug: string): boolean {
  return Boolean(process.env[`CASE_PASSWORD_${slug.toUpperCase().replace(/-/g, '_')}`]);
}

export async function tokenUnlocks(token: string | undefined, slug: string): Promise<boolean> {
  if (!token) return false;
  const scopes = hasOwnPassword(slug) ? [slug] : ['all'];
  for (const scope of scopes) {
    const expected = await signScope(scope);
    if (safeEqual(token, expected)) return true;
  }
  return false;
}
