// @ts-nocheck — presentational template ported verbatim from Vite source.
import type { TemplateProps } from '@/lib/types';

// Template 20: Royal Purple — purple with silver accents
function RoyalPurple({ data, logoUrl }: TemplateProps) {
  const { recipientName, event, date, issuer, signature } = data;
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(135deg, #2e1065 0%, #4c1d95 30%, #5b21b6 60%, #4c1d95 100%)',
      position: 'relative', padding: '5%', boxSizing: 'border-box',
      fontFamily: 'Georgia, serif', color: '#E9D5FF',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      textAlign: 'center', overflow: 'hidden',
    }}>
      {/* Silver ornate border */}
      <div style={{
        position: 'absolute', top: '3%', left: '3%', right: '3%', bottom: '3%',
        border: '3px solid #C0C0C0',
        boxShadow: 'inset 0 0 0 4px transparent, inset 0 0 0 5px rgba(192, 192, 192, 0.4)',
      }} />
      <div style={{ position: 'absolute', top: '5%', left: '5%', right: '5%', bottom: '5%', border: '1px solid rgba(192, 192, 192, 0.5)' }} />

      {/* Corner crowns */}
      {[
        { top: '6%', left: '6%' },
        { top: '6%', right: '6%' },
        { bottom: '6%', left: '6%' },
        { bottom: '6%', right: '6%' },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute', fontSize: '1.4cqw', color: '#C0C0C0', ...pos,
        }}>♛</div>
      ))}

      {/* Top crown emblem */}
      <div style={{ fontSize: '2.5cqw', marginBottom: '1%' }}>👑</div>

      {logoUrl && (
        <img src={logoUrl} alt="logo" style={{ height: '60px', maxWidth: '20%', objectFit: 'contain', marginBottom: '2%' }} />
      )}

      <div style={{
        fontSize: '0.95cqw', letterSpacing: '0.5em', textTransform: 'uppercase',
        color: '#C0C0C0', marginBottom: '2%', fontWeight: 'bold',
      }}>
        Royal Certificate of Achievement
      </div>

      <div style={{ width: '15%', height: '2px', background: '#C0C0C0', margin: '1% 0 3%' }} />

      <div style={{ fontSize: '1.05cqw', color: '#C4B5FD', fontStyle: 'italic', marginBottom: '1.5%' }}>
        By royal decree, presented to
      </div>

      <div style={{
        fontSize: '3.4cqw', fontWeight: 'bold', color: '#FFFFFF',
        margin: '0.5% 0 1.5%', lineHeight: 1.1,
        textShadow: '0 0 20px rgba(192, 192, 192, 0.4)',
      }}>
        {recipientName || 'Recipient Name'}
      </div>

      <div style={{ width: '50%', height: '1px', background: 'linear-gradient(to right, transparent, #C0C0C0, transparent)', margin: '1% 0' }} />

      <div style={{ fontSize: '1.1cqw', color: '#C4B5FD', maxWidth: '65%', lineHeight: 1.6, marginBottom: '2%' }}>
        for distinguished achievement in
        <div style={{ fontSize: '1.7cqw', color: '#C0C0C0', marginTop: '0.5%', fontStyle: 'italic' }}>
          {event || 'Event Name'}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginTop: 'auto', marginBottom: '3%' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.4cqw', fontFamily: '"Dancing Script", cursive', color: '#C0C0C0' }}>
            {signature || issuer || 'Issuer'}
          </div>
          <div style={{ width: '100%', height: '1px', background: '#C0C0C0', margin: '4px 0' }} />
          <div style={{ fontSize: '0.8cqw', color: '#C4B5FD' }}>{issuer || 'Issuing Authority'}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1cqw', color: '#C0C0C0' }}>{date || 'Date'}</div>
          <div style={{ width: '100%', height: '1px', background: '#C0C0C0', margin: '4px 0' }} />
          <div style={{ fontSize: '0.8cqw', color: '#C4B5FD' }}>Date</div>
        </div>
      </div>
    </div>
  );
}

export default RoyalPurple;
