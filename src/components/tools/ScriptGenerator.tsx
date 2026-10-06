import React, { useState } from 'react';
import { Video, Copy, Bookmark, Check, RefreshCw, Sparkles, Download, BarChart2, Eye, X } from 'lucide-react';
import { Language, SavedItem, HistoryItem, ContentAnalysis } from '../../types';
import { generateScript, ScriptResult } from '../../data/mockGenerators';
import { translations } from '../../data/translations';
import { analyzeContent } from '../../utils/analysisUtils';
import { ExportModal } from '../modals/ExportModal';
import { ContentAnalysisModal } from '../modals/ContentAnalysisModal';

interface ScriptGeneratorProps {
  currentLang: Language;
  onSaveItem: (item: Omit<SavedItem, 'id' | 'createdAt'>) => void;
  onAddToHistory?: (item: Omit<HistoryItem, 'id' | 'createdAt'>) => void;
  onShowToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const ScriptGenerator: React.FC<ScriptGeneratorProps> = ({
  currentLang,
  onSaveItem,
  onAddToHistory,
  onShowToast,
}) => {
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState<'15s' | '30s' | '60s'>('30s');
  const [style, setStyle] = useState('Talking Head + Fast B-Roll');
  const [outputLang, setOutputLang] = useState<Language>(currentLang);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sceneCopiedIdx, setSceneCopiedIdx] = useState<number | null>(null);
  const [script, setScript] = useState<ScriptResult>(() =>
    generateScript('3 productivity systems that replace an 8-hour workday', '30s', 'Talking Head + Fast B-Roll', currentLang)
  );

  // Modals state
  const [teleprompterOpen, setTeleprompterOpen] = useState(false);
  const [exportModal, setExportModal] = useState<{ isOpen: boolean; title: string; content: string } | null>(null);
  const [analysisModal, setAnalysisModal] = useState<{ isOpen: boolean; title: string; content: string; analysis: ContentAnalysis } | null>(null);

  const t = translations[currentLang];
  const isOutputRTL = outputLang === 'ur' || outputLang === 'ar';

