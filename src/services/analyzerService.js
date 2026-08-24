/**
 * Social Media Content Analysis Engine
 * Evaluates post text readability, hooks, CTAs, formatting, hashtag strategy,
 * and calculates a category-derived engagement score with actionable recommendations.
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
  let hookDetail = 'Opening sentence is generic or passive. Consider starting with a clear value proposition, question, or key statistic.';
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
    hookDetail = 'Decent opening line, but could be punchier or spark more reader curiosity.';
  } else {
    hookScore = 'Needs Work';
    hookDetail = 'Opening line is long or passive. Consider starting with a question, statistic, or strong hook verb.';
  }

  // 2. Call To Action (CTA) Analysis
  const ctaRegex = /\b(comment|share|like|follow|subscribe|link in bio|check out|let me know|drop a|tag a|save this|repost|click|dm|reply)\b/i;
  const hasQuestionMarkAtEnd = /[?]\s*$/m.test(trimmed);
  const hasExplicitCta = ctaRegex.test(trimmed);

  let ctaScore = 'Missing';
  let ctaDetail = 'No clear call-to-action detected. Readers may consume without engaging.';

  if (hasExplicitCta) {
    ctaScore = 'Present';
    ctaDetail = 'Explicit action requested from readers (e.g. comment, share, or check link).';
  } else if (hasQuestionMarkAtEnd) {
    ctaScore = 'Implicit';
    ctaDetail = 'Ends with a question to prompt audience response, but lacks explicit direction.';
  }

  // 3. Readability & Formatting Analysis
  const avgWordsPerSentence = wordCount > 0 ? (wordCount / Math.max(1, lines.length)).toFixed(1) : 0;
  const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
  const emojisFound = trimmed.match(emojiRegex) || [];
  const emojiCount = emojisFound.length;

  let readabilityScore = 'Optimal';
  let readabilityDetail = `Good spacing with ${paragraphs.length} paragraphs and ~${avgWordsPerSentence} words per line.`;

  if (paragraphs.length <= 1 && wordCount > 50) {
    readabilityScore = 'Wall of Text';
    readabilityDetail = 'Post lacks line breaks. Dense text blocks reduce mobile readability.';
  } else if (avgWordsPerSentence > 22) {
    readabilityScore = 'Complex';
    readabilityDetail = `Average line length is high (${avgWordsPerSentence} words/sentence). Break long sentences for better scanning.`;
  }

  // 4. Hashtag Strategy
  const hashtagsFound = trimmed.match(/#[\w\u0590-\u05ff]+/g) || [];
  const hashtagCount = hashtagsFound.length;

  let hashtagScore = 'Optimal';
  let hashtagDetail = `${hashtagCount} hashtag(s) detected.`;

  if (hashtagCount === 0) {
    hashtagScore = 'Missing';
    hashtagDetail = 'No hashtags detected. Adding 3–5 relevant hashtags increases post discoverability.';
  } else if (hashtagCount > 7) {
    hashtagScore = 'Too Many';
    hashtagDetail = `${hashtagCount} hashtags detected. Excessive hashtags can look spammy.`;
  } else {
    hashtagScore = 'Optimal';
    hashtagDetail = `${hashtagCount} hashtag(s) detected (within the recommended 3–5 range).`;
  }

  // 5. Accurate Category-Derived Scoring Algorithm (Start at 100, deduct based on gaps)
  let deductions = 0;

  if (hookScore === 'Moderate') deductions += 10;
  if (hookScore === 'Needs Work') deductions += 20;

  if (ctaScore === 'Implicit') deductions += 10;
  if (ctaScore === 'Missing') deductions += 20;

  if (readabilityScore === 'Complex') deductions += 10;
  if (readabilityScore === 'Wall of Text') deductions += 20;

  if (hashtagScore === 'Missing') deductions += 10;
  if (hashtagScore === 'Too Many') deductions += 10;

  const score = Math.max(25, 100 - deductions);

  // Interpretation string based on score
  let scoreInterpretation = 'Good Foundation';
  if (score >= 90) scoreInterpretation = 'Highly Optimized Post';
  else if (score >= 75) scoreInterpretation = 'Solid Engagement Potential';
  else if (score >= 60) scoreInterpretation = 'Good Foundation — Needs Refinement';
  else scoreInterpretation = 'Needs Engagement Optimization';

  // 6. Strengths & Weaknesses Checklist
  const strengths = [];
  const weaknesses = [];

  if (hookScore === 'Strong') strengths.push('Strong opening hook that grabs attention');
  else if (hookScore === 'Moderate') strengths.push('Decent opening line structure');
  else weaknesses.push('Opening hook lacks punch or curiosity trigger');

  if (ctaScore === 'Present') strengths.push('Clear Call-to-Action for audience engagement');
  else if (ctaScore === 'Implicit') strengths.push('Prompts reader response with a closing question');
  else weaknesses.push('No Call-to-Action detected to guide reader response');

  if (readabilityScore === 'Optimal') strengths.push('Well-spaced paragraphs suited for mobile scanning');
  else if (readabilityScore === 'Complex') weaknesses.push('High sentence length reduces mobile scannability');
  else weaknesses.push('Dense block of text needs empty line breaks');

  if (hashtagScore === 'Optimal') strengths.push(`Includes ${hashtagCount} relevant hashtag(s) for reach`);
  else if (hashtagScore === 'Missing') weaknesses.push('Missing hashtags to capture organic search traffic');
  else weaknesses.push('Too many hashtags may appear spammy');

  // 7. Structured Recommendations & Top Recommendation ("Start Here")
  const suggestions = [];

  if (hookScore === 'Needs Work') {
    suggestions.push({
      title: 'Strengthen the opening hook',
      detail: 'Rephrase your first sentence into a compelling question, surprising stat, or bold action verb.',
      priority: 'High'
    });
  } else if (hookScore === 'Moderate') {
    suggestions.push({
      title: 'Punch up opening line',
      detail: 'Make your first 7 words sharper so readers stop scrolling immediately.',
      priority: 'Medium'
    });
  }

  if (ctaScore === 'Missing') {
    suggestions.push({
      title: 'Add a clear Call-To-Action',
      detail: 'End with an explicit instruction (e.g. "What is your take? Drop a comment below.").',
      priority: 'High'
    });
  } else if (ctaScore === 'Implicit') {
    suggestions.push({
      title: 'Make CTA more direct',
      detail: 'Convert the closing question into an explicit call-to-action.',
      priority: 'Medium'
    });
  }

  if (readabilityScore === 'Wall of Text') {
    suggestions.push({
      title: 'Break up dense text blocks',
      detail: 'Separate text into 1–2 sentence mini-paragraphs with blank lines for mobile reading.',
      priority: 'High'
    });
  } else if (readabilityScore === 'Complex') {
    suggestions.push({
      title: 'Shorten long sentences',
      detail: 'Trim multi-clause sentences to improve reading momentum.',
      priority: 'Medium'
    });
  }

  if (hashtagScore === 'Missing') {
    suggestions.push({
      title: 'Add 3 to 5 targeted hashtags',
      detail: 'Append 3–5 high-relevance hashtags at the end of your post to increase search discoverability.',
      priority: 'Medium'
    });
  } else if (hashtagScore === 'Too Many') {
    suggestions.push({
      title: 'Trim excess hashtags',
      detail: 'Keep only 3–5 most relevant hashtags to maintain a professional look.',
      priority: 'Low'
    });
  }

  if (wordCount < 25) {
    suggestions.push({
      title: 'Expand post depth',
      detail: 'Provide additional context or key takeaways to deliver higher reader value.',
      priority: 'Low'
    });
  }

  if (emojiCount === 0 && wordCount > 40) {
    suggestions.push({
      title: 'Add visual emphasis markers',
      detail: 'Consider adding 2–3 subtle emojis as visual indicators or line breaks.',
      priority: 'Low'
    });
  }

  if (suggestions.length === 0) {
    suggestions.push({
      title: 'Review formatting & schedule',
      detail: 'Post structure is solid! Perform a quick proofread and publish during peak audience hours.',
      priority: 'Low'
    });
  }

  // Top recommendation is highest priority item
  const topRecommendation = suggestions.find(s => s.priority === 'High') || suggestions[0];
  const remainingSuggestions = suggestions.filter(s => s !== topRecommendation);

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
      hook: { score: hookScore, detail: hookDetail, percent: hookScore === 'Strong' ? 100 : hookScore === 'Moderate' ? 65 : 35 },
      cta: { score: ctaScore, detail: ctaDetail, percent: ctaScore === 'Present' ? 100 : ctaScore === 'Implicit' ? 60 : 30 },
      readability: { score: readabilityScore, detail: readabilityDetail, percent: readabilityScore === 'Optimal' ? 100 : readabilityScore === 'Complex' ? 65 : 35 },
      hashtags: { score: hashtagScore, detail: hashtagDetail, percent: hashtagScore === 'Optimal' ? 100 : 40 }
    },
    overallScore: score,
    scoreInterpretation,
    strengths,
    weaknesses,
    topRecommendation,
    remainingSuggestions
  };
}
