// Template 19: Industrial Steel — metallic grey, urban/industrial
function IndustrialSteel({ data, logoUrl }) {
  const { recipientName, event, date, issuer, signature } = data;
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 25%, #4a5568 50%, #34495e 75%, #2c3e50 100%)',
      position: 'relative', padding: '5%', boxSizing: 'border-box',
      fontFamily: '"Inter", sans-serif', color: '#E2E8F0',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      textAlign: 'center', overflow: 'hidden',
    }}>
      {/* Steel texture overlay - diagonal lines */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.08,
        background: 'repeating-linear-gradient(45deg, #fff, #fff 1px, transparent 1px, transparent 4px)',
      }} />

      {/* Industrial corner brackets - rivets */}
      {[
        { top: '4%', left: '4%' },
        { top: '4%', right: '4%' },
        { bottom: '4%', left: '4%' },
        { bottom: '4%', right: '4%' },
      ].map((pos, i) => (
        <div key={i} style={{ position: 'absolute', ...pos }}>
          <div style={{
            width: '20px', height: '20px', borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #94A3B8, #475569)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
          }} />
        </div>
      ))}

      {/* Sharp border */}
      <div style={{ position: 'absolute', top: '3%', left: '3%', right: '3%', bottom: '3%', border: '2px solid #94A3B8' }} />
      <div style={{ position: 'absolute', top: '3.5%', left: '3.5%', right: '3.5%', bottom: '3.5%', border: '1px solid #64748B' }} />

      {/* Top accent stripe */}
      <div style={{
        position: 'absolute', top: '7%', left: '8%', right: '8%', height: '4px',
        background: 'linear-gradient(to right, transparent, #F59E0B, transparent)',
      }} />

      {logoUrl && (
        <img src={logoUrl} alt="logo" style={{ height: '60px', maxWidth: '20%', objectFit: 'contain', marginBottom: '2%', filter: 'brightness(1.1)' }} />
      )}

      <div style={{
        fontSize: '0.85vw', letterSpacing: '0.5em', textTransform: 'uppercase',
        color: '#F59E0B', marginBottom: '3%', fontWeight: 700,
      }}>
        ⚙ Certificate of Achievement ⚙
      </div>

      <div style={{ fontSize: '0.95vw', color: '#94A3B8', marginBottom: '1.5%', letterSpacing: '0.1em' }}>
        ENGINEERED FOR EXCELLENCE — PRESENTED TO
      </div>

      <div style={{
        fontSize: '3.4vw', fontWeight: 800, color: '#FFFFFF',
        margin: '0.5% 0 1.5%', lineHeight: 1.1,
        letterSpacing: '0.02em',
        textShadow: '0 2px 10px rgba(0,0,0,0.6)',
      }}>
        {recipientName || 'Recipient Name'}
      </div>

      <div style={{
        width: '60%', height: '2px',
        background: 'linear-gradient(to right, transparent, #F59E0B 20%, #F59E0B 80%, transparent)',
        margin: '1% 0',
      }} />

      <div style={{ fontSize: '1.1vw', color: '#CBD5E1', maxWidth: '65%', lineHeight: 1.6, marginBottom: '2%' }}>
        has forged success in
        <div style={{ fontSize: '1.7vw', color: '#F59E0B', marginTop: '0.5%', fontWeight: 700 }}>
          {event || 'Event Name'}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginTop: 'auto', marginBottom: '4%' }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '1.3vw', color: '#FFFFFF', fontWeight: 700, letterSpacing: '0.05em' }}>
            {signature || issuer || 'Issuer'}
          </div>
          <div style={{ width: '140px', height: '2px', background: '#F59E0B', margin: '6px 0 4px' }} />
          <div style={{ fontSize: '0.75vw', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94A3B8' }}>
            {issuer || 'Issuing Authority'}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1vw', color: '#FFFFFF', fontWeight: 700 }}>{date || 'Date'}</div>
          <div style={{ width: '140px', height: '2px', background: '#F59E0B', margin: '6px 0 4px', marginLeft: 'auto' }} />
          <div style={{ fontSize: '0.75vw', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94A3B8' }}>Date</div>
        </div>
      </div>
    </div>
  );
}

export default IndustrialSteel;
