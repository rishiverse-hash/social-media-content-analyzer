import { createWorker } from 'tesseract.js';

/**
 * Performs OCR text extraction on image files (PNG, JPG, JPEG).
 * @param {File} file - Image file to perform OCR on
 * @param {Function} [onProgress] - Optional progress callback (percent: number, status: string)
 * @returns {Promise<string>} Extracted OCR text string
 */
export async function extractImageOcr(file, onProgress) {
  let worker = null;
  try {
    worker = await createWorker('eng', 1, {
      logger: (m) => {
        if (m.status === 'recognizing text' && onProgress) {
          const percent = Math.round((m.progress || 0) * 100);
          onProgress(percent, 'Recognizing text from image...');
        } else if (onProgress && m.status) {
          onProgress(null, `Preparing OCR engine (${m.status})...`);
        }
      }
    });

    const { data } = await worker.recognize(file);
    await worker.terminate();

    const extractedText = (data.text || '').trim();

    if (!extractedText) {
      throw new Error('Could not extract readable text from this image. Please ensure the image contains clear, legible text.');
    }

    return extractedText;
  } catch (err) {
    console.error('Image OCR Error:', err);
    if (worker) {
      try {
        await worker.terminate();
      } catch (e) {
        // ignore cleanup error
      }
    }
    if (err.message && err.message.includes('Could not extract readable text')) {
      throw err;
    }
    throw new Error('Failed to process image OCR. Please verify the image file is valid and contains readable text.');
  }
}
