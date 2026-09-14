import Image from "next/image";
import Link from "next/link";
import type { Block, Picture, Section } from "@/lib/types";
import ProtectedFrame from "./ProtectedFrame";
import ImageGuard from "./ImageGuard";
import DataTable from "./DataTable";
import { titleCase } from "@/lib/text";
import ProtectedTable from "./ProtectedTable";
import { Zoomable } from "./Lightbox";

/* Long-form body. Every block that carries text shares one measure, 50rem,
   which is about 74 characters at the body size, so the reading column stays
   in the 65 to 75 range the spec asks for and tables, lists and flows end on
   the same right edge as the paragraphs. */

/* A picture in its frame. With no `src` the frame stands empty, labelled
   with its ratio, so a page can be laid out before the imagery exists. GIFs
   skip the optimiser, which would flatten them to one frame. */
function Frame({
  picture,
  slug,
  title,
  group,
  index,
  sizes = "(min-width: 1024px) 720px, 100vw",
}: {
  picture: Picture;
  slug: string;
  title: string;
  /** The pictures this one sits among, so the lightbox can step through them. */
  group?: Picture[];
  index?: number;
  sizes?: string;
}) {
  const { src, aspect, alt } = picture;
  if (picture.protectedSrc) {
    return <ProtectedFrame picture={picture} slug={slug} title={title} />;
  }
  const Wrap = picture.href ? LinkOut : Zoomable;
  return (
    <Wrap picture={picture} group={group} index={index}>
      <div
        className={
          picture.bare
            ? "relative"
            : "relative overflow-hidden rounded-xl border border-hair bg-paper-2"
        }
        style={{ aspectRatio: String(aspect), background: picture.background }}
        {...(src ? {} : { role: "img", "aria-label": alt })}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            unoptimized={src.endsWith(".gif")}
            className={
              picture.bare || picture.fit === "contain"
                ? "object-contain"
                : "object-cover"
            }
          />
        ) : (
          <div className="grid h-full w-full place-items-center">
            <span className="label-sc">
              Image slot &nbsp;·&nbsp; {aspect.toFixed(2)}:1
            </span>
          </div>
        )}
      </div>
    </Wrap>
  );
}

/* A picture that links out, to a Figma file for instance, in place of the
   lightbox. Same lift and corner badge as Zoomable, so the two affordances
   read as one family; the badge names where the click goes. */
