import { NextResponse } from 'next/server';

/* Relays the contact form to the inbox through Resend's REST API. Nothing
   is stored. The recipient and the API key come from the environment, so
   neither appears in the source; without a key the route answers 503 and the
   form falls back to a plain mailto link. */

const TO = process.env.CONTACT_TO ?? 'itonichen@gmail.com';
const FROM = process.env.CONTACT_FROM ?? 'Portfolio <onboarding@resend.dev>';

const LIMITS = { name: 120, email: 200, message: 4000 };

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request.' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const message = String(body.message ?? '').trim();
  const honeypot = String(body.website ?? '');

  // Bots fill the hidden field; people never see it. Pretend it worked.
  if (honeypot) return NextResponse.json({ ok: true });

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: 'Please fill in every field.' }, { status: 400 });
  }
  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return NextResponse.json({ ok: false, error: 'That message is too long.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'That email address does not look right.' }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json({ ok: false, error: 'Sending is not set up yet.' }, { status: 503 });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `Portfolio inquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}\n`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, error: 'Sending failed. Try again, or email me directly.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
