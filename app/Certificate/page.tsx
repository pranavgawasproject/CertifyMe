import type { Metadata } from 'next';
import Certificate from '@/components/Certificate';

export const metadata: Metadata = {
  title: 'Certificate Preview & Download — PNG / PDF Export',
  description:
    'Preview your customized certificate, then download as high-resolution PNG or PDF, or share a public link. Switch templates and edit recipient details on the fly — free, no sign-up.',
  alternates: { canonical: '/Certificate' },
  openGraph: {
    type: 'website',
    url: '/Certificate',
    title: 'Certificate Preview & Download | CertifyMe',
    description:
      'Preview your customized certificate, then download as high-resolution PNG or PDF, or share a public link. Free, no sign-up.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CertifyMe — certificate preview and download',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Certificate Preview & Download | CertifyMe',
    description:
      'Preview, download as PNG/PDF, or share a link to your custom certificate. Free online generator.',
    images: ['/og-image.png'],
  },
};

export default function CertificatePage() {
  return <Certificate />;
}
