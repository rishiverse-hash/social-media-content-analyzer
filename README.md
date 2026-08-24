# Social Media Content Analyzer

A fast, lightweight web application to extract text from PDF documents or screenshot images, run heuristic engagement analysis, and provide actionable recommendations to optimize social media posts.

Inspired by the visual identity of student/developer-built interfaces — clean typography, strong hierarchy, and restrained aesthetics.

---

## Features

- **PDF Text Extraction**: Parse native text layers from uploaded PDF posts and documents.
- **Image OCR**: Perform optical character recognition on screenshots (PNG, JPG, JPEG) directly in the browser using Tesseract.js.
- **Drag-and-Drop & File Picker**: Seamless upload experience with file type validation (up to 10 MB).
- **Rule-Based Engagement Analysis**: Evaluates hook strength, Call-to-Action (CTA) presence, readability formatting, and hashtag strategy.
- **Actionable Suggestions**: Specific suggestions to refine post clarity and boost reader engagement.
- **Responsive Workspace**: Split-panel workspace on desktop with seamless single-column stacking on mobile devices.
- **Error Handling & Loading States**: Feedback banners for invalid file formats, oversized files, or empty documents.

---

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Document Processing**: `pdfjs-dist` (client-side PDF text parser)
- **OCR Engine**: `tesseract.js` (client-side WebAssembly OCR worker)
- **Icons**: `lucide-react`
- **Styling**: Vanilla CSS (CSS Variables, Space Grotesk, Space Mono, and Inter typography)

---

## How It Works

1. **Upload**: Drop or select a PDF or image post file (PNG, JPG, JPEG).
2. **Extract**: Text is extracted client-side via PDF.js (for PDFs) or Tesseract OCR (for images).
3. **Analyze**: The extracted content passes through a rule-based social media analysis engine that evaluates hook impact, CTAs, readability, and hashtag usage.
4. **Improve**: View extracted text alongside engagement metrics and tailored improvement suggestions.

---

## Local Setup

Ensure Node.js (v18+) is installed on your machine.

```bash
# Clone the repository
git clone https://github.com/rishiverse-hash/social-media-content-analyzer.git

# Navigate to the project directory
cd social-media-content-analyzer

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Project Structure

```text
src/
├── components/
│   ├── UploadZone.jsx        # Drag-and-drop & file picker component
│   ├── ProcessingState.jsx   # Loading state and progress indicator
│   ├── ErrorBanner.jsx       # Error & validation alert component
│   ├── ExtractedContent.jsx   # Extracted raw text view & copy actions
│   ├── AnalysisPanel.jsx     # Engagement metrics & actionable suggestions
│   └── ResultWorkspace.jsx   # Combined split-panel results workspace
├── services/
│   ├── pdfService.js         # PDF.js client text extraction service
│   ├── ocrService.js         # Tesseract.js image OCR service
│   └── analyzerService.js   # Rule-based social content analysis engine
├── utils/
│   └── fileValidation.js    # File size and MIME type validation
├── App.jsx                   # Central state management & shell
├── index.css                 # Design system tokens and component styles
└── main.jsx                  # React application entrypoint
```

---

## Approach & Design Decisions

### PDF Text Extraction
Uses `pdfjs-dist` to parse text items from each page while tracking relative Y-coordinate transforms to preserve vertical paragraph breaks and line structure.

### Image OCR
Employs `tesseract.js` running in a Web Worker to recognize text from screenshots without sending user images to external third-party servers.

### Heuristic Content Analysis
Rather than relying on opaque AI scores, the application applies explicit, rule-based heuristics:
- **Hook Strength**: Checks opening line length, question marks, action verbs, and numeric triggers.
- **CTA Detection**: Searches for common engagement prompts (e.g., "comment below", "link in bio", "share", "follow").
- **Readability**: Evaluates sentence length distribution, paragraph count, and visual spacing.
- **Hashtags**: Validates hashtag counts against the recommended 3-5 hashtag window.

---

## Limitations

- **Scanned PDFs**: PDF extraction targets native text layers. Scanned PDFs with pure image pages require pre-conversion to PNG/JPG for OCR processing.
- **OCR Speed**: Image OCR runs entirely in the browser thread via WebAssembly, which may take 2–4 seconds depending on client device hardware.
- **Rule-Based Analysis**: Engagement recommendations are generated using deterministic rule-based heuristics rather than statistical ML models.
