// Template 16: Tropical Paradise — bright tropical with palm leaves
function TropicalParadise({ data, logoUrl }) {
  const { recipientName, event, date, issuer, signature } = data;
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(135deg, #fef9c3 0%, #fef3c7 30%, #fed7aa 60%, #fb923c 100%)',
      position: 'relative', padding: '5%', boxSizing: 'border-box',
      fontFamily: '"Inter", sans-serif', color: '#7C2D12',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      textAlign: 'center', overflow: 'hidden',
    }}>
      {/* Palm leaf decorations - corners */}
      {[
        { top: '-30px', left: '-30px', rotate: '0deg' },
        { top: '-30px', right: '-30px', rotate: '90deg' },
        { bottom: '-30px', left: '-30px', rotate: '-90deg' },
        { bottom: '-30px', right: '-30px', rotate: '180deg' },
      ].map((pos, i) => (
        <div key={i} style={{ position: 'absolute', ...pos }}>
          <svg width="180" height="180" viewBox="0 0 100 100" style={{ transform: `rotate(${pos.rotate})` }}>
            <path d="M10,10 Q30,30 50,50 Q70,70 90,90 M10,10 Q20,30 30,40 M10,10 Q30,20 40,30 M50,50 Q60,70 70,80 M50,50 Q70,60 80,70"
              stroke="#15803D" strokeWidth="3" fill="none" opacity="0.5" />
            <ellipse cx="25" cy="25" rx="20" ry="6" fill="#16A34A" opacity="0.4" transform="rotate(45 25 25)" />
            <ellipse cx="60" cy="60" rx="25" ry="7" fill="#15803D" opacity="0.4" transform="rotate(45 60 60)" />
          </svg>
        </div>
      ))}

      {/* Border */}
      <div style={{ position: 'absolute', top: '4%', left: '4%', right: '4%', bottom: '4%', border: '2px dashed #FB923C', opacity: 0.7 }} />

      {logoUrl && (
        <img src={logoUrl} alt="logo" style={{ height: '60px', maxWidth: '20%', objectFit: 'contain', marginBottom: '2%' }} />
      )}

      <div style={{
        fontSize: '0.95cqw', letterSpacing: '0.4em', textTransform: 'uppercase',
        color: '#FB923C', marginBottom: '2%', fontWeight: 700,
      }}>
        🌴 Certificate of Achievement 🌴
      </div>

      <div style={{ fontSize: '1.1cqw', color: '#9A3412', marginBottom: '1.5%', fontWeight: 500 }}>
        Sun-kissed recognition for
      </div>

      <div style={{
        fontSize: '3.6cqw', fontWeight: 800, color: '#7C2D12',
        margin: '0.5% 0 1.5%', lineHeight: 1.1,
      }}>
        {recipientName || 'Recipient Name'}
      </div>

      <div style={{ width: '50%', height: '3px', background: 'linear-gradient(to right, transparent, #FB923C, transparent)', margin: '1% 0' }} />

      <div style={{ fontSize: '1.15cqw', color: '#9A3412', maxWidth: '65%', lineHeight: 1.6, marginBottom: '2%', fontWeight: 500 }}>
        for bright achievement in
        <div style={{ fontSize: '1.7cqw', marginTop: '0.5%', fontWeight: 800, color: '#FB923C' }}>
          {event || 'Event Name'}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginTop: 'auto' }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '1.4cqw', color: '#7C2D12', fontWeight: 700 }}>
            {signature || issuer || 'Issuer'}
          </div>
          <div style={{ width: '120px', height: '2px', background: '#FB923C', margin: '6px 0 4px' }} />
          <div style={{ fontSize: '0.8cqw', color: '#9A3412' }}>{issuer || 'Issuing Authority'}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.1cqw', color: '#7C2D12', fontWeight: 700 }}>{date || 'Date'}</div>
          <div style={{ width: '120px', height: '2px', background: '#FB923C', margin: '6px 0 4px', marginLeft: 'auto' }} />
          <div style={{ fontSize: '0.8cqw', color: '#9A3412' }}>Date</div>
        </div>
      </div>
    </div>
  );
}

export default TropicalParadise;
