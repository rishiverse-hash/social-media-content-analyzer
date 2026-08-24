import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import UploadZone from './components/UploadZone';

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  const handleStartProcess = () => {
    console.log('Processing file:', selectedFile?.name);
  };

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

      {/* Main Workspace */}
      <main>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.85rem', fontWeight: '700', marginBottom: '0.65rem' }}>
            Optimize your social media posts
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto', fontSize: '0.95rem' }}>
            Upload your post as a PDF or image to extract text and receive actionable social media engagement recommendations.
          </p>
        </div>

        <UploadZone
          selectedFile={selectedFile}
          onFileSelect={handleFileSelect}
          onFileRemove={handleFileRemove}
          onStartProcess={handleStartProcess}
        />
      </main>
    </div>
  );
}
