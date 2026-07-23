import { describe, it, expect } from 'vitest';
import { generateCredentialId, validateCertificateMetadata, formatCertificateIssueDate, buildVerificationUrl, generateCertificateQRCodeUrl, calculateCertificateExpirationStatus, generateBadgeEmbedCode, calculateCertificateVerificationScore, generateLinkedInShareUrl, calculateCertificateExpiryAndRenewalStatus, calculateCertificateTamperCheck, calculateCertificateRenewalAlert, calculateCertificateBatchIssuanceSummary, generateCertificateEmbedBadgeHTML, calculateCertificateTamperProofSignature, calculateCertificateBulkExportBundleEstimate } from '../certificateVerification.js';




describe('Certificate Verification Utilities', () => {
  describe('generateCredentialId', () => {
    it('generates a formatted credential ID starting with CERT-', () => {
      const id = generateCredentialId('John Doe', '2026-07-20');
      expect(id).toMatch(/^CERT-JOHNDOE-20260720-\d{4}$/);
    });
  });

  describe('validateCertificateMetadata', () => {
    it('returns isValid true for complete certificate metadata', () => {
      const metadata = {
        recipientName: 'Alice Smith',
        courseTitle: 'Full-Stack Web Development',
        issuerName: 'Acme Academy'
      };
      const result = validateCertificateMetadata(metadata);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('returns errors when required fields are missing', () => {
      const result = validateCertificateMetadata({ recipientName: '   ' });
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('formatCertificateIssueDate', () => {
    it('formats ISO dates into readable long date format', () => {
      const formatted = formatCertificateIssueDate('2026-07-20');
      expect(formatted).toContain('2026');
      expect(formatted).toContain('July');
    });
  });

  describe('buildVerificationUrl', () => {
    it('constructs valid verification URL with encoded ID', () => {
      const url = buildVerificationUrl('CERT-123 ABC');
      expect(url).toBe('https://certify-me-liart.vercel.app/verify?id=CERT-123%20ABC');
    });

    it('returns empty string for missing or non-string ID', () => {
      expect(buildVerificationUrl(null)).toBe('');
      expect(buildVerificationUrl(undefined)).toBe('');
    });
  });

  describe('generateCertificateQRCodeUrl', () => {
    it('generates a valid QR server URL with encoded verification link', () => {
      const qrUrl = generateCertificateQRCodeUrl('https://certify.app/verify?id=123', 200);
      expect(qrUrl).toContain('https://api.qrserver.com/v1/create-qr-code/?size=200x200');
      expect(qrUrl).toContain('data=https%3A%2F%2Fcertify.app%2Fverify%3Fid%3D123');
    });

    it('handles empty verification url gracefully', () => {
      expect(generateCertificateQRCodeUrl(null)).toBe('');
    });
  });

  describe('calculateCertificateExpirationStatus', () => {
    it('calculates certificate expiration date and status', () => {
      const future = calculateCertificateExpirationStatus('2026-01-01', 24);
      expect(future.isExpired).toBe(false);
      expect(future.status).toBe('VALID');
      expect(future.expirationDate).toBe('2028-01-01');

      const expired = calculateCertificateExpirationStatus('2020-01-01', 12);
      expect(expired.isExpired).toBe(true);
      expect(expired.status).toBe('EXPIRED');
    });

    it('handles empty input gracefully', () => {
      const res = calculateCertificateExpirationStatus(null);
      expect(res.isExpired).toBe(false);
      expect(res.status).toBe('VALID');
    });
  });

  describe('generateBadgeEmbedCode', () => {
    it('generates valid HTML and Markdown embed code for certificate badges', () => {
      const embed = generateBadgeEmbedCode('CERT-123', 'Alice');
      expect(embed.html).toContain('<a href="https://certify-me-liart.vercel.app/verify?id=CERT-123"');
      expect(embed.html).toContain('alt="Verified Certificate Badge for Alice"');
      expect(embed.markdown).toContain('[![Verified Certificate]');
    });

    it('handles missing credential ID gracefully', () => {
      const res = generateBadgeEmbedCode(null);
      expect(res.html).toBe('');
      expect(res.markdown).toBe('');
    });
  });

  describe('calculateCertificateVerificationScore', () => {
    it('calculates score and authenticity for complete certificate data', () => {
      const cert = {
        recipientName: 'Jane Doe',
        courseTitle: 'React Developer',
        issuerName: 'Tech Academy',
        credentialId: 'CERT-JANE-1234'
      };
      const res = calculateCertificateVerificationScore(cert);
      expect(res.score).toBe(100);
      expect(res.confidence).toBe('HIGH');
      expect(res.isAuthentic).toBe(true);
    });

    it('handles incomplete certificate data gracefully', () => {
      const res = calculateCertificateVerificationScore({});
      expect(res.score).toBe(0);
      expect(res.confidence).toBe('LOW');
      expect(res.isAuthentic).toBe(false);
    });
  });

  describe('generateLinkedInShareUrl', () => {
    it('generates a valid LinkedIn certification add-to-profile URL', () => {
      const res = generateLinkedInShareUrl({
        credentialId: 'CERT-123',
        courseTitle: 'React Dev',
        issuerName: 'CertifyMe Org',
        issueDateStr: '2026-05-15'
      });
      expect(res.linkedInUrl).toContain('https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME');
      expect(res.linkedInUrl).toContain('name=React%20Dev');
      expect(res.linkedInUrl).toContain('organizationName=CertifyMe%20Org');
      expect(res.linkedInUrl).toContain('issueYear=2026');
      expect(res.linkedInUrl).toContain('issueMonth=5');
    });

    it('handles empty inputs gracefully', () => {
      const res = generateLinkedInShareUrl({});
      expect(res.linkedInUrl).toBe('');
    });
  });

  describe('calculateCertificateExpiryAndRenewalStatus', () => {
    it('calculates lifetime status when validityYears is omitted', () => {
      const res = calculateCertificateExpiryAndRenewalStatus('2026-01-01');
      expect(res.status).toBe('LIFETIME');
      expect(res.isExpired).toBe(false);
    });

    it('calculates expired status for past certificates', () => {
      const res = calculateCertificateExpiryAndRenewalStatus('2020-01-01', 2);
      expect(res.status).toBe('EXPIRED');
      expect(res.isExpired).toBe(true);
    });
  });

  describe('calculateCertificateTamperCheck', () => {
    it('returns isTamperFree true for valid credential ID and metadata', () => {
      const res = calculateCertificateTamperCheck('CERT-JOHNDOE-2026', 'John Doe', 'React Mastery', 'CertifyMe');
      expect(res.isTamperFree).toBe(true);
      expect(res.reason).toBe('Certificate integrity verified');
    });

    it('returns isTamperFree false when required metadata is missing', () => {
      const res = calculateCertificateTamperCheck('', 'John Doe', 'React Mastery', 'CertifyMe');
      expect(res.isTamperFree).toBe(false);
      expect(res.reason).toBe('Missing or invalid Credential ID');
    });
  });

  describe('calculateCertificateRenewalAlert', () => {
    it('calculates valid renewal status for active certificates', () => {
      const todayStr = new Date().toISOString().split('T')[0];
      const res = calculateCertificateRenewalAlert(todayStr, 12, 30);
      expect(res.valid).toBe(true);
      expect(res.status).toBe('VALID');
      expect(res.requiresAction).toBe(false);
      expect(res.daysRemaining).toBeGreaterThan(300);
    });

    it('returns error for missing or invalid issue date', () => {
      const res = calculateCertificateRenewalAlert('');
      expect(res.valid).toBe(false);
      expect(res.error).toBe('Issue date string is required');
    });
  });

  describe('calculateCertificateBatchIssuanceSummary', () => {
    it('summarizes valid batch recipient list for issuance', () => {
      const recipients = ['Alice Walker', 'Bob Vance', 'Charlie Brown'];
      const res = calculateCertificateBatchIssuanceSummary(recipients, 'React Dev', 'CertifyMe');
      expect(res.totalRecipients).toBe(3);
      expect(res.validRecipientsCount).toBe(3);
      expect(res.invalidRecipientsCount).toBe(0);
      expect(res.isBatchReady).toBe(true);
      expect(res.previewCredentialIds).toHaveLength(3);
    });

    it('flags empty list gracefully', () => {
      const res = calculateCertificateBatchIssuanceSummary([]);
      expect(res.totalRecipients).toBe(0);
      expect(res.isBatchReady).toBe(false);
      expect(res.validationErrors).toContain('Recipients list cannot be empty');
    });
  });

  describe('generateCertificateEmbedBadgeHTML', () => {
    it('generates valid HTML embed code with verification link', () => {
      const res = generateCertificateEmbedBadgeHTML('CERT-12345', 'React Engineering', 'Alex');
      expect(res.isValid).toBe(true);
      expect(res.embedCode).toContain('React Engineering');
      expect(res.embedCode).toContain('Issued to Alex');
      expect(res.embedCode).toContain('https://certify-me-liart.vercel.app/verify?id=CERT-12345');
    });

    it('returns empty embed code for invalid credential id', () => {
      const res = generateCertificateEmbedBadgeHTML('');
      expect(res.isValid).toBe(false);
      expect(res.embedCode).toBe('');
    });
  });

  describe('calculateCertificateTamperProofSignature', () => {
    it('generates cryptographic checksum signature for valid certificate', () => {
      const res = calculateCertificateTamperProofSignature('CERT-100', 'Alice', 'React', '2026-07-20');
      expect(res.isValid).toBe(true);
      expect(res.signature).toMatch(/^SIG-[0-9A-F]+$/);
      expect(res.verificationChecksum).toContain('CERT-100');
    });

    it('returns invalid for empty credential id', () => {
      const res = calculateCertificateTamperProofSignature('');
      expect(res.isValid).toBe(false);
      expect(res.signature).toBe('');
    });
  });

  describe('calculateCertificateBulkExportBundleEstimate', () => {
    it('calculates bundle export size and generation time estimates', () => {
      const res = calculateCertificateBulkExportBundleEstimate({ certificateCount: 20, includePdf: true, highResolutionPng: true });
      expect(res.valid).toBe(true);
      expect(res.certificateCount).toBe(20);
      expect(res.estimatedTotalMb).toBeGreaterThan(20);
      expect(res.requiresZipCompression).toBe(true);
    });

    it('returns error for invalid certificate count', () => {
      const res = calculateCertificateBulkExportBundleEstimate({ certificateCount: 0 });
      expect(res.valid).toBe(false);
      expect(res.error).toBe('Certificate count must be a positive number');
    });
  });
});









