import type { Metadata } from 'next';
import SharedCertificate from '@/components/SharedCertificate';
import { decodeCertData } from '@/utils/share';
import { getTemplateById } from '@/lib/data/templates';

interface PageProps {
  params: Promise<{ data: string }>;
}

/**
 * Generate metadata dynamically based on the decoded certificate payload.
 * Falls back to a generic "Certificate not found" meta when the URL is invalid.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { data } = await params;
  const cert = decodeCertData(data);

  if (!cert || (!cert.recipientName && !cert.event)) {
    return {
      title: 'Certificate not found',
      description: 'This CertifyMe share link is invalid or has been corrupted.',
      robots: { index: false, follow: false },
    };
  }

  const recipient = cert.recipientName || 'a recipient';
  const event = cert.event || 'a certificate program';
  const issuer = cert.issuer || 'CertifyMe';
  const templateMeta = getTemplateById(cert.templateId || 'classic-gold');

  const title = `${recipient}'s Certificate`;
  const description = `${recipient} received ${event} from ${issuer}. ${templateMeta.name} template — issued via CertifyMe.`;

  return {
    title,
    description,
    alternates: { canonical: `/c/${data}` },
    openGraph: {
      type: 'article',
      url: `/c/${data}`,
      title,
      description,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${recipient}'s certificate for ${event}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}

export default async function SharedCertificatePage({ params }: PageProps) {
  const { data } = await params;
  const cert = decodeCertData(data);

  return <SharedCertificate data={data} initialCert={cert} />;
}
