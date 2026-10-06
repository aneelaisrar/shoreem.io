import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Bookmark, 
  History, 
  Trash2, 
  Copy, 
  Check, 
  Sparkles, 
  Video, 
  FileText, 
  Hash, 
  Calendar, 
  ArrowUpRight, 
  Search, 
  Download, 
  BarChart2, 
  AlertCircle,
  Clock,
  Filter
} from 'lucide-react';
import { Language, SavedItem, HistoryItem, ToolType, PlanTier, ContentAnalysis, SubscriptionStatus } from '../types';
import { translations } from '../data/translations';
import { analyzeContent } from '../utils/analysisUtils';
import { ExportModal } from './modals/ExportModal';
import { ContentAnalysisModal } from './modals/ContentAnalysisModal';

interface DashboardProps {
  currentLang: Language;
  savedItems: SavedItem[];
  historyItems: HistoryItem[];
  subscription?: SubscriptionStatus;
  onDeleteItem: (id: string) => void;
  onDeleteHistoryItem: (id: string) => void;
  onClearHistory: () => void;
  onNavigateTool: (tool: ToolType) => void;
  activePlan: PlanTier;
  onOpenPricing: () => void;
  onShowToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentLang,
  savedItems,
  historyItems,
  subscription,
  onDeleteItem,
  onDeleteHistoryItem,
  onClearHistory,
  onNavigateTool,
  activePlan,
  onOpenPricing,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'history' | 'library' | 'quicktools'>('history');
  const [filterType, setFilterType] = useState<ToolType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Modals state
  const [exportModal, setExportModal] = useState<{ isOpen: boolean; title: string; content: string; type?: string; platform?: string } | null>(null);
  const [analysisModal, setAnalysisModal] = useState<{ isOpen: boolean; title: string; content: string; analysis: ContentAnalysis } | null>(null);

  const t = translations[currentLang];

