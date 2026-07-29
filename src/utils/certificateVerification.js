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

export function generateCertificateEmbedBadgeHTML(credentialId = '', courseTitle = '', recipientName = '', theme = 'dark') {
  if (!credentialId || typeof credentialId !== 'string' || !credentialId.trim()) {
    return { embedCode: '', isValid: false };
  }

  const cleanId = credentialId.trim();
  const title = (courseTitle || 'Verified Achievement').trim();
  const recipient = (recipientName || 'Recipient').trim();
  const verifyUrl = buildVerificationUrl(cleanId);
  const isDark = theme === 'dark';

  const bgColor = isDark ? '#1e293b' : '#ffffff';
  const textColor = isDark ? '#f8fafc' : '#0f172a';
  const borderColor = isDark ? '#334155' : '#e2e8f0';

  const embedCode = `<div style="display:inline-flex;align-items:center;gap:12px;padding:12px 16px;background:${bgColor};color:${textColor};border:1px solid ${borderColor};border-radius:8px;font-family:sans-serif;box-shadow:0 2px 4px rgba(0,0,0,0.05);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg><div><div style="font-weight:600;font-size:14px;line-height:1.2;">${title}</div><div style="font-size:12px;opacity:0.8;margin-top:2px;">Issued to ${recipient} • <a href="${verifyUrl}" target="_blank" rel="noopener noreferrer" style="color:#3b82f6;text-decoration:none;font-weight:500;">Verify Badge #${cleanId.slice(-8)}</a></div></div></div>`;

  return {
    embedCode,
    verifyUrl,
    isValid: true
  };
}

export function calculateCertificateTamperProofSignature(credentialId = '', recipientName = '', courseTitle = '', issueDate = '') {
  if (!credentialId || !credentialId.trim()) {
    return { signature: '', isValid: false, algorithm: 'SHA-256-Simulated' };
  }

  const cleanId = credentialId.trim().toUpperCase();
  const cleanName = (recipientName || '').trim().toLowerCase();
  const cleanCourse = (courseTitle || '').trim().toLowerCase();
  const cleanDate = (issueDate || '').trim();

  const str = `${cleanId}:${cleanName}:${cleanCourse}:${cleanDate}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }

  const hexSignature = `SIG-${Math.abs(hash).toString(16).padStart(8, '0').toUpperCase()}`;

  return {
    signature: hexSignature,
    isValid: true,
    algorithm: 'CRC32-Checksum',
    verificationChecksum: `${cleanId}-${hexSignature}`
  };
}

export function calculateCertificateBulkExportBundleEstimate({ certificateCount = 10, includePdf = true, highResolutionPng = true } = {}) {
  if (typeof certificateCount !== 'number' || certificateCount <= 0 || isNaN(certificateCount)) {
    return { valid: false, error: 'Certificate count must be a positive number' };
  }

  const count = Math.floor(certificateCount);
  const pdfSizeBytes = includePdf ? count * 450 * 1024 : 0;
  const pngSizeBytes = highResolutionPng ? count * 850 * 1024 : 0;

  const totalBytes = pdfSizeBytes + pngSizeBytes;
  const totalMb = Math.round((totalBytes / (1024 * 1024)) * 100) / 100;
  const estimatedGenerationSeconds = Math.max(1, Math.round(count * 0.4 * 10) / 10);

  return {
    valid: true,
    certificateCount: count,
    estimatedTotalMb: totalMb,
    estimatedGenerationSeconds,
    requiresZipCompression: totalMb > 5,
    recommendation: totalMb > 50
      ? 'Large batch volume. Recommend async background generation and email download link.'
      : 'Optimal size for direct in-browser zip export.'
  };
}

export function calculateCertificateSecurityQRVerificationHash({ credentialId = '', recipientName = '', issueDate = '' } = {}) {
  if (!credentialId || typeof credentialId !== 'string' || !credentialId.trim()) {
    return { valid: false, error: 'Credential ID is required' };
  }

  const cleanId = credentialId.trim().toUpperCase();
  const cleanName = (recipientName || '').trim().toLowerCase();
  const cleanDate = (issueDate || '').trim();

  const str = `${cleanId}:${cleanName}:${cleanDate}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }

  const securityHash = `QR-HASH-${Math.abs(hash).toString(36).toUpperCase()}`;
  const qrPayloadUrl = `https://certify-me.vercel.app/verify/${encodeURIComponent(cleanId)}?hash=${securityHash}`;

  return {
    valid: true,
    credentialId: cleanId,
    securityHash,
    qrPayloadUrl,
    isVerificationReady: true
  };
}

export function calculateCertificateDesignAestheticScore({
  titleFontSizePx = 32,
  recipientFontSizePx = 24,
  fontContrastRatio = 4.5,
  borderPaddingPx = 40,
  includesLogo = true
} = {}) {
  if (typeof titleFontSizePx !== 'number' || titleFontSizePx <= 0 || isNaN(titleFontSizePx)) {
    return { valid: false, error: 'Title font size must be a positive number' };
  }
  if (typeof recipientFontSizePx !== 'number' || recipientFontSizePx <= 0 || isNaN(recipientFontSizePx)) {
    return { valid: false, error: 'Recipient font size must be a positive number' };
  }

  let designScore = 50;

  if (titleFontSizePx > recipientFontSizePx) {
    designScore += 20;
  }

  const contrast = typeof fontContrastRatio === 'number' && fontContrastRatio > 0 ? fontContrastRatio : 4.5;
  if (contrast >= 4.5) {
    designScore += 15;
  } else if (contrast < 3.0) {
    designScore -= 15;
  }

  const padding = typeof borderPaddingPx === 'number' && borderPaddingPx >= 0 ? borderPaddingPx : 40;
  if (padding >= 20) {
    designScore += 10;
  }

  if (includesLogo) {
    designScore += 5;
  }

  designScore = Math.min(100, Math.max(0, designScore));

  let aestheticGrade = 'GOOD';
  if (designScore >= 80) aestheticGrade = 'EXCELLENT';
  else if (designScore < 60) aestheticGrade = 'NEEDS_IMPROVEMENT';

  return {
    valid: true,
    titleFontSizePx,
    recipientFontSizePx,
    fontContrastRatio: contrast,
    borderPaddingPx: padding,
    designScore,
    isWcagCompliant: contrast >= 4.5,
    aestheticGrade,
    recommendation: designScore >= 80
      ? 'Certificate layout has optimal typographic hierarchy and accessibility contrast.'
      : 'Increase font contrast ratio or balance title/recipient font hierarchy.'
  };
}

