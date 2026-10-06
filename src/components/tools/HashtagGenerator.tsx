import React, { useState } from 'react';
import { Hash, Copy, Bookmark, Check, RefreshCw, Sparkles, Download, BarChart2 } from 'lucide-react';
import { Language, SavedItem, HistoryItem, ContentAnalysis } from '../../types';
import { generateHashtags, HashtagSet } from '../../data/mockGenerators';
import { translations } from '../../data/translations';
import { analyzeContent } from '../../utils/analysisUtils';
import { ExportModal } from '../modals/ExportModal';
import { ContentAnalysisModal } from '../modals/ContentAnalysisModal';

interface HashtagGeneratorProps {
  currentLang: Language;
  onSaveItem: (item: Omit<SavedItem, 'id' | 'createdAt'>) => void;
  onAddToHistory?: (item: Omit<HistoryItem, 'id' | 'createdAt'>) => void;
  onShowToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const HashtagGenerator: React.FC<HashtagGeneratorProps> = ({
  currentLang,
  onSaveItem,
  onAddToHistory,
  onShowToast,
}) => {
  const [keyword, setKeyword] = useState('socialmedia');
  const [isGenerating, setIsGenerating] = useState(false);
  const [data, setData] = useState<HashtagSet>(() => generateHashtags('socialmedia'));
  const [copiedMode, setCopiedMode] = useState<string | null>(null);

  // Modals state
  const [exportModal, setExportModal] = useState<{ isOpen: boolean; title: string; content: string } | null>(null);
  const [analysisModal, setAnalysisModal] = useState<{ isOpen: boolean; title: string; content: string; analysis: ContentAnalysis } | null>(null);

  const t = translations[currentLang];
  const allTags = [...data.highVolume, ...data.mediumReach, ...data.nicheSpecific];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const res = generateHashtags(keyword);
      setData(res);
      setIsGenerating(false);

      if (onAddToHistory) {
        const fullTags = [...res.highVolume, ...res.mediumReach, ...res.nicheSpecific];
        const textContent = `HASHTAG REACH MATRIX FOR #${keyword}:\n\nMega Reach (1M+):\n${res.highVolume.join(' ')}\n\nActive Discovery (100k-500k):\n${res.mediumReach.join(' ')}\n\nNiche Communities (10k-100k):\n${res.nicheSpecific.join(' ')}`;
        onAddToHistory({
          type: 'hashtags',
          title: `Hashtag Matrix: #${keyword}`,
          content: textContent,
          tags: fullTags.slice(0, 8),
          analysis: analyzeContent(textContent, `#${keyword} Matrix`),
        });
      }

      onShowToast('Reach matrix compiled with tiered tags!', 'success');
    }, 500);
  };

  const handleCopy = (tags: string[], mode: string, withDots = false) => {
    let text = tags.join(' ');
    if (withDots) {
      text = `.\n.\n.\n.\n.\n${tags.join(' ')}`;
    }
    navigator.clipboard.writeText(text);
    setCopiedMode(mode);
    onShowToast(`Copied ${tags.length} hashtags!`, 'success');
    setTimeout(() => setCopiedMode(null), 2000);
  };

  const handleSaveAll = () => {
    onSaveItem({
      type: 'hashtags',
      title: `Hashtag Matrix for #${keyword}`,
      content: allTags.join(' '),
      tags: allTags.slice(0, 5),
    });
  };

  const handleOpenExport = () => {
    const textContent = `HASHTAG REACH MATRIX FOR #${keyword}\n\nHigh Volume (>1M):\n${data.highVolume.join(' ')}\n\nMid Reach (100k - 500k):\n${data.mediumReach.join(' ')}\n\nTargeted Niche (10k - 100k):\n${data.nicheSpecific.join(' ')}`;
    setExportModal({
      isOpen: true,
      title: `Hashtag Matrix - #${keyword}`,
      content: textContent,
    });
  };

  const handleOpenAnalysis = () => {
    const textContent = allTags.join(' ');
    const analysis = analyzeContent(textContent, `#${keyword} Matrix`);
    setAnalysisModal({
      isOpen: true,
      title: `Hashtag Matrix: #${keyword}`,
      content: textContent,
      analysis,
    });
  };

  return (
    <div className="space-y-8">
      {/* Config Bar */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-end gap-4">
          <div className="flex-1 w-full">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              {t.hashtags.keywordLabel}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold">#</span>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. artificialintelligence, marketing, fitness, ecommerce"
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-950/80 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-pink-600 hover:bg-pink-500 text-white shadow-lg shadow-pink-600/25 transition-all cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Computing Reach...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-pink-200" />
                <span>{t.hashtags.btnGenerate}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hashtag Reach Matrix Display */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md">
        {/* Top actions & Health Score */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-pink-400 mb-1">
              <Hash className="w-4 h-4" />
              <span>Reach Distribution Matrix</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              #{keyword} Collection ({allTags.length} Optimized Tags)
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleOpenAnalysis}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 text-xs font-semibold transition-colors cursor-pointer"
            >
              <BarChart2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Analyze</span>
            </button>

            <button
              onClick={handleOpenExport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-pink-400" />
              <span>Export</span>
            </button>

            <button
              onClick={() => handleCopy(allTags, 'all')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 border border-pink-500/30 text-xs font-semibold transition-colors cursor-pointer"
            >
              {copiedMode === 'all' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy All ({allTags.length})</span>
            </button>

            <button
              onClick={() => handleCopy(allTags, 'dots', true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              title="Adds 5 clean line-break dots for clean Instagram captions"
            >
              {copiedMode === 'dots' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy With Spacing</span>
            </button>

            <button
              onClick={handleSaveAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Save</span>
            </button>
          </div>
        </div>

        {/* 3 Tier Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tier 1: High Volume */}
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span className="text-orange-400">🔥</span> Mega Reach (1M+)
                </span>
                <span className="text-[11px] text-slate-400">Broad Audience</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {data.highVolume.map((tag, i) => (
                  <span
                    key={i}
                    onClick={() => handleCopy([tag], `tag-${tag}`)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-pink-300 hover:border-pink-500/40 cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => handleCopy(data.highVolume, 'high')}
              className="w-full text-center py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5 font-medium"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Tier ({data.highVolume.length})</span>
            </button>
          </div>

          {/* Tier 2: Mid Reach */}
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span className="text-indigo-400">🚀</span> Active Discovery (100k - 500k)
                </span>
                <span className="text-[11px] text-slate-400">High Engagement</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {data.mediumReach.map((tag, i) => (
                  <span
                    key={i}
                    onClick={() => handleCopy([tag], `tag-${tag}`)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-indigo-300 hover:border-indigo-500/40 cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => handleCopy(data.mediumReach, 'mid')}
              className="w-full text-center py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5 font-medium"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Tier ({data.mediumReach.length})</span>
            </button>
          </div>

          {/* Tier 3: Niche Target */}
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span className="text-emerald-400">🎯</span> Niche Communities (10k - 100k)
                </span>
                <span className="text-[11px] text-slate-400">High Conversion</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {data.nicheSpecific.map((tag, i) => (
                  <span
                    key={i}
                    onClick={() => handleCopy([tag], `tag-${tag}`)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-emerald-300 hover:border-emerald-500/40 cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => handleCopy(data.nicheSpecific, 'niche')}
              className="w-full text-center py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5 font-medium"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Tier ({data.nicheSpecific.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {exportModal && (
        <ExportModal
          isOpen={exportModal.isOpen}
          onClose={() => setExportModal(null)}
          title={exportModal.title}
          content={exportModal.content}
          type="Hashtag Matrix"
          platform="Multi-platform"
          onSuccess={(fmt) => onShowToast(`Exported hashtags as .${fmt.toUpperCase()}`, 'success')}
        />
      )}

      {/* Content Analysis Modal */}
      {analysisModal && (
        <ContentAnalysisModal
          isOpen={analysisModal.isOpen}
          onClose={() => setAnalysisModal(null)}
          title={analysisModal.title}
          content={analysisModal.content}
          analysis={analysisModal.analysis}
          onCopy={() => {
            navigator.clipboard.writeText(analysisModal.content);
            onShowToast('Hashtags copied!', 'success');
          }}
          onExport={() => {
            setExportModal({
              isOpen: true,
              title: analysisModal.title,
              content: analysisModal.content,
            });
            setAnalysisModal(null);
          }}
          isCopied={false}
        />
      )}
    </div>
  );
};
