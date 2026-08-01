import { describe, it, expect } from 'vitest';
import { generateCredentialId, validateCertificateMetadata, formatCertificateIssueDate, buildVerificationUrl, generateCertificateQRCodeUrl, calculateCertificateExpirationStatus, generateBadgeEmbedCode, calculateCertificateVerificationScore, generateLinkedInShareUrl, calculateCertificateExpiryAndRenewalStatus, calculateCertificateTamperCheck, calculateCertificateRenewalAlert, calculateCertificateBatchIssuanceSummary, generateCertificateEmbedBadgeHTML, calculateCertificateTamperProofSignature, calculateCertificateBulkExportBundleEstimate, calculateCertificateSecurityQRVerificationHash, calculateCertificateDesignAestheticScore, calculateCertificateRevocationRiskIndex, calculateCertificateExpirationRiskAssessment, calculateCertificateBulkIssuanceQualityScore, calculateCertificateTamperEvidenceIndex, calculateCertificateVerificationSlaTier, calculateCertificateExpiryRisk, calculateCertificateBatchIssuanceQuota, calculateCertificateDesignAccessibilityAndPrintQualityScore, calculateCertificateTamperProofVerificationHash, calculateCertificateBulkGenerationTimeEstimate, calculateCertificateCredentialPortabilityScore, calculateCertificateRevocationStatusAudit, calculateCertificateMetadataIntegrityScore, calculateCredentialSkillsProofWeight, calculateCertificateVerificationAuditReport, calculateCertificateBulkIssuanceValidationSummary, calculateCertificateAuthenticityVerificationSummary, calculateCertificateBatchIssuanceAudit, calculateCertificateRecipientEngagementIndex, calculateCertificateBlockchainAnchorAudit, calculateCertificateExpirationAndRenewalAudit, calculateCertificateBatchIssuanceQuotaAudit, calculateCertificateSecurityTamperDetectionScore, calculateCertificateBlockchainAnchorVerificationScore, calculateCertificateBulkIssuanceValidationAudit, calculateCertificateVerificationAuditTrailScore, calculateCertificateBulkDeliveryStatusAndFailureRate, calculateCertificateVerificationSecurityScore, calculateCertificateQRVerificationIntegrityScore } from '../certificateVerification.js';














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

  describe('calculateCertificateSecurityQRVerificationHash', () => {
    it('generates security hash and QR payload URL for valid certificate', () => {
      const res = calculateCertificateSecurityQRVerificationHash({ credentialId: 'CERT-100', recipientName: 'Jane', issueDate: '2026-07-23' });
      expect(res.valid).toBe(true);
      expect(res.securityHash).toMatch(/^QR-HASH-[0-9A-Z]+$/);
      expect(res.qrPayloadUrl).toContain('https://certify-me.vercel.app/verify/CERT-100');
    });

    it('returns error for empty credential id', () => {
      const res = calculateCertificateSecurityQRVerificationHash({ credentialId: '' });
      expect(res.valid).toBe(false);
      expect(res.error).toBe('Credential ID is required');
    });
  });

  describe('calculateCertificateDesignAestheticScore', () => {
    it('calculates design score and WCAG accessibility compliance', () => {
      const res = calculateCertificateDesignAestheticScore({
        titleFontSizePx: 32,
        recipientFontSizePx: 24,
        fontContrastRatio: 4.5,
        borderPaddingPx: 40,
        includesLogo: true
      });
      expect(res.valid).toBe(true);
      expect(res.designScore).toBe(100);
      expect(res.isWcagCompliant).toBe(true);
      expect(res.aestheticGrade).toBe('EXCELLENT');
    });

    it('returns error for invalid non-positive font size', () => {
      const res = calculateCertificateDesignAestheticScore({ titleFontSizePx: 0 });
      expect(res.valid).toBe(false);
      expect(res.error).toBe('Title font size must be a positive number');
    });
  });

  describe('calculateCertificateRevocationRiskIndex', () => {
    it('calculates low risk for fully verified credential', () => {
      const res = calculateCertificateRevocationRiskIndex({
        isIssuerVerified: true,
        hasTamperProofSignature: true,
        revocationCheckPassed: true,
        reportFlagsCount: 0
      });
      expect(res.valid).toBe(true);
      expect(res.riskScore).toBe(0);
      expect(res.status).toBe('LOW_RISK');
      expect(res.isRevocationLikely).toBe(false);
    });

    it('flags high risk when issuer unverified and revocation check fails', () => {
      const res = calculateCertificateRevocationRiskIndex({
        isIssuerVerified: false,
        hasTamperProofSignature: false,
        revocationCheckPassed: false,
        reportFlagsCount: 2
      });
      expect(res.valid).toBe(true);
      expect(res.riskScore).toBe(100);
      expect(res.status).toBe('HIGH_RISK');
      expect(res.isRevocationLikely).toBe(true);
    });
  });

  describe('calculateCertificateExpirationRiskAssessment', () => {
    it('calculates valid status for active certificate', () => {
      const res = calculateCertificateExpirationRiskAssessment({
        expirationDate: '2026-12-31',
        currentDate: '2026-07-24',
        gracePeriodDays: 30
      });
      expect(res.valid).toBe(true);
      expect(res.isExpired).toBe(false);
      expect(res.isExpiringSoon).toBe(false);
      expect(res.expirationStatus).toBe('VALID');
    });

    it('returns error for empty expiration date', () => {
      const res = calculateCertificateExpirationRiskAssessment({ expirationDate: '' });
      expect(res.valid).toBe(false);
      expect(res.error).toBe('Expiration date is required');
    });
  });

  describe('calculateCertificateBulkIssuanceQualityScore', () => {
    it('calculates EXCELLENT quality score for clean record batch', () => {
      const records = [
        { recipientName: 'Alice', email: 'alice@example.com', issueDate: '2026-07-20' },
        { recipientName: 'Bob', email: 'bob@example.com', issueDate: '2026-07-21' }
      ];
      const res = calculateCertificateBulkIssuanceQualityScore(records);
      expect(res.valid).toBe(true);
      expect(res.qualityScore).toBe(100);
      expect(res.status).toBe('EXCELLENT');
      expect(res.isReadyForBatchIssuance).toBe(true);
    });

    it('returns error for empty records array', () => {
      const res = calculateCertificateBulkIssuanceQualityScore([]);
      expect(res.valid).toBe(false);
      expect(res.error).toBe('Records array must not be empty');
    });
  });

  describe('calculateCertificateTamperEvidenceIndex', () => {
    it('calculates score and HIGH_TRUST tier for fully verified certificate', () => {
      const res = calculateCertificateTamperEvidenceIndex({
        hasDigitalSignature: true,
        hasQrCodeProof: true,
        isHashVerified: true,
        issuerDomainVerified: true
      });
      expect(res.valid).toBe(true);
      expect(res.tamperEvidenceScore).toBe(100);
      expect(res.trustTier).toBe('HIGH_TRUST');
      expect(res.isAuthentic).toBe(true);
    });

    it('flags UNTRUSTED tier when signature and hash verification fail', () => {
      const res = calculateCertificateTamperEvidenceIndex({
        hasDigitalSignature: false,
        hasQrCodeProof: false,
        isHashVerified: false,
        issuerDomainVerified: true
      });
      expect(res.valid).toBe(true);
      expect(res.tamperEvidenceScore).toBe(15);
      expect(res.trustTier).toBe('UNTRUSTED');
      expect(res.isAuthentic).toBe(false);
    });
  });

  describe('calculateCertificateVerificationSlaTier', () => {
    it('calculates ENTERPRISE tier for low latency and high availability', () => {
      const res = calculateCertificateVerificationSlaTier({
        verificationRequestsCount: 500,
        averageResponseTimeMs: 120,
        uptimePercentage: 99.9
      });
      expect(res.valid).toBe(true);
      expect(res.slaScore).toBe(100);
      expect(res.tier).toBe('ENTERPRISE');
      expect(res.isSlaCompliant).toBe(true);
    });

    it('returns error for invalid negative request count', () => {
      const res = calculateCertificateVerificationSlaTier({ verificationRequestsCount: -1 });
      expect(res.valid).toBe(false);
      expect(res.error).toBe('Verification requests count must be a non-negative number');
    });
  });

  describe('calculateCertificateExpiryRisk', () => {
    it('calculates HEALTHY status for active certificate', () => {
      const res = calculateCertificateExpiryRisk({
        issueDate: '2026-01-01',
        validityDays: 365,
        gracePeriodDays: 30,
        currentDate: '2026-07-24'
      });
      expect(res.valid).toBe(true);
      expect(res.riskTier).toBe('HEALTHY');
      expect(res.isExpired).toBe(false);
      expect(res.needsRenewal).toBe(false);
      expect(res.daysRemaining).toBeGreaterThan(100);
    });

    it('identifies EXPIRED certificate', () => {
      const res = calculateCertificateExpiryRisk({
        issueDate: '2024-01-01',
        validityDays: 365,
        currentDate: '2026-07-24'
      });
      expect(res.valid).toBe(true);
      expect(res.riskTier).toBe('EXPIRED');
      expect(res.isExpired).toBe(true);
      expect(res.recommendation).toContain('Immediate re-issuance required');
    });

    it('returns error for empty issue date', () => {
      const res = calculateCertificateExpiryRisk({ issueDate: '' });
      expect(res.valid).toBe(false);
      expect(res.error).toBe('Issue date string is required');
    });
  });

  describe('calculateCertificateBatchIssuanceQuota', () => {
    it('calculates quota utilization and storage estimate accurately', () => {
      const res = calculateCertificateBatchIssuanceQuota({
        batchRecipientCount: 100,
        templateAssetSizeMb: 1.5,
        availableStorageQuotaMb: 500,
        monthlyIssuanceLimit: 1000,
        currentIssuedThisMonth: 250
      });
      expect(res.valid).toBe(true);
      expect(res.estimatedBatchStorageMb).toBe(150);
      expect(res.totalIssuedAfterBatch).toBe(350);
      expect(res.quotaUtilizationPct).toBe(35);
      expect(res.status).toBe('APPROVED');
    });

    it('returns error for invalid recipient count', () => {
      const res = calculateCertificateBatchIssuanceQuota({ batchRecipientCount: -10 });
      expect(res.valid).toBe(false);
      expect(res.error).toBe('Batch recipient count must be a positive number');
    });
  });

  describe('calculateCertificateDesignAccessibilityAndPrintQualityScore', () => {
    it('calculates enterprise grade quality for high DPI and contrast', () => {
      const res = calculateCertificateDesignAccessibilityAndPrintQualityScore({
        fontDpi: 300,
        colorContrastRatio: 5.0,
        includesQrVerificationCode: true,
        isPdfVectorFormat: true,
        customLogoProvided: true
      });
      expect(res.valid).toBe(true);
      expect(res.qualityScore).toBe(100);
      expect(res.qualityTier).toBe('ENTERPRISE_GRADE');
    });

    it('returns warning recommendation for low contrast and low DPI', () => {
      const res = calculateCertificateDesignAccessibilityAndPrintQualityScore({
        fontDpi: 72,
        colorContrastRatio: 2.0,
        includesQrVerificationCode: false,
        isPdfVectorFormat: false,
        customLogoProvided: false
      });
      expect(res.valid).toBe(true);
      expect(res.qualityTier).toBe('NEEDS_OPTIMIZATION');
    });

    it('returns error for invalid DPI or contrast inputs', () => {
      const res = calculateCertificateDesignAccessibilityAndPrintQualityScore({ fontDpi: 0 });
      expect(res.valid).toBe(false);
      expect(res.error).toBe('Font DPI must be a positive number');
    });
  });

  describe('calculateCertificateTamperProofVerificationHash', () => {
    it('generates deterministic verification hash and verification URL', () => {
      const res = calculateCertificateTamperProofVerificationHash({
        recipientName: 'Alice Smith',
        courseTitle: 'Full-Stack Web Dev',
        issueDate: '2026-07-25',
        certificateId: 'CERT-9901'
      });
      expect(res.valid).toBe(true);
      expect(res.verificationHash).toContain('SHA256-');
      expect(res.verificationUrl).toContain('CERT-9901');
      expect(res.integrityStatus).toBe('AUTHENTIC');
    });

    it('returns error when recipientName or certificateId is missing', () => {
      const invalid = calculateCertificateTamperProofVerificationHash({ recipientName: '' });
      expect(invalid.valid).toBe(false);
      expect(invalid.error).toBe('Recipient name and certificate ID are required');
    });
  });

  describe('calculateCertificateBulkGenerationTimeEstimate', () => {
    it('calculates sequential vs parallel rendering time estimates accurately', () => {
      const res = calculateCertificateBulkGenerationTimeEstimate({
        certificateCount: 100,
        averageRenderTimeMsPerCert: 100,
        concurrencyLimit: 4
      });
      expect(res.valid).toBe(true);
      expect(res.totalSequentialTimeMs).toBe(10000);
      expect(res.estimatedParallelTimeMs).toBe(2500);
      expect(res.estimatedSeconds).toBe(2.5);
      expect(res.recommendation).toContain('100 certificates estimated to complete in 2.5 seconds');
    });

    it('returns error for non-positive certificate count', () => {
      const invalid = calculateCertificateBulkGenerationTimeEstimate({ certificateCount: 0 });
      expect(invalid.valid).toBe(false);
      expect(invalid.error).toBe('Certificate count must be a positive number');
    });
  });

  describe('calculateCertificateCredentialPortabilityScore', () => {
    it('calculates score and universality tier accurately for full integrations', () => {
      const res = calculateCertificateCredentialPortabilityScore({
        hasOpenBadgeExport: true,
        hasPdfDownload: true,
        hasLinkedInShareIntegration: true,
        hasVerifiableCredentialJson: true
      });
      expect(res.valid).toBe(true);
      expect(res.portabilityScore).toBe(100);
      expect(res.portabilityTier).toBe('UNIVERSAL');
      expect(res.isFullyPortable).toBe(true);
      expect(res.recommendation).toContain('supports universal export');
    });

    it('calculates score for partial integrations', () => {
      const res = calculateCertificateCredentialPortabilityScore({
        hasOpenBadgeExport: false,
        hasPdfDownload: true,
        hasLinkedInShareIntegration: true,
        hasVerifiableCredentialJson: false
      });
      expect(res.valid).toBe(true);
      expect(res.portabilityScore).toBe(50);
      expect(res.isFullyPortable).toBe(false);
    });
  });

  describe('calculateCertificateRevocationStatusAudit', () => {
    it('returns active status for unrevoked certificate', () => {
      const res = calculateCertificateRevocationStatusAudit({
        credentialId: 'CERT-123',
        isRevoked: false
      });
      expect(res.valid).toBe(true);
      expect(res.isAuthentic).toBe(true);
      expect(res.statusTier).toBe('ACTIVE_VALID');
    });

    it('returns security violation tier when revoked due to fraud', () => {
      const res = calculateCertificateRevocationStatusAudit({
        credentialId: 'CERT-999',
        isRevoked: true,
        revocationReason: 'Fraudulent Identity Verification'
      });
      expect(res.valid).toBe(true);
      expect(res.isAuthentic).toBe(false);
      expect(res.statusTier).toBe('REVOKED_SECURITY_VIOLATION');
      expect(res.recommendation).toContain('CREDENTIAL REVOKED');
    });
  });

  describe('calculateCertificateMetadataIntegrityScore', () => {
    it('calculates 100% score and VERIFIED_SECURE tier for pristine metadata', () => {
      const res = calculateCertificateMetadataIntegrityScore({
        issuerSignatureValid: true,
        recipientEmailValid: true,
        issueDateValid: true,
        expirationDateValid: true,
        hashChecksumMatch: true
      });
      expect(res.valid).toBe(true);
      expect(res.integrityScore).toBe(100);
      expect(res.integrityTier).toBe('VERIFIED_SECURE');
      expect(res.isTamperFree).toBe(true);
    });

    it('flags high tamper risk for invalid signature and checksum', () => {
      const res = calculateCertificateMetadataIntegrityScore({
        issuerSignatureValid: false,
        recipientEmailValid: true,
        issueDateValid: true,
        expirationDateValid: true,
        hashChecksumMatch: false
      });
      expect(res.valid).toBe(true);
      expect(res.integrityScore).toBe(50);
      expect(res.integrityTier).toBe('HIGH_TAMPER_RISK');
      expect(res.isTamperFree).toBe(false);
    });
  });

  describe('calculateCredentialSkillsProofWeight', () => {
    it('calculates gold-standard proof weight correctly', () => {
      const res = calculateCredentialSkillsProofWeight({
        issuerTrustScore: 100,
        signatureValidityDays: 365,
        verificationCount: 200,
        isAccredited: true
      });
      expect(res.valid).toBe(true);
      expect(res.credentialWeightScore).toBe(100);
      expect(res.proofTrustTier).toBe('GOLD_STANDARD_PROOF');
      expect(res.recommendation).toContain('Gold-standard credential weight');
    });

    it('returns score 0 for revoked credentials', () => {
      const res = calculateCredentialSkillsProofWeight({ isRevoked: true });
      expect(res.valid).toBe(true);
      expect(res.credentialWeightScore).toBe(0);
      expect(res.proofTrustTier).toBe('REVOKED');
      expect(res.recommendation).toContain('Credential has been revoked');
    });
  });

  describe('calculateCertificateVerificationAuditReport', () => {
    it('calculates enterprise grade audit score for high trust and valid signature', () => {
      const res = calculateCertificateVerificationAuditReport({
        issuerTrustScore: 95,
        verificationCount: 250,
        hasDigitalSignature: true,
        isAccredited: true
      });
      expect(res.valid).toBe(true);
      expect(res.auditScore).toBe(98);
      expect(res.isAuditPassed).toBe(true);
      expect(res.auditTier).toBe('ENTERPRISE_GRADE');
    });

    it('returns audit failure for revoked credential', () => {
      const res = calculateCertificateVerificationAuditReport({ isRevoked: true });
      expect(res.valid).toBe(true);
      expect(res.auditScore).toBe(0);
      expect(res.isAuditPassed).toBe(false);
      expect(res.auditTier).toBe('REVOKED_CREDENTIAL');
    });
  });

  describe('calculateCertificateBulkIssuanceValidationSummary', () => {
    it('validates batch array and reports 100% pass rate when clean', () => {
      const res = calculateCertificateBulkIssuanceValidationSummary([
        { recipientName: 'Alice', courseTitle: 'React 101' },
        { recipientName: 'Bob', courseTitle: 'Node 101' }
      ]);
      expect(res.valid).toBe(true);
      expect(res.totalCertificatesCount).toBe(2);
      expect(res.validCertificatesCount).toBe(2);
      expect(res.invalidCertificatesCount).toBe(0);
      expect(res.validationPassRatePct).toBe(100);
      expect(res.isBulkReady).toBe(true);
    });

    it('returns error for empty array', () => {
      const res = calculateCertificateBulkIssuanceValidationSummary([]);
      expect(res.valid).toBe(false);
      expect(res.error).toBe('Certificates array must not be empty');
    });
  });

  describe('calculateCertificateAuthenticityVerificationSummary', () => {
    it('evaluates fully authentic credential correctly', () => {
      const res = calculateCertificateAuthenticityVerificationSummary({
        isHashVerified: true,
        isIssuerAccredited: true,
        isRecipientIdentityVerified: true,
        hasDigitalSeal: true,
        isRevoked: false
      });
      expect(res.valid).toBe(true);
      expect(res.authenticityScore).toBe(100);
      expect(res.isAuthentic).toBe(true);
      expect(res.verificationTier).toBe('AUTHENTIC_CREDENTIAL');
      expect(res.recommendation).toContain('verified successfully');
    });

    it('returns revoked credential status when revoked', () => {
      const res = calculateCertificateAuthenticityVerificationSummary({ isRevoked: true });
      expect(res.valid).toBe(true);
      expect(res.authenticityScore).toBe(0);
      expect(res.isAuthentic).toBe(false);
      expect(res.verificationTier).toBe('REVOKED_CREDENTIAL');
      expect(res.recommendation).toContain('revoked');
    });
  });

  describe('calculateCertificateBatchIssuanceAudit', () => {
    it('calculates perfect batch health for 100% valid records', () => {
      const res = calculateCertificateBatchIssuanceAudit({
        totalBatchRecords: 50,
        validEmailCount: 50,
        duplicateIdCount: 0,
        signedPdfCount: 50,
        failedRenderCount: 0
      });
      expect(res.valid).toBe(true);
      expect(res.emailValidityPct).toBe(100);
      expect(res.pdfSigningPct).toBe(100);
      expect(res.batchSuccessRatePct).toBe(100);
      expect(res.batchHealthTier).toBe('PERFECT_BATCH');
    });

    it('identifies minor warnings when duplicates exist', () => {
      const res = calculateCertificateBatchIssuanceAudit({
        totalBatchRecords: 50,
        validEmailCount: 48,
        duplicateIdCount: 2,
        signedPdfCount: 48,
        failedRenderCount: 0
      });
      expect(res.valid).toBe(true);
      expect(res.batchSuccessRatePct).toBe(96);
      expect(res.batchHealthTier).toBe('MINOR_WARNINGS');
    });

    it('returns error for invalid non-positive batch record count', () => {
      const res = calculateCertificateBatchIssuanceAudit({ totalBatchRecords: 0 });
      expect(res.valid).toBe(false);
      expect(res.error).toBe('Total batch records must be a positive number');
    });
  });

  describe('calculateCertificateRecipientEngagementIndex', () => {
    it('calculates HIGH_VIRAL_ENGAGEMENT tier for high views and LinkedIn shares', () => {
      const res = calculateCertificateRecipientEngagementIndex({
        totalCertificatesIssued: 100,
        uniqueViewsCount: 90,
        linkedinSharesCount: 50,
        pdfDownloadsCount: 70,
        verificationScansCount: 40
      });
      expect(res.valid).toBe(true);
      expect(res.engagementScore).toBe(65);
      expect(res.shareRatePct).toBe(50);
      expect(res.downloadRatePct).toBe(70);
    });

    it('identifies LOW_ENGAGEMENT tier when interaction counts are zero or low', () => {
      const res = calculateCertificateRecipientEngagementIndex({
        totalCertificatesIssued: 100,
        uniqueViewsCount: 5,
        linkedinSharesCount: 0,
        pdfDownloadsCount: 2,
        verificationScansCount: 0
      });
      expect(res.valid).toBe(true);
      expect(res.engagementTier).toBe('LOW_ENGAGEMENT');
    });

    it('returns error for invalid non-positive totalCertificatesIssued', () => {
      const res = calculateCertificateRecipientEngagementIndex({ totalCertificatesIssued: 0 });
      expect(res.valid).toBe(false);
      expect(res.error).toBe('Total certificates issued must be a positive number');
    });
  });

  describe('calculateCertificateBlockchainAnchorAudit', () => {
    it('calculates immutable blockchain verified tier for confirmed credential', () => {
      const res = calculateCertificateBlockchainAnchorAudit({
        credentialId: 'CERT-12345',
        blockchainNetwork: 'Polygon',
        blockConfirmationCount: 20,
        isHashAnchored: true,
        txHash: '0xabc123def456'
      });
      expect(res.valid).toBe(true);
      expect(res.anchorTrustTier).toBe('IMMUTABLE_BLOCKCHAIN_VERIFIED');
      expect(res.blockchainNetwork).toBe('POLYGON');
    });

    it('returns error for empty credentialId', () => {
      const res = calculateCertificateBlockchainAnchorAudit({ credentialId: '' });
      expect(res.valid).toBe(false);
      expect(res.error).toBe('Credential ID must be a non-empty string');
    });
  });

  describe('calculateCertificateExpirationAndRenewalAudit', () => {
    it('calculates ALL_CREDENTIALS_ACTIVE tier when all certificates are active', () => {
      const certificates = [
        { id: '1', recipientName: 'Alice', expirationDate: '2027-01-01' },
        { id: '2', recipientName: 'Bob', expirationDate: '2027-06-01' }
      ];
      const res = calculateCertificateExpirationAndRenewalAudit({ certificates, currentDate: '2026-07-28' });
      expect(res.valid).toBe(true);
      expect(res.totalAnalyzed).toBe(2);
      expect(res.totalActive).toBe(2);
      expect(res.totalExpired).toBe(0);
      expect(res.totalExpiringSoon).toBe(0);
      expect(res.renewalRiskTier).toBe('ALL_CREDENTIALS_ACTIVE');
    });

    it('identifies expiring soon certificates within warning window', () => {
      const certificates = [
        { id: '1', recipientName: 'Alice', expirationDate: '2026-08-15' },
        { id: '2', recipientName: 'Bob', expirationDate: '2027-01-01' }
      ];
      const res = calculateCertificateExpirationAndRenewalAudit({ certificates, warningWindowDays: 30, currentDate: '2026-07-28' });
      expect(res.valid).toBe(true);
      expect(res.totalExpiringSoon).toBe(1);
      expect(res.expiringCertificates[0].recipientName).toBe('Alice');
      expect(res.renewalRiskTier).toBe('EXPIRING_SOON_WARNING');
    });

    it('returns error for empty certificates array', () => {
      const res = calculateCertificateExpirationAndRenewalAudit({ certificates: [] });
      expect(res.valid).toBe(false);
      expect(res.error).toBe('Certificates array must be a non-empty array');
    });
  });

  describe('calculateCertificateBatchIssuanceQuotaAudit', () => {
    it('approves batch issuance within quota and storage limits', () => {
      const res = calculateCertificateBatchIssuanceQuotaAudit({
        batchRecipientCount: 50,
        storagePerCertMb: 0.5,
        monthlyIssuanceQuota: 1000,
        currentMonthIssuedCount: 200,
        maxAvailableStorageMb: 500
      });
      expect(res.valid).toBe(true);
      expect(res.batchRecipientCount).toBe(50);
      expect(res.estimatedBatchStorageMb).toBe(25);
      expect(res.projectedTotalIssued).toBe(250);
      expect(res.remainingIssuanceQuota).toBe(750);
      expect(res.quotaUtilizationPct).toBe(25);
      expect(res.auditStatusTier).toBe('APPROVED_FOR_BATCH_DISPATCH');
    });

    it('returns error for non-positive batch recipient count', () => {
      const res = calculateCertificateBatchIssuanceQuotaAudit({ batchRecipientCount: 0 });
      expect(res.valid).toBe(false);
      expect(res.error).toBe('Batch recipient count must be a positive number');
    });
  });

  describe('calculateCertificateSecurityTamperDetectionScore', () => {
    it('verifies tamper-free certificate with valid hashes and digital signature', () => {
      const res = calculateCertificateSecurityTamperDetectionScore({
        originalHash: 'sha256_12345',
        currentHash: 'sha256_12345',
        metadataSignatureValid: true,
        watermarkPresent: true,
        qrVerificationEnabled: true
      });
      expect(res.valid).toBe(true);
      expect(res.tamperScore).toBe(100);
      expect(res.securityTier).toBe('VERIFIED_SECURE_CERTIFICATE');
      expect(res.isTamperFree).toBe(true);
      expect(res.recommendation).toContain('Certificate security verified cleanly');
    });

    it('detects hash mismatch tampering', () => {
      const res = calculateCertificateSecurityTamperDetectionScore({
        originalHash: 'sha256_12345',
        currentHash: 'sha256_99999'
      });
      expect(res.valid).toBe(true);
      expect(res.securityTier).toBe('TAMPERED_HASH_MISMATCH');
      expect(res.isTamperFree).toBe(false);
    });

    it('identifies revoked certificate risk', () => {
      const res = calculateCertificateSecurityTamperDetectionScore({ isIssuerRevoked: true });
      expect(res.valid).toBe(true);
      expect(res.securityTier).toBe('REVOKED_CERTIFICATE');
      expect(res.isTamperFree).toBe(false);
    });
  });

  describe('calculateCertificateBlockchainAnchorVerificationScore', () => {
    it('verifies IMMUTABLE_BLOCKCHAIN_VERIFIED tier for valid proof and high confirmations', () => {
      const res = calculateCertificateBlockchainAnchorVerificationScore({
        merkleProofValid: true,
        blockConfirmationsCount: 15,
        requiredConfirmations: 6,
        isSmartContractActive: true,
        timestampVarianceSeconds: 45
      });
      expect(res.valid).toBe(true);
      expect(res.isBlockchainAnchored).toBe(true);
      expect(res.verificationTier).toBe('IMMUTABLE_BLOCKCHAIN_VERIFIED');
      expect(res.recommendation).toContain('Blockchain anchor verified successfully');
    });

    it('identifies INVALID_MERKLE_PROOF when merkle proof fails', () => {
      const res = calculateCertificateBlockchainAnchorVerificationScore({
        merkleProofValid: false
      });
      expect(res.valid).toBe(true);
      expect(res.isBlockchainAnchored).toBe(false);
      expect(res.verificationTier).toBe('INVALID_MERKLE_PROOF');
    });

    it('identifies CONTRACT_PAUSED_OR_DEPRECATED when contract is inactive', () => {
      const res = calculateCertificateBlockchainAnchorVerificationScore({
        isSmartContractActive: false
      });
      expect(res.valid).toBe(true);
      expect(res.verificationTier).toBe('CONTRACT_PAUSED_OR_DEPRECATED');
    });
  });

  describe('calculateCertificateBulkIssuanceValidationAudit', () => {
    it('validates batch recipient records and approves clean data', () => {
      const recipients = [
        { name: 'Alice Smith', email: 'alice@example.com' },
        { name: 'Bob Jones', email: 'bob@example.com' }
      ];
      const res = calculateCertificateBulkIssuanceValidationAudit({ recipients });
      expect(res.valid).toBe(true);
      expect(res.totalCount).toBe(2);
      expect(res.validCount).toBe(2);
      expect(res.invalidCount).toBe(0);
      expect(res.batchValidityPercentage).toBe(100);
      expect(res.auditTier).toBe('READY_FOR_BULK_ISSUANCE');
    });

    it('identifies invalid email syntax and duplicates in batch', () => {
      const recipients = [
        { name: 'Alice Smith', email: 'alice@example.com' },
        { name: 'Duplicate Alice', email: 'alice@example.com' },
        { name: 'Bad Email', email: 'invalid-email-format' }
      ];
      const res = calculateCertificateBulkIssuanceValidationAudit({ recipients });
      expect(res.valid).toBe(true);
      expect(res.validCount).toBe(1);
      expect(res.invalidCount).toBe(2);
      expect(res.duplicateCount).toBe(1);
      expect(res.auditTier).toBe('INVALID_BATCH_DATA');
    });

    it('returns error for empty recipients list', () => {
      const res = calculateCertificateBulkIssuanceValidationAudit({ recipients: [] });
      expect(res.valid).toBe(false);
      expect(res.error).toBe('Recipients list must be a non-empty array');
    });
  });

  describe('calculateCertificateVerificationAuditTrailScore', () => {
    it('calculates cryptographically verified score for complete audit trail', () => {
      const res = calculateCertificateVerificationAuditTrailScore({
        hasDigitalSignature: true,
        hasBlockchainTimestamp: true,
        hasPublicKeyVerification: true,
        isRevocationListChecked: true,
        certificateAgeDays: 30
      });
      expect(res.valid).toBe(true);
      expect(res.totalAuditTrailScore).toBe(100);
      expect(res.auditComplianceTier).toBe('CRYPTOGRAPHICALLY_VERIFIED');
    });

    it('returns error for negative certificate age days', () => {
      const res = calculateCertificateVerificationAuditTrailScore({ certificateAgeDays: -5 });
      expect(res.valid).toBe(false);
      expect(res.error).toBe('Certificate age days must be a non-negative number');
    });
  });

  describe('calculateCertificateBulkDeliveryStatusAndFailureRate', () => {
    it('calculates bulk delivery status and failure rate correctly', () => {
      const res = calculateCertificateBulkDeliveryStatusAndFailureRate({
        totalCertificatesIssued: 100,
        successfulDeliveries: 96,
        bounceFailures: 3,
        invalidEmails: 1
      });
      expect(res.valid).toBe(true);
      expect(res.deliverySuccessRatePct).toBe(96);
      expect(res.failureRatePct).toBe(4);
      expect(res.deliveryHealthTier).toBe('EXCELLENT_DELIVERY');
    });

    it('returns error for non-positive total certificates issued', () => {
      const inv = calculateCertificateBulkDeliveryStatusAndFailureRate({ totalCertificatesIssued: 0 });
      expect(inv.valid).toBe(false);
      expect(inv.error).toBe('Total certificates issued must be a positive number');
    });
  });

  describe('calculateCertificateVerificationSecurityScore', () => {
    it('calculates VERIFIED_SECURE tier for fully signed and domain verified certificate', () => {
      const res = calculateCertificateVerificationSecurityScore({
        hasDigitalSignature: true,
        hasQrCodePayload: true,
        isIssuerDomainVerified: true,
        recipientVerificationCount: 20
      });
      expect(res.valid).toBe(true);
      expect(res.securityScore).toBe(100);
      expect(res.securityTier).toBe('VERIFIED_SECURE');
    });

    it('returns error for negative verification count', () => {
      const inv = calculateCertificateVerificationSecurityScore({ recipientVerificationCount: -1 });
      expect(inv.valid).toBe(false);
      expect(inv.error).toBe('Recipient verification count must be a non-negative number');
    });
  });

  describe('calculateCertificateQRVerificationIntegrityScore', () => {
    it('calculates high integrity score for SSL encrypted and signed QR payload', () => {
      const res = calculateCertificateQRVerificationIntegrityScore({
        qrPayloadLengthBytes: 256,
        isSslEncryptedUrl: true,
        hasIssuerHashSignature: true
      });
      expect(res.valid).toBe(true);
      expect(res.integrityScore).toBe(100);
      expect(res.integrityTier).toBe('HIGH_INTEGRITY_QR');
      expect(res.isAuthentic).toBe(true);
      expect(res.recommendation).toContain('authentic and cryptographically signed');
    });

    it('identifies revoked or expired credential', () => {
      const res = calculateCertificateQRVerificationIntegrityScore({ isExpiredOrRevoked: true });
      expect(res.valid).toBe(true);
      expect(res.integrityScore).toBe(0);
      expect(res.integrityTier).toBe('REVOKED_OR_EXPIRED_CREDENTIAL');
      expect(res.isAuthentic).toBe(false);
    });

    it('returns error for invalid non-positive QR payload length', () => {
      const inv = calculateCertificateQRVerificationIntegrityScore({ qrPayloadLengthBytes: 0 });
      expect(inv.valid).toBe(false);
      expect(inv.error).toBe('QR payload length must be a positive number');
    });
  });
});































