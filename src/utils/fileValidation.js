export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/jpg'
];

export const ALLOWED_EXTENSIONS = ['.pdf', '.png', '.jpg', '.jpeg'];

export function validateFile(file) {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }

  if (file.size === 0) {
    return { valid: false, error: 'The selected file is empty.' };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum allowed size is 10 MB.`
    };
  }

  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();

  const isExtensionValid = ALLOWED_EXTENSIONS.some((ext) => fileName.endsWith(ext));
  const isMimeValid = ALLOWED_MIME_TYPES.some((type) => fileType.includes(type.split('/')[1]) || fileType === type);

  if (!isExtensionValid && !isMimeValid) {
    return {
      valid: false,
      error: 'Unsupported file type. Please upload a PDF document or an image (PNG, JPG, JPEG).'
    };
  }

  return { valid: true, error: null };
}