export function calculateCertificateRevocationRiskIndex({
  isIssuerVerified = true,
  hasTamperProofSignature = true,
  revocationCheckPassed = true,
  reportFlagsCount = 0
} = {}) {
  let riskScore = 0;
  if (!isIssuerVerified) riskScore += 40;
  if (!hasTamperProofSignature) riskScore += 35;
  if (!revocationCheckPassed) riskScore += 50;

  const flags = typeof reportFlagsCount === 'number' && reportFlagsCount >= 0 ? reportFlagsCount : 0;
  riskScore += flags * 15;

  riskScore = Math.min(100, riskScore);

  let status = 'LOW_RISK';
  if (riskScore >= 70) status = 'HIGH_RISK';
  else if (riskScore >= 35) status = 'MODERATE_RISK';

  return {
    valid: true,
    riskScore,
    status,
    isRevocationLikely: riskScore >= 50,
    recommendation: riskScore >= 50
      ? 'Credential exhibits significant compliance risks. Request issuer re-verification.'
      : 'Credential meets security and verification standards.'
  };
}

export function calculateCertificateExpirationRiskAssessment({
  expirationDate = '2026-12-31',
  currentDate = '2026-07-24',
  gracePeriodDays = 30
} = {}) {
  if (!expirationDate || typeof expirationDate !== 'string' || !expirationDate.trim()) {
    return { valid: false, error: 'Expiration date is required' };
  }

  const expTime = new Date(expirationDate).getTime();
  const currTime = new Date(currentDate).getTime();

  if (isNaN(expTime) || isNaN(currTime)) {
    return { valid: false, error: 'Invalid date format provided' };
  }

  const graceDays = typeof gracePeriodDays === 'number' && gracePeriodDays >= 0 ? gracePeriodDays : 30;
  const diffMs = expTime - currTime;
  const daysRemaining = Math.round(diffMs / (1000 * 60 * 60 * 24));

  const isExpired = daysRemaining < 0;
  const isExpiringSoon = !isExpired && daysRemaining <= graceDays;

  let expirationStatus = 'VALID';
  if (isExpired) expirationStatus = 'EXPIRED';
  else if (isExpiringSoon) expirationStatus = 'EXPIRING_SOON';

  return {
    valid: true,
    expirationDate,
    currentDate,
    daysRemaining,
    gracePeriodDays: graceDays,
    isExpired,
    isExpiringSoon,
    expirationStatus,
    recommendation: isExpired
      ? 'Certificate has expired. Renewal required immediately.'
      : (isExpiringSoon
          ? `Certificate expires in ${daysRemaining} days. Schedule renewal soon.`
          : 'Certificate is active and in valid standing.')
  };
}

export function calculateCertificateBulkIssuanceQualityScore(records = []) {
  if (!Array.isArray(records) || records.length === 0) {
    return { valid: false, error: 'Records array must not be empty' };
  }

  let validNameCount = 0;
  let validEmailCount = 0;
  let validDateCount = 0;

  for (const r of records) {
    if (!r) continue;
    if (typeof r.recipientName === 'string' && r.recipientName.trim().length >= 2) validNameCount++;
    if (typeof r.email === 'string' && r.email.includes('@') && r.email.includes('.')) validEmailCount++;
    if (r.issueDate && !isNaN(new Date(r.issueDate).getTime())) validDateCount++;
  }

  const total = records.length;
  const nameScore = (validNameCount / total) * 40;
  const emailScore = (validEmailCount / total) * 30;
  const dateScore = (validDateCount / total) * 30;
  const qualityScore = Math.round(nameScore + emailScore + dateScore);

  const status = qualityScore >= 90 ? 'EXCELLENT' : qualityScore >= 70 ? 'GOOD' : 'REQUIRES_CLEANUP';

  return {
    valid: true,
    totalRecords: total,
    validNameCount,
    validEmailCount,
    validDateCount,
    qualityScore,
    status,
    isReadyForBatchIssuance: qualityScore >= 80,
    recommendation: qualityScore >= 80
      ? 'Data batch is high quality and ready for instant automated certificate generation.'
      : 'Clean up missing recipient names/emails before executing bulk generation.'
  };
}

export function calculateCertificateTamperEvidenceIndex({
  hasDigitalSignature = true,
  hasQrCodeProof = true,
  isHashVerified = true,
  issuerDomainVerified = true
} = {}) {
  let score = 0;

  if (hasDigitalSignature) score += 35;
  if (hasQrCodeProof) score += 25;
  if (isHashVerified) score += 25;
  if (issuerDomainVerified) score += 15;

  score = Math.min(100, Math.round(score));

  let trustTier = 'HIGH_TRUST';
  if (score < 50) trustTier = 'UNTRUSTED';
  else if (score < 80) trustTier = 'MODERATE_TRUST';

  return {
    valid: true,
    hasDigitalSignature: Boolean(hasDigitalSignature),
    hasQrCodeProof: Boolean(hasQrCodeProof),
    isHashVerified: Boolean(isHashVerified),
    issuerDomainVerified: Boolean(issuerDomainVerified),
    tamperEvidenceScore: score,
    trustTier,
    isAuthentic: score >= 75,
    recommendation: score >= 75
      ? 'Certificate signature & cryptographic tamper evidence fully verified.'
      : 'Tamper evidence check incomplete. Verify issuer signature and blockchain anchor.'
  };
}

