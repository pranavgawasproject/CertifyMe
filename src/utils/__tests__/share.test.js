import { describe, test, expect } from 'vitest';
import { encodeCertData, decodeCertData, buildShareUrl } from '../share.js';

describe('CertifyMe Share Utilities', () => {
  test('should encode and decode certificate data accurately', () => {
    const original = {
      recipientName: 'Jane Doe',
      event: 'Hackathon 2026',
      date: '2026-07-19',
      issuer: 'Tech Foundation',
      signature: 'Dr. Smith',
      templateId: 'modern-minimal',
    };

    const encoded = encodeCertData(original);
    expect(typeof encoded).toBe('string');
    expect(encoded.length).toBeGreaterThan(0);

    const decoded = decodeCertData(encoded);
    expect(decoded).toEqual(original);
  });

  test('should handle unicode characters and emojis in recipient name and event', () => {
    const original = {
      recipientName: 'José María Müller 🎓',
      event: 'Cybersecurity Masterclass 🚀',
      date: 'July 2026',
      issuer: 'Instituto de Tecnolögía',
      signature: 'Prof. Åsa Sætre',
      templateId: 'art-deco',
    };

    const encoded = encodeCertData(original);
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
      templateId: 'classic-gold',
    });
  });

  test('should handle undefined or null input object when encoding', () => {
    const encoded = encodeCertData(null);
    const decoded = decodeCertData(encoded);

    expect(decoded).toEqual({
      recipientName: '',
      event: '',
      date: '',
      issuer: '',
      signature: '',
      templateId: 'classic-gold',
    });
  });

  test('should fallback to classic-gold if templateId is invalid or unknown', () => {
    const original = {
      recipientName: 'Alice',
      event: 'Design 101',
      templateId: 'unknown-hacked-template',
    };

    const encoded = encodeCertData(original);
    const decoded = decodeCertData(encoded);
    expect(decoded.templateId).toBe('classic-gold');
  });

  test('should return null when decoding invalid base64 string', () => {
    expect(decodeCertData('invalid-non-base64-string!!!')).toBeNull();
    expect(decodeCertData('')).toBeNull();
    expect(decodeCertData(null)).toBeNull();
    expect(decodeCertData(undefined)).toBeNull();
    expect(decodeCertData(12345)).toBeNull();
  });

  test('should return null when decoded JSON is not an object', () => {
    // btoa("123") -> "MTIz"
    const encodedNumber = btoa('123');
    expect(decodeCertData(encodedNumber)).toBeNull();

    // btoa('"hello"') -> "ImhlbGxvIg=="
    const encodedString = btoa('"hello"');
    expect(decodeCertData(encodedString)).toBeNull();

    // btoa('["a", "b"]') -> "WyJhIiwgImIiXQ=="
    const encodedArray = btoa('["a", "b"]');
    expect(decodeCertData(encodedArray)).toBeNull();
  });

  test('should build valid share URL with origin', () => {
    const data = { recipientName: 'John', event: 'Web Dev', templateId: 'tech-neon' };
    const url = buildShareUrl(data);

    expect(url).toContain('/c/');
    expect(url.endsWith('/c/' + encodeCertData(data))).toBe(true);
  });
});
