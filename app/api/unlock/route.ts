import { NextResponse } from 'next/server';
import { COOKIE_MAX_AGE, UNLOCK_COOKIE, passwordFor, safeEqual, scopeFor, signScope } from '@/lib/auth';
import { caseStudies } from '@/content';

export async function POST(req: Request) {
  let body: { password?: string; slug?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const slug = typeof body.slug === 'string' ? body.slug : '';
  const password = typeof body.password === 'string' ? body.password : '';
  if (!caseStudies.some((c) => c.slug === slug)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const expected = passwordFor(slug);
  if (!expected || !safeEqual(password, expected)) {
    // One generic message; never say whether the slug or the password was wrong.
    return NextResponse.json({ ok: false, error: 'That password did not match.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true, next: `/work/${slug}` });
  res.cookies.set({
    name: UNLOCK_COOKIE,
    value: await signScope(scopeFor(slug)),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  });
  return res;
}
