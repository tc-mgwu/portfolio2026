import type { Block, Section } from '@/lib/types';

/* Long-form body. Measure is held at 68 characters so the reading column stays
   in the 65 to 75 range the spec asks for. */

function Blocks({ blocks }: { blocks: Block[] }) {
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
                <div
                  className="overflow-hidden rounded-xl border border-hair bg-paper-2"
                  style={{ aspectRatio: String(b.aspect) }}
                  role="img"
                  aria-label={b.alt}
                >
                  <div className="grid h-full w-full place-items-center">
                    <span className="label-sc">Image slot &nbsp;·&nbsp; {b.aspect.toFixed(2)}:1</span>
                  </div>
                </div>
                <figcaption className="mt-3 text-[0.8125rem] text-ink-3">{b.caption}</figcaption>
              </figure>
            );
        }
      })}
    </>
  );
}

export default function CaseBody({ sections }: { sections: Section[] }) {
  return (
    <div className="space-y-20">
      {sections.map((s) => (
        <section key={s.id} id={s.id} className="scroll-mt-28 space-y-6">
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.1rem)] leading-tight tracking-[-0.015em]">
            {s.title}
          </h2>
          <Blocks blocks={s.blocks} />
        </section>
      ))}
    </div>
  );
}
