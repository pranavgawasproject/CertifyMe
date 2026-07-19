// Flexible CSV row normalization helper for bulk certificate generation.
// Handles column header variations (e.g., "Full Name", "Recipient Name", "Course Title", "Template ID", etc.)

/**
 * Clean key string to lowercase alphanumeric representation.
 * @param {string} key
 * @returns {string}
 */
function cleanKey(key) {
  return String(key || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Normalize a CSV row object regardless of column header capitalization or naming variation.
 * @param {Object} row - raw row object from PapaParse
 * @param {number} idx - index of the row
 * @param {string} defaultDate - fallback date string if date column is missing
 * @returns {{recipientName: string, event: string, date: string, issuer: string, signature: string, templateId: string, _idx: number}}
 */
export function normalizeCsvRow(row = {}, idx = 0, defaultDate = '') {
  const safeRow = row || {};
  const map = {};
  for (const [key, value] of Object.entries(safeRow)) {
    const cleaned = cleanKey(key);
    map[cleaned] = typeof value === 'string' ? value.trim() : String(value || '').trim();
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

  const date = map.date || map.issuedate || map.completiondate || defaultDate || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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
