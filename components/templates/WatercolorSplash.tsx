// @ts-nocheck — presentational template ported verbatim from Vite source.
import type { TemplateProps } from '@/lib/types';

// Template 18: Watercolor Splash — soft pastel watercolor
function WatercolorSplash({ data, logoUrl }: TemplateProps) {
  const { recipientName, event, date, issuer, signature } = data;
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#FFFBF5',
      position: 'relative', padding: '5%', boxSizing: 'border-box',
      fontFamily: 'Georgia, serif', color: '#3F3A5B',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      textAlign: 'center', overflow: 'hidden',
    }}>
      {/* Watercolor splotches */}
      <div style={{
        position: 'absolute', top: '8%', left: '10%',
        width: '180px', height: '180px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(244, 114, 182, 0.4) 0%, rgba(244, 114, 182, 0) 70%)',
        filter: 'blur(8px)',
      }} />
      <div style={{
        position: 'absolute', top: '15%', right: '12%',
        width: '160px', height: '160px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(139, 92, 246, 0) 70%)',
        filter: 'blur(8px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '12%', left: '15%',
        width: '140px', height: '140px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, rgba(34, 197, 94, 0) 70%)',
        filter: 'blur(8px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '8%', right: '10%',
        width: '170px', height: '170px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(251, 191, 36, 0.35) 0%, rgba(251, 191, 36, 0) 70%)',
        filter: 'blur(8px)',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '250px', height: '250px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(96, 165, 250, 0.2) 0%, rgba(96, 165, 250, 0) 70%)',
        filter: 'blur(15px)',
      }} />

      {/* Subtle border */}
      <div style={{ position: 'absolute', top: '4%', left: '4%', right: '4%', bottom: '4%', border: '1px solid rgba(63, 58, 91, 0.2)' }} />

      {logoUrl && (
        <img src={logoUrl} alt="logo" style={{ height: '60px', maxWidth: '20%', objectFit: 'contain', marginBottom: '2%' }} />
      )}

      <div style={{
        fontSize: '1cqw', letterSpacing: '0.4em', textTransform: 'uppercase',
        color: '#7C3AED', marginBottom: '2%', fontStyle: 'italic',
      }}>
        ~ Certificate of Achievement ~
      </div>

      <div style={{ fontSize: '1.05cqw', color: '#6B6489', fontStyle: 'italic', marginBottom: '2%' }}>
        With soft celebration, presented to
      </div>

      <div style={{
        fontSize: '3.8cqw', fontFamily: '"Dancing Script", cursive',
        color: '#3F3A5B', margin: '0.5% 0 1.5%', lineHeight: 1.1,
      }}>
        {recipientName || 'Recipient Name'}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '1% 0 2%' }}>
        <div style={{ width: '50px', height: '1px', background: '#7C3AED', opacity: 0.5 }} />
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F472B6' }} />
        <div style={{ width: '50px', height: '1px', background: '#7C3AED', opacity: 0.5 }} />
      </div>

      <div style={{ fontSize: '1.1cqw', color: '#6B6489', maxWidth: '65%', lineHeight: 1.6, marginBottom: '2%', fontStyle: 'italic' }}>
        in colorful recognition of
        <div style={{ fontSize: '1.7cqw', color: '#3F3A5B', marginTop: '0.5%', fontStyle: 'normal', fontWeight: 'bold' }}>
          {event || 'Event Name'}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginTop: 'auto', marginBottom: '3%' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5cqw', fontFamily: '"Dancing Script", cursive', color: '#7C3AED' }}>
            {signature || issuer || 'Issuer'}
          </div>
          <div style={{ width: '100%', height: '1px', background: '#7C3AED', margin: '4px 0', opacity: 0.4 }} />
          <div style={{ fontSize: '0.8cqw', color: '#6B6489' }}>{issuer || 'Issuing Authority'}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1cqw', color: '#3F3A5B' }}>{date || 'Date'}</div>
          <div style={{ width: '100%', height: '1px', background: '#7C3AED', margin: '4px 0', opacity: 0.4 }} />
          <div style={{ fontSize: '0.8cqw', color: '#6B6489' }}>Date</div>
        </div>
      </div>
    </div>
  );
}

export default WatercolorSplash;
