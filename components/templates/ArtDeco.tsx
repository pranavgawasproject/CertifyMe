// @ts-nocheck — presentational template ported verbatim from Vite source.
import type { TemplateProps } from '@/lib/types';

// Template 12: Art Deco — 1920s geometric gold on black
function ArtDeco({ data, logoUrl }: TemplateProps) {
  const { recipientName, event, date, issuer, signature } = data;
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
      position: 'relative',
      padding: '5%',
      boxSizing: 'border-box',
      fontFamily: 'Georgia, serif',
      color: '#D4AF37',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      overflow: 'hidden',
    }}>
      {/* Art Deco stepped border */}
      <div style={{
        position: 'absolute', top: '3%', left: '3%', right: '3%', bottom: '3%',
        border: '2px solid #D4AF37',
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)',
      }} />
      <div style={{
        position: 'absolute', top: '4.5%', left: '4.5%', right: '4.5%', bottom: '4.5%',
        border: '1px solid #D4AF37',
        opacity: 0.5,
      }} />

      {/* Art Deco corner fans */}
      {[
        { top: '5%', left: '5%' },
        { top: '5%', right: '5%' },
        { bottom: '5%', left: '5%' },
        { bottom: '5%', right: '5%' },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: '40px',
          height: '40px',
          ...pos,
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            border: '2px solid #D4AF37',
            borderRadius: '0 50% 0 0',
            borderTop: '2px solid #D4AF37',
            borderRight: '2px solid #D4AF37',
            transform: i === 0 ? 'rotate(0deg)' : i === 1 ? 'rotate(90deg)' : i === 2 ? 'rotate(270deg)' : 'rotate(180deg)',
          }} />
        </div>
      ))}

      {/* Top Art Deco emblem - fan */}
      <div style={{
        width: '120px',
        height: '60px',
        marginBottom: '2%',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '120px', height: '60px',
          borderRadius: '60px 60px 0 0',
          background: 'linear-gradient(to top, transparent 60%, #D4AF37 60%, #D4AF37 65%, transparent 65%, transparent 75%, #D4AF37 75%, #D4AF37 80%, transparent 80%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '8px', height: '8px',
          borderRadius: '50%',
          background: '#D4AF37',
        }} />
      </div>

      {logoUrl && (
        <img src={logoUrl} alt="logo" style={{ height: '60px', maxWidth: '20%', objectFit: 'contain', marginBottom: '2%' }} />
      )}
      <div style={{
        fontSize: '1cqw',
        letterSpacing: '0.5em',
        textTransform: 'uppercase',
        color: '#D4AF37',
        marginBottom: '1%',
        fontWeight: 'bold',
      }}>
        Certificate of Achievement
      </div>

      {/* Deco separator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '1% 0 3%' }}>
        <div style={{ width: '60px', height: '2px', background: '#D4AF37' }} />
        <div style={{ width: '10px', height: '10px', background: '#D4AF37', transform: 'rotate(45deg)' }} />
        <div style={{ width: '60px', height: '2px', background: '#D4AF37' }} />
      </div>

      <div style={{ fontSize: '1cqw', color: '#BFA181', fontStyle: 'italic', marginBottom: '1.5%' }}>
        ~ Presented to ~
      </div>

      <div style={{
        fontSize: '3.4cqw',
        fontWeight: 'bold',
        color: '#FFFFFF',
        margin: '0.5% 0 1.5%',
        lineHeight: 1.1,
        textShadow: '0 0 15px rgba(212, 175, 55, 0.5)',
        fontFamily: 'Georgia, serif',
      }}>
        {recipientName || 'Recipient Name'}
      </div>

      {/* Deco separator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '1% 0 2%' }}>
        <div style={{ width: '40px', height: '1px', background: '#D4AF37' }} />
        <div style={{ width: '6px', height: '6px', background: '#D4AF37', transform: 'rotate(45deg)' }} />
        <div style={{ width: '40px', height: '1px', background: '#D4AF37' }} />
      </div>

      <div style={{ fontSize: '1.1cqw', color: '#BFA181', maxWidth: '65%', lineHeight: 1.6, marginBottom: '2%', fontStyle: 'italic' }}>
        in recognition of
        <div style={{ fontSize: '1.7cqw', color: '#D4AF37', marginTop: '0.5%', fontStyle: 'normal', fontWeight: 'bold' }}>
          {event || 'Event Name'}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginTop: 'auto', marginBottom: '3%' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.4cqw', fontFamily: '"Dancing Script", cursive', color: '#D4AF37' }}>
            {signature || issuer || 'Issuer'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', margin: '6px 0' }}>
            <div style={{ width: '40px', height: '1px', background: '#D4AF37' }} />
            <div style={{ width: '4px', height: '4px', background: '#D4AF37', transform: 'rotate(45deg)' }} />
            <div style={{ width: '40px', height: '1px', background: '#D4AF37' }} />
          </div>
          <div style={{ fontSize: '0.8cqw', color: '#BFA181' }}>{issuer || 'Issuing Authority'}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1cqw', color: '#D4AF37' }}>{date || 'Date'}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', margin: '6px 0' }}>
            <div style={{ width: '40px', height: '1px', background: '#D4AF37' }} />
            <div style={{ width: '4px', height: '4px', background: '#D4AF37', transform: 'rotate(45deg)' }} />
            <div style={{ width: '40px', height: '1px', background: '#D4AF37' }} />
          </div>
          <div style={{ fontSize: '0.8cqw', color: '#BFA181' }}>Date</div>
        </div>
      </div>
    </div>
  );
}

export default ArtDeco;
