// Template 11: Corporate Navy — professional navy with crisp white
function NavyCorporate({ data, logoUrl }) {
  const { recipientName, event, date, issuer, signature } = data;
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#FFFFFF',
      position: 'relative',
      padding: '5%',
      boxSizing: 'border-box',
      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
      color: '#1E293B',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      overflow: 'hidden',
    }}>
      {/* Navy top and bottom bands */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '60px', background: '#1E293B' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: '#1E293B' }} />
      {/* Side rails connecting the bands into a full frame */}
      <div style={{ position: 'absolute', top: '60px', bottom: '60px', left: 0, width: '10px', background: '#1E293B' }} />
      <div style={{ position: 'absolute', top: '60px', bottom: '60px', right: 0, width: '10px', background: '#1E293B' }} />
      <div style={{ position: 'absolute', top: '78px', left: '24px', right: '24px', bottom: '78px', border: '1px solid #CBD5E1' }} />

      {/* Inner accent stripes */}
      <div style={{ position: 'absolute', top: '60px', left: 0, right: 0, height: '4px', background: '#3B82F6' }} />
      <div style={{ position: 'absolute', bottom: '60px', left: 0, right: 0, height: '4px', background: '#3B82F6' }} />

      {/* Logo placeholder */}
      <div style={{
        position: 'absolute',
        top: '18px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#FFFFFF',
        fontSize: '0.9vw',
        fontWeight: 700,
        letterSpacing: '0.2em',
      }}>
        CERTIFYME
      </div>

      <div style={{ position: 'absolute', bottom: '18px', left: '50%', transform: 'translateX(-50%)', color: '#94A3B8', fontSize: '0.7vw', letterSpacing: '0.15em' }}>
        OFFICIAL CERTIFICATE OF COMPLETION
      </div>

      {logoUrl && (
        <img src={logoUrl} alt="logo" style={{ height: '60px', maxWidth: '20%', objectFit: 'contain', marginBottom: '2%' }} />
      )}
      <div style={{
        fontSize: '0.95vw',
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        color: '#3B82F6',
        marginBottom: '2%',
        fontWeight: 700,
      }}>
        Certificate of Achievement
      </div>

      <div style={{ fontSize: '1vw', color: '#64748B', marginBottom: '1.5%' }}>
        This is to certify that
      </div>

      <div style={{
        fontSize: '3.4vw',
        fontWeight: 800,
        color: '#1E293B',
        margin: '0.5% 0 1.5%',
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
      }}>
        {recipientName || 'Recipient Name'}
      </div>

      <div style={{ width: '120px', height: '3px', background: '#3B82F6', margin: '1% 0 2%' }} />

      <div style={{ fontSize: '1.1vw', color: '#475569', maxWidth: '65%', lineHeight: 1.6, marginBottom: '2%' }}>
        has successfully met all requirements for
        <div style={{ fontSize: '1.6vw', color: '#1E293B', marginTop: '0.5%', fontWeight: 700 }}>
          {event || 'Event Name'}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginTop: 'auto', marginBottom: '40px' }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '1.3vw', color: '#1E293B', fontWeight: 600, fontStyle: 'italic' }}>
            {signature || issuer || 'Issuer'}
          </div>
          <div style={{ width: '140px', height: '2px', background: '#1E293B', margin: '6px 0 4px' }} />
          <div style={{ fontSize: '0.75vw', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#64748B' }}>
            {issuer || 'Issuing Authority'}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1vw', color: '#1E293B', fontWeight: 600 }}>{date || 'Date'}</div>
          <div style={{ width: '140px', height: '2px', background: '#1E293B', margin: '6px 0 4px', marginLeft: 'auto' }} />
          <div style={{ fontSize: '0.75vw', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#64748B' }}>Date</div>
        </div>
      </div>
    </div>
  );
}

export default NavyCorporate;
