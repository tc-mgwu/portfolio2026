import { bio, contact, statement } from '@/content/about';
import Image from 'next/image';

/* About: the statement, the bio, and how to get in touch. Skills and
   credentials live in the resume, which downloads from here. The full resume is a gated download from the
   Contact block, so the page stays a short read. */

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="pb-24 pt-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="md:grid md:grid-cols-[minmax(0,1fr)_14rem] md:items-end md:gap-x-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div>
            <h2 id="about-heading" className="font-display text-[clamp(1.5rem,2.8vw,2.1rem)] leading-[1.1] tracking-[-0.02em]">
              About me
            </h2>

            <p className="mt-10 font-display text-[clamp(1.375rem,2.8vw,2rem)] leading-[1.25] tracking-[-0.015em]">
              {statement}
            </p>

            <div className="mt-6 max-w-[68ch] space-y-4 text-[1.0625rem] leading-[1.7] text-ink-2">
              {bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* A foster kitten at the laptop, as a snapshot: rounded, a soft
              shadow, a slight tilt. Cropped so nothing on the screen is
              readable. Sits under the bio on a phone. */}
          <figure className="mt-10 w-56 md:mt-0 md:w-full md:justify-self-end">
            <div className="relative overflow-hidden rounded-2xl shadow-[0_18px_50px_-18px_rgba(26,23,20,0.35)] ring-1 ring-hair md:rotate-2" style={{ aspectRatio: '1382 / 2187' }}>
              <Image
                src="/about/kitten-2.jpg"
                alt="A grey tabby kitten lying beside an open laptop, one paw stretched toward the keyboard."
                fill
                sizes="(min-width: 768px) 16rem, 14rem"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[0.8125rem] text-ink-3 md:text-right">
              Foster kitten for quality assurance.
            </figcaption>
          </figure>
        </div>

        <div className="mt-16">
          {/* Contact, with the resume, in the wide column: it is the action
              this page exists for. */}
          <div id="contact" className="scroll-mt-28">
            <div className="max-w-[48rem]">
              <a
                href={`mailto:${contact[0].value}?subject=${encodeURIComponent('Hello from your portfolio')}`}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.9375rem] font-medium text-paper transition-opacity hover:opacity-85"
              >
                Send me a note
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