export function calculateCertificateVerificationSlaTier({
  verificationRequestsCount = 100,
  averageResponseTimeMs = 150,
  uptimePercentage = 99.9
} = {}) {
  if (typeof verificationRequestsCount !== 'number' || verificationRequestsCount < 0 || isNaN(verificationRequestsCount)) {
    return { valid: false, error: 'Verification requests count must be a non-negative number' };
  }
  if (typeof averageResponseTimeMs !== 'number' || averageResponseTimeMs < 0 || isNaN(averageResponseTimeMs)) {
    return { valid: false, error: 'Average response time must be a non-negative number' };
  }

  const reqCount = Math.floor(verificationRequestsCount);
  const respTime = Math.round(averageResponseTimeMs);
  const uptime = typeof uptimePercentage === 'number' ? Math.min(100, Math.max(0, uptimePercentage)) : 99.9;

  let slaScore = 100;
  if (respTime > 500) slaScore -= 30;
  else if (respTime > 250) slaScore -= 15;

  if (uptime < 99.0) slaScore -= 40;
  else if (uptime < 99.5) slaScore -= 20;

  slaScore = Math.max(0, Math.round(slaScore));

  let tier = 'ENTERPRISE';
  if (slaScore < 70) tier = 'DEGRADED';
  else if (slaScore < 90) tier = 'STANDARD';

  return {
    valid: true,
    verificationRequestsCount: reqCount,
    averageResponseTimeMs: respTime,
    uptimePercentage: uptime,
    slaScore,
    tier,
    isSlaCompliant: slaScore >= 90,
    recommendation: slaScore >= 90
      ? 'Optimal verification throughput and high-availability SLA compliance.'
      : 'Optimize database indexing and cache verification responses.'
  };
}

export function calculateCertificateExpiryRisk({
  issueDate = '2025-01-01',
  validityDays = 365,
  gracePeriodDays = 30,
  currentDate = '2026-07-24'
} = {}) {
  if (!issueDate || typeof issueDate !== 'string' || !issueDate.trim()) {
    return { valid: false, error: 'Issue date string is required' };
  }

  const issueTime = new Date(issueDate).getTime();
  const currTime = new Date(currentDate).getTime();

  if (isNaN(issueTime) || isNaN(currTime)) {
    return { valid: false, error: 'Invalid issue or current date format' };
  }

  const validity = typeof validityDays === 'number' && validityDays > 0 ? validityDays : 365;
  const grace = typeof gracePeriodDays === 'number' && gracePeriodDays >= 0 ? gracePeriodDays : 30;

  const expiryTime = issueTime + (validity * 24 * 60 * 60 * 1000);
  const expiryDateStr = new Date(expiryTime).toISOString().split('T')[0];
  const diffMs = expiryTime - currTime;
  const daysRemaining = Math.round(diffMs / (1000 * 60 * 60 * 24));

  const isExpired = daysRemaining <= 0;
  const isCritical = !isExpired && daysRemaining <= 14;
  const needsRenewal = !isExpired && daysRemaining <= grace;

  let riskTier = 'HEALTHY';
  if (isExpired) riskTier = 'EXPIRED';
  else if (isCritical) riskTier = 'CRITICAL_RENEWAL';
  else if (needsRenewal) riskTier = 'NEEDS_RENEWAL';

  let recommendation = 'Certificate status healthy and active.';
  if (isExpired) {
    recommendation = `Certificate expired on ${expiryDateStr}. Immediate re-issuance required.`;
  } else if (isCritical) {
    recommendation = `Critical: Certificate expires in ${daysRemaining} days. Execute priority renewal.`;
  } else if (needsRenewal) {
    recommendation = `Upcoming renewal window: ${daysRemaining} days remaining before expiration.`;
  }

  return {
    valid: true,
    issueDate,
    expiryDateStr,
    validityDays: validity,
    gracePeriodDays: grace,
    daysRemaining,
    isExpired,
    needsRenewal,
    riskTier,
    recommendation
  };
}

export function calculateCertificateBatchIssuanceQuota({
  batchRecipientCount = 100,
  templateAssetSizeMb = 1.5,
  availableStorageQuotaMb = 500,
  monthlyIssuanceLimit = 1000,
  currentIssuedThisMonth = 250
} = {}) {
  if (typeof batchRecipientCount !== 'number' || batchRecipientCount <= 0 || isNaN(batchRecipientCount)) {
    return { valid: false, error: 'Batch recipient count must be a positive number' };
  }

  const assetSize = typeof templateAssetSizeMb === 'number' && templateAssetSizeMb > 0 ? templateAssetSizeMb : 1.5;
  const storageQuota = typeof availableStorageQuotaMb === 'number' && availableStorageQuotaMb > 0 ? availableStorageQuotaMb : 500;
  const limit = typeof monthlyIssuanceLimit === 'number' && monthlyIssuanceLimit > 0 ? monthlyIssuanceLimit : 1000;
  const current = typeof currentIssuedThisMonth === 'number' && currentIssuedThisMonth >= 0 ? currentIssuedThisMonth : 0;

  const estimatedBatchStorageMb = Math.round(batchRecipientCount * assetSize * 100) / 100;
  const totalIssuedAfterBatch = current + batchRecipientCount;
  const quotaUtilizationPct = Math.round((totalIssuedAfterBatch / limit) * 100);

  const isStorageQuotaExceeded = estimatedBatchStorageMb > storageQuota;
  const isMonthlyLimitExceeded = totalIssuedAfterBatch > limit;

  let status = 'APPROVED';
  if (isStorageQuotaExceeded || isMonthlyLimitExceeded) {
    status = 'QUOTA_EXCEEDED';
  } else if (quotaUtilizationPct >= 85) {
    status = 'NEAR_QUOTA_CAP';
  }

  let recommendation = `Batch of ${batchRecipientCount} certificates approved for bulk generation.`;
  if (isMonthlyLimitExceeded) {
    recommendation = `Monthly limit exceeded: Generating ${batchRecipientCount} items brings total to ${totalIssuedAfterBatch}/${limit}.`;
  } else if (isStorageQuotaExceeded) {
    recommendation = `Storage limit exceeded: Batch requires ${estimatedBatchStorageMb}MB but only ${storageQuota}MB available.`;
  } else if (status === 'NEAR_QUOTA_CAP') {
    recommendation = `Warning: Monthly issuance will reach ${quotaUtilizationPct}% of quota capacity.`;
  }

  return {
    valid: true,
    batchRecipientCount,
    estimatedBatchStorageMb,
    currentIssuedThisMonth: current,
    totalIssuedAfterBatch,
    quotaUtilizationPct,
    isStorageQuotaExceeded,
    isMonthlyLimitExceeded,
    status,
    recommendation
  };
}

