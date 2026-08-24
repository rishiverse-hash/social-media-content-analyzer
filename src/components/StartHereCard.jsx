import React from 'react';
import { Zap } from 'lucide-react';

export default function StartHereCard({ topRecommendation }) {
  if (!topRecommendation) return null;

  return (
    <div className="start-here-card">
      <div className="start-here-badge">
        <Zap size={13} />
        <span>START HERE • HIGHEST IMPACT IMPROVEMENT</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            {topRecommendation.title}
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            {topRecommendation.detail}
          </p>
        </div>

        <span className={`priority-badge priority-${topRecommendation.priority.toLowerCase()}`} style={{ marginTop: '4px' }}>
          {topRecommendation.priority} Priority
        </span>
      </div>
    </div>
  );
}
