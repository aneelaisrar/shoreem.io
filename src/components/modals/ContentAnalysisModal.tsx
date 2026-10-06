import React from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, X, TrendingUp, Clock, BookOpen, Heart, Copy, Download, Check } from 'lucide-react';
import { ContentAnalysis } from '../../types';

interface ContentAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  analysis: ContentAnalysis;
  onCopy: () => void;
  onExport: () => void;
  isCopied: boolean;
}

export const ContentAnalysisModal: React.FC<ContentAnalysisModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  analysis,
  onCopy,
  onExport,
  isCopied,
}) => {
  if (!isOpen) return null;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 80) return 'text-indigo-400';
    if (score >= 70) return 'text-amber-400';
    return 'text-rose-400';
  };

  const getGrade = (score: number) => {
    if (score >= 95) return 'Viral Grade A+';
    if (score >= 90) return 'High Performing A';
    if (score >= 85) return 'Strong B+';
    return 'Solid Performer';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-950/60 border border-indigo-800/50">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Shoreem Content Diagnostic</h3>
              <p className="text-xs text-slate-400">Algorithmic scoring, strengths & conversion review</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target Title */}
        <div className="mb-6 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Audited Asset
          </span>
          <div className="text-sm font-semibold text-white line-clamp-1">{title}</div>
        </div>

        {/* Score Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Main Score */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-950/50 via-slate-900 to-slate-900 border border-indigo-500/40 flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Overall Viral Potential
            </span>
            <div className="flex items-baseline gap-2 my-2">
              <span className={`text-5xl font-extrabold font-mono ${getScoreColor(analysis.overallScore)}`}>
                {analysis.overallScore}
              </span>
              <span className="text-sm text-slate-500 font-bold">/100</span>
            </div>
            <span className="text-xs font-bold text-indigo-300">
              {getGrade(analysis.overallScore)}
            </span>
          </div>

          {/* Quick Metrics */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" /> Read Time:
                </span>
                <span className="font-semibold text-white">{analysis.readingTimeSec}s</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-violet-400" /> Word Count:
                </span>
                <span className="font-semibold text-white">{analysis.wordCount} words</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-pink-400" /> Sentiment:
                </span>
                <span className="font-semibold text-indigo-300">{analysis.sentiment}</span>
              </div>
            </div>
          </div>

          {/* Dimension Breakdown Meters */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2.5">
            <div>
              <div className="flex justify-between text-[11px] mb-1 font-medium">
                <span className="text-slate-400">Hook Velocity</span>
                <span className="text-white font-mono">{analysis.hookScore}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${analysis.hookScore}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1 font-medium">
                <span className="text-slate-400">Readability & Whitespace</span>
                <span className="text-white font-mono">{analysis.readabilityScore}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${analysis.readabilityScore}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1 font-medium">
                <span className="text-slate-400">CTA & Engagement Prompt</span>
                <span className="text-white font-mono">{analysis.ctaScore}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${analysis.ctaScore}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Strengths Section */}
        <div className="mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Key Content Strengths</span>
          </div>
          <div className="space-y-2">
            {analysis.strengths.map((str, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-xs text-slate-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{str}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Suggestions Section */}
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>High-Leverage Improvement Suggestions</span>
          </div>
          <div className="space-y-2">
            {analysis.suggestions.map((sug, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs text-slate-200 flex items-start gap-2.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{sug}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition-colors cursor-pointer"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Copied Content' : 'Copy Content'}</span>
            </button>

            <button
              onClick={onExport}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export (TXT, PDF, CSV)</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
