import React from 'react';
import { Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AnalysisPanel({ analysisData }) {
  if (!analysisData) return null;

  const { analysis, strengths, weaknesses } = analysisData;

  const getScoreBadgeClass = (score) => {
    if (['Strong', 'Present', 'Optimal'].includes(score)) return 'badge-good';
    if (['Moderate', 'Implicit', 'Complex'].includes(score)) return 'badge-warning';
    return 'badge-info';
  };

  const getProgressColor = (score) => {
    if (['Strong', 'Present', 'Optimal'].includes(score)) return 'var(--accent-emerald)';
    if (['Moderate', 'Implicit', 'Complex'].includes(score)) return 'var(--accent-amber)';
    return 'var(--accent-rose)';
  };

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <Sparkles size={18} style={{ color: 'var(--accent-primary)' }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: '600' }}>Content Analysis</h3>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Category Breakdowns & Readiness
          </span>
        </div>
      </div>

      {/* Analysis Categories */}
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
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{
                width: `${analysis.hook.percent}%`,
                backgroundColor: getProgressColor(analysis.hook.score)
              }}
            ></div>
          </div>
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
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{
                width: `${analysis.cta.percent}%`,
                backgroundColor: getProgressColor(analysis.cta.score)
              }}
            ></div>
          </div>
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
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{
                width: `${analysis.readability.percent}%`,
                backgroundColor: getProgressColor(analysis.readability.score)
              }}
            ></div>
          </div>
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
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{
                width: `${analysis.hashtags.percent}%`,
                backgroundColor: getProgressColor(analysis.hashtags.score)
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Content Health Box */}
      <div className="health-box">
        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)' }}>
          Content Health Checklist
        </div>
        <div className="health-list">
          {strengths?.map((item, idx) => (
            <div key={`str-${idx}`} className="health-item" style={{ color: '#34d399' }}>
              <CheckCircle2 size={14} style={{ flexShrink: 0 }} />
              <span>{item}</span>
            </div>
          ))}

          {weaknesses?.map((item, idx) => (
            <div key={`wk-${idx}`} className="health-item" style={{ color: '#fbbf24' }}>
              <AlertCircle size={14} style={{ flexShrink: 0 }} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
