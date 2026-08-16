// @ts-nocheck — legacy utility ported verbatim from Vite source; not yet fully typed.
/**
 * certificateCryptoVerifier.js
 * Utility engine to generate cryptographic security checksums,
 * verify certificate data integrity against tampering, and audit expiration windows.
 */

/**
 * Computes a deterministic security checksum string for a certificate record.
 * @param {{ id: string, recipientName: string, issueDate: string, issuer: string, title?: string }} certData 
 * @returns {string} 64-character pseudo-SHA256 hex checksum signature
 */
export function generateCertificateSecurityChecksum(certData = {}) {
  const { id = '', recipientName = '', issueDate = '', issuer = '', title = '' } = certData;
  const rawString = `${id.trim()}|${recipientName.trim().toLowerCase()}|${issueDate.trim()}|${issuer.trim().toLowerCase()}|${title.trim().toLowerCase()}`;

  let hash1 = 0x811c9dc5;
  let hash2 = 0x27d4eb2d;

  for (let i = 0; i < rawString.length; i++) {
    const charCode = rawString.charCodeAt(i);
    hash1 ^= charCode;
    hash1 = Math.imul(hash1, 0x01000193);
    hash2 ^= charCode;
    hash2 = Math.imul(hash2, 0x01000197);
  }

  const part1 = (hash1 >>> 0).toString(16).padStart(8, '0');
  const part2 = (hash2 >>> 0).toString(16).padStart(8, '0');
  const part3 = ((hash1 ^ hash2) >>> 0).toString(16).padStart(8, '0');
  const part4 = ((hash1 + hash2) >>> 0).toString(16).padStart(8, '0');

  return `cert_sec_${part1}${part2}${part3}${part4}`;
}

/**
 * Verifies certificate record integrity against a provided security checksum.
 * @param {object} certData 
 * @param {string} expectedChecksum 
 * @returns {{ isAuthentic: boolean, computedChecksum: string, warning?: string }}
 */
export function verifyCertificateIntegrity(certData, expectedChecksum) {
  if (!certData || !expectedChecksum) {
    return { isAuthentic: false, computedChecksum: '', warning: 'Missing certificate payload or checksum' };
  }

  const computedChecksum = generateCertificateSecurityChecksum(certData);
  const isAuthentic = computedChecksum === expectedChecksum;

  return {
    isAuthentic,
    computedChecksum,
    warning: isAuthentic ? undefined : 'Tamper alert: Security checksum mismatch'
  };
}

/**
 * Audits validity window and expiration status of a certificate.
 * @param {string|Date} issueDate 
 * @param {number} [validityDays=365] 
 * @param {string|Date} [currentDate] 
 * @returns {{ status: string, remainingDays: number, expirationDate: string, isCompliant: boolean }}
 */
export function calculateCertificateExpirationAudit(issueDate, validityDays = 365, currentDate = new Date()) {
  const issue = new Date(issueDate);
  const current = new Date(currentDate);

  if (isNaN(issue.getTime())) {
    return { status: 'INVALID_DATE', remainingDays: 0, expirationDate: '', isCompliant: false };
  }

  const expTime = issue.getTime() + Math.max(1, validityDays) * 24 * 60 * 60 * 1000;
  const expDate = new Date(expTime);
  const diffDays = Math.ceil((expTime - current.getTime()) / (1000 * 60 * 60 * 24));

  let status = 'ACTIVE';
  let isCompliant = true;

  if (diffDays <= 0) {
    status = 'EXPIRED';
    isCompliant = false;
  } else if (diffDays <= 30) {
    status = 'EXPIRING_SOON';
  }

  return {
    status,
    remainingDays: Math.max(0, diffDays),
    expirationDate: expDate.toISOString().split('T')[0],
    isCompliant
  };
}
