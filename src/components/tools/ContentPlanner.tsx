import React, { useState } from 'react';
import { Calendar, Download, CheckCircle2, Clock, Filter, Eye, Copy, Check, X, Instagram, Linkedin, Twitter, Youtube, Share2, BarChart2 } from 'lucide-react';
import { Language, PlannerDay, SocialPlatform, ContentAnalysis } from '../../types';
import { initialPlannerDays } from '../../data/initialPlanner';
import { translations } from '../../data/translations';
import { analyzeContent } from '../../utils/analysisUtils';
import { ExportModal } from '../modals/ExportModal';
import { ContentAnalysisModal } from '../modals/ContentAnalysisModal';

interface ContentPlannerProps {
  currentLang: Language;
  onShowToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const ContentPlanner: React.FC<ContentPlannerProps> = ({ currentLang, onShowToast }) => {
  const [days, setDays] = useState<PlannerDay[]>(initialPlannerDays);
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | 'all'>('all');
  const [activeDay, setActiveDay] = useState<PlannerDay | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Modals state
  const [exportModal, setExportModal] = useState<{ isOpen: boolean; title: string; content: string; platform?: string } | null>(null);
  const [analysisModal, setAnalysisModal] = useState<{ isOpen: boolean; title: string; content: string; analysis: ContentAnalysis } | null>(null);

  const t = translations[currentLang];

  const filteredDays = days.filter((d) => {
    const matchWeek = selectedWeek === 'all' || d.week === selectedWeek;
    const matchPlatform = selectedPlatform === 'all' || d.platform === selectedPlatform;
    return matchWeek && matchPlatform;
  });

  const handleStatusToggle = (dayNum: number) => {
    setDays((prev) =>
      prev.map((d) => {
        if (d.day === dayNum) {
          const nextStatus: PlannerDay['status'] =
            d.status === 'Draft' ? 'Scheduled' : d.status === 'Scheduled' ? 'Published' : 'Draft';
          return { ...d, status: nextStatus };
        }
        return d;
      })
    );
    onShowToast(`Day ${dayNum} status updated!`, 'info');
  };

  const handleCopyDay = (day: PlannerDay) => {
    const text = `DAY ${day.day} (${day.platform.toUpperCase()} - ${day.format})\nTheme: ${day.theme}\nTitle: ${day.title}\n\nHook:\n"${day.hook}"\n\nCaption:\n${day.caption}\n\nHashtags:\n${day.hashtags.join(' ')}`;
    navigator.clipboard.writeText(text);
    setCopiedId(day.day);
    onShowToast(`Day ${day.day} content copied!`, 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportCsv = () => {
    const headers = ['Day', 'Week', 'Platform', 'Format', 'Theme', 'Title', 'Hook', 'Caption', 'Hashtags', 'Status'];
    const rows = days.map((d) => [
      `"${d.day}"`,
      `"${d.week}"`,
      `"${d.platform}"`,
      `"${d.format}"`,
      `"${d.theme.replace(/"/g, '""')}"`,
      `"${d.title.replace(/"/g, '""')}"`,
      `"${d.hook.replace(/"/g, '""')}"`,
      `"${d.caption.replace(/"/g, '""')}"`,
      `"${d.hashtags.join(' ')}"`,
      `"${d.status}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Shoreem_30_Day_Content_Plan.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onShowToast('30-Day schedule exported as CSV file!', 'success');
  };

  const handleMarkAllScheduled = () => {
    setDays((prev) => prev.map((d) => ({ ...d, status: 'Scheduled' })));
    onShowToast('All 30 days marked as Scheduled!', 'success');
  };

  const getPlatformIcon = (platform: SocialPlatform) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-3.5 h-3.5 text-pink-400" />;
      case 'linkedin':
        return <Linkedin className="w-3.5 h-3.5 text-blue-400" />;
      case 'tiktok':
        return <Share2 className="w-3.5 h-3.5 text-cyan-400" />;
      case 'youtube':
        return <Youtube className="w-3.5 h-3.5 text-red-400" />;
      case 'twitter':
        return <Twitter className="w-3.5 h-3.5 text-sky-400" />;
      default:
        return null;
    }
  };

  return (
    <div id="content-planner" className="space-y-6">
      {/* Top Banner & Control Bar */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-1">
            <Calendar className="w-4 h-4" />
            <span>Editorial Roadmap</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{t.planner.title}</h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">{t.planner.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleMarkAllScheduled}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t.planner.markAllReady}</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/25 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{t.planner.exportCsv}</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-slate-800/80 bg-slate-950/60 text-xs">
        {/* Week Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-400 font-medium mr-2 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Sprint:
          </span>
          {[
            { id: 'all', label: 'All 30 Days' },
            { id: 1, label: 'W1: Discovery' },
            { id: 2, label: 'W2: Authority' },
            { id: 3, label: 'W3: Value Stacking' },
            { id: 4, label: 'W4: Conversions' },
          ].map((w) => (
            <button
              key={w.id}
              onClick={() => setSelectedWeek(w.id as number | 'all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedWeek === w.id
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>

        {/* Platform Filter */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Platform:</span>
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value as SocialPlatform | 'all')}
            className="px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">All Channels</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="tiktok">TikTok</option>
            <option value="youtube">YouTube</option>
            <option value="twitter">X / Twitter</option>
          </select>
        </div>
      </div>

      {/* Days Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredDays.map((day) => (
          <div
            key={day.day}
            className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm hover:border-slate-700 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Day Number & Platform */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 text-xs">
                <span className="font-bold text-white font-mono flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-md bg-indigo-950/80 border border-indigo-800/50 flex items-center justify-center text-[11px] text-indigo-300">
                    {day.day}
                  </span>
                  <span>Day {day.day}</span>
                </span>
                <span className="p-1 rounded bg-slate-950/80 border border-slate-800">
                  {getPlatformIcon(day.platform)}
                </span>
              </div>

              {/* Theme & Title */}
              <div className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider mb-1 line-clamp-1">
                {day.theme}
              </div>
              <h4 className="text-xs font-bold text-white mb-2 line-clamp-2 leading-snug">{day.title}</h4>

              {/* Hook snippet */}
              <p className="text-[11px] text-slate-400 italic line-clamp-2 mb-3 bg-slate-950/40 p-1.5 rounded border border-slate-800/50">
                "{day.hook}"
              </p>
            </div>

            {/* Bottom Status & View */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <button
                onClick={() => handleStatusToggle(day.day)}
                className={`text-[10px] px-2 py-0.5 rounded cursor-pointer transition-colors ${
                  day.status === 'Published'
                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                    : day.status === 'Scheduled'
                    ? 'bg-indigo-950/60 text-indigo-400 border border-indigo-800/60'
                    : 'bg-slate-800 text-slate-400'
                }`}
                title="Click to cycle status"
              >
                {day.status}
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopyDay(day)}
                  className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy day"
                >
                  {copiedId === day.day ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setActiveDay(day)}
                  className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Inspect details"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Day Inspector Modal */}
      {activeDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-sm">
                  {activeDay.day}
                </span>
                <div>
                  <h3 className="text-lg font-bold leading-tight">{activeDay.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span className="capitalize">{activeDay.platform}</span>
                    <span>·</span>
                    <span>{activeDay.format}</span>
                    <span>·</span>
                    <span className="text-cyan-400">{activeDay.theme}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveDay(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Opening Hook
                </label>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-sm font-semibold text-white">
                  "{activeDay.hook}"
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Full Caption & Story Body
                </label>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {activeDay.caption}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Hashtag Set
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {activeDay.hashtags.map((tag, i) => (
                    <span key={i} className="text-xs text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleStatusToggle(activeDay.day);
                    setActiveDay((prev) =>
                      prev
                        ? {
                            ...prev,
                            status: prev.status === 'Draft' ? 'Scheduled' : prev.status === 'Scheduled' ? 'Published' : 'Draft',
                          }
                        : null
                    );
                  }}
                  className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-200 hover:text-white transition-colors cursor-pointer"
                >
                  Status: <span className="font-bold text-indigo-400">{activeDay.status}</span>
                </button>

                <button
                  onClick={() => {
                    const fullText = `Day ${activeDay.day}: ${activeDay.title}\nHook: ${activeDay.hook}\nCaption: ${activeDay.caption}\nHashtags: ${activeDay.hashtags.join(' ')}`;
                    const analysis = analyzeContent(fullText, activeDay.title);
                    setAnalysisModal({
                      isOpen: true,
                      title: `Day ${activeDay.day}: ${activeDay.title}`,
                      content: fullText,
                      analysis,
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <BarChart2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Analyze</span>
                </button>

                <button
                  onClick={() => {
                    const fullText = `Day ${activeDay.day}: ${activeDay.title}\nHook: ${activeDay.hook}\nCaption: ${activeDay.caption}\nHashtags: ${activeDay.hashtags.join(' ')}`;
                    setExportModal({
                      isOpen: true,
                      title: `Day_${activeDay.day}_${activeDay.title}`,
                      content: fullText,
                      platform: activeDay.platform,
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Export</span>
                </button>
              </div>

              <button
                onClick={() => handleCopyDay(activeDay)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Full Post</span>
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
          type="Planned Post"
          platform={exportModal.platform}
          onSuccess={(fmt) => onShowToast(`Exported post as .${fmt.toUpperCase()}`, 'success')}
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
            onShowToast('Post copied to clipboard!', 'success');
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
