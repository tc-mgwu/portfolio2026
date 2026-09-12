import Hero from '@/components/Hero';
import CaseSummaries from '@/components/CaseSummaries';
import { caseStudies, featured } from '@/content';
import Collections from '@/components/Collections';

export default function Home() {
  return (
    <>
      <Hero />

      <Collections studies={caseStudies} />

      <CaseSummaries studies={featured} />

    </>
  );
}
