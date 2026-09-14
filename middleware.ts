import { NextResponse, type NextRequest } from 'next/server';
import { UNLOCK_COOKIE, hasOwnPassword, tokenUnlocks } from '@/lib/auth';
import { caseStudies, protectedSlugs } from '@/content';

/* Protected case studies never reach the client without a valid cookie. The
   request is rewritten to the unlock page, so the URL is preserved and the
   protected HTML is never produced.

   Slugs that are not in the public list are treated the same way: they are
   either unlisted studies from the encrypted store or nothing at all, and
   the response says so to no one. Those responses also carry a no-index
   header, so a crawler that reaches the URL is told to forget it. */

const NOINDEX = 'noindex, nofollow, noarchive, nosnippet';

export async function middleware(req: NextRequest) {
  const [, base, slug] = req.nextUrl.pathname.split('/');
  if (!slug) return NextResponse.next();
  /* /secretwork holds only unlisted studies; nothing there is ever public. */
  const listed = base === 'work' && caseStudies.some((c) => c.slug === slug);
  if (listed && !protectedSlugs.includes(slug)) return NextResponse.next();

  const token = req.cookies.get(UNLOCK_COOKIE)?.value;
  let res: NextResponse;
  /* An unlisted slug opens only with its own password. With none configured
     it stays shut, so a deploy that lands before the env var does is safe. */
  const openable = listed || hasOwnPassword(slug);
  if (openable && (await tokenUnlocks(token, slug))) {
    res = NextResponse.next();
  } else {
    const url = req.nextUrl.clone();
    url.pathname = '/unlock';
    url.searchParams.set('next', `/${base}/${slug}`);
    res = NextResponse.rewrite(url);
  }
  if (!listed) res.headers.set('X-Robots-Tag', NOINDEX);
  return res;
}

export const config = { matcher: ['/work/:slug', '/secretwork/:slug'] };
