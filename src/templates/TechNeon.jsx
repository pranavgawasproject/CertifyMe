// Template 8: Tech Neon — dark with neon cyan/magenta glow
function TechNeon({ data, logoUrl }) {
  const { recipientName, event, date, issuer, signature } = data;
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'radial-gradient(ellipse at center, #0a0e27 0%, #03050f 100%)',
      position: 'relative',
      padding: '5%',
      boxSizing: 'border-box',
      fontFamily: '"JetBrains Mono", "Courier New", monospace',
      color: '#06B6D4',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      overflow: 'hidden',
    }}>
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.08) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      {/* Glowing orbs */}
      <div style={{
        position: 'absolute', top: '15%', left: '20%',
        width: '20%', height: '30%',
        background: '#06B6D4',
        borderRadius: '50%',
        filter: 'blur(80px)',
        opacity: 0.4,
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', right: '20%',
        width: '20%', height: '30%',
        background: '#EC4899',
        borderRadius: '50%',
        filter: 'blur(80px)',
        opacity: 0.4,
      }} />

      {/* Border with neon glow */}
      <div style={{
        position: 'absolute', top: '4%', left: '4%', right: '4%', bottom: '4%',
        border: '1px solid #06B6D4',
        boxShadow: '0 0 20px rgba(6, 182, 212, 0.5), inset 0 0 20px rgba(6, 182, 212, 0.1)',
      }} />

      {/* Corner brackets */}
      {[
        { top: '5%', left: '5%', borderTop: '2px solid #06B6D4', borderLeft: '2px solid #06B6D4' },
        { top: '5%', right: '5%', borderTop: '2px solid #EC4899', borderRight: '2px solid #EC4899' },
        { bottom: '5%', left: '5%', borderBottom: '2px solid #EC4899', borderLeft: '2px solid #EC4899' },
        { bottom: '5%', right: '5%', borderBottom: '2px solid #06B6D4', borderRight: '2px solid #06B6D4' },
      ].map((style, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: '30px', height: '30px',
          ...style,
        }} />
      ))}

      {logoUrl && (
        <img src={logoUrl} alt="logo" style={{ height: '60px', maxWidth: '20%', objectFit: 'contain', marginBottom: '2%' }} />
      )}
      <div style={{
        fontSize: '0.9cqw',
        letterSpacing: '0.5em',
        textTransform: 'uppercase',
        color: '#06B6D4',
        marginBottom: '3%',
        textShadow: '0 0 10px #06B6D4',
      }}>
        {'// Certificate of Achievement'}
      </div>

      <div style={{ fontSize: '1cqw', color: '#EC4899', marginBottom: '1.5%', textShadow: '0 0 8px #EC4899' }}>
        {'> awarded to'}
      </div>

      <div style={{
        fontSize: '3.4cqw',
        fontWeight: 700,
        color: '#FFFFFF',
        margin: '0.5% 0 1.5%',
        lineHeight: 1.1,
        textShadow: '0 0 20px #06B6D4, 0 0 40px #06B6D4',
      }}>
        {recipientName || 'Recipient Name'}
      </div>

      <div style={{
        fontSize: '1.15cqw',
        color: '#94A3B8',
        maxWidth: '65%',
        lineHeight: 1.6,
        marginBottom: '2%',
      }}>
        {'for successfully completing'}
        <div style={{ fontSize: '1.6cqw', color: '#EC4899', marginTop: '0.5%', textShadow: '0 0 12px #EC4899', fontWeight: 700 }}>
          {event || 'Event Name'}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginTop: 'auto' }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '1.3cqw', color: '#FFFFFF', fontFamily: 'monospace' }}>
            {'<'}{signature || issuer || 'Issuer'}{'/>'}
          </div>
          <div style={{ width: '120px', height: '1px', background: '#06B6D4', margin: '6px 0 4px', boxShadow: '0 0 6px #06B6D4' }} />
          <div style={{ fontSize: '0.8cqw', color: '#64748B' }}>{issuer || 'Issuing Authority'}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1cqw', color: '#FFFFFF', fontFamily: 'monospace' }}>{date || 'Date'}</div>
          <div style={{ width: '120px', height: '1px', background: '#EC4899', margin: '6px 0 4px', marginLeft: 'auto', boxShadow: '0 0 6px #EC4899' }} />
          <div style={{ fontSize: '0.8cqw', color: '#64748B' }}>Date</div>
        </div>
      </div>
    </div>
  );
}

export default TechNeon;
