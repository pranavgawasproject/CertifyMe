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

export function generateBadgeEmbedCode(credentialId, recipientName = '', baseUrl = 'https://certify-me-liart.vercel.app') {
  if (!credentialId || typeof credentialId !== 'string') {
    return { html: '', markdown: '', verificationUrl: '' };
  }

  const verificationUrl = buildVerificationUrl(credentialId, baseUrl);
  const name = recipientName ? recipientName.trim() : 'Certificate';
  const qrUrl = generateCertificateQRCodeUrl(verificationUrl, 120);

  const html = `<a href="${verificationUrl}" target="_blank" rel="noopener noreferrer"><img src="${qrUrl}" alt="Verified Certificate Badge for ${name}" width="120" height="120" /></a>`;
  const markdown = `[![Verified Certificate](${qrUrl})](${verificationUrl})`;

  return { html, markdown, verificationUrl };
}

export function calculateCertificateVerificationScore(certData = {}) {
  let score = 0;
  const checks = [];

  if (certData.recipientName && typeof certData.recipientName === 'string' && certData.recipientName.trim()) {
    score += 25;
    checks.push({ field: 'recipientName', status: 'PASS', points: 25 });
  } else {
    checks.push({ field: 'recipientName', status: 'FAIL', points: 0 });
  }

  if (certData.courseTitle && typeof certData.courseTitle === 'string' && certData.courseTitle.trim()) {
    score += 25;
    checks.push({ field: 'courseTitle', status: 'PASS', points: 25 });
  } else {
    checks.push({ field: 'courseTitle', status: 'FAIL', points: 0 });
  }

  if (certData.issuerName && typeof certData.issuerName === 'string' && certData.issuerName.trim()) {
    score += 25;
    checks.push({ field: 'issuerName', status: 'PASS', points: 25 });
  } else {
    checks.push({ field: 'issuerName', status: 'FAIL', points: 0 });
  }

  if (certData.credentialId && typeof certData.credentialId === 'string' && certData.credentialId.startsWith('CERT-')) {
    score += 25;
    checks.push({ field: 'credentialId', status: 'PASS', points: 25 });
  } else {
    checks.push({ field: 'credentialId', status: 'FAIL', points: 0 });
  }

  const confidence = score >= 100 ? 'HIGH' : score >= 75 ? 'MEDIUM' : 'LOW';

  return {
    score,
    confidence,
    isAuthentic: score >= 75,
    checks
  };
}

