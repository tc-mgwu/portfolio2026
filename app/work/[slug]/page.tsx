import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { caseStudies, getCaseStudy, neighbours } from '@/content';
import CaseStudyView from '@/components/CaseStudyView';
import ComingSoon from '@/components/ComingSoon';

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return { title: `${study.title}, ${study.company} — Toni Chen`, description: study.summary };
}

export default async function CaseStudyPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const { prev, next } = neighbours(slug);
  if (study.comingSoon) return <ComingSoon study={study} prev={prev} next={next} />;
  return <CaseStudyView study={study} prev={prev} next={next} />;
}