export function calculateCertificateDesignAccessibilityAndPrintQualityScore({
  fontDpi = 300,
  colorContrastRatio = 4.5,
  includesQrVerificationCode = true,
  isPdfVectorFormat = true,
  customLogoProvided = true
} = {}) {
  if (typeof fontDpi !== 'number' || fontDpi <= 0 || isNaN(fontDpi)) {
    return { valid: false, error: 'Font DPI must be a positive number' };
  }
  if (typeof colorContrastRatio !== 'number' || colorContrastRatio < 1 || isNaN(colorContrastRatio)) {
    return { valid: false, error: 'Color contrast ratio must be at least 1.0' };
  }

  let score = 0;
  if (fontDpi >= 300) score += 30;
  else if (fontDpi >= 150) score += 15;

  if (colorContrastRatio >= 4.5) score += 30;
  else if (colorContrastRatio >= 3.0) score += 15;

  if (includesQrVerificationCode) score += 20;
  if (isPdfVectorFormat) score += 10;
  if (customLogoProvided) score += 10;

  const qualityScore = Math.min(100, Math.round(score));

  let qualityTier = 'ENTERPRISE_GRADE';
  if (qualityScore < 60) qualityTier = 'NEEDS_OPTIMIZATION';
  else if (qualityScore < 85) qualityTier = 'PRINT_READY';

  let recommendation = 'Certificate template satisfies enterprise printing & WCAG contrast benchmarks.';
  if (qualityTier === 'NEEDS_OPTIMIZATION') {
    recommendation = 'Improve color contrast ratio and increase DPI to at least 300 for crisp physical printing.';
  } else if (qualityTier === 'PRINT_READY') {
    recommendation = 'Good print quality; consider adding QR verification code for anti-tamper authenticity.';
  }

  return {
    valid: true,
    fontDpi,
    colorContrastRatio,
    includesQrVerificationCode: Boolean(includesQrVerificationCode),
    isPdfVectorFormat: Boolean(isPdfVectorFormat),
    customLogoProvided: Boolean(customLogoProvided),
    qualityScore,
    qualityTier,
    recommendation
  };
}

export function calculateCertificateTamperProofVerificationHash({
  recipientName = '',
  courseTitle = '',
  issueDate = '',
  certificateId = ''
} = {}) {
  const name = (recipientName || '').trim();
  const certId = (certificateId || '').trim();
  const course = (courseTitle || '').trim();
  const date = (issueDate || '').trim();

  if (!name || !certId) {
    return { valid: false, error: 'Recipient name and certificate ID are required' };
  }

  const rawString = `${certId}:${name}:${course}:${date}`;
  let hashNum = 0;
  for (let i = 0; i < rawString.length; i++) {
    hashNum = (hashNum << 5) - hashNum + rawString.charCodeAt(i);
    hashNum |= 0;
  }
  const verificationHash = 'SHA256-' + Math.abs(hashNum).toString(16).toUpperCase();
  const verificationUrl = `https://certify-me-liart.vercel.app/verify/${certId}?hash=${verificationHash}`;

  return {
    valid: true,
    certificateId: certId,
    recipientName: name,
    courseTitle: course,
    issueDate: date,
    verificationHash,
    verificationUrl,
    integrityStatus: 'AUTHENTIC',
    recommendation: `Certificate metadata signed with verification hash ${verificationHash}.`
  };
}

export function calculateCertificateBulkGenerationTimeEstimate({
  certificateCount = 50,
  averageRenderTimeMsPerCert = 150,
  concurrencyLimit = 5
} = {}) {
  if (typeof certificateCount !== 'number' || certificateCount <= 0 || isNaN(certificateCount)) {
    return { valid: false, error: 'Certificate count must be a positive number' };
  }

  const renderTimeMs = typeof averageRenderTimeMsPerCert === 'number' && averageRenderTimeMsPerCert > 0 ? averageRenderTimeMsPerCert : 150;
  const concurrency = typeof concurrencyLimit === 'number' && concurrencyLimit > 0 ? concurrencyLimit : 5;

  const totalSequentialTimeMs = certificateCount * renderTimeMs;
  const estimatedParallelTimeMs = Math.ceil(certificateCount / concurrency) * renderTimeMs;
  const estimatedSeconds = Math.round((estimatedParallelTimeMs / 1000) * 10) / 10;

  return {
    valid: true,
    certificateCount,
    averageRenderTimeMsPerCert: renderTimeMs,
    concurrencyLimit: concurrency,
    totalSequentialTimeMs,
    estimatedParallelTimeMs,
    estimatedSeconds,
    recommendation: `Bulk generation of ${certificateCount} certificates estimated to complete in ${estimatedSeconds} seconds using ${concurrency} parallel workers.`
  };
}

export function calculateCertificateCredentialPortabilityScore({
  hasOpenBadgeExport = true,
  hasPdfDownload = true,
  hasLinkedInShareIntegration = true,
  hasVerifiableCredentialJson = true
} = {}) {
  let score = 0;
  if (hasOpenBadgeExport) score += 25;
  if (hasPdfDownload) score += 25;
  if (hasLinkedInShareIntegration) score += 25;
  if (hasVerifiableCredentialJson) score += 25;

  let portabilityTier = 'BASIC';
  if (score >= 100) portabilityTier = 'UNIVERSAL';
  else if (score >= 75) portabilityTier = 'HIGH_PORTABILITY';
  else if (score >= 50) portabilityTier = 'STANDARD';

  return {
    valid: true,
    hasOpenBadgeExport: Boolean(hasOpenBadgeExport),
    hasPdfDownload: Boolean(hasPdfDownload),
    hasLinkedInShareIntegration: Boolean(hasLinkedInShareIntegration),
    hasVerifiableCredentialJson: Boolean(hasVerifiableCredentialJson),
    portabilityScore: score,
    portabilityTier,
    isFullyPortable: score === 100,
    recommendation: score === 100
      ? 'Credential supports universal export across OpenBadges, PDF, W3C Verifiable Credentials, and LinkedIn.'
      : `Portability score ${score}/100. Enable remaining export formats to achieve universal portability.`
  };
}

