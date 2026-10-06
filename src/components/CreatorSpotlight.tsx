import React from 'react';
import { Sparkles, Quote, Globe, Award, Heart, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface CreatorSpotlightProps {
  currentLang: Language;
}

export const CreatorSpotlight: React.FC<CreatorSpotlightProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const isRTL = currentLang === 'ur' || currentLang === 'ar';

  return (
    <section className="py-20 relative overflow-hidden border-t border-b border-slate-800/80 bg-slate-950/40">
      {/* Subtle glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Left Column: Visual card with Aneela Israr Avatar & Brand Crest */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl p-1 bg-gradient-to-tr from-indigo-500 via-violet-500 to-cyan-400 shadow-2xl shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[22px] p-6 sm:p-8 flex flex-col items-center text-center">
                
                {/* Visual Avatar Crest */}
                <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-800 p-1 mb-6 shadow-xl flex items-center justify-center">
                  <div className="w-full h-full rounded-[14px] bg-slate-900 flex flex-col items-center justify-center">
                    <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-violet-200 to-cyan-200 bg-clip-text text-transparent">
                      AI
                    </span>
                    <span className="text-[9px] font-mono text-indigo-400 tracking-widest uppercase mt-0.5">
                      SHOREEM
                    </span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center shadow-md">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight">Aneela Israr</h3>
                <span className="text-xs text-indigo-400 font-semibold tracking-wider uppercase mt-1">
                  {t.creator.role}
                </span>

                <div className="w-12 h-0.5 bg-slate-800 my-4" />

                <div className="space-y-2 text-xs text-slate-300 text-left w-full">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Visionary Behind Shoreem.io</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Cross-Border Multilingual AI Pioneer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                    <span>Empowering 45,000+ Global Creators</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 w-full flex items-center justify-between text-[11px] text-slate-400">
                  <span>HQ: Global Studio</span>
                  <span className="text-indigo-400 font-semibold">Shoreem.io</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Mission Statement */}
          <div className={`lg:col-span-7 space-y-6 ${isRTL ? (currentLang === 'ur' ? 'font-urdu' : 'font-arabic') : ''}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-500/30 text-violet-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>{t.creator.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {t.creator.title}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {t.creator.description}
            </p>

            <div className="relative p-6 sm:p-7 rounded-2xl bg-slate-900/80 border border-slate-800">
              <Quote className="w-8 h-8 text-indigo-500/30 absolute top-4 right-4 pointer-events-none" />
              <p className="text-sm sm:text-base text-slate-200 italic font-medium leading-relaxed relative z-10">
                {t.creator.quote}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                <span className="text-xs font-bold text-white font-sans">Aneela Israr</span>
                <span className="text-xs text-slate-400 font-sans">· Founder, Shoreem.io</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 font-sans">
              <div>
                <span className="text-lg font-bold text-white font-mono">80+</span>
                <span className="text-xs text-slate-400 block mt-0.5">Countries Active</span>
              </div>
              <div>
                <span className="text-lg font-bold text-indigo-400 font-mono">4 Languages</span>
                <span className="text-xs text-slate-400 block mt-0.5">EN · UR · Roman · AR</span>
              </div>
              <div>
                <span className="text-lg font-bold text-cyan-400 font-mono">99.9%</span>
                <span className="text-xs text-slate-400 block mt-0.5">Uptime & Reliability</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
