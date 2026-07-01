import TemplateRenderer from '../templates/TemplateRenderer';

// Renders a certificate at landscape A4 aspect ratio (√2:1, ~1.414:1).
// `scale` lets the same component be used as a thumbnail or full preview.
// `templateId` and `data` are passed through to the chosen template.
function CertificatePreview({ templateId, data, className = '' }) {
  return (
    <div
      className={`certificate-frame ${className}`}
      style={{
        aspectRatio: '1.414 / 1',
        width: '100%',
        overflow: 'hidden',
        borderRadius: '6px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
      }}
    >
      <TemplateRenderer templateId={templateId} data={data} />
    </div>
  );
}

export default CertificatePreview;
