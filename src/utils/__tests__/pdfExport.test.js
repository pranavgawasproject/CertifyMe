import { describe, it, expect } from 'vitest';
import { calculatePdfDimensions } from '../pdfExport.js';

describe('pdfExport utility', () => {
  describe('calculatePdfDimensions', () => {
    it('calculates landscape width fit when canvas ratio is wider than PDF ratio', () => {
      // 16:9 canvas ratio (1.777) vs A4 landscape (297/210 = 1.414)
      const res = calculatePdfDimensions(1600, 900, 297, 210);
      expect(res.imgWidth).toBe(297);
      expect(res.imgHeight).toBeCloseTo(167.06, 1);
      expect(res.x).toBe(0);
      expect(res.y).toBeGreaterThan(0);
    });

    it('calculates height fit when canvas ratio is taller than PDF ratio', () => {
      // Square canvas 1000x1000 ratio (1.0) vs A4 landscape (1.414)
      const res = calculatePdfDimensions(1000, 1000, 297, 210);
      expect(res.imgHeight).toBe(210);
      expect(res.imgWidth).toBe(210);
      expect(res.x).toBeGreaterThan(0);
      expect(res.y).toBe(0);
    });

    it('handles zero or missing canvas dimensions gracefully', () => {
      const res = calculatePdfDimensions(0, 0);
      expect(res.imgWidth).toBe(297);
      expect(res.imgHeight).toBe(210);
      expect(res.x).toBe(0);
      expect(res.y).toBe(0);
    });
  });
});
