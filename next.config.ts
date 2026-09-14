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
};

export default config;
