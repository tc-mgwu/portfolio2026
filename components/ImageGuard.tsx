"use client";

import { useEffect } from "react";

/* Discourages saving case study imagery: no context menu, drag or copy on
   anything inside a .guarded region, and .guarded img in globals.css turns
   off selection, drag and the long-press sheet on touch.

   This is friction, not protection. A browser can only show what it has
   downloaded, so anyone determined can still take a screenshot or read the
   network log. Confidential pictures rely on the password gate instead. */
export default function ImageGuard() {
  useEffect(() => {
    const inGuarded = (e: Event) =>
      (e.target as Element | null)?.closest?.(".guarded");
    const block = (e: Event) => {
      if (inGuarded(e)) e.preventDefault();
    };
    document.addEventListener("contextmenu", block);
    document.addEventListener("dragstart", block);
    document.addEventListener("copy", block);
    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("dragstart", block);
      document.removeEventListener("copy", block);
    };
  }, []);
  return null;
}
