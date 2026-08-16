import type { Metadata } from 'next';
import Templates from '@/components/Templates';

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

export default function TemplatesPage() {
  return <Templates />;
}
