import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function ActionableSuggestions({ suggestions }) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="card" style={{ marginTop: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
        <Lightbulb size={18} style={{ color: 'var(--accent-amber)' }} />
        <h4 style={{ fontSize: '1.025rem', fontWeight: '600' }}>Additional Engagement Suggestions</h4>
      </div>

      <div className="suggestions-list">
        {suggestions.map((item, idx) => (
          <div key={idx} className="suggestion-card">
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem', gap: '1rem', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.9rem' }}>{item.title}</span>
                <span className={`priority-badge priority-${item.priority.toLowerCase()}`}>
                  {item.priority} Priority
                </span>
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
