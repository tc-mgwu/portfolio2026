'use client';

import { useState } from 'react';
import { useUnlock } from './Unlock';
import { LockGlyph } from './CursorPill';
import { RESUME_PATH, RESUME_SLUG } from '@/lib/resume';

/* Downloads the resume if the unlock cookie is already held; otherwise opens
   the password dialog, which hands the browser the file on success. The
   cookie is httpOnly, so the only way to know is to ask the route. */

export default function ResumeButton() {
  const { open } = useUnlock();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    setBusy(true);
    try {
      const res = await fetch(RESUME_PATH, { method: 'HEAD', credentials: 'same-origin', cache: 'no-store' });
      if (res.ok) {
        window.location.assign(RESUME_PATH);
        return;
      }
    } catch {
      /* fall through to the dialog */
    } finally {
      setBusy(false);
    }
    open({ slug: RESUME_SLUG, title: 'Resume' });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[0.8125rem] font-medium text-paper transition-opacity hover:opacity-85 disabled:opacity-60"
    >
      <LockGlyph className="h-3 w-2.5" />
      Download resume
    </button>
  );
}
