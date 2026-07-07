// Template 9: Marble Noir — black marble with luxurious gold
function MarbleBlack({ data, logoUrl }) {
  const { recipientName, event, date, issuer, signature } = data;
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #0d0d0d 50%, #1f1f1f 75%, #0a0a0a 100%)',
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
      {/* Marble veins */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          linear-gradient(110deg, transparent 30%, rgba(212, 175, 55, 0.06) 35%, transparent 40%),
          linear-gradient(70deg, transparent 60%, rgba(212, 175, 55, 0.04) 65%, transparent 70%),
          linear-gradient(150deg, transparent 20%, rgba(255, 255, 255, 0.03) 25%, transparent 30%)
        `,
        pointerEvents: 'none',
      }} />

      {/* Gold border */}
      <div style={{
        position: 'absolute', top: '3%', left: '3%', right: '3%', bottom: '3%',
        border: '2px solid #D4AF37',
        boxShadow: 'inset 0 0 0 4px #0a0a0a, inset 0 0 0 5px rgba(212, 175, 55, 0.5)',
      }} />
      <div style={{
        position: 'absolute', top: '5%', left: '5%', right: '5%', bottom: '5%',
        border: '1px solid rgba(212, 175, 55, 0.4)',
      }} />

      {/* Corner ornaments */}
      {[
        { top: '6%', left: '6%' },
        { top: '6%', right: '6%' },
        { bottom: '6%', left: '6%' },
        { bottom: '6%', right: '6%' },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute',
          fontSize: '1.8vw',
          color: '#D4AF37',
          ...pos,
        }}>◈</div>
      ))}

      {logoUrl && (
        <img src={logoUrl} alt="logo" style={{ height: '60px', maxWidth: '20%', objectFit: 'contain', marginBottom: '2%' }} />
      )}
      <div style={{
        fontSize: '0.9vw',
        letterSpacing: '0.5em',
        textTransform: 'uppercase',
        color: '#D4AF37',
        marginBottom: '2%',
        fontWeight: 'bold',
      }}>
        Certificate of Excellence
      </div>

      <div style={{ width: '15%', height: '1px', background: '#D4AF37', margin: '1% 0 3%' }} />

      <div style={{ fontSize: '1vw', color: '#BFA181', fontStyle: 'italic', marginBottom: '1.5%' }}>
        Presented with distinction to
      </div>

      <div style={{
        fontSize: '3.6vw',
        fontWeight: 'bold',
        color: '#FFFFFF',
        margin: '0.5% 0 1.5%',
        lineHeight: 1.1,
        textShadow: '0 2px 20px rgba(212, 175, 55, 0.4)',
      }}>
        {recipientName || 'Recipient Name'}
      </div>

      <div style={{ width: '50%', height: '1px', background: 'linear-gradient(to right, transparent, #D4AF37, transparent)', margin: '1% 0' }} />

      <div style={{ fontSize: '1.15vw', color: '#BFA181', maxWidth: '65%', lineHeight: 1.6, marginBottom: '2%' }}>
        for distinguished achievement in
        <div style={{ fontSize: '1.7vw', color: '#D4AF37', marginTop: '0.5%', fontStyle: 'italic' }}>
          {event || 'Event Name'}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginTop: 'auto', marginBottom: '3%' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5vw', fontFamily: '"Dancing Script", cursive', color: '#D4AF37' }}>
            {signature || issuer || 'Issuer'}
          </div>
          <div style={{ width: '100%', height: '1px', background: '#D4AF37', margin: '4px 0' }} />
          <div style={{ fontSize: '0.8vw', color: '#BFA181' }}>{issuer || 'Issuing Authority'}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1vw', color: '#D4AF37' }}>{date || 'Date'}</div>
          <div style={{ width: '100%', height: '1px', background: '#D4AF37', margin: '4px 0' }} />
          <div style={{ fontSize: '0.8vw', color: '#BFA181' }}>Date</div>
        </div>
      </div>
    </div>
  );
}

export default MarbleBlack;
