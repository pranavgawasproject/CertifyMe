import { TEMPLATES } from '@/lib/data/templates';
import type { CertificateData } from '@/lib/types';

// Encode certificate data into a URL-safe base64 string for shareable links.
// No backend required — the entire certificate is reconstructed from the URL.
// Note: logoUrl is intentionally NOT included (data URLs are too large for URLs).

const VALID_TEMPLATE_IDS = new Set(TEMPLATES.map((t) => t.id));

interface CompactCert {
  r: string;
  e: string;
  d: string;
  i: string;
  s: string;
  t: string;
}

/**
 * Encode a certificate data object into a URL-safe string.
 */
export function encodeCertData(data: Partial<CertificateData> = {}): string {
  const safeData = data || {};
  const compact: CompactCert = {
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
 * Works on both the client (btoa/atob) and the server (Buffer fallback).
 */
export function decodeCertData(encoded?: string | null): CertificateData | null {
  if (!encoded || typeof encoded !== 'string') {
    return null;
  }

  try {
    let b64 = encoded.trim().replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';

    // Use the appropriate base64 decoder for the current runtime.
    let json: string;
    if (typeof atob === 'function') {
      json = decodeURIComponent(escape(atob(b64)));
    } else if (typeof Buffer !== 'undefined') {
      json = Buffer.from(b64, 'base64').toString('utf-8');
    } else {
      return null;
    }

    const compact = JSON.parse(json) as Partial<CompactCert>;

    if (!compact || typeof compact !== 'object' || Array.isArray(compact)) {
      return null;
    }

    const templateId =
      typeof compact.t === 'string' && VALID_TEMPLATE_IDS.has(compact.t)
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
  } catch {
    return null;
  }
}

/**
 * Build a full shareable URL for a certificate.
 */
export function buildShareUrl(data: Partial<CertificateData>): string {
  const encoded = encodeCertData(data);
  const origin =
    typeof window !== 'undefined' && window.location?.origin ? window.location.origin : '';
  return `${origin}/c/${encoded}`;
}

/**
 * Build a Twitter/X post share URL for a certificate.
 */
export function generateTwitterShareUrl(
  certData: Partial<CertificateData> = {},
  shareUrl = '',
): string {
  const recipient = certData.recipientName ? certData.recipientName.trim() : 'a participant';
  const eventName = certData.event ? certData.event.trim() : 'a specialized program';
  const text = `Congratulations to ${recipient} for completing ${eventName}! Verified certificate via CertifyMe 🎓`;
  const encodedText = encodeURIComponent(text);
  const encodedUrl = shareUrl ? encodeURIComponent(shareUrl) : '';

  return `https://twitter.com/intent/tweet?text=${encodedText}${
    encodedUrl ? '&url=' + encodedUrl : ''
  }`;
}

/**
 * Build a WhatsApp share URL for a certificate.
 */
export function generateWhatsAppShareUrl(
  certData: Partial<CertificateData> = {},
  shareUrl = '',
): string {
  const recipient = certData.recipientName ? certData.recipientName.trim() : 'a participant';
  const eventName = certData.event ? certData.event.trim() : 'a program';
  const text = `🎓 Verified Certificate for ${recipient} - ${eventName}${
    shareUrl ? '\n' + shareUrl : ''
  }`;
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}

/**
 * Build a LinkedIn share URL for a certificate.
 */
export function generateLinkedInShareUrl(
  certData: Partial<CertificateData> = {},
  shareUrl = '',
): string {
  const eventName = certData.event ? certData.event.trim() : 'Certificate of Completion';
  const encodedUrl = shareUrl ? encodeURIComponent(shareUrl) : '';
  const encodedTitle = encodeURIComponent(`Verified Certificate - ${eventName}`);

  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}`;
}
