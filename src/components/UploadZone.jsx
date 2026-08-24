import React, { useRef, useState } from 'react';
import { Upload, FileText, Image as ImageIcon, X, ArrowRight } from 'lucide-react';
import { validateFile } from '../utils/fileValidation';
import ErrorBanner from './ErrorBanner';

export default function UploadZone({
  selectedFile,
  onFileSelect,
  onFileRemove,
  onStartProcess,
  error,
  onErrorDismiss
}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFilePicked = (file) => {
    const result = validateFile(file);
    if (!result.valid) {
      onFileSelect(null, result.error);
      return;
    }
    onFileSelect(file, null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFilePicked(file);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFilePicked(file);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', width: '100%' }}>
      {!selectedFile ? (
        <>
          <div
            className={`dropzone ${isDragging ? 'is-dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            tabIndex={0}
            role="button"
            aria-label="Upload social media content PDF or Image"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleInputChange}
              accept=".pdf, .png, .jpg, .jpeg, image/png, image/jpeg, application/pdf"
              style={{ display: 'none' }}
            />

            <div className="dropzone-icon-wrapper">
              <Upload size={28} />
            </div>

            <div>
              <h3 className="dropzone-title">Drop your post here or browse files</h3>
              <p className="dropzone-subtext" style={{ marginTop: '0.4rem' }}>
                Upload a screenshot or document to analyze readability & engagement
              </p>
            </div>

            <div className="dropzone-tags">
              <span className="tag">PDF</span>
              <span className="tag">PNG</span>
              <span className="tag">JPG</span>
              <span className="tag">JPEG</span>
              <span className="tag">Up to 10 MB</span>
            </div>
          </div>

          <ErrorBanner error={error} onDismiss={onErrorDismiss} />
        </>
      ) : (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
          <div className="selected-file-card">
            <div className="file-info">
              {selectedFile.type.includes('pdf') || selectedFile.name.endsWith('.pdf') ? (
                <FileText className="file-icon" size={24} />
              ) : (
                <ImageIcon className="file-icon" size={24} />
              )}
              <div className="file-details">
                <span className="file-name">{selectedFile.name}</span>
                <span className="file-meta">
                  {formatFileSize(selectedFile.size)} • {selectedFile.type || 'Document'}
                </span>
              </div>
            </div>

            <button
              className="btn btn-ghost"
              onClick={onFileRemove}
              title="Remove file"
              aria-label="Remove file"
              style={{ padding: '0.4rem', borderRadius: '50%' }}
            >
              <X size={18} />
            </button>
          </div>

          <ErrorBanner error={error} onDismiss={onErrorDismiss} />

          <div style={{ display: 'flex', gap: '0.75rem', width: '100%', maxWidth: '540px' }}>
            <button
              className="btn btn-secondary"
              onClick={onFileRemove}
              style={{ flex: '1' }}
            >
              Change File
            </button>
            <button
              className="btn btn-primary"
              onClick={onStartProcess}
              style={{ flex: '2' }}
            >
              <span>Analyze Content</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
