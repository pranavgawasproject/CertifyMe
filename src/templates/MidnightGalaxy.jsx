// Template 13: Midnight Galaxy — dark space theme with stars
function MidnightGalaxy({ data, logoUrl }) {
  const { recipientName, event, date, issuer, signature } = data;
  // Generate deterministic star positions
  const stars = Array.from({ length: 50 }, (_, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const r = seed / 233280;
    const r2 = ((i * 17 + 23) % 100) / 100;
    return {
      top: `${(r * 100).toFixed(2)}%`,
      left: `${(r2 * 100).toFixed(2)}%`,
      size: 1 + (i % 3),
      opacity: 0.3 + (i % 5) * 0.14,
    };
  });

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'radial-gradient(ellipse at top, #1e1b4b 0%, #0c0a1e 60%, #000000 100%)',
      position: 'relative', padding: '5%', boxSizing: 'border-box',
      fontFamily: 'Georgia, serif', color: '#E0E7FF',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      textAlign: 'center', overflow: 'hidden',
    }}>
      {/* Stars */}
      {stars.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', top: s.top, left: s.left,
          width: `${s.size}px`, height: `${s.size}px`,
          background: '#FFFFFF', borderRadius: '50%', opacity: s.opacity,
        }} />
      ))}

      {/* Moon/planet glow */}
      <div style={{
        position: 'absolute', top: '15%', right: '15%',
        width: '120px', height: '120px', borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #fef3c7, #f59e0b 50%, transparent 70%)',
        opacity: 0.6, filter: 'blur(2px)',
      }} />

      {/* Border */}
      <div style={{
        position: 'absolute', top: '4%', left: '4%', right: '4%', bottom: '4%',
        border: '1px solid rgba(167, 139, 250, 0.4)',
        boxShadow: '0 0 30px rgba(167, 139, 250, 0.15) inset',
      }} />

      {logoUrl && (
        <img src={logoUrl} alt="logo" style={{ height: '60px', maxWidth: '20%', objectFit: 'contain', marginBottom: '2%' }} />
      )}

      <div style={{
        fontSize: '0.95cqw', letterSpacing: '0.5em', textTransform: 'uppercase',
        color: '#A78BFA', marginBottom: '2%', fontWeight: 'bold',
        textShadow: '0 0 10px rgba(167, 139, 250, 0.6)',
      }}>
        ✦ Certificate of Achievement ✦
      </div>

      <div style={{ fontSize: '1cqw', color: '#C4B5FD', fontStyle: 'italic', marginBottom: '1.5%' }}>
        Among the stars, presented to
      </div>

      <div style={{
        fontSize: '3.4cqw', fontWeight: 'bold', color: '#FFFFFF',
        margin: '0.5% 0 1.5%', lineHeight: 1.1,
        textShadow: '0 0 25px rgba(167, 139, 250, 0.7)',
      }}>
        {recipientName || 'Recipient Name'}
      </div>

      <div style={{ width: '50%', height: '1px', background: 'linear-gradient(to right, transparent, #A78BFA, transparent)', margin: '1% 0' }} />

      <div style={{ fontSize: '1.1cqw', color: '#C4B5FD', maxWidth: '65%', lineHeight: 1.6, marginBottom: '2%' }}>
        for stellar achievement in
        <div style={{ fontSize: '1.7cqw', color: '#FCD34D', marginTop: '0.5%', fontStyle: 'italic' }}>
          {event || 'Event Name'}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginTop: 'auto', marginBottom: '3%' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.4cqw', fontFamily: '"Dancing Script", cursive', color: '#A78BFA' }}>
            {signature || issuer || 'Issuer'}
          </div>
          <div style={{ width: '100%', height: '1px', background: '#A78BFA', margin: '4px 0', opacity: 0.6 }} />
          <div style={{ fontSize: '0.8cqw', color: '#C4B5FD' }}>{issuer || 'Issuing Authority'}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1cqw', color: '#FCD34D' }}>{date || 'Date'}</div>
          <div style={{ width: '100%', height: '1px', background: '#A78BFA', margin: '4px 0', opacity: 0.6 }} />
          <div style={{ fontSize: '0.8cqw', color: '#C4B5FD' }}>Date</div>
        </div>
      </div>
    </div>
  );
}

export default MidnightGalaxy;
