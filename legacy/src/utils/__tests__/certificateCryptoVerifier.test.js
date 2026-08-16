import { describe, it, expect } from 'vitest';
import {
  generateCertificateSecurityChecksum,
  verifyCertificateIntegrity,
  calculateCertificateExpirationAudit
} from '../certificateCryptoVerifier';

describe('certificateCryptoVerifier', () => {
  const sampleCert = {
    id: 'CERT-2026-99',
    recipientName: 'Alice Smith',
    issueDate: '2026-01-15',
    issuer: 'Tech Academy',
    title: 'Full Stack Master'
  };

  it('generates consistent deterministic checksums', () => {
    const checksum1 = generateCertificateSecurityChecksum(sampleCert);
    const checksum2 = generateCertificateSecurityChecksum(sampleCert);
    expect(checksum1).toBe(checksum2);
    expect(checksum1).toMatch(/^cert_sec_[a-f0-9]{32}$/);
  });

  it('verifies untampered certificates successfully', () => {
    const checksum = generateCertificateSecurityChecksum(sampleCert);
    const res = verifyCertificateIntegrity(sampleCert, checksum);
    expect(res.isAuthentic).toBe(true);
    expect(res.warning).toBeUndefined();
  });

  it('detects tampered certificate data', () => {
    const checksum = generateCertificateSecurityChecksum(sampleCert);
    const tamperedCert = { ...sampleCert, recipientName: 'Eve Hacker' };
    const res = verifyCertificateIntegrity(tamperedCert, checksum);
    expect(res.isAuthentic).toBe(false);
    expect(res.warning).toContain('Tamper alert');
  });

  it('audits certificate expiration correctly', () => {
    const active = calculateCertificateExpirationAudit('2026-08-01', 365, '2026-08-06');
    expect(active.status).toBe('ACTIVE');
    expect(active.isCompliant).toBe(true);
    expect(active.remainingDays).toBe(360);

    const expired = calculateCertificateExpirationAudit('2025-01-01', 365, '2026-08-06');
    expect(expired.status).toBe('EXPIRED');
    expect(expired.isCompliant).toBe(false);
    expect(expired.remainingDays).toBe(0);
  });
});