function LinkOut({
  picture,
  children,
}: {
  picture: Picture;
  group?: Picture[];
  index?: number;
  children: React.ReactNode;
}) {
  const label =
    picture.linkLabel ??
    (picture.href?.includes("figma.com") ? "View in Figma" : "Open link");
  return (
    <a
      href={picture.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${label}: ${picture.alt}`}
      className="group/zoom relative block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
    >
      <div className="rounded-xl transition-[transform,box-shadow] duration-300 ease-out group-hover/zoom:-translate-y-0.5 group-hover/zoom:shadow-[0_18px_40px_-18px_rgba(26,23,20,0.35)] group-focus-visible/zoom:-translate-y-0.5">
        {children}
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-[rgba(20,17,14,0.82)] px-5 py-2.5 text-[0.875rem] font-medium text-[#FAF8F5] opacity-0 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)] backdrop-blur transition-opacity duration-200 group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100"
      >
        {label}
        <svg viewBox="0 0 12 12" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3.5 1.5h7v7M10.5 1.5 1.5 10.5" />
        </svg>
      </span>
    </a>
  );
}

function Blocks({
  blocks,
  slug,
  title,
}: {
  blocks: Block[];
  slug: string;
  title: string;
}) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "lead":
            return (
              <p
                key={i}
                className="max-w-[50rem] text-[1.0625rem] leading-[1.6] text-ink"
              >
                {b.text}
              </p>
            );
          case "p":
            return (
              <p
                key={i}
                className="max-w-[50rem] text-[1.0625rem] leading-[1.6] text-ink-2"
              >
                {b.text}
              </p>
            );
          case "list":
            return (
              <ul
                key={i}
                className="max-w-[50rem] list-disc space-y-2 pl-5 text-[1.0625rem] leading-[1.6] text-ink-2"
              >
                {b.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="max-w-[50rem] border-l-2 border-accent pl-5 font-display text-[1.375rem] leading-[1.45] text-ink"
              >
                {b.text}
              </blockquote>
            );
          case "image":
            return (
              <figure key={i} className="pb-2">
                <Frame picture={b} slug={slug} title={title} />
                <figcaption className="mt-4 text-[0.8125rem] leading-relaxed text-ink-3">
                  {b.caption}
                </figcaption>
              </figure>
            );
          case "gallery":
            return (
              <figure key={i} className="pb-2">
                <div
                  className={`grid gap-4 ${b.items.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}
                >
                  {b.items.map((pic, j) => (
                    <div key={j}>
                      <Frame
                        picture={pic}
                        slug={slug}
                        title={title}
                        group={b.items}
                        index={j}
                        sizes="(min-width: 640px) 30vw, 100vw"
                      />
                      {pic.caption && (
                        <p className="mt-2 text-[0.8125rem] text-ink-3">
                          {pic.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                {b.caption && (
                  <figcaption className="mt-4 text-[0.8125rem] leading-relaxed text-ink-3">
                    {b.caption}
                  </figcaption>
                )}
              </figure>
            );
          case "links":
            return (
              <ul key={i} className="flex flex-wrap gap-3">
                {b.items.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-hair px-4 py-2 text-[0.8125rem] text-ink transition-colors hover:border-ink"
                    >
                      {l.label}
                      <span aria-hidden="true">&#8599;</span>
                    </a>
                  </li>
                ))}
              </ul>
            );
          case "split":
            return (
              <div key={i} className="grid items-start gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] sm:gap-10">
                <div className="space-y-5 [&_li]:text-[1rem] [&_p]:text-[1rem]">
                  <Blocks blocks={b.blocks} slug={slug} title={title} />
                </div>
                <figure style={b.picture.maxWidth ? { maxWidth: b.picture.maxWidth } : undefined}>
                  <Frame picture={b.picture} slug={slug} title={title} sizes="(min-width: 1024px) 480px, 100vw" />
                  {b.picture.caption && (
                    <figcaption className="mt-4 text-[0.8125rem] leading-relaxed text-ink-3">{b.picture.caption}</figcaption>
                  )}
                </figure>
              </div>
            );
          case "qa":
            return (
              <dl key={i} className="max-w-[50rem] space-y-5">
                {b.items.map((it) => (
                  <div key={it.q}>
                    <dt className="text-[1.0625rem] font-medium leading-[1.5] text-ink">{it.q}</dt>
                    <dd className="mt-1.5 text-[1.0625rem] leading-[1.6] text-ink-2">{it.a}</dd>
                  </div>
                ))}
              </dl>
            );
          case "flow":
            return (
              <div key={i} className="max-w-[50rem] space-y-6">
                {b.rows.map((row, r) => {
                  const now = r === b.rows.length - 1;
                  return (
                    <div key={row.label}>
                      <p className="label-sc mb-3">{row.label}</p>
                      <ol className="flex flex-wrap items-stretch gap-y-3">
                        {row.steps.map((st, k) => (
                          <li key={st.title} className="flex items-center">
                            <div
                              className={`rounded-lg border px-3.5 py-2.5 ${
                                now ? "border-ink/60 bg-paper text-ink" : "border-hair bg-paper-2/60 text-ink-2"
                              }`}
                            >
                              <p className="text-[0.9375rem] font-medium leading-snug">{st.title}</p>
                              {st.detail && (
                                <p className={`mt-0.5 text-[0.8125rem] leading-snug ${now ? "text-ink-2" : "text-ink-3"}`}>
                                  {st.detail}
                                </p>
                              )}
                            </div>
                            {k < row.steps.length - 1 && (
                              <span aria-hidden="true" className="px-2 text-ink-3">
                                &rarr;
                              </span>
                            )}
                          </li>
                        ))}
                      </ol>
                    </div>
                  );
                })}
              </div>
            );
          case "timeline":
            return (
              <ol key={i} className="max-w-[50rem] space-y-0">
                {b.items.map((it, j) => {
                  const last = j === b.items.length - 1;
                  return (
                    <li
                      key={it.date + it.title}
                      className="grid grid-cols-[auto_1fr] gap-x-5 sm:grid-cols-[7.5rem_auto_1fr] sm:gap-x-6"
                    >
                      {/* Date. Sits in its own column on wide screens, so the
                          eye can run down the dates alone. */}
                      <p className="col-start-2 pt-[0.05rem] text-[0.875rem] tabular-nums text-ink-3 sm:col-start-1 sm:pt-[0.2rem] sm:text-right">
                        {it.date}
                      </p>
                      {/* Rail and marker. The rail stops at the last event. */}
                      <div className="col-start-1 row-span-2 row-start-1 flex flex-col items-center sm:col-start-2">
                        <span
                          aria-hidden="true"
                          className={`mt-[0.45rem] block h-2.5 w-2.5 shrink-0 rounded-full ${
                            last ? "bg-accent ring-4 ring-accent/20" : "border-[1.5px] border-accent bg-paper"
                          }`}
                        />
                        {!last && <span aria-hidden="true" className="mt-1.5 w-px flex-1 bg-hair" />}
                      </div>
                      <div className={`col-start-2 sm:col-start-3 ${last ? "pb-0" : "pb-7"}`}>
                        <p className="text-[1.0625rem] leading-[1.5] text-ink">{it.title}</p>
                        {it.text && (
                          <p className="mt-1 text-[0.9375rem] leading-[1.55] text-ink-2">{it.text}</p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            );
          case "table":
            return (
              <figure key={i} className="max-w-[50rem] pb-2">
                {b.protectedSrc ? (
                  <ProtectedTable
                    columns={b.columns}
                    rows={b.rows}
                    protectedSrc={b.protectedSrc}
                    slug={slug}
                    title={title}
                  />
                ) : (
                  <DataTable columns={b.columns} rows={b.rows} values={b.values} />
                )}
                {b.caption && (
                  <figcaption className="mt-4 text-[0.8125rem] leading-relaxed text-ink-3">
                    {b.caption}
                  </figcaption>
                )}
              </figure>
            );
          case "callout":
            return (
              <Link
                key={i}
                href={b.href}
                className="group/callout flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-accent/30 bg-accent-soft px-6 py-5 text-ink transition-colors hover:border-accent"
              >
                <span className="font-display text-[1.125rem] leading-snug">{b.text}</span>
                <span className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-accent">
                  {b.cta}
                  <span aria-hidden="true" className="transition-transform group-hover/callout:translate-x-0.5">
                    &rarr;
                  </span>
                </span>
              </Link>
            );
        }
      })}
    </>
  );
}

export default function CaseBody({
  sections,
  slug,
  title,
}: {
  sections: Section[];
  slug: string;
  title: string;
}) {
  return (
    <div className="guarded space-y-20">
      <ImageGuard />
      {sections.map((s) => (
        <section key={s.id} id={s.id} className="scroll-mt-28 space-y-6">
          <div className="space-y-2">
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.1rem)] leading-tight tracking-[-0.015em]">
              {titleCase(s.title)}
            </h2>
            {s.subtitle && (
              <p className="max-w-[50rem] text-[1rem] leading-snug text-ink-3">
                {s.subtitle}
              </p>
            )}
          </div>
          <Blocks blocks={s.blocks} slug={slug} title={title} />
        </section>
      ))}
    </div>
  );
}
