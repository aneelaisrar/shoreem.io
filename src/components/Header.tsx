import React, { useState } from 'react';
import { Sparkles, Globe, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { Language, PlanTier } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activePlan: PlanTier;
  onOpenPricing: () => void;
  onNavigateSection: (sectionId: string) => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  activePlan,
  onOpenPricing,
  onNavigateSection,
  savedCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const t = translations[currentLang];
  const isRTL = currentLang === 'ur' || currentLang === 'ar';

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: 'US' },
    { code: 'ur', label: 'اردو', flag: 'PK' },
    { code: 'ur-roman', label: 'Roman Urdu', flag: 'PK' },
    { code: 'ar', label: 'العربية', flag: 'SA' },
  ];

  const currentLangLabel = languages.find((l) => l.code === currentLang)?.label || 'English';

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-20 ${isRTL ? 'flex-row-reverse' : ''}`}>
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('hero')}>
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  Shoreem<span className="text-indigo-400 font-extrabold">.io</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  AI Studio
                </span>
              </div>
              <span className="text-[11px] text-slate-400 tracking-tight font-medium hidden md:block">
                Create Smarter. Grow Faster.
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button
              onClick={() => handleNavClick('tools-suite')}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              {t.nav.tools}
            </button>
            <button
              onClick={() => handleNavClick('content-planner')}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              {t.nav.planner}
            </button>
            <button
              onClick={() => handleNavClick('marketing-assistant')}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              {t.nav.assistant}
            </button>
            <button
              onClick={() => handleNavClick('pricing-section')}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              {t.nav.pricing}
            </button>
            <button
              onClick={() => handleNavClick('contact-support')}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              Support
            </button>
            <button
              onClick={() => handleNavClick('creator-dashboard')}
              className="hover:text-white transition-colors cursor-pointer py-1 flex items-center gap-1.5"
            >
              <span>{t.nav.dashboard}</span>
              {savedCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              )}
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-800 bg-slate-900/90 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
                aria-label="Change language"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>{currentLangLabel}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-800 bg-slate-900 shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select Language
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                        currentLang === lang.code
                          ? 'bg-indigo-600/20 text-indigo-300 font-semibold'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span className={lang.code === 'ur' ? 'font-urdu' : lang.code === 'ar' ? 'font-arabic' : ''}>
                        {lang.label}
                      </span>
                      {currentLang === lang.code && (
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Plan indicator */}
            <button
              onClick={onOpenPricing}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white transition-all cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="capitalize">{activePlan} Plan</span>
            </button>

            {/* Launch CTA */}
            <button
              onClick={() => handleNavClick('tools-suite')}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>{t.nav.launchStudio}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-800/80 bg-slate-950/95 space-y-3">
            <div className="flex flex-col space-y-2 text-sm font-medium text-slate-300 px-2">
              <button
                onClick={() => handleNavClick('tools-suite')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-900 hover:text-white"
              >
                {t.nav.tools}
              </button>
              <button
                onClick={() => handleNavClick('content-planner')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-900 hover:text-white"
              >
                {t.nav.planner}
              </button>
              <button
                onClick={() => handleNavClick('marketing-assistant')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-900 hover:text-white"
              >
                {t.nav.assistant}
              </button>
              <button
                onClick={() => handleNavClick('creator-dashboard')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-900 hover:text-white"
              >
                {t.nav.dashboard}
              </button>
              <button
                onClick={() => handleNavClick('pricing-section')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-900 hover:text-white"
              >
                {t.nav.pricing}
              </button>
              <button
                onClick={() => handleNavClick('contact-support')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-900 hover:text-white"
              >
                Support & Payments
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800/80 px-2 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('tools-suite')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
              >
                <span>{t.nav.launchStudio}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
