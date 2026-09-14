'use client';

import { useState } from 'react';

/* Name, email, message. Posts to /api/contact, which relays the message to
   the inbox. On failure the form keeps what was typed and offers the email
   address, so nothing is lost. */

type State = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState('sending');
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setState('sent');
        form.reset();
        return;
      }
      setError(json.error ?? 'Sending failed.');
      setState('error');
    } catch {
      setError('Sending failed.');
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div role="status" className="rounded-xl border border-hair bg-paper-2/60 p-6">
        <p className="font-display text-[1.25rem] leading-snug text-ink">Thanks, it&rsquo;s on its way.</p>
        <p className="mt-2 text-[0.9375rem] text-ink-2">I read everything and reply within a couple of days.</p>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="mt-4 text-[0.875rem] text-ink-3 underline underline-offset-4 hover:text-ink"
        >
          Send another
        </button>
      </div>
    );
  }

  const field =
    'mt-2 w-full rounded-lg border border-hair bg-paper-2 px-3.5 py-2.5 text-[0.9375rem] text-ink outline-none transition-colors focus-visible:border-accent';

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="label-sc">Name</span>
          <input name="name" type="text" required autoComplete="name" maxLength={120} className={field} />
        </label>
        <label className="block">
          <span className="label-sc">Email</span>
          <input name="email" type="email" required autoComplete="email" maxLength={200} className={field} />
        </label>
      </div>
      <label className="block">
        <span className="label-sc">Message</span>
        <textarea name="message" required rows={5} maxLength={4000} className={`${field} resize-y`} />
      </label>
      {/* Honeypot: hidden from people, filled by bots. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {error && (
        <p role="alert" className="text-[0.875rem] text-accent">
          {error}{' '}
          <a href={`mailto:${fallbackEmail}`} className="underline underline-offset-4">
            Email me instead
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.875rem] font-medium text-paper transition-opacity hover:opacity-85 disabled:opacity-60"
      >
        {state === 'sending' ? 'Sending…' : 'Send message'}
        {state !== 'sending' && <span aria-hidden="true">&rarr;</span>}
      </button>
    </form>
  );
}
