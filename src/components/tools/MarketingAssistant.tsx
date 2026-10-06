import React, { useState } from 'react';
import { Zap, Send, Copy, Check, Sparkles, CheckSquare, Download, BarChart2 } from 'lucide-react';
import { Language, AssistantMessage, ContentAnalysis } from '../../types';
import { getAssistantResponse } from '../../data/mockGenerators';
import { translations } from '../../data/translations';
import { analyzeContent } from '../../utils/analysisUtils';
import { ExportModal } from '../modals/ExportModal';
import { ContentAnalysisModal } from '../modals/ContentAnalysisModal';

interface MarketingAssistantProps {
  currentLang: Language;
  onShowToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const MarketingAssistant: React.FC<MarketingAssistantProps> = ({ currentLang, onShowToast }) => {
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text:
        currentLang === 'ur'
          ? 'السلام علیکم! میں شوریم اے آئی مارکیٹنگ اسٹریٹجسٹ ہوں۔ آپ اپنے کاروبار کی آن لائن ترقی، وائرل ریلز کی حکمت عملی یا سیلز بڑھانے کے بارے میں کیا جاننا چاہتے ہیں؟'
          : currentLang === 'ar'
          ? 'مرحباً بك! أنا مستشارك التسويقي الذكي من شوريم. كيف يمكنني مساعدتك اليوم في مضاعفة نموك وبناء حملاتك الإعلانية؟'
          : currentLang === 'ur-roman'
          ? 'Assalam-o-Alaikum! Main Shoreem AI Marketing Assistant hoon. Aap online growth, viral hooks ya customer acquisition ke baare mein kuch bhi pooch sakte hain.'
          : 'Welcome to Shoreem AI Marketing Strategist. Ask me anything about funnel optimization, viral hooks, retention algorithms, or launch playbooks.',
      timestamp: 'Just now',
      actionItems: ['Pick a quick strategy prompt below or type your custom question!'],
    },
  ]);
  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Modals state
  const [exportModal, setExportModal] = useState<{ isOpen: boolean; title: string; content: string } | null>(null);
  const [analysisModal, setAnalysisModal] = useState<{ isOpen: boolean; title: string; content: string; analysis: ContentAnalysis } | null>(null);

  const t = translations[currentLang];
  const isRTL = currentLang === 'ur' || currentLang === 'ar';

  const suggestedPrompts = [
    { title: 'Viral Hook Retention Formulas', query: 'What are the top viral hook formulas for Instagram and TikTok?' },
    { title: '7-Day Product Launch Campaign', query: 'Create a 7-day product launch campaign sequence for digital offers' },
    { title: 'Turn Views into Paying Clients', query: 'How do I convert short-form video viewers into high-ticket clients?' },
    { title: 'Repurpose 1 Video into 10 Assets', query: 'Show me how to repurpose one 60-second video into 10 social posts' },
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: AssistantMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getAssistantResponse(text, currentLang);
      const botMsg: AssistantMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: 'Just now',
        actionItems: response.actionItems,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      onShowToast('Strategy playbook generated!', 'success');
    }, 600);
  };

  const handleCopy = (msg: AssistantMessage) => {
    const full = `${msg.text}\n\n${
      msg.actionItems ? `ACTION ITEMS:\n${msg.actionItems.map((a) => `- [ ] ${a}`).join('\n')}` : ''
    }`;
    navigator.clipboard.writeText(full);
    setCopiedId(msg.id);
    onShowToast('Playbook copied to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="marketing-assistant" className="space-y-6">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <Zap className="w-4 h-4" />
            <span>AI Growth Intelligence</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{t.assistant.title}</h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">{t.assistant.subtitle}</p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Online · Instant Responses</span>
        </div>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div>
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>{t.assistant.suggestedPrompts}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {suggestedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p.query)}
              className="p-3 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-emerald-500/40 hover:bg-emerald-950/20 text-left transition-all cursor-pointer group"
            >
              <div className="text-xs font-semibold text-slate-200 group-hover:text-emerald-300">
                {p.title}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{p.query}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Panel */}
      <div className="p-4 sm:p-6 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md min-h-[420px] max-h-[600px] overflow-y-auto flex flex-col gap-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} ${
              isRTL ? (currentLang === 'ur' ? 'font-urdu' : 'font-arabic') : ''
            }`}
          >
            <div
              className={`max-w-2xl rounded-2xl p-4 sm:p-5 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-sm'
                  : 'bg-slate-950/90 text-slate-200 border border-slate-800/80 rounded-bl-sm shadow-lg'
              }`}
            >
              {/* Message Header */}
              <div className="flex items-center justify-between gap-4 pb-2 mb-2 border-b border-white/10 text-xs text-slate-400 font-sans">
                <span className="font-semibold text-xs text-indigo-300 flex items-center gap-1.5">
                  {msg.sender === 'user' ? 'You' : 'Shoreem Strategist'}
                </span>
                <span className="text-[10px]">{msg.timestamp}</span>
              </div>

              {/* Message Content */}
              <div className="whitespace-pre-line text-xs sm:text-sm font-normal">{msg.text}</div>

              {/* Action items if assistant */}
              {msg.actionItems && msg.actionItems.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-800/80 font-sans">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>Recommended Action Steps</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {msg.actionItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Toolbar for Assistant Response */}
              {msg.sender === 'assistant' && (
                <div className="mt-3 pt-2 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2 font-sans">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        const analysis = analyzeContent(msg.text, 'Shoreem Marketing Playbook');
                        setAnalysisModal({
                          isOpen: true,
                          title: 'Shoreem Strategy Playbook',
                          content: msg.text,
                          analysis,
                        });
                      }}
                      className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer px-2 py-1 rounded bg-slate-900 border border-slate-800"
                    >
                      <BarChart2 className="w-3 h-3 text-cyan-400" />
                      <span>Analyze</span>
                    </button>

                    <button
                      onClick={() => {
                        setExportModal({
                          isOpen: true,
                          title: 'Marketing_Strategy_Playbook',
                          content: msg.text,
                        });
                      }}
                      className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer px-2 py-1 rounded bg-slate-900 border border-slate-800"
                    >
                      <Download className="w-3 h-3 text-indigo-400" />
                      <span>Export</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handleCopy(msg)}
                    className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Playbook</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 p-3 bg-slate-950/60 rounded-xl max-w-xs border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Shoreem Strategist is formulating response...</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.assistant.chatPlaceholder}
          className="w-full pl-4 pr-24 py-3.5 rounded-xl border border-slate-800 bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm shadow-xl"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={() => handleSend()}
          className="absolute right-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Export Modal */}
      {exportModal && (
        <ExportModal
          isOpen={exportModal.isOpen}
          onClose={() => setExportModal(null)}
          title={exportModal.title}
          content={exportModal.content}
          type="Marketing Playbook"
          platform="Strategic Funnel"
          onSuccess={(fmt) => onShowToast(`Exported playbook as .${fmt.toUpperCase()}`, 'success')}
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
            onShowToast('Playbook copied to clipboard!', 'success');
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
