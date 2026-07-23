// Template 15: Crimson Heritage — Harvard-style red formal
function CrimsonHeritage({ data, logoUrl }) {
  const { recipientName, event, date, issuer, signature } = data;
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#FFFEF7',
      position: 'relative', padding: '5%', boxSizing: 'border-box',
      fontFamily: 'Georgia, serif', color: '#1A1A1A',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      textAlign: 'center', overflow: 'hidden',
    }}>
      {/* Crimson border with crest */}
      <div style={{ position: 'absolute', top: '3%', left: '3%', right: '3%', bottom: '3%', border: '4px solid #8B0000' }} />
      <div style={{ position: 'absolute', top: '4.5%', left: '4.5%', right: '4.5%', bottom: '4.5%', border: '1px solid #8B0000' }} />

      {/* Top crimson band */}
      <div style={{
        position: 'absolute', top: '3%', left: '3%', right: '3%', height: '70px',
        background: '#8B0000',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          fontSize: '1cqw', letterSpacing: '0.4em', textTransform: 'uppercase',
          color: '#FFFEF7', fontWeight: 'bold',
        }}>
          CertifyMe · Est. 2026
        </div>
      </div>

      {/* Bottom crimson band */}
      <div style={{
        position: 'absolute', bottom: '3%', left: '3%', right: '3%', height: '40px',
        background: '#8B0000',
      }} />

      {logoUrl && (
        <img src={logoUrl} alt="logo" style={{ height: '70px', maxWidth: '20%', objectFit: 'contain', marginBottom: '2%', marginTop: '60px' }} />
      )}

      <div style={{
        fontSize: '1.5cqw', letterSpacing: '0.3em', textTransform: 'uppercase',
        color: '#8B0000', marginBottom: '1%', fontWeight: 'bold', marginTop: logoUrl ? '0' : '60px',
      }}>
        Certificate of Achievement
      </div>

      <div style={{ width: '15%', height: '2px', background: '#8B0000', margin: '1% 0 3%' }} />

      <div style={{ fontSize: '1.05cqw', color: '#4A4A4A', fontStyle: 'italic', marginBottom: '1.5%' }}>
        This is to certify that
      </div>

      <div style={{
        fontSize: '3.4cqw', fontWeight: 'bold', color: '#1A1A1A',
        margin: '0.5% 0 1.5%', lineHeight: 1.1,
      }}>
        {recipientName || 'Recipient Name'}
      </div>

      <div style={{ width: '50%', height: '1px', background: '#8B0000', margin: '1% 0', opacity: 0.5 }} />

      <div style={{ fontSize: '1.1cqw', color: '#4A4A4A', maxWidth: '65%', lineHeight: 1.6, marginBottom: '2%' }}>
        has honorably completed the requirements for
        <div style={{ fontSize: '1.7cqw', color: '#8B0000', marginTop: '0.5%', fontStyle: 'italic', fontWeight: 'bold' }}>
          {event || 'Event Name'}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginTop: 'auto', marginBottom: '50px' }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '1.5cqw', fontFamily: '"Dancing Script", cursive', color: '#8B0000' }}>
            {signature || issuer || 'Issuer'}
          </div>
          <div style={{ width: '140px', height: '2px', background: '#8B0000', margin: '6px 0 4px' }} />
          <div style={{ fontSize: '0.75cqw', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4A4A4A' }}>
            {issuer || 'Issuing Authority'}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.1cqw', color: '#8B0000', fontWeight: 'bold' }}>{date || 'Date'}</div>
          <div style={{ width: '140px', height: '2px', background: '#8B0000', margin: '6px 0 4px', marginLeft: 'auto' }} />
          <div style={{ fontSize: '0.75cqw', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4A4A4A' }}>Date</div>
        </div>
      </div>
    </div>
  );
}

export default CrimsonHeritage;
