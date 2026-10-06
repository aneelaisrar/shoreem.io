import React, { useState } from 'react';
import { Sparkles, Copy, Bookmark, Check, RefreshCw, TrendingUp, Download, BarChart2 } from 'lucide-react';
import { Language, SavedItem, HistoryItem, ContentAnalysis } from '../../types';
import { generateContentIdeas, ContentIdea } from '../../data/mockGenerators';
import { translations } from '../../data/translations';
import { analyzeContent } from '../../utils/analysisUtils';
import { ExportModal } from '../modals/ExportModal';
import { ContentAnalysisModal } from '../modals/ContentAnalysisModal';

interface IdeaGeneratorProps {
  currentLang: Language;
  onSaveItem: (item: Omit<SavedItem, 'id' | 'createdAt'>) => void;
  onAddToHistory?: (item: Omit<HistoryItem, 'id' | 'createdAt'>) => void;
  onShowToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const IdeaGenerator: React.FC<IdeaGeneratorProps> = ({
  currentLang,
  onSaveItem,
  onAddToHistory,
  onShowToast,
}) => {
  const [niche, setNiche] = useState('E-commerce & Digital Brands');
  const [pillar, setPillar] = useState('All Strategic Pillars');
  const [outputLang, setOutputLang] = useState<Language>(currentLang);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [ideas, setIdeas] = useState<ContentIdea[]>(() =>
    generateContentIdeas('E-commerce & Digital Brands', 'All Strategic Pillars', currentLang)
  );

  // Modals state
  const [exportModal, setExportModal] = useState<{ isOpen: boolean; title: string; content: string } | null>(null);
  const [analysisModal, setAnalysisModal] = useState<{ isOpen: boolean; title: string; content: string; analysis: ContentAnalysis } | null>(null);

  const t = translations[currentLang];
  const isOutputRTL = outputLang === 'ur' || outputLang === 'ar';

  const nichePresets = [
    'SaaS & Tech AI',
    'E-commerce & Brands',
    'Personal Branding',
    'Fitness & Health',
    'Real Estate & Wealth',
    'Freelancing & Agency',
  ];

  const formatIdeaText = (idea: ContentIdea) => {
    return `VIRAL CONTENT CONCEPT: ${idea.title}\nFormat: ${idea.format}\nCuriosity Hook: "${idea.hook}"\nPillar: ${idea.pillar}\nEngagement Potential: ${idea.engagementScore}/100\nWhy It Works: ${idea.whyItWorks}`;
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const results = generateContentIdeas(niche, pillar, outputLang);
      setIdeas(results);
      setIsGenerating(false);

      if (onAddToHistory && results.length > 0) {
        const topIdea = results[0];
        const contentStr = formatIdeaText(topIdea);
        onAddToHistory({
          type: 'ideas',
          title: topIdea.title,
          content: contentStr,
          tags: [topIdea.format.toLowerCase(), 'viral-idea'],
          analysis: analyzeContent(contentStr, topIdea.title),
        });
      }

      onShowToast('5 viral content concepts uncovered!', 'success');
    }, 600);
  };

  const handleCopy = (idea: ContentIdea) => {
    const text = formatIdeaText(idea);
    navigator.clipboard.writeText(text);
    setCopiedId(idea.id);
    onShowToast('Concept copied to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSave = (idea: ContentIdea) => {
    onSaveItem({
      type: 'ideas',
      title: idea.title,
      content: formatIdeaText(idea),
      tags: [idea.format.toLowerCase(), 'viral-idea', idea.pillar],
    });
  };

  const handleOpenExport = (idea: ContentIdea) => {
    setExportModal({
      isOpen: true,
      title: idea.title,
      content: formatIdeaText(idea),
    });
  };

  const handleOpenAnalysis = (idea: ContentIdea) => {
    const fullText = formatIdeaText(idea);
    const analysis = analyzeContent(fullText, idea.title);
    setAnalysisModal({
      isOpen: true,
      title: idea.title,
      content: fullText,
      analysis,
    });
  };

  return (
    <div className="space-y-8">
      {/* Search & Niche Configuration */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md">
        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              {t.ideas.nicheLabel}
            </label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g., Luxury travel, fitness coaching, coding bootcamp, organic skincare"
              className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/80 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1">Popular Niches:</span>
            {nichePresets.map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  setNiche(preset);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer ${
                  niche === preset
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-950/80 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                {t.ideas.pillarLabel}
              </label>
              <select
                value={pillar}
                onChange={(e) => setPillar(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950/80 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="All Strategic Pillars">All Strategic Pillars (Balanced Mix)</option>
                <option value="Authority & Case Studies">Authority & Case Studies (High Trust)</option>
                <option value="Actionable Tutorials">Actionable Tutorials (High Saves)</option>
                <option value="Contrarian Hot Takes">Contrarian Hot Takes (High Comments)</option>
                <option value="Relatable / Behind The Scenes">Relatable & Behind The Scenes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Language
              </label>
              <select
                value={outputLang}
                onChange={(e) => setOutputLang(e.target.value as Language)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950/80 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="en">English (Global)</option>
                <option value="ur">اردو (Urdu)</option>
                <option value="ur-roman">Roman Urdu</option>
                <option value="ar">العربية (Arabic)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/25 transition-all cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning Trends...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>{t.ideas.btnGenerate}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Generated Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className={`flex flex-col justify-between p-6 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md hover:border-slate-700 transition-all ${
              isOutputRTL ? (outputLang === 'ur' ? 'font-urdu' : 'font-arabic') : ''
            }`}
          >
            <div>
              {/* Top metadata */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs font-sans">
                <span className="font-semibold text-amber-400">{idea.format}</span>
                <span className="flex items-center gap-1 text-emerald-400 font-mono font-medium">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {idea.engagementScore}% Potential
                </span>
              </div>

              {/* Title */}
              <h4 className="text-base font-bold text-white mb-2 leading-snug">{idea.title}</h4>

              {/* Hook */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 mb-4">
                <span className="font-semibold text-slate-400 text-[10px] uppercase block tracking-wider mb-1 font-sans">
                  The Hook / Angle
                </span>
                "{idea.hook}"
              </div>

              {/* Why it works */}
              <div className="text-xs text-slate-400 mb-6">
                <span className="font-semibold text-slate-300 font-sans block mb-1">Algorithmic Driver:</span>
                {idea.whyItWorks}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-sans">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenAnalysis(idea)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors cursor-pointer"
                  title="Analyze Idea"
                >
                  <BarChart2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Analyze</span>
                </button>

                <button
                  onClick={() => handleOpenExport(idea)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
                  title="Export Concept"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Export</span>
                </button>

                <button
                  onClick={() => handleSave(idea)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Save Idea"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save</span>
                </button>
              </div>

              <button
                onClick={() => handleCopy(idea)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 font-semibold transition-colors cursor-pointer ml-auto"
              >
                {copiedId === idea.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Export Modal */}
      {exportModal && (
        <ExportModal
          isOpen={exportModal.isOpen}
          onClose={() => setExportModal(null)}
          title={exportModal.title}
          content={exportModal.content}
          type="Content Concept"
          platform="Social Media"
          onSuccess={(fmt) => onShowToast(`Exported idea as .${fmt.toUpperCase()}`, 'success')}
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
            onShowToast('Concept copied!', 'success');
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
