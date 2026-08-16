import TemplateRenderer from '@/components/templates/TemplateRenderer';
import type { CertificateData } from '@/lib/types';

// Renders a certificate at landscape A4 aspect ratio (√2:1, ~1.414:1).
// `templateId`, `data`, and `logoUrl` are passed through to the chosen template.

interface CertificatePreviewProps {
  templateId?: string;
  data: CertificateData;
  logoUrl?: string;
  className?: string;
}

export default function CertificatePreview({
  templateId,
  data,
  logoUrl,
  className = '',
}: CertificatePreviewProps) {
  return (
    <div
      className={`certificate-frame ${className}`}
      style={{
        aspectRatio: '1.414 / 1',
        width: '100%',
        overflow: 'hidden',
        borderRadius: '6px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
        containerType: 'inline-size',
      }}
    >
      <TemplateRenderer templateId={templateId} data={data} logoUrl={logoUrl} />
    </div>
  );
}
