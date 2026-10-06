import React from 'react';
import { Star, MessageSquareQuote } from 'lucide-react';
import { Language } from '../types';

interface TestimonialsProps {
  currentLang: Language;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ currentLang }) => {
  const testimonials = [
    {
      name: 'Tariq Mansoor',
      role: 'E-commerce Founder & TikTok Creator',
      location: 'Dubai, UAE',
      stars: 5,
      comment:
        'Shoreem’s Arabic and English scripts helped us expand our DTC brand across the GCC in just 60 days. The hook retention breakdown is genuinely better than agencies charging $5k/month.',
    },
    {
      name: 'Elena Rostova',
      role: 'Growth Marketer & Tech Influencer',
      location: 'San Francisco, USA',
      stars: 5,
      comment:
        'The 30-Day Content Planner saved my sanity. I used to stare at Notion for 4 hours every Sunday. With Shoreem.io, I batch our entire month’s reel scripts and captions in under 45 minutes.',
    },
    {
      name: 'Zainab Qureshi',
      role: 'Content Creator & Educator',
      location: 'Lahore, Pakistan',
      stars: 5,
      comment:
        'Having native Roman Urdu and authentic Urdu support alongside English is a massive game-changer for South Asian creators. Aneela Israr has created something extraordinary with Shoreem.',
    },
    {
      name: 'Marcus Vance',
      role: 'SaaS Founder',
      location: 'London, UK',
      stars: 5,
      comment:
        'The Hashtag Reach Matrix and Marketing Strategist assistant give us the exact blueprints we need. No fluff, no broken generic AI slop—just high-converting execution.',
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5 text-cyan-400" />
            <span>Real Creator Results</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Loved by 45,000+ Creators Worldwide
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            See how solo creators, digital brands, and high-growth agencies leverage Shoreem.io daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <div className="font-bold text-xs text-white">{item.name}</div>
                <div className="text-[11px] text-slate-400">{item.role}</div>
                <div className="text-[10px] text-indigo-400 font-mono mt-0.5">{item.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
