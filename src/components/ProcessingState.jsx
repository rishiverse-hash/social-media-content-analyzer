import React from 'react';
import { Loader2, FileText, Image as ImageIcon } from 'lucide-react';

export default function ProcessingState({ fileName, fileType, stepText, progress }) {
  const isPdf = fileType?.includes('pdf') || fileName?.endsWith('.pdf');

  return (
    <div className="card processing-card" style={{ maxWidth: '640px', margin: '0 auto', width: '100%' }}>
      <div className="spinner"></div>

      <div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.4rem' }}>
          Processing {fileName || 'File'}
        </h3>
        <p className="processing-step">
          {stepText || (isPdf ? 'Extracting document text...' : 'Running optical character recognition (OCR)...')}
        </p>

        {progress !== null && progress !== undefined && (
          <div style={{ marginTop: '1rem', width: '220px', margin: '1rem auto 0 auto' }}>
            <div
              style={{
                height: '4px',
                backgroundColor: 'var(--bg-element)',
                borderRadius: '2px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  backgroundColor: 'var(--accent-primary)',
                  transition: 'width 0.3s ease'
                }}
              ></div>
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: '0.35rem', display: 'block' }}>
              {progress}%
            </span>
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.8rem',
          color: 'var(--text-dim)',
          fontFamily: 'var(--font-mono)'
        }}
      >
        {isPdf ? <FileText size={14} /> : <ImageIcon size={14} />}
        <span>{isPdf ? 'PDF Parsing Engine' : 'Tesseract OCR Engine'}</span>
      </div>
    </div>
  );
}
