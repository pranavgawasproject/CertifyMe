// Encode certificate data into a URL-safe base64 string for shareable links.
// No backend required — the entire certificate is reconstructed from the URL.

/**
 * Encode a certificate data object into a URL-safe string.
 * @param {{recipientName:string,event:string,date:string,issuer:string,signature:string,templateId:string}} data
 * @returns {string} URL-safe base64
 */
export function encodeCertData(data) {
  // Compact keys to keep URL short
  const compact = {
    r: data.recipientName || '',
    e: data.event || '',
    d: data.date || '',
    i: data.issuer || '',
    s: data.signature || '',
    t: data.templateId || 'classic-gold',
  };
  const json = JSON.stringify(compact);
  // base64url encode
  const b64 = btoa(unescape(encodeURIComponent(json)));
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Decode a URL-safe base64 string back into certificate data.
 * @param {string} encoded
 * @returns {{recipientName:string,event:string,date:string,issuer:string,signature:string,templateId:string}|null}
 */
export function decodeCertData(encoded) {
  try {
    // Restore base64 from base64url
    let b64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    // Pad
    while (b64.length % 4) b64 += '=';
    const json = decodeURIComponent(escape(atob(b64)));
    const compact = JSON.parse(json);
    return {
      recipientName: compact.r || '',
      event: compact.e || '',
      date: compact.d || '',
      issuer: compact.i || '',
      signature: compact.s || '',
      templateId: compact.t || 'classic-gold',
    };
  } catch (err) {
    console.error('Failed to decode cert data:', err);
    return null;
  }
}

/**
 * Build a full shareable URL for a certificate.
 */
export function buildShareUrl(data) {
  const encoded = encodeCertData(data);
  return `${window.location.origin}/c/${encoded}`;
}
