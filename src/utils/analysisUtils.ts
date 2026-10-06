import { ContentAnalysis } from '../types';

export function analyzeContent(text: string, title?: string): ContentAnalysis {
  const clean = text.trim();
  const words = clean ? clean.split(/\s+/).length : 0;
  const readingTimeSec = Math.max(3, Math.round(words / 3.2));

  const hasQuestion = clean.includes('?') || clean.includes('؟');
  const hasNumber = /\d+/.test(clean);
  const hasEmoji = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}]/u.test(clean);
  const hasHashtag = clean.includes('#');
  const hasCTA = /(save|comment|share|follow|link|dm|swipe|click|بک مارک|سیو|کمنٹ|احفظ|شارك|تابع)/i.test(clean);
  const hasBulletPoints = clean.includes('•') || clean.includes('-') || clean.includes('1.') || clean.includes('١.');
  const lineCount = clean.split('\n').filter((l) => l.trim().length > 0).length;

  // Calculate scores
  let hookScore = 82;
  if (hasQuestion) hookScore += 6;
  if (hasNumber) hookScore += 5;
  if (hasEmoji) hookScore += 4;
  hookScore = Math.min(99, Math.max(75, hookScore));

  let readabilityScore = 80;
  if (lineCount >= 3) readabilityScore += 8; // Good whitespace
  if (hasBulletPoints) readabilityScore += 6;
  if (words > 20 && words < 120) readabilityScore += 5;
  readabilityScore = Math.min(98, Math.max(72, readabilityScore));

  let ctaScore = hasCTA ? 94 : 76;
  if (clean.includes('!')) ctaScore += 3;
  ctaScore = Math.min(98, Math.max(70, ctaScore));

  let seoScore = hasHashtag ? 95 : 74;
  if ((clean.match(/#/g) || []).length >= 3) seoScore += 3;
  seoScore = Math.min(99, Math.max(70, seoScore));

  const overallScore = Math.round(
    hookScore * 0.35 + readabilityScore * 0.25 + ctaScore * 0.25 + seoScore * 0.15
  );

  // Determine strengths
  const strengths: string[] = [];
  if (hasNumber || hasQuestion) {
    strengths.push('High curiosity hook: Uses specific trigger anchors to interrupt user scroll.');
  } else {
    strengths.push('Clean opening: Sets clear reader expectations within the initial sentence.');
  }

  if (hasBulletPoints || lineCount >= 3) {
    strengths.push('Mobile-optimized formatting: Generous whitespace and scannable visual rhythm.');
  } else {
    strengths.push('Direct narrative flow: Concise and dense without conversational fluff.');
  }

  if (hasCTA) {
    strengths.push('High conversion CTA: Frictionless call-to-action driving comments, saves, or shares.');
  } else {
    strengths.push('Authentic tone: Builds emotional resonance and genuine community trust.');
  }

  if (hasHashtag) {
    strengths.push('Algorithmic discoverability: Targeted keyword tags optimized for indexation.');
  }

  // Determine suggestions
  const suggestions: string[] = [];
  if (!hasCTA) {
    suggestions.push('Add a direct micro-action (e.g., "Save this post for later" or "Drop a comment below") to boost algorithmic distribution.');
  }
  if (!hasNumber) {
    suggestions.push('Include a specific number or timeframe (e.g., "3 steps", "in 14 days") in the opening line to amplify click-through rates.');
  }
  if (!hasHashtag) {
    suggestions.push('Pair with 3 to 5 tiered hashtags to trigger non-follower reach in recommendation feeds.');
  }
  if (words > 140) {
    suggestions.push('Consider trimming 15% of filler words to optimize retention for fast mobile readers.');
  }
  if (suggestions.length === 0) {
    suggestions.push('A/B test this caption against a contrarian question hook to measure retention variance.');
    suggestions.push('Pin your own prompt question as the first comment to spark immediate thread replies.');
  }

  let sentiment: ContentAnalysis['sentiment'] = 'Authoritative';
  if (clean.includes('!') && hasEmoji) sentiment = 'High Excitement';
  else if (clean.includes('roadmap') || clean.includes('step') || clean.includes('formula')) sentiment = 'Authoritative';
  else if (clean.includes('story') || clean.includes('journey') || clean.includes('grow')) sentiment = 'Inspirational';
  else if (clean.includes('stop') || clean.includes('mistake') || clean.includes('warning')) sentiment = 'Urgent';

  return {
    overallScore,
    hookScore,
    readabilityScore,
    ctaScore,
    seoScore,
    strengths: strengths.slice(0, 3),
    suggestions: suggestions.slice(0, 2),
    readingTimeSec,
    wordCount: words,
    sentiment,
  };
}
