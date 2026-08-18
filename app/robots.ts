import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/c/'],
    },
    sitemap: 'https://certify-me-five.vercel.app/sitemap.xml',
  };
}
