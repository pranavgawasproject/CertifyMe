/**
 * CertifyMe Credential Batch Integrity & Expiry Audit Utility
 * Analyzes bulk certificate issuing records to verify signature completeness,
 * detect upcoming certificate expiration risks, and calculate verification integrity metrics.
 */

export function calculateCredentialBatchAudit({
  certificates = [],
  warningWindowDays = 30
} = {}) {
  const totalCount = certificates.length;

  if (totalCount === 0) {
    return {
      totalCount: 0,
      validCount: 0,
      expiredCount: 0,
      expiringSoonCount: 0,
      revokedCount: 0,
      tamperedCount: 0,
      batchIntegrityScore: 100,
      integrityTier: 'EXCELLENT',
      warnings: ['Batch contains no certificate records.']
    };
  }

  const now = new Date();
  const warningMs = warningWindowDays * 24 * 60 * 60 * 1000;

  let validCount = 0;
  let expiredCount = 0;
  let expiringSoonCount = 0;
  let revokedCount = 0;
  let tamperedCount = 0;

  certificates.forEach(cert => {
    if (cert.status === 'revoked') {
      revokedCount++;
      return;
    }

    if (cert.isTampered || !cert.signature) {
      tamperedCount++;
      return;
    }

    if (cert.expiryDate) {
      const exp = new Date(cert.expiryDate);
      if (exp < now) {
        expiredCount++;
        return;
      }
      if (exp.getTime() - now.getTime() <= warningMs) {
        expiringSoonCount++;
      }
    }

    validCount++;
  });

  // Calculate batch integrity score (0 - 100)
  const penalty = (tamperedCount * 25 + revokedCount * 10 + expiredCount * 5);
  const rawScore = 100 - Math.round((penalty / totalCount) * 100);
  const batchIntegrityScore = Math.max(0, Math.min(100, rawScore));

  let integrityTier = 'EXCELLENT';
  if (batchIntegrityScore < 60) integrityTier = 'CRITICAL';
  else if (batchIntegrityScore < 80) integrityTier = 'MODERATE';
  else if (batchIntegrityScore < 95) integrityTier = 'GOOD';

  const warnings = [];
  if (tamperedCount > 0) {
    warnings.push(`${tamperedCount} certificate(s) failed cryptographic signature or hash integrity checks.`);
  }
  if (expiringSoonCount > 0) {
    warnings.push(`${expiringSoonCount} certificate(s) will expire within the next ${warningWindowDays} days.`);
  }
  if (expiredCount > 0) {
    warnings.push(`${expiredCount} certificate(s) are past expiration date.`);
  }

  return {
    totalCount,
    validCount,
    expiredCount,
    expiringSoonCount,
    revokedCount,
    tamperedCount,
    batchIntegrityScore,
    integrityTier,
    warnings
  };
}
