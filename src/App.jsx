import React, { useState } from 'react';
import { Sparkles, FileText, Upload, RefreshCw, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

export default function App() {
  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="logo-group">
          <div className="logo-badge">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="logo-title">Social Content Analyzer</h1>
            <p className="logo-subtitle">PDF & Image Engagement Optimizer</p>
          </div>
        </div>

        <div className="header-status">
          <span className="status-dot"></span>
          <span>Ready for analysis</span>
        </div>
      </header>

      {/* Main Workspace Shell */}
      <main>
        <div className="card text-center" style={{ padding: '3rem 2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>
            Optimize your social media posts in seconds
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto 2rem auto', fontSize: '0.95rem' }}>
            Upload your post as a PDF or image. Extract readability metrics, hook strength, CTAs, and actionable engagement tips.
          </p>
        </div>
      </main>
    </div>
  );
}
