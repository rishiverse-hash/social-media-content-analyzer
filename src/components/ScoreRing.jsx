import React from 'react';

export default function ScoreRing({ score, interpretation }) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = (val) => {
    if (val >= 85) return 'var(--accent-emerald)';
    if (val >= 70) return 'var(--accent-blue)';
    if (val >= 55) return 'var(--accent-amber)';
    return 'var(--accent-rose)';
  };

  const strokeColor = getScoreColor(score);

  return (
    <div className="score-card" style={{ flex: '1.4' }}>
      <div className="score-ring-wrapper">
        <svg className="score-ring-svg" viewBox="0 0 60 60">
          <circle
            className="score-ring-bg"
            cx="30"
            cy="30"
            r={radius}
            fill="transparent"
          />
          <circle
            className="score-ring-fill"
            cx="30"
            cy="30"
            r={radius}
            fill="transparent"
            stroke={strokeColor}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="score-ring-text">{score}</div>
      </div>

      <div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          Overall Content Score
        </div>
        <div style={{ fontSize: '0.95rem', fontWeight: '600', marginTop: '0.15rem' }}>
          {interpretation}
        </div>
        <div style={{ fontSize: '0.725rem', color: 'var(--text-dim)', marginTop: '0.1rem' }}>
          Derived from category metrics
        </div>
      </div>
    </div>
  );
}
