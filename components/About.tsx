import {
  bio, certificates, education, experience, skills, statement,
  type Credential,
} from '@/content/about';

/* About: a work-experience column with a credentials rail beside it.

   Experience is the wide column because it is what gets read. Skills, education
   and certificates sit in the rail as reference, scannable without competing. */

function Rail({ title, items }: { title: string; items: Credential[] }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby={`rail-${title}`}>
      <h3 id={`rail-${title}`} className="border-b border-hair pb-3 font-display text-[1.125rem]">
        {title}
      </h3>
      <ul className="mt-5 space-y-4">
        {items.map((c, i) => (
          <li key={`${c.title}-${i}`}>
            <p className="text-[0.875rem] leading-snug text-ink">
              {c.href ? (
                <a href={c.href} className="underline decoration-hair underline-offset-4 hover:decoration-accent">
                  {c.title}
                </a>
              ) : c.title}
            </p>
            <p className="mt-0.5 text-[0.8125rem] text-ink-3">{c.org}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="pb-24 pt-32 sm:pt-36">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="about-heading" className="font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] tracking-[-0.025em]">
          About me
        </h2>

        <p className="mt-10 font-display text-[clamp(1.375rem,2.8vw,2rem)] leading-[1.25] tracking-[-0.015em]">
          {statement}
        </p>

        <p className="mt-6 max-w-[68ch] text-[1.0625rem] leading-[1.7] text-ink-2">
          {bio}
        </p>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-x-16">
          {/* Work experience */}
          <div className="lg:col-span-8">
            <h3 className="border-b border-hair pb-3 font-display text-[1.125rem]">
              Work experience
            </h3>

            <ol className="mt-8 space-y-12">
              {experience.map((e) => (
                <li key={e.company}>
                  <div className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-[7px] bg-ink font-display text-[10px] text-paper"
                    >
                      {e.monogram}
                    </span>
                    <p className="text-[0.875rem] text-ink-2">{e.company}</p>
                  </div>

                  <ol className="mt-4 space-y-8">
                    {e.roles.map((r, ri) => (
                      <li key={`${r.title}-${ri}`}>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                          <h4 className="font-display text-[1.25rem] leading-tight">{r.title}</h4>
                          <p className="text-[0.8125rem] tabular-nums text-ink-3">{r.dates}</p>
                        </div>

                        {r.team && <p className="mt-1 text-[0.8125rem] text-ink-3">{r.team}</p>}

                        {r.summary && (
                          <p className="mt-3 max-w-[64ch] text-[0.9375rem] leading-relaxed text-ink-2">
                            {r.summary}
                          </p>
                        )}

                        {r.bullets.length > 0 && (
                          <ul className="mt-3 max-w-[64ch] space-y-2">
                            {r.bullets.map((b, bi) => (
                              <li key={`${b}-${bi}`} className="relative pl-5 text-[0.9375rem] leading-relaxed text-ink-2">
                                <span
                                  aria-hidden="true"
                                  className="absolute left-0 top-[0.62em] h-1 w-1 rounded-full bg-accent"
                                />
                                {b}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ol>
          </div>

          {/* Credentials rail */}
          <div className="space-y-12 lg:col-span-4">
            <section aria-labelledby="rail-skills">
              <h3 id="rail-skills" className="border-b border-hair pb-3 font-display text-[1.125rem]">
                Skills
              </h3>
              <div className="mt-5 space-y-7">
                {skills.map((g, gi) => (
                  <div key={`${g.group}-${gi}`}>
                    <p className="label-sc">{g.group}</p>
                    <ul className="mt-2.5 space-y-1.5">
                      {g.items.map((s, i) => (
                        <li key={`${s}-${i}`} className="text-[0.875rem] leading-snug text-ink-2">{s}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <Rail title="Education" items={education} />
            <Rail title="Certificates" items={certificates} />
          </div>
        </div>
      </div>
    </section>
  );
}
