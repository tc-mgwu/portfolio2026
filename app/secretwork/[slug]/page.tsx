import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { loadHiddenStudy } from '@/lib/hidden';
import CaseStudyView from '@/components/CaseStudyView';

/* Unlisted case studies. Nothing here is prerendered or linked; the study is
   read from the encrypted store on each request, after the middleware has
   checked the study's own password. The route is never indexed. */

export const dynamic = 'force-dynamic';

const NOINDEX = { index: false, follow: false, noarchive: true, nosnippet: true };

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const study = await loadHiddenStudy(slug);
  if (!study) return { robots: NOINDEX };
  return { title: `${study.title}, ${study.company} — Toni Chen`, description: study.summary, robots: NOINDEX };
}

export default async function SecretWorkPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const study = await loadHiddenStudy(slug);
  if (!study) notFound();
  return <CaseStudyView study={study} />;
}
