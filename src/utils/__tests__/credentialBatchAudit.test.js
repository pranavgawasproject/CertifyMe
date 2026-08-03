import { describe, test, expect } from 'vitest';
import { calculateCredentialBatchAudit } from '../credentialBatchAudit.js';

describe('credentialBatchAudit', () => {
  test('evaluates valid certificate batch correctly', () => {
    const futureDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
    const result = calculateCredentialBatchAudit({
      certificates: [
        { id: '1', recipientName: 'Alice', signature: 'sig1', status: 'active', expiryDate: futureDate },
        { id: '2', recipientName: 'Bob', signature: 'sig2', status: 'active', expiryDate: futureDate }
      ]
    });

    expect(result.totalCount).toBe(2);
    expect(result.validCount).toBe(2);
    expect(result.batchIntegrityScore).toBe(100);
    expect(result.integrityTier).toBe('EXCELLENT');
  });

  test('flags expiring and tampered certificates correctly', () => {
    const expiringDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString();
    const result = calculateCredentialBatchAudit({
      certificates: [
        { id: '1', recipientName: 'Alice', signature: 'sig1', status: 'active', expiryDate: expiringDate },
        { id: '2', recipientName: 'Bob', signature: '', isTampered: true, status: 'active' }
      ]
    });

    expect(result.tamperedCount).toBe(1);
    expect(result.expiringSoonCount).toBe(1);
    expect(result.batchIntegrityScore).toBeLessThan(100);
    expect(result.warnings.some(w => w.includes('signature'))).toBe(true);
  });
});
