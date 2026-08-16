import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter, IBM_Plex_Mono, Dancing_Script } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import ErrorBoundary from '@/components/ErrorBoundary';

const SITE_URL = 'https://certify-me-five.vercel.app';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fraunces',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-dancing-script',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'CertifyMe | Free Online Certificate Generator & Maker (20+ Templates)',
    template: '%s | CertifyMe',
  },
  description:
    'CertifyMe is the #1 free online certificate generator. Easily create, customize, and issue professional completion & achievement certificates with 20+ templates, instant PNG/PDF downloads, and bulk CSV generation.',
  keywords: [
    'certifyme',
    'certificate generator',
    'free certificate maker',
    'online certificate creator',
    'certificate of completion generator',
    'free certificate template',
    'bulk certificate generator',
    'certificate maker free',
    'digital credential creator',
  ],
  authors: [{ name: 'CertifyMe' }],
  creator: 'CertifyMe',
  publisher: 'CertifyMe',
  applicationName: 'CertifyMe',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/apple-touch-icon.png', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'CertifyMe',
    locale: 'en_US',
    url: SITE_URL,
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
  alternates: {
    canonical: '/',
  },
  category: 'design',
};

export const viewport: Viewport = {
  themeColor: '#10182B',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'CertifyMe',
  url: `${SITE_URL}/`,
  description:
    'Free online certificate generator with 20+ designer templates, live preview, PNG and PDF export, and CSV bulk creation.',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    '20+ certificate templates',
    'Live real-time preview',
    'PNG and PDF download',
    'CSV bulk generation',
    'Shareable certificate links',
    'Custom logo upload',
    'No signup required',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${ibmPlexMono.variable} ${dancingScript.variable}`}
    >
      <head>
        {/* Google Fonts <link> — required because certificate templates use
            inline `font-family: 'Dancing Script', cursive` etc. The literal
            family names are not exposed by next/font/google (which produces
            hashed family names + CSS variables). Loading via the CDN here keeps
            the template aesthetics identical to the original Vite app. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=Dancing+Script:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#0E1526] text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ErrorBoundary>
          <div className="min-h-screen bg-[#0E1526] guilloche-bg relative overflow-hidden">
            <div className="relative z-10">{children}</div>
          </div>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  );
}
