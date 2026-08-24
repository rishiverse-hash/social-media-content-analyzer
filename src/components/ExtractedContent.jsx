import React, { useState } from 'react';
import { FileText, Copy, Check } from 'lucide-react';

export default function ExtractedContent({ fileName, extractedText, metrics }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(extractedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="doc-viewer">
      <div className="doc-viewer-header">
        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <FileText size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: '600', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              Extracted Content
            </h3>
          </div>
          <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            {fileName}
          </span>
        </div>

        <button
          className="btn btn-secondary"
          onClick={handleCopy}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', flexShrink: 0 }}
          title="Copy extracted text to clipboard"
        >
          {copied ? (
            <>
              <Check size={14} style={{ color: 'var(--accent-emerald)' }} />
              <span style={{ color: 'var(--accent-emerald)' }}>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy Text</span>
            </>
          )}
        </button>
      </div>

      {/* Document Text Body */}
      <div className="doc-viewer-body">
        {extractedText}
      </div>

      {/* Document Footer Bar */}
      <div
        style={{
          marginTop: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: 'var(--text-dim)',
          fontFamily: 'var(--font-mono)'
        }}
      >
        <span>Raw Extracted Text</span>
        <span>{metrics?.wordCount || 0} words • {metrics?.charCount || 0} chars</span>
      </div>
    </div>
  );
}
