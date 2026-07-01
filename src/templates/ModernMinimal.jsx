// Template 3: Modern Minimal — white with thin accent line
function ModernMinimal({ data, logoUrl }) {
  const { recipientName, event, date, issuer, signature } = data;
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#FAFAFA',
      position: 'relative',
      padding: '6%',
      boxSizing: 'border-box',
      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
      color: '#0F172A',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      overflow: 'hidden',
    }}>
      {/* Minimal accent line top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '8px', background: '#0F172A' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '8px', background: '#0F172A' }} />

      {logoUrl && (
        <img src={logoUrl} alt="logo" style={{ height: '60px', maxWidth: '20%', objectFit: 'contain', marginBottom: '2%' }} />
      )}
      <div style={{
        fontSize: '0.9vw',
        letterSpacing: '0.5em',
        textTransform: 'uppercase',
        color: '#64748B',
        marginBottom: '4%',
        fontWeight: 500,
      }}>
        Certificate of Achievement
      </div>

      <div style={{
        fontSize: '3.6vw',
        fontWeight: 800,
        letterSpacing: '-0.02em',
        margin: '1% 0 0.5%',
        lineHeight: 1.1,
        background: 'linear-gradient(135deg, #0F172A 0%, #475569 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        {recipientName || 'Recipient Name'}
      </div>

      <div style={{ width: '40px', height: '3px', background: '#0F172A', margin: '2% 0' }} />

      <div style={{ fontSize: '1.1vw', color: '#475569', maxWidth: '65%', lineHeight: 1.6, marginBottom: '3%' }}>
        has successfully completed the requirements for
        <div style={{ fontSize: '1.6vw', color: '#0F172A', marginTop: '1%', fontWeight: 600 }}>
          {event || 'Event Name'}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginTop: 'auto' }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '1.4vw', fontWeight: 300, color: '#0F172A', fontStyle: 'italic' }}>
            {signature || issuer || 'Issuer'}
          </div>
          <div style={{ width: '120px', height: '1px', background: '#0F172A', margin: '6px 0 4px' }} />
          <div style={{ fontSize: '0.75vw', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748B' }}>
            {issuer || 'Issuing Authority'}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.1vw', color: '#0F172A', fontWeight: 500 }}>{date || 'Date'}</div>
          <div style={{ width: '120px', height: '1px', background: '#0F172A', margin: '6px 0 4px', marginLeft: 'auto' }} />
          <div style={{ fontSize: '0.75vw', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748B' }}>Date</div>
        </div>
      </div>
    </div>
  );
}

export default ModernMinimal;
