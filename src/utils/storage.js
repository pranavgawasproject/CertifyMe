// Safe sessionStorage wrapper to handle browser quota limits and security restrictions.

const memoryStorage = {};

function getSessionStorage() {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return window.sessionStorage;
    }
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage;
    }
  } catch (e) {
    // Storage disabled or blocked
  }
  return null;
}

/**
 * Safely get an item from sessionStorage, falling back to memory if unavailable.
 * @param {string} key
 * @returns {string|null}
 */
export function getStorageItem(key) {
  try {
    const storage = getSessionStorage();
    const val = storage ? storage.getItem(key) : null;
    return val !== null ? val : (memoryStorage[key] || null);
  } catch (err) {
    return memoryStorage[key] || null;
  }
}

/**
 * Safely set an item in sessionStorage, falling back to memory if storage is full/restricted.
 * @param {string} key
 * @param {string} value
 */
export function setStorageItem(key, value) {
  try {
    const storage = getSessionStorage();
    if (storage) {
      storage.setItem(key, value);
    }
    memoryStorage[key] = value;
  } catch (err) {
    memoryStorage[key] = value;
  }
}

/**
 * Safely remove an item from sessionStorage and memory cache.
 * @param {string} key
 */
export function removeStorageItem(key) {
  try {
    const storage = getSessionStorage();
    if (storage) {
      storage.removeItem(key);
    }
  } catch (err) {
    // Ignore storage restrictions on removal
  }
  delete memoryStorage[key];
}

/**
 * Clear all cert storage keys.
 */
export function clearCertStorage() {
  const keys = ['cert_recipientName', 'cert_event', 'cert_date', 'cert_issuer', 'cert_signature', 'cert_logoUrl', 'cert_template'];
  keys.forEach((key) => removeStorageItem(key));
}

