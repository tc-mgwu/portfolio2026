'use client';

import {
  createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { LockGlyph } from './CursorPill';

interface Target { slug: string; title: string; redacted?: boolean }

/* `unlocks` counts successful unlocks this session, so anything showing a
   redacted asset can try again the moment the cookie exists. */
const Ctx = createContext<{ open: (t: Target) => void; unlocks: number }>({
  open: () => {},
  unlocks: 0,
});
export const useUnlock = () => useContext(Ctx);

export function UnlockProvider({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<Target | null>(null);
  const [unlocks, setUnlocks] = useState(0);
  const open = useCallback((t: Target) => setTarget(t), []);
  const value = useMemo(() => ({ open, unlocks }), [open, unlocks]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {target && (
        <UnlockModal
          target={target}
          onClose={() => setTarget(null)}
          onUnlocked={() => setUnlocks((n) => n + 1)}
        />
      )}
    </Ctx.Provider>
  );
}

function UnlockModal({
  target,
  onClose,
  onUnlocked,
}: {
  target: Target;
  onClose: () => void;
  onUnlocked: () => void;
}) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [shake, setShake] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    input.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  // Keep focus inside the dialog while it is open.
  function trap(e: React.KeyboardEvent) {
    if (e.key !== 'Tab' || !panel.current) return;
    const focusable = panel.current.querySelectorAll<HTMLElement>(
      'button, input, [href], [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/unlock', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ password, slug: target.slug }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        // The provider lives in the root layout and survives navigation, so the
        // modal has to be dismissed explicitly or it stays over the unlocked
        // page. refresh() drops any router-cache entry captured while locked.
        onUnlocked();
        const next = data.next as string;
        if (next.startsWith('/api/')) {
          // A gated file: hand the browser the URL so it downloads.
          window.location.assign(next);
        } else if (window.location.pathname !== next) {
          router.push(next);
        }
        router.refresh();
        onClose();
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
    <div className="fixed inset-0 z-[60] grid place-items-center p-6">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/35 backdrop-blur-[3px]"
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={trap}
        key={shake}
        className="relative w-full max-w-[27rem] rounded-2xl border border-hair bg-paper p-7 shadow-[0_24px_70px_-20px_rgba(26,23,20,0.45)] motion-safe:animate-[pill-in_180ms_cubic-bezier(0.22,1,0.36,1)]"
        style={error ? { animation: 'shake 380ms ease' } : undefined}
      >
        <div className="flex items-center gap-2 text-accent">
          <LockGlyph className="h-4 w-3.5" />
          <p className="label-sc text-accent">Protected</p>
        </div>

        <h2 id={titleId} className="mt-3 font-display text-[1.5rem] leading-tight">
          {target.title}
        </h2>

        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
          {target.redacted ? 'These details are confidential.' : target.slug === 'resume' ? 'The resume is shared on request.' : 'This work is under NDA.'}{' '}
          Enter the password from my resume, or{' '}
          <a href="/about#contact" onClick={onClose} className="text-accent underline underline-offset-4">
            email me for access
          </a>.
        </p>

        <form onSubmit={submit} className="mt-6">
          <label htmlFor="cs-password" className="label-sc">Password</label>
          <input
            ref={input}
            id="cs-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'cs-password-error' : undefined}
            className="mt-2 w-full rounded-lg border border-hair bg-paper-2 px-3.5 py-2.5 text-[0.9375rem] outline-none focus-visible:border-accent"
          />

          {error && (
            <p id="cs-password-error" role="alert" className="mt-2.5 text-[0.8125rem] text-accent">
              {error}
            </p>
          )}

          <div className="mt-5 flex items-center gap-3">
            <button
              type="submit"
              disabled={busy || !password}
              className="rounded-full bg-ink px-5 py-2.5 text-[0.875rem] font-medium text-paper transition-opacity disabled:opacity-40"
            >
              {busy ? 'Checking…' : 'Unlock'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-[0.875rem] text-ink-3 transition-colors hover:text-ink"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
