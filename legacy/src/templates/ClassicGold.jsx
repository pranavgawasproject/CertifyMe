// Template 1: Classic Gold — black background with ornate gold border
function ClassicGold({ data, logoUrl }) {
  const { recipientName, event, date, issuer, signature } = data;
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      position: 'relative',
      padding: '3%',
      boxSizing: 'border-box',
      fontFamily: 'Georgia, serif',
      color: '#B8860B',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      overflow: 'hidden',
    }}>
      {/* Ornate border */}
      <div style={{
        position: 'absolute',
        top: '2%', left: '2%', right: '2%', bottom: '2%',
        border: '3px solid #B8860B',
        boxShadow: 'inset 0 0 0 6px #0a0a0a, inset 0 0 0 8px #B8860B',
      }} />
      <div style={{
        position: 'absolute',
        top: '4%', left: '4%', right: '4%', bottom: '4%',
        border: '1px solid rgba(184, 134, 11, 0.5)',
      }} />

      {/* Corner flourishes */}
      {['top:5%;left:5%', 'top:5%;right:5%', 'bottom:5%;left:5%', 'bottom:5%;right:5%'].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute',
          ...Object.fromEntries(pos.split(';').map(s => {
            const [k, v] = s.split(':');
            return [k.trim(), v.trim()];
          })),
          fontSize: '2.4cqw',
          color: '#B8860B',
          lineHeight: 1,
        }}>❖</div>
      ))}

      {logoUrl && (
        <img src={logoUrl} alt="logo" style={{ height: '60px', maxWidth: '20%', objectFit: 'contain', marginBottom: '2%' }} />
      )}
      <div style={{ fontSize: '1.4cqw', letterSpacing: '0.4em', marginBottom: '0.5%', textTransform: 'uppercase', opacity: 0.85 }}>
        Certificate of Achievement
      </div>
      <div style={{ width: '20%', height: '2px', background: '#B8860B', margin: '0.5% 0 2%' }} />

      <div style={{ fontSize: '1.1cqw', opacity: 0.8, marginBottom: '1%' }}>This is proudly presented to</div>

      <div style={{
        fontSize: '3.6cqw',
        fontFamily: '"Dancing Script", cursive',
        color: '#FFD700',
        textShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
        margin: '0.5% 0 1%',
        lineHeight: 1.1,
      }}>
        {recipientName || 'Recipient Name'}
      </div>

      <div style={{ width: '50%', height: '1px', background: 'linear-gradient(to right, transparent, #B8860B, transparent)', margin: '1% 0' }} />

      <div style={{ fontSize: '1.2cqw', opacity: 0.9, maxWidth: '70%', lineHeight: 1.5, marginBottom: '2%' }}>
        for outstanding accomplishment in
        <div style={{ fontSize: '1.8cqw', color: '#FFD700', marginTop: '0.5%', fontStyle: 'italic' }}>
          {event || 'Event Name'}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginTop: 'auto', marginBottom: '3%' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.6cqw', fontFamily: '"Dancing Script", cursive', color: '#FFD700' }}>
            {signature || issuer || 'Issuer'}
          </div>
          <div style={{ width: '100%', height: '1px', background: '#B8860B', margin: '4px 0' }} />
          <div style={{ fontSize: '0.85cqw', opacity: 0.7 }}>{issuer || 'Issuing Authority'}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.1cqw', color: '#FFD700' }}>{date || 'Date'}</div>
          <div style={{ width: '100%', height: '1px', background: '#B8860B', margin: '4px 0' }} />
          <div style={{ fontSize: '0.85cqw', opacity: 0.7 }}>Date</div>
        </div>
      </div>
    </div>
  );
}

export default ClassicGold;
