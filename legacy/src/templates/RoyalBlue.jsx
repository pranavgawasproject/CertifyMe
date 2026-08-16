// Template 2: Royal Blue — deep blue background with gold accents
function RoyalBlue({ data, logoUrl }) {
  const { recipientName, event, date, issuer, signature } = data;
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #0c1e4e 0%, #1e3a8a 50%, #0c1e4e 100%)',
      position: 'relative',
      padding: '4%',
      boxSizing: 'border-box',
      fontFamily: 'Georgia, serif',
      color: '#F5E6C8',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      overflow: 'hidden',
    }}>
      {/* Double border */}
      <div style={{ position: 'absolute', top: '2.5%', left: '2.5%', right: '2.5%', bottom: '2.5%', border: '2px solid #D4AF37' }} />
      <div style={{ position: 'absolute', top: '3.5%', left: '3.5%', right: '3.5%', bottom: '3.5%', border: '1px solid rgba(212, 175, 55, 0.5)' }} />

      {/* Top emblem */}
      <div style={{
        fontSize: '2.8cqw',
        marginBottom: '1%',
      }}>✦</div>

      {logoUrl && (
        <img src={logoUrl} alt="logo" style={{ height: '60px', maxWidth: '20%', objectFit: 'contain', marginBottom: '2%' }} />
      )}
      <div style={{
        fontSize: '1.5cqw',
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        color: '#D4AF37',
        marginBottom: '0.5%',
        fontWeight: 'bold',
      }}>
        Certificate of Achievement
      </div>
      <div style={{ width: '15%', height: '2px', background: '#D4AF37', margin: '0.5% 0 3%' }} />

      <div style={{ fontSize: '1.1cqw', opacity: 0.85, marginBottom: '1%' }}>This certifies that</div>

      <div style={{
        fontSize: '3.4cqw',
        color: '#FFFFFF',
        fontWeight: 'bold',
        margin: '0.5% 0 1.5%',
        textShadow: '0 2px 10px rgba(0,0,0,0.5)',
        lineHeight: 1.1,
      }}>
        {recipientName || 'Recipient Name'}
      </div>

      <div style={{ width: '60%', height: '1px', background: 'linear-gradient(to right, transparent, #D4AF37, transparent)', margin: '1% 0' }} />

      <div style={{ fontSize: '1.15cqw', opacity: 0.9, maxWidth: '70%', lineHeight: 1.6, marginBottom: '2%' }}>
        has successfully completed
        <div style={{ fontSize: '1.8cqw', color: '#D4AF37', marginTop: '0.5%', fontStyle: 'italic' }}>
          {event || 'Event Name'}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginTop: 'auto', marginBottom: '4%' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.4cqw', fontFamily: '"Dancing Script", cursive', color: '#D4AF37' }}>
            {signature || issuer || 'Issuer'}
          </div>
          <div style={{ width: '100%', height: '1px', background: '#D4AF37', margin: '4px 0' }} />
          <div style={{ fontSize: '0.85cqw', opacity: 0.7 }}>{issuer || 'Issuing Authority'}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1cqw', color: '#D4AF37' }}>{date || 'Date'}</div>
          <div style={{ width: '100%', height: '1px', background: '#D4AF37', margin: '4px 0' }} />
          <div style={{ fontSize: '0.85cqw', opacity: 0.7 }}>Date</div>
        </div>
      </div>
    </div>
  );
}

export default RoyalBlue;
