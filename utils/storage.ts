'use client';

// Safe sessionStorage wrapper to handle browser quota limits and security restrictions.

const memoryStorage: Record<string, string> = {};

function getSessionStorage(): Storage | null {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return window.sessionStorage;
    }
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage;
    }
  } catch {
    // Storage disabled or blocked
  }
  return null;
}

/**
 * Safely get an item from sessionStorage, falling back to memory if unavailable.
 */
export function getStorageItem(key: string): string | null {
  try {
    const storage = getSessionStorage();
    const val = storage ? storage.getItem(key) : null;
    return val !== null ? val : memoryStorage[key] || null;
  } catch {
    return memoryStorage[key] || null;
  }
}

/**
 * Safely set an item in sessionStorage, falling back to memory if storage is full/restricted.
 */
export function setStorageItem(key: string, value: string): void {
  try {
    const storage = getSessionStorage();
    if (storage) {
      storage.setItem(key, value);
    }
    memoryStorage[key] = value;
  } catch {
    memoryStorage[key] = value;
  }
}

/**
 * Safely remove an item from sessionStorage and memory cache.
 */
export function removeStorageItem(key: string): void {
  try {
    const storage = getSessionStorage();
    if (storage) {
      storage.removeItem(key);
    }
  } catch {
    // Ignore storage restrictions on removal
  }
  delete memoryStorage[key];
}

/**
 * Clear all cert storage keys.
 */
export function clearCertStorage(): void {
  const keys = [
    'cert_recipientName',
    'cert_event',
    'cert_date',
    'cert_issuer',
    'cert_signature',
    'cert_logoUrl',
    'cert_template',
  ];
  keys.forEach((key) => removeStorageItem(key));
}