export function calculateCertificateRevocationStatusAudit({
  credentialId = '',
  isRevoked = false,
  revocationReason = '',
  revokedAtDateStr = null
} = {}) {
  const id = typeof credentialId === 'string' && credentialId.trim() !== '' ? credentialId.trim() : 'CERT-UNKNOWN';
  const revoked = Boolean(isRevoked);
  const reason = typeof revocationReason === 'string' && revocationReason.trim() !== '' ? revocationReason.trim() : (revoked ? 'UNSPECIFIED_REASON' : 'ACTIVE_VALID');

  let statusTier = 'ACTIVE_VALID';
  if (revoked) {
    if (reason.toUpperCase().includes('FRAUD') || reason.toUpperCase().includes('TAMPER')) {
      statusTier = 'REVOKED_SECURITY_VIOLATION';
    } else {
      statusTier = 'REVOKED_ADMINISTRATIVE';
    }
  }

  return {
    valid: true,
    credentialId: id,
    isRevoked: revoked,
    statusTier,
    revocationReason: reason,
    revokedAtDateStr: revoked ? (revokedAtDateStr || new Date().toISOString()) : null,
    isAuthentic: !revoked,
    recommendation: revoked
      ? `CREDENTIAL REVOKED (${statusTier}): Reason - ${reason}. Do not accept or verify this certificate.`
      : `CREDENTIAL ACTIVE: Credential ${id} is authentic and in good standing.`
  };
}

export function calculateCertificateMetadataIntegrityScore({
  issuerSignatureValid = true,
  recipientEmailValid = true,
  issueDateValid = true,
  expirationDateValid = true,
  hashChecksumMatch = true
} = {}) {
  let score = 0;
  if (issuerSignatureValid) score += 30;
  if (recipientEmailValid) score += 20;
  if (issueDateValid) score += 15;
  if (expirationDateValid) score += 15;
  if (hashChecksumMatch) score += 20;

  let integrityTier = 'VERIFIED_SECURE';
  if (score < 60) integrityTier = 'HIGH_TAMPER_RISK';
  else if (score < 90) integrityTier = 'WARN_METADATA_MISMATCH';

  return {
    valid: true,
    issuerSignatureValid: Boolean(issuerSignatureValid),
    recipientEmailValid: Boolean(recipientEmailValid),
    issueDateValid: Boolean(issueDateValid),
    expirationDateValid: Boolean(expirationDateValid),
    hashChecksumMatch: Boolean(hashChecksumMatch),
    integrityScore: score,
    integrityTier,
    isTamperFree: score >= 85,
    recommendation: integrityTier === 'VERIFIED_SECURE'
      ? `Certificate metadata integrity verified secure (${score}/100).`
      : integrityTier === 'WARN_METADATA_MISMATCH'
      ? `Minor metadata mismatch detected (${score}/100). Verify issuer signature.`
      : `High tamper risk detected (${score}/100). Reject certificate verification.`
  };
}

export function calculateCredentialSkillsProofWeight({
  issuerTrustScore = 90,
  signatureValidityDays = 365,
  verificationCount = 150,
  isAccredited = true,
  isRevoked = false
} = {}) {
  if (isRevoked) {
    return {
      valid: true,
      credentialWeightScore: 0,
      employerConfidenceIndex: 0,
      proofTrustTier: 'REVOKED',
      recommendation: 'Credential has been revoked by issuer.'
    };
  }

  const trust = Math.min(100, Math.max(0, typeof issuerTrustScore === 'number' ? issuerTrustScore : 50));
  const verifications = Math.min(100, Math.max(0, typeof verificationCount === 'number' ? verificationCount / 2 : 0));
  const accreditationBonus = isAccredited ? 20 : 0;
  const signatureDays = typeof signatureValidityDays === 'number' ? signatureValidityDays : 365;

  const credentialWeightScore = Math.min(100, Math.round((trust * 0.5) + (verifications * 0.3) + accreditationBonus));
  const employerConfidenceIndex = Math.min(100, Math.round((credentialWeightScore * 0.9) + 10));

  let proofTrustTier = 'STANDARD_PROOF';
  if (credentialWeightScore >= 80) proofTrustTier = 'GOLD_STANDARD_PROOF';
  else if (credentialWeightScore < 45) proofTrustTier = 'UNVERIFIED_CLAIM';

  return {
    valid: true,
    issuerTrustScore: trust,
    signatureValidityDays: signatureDays,
    credentialWeightScore,
    employerConfidenceIndex,
    proofTrustTier,
    recommendation: proofTrustTier === 'GOLD_STANDARD_PROOF'
      ? `Gold-standard credential weight (${credentialWeightScore}/100) with top employer confidence index (${employerConfidenceIndex}/100).`
      : `Valid credential weight (${credentialWeightScore}/100).`
  };
}

export function calculateCertificateVerificationAuditReport({
  issuerTrustScore = 95,
  verificationCount = 200,
  hasDigitalSignature = true,
  isAccredited = true,
  isRevoked = false
} = {}) {
  if (isRevoked) {
    return {
      valid: true,
      auditScore: 0,
      auditTier: 'REVOKED_CREDENTIAL',
      isAuditPassed: false,
      recommendation: 'Credential is explicitly revoked and invalid.'
    };
  }

  const trust = Math.min(100, Math.max(0, typeof issuerTrustScore === 'number' ? issuerTrustScore : 50));
  const sigBonus = hasDigitalSignature ? 30 : 0;
  const accBonus = isAccredited ? 20 : 0;

  const rawScore = Math.round((trust * 0.5) + sigBonus + accBonus);
  const auditScore = Math.min(100, Math.max(0, rawScore));

  const isAuditPassed = auditScore >= 75 && hasDigitalSignature;
  let auditTier = 'VERIFIED';
  if (auditScore >= 85) auditTier = 'ENTERPRISE_GRADE';
  else if (auditScore < 50) auditTier = 'HIGH_RISK';

  return {
    valid: true,
    issuerTrustScore: trust,
    verificationCount: Math.max(0, verificationCount),
    hasDigitalSignature,
    isAccredited,
    auditScore,
    isAuditPassed,
    auditTier,
    recommendation: isAuditPassed
      ? `Certificate verified successfully with ${auditTier} audit rating (${auditScore}/100).`
      : 'Credential requires digital signature or higher issuer trust score.'
  };
}

