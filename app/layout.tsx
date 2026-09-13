import type { Metadata } from 'next';
import { Source_Serif_4, Inter } from 'next/font/google';
import Motion from '@/components/Motion';
import { UnlockProvider } from '@/components/Unlock';
import Header from '@/components/Header';
import AmbientGradient from '@/components/AmbientGradient';
import './globals.css';

const display = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
  variable: '--font-display-face',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Toni Chen — Senior Product Designer',
  description: '[POSITIONING STATEMENT] Portfolio of Toni Chen, senior product designer.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${inter.variable}`}>
      <head>
        {/* Apply the stored theme before first paint. Light is the default. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}",
          }}
        />
        {/* Without JS the reveal never runs, so nothing may start hidden. */}
        <noscript>
          <style>{`[style*="translateY"],[style*="opacity"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:border focus:border-hair focus:bg-paper focus:px-4 focus:py-2"
        >
          Skip to work
        </a>
        <AmbientGradient />
        <Motion>
          <UnlockProvider>
            <Header />
            <main>{children}</main>
          </UnlockProvider>
        </Motion>
      </body>
    </html>
  );
}
