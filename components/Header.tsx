'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import PeaceBadge from './PeaceBadge';

const LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/play', label: 'Play' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
        <Link href="/" className="inline-flex items-center gap-3 font-display text-[1.0625rem] tracking-tight">
          <PeaceBadge className="h-8 w-8 shrink-0" />
          Toni Chen
        </Link>
        <div className="flex items-center gap-5 sm:gap-7">
          <nav aria-label="Primary" className="flex items-center gap-6 sm:gap-8">
            {LINKS.map((l) => {
              /* The current section reads in the display italic with a dot
                 beneath; the others stay in the sans. Case study pages count
                 as Work. */
              const current = pathname === l.href || pathname.startsWith(`${l.href}/`);
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  aria-current={current ? 'page' : undefined}
                  className={`relative inline-flex items-center pb-1 text-[0.875rem] transition-colors ${
                    current
                      ? 'font-display text-[1.0625rem] italic leading-none text-ink'
                      : 'text-ink-2 hover:text-ink'
                  }`}
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className={`absolute left-1/2 top-full h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-accent transition-opacity duration-300 ${
                      current ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