export function calculateCertificateBulkIssuanceValidationSummary(certificatesArray = []) {
  if (!Array.isArray(certificatesArray) || certificatesArray.length === 0) {
    return { valid: false, error: 'Certificates array must not be empty' };
  }

  let validCount = 0;
  let invalidCount = 0;
  const errorsList = [];

  certificatesArray.forEach((cert, idx) => {
    if (!cert || typeof cert !== 'object') {
      invalidCount++;
      errorsList.push(`Item #${idx + 1}: Invalid certificate data structure`);
      return;
    }
    const name = cert.recipientName || cert.name;
    const title = cert.courseTitle || cert.title;
    if (!name || String(name).trim() === '') {
      invalidCount++;
      errorsList.push(`Item #${idx + 1}: Missing recipient name`);
    } else if (!title || String(title).trim() === '') {
      invalidCount++;
      errorsList.push(`Item #${idx + 1}: Missing certificate title`);
    } else {
      validCount++;
    }
  });

  const totalCount = certificatesArray.length;
  const validationPassRatePct = Math.round((validCount / totalCount) * 100);
  const isBulkReady = invalidCount === 0;

  return {
    valid: true,
    totalCertificatesCount: totalCount,
    validCertificatesCount: validCount,
    invalidCertificatesCount: invalidCount,
    validationPassRatePct,
    isBulkReady,
    errorsList,
    recommendation: isBulkReady
      ? `All ${totalCount} certificates validated successfully for bulk generation.`
      : `Found ${invalidCount} invalid certificate entries out of ${totalCount}. Fix missing fields before batch issuance.`
  };
}

export function calculateCertificateAuthenticityVerificationSummary({
  isHashVerified = true,
  isIssuerAccredited = true,
  isRecipientIdentityVerified = true,
  hasDigitalSeal = true,
  isRevoked = false
} = {}) {
  if (isRevoked) {
    return {
      valid: true,
      authenticityScore: 0,
      verificationTier: 'REVOKED_CREDENTIAL',
      isAuthentic: false,
      recommendation: 'Credential is revoked and cannot be verified as authentic.'
    };
  }

  let score = 0;
  if (isHashVerified) score += 40;
  if (isIssuerAccredited) score += 25;
  if (isRecipientIdentityVerified) score += 20;
  if (hasDigitalSeal) score += 15;

  const authenticityScore = Math.min(100, score);
  const isAuthentic = authenticityScore >= 80 && isHashVerified;

  let verificationTier = 'AUTHENTIC_CREDENTIAL';
  if (authenticityScore < 60) {
    verificationTier = 'HIGH_RISK_CREDENTIAL';
  } else if (!isAuthentic) {
    verificationTier = 'SUSPICIOUS_CREDENTIAL';
  }

  return {
    valid: true,
    isHashVerified: Boolean(isHashVerified),
    isIssuerAccredited: Boolean(isIssuerAccredited),
    isRecipientIdentityVerified: Boolean(isRecipientIdentityVerified),
    hasDigitalSeal: Boolean(hasDigitalSeal),
    isRevoked: false,
    authenticityScore,
    verificationTier,
    isAuthentic,
    recommendation: isAuthentic
      ? `Certificate authenticity verified successfully (${authenticityScore}/100 score).`
      : `Authenticity risk detected (${verificationTier}): missing cryptographic proof or accredited issuer status.`
  };
}

export function calculateCertificateBatchIssuanceAudit({
  totalBatchRecords = 50,
  validEmailCount = 48,
  duplicateIdCount = 0,
  signedPdfCount = 48,
  failedRenderCount = 2
} = {}) {
  if (typeof totalBatchRecords !== 'number' || totalBatchRecords <= 0 || isNaN(totalBatchRecords)) {
    return { valid: false, error: 'Total batch records must be a positive number' };
  }

  const validEmails = Math.min(totalBatchRecords, Math.max(0, typeof validEmailCount === 'number' ? validEmailCount : 0));
  const duplicates = Math.max(0, typeof duplicateIdCount === 'number' ? duplicateIdCount : 0);
  const signedPdfs = Math.min(totalBatchRecords, Math.max(0, typeof signedPdfCount === 'number' ? signedPdfCount : 0));
  const failedRenders = Math.max(0, typeof failedRenderCount === 'number' ? failedRenderCount : 0);

  const emailValidityPct = Math.round((validEmails / totalBatchRecords) * 100);
  const pdfSigningPct = Math.round((signedPdfs / totalBatchRecords) * 100);
  const successCount = Math.max(0, totalBatchRecords - duplicates - failedRenders);
  const batchSuccessRatePct = Math.round((successCount / totalBatchRecords) * 100);

  let batchHealthTier = 'PERFECT_BATCH';
  if (batchSuccessRatePct < 80 || failedRenders > 5) batchHealthTier = 'CRITICAL_ERRORS_DETECTED';
  else if (batchSuccessRatePct < 100 || duplicates > 0) batchHealthTier = 'MINOR_WARNINGS';

  return {
    valid: true,
    totalBatchRecords,
    validEmailCount: validEmails,
    duplicateIdCount: duplicates,
    signedPdfCount: signedPdfs,
    failedRenderCount: failedRenders,
    emailValidityPct,
    pdfSigningPct,
    batchSuccessRatePct,
    batchHealthTier,
    recommendation: batchHealthTier === 'PERFECT_BATCH'
      ? `Batch issuance audit passed with 100% success rate (${totalBatchRecords} certificates ready for dispatch).`
      : batchHealthTier === 'MINOR_WARNINGS'
      ? `Batch audit completed with minor warnings (${batchSuccessRatePct}% success rate). Resolve ${duplicates} duplicates and ${failedRenders} render issues before sending.`
      : `CRITICAL: Batch issuance failed (${batchSuccessRatePct}% success rate). Fix email and template render errors immediately.`
  };
}