  const formatScriptText = (sc: ScriptResult) => {
    return `VIDEO PRODUCTION SCRIPT: ${sc.title}\nDuration: ${sc.duration}\nAudio: ${sc.audioRecommendation}\nRetention Trick: ${sc.hookRetentionFormula}\n\nSCENE BREAKDOWN:\n${sc.scenes
      .map(
        (s) =>
          `[${s.timeframe}]\nVisual: ${s.visualCue}\nSpoken Voiceover: "${s.spokenAudio}"\nOn-Screen Text: [${s.onScreenText}]`
      )
      .join('\n\n')}\n\nB-ROLL SHOTS:\n${sc.bRollList.map((b) => `- ${b}`).join('\n')}\n\nLOOP MECHANIC:\n${sc.loopStrategy}`;
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const result = generateScript(topic, duration, style, outputLang);
      setScript(result);
      setIsGenerating(false);

      if (onAddToHistory) {
        const full = formatScriptText(result);
        onAddToHistory({
          type: 'scripts',
          title: result.title,
          content: full,
          platform: 'instagram',
          tags: ['#reelscript', `#${duration}`],
          analysis: analyzeContent(full, result.title),
        });
      }

      onShowToast('Reel script synthesized with pacing breakdown!', 'success');
    }, 600);
  };

  const handleCopyFull = () => {
    const text = formatScriptText(script);
    navigator.clipboard.writeText(text);
    setCopied(true);
    onShowToast('Full production script copied!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyScene = (sceneText: string, idx: number) => {
    navigator.clipboard.writeText(sceneText);
    setSceneCopiedIdx(idx);
    onShowToast(`Scene ${idx + 1} copied!`, 'success');
    setTimeout(() => setSceneCopiedIdx(null), 2000);
  };

  const handleSave = () => {
    onSaveItem({
      type: 'scripts',
      title: script.title,
      content: formatScriptText(script),
      platform: 'instagram',
      tags: ['#reelscript', `#${duration}`, '#production'],
    });
  };

  const handleOpenExport = () => {
    setExportModal({
      isOpen: true,
      title: script.title,
      content: formatScriptText(script),
    });
  };

  const handleOpenAnalysis = () => {
    const full = formatScriptText(script);
    const analysis = analyzeContent(full, script.title);
    setAnalysisModal({
      isOpen: true,
      title: script.title,
      content: full,
      analysis,
    });
  };

  return (
    <div className="space-y-8">
      {/* Configuration Box */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md">
        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              {t.scripts.topicLabel}
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., How to start ecommerce in 2026, 3 habits of millionaire founders, tech unboxing"
              className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/80 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Duration Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                {t.scripts.durationLabel}
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value as '15s' | '30s' | '60s')}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950/80 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="15s">15 Seconds (Rapid Fire)</option>
                <option value="30s">30 Seconds (Algorithm Sweet Spot)</option>
                <option value="60s">60 Seconds (Deep Value / Authority)</option>
              </select>
            </div>

            {/* Visual Style Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                {t.scripts.styleLabel}
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950/80 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Talking Head + Fast B-Roll">Talking Head + Fast B-Roll</option>
                <option value="Aesthetic POV / Daily Vlog">Aesthetic POV / Daily Vlog</option>
                <option value="Kinetic Typography / Screen Tutorial">Kinetic Typography / Screen Tutorial</option>
                <option value="Contrarian Hot Take Setup">Contrarian Hot Take Setup</option>
              </select>
            </div>

            {/* Language Selector */}
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/25 transition-all cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating Script...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-violet-200" />
                  <span>{t.scripts.btnGenerate}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Script Production Output Card */}
      <div
        className={`p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md ${
          isOutputRTL ? (outputLang === 'ur' ? 'font-urdu' : 'font-arabic') : ''
        }`}
      >
        {/* Header bar of script */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-violet-400 font-semibold mb-1 font-sans">
              <Video className="w-4 h-4" />
              <span>Production Blueprint</span>
              <span>·</span>
              <span className="text-slate-400">{script.duration}</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">{script.title}</h3>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-sans">
            {/* Analyze Button */}
            <button
              onClick={handleOpenAnalysis}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-xs text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors cursor-pointer"
            >
              <BarChart2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Analyze</span>
            </button>

            {/* Download Button */}
            <button
              onClick={handleOpenExport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-violet-400" />
              <span>Export</span>
            </button>

            {/* Teleprompter Button */}
            <button
              onClick={() => setTeleprompterOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>Teleprompter</span>
            </button>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Save</span>
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopyFull}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-violet-600/30 hover:bg-violet-600/40 text-violet-300 border border-violet-500/30 text-xs font-semibold transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Script</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Audio & Formula Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 font-sans">
              Recommended Audio Vibe
            </div>
            <p className="text-xs text-slate-300">{script.audioRecommendation}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 font-sans">
              Hook Retention Mechanic
            </div>
            <p className="text-xs text-indigo-300">{script.hookRetentionFormula}</p>
          </div>
        </div>

        {/* Scene by Scene Timeline */}
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans">
            Scene Breakdown & Shot List
          </div>

          <div className="divide-y divide-slate-800/80">
            {script.scenes.map((scene, idx) => {
              const sceneText = `[${scene.timeframe}] Visual: ${scene.visualCue} | Spoken: "${scene.spokenAudio}" | Overlay: [${scene.onScreenText}]`;
              return (
                <div key={idx} className="py-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-start group">
                  {/* Timeframe pill */}
                  <div className="md:col-span-2">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-slate-800 text-indigo-300 text-xs font-mono font-medium">
                      {scene.timeframe}
                    </span>
                  </div>

                  {/* Visual Directions */}
                  <div className="md:col-span-4">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1 font-sans">
                      Camera & Visual Cue
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">{scene.visualCue}</p>
                  </div>

                  {/* Spoken Voiceover */}
                  <div className="md:col-span-4">
                    <div className="flex items-center justify-between mb-1 font-sans">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Spoken Script / Voice
                      </span>
                      <button
                        onClick={() => handleCopyScene(sceneText, idx)}
                        className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                        title="Copy scene"
                      >
                        {sceneCopiedIdx === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>Copy Scene</span>
                      </button>
                    </div>
                    <p className="text-xs text-white font-medium leading-relaxed bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                      "{scene.spokenAudio}"
                    </p>
                  </div>

                  {/* On-screen Text */}
                  <div className="md:col-span-2">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1 font-sans">
                      On-Screen Text
                    </span>
                    <span className="inline-block px-2 py-1 rounded bg-indigo-950/50 border border-indigo-800/50 text-indigo-300 text-[11px] font-semibold">
                      {scene.onScreenText}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Strategy & B-Roll */}
        <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 font-sans">
              Suggested B-Roll Shot List
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {script.bRollList.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 font-sans">
              Seamless Algorithm Loop Secret
            </div>
            <p className="text-xs text-emerald-300/90 leading-relaxed bg-emerald-950/20 border border-emerald-900/40 p-3 rounded-xl">
              {script.loopStrategy}
            </p>
          </div>
        </div>
      </div>

      {/* Teleprompter Modal */}
      {teleprompterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-3">
                <Video className="w-5 h-5 text-violet-400" />
                <h3 className="text-lg font-bold">Studio Teleprompter Mode</h3>
              </div>
              <button
                onClick={() => setTeleprompterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Teleprompter Text Display */}
            <div className="max-h-96 overflow-y-auto space-y-6 px-2 py-4 text-center">
              {script.scenes.map((scene, i) => (
                <div key={i} className="space-y-2">
                  <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">
                    [{scene.timeframe}]
                  </span>
                  <p className="text-xl sm:text-2xl font-bold text-white tracking-wide leading-relaxed">
                    "{scene.spokenAudio}"
                  </p>
                  <p className="text-xs text-slate-400">Action: {scene.visualCue}</p>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs">
              <div className="text-slate-400">
                Pace your delivery naturally. Practice with energy!
              </div>
              <button
                onClick={() => setTeleprompterOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
              >
                Done Rehearsing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {exportModal && (
        <ExportModal
          isOpen={exportModal.isOpen}
          onClose={() => setExportModal(null)}
          title={exportModal.title}
          content={exportModal.content}
          type="Reel Script"
          platform="Instagram / TikTok"
          onSuccess={(fmt) => onShowToast(`Exported script as .${fmt.toUpperCase()}`, 'success')}
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
          onCopy={handleCopyFull}
          onExport={() => {
            setExportModal({
              isOpen: true,
              title: analysisModal.title,
              content: analysisModal.content,
            });
            setAnalysisModal(null);
          }}
          isCopied={copied}
        />
      )}
    </div>
  );
};
