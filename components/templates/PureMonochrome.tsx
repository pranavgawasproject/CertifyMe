// @ts-nocheck — presentational template ported verbatim from Vite source.
import type { TemplateProps } from '@/lib/types';

// Template 17: Pure Monochrome — strictly black & white minimal
function PureMonochrome({ data, logoUrl }: TemplateProps) {
  const { recipientName, event, date, issuer, signature } = data;
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#FFFFFF',
      position: 'relative', padding: '6%', boxSizing: 'border-box',
      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif', color: '#000000',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      textAlign: 'center', overflow: 'hidden',
    }}>
      {/* Sharp black borders */}
      <div style={{ position: 'absolute', top: '5%', left: '5%', right: '5%', bottom: '5%', border: '2px solid #000' }} />
      <div style={{ position: 'absolute', top: '6.5%', left: '6.5%', right: '6.5%', bottom: '6.5%', border: '1px solid #000' }} />

      {logoUrl && (
        <img src={logoUrl} alt="logo" style={{ height: '60px', maxWidth: '20%', objectFit: 'contain', marginBottom: '3%', filter: 'grayscale(100%) contrast(1.2)' }} />
      )}

      <div style={{
        fontSize: '0.85cqw', letterSpacing: '0.6em', textTransform: 'uppercase',
        color: '#000', marginBottom: '4%', fontWeight: 500,
      }}>
        Certificate of Achievement
      </div>

      <div style={{ fontSize: '0.95cqw', color: '#666', marginBottom: '2%' }}>
        This is to certify that
      </div>

      <div style={{
        fontSize: '3.6cqw', fontWeight: 300, color: '#000',
        margin: '1% 0 0.5%', lineHeight: 1.1, letterSpacing: '-0.01em',
      }}>
        {recipientName || 'Recipient Name'}
      </div>

      <div style={{ width: '40px', height: '2px', background: '#000', margin: '2% 0' }} />

      <div style={{ fontSize: '1cqw', color: '#333', maxWidth: '65%', lineHeight: 1.6, marginBottom: '4%' }}>
        has successfully completed
        <div style={{ fontSize: '1.5cqw', color: '#000', marginTop: '1%', fontWeight: 500 }}>
          {event || 'Event Name'}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginTop: 'auto' }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '1.3cqw', color: '#000', fontWeight: 300, fontStyle: 'italic' }}>
            {signature || issuer || 'Issuer'}
          </div>
          <div style={{ width: '120px', height: '1px', background: '#000', margin: '8px 0 4px' }} />
          <div style={{ fontSize: '0.7cqw', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#666' }}>
            {issuer || 'Issuing Authority'}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1cqw', color: '#000', fontWeight: 500 }}>{date || 'Date'}</div>
          <div style={{ width: '120px', height: '1px', background: '#000', margin: '8px 0 4px', marginLeft: 'auto' }} />
          <div style={{ fontSize: '0.7cqw', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#666' }}>Date</div>
        </div>
      </div>
    </div>
  );
}

export default PureMonochrome;
