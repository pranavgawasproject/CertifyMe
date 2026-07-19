import { describe, test, expect } from 'vitest';
import { encodeCertData, decodeCertData } from '../share.js';

describe('CertifyMe Share Utilities', () => {
  test('should encode and decode certificate data accurately', () => {
    const original = {
      recipientName: 'Jane Doe',
      event: 'Hackathon 2026',
      date: '2026-07-19',
      issuer: 'Tech Foundation',
      signature: 'Dr. Smith',
      templateId: 'modern-navy'
    };

    const encoded = encodeCertData(original);
    expect(typeof encoded).toBe('string');
    expect(encoded.length).toBeGreaterThan(0);

    const decoded = decodeCertData(encoded);
    expect(decoded).toEqual(original);
  });

  test('should handle missing fields with fallback defaults', () => {
    const encoded = encodeCertData({});
    const decoded = decodeCertData(encoded);

    expect(decoded).toEqual({
      recipientName: '',
      event: '',
      date: '',
      issuer: '',
      signature: '',
      templateId: 'classic-gold'
    });
  });

  test('should return null when decoding invalid base64 string', () => {
    const decoded = decodeCertData('invalid-non-base64-string!!!');
    expect(decoded).toBeNull();
  });
});
