'use client';

import type { CsvBatchRow } from '@/lib/types';

// Flexible CSV row normalization helper for bulk certificate generation.
// Handles column header variations (e.g., "Full Name", "Recipient Name", "Course Title",
// "Template ID", etc.)

/**
 * Clean key string to lowercase alphanumeric representation.
 */
function cleanKey(key: unknown): string {
  return String(key ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

type RawRow = Record<string, unknown>;

/**
 * Normalize a CSV row object regardless of column header capitalization or naming variation.
 */
export function normalizeCsvRow(row: RawRow = {}, idx = 0, defaultDate = ''): CsvBatchRow {
  const safeRow = row || {};
  const map: Record<string, string> = {};
  for (const [key, value] of Object.entries(safeRow)) {
    const cleaned = cleanKey(key);
    map[cleaned] = typeof value === 'string' ? value.trim() : String(value ?? '').trim();
  }

  const recipientName =
    map.recipientname ||
    map.fullname ||
    map.name ||
    map.recipient ||
    map.studentname ||
    map.participant ||
    '';

  const event =
    map.event ||
    map.eventname ||
    map.course ||
    map.coursetitle ||
    map.title ||
    map.achievement ||
    map.program ||
    '';

  const date =
    map.date ||
    map.issuedate ||
    map.completiondate ||
    defaultDate ||
    new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const issuer = map.issuer || map.organization || map.org || map.issuingauthority || map.company || 'CertifyMe';
  const signature = map.signature || map.signatory || map.signer || map.signedby || '';
  const templateId = map.template || map.templateid || map.templatename || map.style || 'classic-gold';

  return {
    recipientName,
    event,
    date,
    issuer,
    signature,
    templateId,
    _idx: idx,
  };
}

export interface CsvValidationResult {
  validCount: number;
  invalidCount: number;
  normalized: CsvBatchRow[];
  errors: { line: number; message: string }[];
}

export function validateCsvBatchData(rows: RawRow[] = [], defaultDate = ''): CsvValidationResult {
  if (!Array.isArray(rows)) {
    return { validCount: 0, invalidCount: 0, normalized: [], errors: [] };
  }
  const normalized: CsvBatchRow[] = [];
  const errors: { line: number; message: string }[] = [];
  const seenNames = new Set<string>();

  rows.forEach((row, idx) => {
    const item = normalizeCsvRow(row, idx, defaultDate);
    if (!item.recipientName) {
      errors.push({ line: idx + 1, message: 'Missing recipient name' });
    } else {
      if (seenNames.has(item.recipientName.toLowerCase())) {
        errors.push({ line: idx + 1, message: `Duplicate recipient name: ${item.recipientName}` });
      }
      seenNames.add(item.recipientName.toLowerCase());
      normalized.push(item);
    }
  });

  return {
    validCount: normalized.length,
    invalidCount: errors.length,
    normalized,
    errors,
  };
}

export function generateSampleCsvTemplate(): string {
  const headers = ['Full Name', 'Course Title', 'Date', 'Issuer', 'Template ID'];
  const sample1 = ['Jane Doe', 'Full-Stack Web Development', '2026-07-20', 'Tech Academy', 'classic-gold'];
  const sample2 = ['John Smith', 'Data Science & AI Masterclass', '2026-07-20', 'CertifyMe Institute', 'navy-corporate'];
  return [headers.join(','), sample1.join(','), sample2.join(',')].join('\n');
}
