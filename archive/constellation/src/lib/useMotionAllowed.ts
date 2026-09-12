import { useEffect, useState } from 'react';

/**
 * True only once the component has mounted on a client that has not asked for
 * reduced motion. Server rendering and the first client frame both return
 * false, so the markup's resting state is the finished, fully drawn version.
 * Animation is then layered on top rather than being required for correctness.
 */
export function useMotionAllowed(): boolean {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setAllowed(!mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return allowed;
}
