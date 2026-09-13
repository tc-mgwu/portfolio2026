"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Picture } from "@/lib/types";

/* Click a picture in a case study to see it large.

   `Zoomable` wraps a frame and makes it the opener. Give it the pictures it
   sits among (a gallery's items) and the lightbox steps through them with
   the arrow keys. A frame with nothing to show, or one still locked, passes
   its children through untouched. Focus returns to the opener on close. */

export function Zoomable({
  picture,
  group,
  index = 0,
  disabled = false,
  children,
}: {
  picture: Picture;
  group?: Picture[];
  index?: number;
  disabled?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(index);
  const opener = useRef<HTMLDivElement>(null);

  if (!picture.src || disabled || picture.lightbox === false)
    return <>{children}</>;

  const items = group ?? [picture];
  const show = () => {
    setCurrent(index);
    setOpen(true);
  };

  return (
    <>
      {/* A div with the button role rather than a <button>: the frame inside is
          block content, which a button element may not contain. */}
      <div
        ref={opener}
        role="button"
        tabIndex={0}
        aria-label={`View larger: ${picture.alt}`}
        onClick={show}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            show();
          }
        }}
        className="group/zoom relative cursor-pointer rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        {/* The frame lifts a little on hover, and a label appears in the
            corner, so the affordance is visible and not only in the cursor. */}
        <div className="rounded-xl transition-[transform,box-shadow] duration-300 ease-out group-hover/zoom:-translate-y-0.5 group-hover/zoom:shadow-[0_18px_40px_-18px_rgba(26,23,20,0.35)] group-focus-visible/zoom:-translate-y-0.5">
          {children}
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[rgba(20,17,14,0.78)] px-2.5 py-1.5 text-[0.6875rem] font-medium text-[#FAF8F5] opacity-0 backdrop-blur transition-opacity duration-200 group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100"
        >
          <svg
            viewBox="0 0 12 12"
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 1h4v4M11 1 6.5 5.5M5 11H1V7M1 11l4.5-4.5" />
          </svg>
          Expand
        </span>
      </div>
      {open && (
        <Lightbox
          items={items}
          index={current}
          onStep={setCurrent}
          onClose={() => {
            setOpen(false);
            opener.current?.focus();
          }}
        />
      )}
    </>
  );
}

/* The overlay itself. Colours are literal: it sits over both themes and
   should read the same in each, dark glass with light type.

   The picture opens at fit. Click it to zoom in on that spot; click again to
   return to fit. The buttons, the + − 0 keys, the wheel and a two-finger
   pinch also zoom, up to 5×, and past fit the picture pans by dragging.
   Stepping to another picture resets the view. */

const MIN = 1;
const MAX = 5;
const STEP = 1.5;

