// @ts-nocheck — presentational template ported verbatim from Vite source.
import type { TemplateProps } from '@/lib/types';

// Template 4: Botanical Sage — soft sage green with leaf decorations
function Botanical({ data, logoUrl }: TemplateProps) {
  const { recipientName, event, date, issuer, signature } = data;
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #f5f7f2 0%, #e8ede0 100%)',
      position: 'relative',
      padding: '4%',
      boxSizing: 'border-box',
      fontFamily: 'Georgia, serif',
      color: '#2D3E26',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      overflow: 'hidden',
    }}>
      {/* Corner leaves */}
      {[
        { top: '4%', left: '4%', rotate: '-15deg' },
        { top: '4%', right: '4%', rotate: '15deg', transform: 'scaleX(-1)' },
        { bottom: '4%', left: '4%', rotate: '15deg', transform: 'scaleY(-1)' },
        { bottom: '4%', right: '4%', rotate: '-15deg', transform: 'scale(-1, -1)' },
      ].map((style, i) => (
        <div key={i} style={{
          position: 'absolute',
          fontSize: '4.5cqw',
          color: '#4A6741',
          opacity: 0.4,
          ...style,
        }}>🍃</div>
      ))}

      {/* Decorative border */}
      <div style={{ position: 'absolute', top: '6%', left: '6%', right: '6%', bottom: '6%', border: '2px solid #4A6741', opacity: 0.5 }} />
      <div style={{ position: 'absolute', top: '7%', left: '7%', right: '7%', bottom: '7%', border: '1px solid #4A6741', opacity: 0.3 }} />

      {logoUrl && (
        <img src={logoUrl} alt="logo" style={{ height: '60px', maxWidth: '20%', objectFit: 'contain', marginBottom: '2%' }} />
      )}
      <div style={{
        fontSize: '0.9cqw',
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        color: '#4A6741',
        marginBottom: '1%',
        fontWeight: 'bold',
      }}>
        ✿ Certificate of Achievement ✿
      </div>

      <div style={{ fontSize: '1cqw', color: '#5C6E54', fontStyle: 'italic', marginBottom: '2%' }}>
        This certificate is proudly presented to
      </div>

      <div style={{
        fontSize: '3.4cqw',
        fontFamily: '"Dancing Script", cursive',
        color: '#2D3E26',
        margin: '0.5% 0 1.5%',
        lineHeight: 1.1,
      }}>
        {recipientName || 'Recipient Name'}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '1% 0 2%' }}>
        <div style={{ width: '40px', height: '1px', background: '#4A6741' }} />
        <span style={{ color: '#4A6741', fontSize: '1.2cqw' }}>❦</span>
        <div style={{ width: '40px', height: '1px', background: '#4A6741' }} />
      </div>

      <div style={{ fontSize: '1.15cqw', color: '#5C6E54', maxWidth: '70%', lineHeight: 1.6, marginBottom: '2%' }}>
        In recognition of completing
        <div style={{ fontSize: '1.8cqw', color: '#2D3E26', marginTop: '0.5%', fontStyle: 'italic' }}>
          {event || 'Event Name'}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginTop: 'auto', marginBottom: '3%' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5cqw', fontFamily: '"Dancing Script", cursive', color: '#2D3E26' }}>
            {signature || issuer || 'Issuer'}
          </div>
          <div style={{ width: '100%', height: '1px', background: '#4A6741', margin: '4px 0' }} />
          <div style={{ fontSize: '0.8cqw', color: '#5C6E54' }}>{issuer || 'Issuing Authority'}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1cqw', color: '#2D3E26' }}>{date || 'Date'}</div>
          <div style={{ width: '100%', height: '1px', background: '#4A6741', margin: '4px 0' }} />
          <div style={{ fontSize: '0.8cqw', color: '#5C6E54' }}>Date</div>
        </div>
      </div>
    </div>
  );
}

export default Botanical;
