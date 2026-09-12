'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/* reducedMotion="user" lets Framer Motion honour the media query itself, so no
   component branches on it at render time. Branching there makes the server and
   the client disagree, React throws the client render away, and the page is
   left frozen at its hidden initial state. */
export default function Motion({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