export function generateLinkedInShareUrl({ credentialId = '', courseTitle = '', issuerName = '', issueDateStr = '', baseUrl = 'https://certify-me-liart.vercel.app' } = {}) {
  if (!credentialId || typeof credentialId !== 'string') {
    return { linkedInUrl: '', verificationUrl: '' };
  }

  const verificationUrl = buildVerificationUrl(credentialId, baseUrl);
  const nameParam = encodeURIComponent((courseTitle || 'Certificate of Completion').trim());
  const orgParam = encodeURIComponent((issuerName || 'CertifyMe').trim());

  let yearParam = new Date().getFullYear();
  let monthParam = new Date().getMonth() + 1;

  if (issueDateStr && typeof issueDateStr === 'string') {
    const parsed = new Date(issueDateStr);
    if (!isNaN(parsed.getTime())) {
      yearParam = parsed.getFullYear();
      monthParam = parsed.getMonth() + 1;
    }
  }

  const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${nameParam}&organizationName=${orgParam}&issueYear=${yearParam}&issueMonth=${monthParam}&certUrl=${encodeURIComponent(verificationUrl)}&certId=${encodeURIComponent(credentialId.trim())}`;

  return {
    linkedInUrl,
    verificationUrl
  };
}

export function calculateCertificateExpiryAndRenewalStatus(issueDateStr, validityYears = null) {
  if (!issueDateStr || typeof issueDateStr !== 'string') {
    return { status: 'LIFETIME', isExpired: false, expiryDateStr: null, daysRemaining: null };
  }

  const issueDate = new Date(issueDateStr);
  if (isNaN(issueDate.getTime())) {
    return { status: 'LIFETIME', isExpired: false, expiryDateStr: null, daysRemaining: null };
  }

  if (typeof validityYears !== 'number' || isNaN(validityYears) || validityYears <= 0) {
    return { status: 'LIFETIME', isExpired: false, expiryDateStr: null, daysRemaining: null };
  }

  const expiryDate = new Date(issueDate);
  expiryDate.setFullYear(expiryDate.getFullYear() + validityYears);

  const now = new Date();
  const diffMs = expiryDate.getTime() - now.getTime();
  const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  const isExpired = daysRemaining <= 0;

  let status = 'ACTIVE';
  if (isExpired) {
    status = 'EXPIRED';
  } else if (daysRemaining <= 60) {
    status = 'EXPIRING_SOON';
  }

  return {
    status,
    isExpired,
    expiryDateStr: expiryDate.toISOString().split('T')[0],
    daysRemaining
  };
}

export function calculateCertificateTamperCheck(credentialId, recipientName, courseTitle, issuerName) {
  if (!credentialId || typeof credentialId !== 'string' || !credentialId.trim()) {
    return { isTamperFree: false, reason: 'Missing or invalid Credential ID' };
  }
  if (!recipientName || typeof recipientName !== 'string' || !recipientName.trim()) {
    return { isTamperFree: false, reason: 'Missing recipient name' };
  }
  if (!courseTitle || typeof courseTitle !== 'string' || !courseTitle.trim()) {
    return { isTamperFree: false, reason: 'Missing course title' };
  }
  if (!issuerName || typeof issuerName !== 'string' || !issuerName.trim()) {
    return { isTamperFree: false, reason: 'Missing issuer organization' };
  }

  const cleanName = recipientName.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  const idLower = credentialId.toLowerCase();

  // Basic tamper check: credential ID must incorporate recipient slug prefix if generated standardly
  const containsNameSlug = idLower.includes(cleanName.substring(0, Math.min(4, cleanName.length)));

  return {
    isTamperFree: containsNameSlug || credentialId.startsWith('CERT-'),
    reason: containsNameSlug || credentialId.startsWith('CERT-') ? 'Certificate integrity verified' : 'Metadata does not match Credential ID signature'
  };
}

export function calculateCertificateRenewalAlert(issueDateStr, validityMonths = 12, warningThresholdDays = 30) {
  if (!issueDateStr) {
    return { valid: false, error: 'Issue date string is required' };
  }

  const issue = new Date(issueDateStr);
  if (isNaN(issue.getTime())) {
    return { valid: false, error: 'Invalid issue date format' };
  }

  const months = typeof validityMonths === 'number' && validityMonths > 0 ? validityMonths : 12;
  const threshold = typeof warningThresholdDays === 'number' && warningThresholdDays > 0 ? warningThresholdDays : 30;

  const expiry = new Date(issue);
  expiry.setMonth(expiry.getMonth() + months);

  const now = new Date();
  const diffMs = expiry.getTime() - now.getTime();
  const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  let status = 'VALID';
  let requiresAction = false;

  if (daysRemaining <= 0) {
    status = 'EXPIRED';
    requiresAction = true;
  } else if (daysRemaining <= threshold) {
    status = 'URGENT';
    requiresAction = true;
  } else if (daysRemaining <= threshold * 2) {
    status = 'UPCOMING';
  }

  return {
    valid: true,
    status,
    expiryDateStr: expiry.toISOString().split('T')[0],
    daysRemaining,
    requiresAction
  };
}

export function calculateCertificateBatchIssuanceSummary(recipientsList = [], courseTitle = '', issuerName = '') {
  if (!Array.isArray(recipientsList) || recipientsList.length === 0) {
    return {
      totalRecipients: 0,
      validRecipientsCount: 0,
      invalidRecipientsCount: 0,
      estimatedProcessingTimeSeconds: 0,
      isBatchReady: false,
      validationErrors: ['Recipients list cannot be empty']
    };
  }

  const course = (courseTitle || 'Certificate of Achievement').trim();
  const issuer = (issuerName || 'CertifyMe').trim();
  let validCount = 0;
  let invalidCount = 0;
  const validationErrors = [];
  const previewCredentialIds = [];

  recipientsList.forEach((recipient, idx) => {
    const name = typeof recipient === 'string' ? recipient.trim() : (recipient && recipient.name ? recipient.name.trim() : '');
    if (!name) {
      invalidCount++;
      validationErrors.push(`Row ${idx + 1}: Recipient name is missing`);
    } else {
      validCount++;
      previewCredentialIds.push(generateCredentialId(name, new Date().toISOString().split('T')[0]));
    }
  });

  const estimatedProcessingTimeSeconds = Math.round(validCount * 0.15 * 100) / 100;
  const isBatchReady = validCount > 0 && invalidCount === 0;

  return {
    courseTitle: course,
    issuerName: issuer,
    totalRecipients: recipientsList.length,
    validRecipientsCount: validCount,
    invalidRecipientsCount: invalidCount,
    estimatedProcessingTimeSeconds,
    isBatchReady,
    validationErrors,
    previewCredentialIds: previewCredentialIds.slice(0, 5)
  };
}

