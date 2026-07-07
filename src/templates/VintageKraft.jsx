// Template 6: Vintage Kraft — kraft paper texture with retro stamp
function VintageKraft({ data, logoUrl }) {
  const { recipientName, event, date, issuer, signature } = data;
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #d4a574 0%, #c4956a 50%, #b8855a 100%)',
      position: 'relative',
      padding: '4%',
      boxSizing: 'border-box',
      fontFamily: 'Georgia, serif',
      color: '#3D2817',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      overflow: 'hidden',
    }}>
      {/* Paper texture overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(60, 40, 20, 0.03) 2px, rgba(60, 40, 20, 0.03) 4px)',
        pointerEvents: 'none',
      }} />

      {/* Border - dashed vintage */}
      <div style={{ position: 'absolute', top: '3%', left: '3%', right: '3%', bottom: '3%', border: '3px dashed #5C3A1F', opacity: 0.7 }} />
      <div style={{ position: 'absolute', top: '4.5%', left: '4.5%', right: '4.5%', bottom: '4.5%', border: '1px solid #5C3A1F', opacity: 0.4 }} />

      {/* Top banner */}
      {logoUrl && (
        <img src={logoUrl} alt="logo" style={{ height: '60px', maxWidth: '20%', objectFit: 'contain', marginBottom: '2%' }} />
      )}
      <div style={{
        fontSize: '0.9vw',
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        color: '#5C3A1F',
        marginBottom: '1%',
        fontWeight: 'bold',
        padding: '4px 20px',
        borderBottom: '2px double #5C3A1F',
        borderTop: '2px double #5C3A1F',
      }}>
        ⋆ Certificate of Achievement ⋆
      </div>

      <div style={{ fontSize: '1vw', color: '#5C3A1F', fontStyle: 'italic', margin: '2% 0 1%' }}>
        ~ This is to certify that ~
      </div>

      <div style={{
        fontSize: '3.4vw',
        fontFamily: '"Dancing Script", cursive',
        color: '#3D2817',
        margin: '0.5% 0 1.5%',
        lineHeight: 1.1,
      }}>
        {recipientName || 'Recipient Name'}
      </div>

      <div style={{ width: '50%', height: '1px', background: '#5C3A1F', margin: '1% 0', opacity: 0.5 }} />

      <div style={{ fontSize: '1.15vw', color: '#3D2817', maxWidth: '70%', lineHeight: 1.6, marginBottom: '2%' }}>
        has honorably completed
        <div style={{ fontSize: '1.8vw', color: '#5C3A1F', marginTop: '0.5%', fontStyle: 'italic' }}>
          {event || 'Event Name'}
        </div>
      </div>

      {/* Stamp */}
      <div style={{
        position: 'absolute',
        right: '12%',
        bottom: '20%',
        border: '3px solid #8B0000',
        color: '#8B0000',
        padding: '6px 14px',
        fontSize: '0.8vw',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        transform: 'rotate(-15deg)',
        opacity: 0.7,
        letterSpacing: '0.15em',
      }}>
        ✓ Verified
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginTop: 'auto', marginBottom: '3%' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5vw', fontFamily: '"Dancing Script", cursive', color: '#3D2817' }}>
            {signature || issuer || 'Issuer'}
          </div>
          <div style={{ width: '100%', height: '1px', background: '#5C3A1F', margin: '4px 0', opacity: 0.6 }} />
          <div style={{ fontSize: '0.8vw', color: '#5C3A1F' }}>{issuer || 'Issuing Authority'}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1vw', color: '#3D2817' }}>{date || 'Date'}</div>
          <div style={{ width: '100%', height: '1px', background: '#5C3A1F', margin: '4px 0', opacity: 0.6 }} />
          <div style={{ fontSize: '0.8vw', color: '#5C3A1F' }}>Date</div>
        </div>
      </div>
    </div>
  );
}

export default VintageKraft;
