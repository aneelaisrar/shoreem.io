import React from 'react';
import { Sparkles, Globe, Heart } from 'lucide-react';
import { Language, ToolType } from '../types';

interface FooterProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateSection: (sectionId: string) => void;
  onNavigateTool: (tool: ToolType) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onLanguageChange,
  onNavigateSection,
  onNavigateTool,
}) => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Shoreem<span className="text-indigo-400">.io</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Create Smarter. Grow Faster. The global AI creator studio for viral captions, reel scripts, high-reach hashtags, 30-day planners, and multilingual marketing.
            </p>

            <div className="pt-2 text-xs text-slate-300 flex items-center gap-1.5">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>by</span>
              <strong className="text-white font-semibold">Aneela Israr</strong>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <div>WhatsApp: <a href="https://wa.me/923152867683" target="_blank" rel="noreferrer" className="text-emerald-400 font-mono hover:underline">0315-2867683</a></div>
              <div>JazzCash: <span className="text-rose-400 font-mono">0325-3598575</span></div>
              <div>Email: <a href="mailto:aneelaisra125@gmail.com" className="text-indigo-400 hover:underline">aneelaisra125@gmail.com</a></div>
            </div>
          </div>

          {/* AI Tools Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">AI Studio Tools</div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateTool('captions')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  AI Caption Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTool('scripts')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Reel & Shorts Scripts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTool('ideas')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Content Ideas Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTool('hashtags')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Hashtag Reach Matrix
                </button>
              </li>
            </ul>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Platform & Support</div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateSection('content-planner')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  30-Day Content Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('marketing-assistant')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  AI Marketing Assistant
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('creator-dashboard')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Creator Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('pricing-section')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pricing & Plans
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('contact-support')}
                  className="hover:text-emerald-400 text-emerald-400 font-medium transition-colors cursor-pointer text-left"
                >
                  Contact & JazzCash Support
                </button>
              </li>
            </ul>
          </div>

          {/* Multilingual Selector */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>Languages</span>
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onLanguageChange('en')}
                  className={`hover:text-white transition-colors cursor-pointer text-left ${
                    currentLang === 'en' ? 'text-indigo-400 font-bold' : ''
                  }`}
                >
                  English (Global)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onLanguageChange('ur')}
                  className={`hover:text-white transition-colors cursor-pointer text-left font-urdu ${
                    currentLang === 'ur' ? 'text-indigo-400 font-bold' : ''
                  }`}
                >
                  اردو (Urdu)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onLanguageChange('ur-roman')}
                  className={`hover:text-white transition-colors cursor-pointer text-left ${
                    currentLang === 'ur-roman' ? 'text-indigo-400 font-bold' : ''
                  }`}
                >
                  Roman Urdu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onLanguageChange('ar')}
                  className={`hover:text-white transition-colors cursor-pointer text-left font-arabic ${
                    currentLang === 'ar' ? 'text-cyan-400 font-bold' : ''
                  }`}
                >
                  العربية (Arabic)
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} <span className="text-slate-300 font-medium">Shoreem.io</span>. All rights reserved. Founded by <span className="text-slate-300 font-medium">Aneela Israr</span>.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">Creator Agreement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
