"use client";

import { useEffect, useState } from "react";
import { useUnlock } from "./Unlock";
import { LockGlyph } from "./CursorPill";
import DataTable, { type Cell } from "./DataTable";

/* A figures table whose values are confidential. The labels ship with the
   page; the numbers live in an encrypted JSON file behind the asset route and
   are fetched once the unlock cookie exists. Until then the cells are blurred
   placeholders and one button opens the password dialog. */

export default function ProtectedTable({
  columns,
  rows,
  protectedSrc,
  slug,
  title,
}: {
  columns: string[];
  rows: string[];
  protectedSrc: string;
  slug: string;
  title: string;
}) {
  const { open, unlocks } = useUnlock();
  const [values, setValues] = useState<Cell[][] | null>(null);

  useEffect(() => {
    let live = true;
    fetch(protectedSrc, { credentials: "same-origin", cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (live && data && Array.isArray(data.values)) setValues(data.values);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [protectedSrc, unlocks]);

  if (values) return <DataTable columns={columns} rows={rows} values={values} />;

  return (
    <div className="relative">
      <DataTable columns={columns} rows={rows} placeholder />
      <div className="absolute inset-0 grid place-items-center">
        <button
          type="button"
          onClick={() => open({ slug, title, redacted: true })}
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper/90 px-4 py-2 text-[0.8125rem] font-medium text-ink shadow-[0_8px_24px_-8px_rgba(26,23,20,0.35)] backdrop-blur transition-colors hover:border-ink hover:bg-ink hover:text-paper"
        >
          <LockGlyph className="h-3.5 w-3" />
          Unlock to view
        </button>
      </div>
    </div>
  );
}
