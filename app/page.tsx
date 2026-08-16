import type { Metadata } from 'next';
import Welcome from '@/components/Welcome';

export const metadata: Metadata = {
  title: 'CertifyMe | Free Online Certificate Generator & Maker (20+ Templates)',
  description:
    'CertifyMe is the #1 free online certificate generator. Easily create, customize, and issue professional completion & achievement certificates with 20+ templates, instant PNG/PDF downloads, and bulk CSV generation.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'CertifyMe | Free Online Certificate Generator & Maker',
    description:
      'Design and issue professional completion & achievement certificates in seconds. 20+ free templates, live preview, PNG/PDF export, and bulk CSV generator.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CertifyMe — Free Online Certificate Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CertifyMe | Free Online Certificate Generator & Maker',
    description:
      'Design and issue professional completion & achievement certificates in seconds. 20+ free templates, live preview, PNG/PDF export, and bulk CSV generator.',
    images: ['/og-image.png'],
  },
};

interface HomePageProps {
  searchParams?: Promise<{ template?: string | string[] }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const sp = (await searchParams) || {};
  const rawTemplate = sp.template;
  const initialTemplateId = Array.isArray(rawTemplate) ? rawTemplate[0] : rawTemplate;

  return <Welcome initialTemplateId={initialTemplateId} />;
}
