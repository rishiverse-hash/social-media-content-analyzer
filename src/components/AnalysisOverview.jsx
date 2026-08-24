import React from 'react';
import ScoreRing from './ScoreRing';
import { Type, AlignLeft, Hash, Layers } from 'lucide-react';

export default function AnalysisOverview({ overallScore, interpretation, metrics }) {
  return (
    <div className="overview-grid">
      <ScoreRing score={overallScore} interpretation={interpretation} />

      <div className="metric-card">
        <div className="metric-label">
          <span>Words</span>
          <Type size={14} />
        </div>
        <div className="metric-value">{metrics?.wordCount || 0}</div>
        <div className="metric-sub">Total word count</div>
      </div>

      <div className="metric-card">
        <div className="metric-label">
          <span>Characters</span>
          <AlignLeft size={14} />
        </div>
        <div className="metric-value">{metrics?.charCount || 0}</div>
        <div className="metric-sub">Including spaces</div>
      </div>

      <div className="metric-card">
        <div className="metric-label">
          <span>Hashtags</span>
          <Hash size={14} />
        </div>
        <div className="metric-value">{metrics?.hashtagCount || 0}</div>
        <div className="metric-sub">
          {metrics?.hashtagCount >= 3 && metrics?.hashtagCount <= 5
            ? 'Optimal range (3–5)'
            : 'Target 3–5 tags'}
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-label">
          <span>Paragraphs</span>
          <Layers size={14} />
        </div>
        <div className="metric-value">{metrics?.paragraphCount || 1}</div>
        <div className="metric-sub">
          {metrics?.paragraphCount > 1 ? 'Well-spaced text' : 'Single block'}
        </div>
      </div>
    </div>
  );
}
