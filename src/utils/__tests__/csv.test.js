import { describe, test, expect } from 'vitest';
import { normalizeCsvRow } from '../csv.js';

describe('CertifyMe CSV Normalization Utilities', () => {
  test('should normalize standard CSV headers', () => {
    const raw = {
      recipientName: 'Jane Anderson',
      event: 'Web Development',
      date: 'July 2026',
      issuer: 'CertifyMe Academy',
      signature: 'Dr. Sharma',
      template: 'royal-blue',
    };

    const normalized = normalizeCsvRow(raw, 0, 'Fallback Date');
    expect(normalized).toEqual({
      recipientName: 'Jane Anderson',
      event: 'Web Development',
      date: 'July 2026',
      issuer: 'CertifyMe Academy',
      signature: 'Dr. Sharma',
      templateId: 'royal-blue',
      _idx: 0,
    });
  });

  test('should normalize header variations like "Full Name", "Course Title", "Organization"', () => {
    const raw = {
      'Full Name': '  Bob Vance  ',
      'Course Title': '  Refrigeration Workshop  ',
      'Completion Date': '2026-07-20',
      'Organization': 'Vance Refrigeration',
      'Signatory': 'Phyllis Vance',
      'Template ID': 'modern-minimal',
    };

    const normalized = normalizeCsvRow(raw, 1, 'Default Date');
    expect(normalized).toEqual({
      recipientName: 'Bob Vance',
      event: 'Refrigeration Workshop',
      date: '2026-07-20',
      issuer: 'Vance Refrigeration',
      signature: 'Phyllis Vance',
      templateId: 'modern-minimal',
      _idx: 1,
    });
  });

  test('should provide sensible defaults when optional columns are missing', () => {
    const raw = {
      Participant: 'Sarah Connor',
      Program: 'AI Resistance 101',
    };

    const normalized = normalizeCsvRow(raw, 2, 'August 2026');
    expect(normalized.recipientName).toBe('Sarah Connor');
    expect(normalized.event).toBe('AI Resistance 101');
    expect(normalized.date).toBe('August 2026');
    expect(normalized.issuer).toBe('CertifyMe');
    expect(normalized.signature).toBe('');
    expect(normalized.templateId).toBe('classic-gold');
    expect(normalized._idx).toBe(2);
  });

  test('should handle empty or malformed row object safely', () => {
    const normalized = normalizeCsvRow(null, 5, 'Fallback Date');
    expect(normalized.recipientName).toBe('');
    expect(normalized.event).toBe('');
    expect(normalized.date).toBe('Fallback Date');
    expect(normalized.issuer).toBe('CertifyMe');
    expect(normalized.templateId).toBe('classic-gold');
    expect(normalized._idx).toBe(5);
  });
});
