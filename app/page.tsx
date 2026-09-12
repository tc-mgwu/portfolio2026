import Hero from '@/components/Hero';
import WorkRows from '@/components/WorkRows';
import { caseStudies } from '@/content';

export default function Home() {
  return (
    <>
      <Hero />
      <WorkRows studies={caseStudies} />
    </>
  );
}
