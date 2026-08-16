import type { Metadata } from 'next';
import BulkGenerate from '@/components/BulkGenerate';

export const metadata: Metadata = {
  title: 'Bulk Certificate Generator — CSV to PNG (Free)',
  description:
    'Upload a CSV and generate dozens of personalized certificates in one click. Each row becomes a high-resolution PNG, downloaded as a ZIP. Free, no sign-up. Perfect for teachers, HR, and event organizers.',
  keywords: [
    'bulk certificate generator',
    'csv to certificate',
    'multiple certificates',
    'batch certificate maker',
    'certificate from excel',
  ],
  alternates: { canonical: '/bulk' },
  openGraph: {
    type: 'website',
    url: '/bulk',
    title: 'Bulk Certificate Generator — CSV to PNG (Free) | CertifyMe',
    description:
      'Upload a CSV and generate dozens of personalized certificates in one click. Each row becomes a high-resolution PNG, downloaded as a ZIP.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CertifyMe — Bulk CSV certificate generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bulk Certificate Generator — CSV to PNG (Free) | CertifyMe',
    description:
      'Upload a CSV and generate dozens of personalized certificates in one click. Free, no sign-up.',
    images: ['/og-image.png'],
  },
};

export default function BulkPage() {
  return <BulkGenerate />;
}