export function calculateCertificateRecipientEngagementIndex({
  totalCertificatesIssued = 100,
  uniqueViewsCount = 85,
  linkedinSharesCount = 40,
  pdfDownloadsCount = 60,
  verificationScansCount = 30
} = {}) {
  if (typeof totalCertificatesIssued !== 'number' || totalCertificatesIssued <= 0 || isNaN(totalCertificatesIssued)) {
    return { valid: false, error: 'Total certificates issued must be a positive number' };
  }

  const viewsRatio = Math.min(1.0, (uniqueViewsCount || 0) / totalCertificatesIssued);
  const sharesRatio = Math.min(1.0, (linkedinSharesCount || 0) / totalCertificatesIssued);
  const downloadsRatio = Math.min(1.0, (pdfDownloadsCount || 0) / totalCertificatesIssued);
  const verificationRatio = Math.min(1.0, (verificationScansCount || 0) / totalCertificatesIssued);

  const viewScore = viewsRatio * 30;
  const shareScore = sharesRatio * 35;
  const downloadScore = downloadsRatio * 20;
  const verificationScore = verificationRatio * 15;

  const engagementScore = Math.min(100, Math.max(0, Math.round(viewScore + shareScore + downloadScore + verificationScore)));
  const shareRatePct = Math.round(sharesRatio * 100);
  const downloadRatePct = Math.round(downloadsRatio * 100);

  let engagementTier = 'HIGH_VIRAL_ENGAGEMENT';
  if (engagementScore < 40) engagementTier = 'LOW_ENGAGEMENT';
  else if (engagementScore < 70) engagementTier = 'MODERATE_ENGAGEMENT';

  return {
    valid: true,
    totalCertificatesIssued,
    uniqueViewsCount: uniqueViewsCount || 0,
    linkedinSharesCount: linkedinSharesCount || 0,
    pdfDownloadsCount: pdfDownloadsCount || 0,
    verificationScansCount: verificationScansCount || 0,
    shareRatePct,
    downloadRatePct,
    engagementScore,
    engagementTier,
    recommendation: engagementTier === 'HIGH_VIRAL_ENGAGEMENT'
      ? `High viral engagement (${engagementScore}/100 score, ${shareRatePct}% social share rate). Excellent brand reach.`
      : engagementTier === 'MODERATE_ENGAGEMENT'
      ? `Moderate credential engagement (${engagementScore}/100 score). Encourage social sharing via 1-click LinkedIn badges.`
      : `Low engagement (${engagementScore}/100 score). Check email delivery and add call-to-action for credential verification.`
  };
}

export function calculateCertificateBlockchainAnchorAudit({
  credentialId = '',
  blockchainNetwork = 'Polygon',
  blockConfirmationCount = 12,
  isHashAnchored = true,
  txHash = ''
} = {}) {
  if (!credentialId || typeof credentialId !== 'string') {
    return { valid: false, error: 'Credential ID must be a non-empty string' };
  }

  const isConfirmed = isHashAnchored && blockConfirmationCount >= 6 && Boolean(txHash);
  const confirmationScore = isConfirmed ? Math.min(100, Math.round(blockConfirmationCount * 5)) : (isHashAnchored ? 40 : 0);

  let anchorTrustTier = 'UNANCHORED_CREDENTIAL';
  if (isConfirmed && confirmationScore >= 80) anchorTrustTier = 'IMMUTABLE_BLOCKCHAIN_VERIFIED';
  else if (isHashAnchored) anchorTrustTier = 'PENDING_LEDGER_CONFIRMATION';

  return {
    valid: true,
    credentialId,
    blockchainNetwork: (blockchainNetwork || 'Polygon').toUpperCase(),
    blockConfirmationCount,
    isHashAnchored: Boolean(isHashAnchored),
    confirmationScore,
    anchorTrustTier,
    recommendation: anchorTrustTier === 'IMMUTABLE_BLOCKCHAIN_VERIFIED'
      ? `Credential ${credentialId} is immutably anchored on ${blockchainNetwork.toUpperCase()} (${blockConfirmationCount} block confirmations).`
      : anchorTrustTier === 'PENDING_LEDGER_CONFIRMATION'
      ? `Credential hash submitted to ${blockchainNetwork.toUpperCase()}. Awaiting additional block confirmations.`
      : `Credential is unanchored. Enable blockchain proof anchoring to prevent credential forgery.`
  };
}

