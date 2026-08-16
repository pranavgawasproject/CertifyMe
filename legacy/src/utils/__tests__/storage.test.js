import { describe, test, expect, beforeEach } from 'vitest';
import { getStorageItem, setStorageItem, removeStorageItem, clearCertStorage } from '../storage.js';

describe('CertifyMe Storage Utilities', () => {
  let mockStore = {};

  beforeEach(() => {
    mockStore = {};
    const mockStorage = {
      getItem: (key) => mockStore[key] || null,
      setItem: (key, value) => { mockStore[key] = String(value); },
      removeItem: (key) => { delete mockStore[key]; },
      clear: () => { mockStore = {}; },
    };

    if (typeof globalThis.window === 'undefined') {
      globalThis.window = { sessionStorage: mockStorage };
    } else {
      globalThis.window.sessionStorage = mockStorage;
    }
  });

  test('should set and get items from sessionStorage', () => {
    setStorageItem('cert_recipientName', 'Jane Doe');
    expect(getStorageItem('cert_recipientName')).toBe('Jane Doe');
  });

  test('should return null for non-existent items', () => {
    expect(getStorageItem('non_existent_key')).toBeNull();
  });

  test('should remove items correctly', () => {
    setStorageItem('cert_event', 'React Workshop');
    expect(getStorageItem('cert_event')).toBe('React Workshop');

    removeStorageItem('cert_event');
    expect(getStorageItem('cert_event')).toBeNull();
  });

  test('should clear all cert keys with clearCertStorage', () => {
    setStorageItem('cert_recipientName', 'Alice');
    setStorageItem('cert_event', 'Design');
    setStorageItem('cert_template', 'royal-blue');

    clearCertStorage();

    expect(getStorageItem('cert_recipientName')).toBeNull();
    expect(getStorageItem('cert_event')).toBeNull();
    expect(getStorageItem('cert_template')).toBeNull();
  });

  test('should gracefully fall back to in-memory storage if sessionStorage throws an error', () => {
    globalThis.window.sessionStorage.setItem = () => {
      throw new Error('QuotaExceededError');
    };

    setStorageItem('cert_issuer', 'CertifyMe Fallback');
    expect(getStorageItem('cert_issuer')).toBe('CertifyMe Fallback');
  });
});

