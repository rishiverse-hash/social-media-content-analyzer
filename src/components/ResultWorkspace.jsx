import React from 'react';
import { ArrowLeft, RotateCcw, CheckCircle2 } from 'lucide-react';
import AnalysisOverview from './AnalysisOverview';
import ExtractedContent from './ExtractedContent';
import AnalysisPanel from './AnalysisPanel';
import StartHereCard from './StartHereCard';
import ActionableSuggestions from './ActionableSuggestions';

export default function ResultWorkspace({ fileName, extractedText, analysisData, onReset }) {
  return (
    <div className="fade-in-up" style={{ width: '100%' }}>
      {/* 1. Header Section */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.75rem',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: '#34d399',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              padding: '0.2rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '0.4rem'
            }}
          >
            <CheckCircle2 size={13} />
            <span>Analysis Complete</span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '700', letterSpacing: '-0.02em' }}>
            Social Media Content Analysis
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.2rem' }}>
            Text extracted and evaluated from <span style={{ color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>{fileName}</span>.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            className="btn btn-secondary"
            onClick={onReset}
            style={{ fontSize: '0.85rem' }}
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
      </div>

      {/* 2. Compact Overview Row */}
      <AnalysisOverview
        overallScore={analysisData?.overallScore || 0}
        interpretation={analysisData?.scoreInterpretation || 'Analysis Finished'}
        metrics={analysisData?.metrics}
      />

      {/* 3. Main Split Grid */}
      <div className="results-grid">
        <ExtractedContent
          fileName={fileName}
          extractedText={extractedText}
          metrics={analysisData?.metrics}
        />

        <AnalysisPanel analysisData={analysisData} />
      </div>

      {/* 4. Top Recommendation ("Start Here") */}
      <StartHereCard topRecommendation={analysisData?.topRecommendation} />

      {/* 5. Actionable Suggestions */}
      <ActionableSuggestions suggestions={analysisData?.remainingSuggestions} />

      {/* 6. Bottom Reset Action */}
      <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
        <button className="btn btn-secondary" onClick={onReset}>
          <RotateCcw size={16} />
          <span>Start New Analysis</span>
        </button>
      </div>
    </div>
  );
}
