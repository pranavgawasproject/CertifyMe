// PDF export utility — converts a certificate DOM node to a multi-page A4 PDF.
// Uses jsPDF + html2canvas.

/**
 * Export a single DOM node as a one-page A4 landscape PDF.
 * @param {HTMLElement} node - the certificate DOM element
 * @param {string} filename - output filename
 */
export async function exportNodeToPdf(node, filename = 'certificate.pdf') {
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
  const pdfWidth = 297;
  const pdfHeight = 210;

  // Fit image while preserving aspect ratio
  const imgRatio = canvas.width / canvas.height;
  const pdfRatio = pdfWidth / pdfHeight;

  let imgWidth, imgHeight, x, y;
  if (imgRatio > pdfRatio) {
    // Image is wider — fit to width
    imgWidth = pdfWidth;
    imgHeight = pdfWidth / imgRatio;
    x = 0;
    y = (pdfHeight - imgHeight) / 2;
  } else {
    // Image is taller — fit to height
    imgHeight = pdfHeight;
    imgWidth = pdfHeight * imgRatio;
    x = (pdfWidth - imgWidth) / 2;
    y = 0;
  }

  const imgData = canvas.toDataURL('image/png');
  pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
  pdf.save(filename);
}

/**
 * Export multiple DOM nodes as a single multi-page PDF.
 * @param {HTMLElement[]} nodes - array of certificate DOM elements
 * @param {string} filename
 */
export async function exportNodesToMultiPagePdf(nodes, filename = 'certificates.pdf') {
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

    const imgRatio = canvas.width / canvas.height;
    const pdfRatio = pdfWidth / pdfHeight;
    let imgWidth, imgHeight, x, y;
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

    const imgData = canvas.toDataURL('image/png');
    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
  }

  pdf.save(filename);
}

