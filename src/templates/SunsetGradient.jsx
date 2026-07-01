// Template 10: Sunset Wave — warm sunset gradient, celebratory
function SunsetGradient({ data }) {
  const { recipientName, event, date, issuer, signature } = data;
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 25%, #fdba74 50%, #fb7185 75%, #f97316 100%)',
      position: 'relative',
      padding: '5%',
      boxSizing: 'border-box',
      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
      color: '#7C2D12',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      overflow: 'hidden',
    }}>
      {/* Sun glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(254, 240, 138, 0.6) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Confetti dots */}
      {[
        { top: '10%', left: '15%', color: '#EC4899', size: '8px' },
        { top: '20%', right: '12%', color: '#FBBF24', size: '6px' },
        { top: '70%', left: '8%', color: '#7C3AED', size: '10px' },
        { top: '80%', right: '15%', color: '#06B6D4', size: '8px' },
        { top: '15%', left: '50%', color: '#10B981', size: '5px' },
        { top: '85%', left: '40%', color: '#EC4899', size: '7px' },
        { top: '12%', right: '35%', color: '#F59E0B', size: '6px' },
      ].map((dot, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: dot.size,
          height: dot.size,
          borderRadius: '50%',
          background: dot.color,
          opacity: 0.7,
          ...dot,
        }} />
      ))}

      {/* Border */}
      <div style={{ position: 'absolute', top: '4%', left: '4%', right: '4%', bottom: '4%', border: '2px solid rgba(255, 255, 255, 0.5)' }} />
      <div style={{ position: 'absolute', top: '5%', left: '5%', right: '5%', bottom: '5%', border: '1px solid rgba(255, 255, 255, 0.3)' }} />

      <div style={{
        fontSize: '0.95vw',
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        color: '#FFFFFF',
        marginBottom: '2%',
        fontWeight: 700,
        textShadow: '0 2px 10px rgba(124, 45, 18, 0.3)',
      }}>
        ✦ Certificate of Achievement ✦
      </div>

      <div style={{ fontSize: '1.1vw', color: '#FFFFFF', marginBottom: '1.5%', fontWeight: 500, textShadow: '0 1px 6px rgba(124, 45, 18, 0.3)' }}>
        This celebrate-certifies that
      </div>

      <div style={{
        fontSize: '3.6vw',
        fontWeight: 800,
        color: '#FFFFFF',
        margin: '0.5% 0 1.5%',
        lineHeight: 1.1,
        textShadow: '0 4px 20px rgba(124, 45, 18, 0.4)',
      }}>
        {recipientName || 'Recipient Name'}
      </div>

      <div style={{ width: '60%', height: '2px', background: 'linear-gradient(to right, transparent, #FFFFFF, transparent)', margin: '1% 0' }} />

      <div style={{ fontSize: '1.15vw', color: '#FFFFFF', maxWidth: '65%', lineHeight: 1.6, marginBottom: '2%', fontWeight: 500, textShadow: '0 1px 6px rgba(124, 45, 18, 0.3)' }}>
        has brightly completed
        <div style={{ fontSize: '1.7vw', marginTop: '0.5%', fontWeight: 800, color: '#FFFFFF', textShadow: '0 2px 12px rgba(124, 45, 18, 0.5)' }}>
          {event || 'Event Name'}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginTop: 'auto' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.4vw', color: '#FFFFFF', fontWeight: 700 }}>
            {signature || issuer || 'Issuer'}
          </div>
          <div style={{ width: '100%', height: '2px', background: '#FFFFFF', margin: '6px 0 4px', opacity: 0.7 }} />
          <div style={{ fontSize: '0.8vw', color: '#FFFFFF', opacity: 0.9 }}>{issuer || 'Issuing Authority'}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.1vw', color: '#FFFFFF', fontWeight: 700 }}>{date || 'Date'}</div>
          <div style={{ width: '100%', height: '2px', background: '#FFFFFF', margin: '6px 0 4px', opacity: 0.7 }} />
          <div style={{ fontSize: '0.8vw', color: '#FFFFFF', opacity: 0.9 }}>Date</div>
        </div>
      </div>
    </div>
  );
}

export default SunsetGradient;
