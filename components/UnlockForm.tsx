'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UnlockForm({ slug }: { slug: string }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [shake, setShake] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/unlock', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ password, slug }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        router.push(data.next as string);
        router.refresh();
        return;
      }
      setError(data.error ?? 'That password did not match.');
      setShake((n) => n + 1);
      input.current?.focus();
    } catch {
      setError('Something went wrong. Try again.');
      setShake((n) => n + 1);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      key={shake}
      className="mt-8"
      style={error ? { animation: 'shake 380ms ease' } : undefined}
    >
      <label htmlFor="unlock-password" className="label-sc">Password</label>
      <input
        ref={input}
        id="unlock-password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="off"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'unlock-error' : undefined}
        className="mt-2 w-full rounded-lg border border-hair bg-paper-2 px-3.5 py-2.5 text-[0.9375rem] outline-none focus-visible:border-accent"
      />
      {error && (
        <p id="unlock-error" role="alert" className="mt-2.5 text-[0.8125rem] text-accent">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={busy || !password}
        className="mt-5 rounded-full bg-ink px-5 py-2.5 text-[0.875rem] font-medium text-paper transition-opacity disabled:opacity-40"
      >
        {busy ? 'Checking…' : 'Unlock'}
      </button>
    </form>
  );
}