function Lightbox({
  items,
  index,
  onStep,
  onClose,
}: {
  items: Picture[];
  index: number;
  onStep: (i: number) => void;
  onClose: () => void;
}) {
  const pic = items[index];
  const many = items.length > 1;
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const captionId = useId();

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  /* Live pointer bookkeeping stays out of state: it changes every frame. */
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{
    start: { x: number; y: number };
    offset: { x: number; y: number };
    dist: number;
    scale: number;
    moved: boolean;
  } | null>(null);
  const stage = useRef<HTMLDivElement>(null);

  /* Zoom so that the point under the cursor stays put. With the transform
     about the centre, a point p from the centre lands at p·s, so the offset
     that holds it still is p·(1 − s). */
  const zoomAt = useCallback(
    (next: number, clientX: number, clientY: number) => {
      const s = Math.min(MAX, Math.max(MIN, next));
      const r = stage.current?.getBoundingClientRect();
      if (!r || s === MIN) {
        setScale(s);
        setOffset({ x: 0, y: 0 });
        return;
      }
      const px = clientX - (r.left + r.width / 2);
      const py = clientY - (r.top + r.height / 2);
      setScale(s);
      setOffset({ x: px * (1 - s), y: py * (1 - s) });
    },
    [],
  );

  const zoomTo = useCallback((next: number) => {
    const s = Math.min(MAX, Math.max(MIN, next));
    setScale(s);
    if (s === MIN) setOffset({ x: 0, y: 0 });
  }, []);
  const reset = useCallback(() => zoomTo(MIN), [zoomTo]);
  const step = useCallback(
    (i: number) => {
      reset();
      onStep(i);
    },
    [onStep, reset],
  );

  useEffect(() => {
    closeBtn.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "+" || e.key === "=") zoomTo(scale * STEP);
      else if (e.key === "-" || e.key === "_") zoomTo(scale / STEP);
      else if (e.key === "0") reset();
      else if (many && e.key === "ArrowRight") step((index + 1) % items.length);
      else if (many && e.key === "ArrowLeft")
        step((index - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, items.length, many, onClose, reset, scale, step, zoomTo]);

  /* Keep Tab inside the dialog while it is open. */
  function trap(e: React.KeyboardEvent) {
    if (e.key !== "Tab" || !panel.current) return;
    const focusable = panel.current.querySelectorAll<HTMLElement>(
      "button:not([disabled])",
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    zoomAt(scale * (e.deltaY < 0 ? 1.1 : 1 / 1.1), e.clientX, e.clientY);
  }

  function onPointerDown(e: React.PointerEvent) {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...pointers.current.values()];
    if (pts.length === 2) {
      gesture.current = {
        start: { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 },
        offset,
        dist: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y),
        scale,
        moved: true,
      };
    } else {
      gesture.current = { start: pts[0], offset, dist: 0, scale, moved: false };
    }
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!pointers.current.has(e.pointerId) || !gesture.current) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...pointers.current.values()];
    const g = gesture.current;
    if (pts.length === 2 && g.dist) {
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      zoomTo(g.scale * (dist / g.dist));
    } else if (pts.length === 1 && scale > MIN) {
      const dx = pts[0].x - g.start.x;
      const dy = pts[0].y - g.start.y;
      if (!g.moved && Math.hypot(dx, dy) < 4) return;
      g.moved = true;
      setDragging(true);
      setOffset({ x: g.offset.x + dx, y: g.offset.y + dy });
    }
  }

  function onPointerUp(e: React.PointerEvent) {
    const g = gesture.current;
    const wasClick = g && !g.moved && pointers.current.size === 1;
    pointers.current.delete(e.pointerId);
    if (pointers.current.size === 0) {
      gesture.current = null;
      setDragging(false);
    }
    /* A press with no drag is a click: zoom in on that spot, or back to fit. */
    if (wasClick) {
      if (scale > MIN) reset();
      else zoomAt(2.2, e.clientX, e.clientY);
    }
  }

  const control =
    "grid h-11 w-11 place-items-center rounded-full bg-white/10 text-[#FAF8F5] transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF8F5] disabled:opacity-30 disabled:hover:bg-white/10";

  return (
    <div
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-describedby={captionId}
      onKeyDown={trap}
      className="guarded fixed inset-0 z-[70] flex flex-col items-center justify-center p-4 sm:p-10"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-zoom-out bg-[rgba(20,17,14,0.9)] backdrop-blur-sm"
      />

      <figure className="relative m-0 flex max-h-full max-w-full flex-col items-center gap-4 motion-safe:animate-[pill-in_200ms_cubic-bezier(0.22,1,0.36,1)]">
        {/* The stage takes the gestures; the picture inside cannot be
            dragged, selected or right-clicked (see .guarded). */}
        <div
          ref={stage}
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={`touch-none overflow-hidden rounded-lg ${
            scale > MIN
              ? dragging
                ? "cursor-grabbing"
                : "cursor-grab"
              : "cursor-zoom-in"
          }`}
        >
          {/* Plain <img>: the source is already the full-size file, and for a
              redacted picture it is our own asset route. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={pic.src}
            src={pic.src}
            alt={pic.alt}
            draggable={false}
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
              transition: dragging ? "none" : "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            className="max-h-[76vh] max-w-[92vw] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] sm:max-w-[86vw]"
          />
        </div>
        <figcaption
          id={captionId}
          className="max-w-[72ch] text-center text-[0.8125rem] leading-relaxed text-[#FAF8F5]/80"
        >
          {pic.caption ?? pic.alt}
          {many && (
            <span className="ml-3 tabular-nums text-[#FAF8F5]/50">
              {index + 1} / {items.length}
            </span>
          )}
        </figcaption>
      </figure>

      {/* Zoom controls */}
      <div
        role="group"
        aria-label="Zoom"
        className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white/10 p-1 backdrop-blur sm:bottom-6"
      >
        <button
          type="button"
          onClick={() => zoomTo(scale / STEP)}
          disabled={scale <= MIN}
          aria-label="Zoom out"
          className={`${control} h-10 w-10 text-lg leading-none`}
        >
          &minus;
        </button>
        <button
          type="button"
          onClick={reset}
          disabled={scale === MIN}
          aria-label="Reset zoom to fit"
          className="min-w-[4.5rem] rounded-full px-2 py-2 text-[0.8125rem] tabular-nums text-[#FAF8F5] transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF8F5] disabled:hover:bg-transparent"
        >
          {scale === MIN ? "Fit" : `${(Math.round(scale * 10) / 10).toFixed(1).replace(/\.0$/, "")}×`}
        </button>
        <button
          type="button"
          onClick={() => zoomTo(scale * STEP)}
          disabled={scale >= MAX}
          aria-label="Zoom in"
          className={`${control} h-10 w-10 text-lg leading-none`}
        >
          +
        </button>
      </div>

      <button
        ref={closeBtn}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className={`${control} absolute right-4 top-4 text-xl leading-none`}
      >
        &times;
      </button>

      {many && (
        <>
          <button
            type="button"
            onClick={() => step((index - 1 + items.length) % items.length)}
            aria-label="Previous picture"
            className={`${control} absolute left-3 top-1/2 -translate-y-1/2 sm:left-6`}
          >
            &larr;
          </button>
          <button
            type="button"
            onClick={() => step((index + 1) % items.length)}
            aria-label="Next picture"
            className={`${control} absolute right-3 top-1/2 -translate-y-1/2 sm:right-6`}
          >
            &rarr;
          </button>
        </>
      )}
    </div>
  );
}
