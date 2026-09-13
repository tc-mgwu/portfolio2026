import Image from 'next/image';
import type { Block, Picture, Section } from '@/lib/types';
import ProtectedFrame from './ProtectedFrame';

/* Long-form body. Measure is held at 68 characters so the reading column stays
   in the 65 to 75 range the spec asks for. */

/* A picture in its frame. With no `src` the frame stands empty, labelled
   with its ratio, so a page can be laid out before the imagery exists. GIFs
   skip the optimiser, which would flatten them to one frame. */
function Frame({
  picture,
  slug,
  title,
  sizes = '(min-width: 1024px) 720px, 100vw',
}: {
  picture: Picture;
  slug: string;
  title: string;
  sizes?: string;
}) {
  const { src, aspect, alt } = picture;
  if (picture.protectedSrc) {
    return <ProtectedFrame picture={picture} slug={slug} title={title} />;
  }
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-hair bg-paper-2"
      style={{ aspectRatio: String(aspect) }}
      {...(src ? {} : { role: 'img', 'aria-label': alt })}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          unoptimized={src.endsWith('.gif')}
          className="object-cover"
        />
      ) : (
        <div className="grid h-full w-full place-items-center">
          <span className="label-sc">Image slot &nbsp;·&nbsp; {aspect.toFixed(2)}:1</span>
        </div>
      )}
    </div>
  );
}

function Blocks({ blocks, slug, title }: { blocks: Block[]; slug: string; title: string }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case 'lead':
            return (
              <p key={i} className="max-w-[68ch] text-[1.1875rem] leading-[1.7] text-ink">
                {b.text}
              </p>
            );
          case 'p':
            return (
              <p key={i} className="max-w-[68ch] text-[1.0625rem] leading-[1.75] text-ink-2">
                {b.text}
              </p>
            );
          case 'list':
            return (
              <ul key={i} className="max-w-[68ch] list-disc space-y-2 pl-5 text-[1.0625rem] leading-[1.7] text-ink-2">
                {b.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            );
          case 'quote':
            return (
              <blockquote key={i} className="max-w-[60ch] border-l-2 border-accent pl-5 font-display text-[1.375rem] leading-[1.45] text-ink">
                {b.text}
              </blockquote>
            );
          case 'image':
            return (
              <figure key={i} className="m-0">
                <Frame picture={b} slug={slug} title={title} />
                <figcaption className="mt-3 text-[0.8125rem] text-ink-3">{b.caption}</figcaption>
              </figure>
            );
          case 'gallery':
            return (
              <figure key={i} className="m-0">
                <div className={`grid gap-4 ${b.items.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
                  {b.items.map((pic, j) => (
                    <div key={j}>
                      <Frame picture={pic} slug={slug} title={title} sizes="(min-width: 640px) 30vw, 100vw" />
                      {pic.caption && (
                        <p className="mt-2 text-[0.8125rem] text-ink-3">{pic.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
                {b.caption && (
                  <figcaption className="mt-3 text-[0.8125rem] text-ink-3">{b.caption}</figcaption>
                )}
              </figure>
            );
          case 'links':
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
    <div className="space-y-20">
      {sections.map((s) => (
        <section key={s.id} id={s.id} className="scroll-mt-28 space-y-6">
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.1rem)] leading-tight tracking-[-0.015em]">
            {s.title}
          </h2>
          <Blocks blocks={s.blocks} slug={slug} title={title} />
        </section>
      ))}
    </div>
  );
}
