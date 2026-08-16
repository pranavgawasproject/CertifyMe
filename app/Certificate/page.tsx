import type { Metadata } from 'next';
import Certificate from '@/components/Certificate';

export const metadata: Metadata = {
  title: 'Your Certificate',
  description:
    'Preview, download, and share your custom certificate. Export as high-resolution PNG or PDF, send a shareable link, or switch templates on the fly.',
  alternates: { canonical: '/Certificate' },
  openGraph: {
    type: 'website',
    url: '/Certificate',
    title: 'Your Certificate | CertifyMe',
    description:
      'Preview, download, and share your custom certificate. Export as high-resolution PNG or PDF, send a shareable link, or switch templates on the fly.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CertifyMe — certificate preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Certificate | CertifyMe',
    description:
      'Preview, download, and share your custom certificate. Export as high-resolution PNG or PDF.',
    images: ['/og-image.png'],
  },
};

export default function CertificatePage() {
  return <Certificate />;
}
