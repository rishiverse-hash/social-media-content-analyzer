import React from 'react';
import { AlertCircle, X } from 'lucide-react';

export default function ErrorBanner({ error, onDismiss }) {
  if (!error) return null;

  return (
    <div className="error-banner" role="alert">
      <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
      <div style={{ flex: 1 }}>
        <div className="error-title">Validation Error</div>
        <div>{error}</div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          style={{
            background: 'none',
            border: 'none',
            color: 'inherit',
            cursor: 'pointer',
            padding: '2px',
            borderRadius: '4px'
          }}
          aria-label="Dismiss error message"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
