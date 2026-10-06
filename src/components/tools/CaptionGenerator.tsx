import React, { useState } from 'react';
import { Copy, Bookmark, Sparkles, Check, Share2, Instagram, Linkedin, Twitter, Youtube, RefreshCw, Download, BarChart2 } from 'lucide-react';
import { Language, SocialPlatform, SavedItem, HistoryItem, ContentAnalysis } from '../../types';
import { generateCaptions, CaptionResult } from '../../data/mockGenerators';
import { translations } from '../../data/translations';
import { analyzeContent } from '../../utils/analysisUtils';
import { ExportModal } from '../modals/ExportModal';
import { ContentAnalysisModal } from '../modals/ContentAnalysisModal';

interface CaptionGeneratorProps {
  currentLang: Language;
  onSaveItem: (item: Omit<SavedItem, 'id' | 'createdAt'>) => void;
  onAddToHistory?: (item: Omit<HistoryItem, 'id' | 'createdAt'>) => void;
  onShowToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const CaptionGenerator: React.FC<CaptionGeneratorProps> = ({
  currentLang,
  onSaveItem,
  onAddToHistory,
  onShowToast,
}) => {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState<SocialPlatform>('instagram');
  const [tone, setTone] = useState('Engaging & Viral');
  const [outputLang, setOutputLang] = useState<Language>(currentLang);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<CaptionResult[]>(() =>
    generateCaptions('Luxury minimalist watch collection launch', 'instagram', 'Engaging & Viral', currentLang)
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modals state
  const [exportModal, setExportModal] = useState<{ isOpen: boolean; title: string; content: string } | null>(null);
  const [analysisModal, setAnalysisModal] = useState<{ isOpen: boolean; title: string; content: string; analysis: ContentAnalysis } | null>(null);

  const t = translations[currentLang];
  const isOutputRTL = outputLang === 'ur' || outputLang === 'ar';

  const platforms: { id: SocialPlatform; label: string; icon: React.ReactNode }[] = [
    { id: 'instagram', label: 'Instagram', icon: <Instagram className="w-4 h-4" /> },
    { id: 'tiktok', label: 'TikTok', icon: <Share2 className="w-4 h-4" /> },
    { id: 'linkedin', label: 'LinkedIn', icon: <Linkedin className="w-4 h-4" /> },
    { id: 'twitter', label: 'X / Twitter', icon: <Twitter className="w-4 h-4" /> },
    { id: 'youtube', label: 'YouTube Shorts', icon: <Youtube className="w-4 h-4" /> },
  ];

  const tones = [
    'Engaging & Viral',
    'Storytelling & Vulnerable',
    'Professional & Authority',
    'Witty & Playful',
    'Urgent & FOMO',
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generated = generateCaptions(topic, platform, tone, outputLang);
      setResults(generated);
      setIsGenerating(false);

      // Record first variation to history automatically
      if (onAddToHistory && generated.length > 0) {
        const topResult = generated[0];
        const fullContent = `${topResult.hook}\n\n${topResult.body}\n\n${topResult.cta}\n\n${topResult.hashtags.join(' ')}`;
        onAddToHistory({
          type: 'captions',
          title: `${platform.toUpperCase()}: ${topic || 'Viral Caption'}`,
          content: fullContent,
          platform,
          tags: topResult.hashtags,
          analysis: analyzeContent(fullContent, topic),
        });
      }

      onShowToast('Captions generated successfully with Shoreem AI Engine!', 'success');
    }, 600);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    onShowToast('Copied to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSave = (item: CaptionResult) => {
    const fullText = `${item.hook}\n\n${item.body}\n\n${item.cta}\n\n${item.hashtags.join(' ')}`;
    onSaveItem({
      type: 'captions',
      title: `${platform.toUpperCase()}: ${item.styleName}`,
      content: fullText,
      platform,
      tags: item.hashtags,
    });
  };

  const handleOpenExport = (item: CaptionResult) => {
    const fullText = `${item.hook}\n\n${item.body}\n\n${item.cta}\n\n${item.hashtags.join(' ')}`;
    setExportModal({
      isOpen: true,
      title: `${platform.toUpperCase()} Caption - ${item.styleName}`,
      content: fullText,
    });
  };

  const handleOpenAnalysis = (item: CaptionResult) => {
    const fullText = `${item.hook}\n\n${item.body}\n\n${item.cta}\n\n${item.hashtags.join(' ')}`;
    const analysis = analyzeContent(fullText, item.styleName);
    setAnalysisModal({
      isOpen: true,
      title: `${platform.toUpperCase()}: ${item.styleName}`,
      content: fullText,
      analysis,
    });
  };

  return (
    <div className="space-y-8">
      {/* Input Configuration Panel */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md">
        <div className="flex flex-col gap-5">
          {/* Topic / Prompt */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              {t.captions.topicLabel}
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={t.captions.nichePlaceholder}
              className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/80 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
          </div>

          {/* Quick Selectors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Platform Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                {t.captions.platformLabel}
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as SocialPlatform)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950/80 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {platforms.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Tone Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                {t.captions.toneLabel}
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950/80 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {tones.map((tn) => (
                  <option key={tn} value={tn}>
                    {tn}
                  </option>
                ))}
              </select>
            </div>

            {/* Output Language Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                {t.captions.langLabel}
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

          {/* Generate Button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition-all cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{t.captions.generating}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-indigo-300" />
                  <span>{t.captions.btnGenerate}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Generated Results Variations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {results.map((item, index) => {
          const fullText = `${item.hook}\n\n${item.body}\n\n${item.cta}\n\n${item.hashtags.join(' ')}`;
          return (
            <div
              key={item.id}
              className={`flex flex-col justify-between p-6 rounded-2xl border border-slate-800/90 bg-slate-900/60 backdrop-blur-md hover:border-slate-700 transition-all ${
                isOutputRTL ? (outputLang === 'ur' ? 'font-urdu' : 'font-arabic') : ''
              }`}
            >
              <div>
                {/* Header card with style title */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs">
                  <span className="font-semibold text-indigo-400">
                    Option 0{index + 1}: {item.styleName}
                  </span>
                  <span className="text-slate-400 text-[11px] font-sans">
                    {item.readTime} · {item.charCount} chars
                  </span>
                </div>

                {/* Hook */}
                <div className="mb-3">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 font-sans">
                    Hook Line
                  </div>
                  <p className="text-sm font-bold text-white leading-relaxed">{item.hook}</p>
                </div>

                {/* Body */}
                <div className="mb-4">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 font-sans">
                    Body Copy
                  </div>
                  <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">{item.body}</p>
                </div>

                {/* CTA */}
                <div className="mb-4 p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-indigo-200">
                  <span className="font-semibold text-slate-400 text-[10px] block uppercase tracking-wider mb-0.5 font-sans">
                    Call To Action
                  </span>
                  {item.cta}
                </div>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.hashtags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] text-slate-400 hover:text-indigo-300 cursor-pointer transition-colors"
                      onClick={() => handleCopy(tag, `tag-${item.id}-${i}`)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-sans">
                <div className="flex items-center gap-1.5">
                  {/* Content Analysis Button */}
                  <button
                    onClick={() => handleOpenAnalysis(item)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors cursor-pointer"
                    title="Audit Content Score & Suggestions"
                  >
                    <BarChart2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Analyze</span>
                  </button>

                  {/* Download Button */}
                  <button
                    onClick={() => handleOpenExport(item)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
                    title="Export as TXT, PDF, CSV"
                  >
                    <Download className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Export</span>
                  </button>

                  {/* Save to library */}
                  <button
                    onClick={() => handleSave(item)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Save to Library"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                </div>

                {/* Copy Button */}
                <button
                  onClick={() => handleCopy(fullText, item.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 font-semibold transition-colors cursor-pointer ml-auto"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">{t.common.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.common.copy}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Export Modal */}
      {exportModal && (
        <ExportModal
          isOpen={exportModal.isOpen}
          onClose={() => setExportModal(null)}
          title={exportModal.title}
          content={exportModal.content}
          type="AI Caption"
          platform={platform}
          onSuccess={(fmt) => onShowToast(`Exported as .${fmt.toUpperCase()}`, 'success')}
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
          onCopy={() => handleCopy(analysisModal.content, 'analysis-copy')}
          onExport={() => {
            setExportModal({
              isOpen: true,
              title: analysisModal.title,
              content: analysisModal.content,
            });
            setAnalysisModal(null);
          }}
          isCopied={copiedId === 'analysis-copy'}
        />
      )}
    </div>
  );
};
