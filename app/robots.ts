import type { MetadataRoute } from 'next';

/* Crawling is deliberately not blocked here. A crawler that cannot fetch a
   page never sees its noindex, and Google will still list a blocked URL it
   learns about from a link elsewhere. Letting it fetch, and answering with
   noindex on every response, is what keeps the site out of results. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
  };
}
