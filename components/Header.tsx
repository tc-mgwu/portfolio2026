'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 bg-paper/78 backdrop-blur-md transition-[border-color,box-shadow] duration-300 ${
        scrolled ? 'border-b border-hair' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-[1.0625rem] tracking-tight">
          Toni Chen
        </Link>
        <div className="flex items-center gap-5 sm:gap-7">
          <nav aria-label="Primary" className="flex items-center gap-6 sm:gap-8">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-[0.875rem] text-ink-2 transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
