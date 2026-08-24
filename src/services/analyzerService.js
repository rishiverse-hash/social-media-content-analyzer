/**
 * Social Media Content Analysis Engine
 * Uses rule-based heuristics to evaluate post text readability, hooks, CTAs,
 * formatting, hashtag usage, and platform suitability.
 */

export function analyzeSocialContent(text) {
  if (!text || typeof text !== 'string') {
    return null;
  }

  const trimmed = text.trim();
  const paragraphs = trimmed.split(/\n\s*\n/).filter(Boolean);
  const lines = trimmed.split('\n').filter(line => line.trim().length > 0);
  const words = trimmed.match(/\b[\w'-]+\b/g) || [];
  const wordCount = words.length;
  const charCount = trimmed.length;

  // 1. Hook Analysis (First line / opening sentence)
  const openingLine = lines[0] || '';
  const firstSentence = openingLine.split(/[.!?]/)[0] || openingLine;
  
  let hookScore = 'Needs Work';
  let hookDetail = 'Opening sentence is generic or lacks a compelling trigger.';
  const hookQuestions = /[?]/;
  const hookNumbers = /\b\d+(\%|\$|k|M|\+)?\b/i;
  const hookActionVerbs = /\b(stop|how|why|want|secret|learn|build|discover|reasons|mistakes|guide|top|don't|never|always)\b/i;

  const isQuestion = hookQuestions.test(openingLine);
  const hasNumbers = hookNumbers.test(openingLine);
  const hasActionVerb = hookActionVerbs.test(openingLine);

  if ((isQuestion && (hasNumbers || hasActionVerb)) || (hasNumbers && hasActionVerb)) {
    hookScore = 'Strong';
    hookDetail = 'Great hook! Opening line uses numbers/action keywords and immediately grabs attention.';
  } else if (isQuestion || hasNumbers || hasActionVerb || firstSentence.split(' ').length <= 10) {
    hookScore = 'Moderate';
    hookDetail = 'Decent opening line, but could be punchier or spark more curiosity.';
  } else {
    hookScore = 'Needs Work';
    hookDetail = 'Opening line is long or passive. Consider starting with a clear value proposition, question, or statistic.';
  }

  // 2. Call To Action (CTA) Analysis
  const ctaRegex = /\b(comment|share|like|follow|subscribe|link in bio|check out|let me know|drop a|tag a|save this|repost|click|dm|reply)\b/i;
  const hasQuestionMarkAtEnd = /[?]\s*$/m.test(trimmed);
  const hasExplicitCta = ctaRegex.test(trimmed);

  let ctaScore = 'Missing';
  let ctaDetail = 'No clear call-to-action detected. Audience may read without engaging.';

  if (hasExplicitCta) {
    ctaScore = 'Present';
    ctaDetail = 'Clear action requested (e.g. comment, share, or click link).';
  } else if (hasQuestionMarkAtEnd) {
    ctaScore = 'Implicit';
    ctaDetail = 'Ends with a question to prompt audience response, but lacks explicit direction.';
  }

  // 3. Readability & Formatting Analysis
  const avgWordsPerSentence = wordCount > 0 ? (wordCount / Math.max(1, lines.length)).toFixed(1) : 0;
  const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
  const emojisFound = trimmed.match(emojiRegex) || [];
  const emojiCount = emojisFound.length;

  let readabilityScore = 'Good';
  let readabilityDetail = 'Well-spaced content with easy-to-read line breaks.';

  if (paragraphs.length <= 1 && wordCount > 50) {
    readabilityScore = 'Wall of Text';
    readabilityDetail = 'Post lacks paragraph breaks. Dense text blocks reduce mobile readability.';
  } else if (avgWordsPerSentence > 22) {
    readabilityScore = 'Complex';
    readabilityDetail = `Average sentence length is high (${avgWordsPerSentence} words/sentence). Break long sentences for better scanning.`;
  } else {
    readabilityScore = 'Optimal';
    readabilityDetail = `Good spacing with ${paragraphs.length} paragraphs and ~${avgWordsPerSentence} words per line.`;
  }

  // 4. Hashtag Analysis
  const hashtagsFound = trimmed.match(/#[\w\u0590-\u05ff]+/g) || [];
  const hashtagCount = hashtagsFound.length;

  let hashtagScore = 'Optimal';
  let hashtagDetail = `${hashtagCount} hashtag(s) detected.`;

  if (hashtagCount === 0) {
    hashtagScore = 'None';
    hashtagDetail = 'No hashtags detected. Adding 3-5 relevant hashtags increases post discoverability.';
  } else if (hashtagCount > 7) {
    hashtagScore = 'Too Many';
    hashtagDetail = `${hashtagCount} hashtags detected. Excessive hashtags look spammy on LinkedIn & X.`;
  } else {
    hashtagScore = 'Optimal';
    hashtagDetail = `${hashtagCount} hashtags detected (well within the recommended 3–5 range).`;
  }

  // 5. Actionable Suggestions Generation
  const suggestions = [];

  if (hookScore === 'Needs Work') {
    suggestions.push('Start with a punchier opening line (e.g., ask a question or share an unexpected statistic).');
  }

  if (ctaScore === 'Missing') {
    suggestions.push('Add a clear Call-To-Action at the end (e.g., "What are your thoughts? Drop a comment below.").');
  }

  if (readabilityScore === 'Wall of Text') {
    suggestions.push('Break up text into short 1-2 sentence paragraphs with empty line spaces for mobile readability.');
  }

  if (hashtagCount === 0) {
    suggestions.push('Include 3 to 5 targeted hashtags at the bottom to boost search discovery.');
  } else if (hashtagCount > 7) {
    suggestions.push('Reduce hashtag count to 3-5 high-relevance tags to keep your post looking professional.');
  }

  if (wordCount < 20) {
    suggestions.push('Expand your post with additional context or key takeaways for deeper reader value.');
  }

  if (emojiCount === 0 && wordCount > 30) {
    suggestions.push('Consider adding 2-3 visual emojis as bullet points or emphasis markers.');
  }

  if (suggestions.length === 0) {
    suggestions.push('Post structure looks solid! Double-check for typos and schedule during peak audience hours.');
  }

  // Overall Score Calculation (Heuristic out of 100)
  let score = 70;
  if (hookScore === 'Strong') score += 15;
  else if (hookScore === 'Moderate') score += 5;
  
  if (ctaScore === 'Present') score += 15;
  else if (ctaScore === 'Implicit') score += 5;

  if (readabilityScore === 'Optimal') score += 10;
  else if (readabilityScore === 'Wall of Text') score -= 15;

  if (hashtagCount >= 2 && hashtagCount <= 5) score += 10;

  score = Math.min(100, Math.max(30, score));

  return {
    metrics: {
      wordCount,
      charCount,
      paragraphCount: paragraphs.length,
      lineCount: lines.length,
      emojiCount,
      hashtagCount
    },
    analysis: {
      hook: { score: hookScore, detail: hookDetail, openingLine },
      cta: { score: ctaScore, detail: ctaDetail },
      readability: { score: readabilityScore, detail: readabilityDetail, avgWordsPerSentence },
      hashtags: { score: hashtagScore, detail: hashtagDetail, tags: hashtagsFound }
    },
    overallScore: score,
    suggestions
  };
}
