import React from 'react';
import { Sparkles, ArrowRight, Video, FileText, Hash, Calendar, Zap, CheckCircle2, Globe2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeroProps {
  currentLang: Language;
  onExploreTools: (toolName?: string) => void;
  onOpenPlanner: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onExploreTools, onOpenPlanner }) => {
  const t = translations[currentLang];
  const isRTL = currentLang === 'ur' || currentLang === 'ar';

  return (
    <section id="hero" className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[250px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[250px] bg-violet-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-4xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
          
          {/* Top Pill / Kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/40 text-indigo-300 text-xs font-medium mb-8 backdrop-blur-sm shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>{t.hero.badge}</span>
            <span className="w-1 h-1 rounded-full bg-indigo-400"></span>
            <span className="text-slate-300">Shoreem.io 2.0</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] sm:leading-[1.15]">
            <span>{t.hero.title1}</span>{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
              {t.hero.titleHighlight}
            </span>{' '}
            <span>{t.hero.title2}</span>
          </h1>

          {/* Subtitle / Value Prop */}
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            {t.hero.description}
          </p>

          {/* Supported Languages Ribbon */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Globe2 className="w-3.5 h-3.5 text-indigo-400" /> Multilingual Output:
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">English</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-indigo-300 font-urdu">اردو (Urdu)</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">Roman Urdu</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 font-arabic">العربية (Arabic)</span>
          </div>

          {/* Action CTAs */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onExploreTools()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Zap className="w-4 h-4 text-indigo-200 fill-indigo-200" />
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenPlanner}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border border-slate-800 bg-slate-900/80 hover:bg-slate-800/80 text-slate-200 hover:text-white transition-all cursor-pointer backdrop-blur-sm"
            >
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>{t.hero.ctaSecondary}</span>
            </button>
          </div>

          {/* Social Proof Text */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{t.hero.socialProof}</span>
          </div>

          {/* Live Studio Launcher Grid preview */}
          <div className="mt-14 max-w-4xl mx-auto p-4 sm:p-6 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs text-slate-400">
              <span className="font-semibold text-slate-200 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Shoreem AI Engine · Ready to Generate
              </span>
              <span>100% Free Demo Mode · No API Key Needed</span>
            </div>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <button
                onClick={() => onExploreTools('captions')}
                className="p-3 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:border-indigo-500/50 hover:bg-indigo-950/20 text-left transition-all group cursor-pointer"
              >
                <FileText className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform mb-2" />
                <div className="text-xs font-semibold text-white">AI Captions</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Viral hooks & copy</div>
              </button>

              <button
                onClick={() => onExploreTools('scripts')}
                className="p-3 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:border-indigo-500/50 hover:bg-indigo-950/20 text-left transition-all group cursor-pointer"
              >
                <Video className="w-5 h-5 text-violet-400 group-hover:scale-110 transition-transform mb-2" />
                <div className="text-xs font-semibold text-white">Reel Scripts</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Shorts & cues</div>
              </button>

              <button
                onClick={() => onExploreTools('ideas')}
                className="p-3 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:border-indigo-500/50 hover:bg-indigo-950/20 text-left transition-all group cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform mb-2" />
                <div className="text-xs font-semibold text-white">Content Ideas</div>
                <div className="text-[10px] text-slate-400 mt-0.5">5 proven pillars</div>
              </button>

              <button
                onClick={() => onExploreTools('hashtags')}
                className="p-3 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:border-indigo-500/50 hover:bg-indigo-950/20 text-left transition-all group cursor-pointer"
              >
                <Hash className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform mb-2" />
                <div className="text-xs font-semibold text-white">Hashtags</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Reach matrix</div>
              </button>

              <button
                onClick={() => onExploreTools('planner')}
                className="p-3 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:border-indigo-500/50 hover:bg-indigo-950/20 text-left transition-all group cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform mb-2" />
                <div className="text-xs font-semibold text-white">30-Day Plan</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Monthly schedule</div>
              </button>

              <button
                onClick={() => onExploreTools('assistant')}
                className="p-3 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:border-indigo-500/50 hover:bg-indigo-950/20 text-left transition-all group cursor-pointer"
              >
                <Zap className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform mb-2" />
                <div className="text-xs font-semibold text-white">Marketing AI</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Strategic growth</div>
              </button>
            </div>
          </div>

          {/* Metrics bar */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-slate-800/80 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">4.8M+</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">{t.hero.statsGenerations}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400">45,000+</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">{t.hero.statsCreators}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">18 hrs/wk</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">{t.hero.statsTimeSaved}</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
