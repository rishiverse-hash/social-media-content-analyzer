import React from 'react';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import ExtractedContent from './ExtractedContent';
import AnalysisPanel from './AnalysisPanel';

export default function ResultWorkspace({ fileName, extractedText, analysisData, onReset }) {
  return (
    <div style={{ width: '100%' }}>
      {/* Workspace Header Actions */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justify-content: 'space-between',
          marginBottom: '1.5rem'
        }}
      >
        <button
          className="btn btn-secondary"
          onClick={onReset}
          style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
        >
          <ArrowLeft size={16} />
          <span>Upload Another File</span>
        </button>

        <button
          className="btn btn-ghost"
          onClick={onReset}
          style={{ fontSize: '0.85rem' }}
        >
          <RotateCcw size={15} />
          <span>Reset Workspace</span>
        </button>
      </div>

      {/* Split Grid Layout */}
      <div className="results-grid">
        <ExtractedContent
          fileName={fileName}
          extractedText={extractedText}
          metrics={analysisData?.metrics}
        />

        <AnalysisPanel analysisData={analysisData} />
      </div>
    </div>
  );
}
