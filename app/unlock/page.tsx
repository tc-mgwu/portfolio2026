import UnlockForm from '@/components/UnlockForm';
import { caseStudies } from '@/content';

/* Reached by a middleware rewrite when someone deep-links a protected case
   study without a cookie. The modal is the usual route in; this is the fallback
   that keeps the URL working and the page shareable. */

export default async function UnlockPage(
  { searchParams }: { searchParams: Promise<{ next?: string }> },
) {
  const { next } = await searchParams;
  const slug = (next ?? '').split('/')[2] ?? '';
  const study = caseStudies.find((c) => c.slug === slug);

  return (
    <div className="mx-auto grid min-h-[80svh] max-w-[30rem] place-items-center px-6 pt-28">
      <div className="w-full">
        <p className="label-sc text-accent">Protected</p>
        <h1 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.5rem)] leading-tight">
          {study ? study.title : 'This work is protected'}
        </h1>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-2">
          This work is under NDA. Enter the password from my resume, or{' '}
          <a href="/#contact" className="text-accent underline underline-offset-4">
            email me for access
          </a>.
        </p>
        <UnlockForm slug={slug} />
      </div>
    </div>
  );
}
