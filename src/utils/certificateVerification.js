/**
 * Utility functions for certificate verification hashing, credential ID generation, and metadata formatting.
 */

export function generateCredentialId(recipientName = '', issueDate = '') {
  const cleanName = recipientName.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanDate = (issueDate || new Date().toISOString().split('T')[0]).replace(/-/g, '');
  const randomSalt = Math.floor(1000 + Math.random() * 9000);
  const hash = `${cleanName}-${cleanDate}-${randomSalt}`;
  return `CERT-${hash.toUpperCase()}`;
}

export function validateCertificateMetadata(cert = {}) {
  const errors = [];
  if (!cert.recipientName || !cert.recipientName.trim()) {
    errors.push('Recipient name is required');
  }
  if (!cert.courseTitle || !cert.courseTitle.trim()) {
    errors.push('Course/Achievement title is required');
  }
  if (!cert.issuerName || !cert.issuerName.trim()) {
    errors.push('Issuer organization name is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function formatCertificateIssueDate(dateString) {
  if (!dateString) return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function buildVerificationUrl(credentialId, baseUrl = 'https://certify-me-liart.vercel.app') {
  if (!credentialId || typeof credentialId !== 'string') return '';
  const sanitizedId = encodeURIComponent(credentialId.trim());
  const cleanBase = baseUrl.replace(/\/+$/, '');
  return `${cleanBase}/verify?id=${sanitizedId}`;
}

export function generateCertificateQRCodeUrl(verificationUrl, size = 150) {
  if (!verificationUrl || typeof verificationUrl !== 'string') return '';
  const encoded = encodeURIComponent(verificationUrl.trim());
  const dimension = typeof size === 'number' && size > 0 ? size : 150;
  return `https://api.qrserver.com/v1/create-qr-code/?size=${dimension}x${dimension}&data=${encoded}`;
}

export function calculateCertificateExpirationStatus(issueDateStr, validityMonths = 12) {
  if (!issueDateStr || typeof issueDateStr !== 'string') {
    return { isExpired: false, daysRemaining: 365, status: 'VALID', expirationDate: '' };
  }
  const issueDate = new Date(issueDateStr);
  if (isNaN(issueDate.getTime())) {
    return { isExpired: false, daysRemaining: 365, status: 'VALID', expirationDate: '' };
  }
  const months = typeof validityMonths === 'number' && validityMonths > 0 ? validityMonths : 12;

  const expiration = new Date(issueDate);
  expiration.setMonth(expiration.getMonth() + months);

  const now = new Date();
  const diffTime = expiration.getTime() - now.getTime();
  const daysRemaining = Math.ceil(diffTime / (1000 * 3600 * 24));
  const isExpired = daysRemaining <= 0;

  let status = 'VALID';
  if (isExpired) {
    status = 'EXPIRED';
  } else if (daysRemaining <= 30) {
    status = 'EXPIRING_SOON';
  }

  return {
    isExpired,
    daysRemaining: Math.max(0, daysRemaining),
    status,
    expirationDate: expiration.toISOString().split('T')[0]
  };
}



