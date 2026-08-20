import type { Metadata } from 'next';
import Templates from '@/components/Templates';
import { TEMPLATES } from '@/lib/data/templates';

const SITE_URL = 'https://certify-me-five.vercel.app';

export const metadata: Metadata = {
  title: '20 Free Certificate Templates — Download & Customize',
  description:
    'Browse 20 professionally designed certificate templates: formal, minimal, luxury, vintage, modern & more. Customize with your name and event, then download as high-res PNG or PDF. Free, no sign-up.',
  keywords: [
    'certificate templates',
    'free certificate designs',
    'award certificate templates',
    'certificate of achievement template',
    'certificate of completion template',
  ],
  alternates: { canonical: '/templates' },
  openGraph: {
    type: 'website',
    url: '/templates',
    title: '20 Free Certificate Templates — Download & Customize | CertifyMe',
    description:
      'Browse 20 professionally designed certificate templates: formal, minimal, luxury, vintage, modern & more. Customize and download as high-res PNG or PDF. Free, no sign-up.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CertifyMe — 20 certificate templates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '20 Free Certificate Templates — CertifyMe',
    description:
      'Browse 20 professionally designed certificate templates: formal, minimal, luxury, vintage, modern & more.',
    images: ['/og-image.png'],
  },
};

/** Real structured data only — template names/descriptions from registry, no fake ratings. */
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${SITE_URL}/`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Certificate Templates',
      item: `${SITE_URL}/templates`,
    },
  ],
};

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'CertifyMe Certificate Templates',
  description:
    'Free professionally designed certificate templates for completion, achievement, and award certificates.',
  numberOfItems: TEMPLATES.length,
  itemListElement: TEMPLATES.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: t.name,
    description: t.description,
    url: `${SITE_URL}/templates`,
  })),
};

export default function TemplatesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd),
        }}
      />
      <Templates />
    </>
  );
}
