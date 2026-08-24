import * as pdfjsLib from 'pdfjs-dist';

// Configure pdfjs worker using cdnjs for seamless client-side execution in Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '3.11.174'}/pdf.worker.min.js`;

/**
 * Extracts plain text content from a PDF file.
 * Preserves paragraph breaks and line structure.
 * @param {File} file - PDF file to extract text from
 * @returns {Promise<string>} Extracted text string
 */
export async function extractPdfText(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDocument = await loadingTask.promise;

    const numPages = pdfDocument.numPages;
    if (numPages === 0) {
      throw new Error('PDF document has no pages.');
    }

    let fullText = '';

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      let lastY = null;
      let pageText = '';

      for (const item of textContent.items) {
        if (!item.str) continue;

        // Check vertical position change to preserve line breaks
        if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
          pageText += '\n';
        } else if (pageText.length > 0 && !pageText.endsWith('\n') && !pageText.endsWith(' ')) {
          pageText += ' ';
        }

        pageText += item.str;
        lastY = item.transform[5];
      }

      if (pageText.trim()) {
        fullText += (fullText ? '\n\n' : '') + pageText.trim();
      }
    }

    const cleanedText = fullText.trim();

    if (!cleanedText) {
      throw new Error('Could not extract text from this PDF. It may be scanned or contain only images.');
    }

    return cleanedText;
  } catch (err) {
    console.error('PDF Extraction Error:', err);
    if (err.message && err.message.includes('Could not extract text')) {
      throw err;
    }
    throw new Error('Failed to parse PDF document. Please ensure the file is not corrupted or password-protected.');
  }
}
