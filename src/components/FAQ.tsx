import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Language } from '../types';

interface FAQProps {
  currentLang: Language;
}

export const FAQ: React.FC<FAQProps> = ({ currentLang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is Shoreem.io and who is it designed for?',
      a: 'Shoreem.io is a global AI content and marketing SaaS platform designed for content creators, social media managers, DTC brands, and digital entrepreneurs. It provides viral caption generators, reel and shorts production scripts, hashtag reach matrices, a 30-day content planner, and an AI marketing strategist.',
    },
    {
      q: 'Do I need to connect an external API key to use Shoreem.io?',
      a: 'No! Shoreem.io runs immediately with zero configuration and zero external API keys needed. You can start creating captions, video scripts, hashtag sets, and 30-day content schedules right away with demo AI intelligence.',
    },
    {
      q: 'How does multilingual support work in Shoreem.io?',
      a: 'Shoreem.io natively supports English, Urdu (اردو), Roman Urdu, and Arabic (العربية). You can generate captions and video scripts in any of these languages with authentic cultural phrasing and right-to-left (RTL) formatting support.',
    },
    {
      q: 'Can I export the 30-Day Content Calendar to my scheduling tools?',
      a: 'Yes! You can export the entire 30-day content schedule with hooks, captions, platforms, and hashtag sets into a standard .CSV file with a single click, ready for Buffer, Hootsuite, Notion, or Google Sheets.',
    },
    {
      q: 'Who is the creator behind Shoreem.io?',
      a: 'Shoreem.io was conceptualized, designed, and spearheaded by Aneela Israr to empower creators and cross-border businesses globally with modern creative leverage.',
    },
    {
      q: 'Can I test out the different pricing plans?',
      a: 'Absolutely. You can explore the Free, Starter, Pro, and Business tiers in the Pricing section with our interactive demo upgrade flow without entering any real credit card details.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Everything you need to know about Shoreem.io and our creator tools.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-indigo-300 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transform transition-transform ${
                    openIndex === idx ? 'rotate-180 text-indigo-400' : ''
                  }`}
                />
              </button>

              {openIndex === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
