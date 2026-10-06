import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Video, 
  Sparkles, 
  Hash, 
  Calendar, 
  Zap, 
  LayoutDashboard, 
  Layers
} from 'lucide-react';
import { Language, ToolType, PlanTier, SavedItem, HistoryItem, PricingPlan, SubscriptionStatus, PaymentState } from './types';
import { translations } from './data/translations';
import { analyzeContent } from './utils/analysisUtils';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CaptionGenerator } from './components/tools/CaptionGenerator';
import { ScriptGenerator } from './components/tools/ScriptGenerator';
import { IdeaGenerator } from './components/tools/IdeaGenerator';
import { HashtagGenerator } from './components/tools/HashtagGenerator';
import { ContentPlanner } from './components/tools/ContentPlanner';
import { MarketingAssistant } from './components/tools/MarketingAssistant';
import { Dashboard } from './components/Dashboard';
import { Pricing } from './components/Pricing';
import { CreatorSpotlight } from './components/CreatorSpotlight';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { CheckoutView } from './components/payment/CheckoutView';
import { PaymentSuccessView } from './components/payment/PaymentSuccessView';
import { PaymentCancelledView } from './components/payment/PaymentCancelledView';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeTool, setActiveTool] = useState<ToolType>('captions');
  const [activePlan, setActivePlan] = useState<PlanTier>('starter');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Subscription status
  const [subscription, setSubscription] = useState<SubscriptionStatus>({
    plan: 'starter',
    billingCycle: 'monthly',
    status: 'active',
    renewsAt: 'In 30 days',
    amountPaid: 5,
    customerName: 'Creator Studio User',
    customerEmail: 'creator@shoreem.io',
    transactionId: 'TXN-INIT-88421',
  });

  // Payment views state
  const [paymentState, setPaymentState] = useState<PaymentState>('idle');
  const [checkoutPlan, setCheckoutPlan] = useState<PricingPlan | null>(null);
  const [checkoutIsYearly, setCheckoutIsYearly] = useState(false);

  // Initial starter saved items in library
  const [savedItems, setSavedItems] = useState<SavedItem[]>([
    {
      id: 'saved-1',
      type: 'captions',
      title: 'INSTAGRAM: The Storyteller (High Retention)',
      content: 'Most people approach content completely backwards. Here is what shifted everything for us...\n\nFocus on signal over noise. The results speak for themselves.',
      platform: 'instagram',
      createdAt: 'Today at 09:15',
      tags: ['#ContentStrategy', '#CreatorEconomy'],
    },
    {
      id: 'saved-2',
      type: 'scripts',
      title: 'Viral Reel Production Script: 3 Productivity Systems',
      content: '0:00 - 0:03: Hook snap-zoom: "Stop scrolling if you are still doing this manually!"\n0:03 - 0:13: Fast montage of digital dashboards.\n0:13 - 0:24: 3 clear action steps.\n0:24 - 0:30: Comment "GROW" for checklist.',
      platform: 'instagram',
      createdAt: 'Yesterday',
      tags: ['#reelscript', '#30s'],
    },
  ]);

  // Content Generation History Log
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>(() => [
    {
      id: 'hist-1',
      type: 'captions',
      title: 'INSTAGRAM: Luxury Minimalist Watch Collection',
      content: 'Most people approach digital growth completely backwards. Here is what shifted everything for us...\n\n1. Solve visceral friction before presenting a solution.\n2. Cut out 40% fluff.\n3. Build scalable retention loops.\n\nSave this for your next session! 👇\n#DigitalGrowth #CreatorEconomy',
      platform: 'instagram',
      createdAt: '10 mins ago',
      tags: ['#DigitalGrowth', '#CreatorEconomy'],
      analysis: analyzeContent(
        'Most people approach digital growth completely backwards. Here is what shifted everything for us...\n\n1. Solve visceral friction before presenting a solution.\n2. Cut out 40% fluff.\n3. Build scalable retention loops.\n\nSave this for your next session! 👇\n#DigitalGrowth #CreatorEconomy',
        'Luxury Minimalist Watch Collection'
      ),
    },
    {
      id: 'hist-2',
      type: 'scripts',
      title: 'Viral Reel Production Script: 3 Productivity Systems',
      content: '0:00 - 0:03: Hook snap-zoom: "Stop scrolling if you are still doing this manually!"\n0:03 - 0:13: Fast montage of digital dashboards.\n0:13 - 0:24: 3 clear action steps.\n0:24 - 0:30: Comment "GROW" for checklist.',
      platform: 'instagram',
      createdAt: '1 hour ago',
      tags: ['#reelscript', '#productivity'],
      analysis: analyzeContent(
        '0:00 - 0:03: Hook snap-zoom: "Stop scrolling if you are still doing this manually!"\n0:03 - 0:13: Fast montage of digital dashboards.\n0:13 - 0:24: 3 clear action steps.\n0:24 - 0:30: Comment "GROW" for checklist.',
        'Viral Reel Production Script'
      ),
    },
    {
      id: 'hist-3',
      type: 'ideas',
      title: '5 Brutal Truths About E-commerce Nobody Tells Beginners',
      content: 'Format: Reel/Short\nHook: If I had to restart from zero tomorrow with no followers and no budget, here is day 1 to day 30...\nEngagement Score: 97%\nPillar: Authority & Hard Truths',
      tags: ['#viral-idea', '#ecommerce'],
      createdAt: '3 hours ago',
      analysis: analyzeContent(
        'Format: Reel/Short\nHook: If I had to restart from zero tomorrow with no followers and no budget, here is day 1 to day 30...\nEngagement Score: 97%\nPillar: Authority & Hard Truths',
        '5 Brutal Truths About E-commerce'
      ),
    },
  ]);

  // Adjust document dir and title when language shifts
  useEffect(() => {
    const isRTL = currentLang === 'ur' || currentLang === 'ar';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang === 'ur-roman' ? 'en' : currentLang;
  }, [currentLang]);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSaveItem = (item: Omit<SavedItem, 'id' | 'createdAt'>) => {
    const newItem: SavedItem = {
      ...item,
      id: `saved-${Date.now()}`,
      createdAt: 'Just now',
    };
    setSavedItems((prev) => [newItem, ...prev]);
    showToast(`"${item.title.slice(0, 30)}..." saved to Studio Library!`, 'success');
  };

  const handleDeleteItem = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from Library', 'info');
  };

  const handleAddToHistory = (item: Omit<HistoryItem, 'id' | 'createdAt'>) => {
    const newHist: HistoryItem = {
      ...item,
      id: `hist-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: 'Just now',
      analysis: item.analysis || analyzeContent(item.content, item.title),
    };
    setHistoryItems((prev) => [newHist, ...prev]);
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistoryItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Removed from history log', 'info');
  };

  const handleClearHistory = () => {
    setHistoryItems([]);
    showToast('All content history cleared!', 'info');
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreTools = (toolName?: string) => {
    if (toolName) {
      if (toolName === 'planner') {
        handleNavigateSection('content-planner');
        return;
      }
      if (toolName === 'assistant') {
        handleNavigateSection('marketing-assistant');
        return;
      }
      setActiveTool(toolName as ToolType);
    }
    handleNavigateSection('tools-suite');
  };

  // Checkout handlers
  const handleOpenCheckout = (plan: PricingPlan, isYearly: boolean) => {
    setCheckoutPlan(plan);
    setCheckoutIsYearly(isYearly);
    setPaymentState('checkout');
  };

  const handlePaymentSuccess = (details: {
    plan: PlanTier;
    billingCycle: 'monthly' | 'yearly';
    amountPaid: number;
    transactionId: string;
    customerName: string;
    customerEmail: string;
    isPendingVerification?: boolean;
  }) => {
    const nextSub: SubscriptionStatus = {
      plan: details.plan,
      billingCycle: details.billingCycle,
      status: details.isPendingVerification ? 'pending_verification' : 'active',
      renewsAt: details.billingCycle === 'yearly' ? 'In 1 Year' : 'In 30 Days',
      amountPaid: details.amountPaid,
      transactionId: details.transactionId,
      customerName: details.customerName,
      customerEmail: details.customerEmail,
    };
    setSubscription(nextSub);
    setActivePlan(details.plan);
    setPaymentState('success');
  };

  const handlePaymentCancel = () => {
    setPaymentState('cancelled');
  };

  const handleRetryCheckout = () => {
    if (checkoutPlan) {
      setPaymentState('checkout');
    } else {
      setPaymentState('idle');
      handleNavigateSection('pricing-section');
    }
  };

  const handleReturnHome = () => {
    setPaymentState('idle');
    handleNavigateSection('hero');
  };

  const t = translations[currentLang];
  const isRTL = currentLang === 'ur' || currentLang === 'ar';

  const toolTabs: { id: ToolType; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'captions', label: t.toolsNav.captions, icon: <FileText className="w-4 h-4" />, color: 'indigo' },
    { id: 'scripts', label: t.toolsNav.scripts, icon: <Video className="w-4 h-4" />, color: 'violet' },
    { id: 'ideas', label: t.toolsNav.ideas, icon: <Sparkles className="w-4 h-4" />, color: 'amber' },
    { id: 'hashtags', label: t.toolsNav.hashtags, icon: <Hash className="w-4 h-4" />, color: 'pink' },
  ];

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans ${isRTL ? (currentLang === 'ur' ? 'font-urdu' : 'font-arabic') : ''}`}>
      {/* Toast Alert System */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Global Navigation Bar */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        activePlan={activePlan}
        onOpenPricing={() => handleNavigateSection('pricing-section')}
        onNavigateSection={handleNavigateSection}
        savedCount={savedItems.length}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          currentLang={currentLang}
          onExploreTools={handleExploreTools}
          onOpenPlanner={() => handleNavigateSection('content-planner')}
        />

        {/* AI Tools Suite Section */}
        <section id="tools-suite" className="py-16 sm:py-24 border-t border-slate-800/80 bg-slate-950/80 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Suite Header */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>AI Creation Engines</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Everything You Need to Create at Scale
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-400">
                Switch between specialized creation engines below to generate captions, reel scripts, ideas, or hashtags.
              </p>
            </div>

            {/* Segmented Tool Tabs Navigation */}
            <div className="flex items-center justify-center mb-10">
              <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl max-w-full">
                {toolTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTool(tab.id)}
                    className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      activeTool === tab.id
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Tool View */}
            <div className="animate-in fade-in duration-300">
              {activeTool === 'captions' && (
                <CaptionGenerator
                  currentLang={currentLang}
                  onSaveItem={handleSaveItem}
                  onAddToHistory={handleAddToHistory}
                  onShowToast={showToast}
                />
              )}
              {activeTool === 'scripts' && (
                <ScriptGenerator
                  currentLang={currentLang}
                  onSaveItem={handleSaveItem}
                  onAddToHistory={handleAddToHistory}
                  onShowToast={showToast}
                />
              )}
              {activeTool === 'ideas' && (
                <IdeaGenerator
                  currentLang={currentLang}
                  onSaveItem={handleSaveItem}
                  onAddToHistory={handleAddToHistory}
                  onShowToast={showToast}
                />
              )}
              {activeTool === 'hashtags' && (
                <HashtagGenerator
                  currentLang={currentLang}
                  onSaveItem={handleSaveItem}
                  onAddToHistory={handleAddToHistory}
                  onShowToast={showToast}
                />
              )}
            </div>
          </div>
        </section>

        {/* 30-Day Content Planner Section */}
        <section className="py-20 border-t border-slate-800/80 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentPlanner
              currentLang={currentLang}
              onShowToast={showToast}
            />
          </div>
        </section>

        {/* AI Marketing Assistant Section */}
        <section className="py-20 border-t border-slate-800/80 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MarketingAssistant
              currentLang={currentLang}
              onShowToast={showToast}
            />
          </div>
        </section>

        {/* Creator Studio Dashboard Section */}
        <section className="py-20 border-t border-slate-800/80 bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Dashboard
              currentLang={currentLang}
              savedItems={savedItems}
              historyItems={historyItems}
              subscription={subscription}
              onDeleteItem={handleDeleteItem}
              onDeleteHistoryItem={handleDeleteHistoryItem}
              onClearHistory={handleClearHistory}
              onNavigateTool={(tool) => {
                setActiveTool(tool);
                handleNavigateSection('tools-suite');
              }}
              activePlan={activePlan}
              onOpenPricing={() => handleNavigateSection('pricing-section')}
              onShowToast={showToast}
            />
          </div>
        </section>

        {/* Creator Spotlight: Aneela Israr */}
        <CreatorSpotlight currentLang={currentLang} />

        {/* Social Proof & Testimonials */}
        <Testimonials currentLang={currentLang} />

        {/* Transparent SaaS Pricing ($0, $5, $12, $29) */}
        <Pricing
          currentLang={currentLang}
          activePlan={activePlan}
          onOpenCheckout={handleOpenCheckout}
          onShowToast={showToast}
        />

        {/* Professional Contact & Payment Support Section */}
        <ContactSection
          currentLang={currentLang}
          onOpenCheckout={() => {
            const starterPlan: PricingPlan = {
              id: 'pro',
              name: 'Pro',
              tagline: 'Most popular tier for creators',
              monthlyPrice: 12,
              annualPrice: 10,
              credits: 'Unlimited AI Generations',
              features: ['AI Captions', 'Reel Scripts', '30-Day Planner', 'Hashtags'],
            };
            handleOpenCheckout(starterPlan, false);
          }}
          onShowToast={showToast}
        />

        {/* Frequently Asked Questions */}
        <FAQ currentLang={currentLang} />
      </main>

      {/* Global Footer */}
      <Footer
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onNavigateSection={handleNavigateSection}
        onNavigateTool={(tool) => {
          setActiveTool(tool);
          handleNavigateSection('tools-suite');
        }}
      />

      {/* Checkout Page View Overlay */}
      {paymentState === 'checkout' && checkoutPlan && (
        <CheckoutView
          plan={checkoutPlan}
          isYearly={checkoutIsYearly}
          onCancel={handlePaymentCancel}
          onSuccess={handlePaymentSuccess}
          onShowToast={showToast}
        />
      )}

      {/* Payment Success Page View Overlay */}
      {paymentState === 'success' && (
        <PaymentSuccessView
          subscription={subscription}
          onContinue={() => {
            setPaymentState('idle');
            handleNavigateSection('creator-dashboard');
          }}
          onShowToast={showToast}
        />
      )}

      {/* Payment Cancelled Page View Overlay */}
      {paymentState === 'cancelled' && (
        <PaymentCancelledView
          onRetry={handleRetryCheckout}
          onReturnHome={handleReturnHome}
        />
      )}
    </div>
  );
}
