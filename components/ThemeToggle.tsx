'use client';

/* Theme toggle.

   It holds no React state at all. Both icons and both labels are always in the
   markup, and CSS picks which pair shows based on the `dark` class the boot
   script stamps on <html> before first paint. That means the server and the
   client render byte-identical HTML, so there is no hydration mismatch and no
   flash of the wrong icon. The current theme is read from the DOM on click. */

export default function ThemeToggle({ className = '' }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.classList.contains('dark') ? 'light' : 'dark';
    root.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* private mode */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`theme-toggle grid h-9 w-9 place-items-center rounded-full border border-hair text-ink-2 transition-colors hover:border-ink hover:text-ink ${className}`}
    >
      <span className="sr-only theme-when-light">Switch to dark mode</span>
      <span className="sr-only theme-when-dark">Switch to light mode</span>

      <svg viewBox="0 0 20 20" aria-hidden="true" className="theme-icon theme-when-light h-[18px] w-[18px]" fill="none">
        {/* Moon: shown on a light page, because it offers the dark one. */}
        <path
          d="M16.5 11.8A7 7 0 0 1 8.2 3.5a7 7 0 1 0 8.3 8.3Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>

      <svg viewBox="0 0 20 20" aria-hidden="true" className="theme-icon theme-when-dark h-[18px] w-[18px]" fill="none">
        {/* Sun */}
        <circle cx="10" cy="10" r="3.6" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M10 1.6v2.1M10 16.3v2.1M18.4 10h-2.1M3.7 10H1.6M15.9 4.1l-1.5 1.5M5.6 14.4l-1.5 1.5M15.9 15.9l-1.5-1.5M5.6 5.6 4.1 4.1"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
