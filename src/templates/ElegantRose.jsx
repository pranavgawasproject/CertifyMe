// Template 7: Elegant Rose — soft rose with elegant script typography
function ElegantRose({ data, logoUrl }) {
  const { recipientName, event, date, issuer, signature } = data;
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #fff5f7 0%, #ffe4e9 50%, #ffd1dc 100%)',
      position: 'relative',
      padding: '5%',
      boxSizing: 'border-box',
      fontFamily: 'Georgia, serif',
      color: '#831843',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      overflow: 'hidden',
    }}>
      {/* Decorative border */}
      <div style={{ position: 'absolute', top: '4%', left: '4%', right: '4%', bottom: '4%', border: '1px solid #BE185D', opacity: 0.5 }} />
      <div style={{ position: 'absolute', top: '5.5%', left: '5.5%', right: '5.5%', bottom: '5.5%', border: '1px solid #BE185D', opacity: 0.3 }} />

      {/* Corner roses */}
      {[
        { top: '5%', left: '5%' },
        { top: '5%', right: '5%' },
        { bottom: '5%', left: '5%' },
        { bottom: '5%', right: '5%' },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute',
          fontSize: '1.8vw',
          color: '#BE185D',
          opacity: 0.6,
          ...pos,
        }}>❀</div>
      ))}

      {logoUrl && (
        <img src={logoUrl} alt="logo" style={{ height: '60px', maxWidth: '20%', objectFit: 'contain', marginBottom: '2%' }} />
      )}
      <div style={{
        fontSize: '1vw',
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        color: '#BE185D',
        marginBottom: '2%',
        fontWeight: 'normal',
        fontStyle: 'italic',
      }}>
        ~ Certificate of Achievement ~
      </div>

      <div style={{ fontSize: '1.1vw', color: '#9D174D', fontStyle: 'italic', marginBottom: '2%' }}>
        With great pleasure, presented to
      </div>

      <div style={{
        fontSize: '4vw',
        fontFamily: '"Dancing Script", cursive',
        color: '#831843',
        margin: '0.5% 0 1.5%',
        lineHeight: 1.1,
        textShadow: '0 2px 8px rgba(190, 24, 93, 0.15)',
      }}>
        {recipientName || 'Recipient Name'}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '1% 0 2%' }}>
        <div style={{ width: '50px', height: '1px', background: '#BE185D' }} />
        <span style={{ color: '#BE185D', fontSize: '1.2vw' }}>♥</span>
        <div style={{ width: '50px', height: '1px', background: '#BE185D' }} />
      </div>

      <div style={{ fontSize: '1.15vw', color: '#9D174D', maxWidth: '65%', lineHeight: 1.6, marginBottom: '2%', fontStyle: 'italic' }}>
        In graceful recognition of
        <div style={{ fontSize: '1.7vw', color: '#831843', marginTop: '0.5%', fontFamily: 'Georgia, serif', fontStyle: 'normal', fontWeight: 'bold' }}>
          {event || 'Event Name'}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginTop: 'auto', marginBottom: '3%' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.6vw', fontFamily: '"Dancing Script", cursive', color: '#831843' }}>
            {signature || issuer || 'Issuer'}
          </div>
          <div style={{ width: '100%', height: '1px', background: '#BE185D', margin: '4px 0', opacity: 0.6 }} />
          <div style={{ fontSize: '0.8vw', color: '#9D174D' }}>{issuer || 'Issuing Authority'}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1vw', color: '#831843' }}>{date || 'Date'}</div>
          <div style={{ width: '100%', height: '1px', background: '#BE185D', margin: '4px 0', opacity: 0.6 }} />
          <div style={{ fontSize: '0.8vw', color: '#9D174D' }}>Date</div>
        </div>
      </div>
    </div>
  );
}

export default ElegantRose;
