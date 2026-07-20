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

