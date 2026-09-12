import type { Metadata } from 'next';
import About from '@/components/About';

export const metadata: Metadata = {
  title: 'About — Toni Chen',
  description: 'About Toni Chen, senior product designer: experience, skills and credentials.',
};

export default function AboutPage() {
  return <About />;
}
