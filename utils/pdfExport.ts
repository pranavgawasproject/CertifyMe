'use client';

// PDF export utility — converts a certificate DOM node to a multi-page A4 PDF.
// Uses jsPDF + html2canvas. MUST be called from a client component / event handler.

interface PdfDimensions {
  imgWidth: number;
  imgHeight: number;
  x: number;
  y: number;
}

/**
 * Helper to calculate centered dimensions and offsets for landscape A4 PDF.
 */
export function calculatePdfDimensions(
  canvasWidth: number,
  canvasHeight: number,
  pdfWidth = 297,
  pdfHeight = 210,
): PdfDimensions {
  if (!canvasWidth || !canvasHeight) {
    return { imgWidth: pdfWidth, imgHeight: pdfHeight, x: 0, y: 0 };
  }
  const imgRatio = canvasWidth / canvasHeight;
  const pdfRatio = pdfWidth / pdfHeight;

  let imgWidth: number;
  let imgHeight: number;
  let x: number;
  let y: number;
  if (imgRatio > pdfRatio) {
    imgWidth = pdfWidth;
    imgHeight = pdfWidth / imgRatio;
    x = 0;
    y = (pdfHeight - imgHeight) / 2;
  } else {
    imgHeight = pdfHeight;
    imgWidth = pdfHeight * imgRatio;
    x = (pdfWidth - imgWidth) / 2;
    y = 0;
  }
  return { imgWidth, imgHeight, x, y };
}

/**
 * Export a single DOM node as a one-page A4 landscape PDF.
 */
export async function exportNodeToPdf(
  node: HTMLElement,
  filename = 'certificate.pdf',
): Promise<void> {
  if (!node) throw new Error('Target DOM node is required for PDF export');

  if (typeof document !== 'undefined' && document.fonts?.ready) {
    await document.fonts.ready;
  }

  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ]);

  // Render at 2x for crisp text
  const canvas = await html2canvas(node, {
    scale: 2,
    useCORS: true,
    backgroundColor: null,
    logging: false,
  });

  // A4 landscape: 297mm x 210mm
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const { imgWidth, imgHeight, x, y } = calculatePdfDimensions(
    canvas.width,
    canvas.height,
    297,
    210,
  );

  const imgData = canvas.toDataURL('image/png');
  pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
  pdf.save(filename);
}

/**
 * Export multiple DOM nodes as a single multi-page PDF.
 */
export async function exportNodesToMultiPagePdf(
  nodes: HTMLElement[],
  filename = 'certificates.pdf',
): Promise<void> {
  if (!nodes || nodes.length === 0) return;

  if (typeof document !== 'undefined' && document.fonts?.ready) {
    await document.fonts.ready;
  }

  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ]);

  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const pdfWidth = 297;
  const pdfHeight = 210;

  for (let i = 0; i < nodes.length; i++) {
    const canvas = await html2canvas(nodes[i], {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });

    const { imgWidth, imgHeight, x, y } = calculatePdfDimensions(
      canvas.width,
      canvas.height,
      pdfWidth,
      pdfHeight,
    );

    const imgData = canvas.toDataURL('image/png');
    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
  }

  pdf.save(filename);
}
