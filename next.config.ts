import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  /* The asset route reads /private at request time; trace it into the
     deployment, since the path is built dynamically. */
  outputFileTracingIncludes: {
    '/api/asset/[...path]': ['./private/**/*'],
    '/work/[slug]': ['./private/hidden/**/*'],
  },
  /* Addresses from the previous site that search engines still hold. A
     permanent redirect sends people to the equivalent page here, and the
     target's noindex tells the engine to drop the old entry. */
  async redirects() {
    return [{ source: '/about-me', destination: '/about', permanent: true }];
  },
  /* The whole site stays out of search engines. The header covers every
     response, including images and files, where a meta tag cannot reach. */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet, noimageindex',
          },
        ],
      },
    ];
  },
};

export default config;
