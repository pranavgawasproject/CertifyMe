import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://certify-me-five.vercel.app';
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/Certificate`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/templates`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/bulk`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ];
}
