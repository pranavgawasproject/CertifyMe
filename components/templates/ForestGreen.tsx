// @ts-nocheck — presentational template ported verbatim from Vite source.
import type { TemplateProps } from '@/lib/types';

// Template 14: Forest Green — deep forest with pine tree silhouettes
function ForestGreen({ data, logoUrl }: TemplateProps) {
  const { recipientName, event, date, issuer, signature } = data;
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(135deg, #0f2818 0%, #1a3a26 50%, #0f2818 100%)',
      position: 'relative', padding: '5%', boxSizing: 'border-box',
      fontFamily: 'Georgia, serif', color: '#E8F5E9',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      textAlign: 'center', overflow: 'hidden',
    }}>
      {/* Pine tree silhouettes */}
      {[
        { left: '5%', bottom: '8%', size: 80, opacity: 0.25 },
        { left: '15%', bottom: '5%', size: 60, opacity: 0.2 },
        { right: '5%', bottom: '8%', size: 80, opacity: 0.25 },
        { right: '15%', bottom: '5%', size: 60, opacity: 0.2 },
      ].map((tree, i) => (
        <div key={i} style={{
          position: 'absolute',
          ...tree,
        }}>
          <svg width={tree.size} height={tree.size * 1.5} viewBox="0 0 60 90" style={{ opacity: tree.opacity }}>
            <polygon points="30,5 50,35 38,35 55,65 40,65 30,90 20,65 5,65 22,35 10,35" fill="#2D5A3D" />
            <rect x="26" y="85" width="8" height="8" fill="#3D2817" />
          </svg>
        </div>
      ))}

      {/* Border */}
      <div style={{ position: 'absolute', top: '4%', left: '4%', right: '4%', bottom: '4%', border: '2px solid #8FBC8F', opacity: 0.6 }} />
      <div style={{ position: 'absolute', top: '5.5%', left: '5.5%', right: '5.5%', bottom: '5.5%', border: '1px solid #8FBC8F', opacity: 0.3 }} />

      {logoUrl && (
        <img src={logoUrl} alt="logo" style={{ height: '60px', maxWidth: '20%', objectFit: 'contain', marginBottom: '2%' }} />
      )}

      <div style={{
        fontSize: '0.95cqw', letterSpacing: '0.4em', textTransform: 'uppercase',
        color: '#8FBC8F', marginBottom: '2%', fontWeight: 'bold',
      }}>
        🌲 Certificate of Achievement 🌲
      </div>

      <div style={{ fontSize: '1cqw', color: '#A5D6A7', fontStyle: 'italic', marginBottom: '1.5%' }}>
        In the spirit of growth, presented to
      </div>

      <div style={{
        fontSize: '3.4cqw', fontFamily: '"Dancing Script", cursive', color: '#FFFFFF',
        margin: '0.5% 0 1.5%', lineHeight: 1.1,
        textShadow: '0 2px 10px rgba(0,0,0,0.5)',
      }}>
        {recipientName || 'Recipient Name'}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '1% 0 2%' }}>
        <div style={{ width: '40px', height: '1px', background: '#8FBC8F' }} />
        <span style={{ color: '#8FBC8F', fontSize: '1.2cqw' }}>🍂</span>
        <div style={{ width: '40px', height: '1px', background: '#8FBC8F' }} />
      </div>

      <div style={{ fontSize: '1.1cqw', color: '#A5D6A7', maxWidth: '65%', lineHeight: 1.6, marginBottom: '2%' }}>
        for cultivating excellence in
        <div style={{ fontSize: '1.7cqw', color: '#8FBC8F', marginTop: '0.5%', fontStyle: 'italic' }}>
          {event || 'Event Name'}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginTop: 'auto', marginBottom: '3%' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.4cqw', fontFamily: '"Dancing Script", cursive', color: '#8FBC8F' }}>
            {signature || issuer || 'Issuer'}
          </div>
          <div style={{ width: '100%', height: '1px', background: '#8FBC8F', margin: '4px 0', opacity: 0.6 }} />
          <div style={{ fontSize: '0.8cqw', color: '#A5D6A7' }}>{issuer || 'Issuing Authority'}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1cqw', color: '#8FBC8F' }}>{date || 'Date'}</div>
          <div style={{ width: '100%', height: '1px', background: '#8FBC8F', margin: '4px 0', opacity: 0.6 }} />
          <div style={{ fontSize: '0.8cqw', color: '#A5D6A7' }}>Date</div>
        </div>
      </div>
    </div>
  );
}

export default ForestGreen;
