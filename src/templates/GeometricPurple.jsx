// Template 5: Geometric Pulse — bold geometric shapes, purple gradient
function GeometricPurple({ data, logoUrl }) {
  const { recipientName, event, date, issuer, signature } = data;
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #1e1b4b 100%)',
      position: 'relative',
      padding: '5%',
      boxSizing: 'border-box',
      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
      color: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      overflow: 'hidden',
    }}>
      {/* Geometric shapes */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '40%',
        height: '60%',
        background: 'linear-gradient(45deg, #7C3AED, #EC4899)',
        opacity: 0.3,
        borderRadius: '30%',
        transform: 'rotate(15deg)',
        filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-15%',
        left: '-5%',
        width: '50%',
        height: '50%',
        background: 'linear-gradient(45deg, #06B6D4, #7C3AED)',
        opacity: 0.3,
        borderRadius: '50%',
        filter: 'blur(50px)',
      }} />
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '40px',
        height: '40px',
        border: '2px solid #EC4899',
        transform: 'rotate(45deg)',
        opacity: 0.4,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '12%',
        width: '60px',
        height: '60px',
        border: '2px solid #06B6D4',
        borderRadius: '50%',
        opacity: 0.4,
      }} />

      {/* Top accent bar */}
      <div style={{
        width: '60px',
        height: '4px',
        background: 'linear-gradient(to right, #EC4899, #7C3AED, #06B6D4)',
        marginBottom: '3%',
      }} />

      {logoUrl && (
        <img src={logoUrl} alt="logo" style={{ height: '60px', maxWidth: '20%', objectFit: 'contain', marginBottom: '2%' }} />
      )}
      <div style={{
        fontSize: '0.95vw',
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        color: '#EC4899',
        marginBottom: '2%',
        fontWeight: 700,
      }}>
        Certificate of Achievement
      </div>

      <div style={{ fontSize: '1vw', color: '#C4B5FD', marginBottom: '1.5%' }}>awarded to</div>

      <div style={{
        fontSize: '3.6vw',
        fontWeight: 800,
        margin: '0.5% 0 1.5%',
        lineHeight: 1.1,
        color: '#FFFFFF',
      }}>
        {recipientName || 'Recipient Name'}
      </div>

      <div style={{
        fontSize: '1.15vw',
        color: '#E9D5FF',
        maxWidth: '65%',
        lineHeight: 1.6,
        marginBottom: '2%',
      }}>
        for excellence in
        <div style={{ fontSize: '1.7vw', color: '#FBBF24', marginTop: '0.5%', fontWeight: 700 }}>
          {event || 'Event Name'}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginTop: 'auto' }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '1.3vw', color: '#FFFFFF', fontWeight: 600 }}>
            {signature || issuer || 'Issuer'}
          </div>
          <div style={{ width: '120px', height: '2px', background: 'linear-gradient(to right, #EC4899, #7C3AED)', margin: '6px 0 4px' }} />
          <div style={{ fontSize: '0.8vw', color: '#C4B5FD' }}>{issuer || 'Issuing Authority'}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.1vw', color: '#FFFFFF', fontWeight: 600 }}>{date || 'Date'}</div>
          <div style={{ width: '120px', height: '2px', background: 'linear-gradient(to right, #7C3AED, #06B6D4)', margin: '6px 0 4px', marginLeft: 'auto' }} />
          <div style={{ fontSize: '0.8vw', color: '#C4B5FD' }}>Date</div>
        </div>
      </div>
    </div>
  );
}

export default GeometricPurple;
