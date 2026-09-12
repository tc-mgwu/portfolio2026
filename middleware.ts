import { NextResponse, type NextRequest } from 'next/server';
import { UNLOCK_COOKIE, tokenUnlocks } from '@/lib/auth';
import { protectedSlugs } from '@/content';

/* Protected case studies never reach the client without a valid cookie. The
   request is rewritten to the unlock page, so the URL is preserved and the
   protected HTML is never produced. */

export async function middleware(req: NextRequest) {
  const slug = req.nextUrl.pathname.split('/')[2];
  if (!slug || !protectedSlugs.includes(slug)) return NextResponse.next();

  const token = req.cookies.get(UNLOCK_COOKIE)?.value;
  if (await tokenUnlocks(token, slug)) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = '/unlock';
  url.searchParams.set('next', `/work/${slug}`);
  return NextResponse.rewrite(url);
}

export const config = { matcher: '/work/:slug' };
