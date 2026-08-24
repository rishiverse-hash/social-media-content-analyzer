import React, { useState } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';

import UploadZone from './components/UploadZone';
import ProcessingState from './components/ProcessingState';
import ResultWorkspace from './components/ResultWorkspace';
import ErrorBanner from './components/ErrorBanner';

import { extractPdfText } from './services/pdfService';
import { extractImageOcr } from './services/ocrService';
import { analyzeSocialContent } from './services/analyzerService';

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'processing' | 'success' | 'error'
  const [processingStep, setProcessingStep] = useState('');
  const [ocrProgress, setOcrProgress] = useState(null);
  
  const [extractedText, setExtractedText] = useState('');
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (file, validationError) => {
    if (validationError) {
      setError(validationError);
      setSelectedFile(null);
    } else {
      setError(null);
      setSelectedFile(file);
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setError(null);
    setStatus('idle');
  };

  const handleReset = () => {
    setSelectedFile(null);
    setError(null);
    setExtractedText('');
    setAnalysisData(null);
    setOcrProgress(null);
    setStatus('idle');
  };

  const handleStartProcess = async () => {
    if (!selectedFile) return;

    setStatus('processing');
    setError(null);
    setOcrProgress(null);

    const isPdf = selectedFile.type.includes('pdf') || selectedFile.name.toLowerCase().endsWith('.pdf');

    try {
      let text = '';

      if (isPdf) {
        setProcessingStep('Extracting text from PDF document...');
        text = await extractPdfText(selectedFile);
      } else {
        setProcessingStep('Initializing Optical Character Recognition (OCR)...');
        text = await extractImageOcr(selectedFile, (progressPercent, statusText) => {
          if (progressPercent !== null) setOcrProgress(progressPercent);
          if (statusText) setProcessingStep(statusText);
        });
      }

      setProcessingStep('Analyzing social media engagement heuristics...');
      const analysis = analyzeSocialContent(text);

      setExtractedText(text);
      setAnalysisData(analysis);
      setStatus('success');
    } catch (err) {
      console.error('Processing error:', err);
      setError(err.message || 'An unexpected error occurred while processing the file.');
      setStatus('error');
    }
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
          <span
            className="status-dot"
            style={{
              backgroundColor:
                status === 'processing'
                  ? 'var(--accent-amber)'
                  : status === 'success'
                  ? 'var(--accent-emerald)'
                  : status === 'error'
                  ? 'var(--accent-rose)'
                  : 'var(--accent-emerald)'
            }}
          ></span>
          <span style={{ textTransform: 'capitalize' }}>
            {status === 'idle' ? 'Ready for upload' : status}
          </span>
        </div>
      </header>

      {/* Main Workspace */}
      <main>
        {status !== 'success' && (
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.85rem', fontWeight: '700', marginBottom: '0.65rem' }}>
              Optimize your social media content
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto', fontSize: '0.95rem' }}>
              Upload your post as a PDF or image to extract readable text and receive actionable social media engagement suggestions.
            </p>
          </div>
        )}

        {/* State Renderers */}
        {status === 'processing' && (
          <ProcessingState
            fileName={selectedFile?.name}
            fileType={selectedFile?.type}
            stepText={processingStep}
            progress={ocrProgress}
          />
        )}

        {(status === 'idle' || status === 'error') && (
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <UploadZone
              selectedFile={selectedFile}
              onFileSelect={handleFileSelect}
              onFileRemove={handleFileRemove}
              onStartProcess={handleStartProcess}
              error={error}
              onErrorDismiss={() => setError(null)}
            />
          </div>
        )}

        {status === 'success' && (
          <ResultWorkspace
            fileName={selectedFile?.name || 'Uploaded Document'}
            extractedText={extractedText}
            analysisData={analysisData}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}
