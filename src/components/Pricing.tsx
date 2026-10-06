import React, { useState } from 'react';
import { Check, Zap, Sparkles, Shield, ArrowRight, Smartphone } from 'lucide-react';
import { Language, PlanTier, PricingPlan } from '../types';
import { translations } from '../data/translations';

interface PricingProps {
  currentLang: Language;
  activePlan: PlanTier;
  onOpenCheckout: (plan: PricingPlan, isYearly: boolean) => void;
  onShowToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const Pricing: React.FC<PricingProps> = ({
  currentLang,
  activePlan,
  onOpenCheckout,
  onShowToast,
}) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const t = translations[currentLang];

  const plans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Free',
      tagline: 'Ideal for trying out the AI engine and testing hooks.',
      monthlyPrice: 0,
      annualPrice: 0,
      credits: '100 Credits / mo',
      features: [
        'AI Caption Generator (3 styles)',
        'Basic Reel Scripts (15s format)',
        'Hashtag Generator (20 tags)',
        '30-Day Content Planner View',
        'English & Roman Urdu output',
      ],
    },
    {
      id: 'starter',
      name: 'Starter',
      tagline: 'For solo creators ready to grow their organic audience.',
      monthlyPrice: 5,
      annualPrice: 4,
      credits: '1,500 Credits / mo',
      features: [
        'Everything in Free Plan',
        'Reel Scripts (15s, 30s & 60s)',
        'Teleprompter Rehearsal Mode',
        'Full 30-Day Schedule CSV Export',
        'Urdu (اردو) & Arabic (العربية) Support',
        'Hashtag Matrix with Reach Tiers',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      tagline: 'Our most popular tier for high-velocity creators and brands.',
      monthlyPrice: 12,
      annualPrice: 10,
      popular: true,
      credits: 'Unlimited AI Generations',
      features: [
        'Everything in Starter Plan',
        'Shoreem AI Marketing Strategist',
        'Unlimited Reel & Shorts Scripts',
        'Custom Brand Tone Calibration',
        'High-Converting Hook Retention Analyzer',
        'Priority Algorithmic Updates',
        'Save Unlimited Library Assets',
      ],
    },
    {
      id: 'business',
      name: 'Business',
      tagline: 'For digital agencies, media brands, and scaling teams.',
      monthlyPrice: 29,
      annualPrice: 24,
      credits: 'Unlimited + 5 Team Seats',
      features: [
        'Everything in Pro Plan',
        '5 Team Members / Multi-Seat Workspace',
        'Full White-Label Client Exports',
        'Dedicated Campaign Launch Playbooks',
        'Custom Multilingual Voice Tuning',
        'VIP Concierge Support & Setup Call',
      ],
    },
  ];

  const handleSelectPlan = (plan: PricingPlan) => {
    if (plan.id === activePlan) {
      onShowToast(`You are already on the ${plan.name} plan!`, 'info');
      return;
    }
    onOpenCheckout(plan, isAnnual);
  };

  return (
    <section id="pricing-section" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span>Accessible Creator Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.pricing.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            {t.pricing.subtitle}
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={`text-xs font-medium ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>
              {t.pricing.monthly}
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-12 h-6 rounded-full bg-slate-800 p-0.5 transition-colors cursor-pointer"
              aria-label="Toggle annual pricing"
            >
              <div
                className={`w-5 h-5 rounded-full bg-indigo-500 shadow-md transform transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-medium flex items-center gap-1.5 ${isAnnual ? 'text-white' : 'text-slate-400'}`}>
              <span>{t.pricing.annual}</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                {t.pricing.saveDiscount}
              </span>
            </span>
          </div>

          {/* Pakistan Payment Banner */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-950/30 border border-rose-900/50 text-xs text-rose-300">
            <Smartphone className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Pakistan Creators: Direct <strong>JazzCash Manual Transfer</strong> available on all plans!</span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const isCurrent = activePlan === plan.id;
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl border transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-b from-indigo-950/40 to-slate-900/90 border-indigo-500/50 shadow-2xl shadow-indigo-500/10 scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white tracking-tight">{plan.name}</h3>
                    {isCurrent && (
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 min-h-[34px] leading-relaxed mb-6">
                    {plan.tagline}
                  </p>

                  {/* Price display */}
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-extrabold text-white font-mono">${price}</span>
                    <span className="text-xs text-slate-400">/ month</span>
                  </div>
                  <div className="text-[11px] text-indigo-400 font-semibold mb-6">
                    {plan.credits}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 pt-6 border-t border-slate-800/80 mb-8">
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan Button */}
                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isCurrent
                      ? 'bg-slate-800 text-slate-300 cursor-default'
                      : plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  <span>{isCurrent ? t.pricing.currentPlan : `Upgrade to ${plan.name}`}</span>
                  {!isCurrent && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            );
          })}
        </div>

        {/* Guarantee footer */}
        <div className="mt-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>{t.pricing.guarantee}</span>
        </div>
      </div>
    </section>
  );
};