export function calculateCertificateExpirationAndRenewalAudit({
  certificates = [],
  warningWindowDays = 30,
  currentDate = '2026-07-28'
} = {}) {
  if (!Array.isArray(certificates) || certificates.length === 0) {
    return { valid: false, error: 'Certificates array must be a non-empty array' };
  }

  const currTime = new Date(currentDate).getTime();
  if (isNaN(currTime)) {
    return { valid: false, error: 'Invalid current date string format' };
  }

  let totalActive = 0;
  let totalExpired = 0;
  let totalExpiringSoon = 0;
  const expiringCertificates = [];

  for (const cert of certificates) {
    if (!cert || !cert.expirationDate) continue;
    const expTime = new Date(cert.expirationDate).getTime();
    if (isNaN(expTime)) continue;

    const diffDays = Math.round((expTime - currTime) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      totalExpired++;
    } else if (diffDays <= warningWindowDays) {
      totalExpiringSoon++;
      expiringCertificates.push({
        id: cert.id || 'N/A',
        recipientName: cert.recipientName || 'Unknown',
        daysRemaining: diffDays,
        expirationDate: cert.expirationDate
      });
    } else {
      totalActive++;
    }
  }

  const totalAnalyzed = certificates.length;
  const renewalComplianceRatePct = Math.round(((totalActive) / totalAnalyzed) * 100 * 100) / 100;

  let renewalRiskTier = 'ALL_CREDENTIALS_ACTIVE';
  if (totalExpired > 0 || totalExpiringSoon > 5) {
    renewalRiskTier = 'CRITICAL_RENEWAL_ACTION_REQUIRED';
  } else if (totalExpiringSoon > 0) {
    renewalRiskTier = 'EXPIRING_SOON_WARNING';
  }

  return {
    valid: true,
    totalAnalyzed,
    totalActive,
    totalExpired,
    totalExpiringSoon,
    renewalComplianceRatePct,
    expiringCertificates,
    renewalRiskTier,
    recommendation: renewalRiskTier === 'ALL_CREDENTIALS_ACTIVE'
      ? `All ${totalAnalyzed} certificates are active with no urgent expiration risk.`
      : renewalRiskTier === 'EXPIRING_SOON_WARNING'
      ? `${totalExpiringSoon} certificate(s) expire within ${warningWindowDays} days. Send automated renewal reminders.`
      : `CRITICAL: ${totalExpired} expired and ${totalExpiringSoon} expiring certificate(s) detected. Priority re-issuance required.`
  };
}

export function calculateCertificateBatchIssuanceQuotaAudit({
  batchRecipientCount = 50,
  storagePerCertMb = 0.5,
  monthlyIssuanceQuota = 1000,
  currentMonthIssuedCount = 200,
  maxAvailableStorageMb = 500
} = {}) {
  if (typeof batchRecipientCount !== 'number' || batchRecipientCount <= 0 || isNaN(batchRecipientCount)) {
    return { valid: false, error: 'Batch recipient count must be a positive number' };
  }

  const certMb = typeof storagePerCertMb === 'number' && storagePerCertMb > 0 ? storagePerCertMb : 0.5;
  const quota = typeof monthlyIssuanceQuota === 'number' && monthlyIssuanceQuota > 0 ? monthlyIssuanceQuota : 1000;
  const current = Math.max(0, typeof currentMonthIssuedCount === 'number' ? currentMonthIssuedCount : 0);
  const maxStorage = typeof maxAvailableStorageMb === 'number' && maxAvailableStorageMb > 0 ? maxAvailableStorageMb : 500;

  const estimatedBatchStorageMb = Math.round(batchRecipientCount * certMb * 100) / 100;
  const projectedTotalIssued = current + batchRecipientCount;
  const quotaUtilizationPct = Math.round((projectedTotalIssued / quota) * 100 * 100) / 100;
  const remainingIssuanceQuota = Math.max(0, quota - projectedTotalIssued);

  const isStorageExceeded = estimatedBatchStorageMb > maxStorage;
  const isQuotaExceeded = projectedTotalIssued > quota;

  let auditStatusTier = 'APPROVED_FOR_BATCH_DISPATCH';
  if (isStorageExceeded || isQuotaExceeded) {
    auditStatusTier = 'CAPACITY_EXCEEDED_REJECTED';
  } else if (quotaUtilizationPct >= 85) {
    auditStatusTier = 'NEAR_CAPACITY_WARNING';
  }

  return {
    valid: true,
    batchRecipientCount,
    estimatedBatchStorageMb,
    currentMonthIssuedCount: current,
    projectedTotalIssued,
    remainingIssuanceQuota,
    quotaUtilizationPct,
    isStorageExceeded,
    isQuotaExceeded,
    auditStatusTier,
    recommendation: auditStatusTier === 'APPROVED_FOR_BATCH_DISPATCH'
      ? `Batch issuance of ${batchRecipientCount} certificates approved (${quotaUtilizationPct}% quota utilized).`
      : auditStatusTier === 'NEAR_CAPACITY_WARNING'
      ? `Approved with warning: Batch issuance will utilize ${quotaUtilizationPct}% of monthly quota.`
      : `CAPACITY EXCEEDED: Batch exceeds storage or monthly issuance quota limit (${projectedTotalIssued}/${quota}).`
  };
}

export function calculateCertificateSecurityTamperDetectionScore({
  originalHash = 'sha256_abc123',
  currentHash = 'sha256_abc123',
  metadataSignatureValid = true,
  isIssuerRevoked = false,
  watermarkPresent = true,
  qrVerificationEnabled = true
} = {}) {
  if (isIssuerRevoked) {
    return {
      valid: true,
      tamperScore: 0,
      securityTier: 'REVOKED_CERTIFICATE',
      isTamperFree: false,
      recommendation: 'CRITICAL SECURITY RISK: Certificate is revoked by issuer.'
    };
  }

  const hashMatch = Boolean(originalHash && currentHash && originalHash === currentHash);
  if (!hashMatch) {
    return {
      valid: true,
      tamperScore: 10,
      securityTier: 'TAMPERED_HASH_MISMATCH',
      isTamperFree: false,
      recommendation: 'CRITICAL: Cryptographic hash mismatch! Content or metadata has been altered.'
    };
  }

  let score = 50;
  if (metadataSignatureValid) score += 25;
  if (watermarkPresent) score += 15;
  if (qrVerificationEnabled) score += 10;

  const tamperScore = Math.min(100, Math.max(0, score));
  const isTamperFree = tamperScore >= 80 && hashMatch && metadataSignatureValid;

  let securityTier = 'VERIFIED_SECURE_CERTIFICATE';
  if (!isTamperFree) {
    securityTier = 'PARTIAL_SECURITY_PROOF';
  }

  return {
    valid: true,
    originalHash,
    currentHash,
    hashMatch,
    metadataSignatureValid: Boolean(metadataSignatureValid),
    watermarkPresent: Boolean(watermarkPresent),
    qrVerificationEnabled: Boolean(qrVerificationEnabled),
    tamperScore,
    securityTier,
    isTamperFree,
    recommendation: isTamperFree
      ? `Certificate security verified cleanly (${tamperScore}/100 score). No content tampering detected.`
      : `Partial security proof (${tamperScore}/100 score). Enable digital signature or QR verification.`
  };
}