  // Filtering for History
  const filteredHistory = historyItems.filter((item) => {
    const matchType = filterType === 'all' || item.type === filterType;
    const matchSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  // Filtering for Saved Library
  const filteredSaved = savedItems.filter((item) => {
    const matchType = filterType === 'all' || item.type === filterType;
    const matchSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    onShowToast('Copied content to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenExport = (title: string, content: string, type?: string, platform?: string) => {
    setExportModal({
      isOpen: true,
      title,
      content,
      type,
      platform,
    });
  };

  const handleOpenAnalysis = (title: string, content: string, preAnalysis?: ContentAnalysis) => {
    const analysis = preAnalysis || analyzeContent(content, title);
    setAnalysisModal({
      isOpen: true,
      title,
      content,
      analysis,
    });
  };

  return (
    <div id="creator-dashboard" className="space-y-8">
      {/* Top Welcome & KPI Metrics */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
              <LayoutDashboard className="w-4 h-4" />
              <span>{t.dashboard.title}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {t.dashboard.welcome}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              User-friendly hub for content history, saved blueprints, diagnostics, and instant exports.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                Active Tier
              </span>
              <span className="font-bold text-white capitalize">{activePlan} Studio</span>
            </div>
            <button
              onClick={onOpenPricing}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>{t.dashboard.upgradePlan}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Cards Stats */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
              Total Generations
            </span>
            <div className="text-2xl font-extrabold text-white mt-1">142</div>
            <span className="text-[10px] text-emerald-400 font-medium">↑ High creative velocity</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
              Content History Log
            </span>
            <div className="text-2xl font-extrabold text-cyan-400 mt-1">{historyItems.length}</div>
            <span className="text-[10px] text-slate-400">Searchable & Exportable</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
              Saved in Library
            </span>
            <div className="text-2xl font-extrabold text-indigo-400 mt-1">{savedItems.length}</div>
            <span className="text-[10px] text-slate-400">Favorites & Blueprints</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
              AI Demo Credits
            </span>
            <div className="text-2xl font-extrabold text-white mt-1">85 / 100</div>
            <span className="text-[10px] text-slate-400">Auto-refreshing daily</span>
          </div>
        </div>

        {/* Dedicated Subscription Status Card */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-900/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Subscription Status:
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                subscription?.status === 'pending_verification'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              }`}>
                {subscription?.status === 'pending_verification' ? 'JazzCash Verification Pending' : 'Active Subscription'}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Tier: <strong className="text-white capitalize">{subscription?.plan || activePlan}</strong> · 
              Billing: <span className="capitalize">{subscription?.billingCycle || 'monthly'}</span> · 
              Renewal: <strong>{subscription?.renewsAt || 'Next Month'}</strong>
              {subscription?.transactionId && (
                <> · Ref: <span className="font-mono text-indigo-300">{subscription.transactionId}</span></>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenPricing}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              Change / Upgrade Plan
            </button>
            <a
              href="#contact-support"
              className="px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
            >
              Billing Support
            </a>
          </div>
        </div>
      </div>

      {/* Main Dashboard Panel */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md">
        
        {/* Navigation Tabs Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Content History ({historyItems.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'library'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved Library ({savedItems.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('quicktools')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'quicktools'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Quick Launch</span>
            </button>
          </div>

          {activeTab === 'history' && historyItems.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-900/50 bg-rose-950/20 text-rose-400 hover:bg-rose-900/40 text-xs font-medium transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {/* Search & Tool Filters (Shown for History and Library) */}
        {activeTab !== 'quicktools' && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 my-6">
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              <span className="text-slate-500 text-xs mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Type:
              </span>
              {(['all', 'captions', 'scripts', 'ideas', 'hashtags'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-colors cursor-pointer ${
                    filterType === t
                      ? 'bg-indigo-600 text-white font-medium'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, keyword or content..."
                className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        )}

        {/* TAB 1: CONTENT HISTORY */}
        {activeTab === 'history' && (
          <div>
            {filteredHistory.length === 0 ? (
              <div className="p-12 text-center rounded-xl border border-dashed border-slate-800 text-slate-400">
                <History className="w-10 h-10 text-slate-600 mx-auto mb-2.5" />
                <p className="text-sm font-semibold text-slate-300">No history items found.</p>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Every time you generate captions, scripts, ideas, or hashtags, they will automatically appear here for searching, analyzing, and exporting.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Item Header */}
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 text-[11px]">
                        <span className="font-semibold text-cyan-400 uppercase tracking-wider font-mono">
                          {item.type}
                        </span>
                        <span className="text-slate-400 flex items-center gap-1 font-sans">
                          <Clock className="w-3 h-3" />
                          {item.createdAt}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white mb-2 line-clamp-1">{item.title}</h4>
                      
                      <p className="text-xs text-slate-300 line-clamp-4 whitespace-pre-line leading-relaxed mb-4">
                        {item.content}
                      </p>

                      {/* Score Badge if present */}
                      {item.analysis && (
                        <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/40 border border-emerald-900/50 text-emerald-300 text-[11px] font-mono">
                          <BarChart2 className="w-3 h-3 text-emerald-400" />
                          <span>Viral Score: {item.analysis.overallScore}/100</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-1 text-xs">
                      <div className="flex items-center gap-1">
                        {/* Analyze Button */}
                        <button
                          onClick={() => handleOpenAnalysis(item.title, item.content, item.analysis)}
                          className="p-1.5 rounded text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors cursor-pointer"
                          title="View Score & Suggestions"
                        >
                          <BarChart2 className="w-4 h-4" />
                        </button>

                        {/* Export Button */}
                        <button
                          onClick={() => handleOpenExport(item.title, item.content, item.type, item.platform)}
                          className="p-1.5 rounded text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Export TXT, PDF, CSV"
                        >
                          <Download className="w-4 h-4" />
                        </button>

                        {/* Delete Single Item */}
                        <button
                          onClick={() => onDeleteHistoryItem(item.id)}
                          className="p-1.5 rounded text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors cursor-pointer"
                          title="Delete from history"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Copy Button */}
                      <button
                        onClick={() => handleCopy(item.content, item.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-medium transition-colors cursor-pointer"
                      >
                        {copiedId === item.id ? (
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
            )}
          </div>
        )}

        {/* TAB 2: SAVED LIBRARY */}
        {activeTab === 'library' && (
          <div>
            {filteredSaved.length === 0 ? (
              <div className="p-12 text-center rounded-xl border border-dashed border-slate-800 text-slate-400">
                <Bookmark className="w-10 h-10 text-slate-600 mx-auto mb-2.5" />
                <p className="text-sm font-semibold text-slate-300">No saved assets in library.</p>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Click the "Save" button on any generated caption, reel script, or idea to bookmark it here permanently.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSaved.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 text-[11px]">
                        <span className="font-semibold text-indigo-400 uppercase tracking-wider font-mono">
                          {item.type}
                        </span>
                        <span className="text-slate-400">{item.createdAt}</span>
                      </div>

                      <h4 className="text-sm font-bold text-white mb-2 line-clamp-1">{item.title}</h4>
                      
                      <p className="text-xs text-slate-300 line-clamp-4 whitespace-pre-line leading-relaxed mb-4">
                        {item.content}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenAnalysis(item.title, item.content)}
                          className="p-1.5 rounded text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Analyze Asset"
                        >
                          <BarChart2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleOpenExport(item.title, item.content, item.type, item.platform)}
                          className="p-1.5 rounded text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Export TXT, PDF, CSV"
                        >
                          <Download className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onDeleteItem(item.id)}
                          className="p-1.5 rounded text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors cursor-pointer"
                          title="Delete from library"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleCopy(item.content, item.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-medium transition-colors cursor-pointer"
                      >
                        {copiedId === item.id ? (
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
            )}
          </div>
        )}

        {/* TAB 3: QUICK LAUNCH */}
        {activeTab === 'quicktools' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
            <button
              onClick={() => onNavigateTool('captions')}
              className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 hover:border-indigo-500/50 hover:bg-indigo-950/20 text-left transition-all cursor-pointer group"
            >
              <FileText className="w-5 h-5 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">AI Captions</div>
              <div className="text-[10px] text-slate-400">Multi-channel hooks</div>
            </button>

            <button
              onClick={() => onNavigateTool('scripts')}
              className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 hover:border-violet-500/50 hover:bg-violet-950/20 text-left transition-all cursor-pointer group"
            >
              <Video className="w-5 h-5 text-violet-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">Reel Scripts</div>
              <div className="text-[10px] text-slate-400">15s, 30s & 60s formats</div>
            </button>

            <button
              onClick={() => onNavigateTool('ideas')}
              className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 hover:border-amber-500/50 hover:bg-amber-950/20 text-left transition-all cursor-pointer group"
            >
              <Sparkles className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">Viral Ideas</div>
              <div className="text-[10px] text-slate-400">5 strategic pillars</div>
            </button>

            <button
              onClick={() => onNavigateTool('hashtags')}
              className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 hover:border-pink-500/50 hover:bg-pink-950/20 text-left transition-all cursor-pointer group"
            >
              <Hash className="w-5 h-5 text-pink-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">Hashtag Matrix</div>
              <div className="text-[10px] text-slate-400">Reach tier analysis</div>
            </button>

            <button
              onClick={() => onNavigateTool('planner')}
              className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 hover:border-cyan-500/50 hover:bg-cyan-950/20 text-left transition-all cursor-pointer group"
            >
              <Calendar className="w-5 h-5 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">30-Day Planner</div>
              <div className="text-[10px] text-slate-400">Monthly schedule</div>
            </button>
          </div>
        )}
      </div>

      {/* Clear History Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-sm bg-slate-950 border border-slate-800 rounded-2xl p-6 text-white shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-rose-950/60 border border-rose-800/50 flex items-center justify-center mx-auto mb-4 text-rose-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-1">Clear All History?</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              This will remove all {historyItems.length} generated items from your history log. Your saved favorites in the library will not be affected.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onClearHistory();
                  setShowClearConfirm(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Yes, Clear All
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white text-xs font-medium transition-colors"
              >
                Cancel
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
          type={exportModal.type}
          platform={exportModal.platform}
          onSuccess={(fmt) => onShowToast(`Asset exported as .${fmt.toUpperCase()}`, 'success')}
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
            onShowToast('Copied content to clipboard!', 'success');
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
