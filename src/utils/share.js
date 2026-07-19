import { TEMPLATES } from '../data/templates';

// Encode certificate data into a URL-safe base64 string for shareable links.
// No backend required — the entire certificate is reconstructed from the URL.
// Note: logoUrl is intentionally NOT included (data URLs are too large for URLs).

const VALID_TEMPLATE_IDS = new Set(TEMPLATES.map((t) => t.id));

/**
 * Encode a certificate data object into a URL-safe string.
 * @param {{recipientName?:string,event?:string,date?:string,issuer?:string,signature?:string,templateId?:string}} data
 * @returns {string} URL-safe base64
 */
export function encodeCertData(data = {}) {
  const safeData = data || {};
  const compact = {
    r: safeData.recipientName || '',
    e: safeData.event || '',
    d: safeData.date || '',
    i: safeData.issuer || '',
    s: safeData.signature || '',
    t: safeData.templateId || 'classic-gold',
  };
  const json = JSON.stringify(compact);
  const b64 = btoa(unescape(encodeURIComponent(json)));
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Decode a URL-safe base64 string back into certificate data.
 * @param {string} encoded
 * @returns {{recipientName:string,event:string,date:string,issuer:string,signature:string,templateId:string}|null}
 */
export function decodeCertData(encoded) {
  if (!encoded || typeof encoded !== 'string') {
    return null;
  }

  try {
    let b64 = encoded.trim().replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    const json = decodeURIComponent(escape(atob(b64)));
    const compact = JSON.parse(json);

    if (!compact || typeof compact !== 'object' || Array.isArray(compact)) {
      return null;
    }

    const templateId = typeof compact.t === 'string' && VALID_TEMPLATE_IDS.has(compact.t)
      ? compact.t
      : 'classic-gold';

    return {
      recipientName: typeof compact.r === 'string' ? compact.r : '',
      event: typeof compact.e === 'string' ? compact.e : '',
      date: typeof compact.d === 'string' ? compact.d : '',
      issuer: typeof compact.i === 'string' ? compact.i : '',
      signature: typeof compact.s === 'string' ? compact.s : '',
      templateId,
    };
  } catch (err) {
    return null;
  }
}

/**
 * Build a full shareable URL for a certificate.
 */
export function buildShareUrl(data) {
  const encoded = encodeCertData(data);
  const origin = typeof window !== 'undefined' && window.location?.origin ? window.location.origin : '';
  return `${origin}/c/${encoded}`;
}

