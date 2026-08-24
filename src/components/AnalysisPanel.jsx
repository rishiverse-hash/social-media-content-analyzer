import React from 'react';
import { Sparkles, CheckCircle2, AlertCircle, HelpCircle, ArrowUpRight } from 'lucide-react';

export default function AnalysisPanel({ analysisData }) {
  if (!analysisData) return null;

  const { analysis, overallScore, suggestions } = analysisData;

  const getScoreBadgeClass = (score) => {
    if (['Strong', 'Present', 'Optimal', 'Good'].includes(score)) return 'badge-good';
    if (['Moderate', 'Implicit', 'Complex'].includes(score)) return 'badge-warning';
    return 'badge-info';
  };

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <Sparkles size={18} style={{ color: 'var(--accent-primary)' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Content Analysis</h3>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Rule-Based Engagement Heuristics
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.8rem',
            backgroundColor: 'var(--bg-element)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Score</span>
          <span style={{ fontSize: '1.1rem', fontWeight: '700', color: overallScore >= 75 ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
            {overallScore}/100
          </span>
        </div>
      </div>

      {/* Analysis Items */}
      <div style={{ flex: 1 }}>
        {/* Hook */}
        <div className="analysis-item">
          <div className="analysis-label">
            <span>Hook Strength</span>
            <span className={`analysis-badge ${getScoreBadgeClass(analysis.hook.score)}`}>
              {analysis.hook.score}
            </span>
          </div>
          <div className="analysis-detail">{analysis.hook.detail}</div>
        </div>

        {/* Call to Action */}
        <div className="analysis-item">
          <div className="analysis-label">
            <span>Call to Action (CTA)</span>
            <span className={`analysis-badge ${getScoreBadgeClass(analysis.cta.score)}`}>
              {analysis.cta.score}
            </span>
          </div>
          <div className="analysis-detail">{analysis.cta.detail}</div>
        </div>

        {/* Readability */}
        <div className="analysis-item">
          <div className="analysis-label">
            <span>Readability & Structure</span>
            <span className={`analysis-badge ${getScoreBadgeClass(analysis.readability.score)}`}>
              {analysis.readability.score}
            </span>
          </div>
          <div className="analysis-detail">{analysis.readability.detail}</div>
        </div>

        {/* Hashtags */}
        <div className="analysis-item">
          <div className="analysis-label">
            <span>Hashtag Strategy</span>
            <span className={`analysis-badge ${getScoreBadgeClass(analysis.hashtags.score)}`}>
              {analysis.hashtags.score}
            </span>
          </div>
          <div className="analysis-detail">{analysis.hashtags.detail}</div>
        </div>

        {/* Actionable Suggestions */}
        <div style={{ marginTop: '1.25rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>Actionable Suggestions</span>
          </h4>
          <div className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="suggestion-card">
                <CheckCircle2 size={16} className="suggestion-bullet" />
                <span>{suggestion}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
