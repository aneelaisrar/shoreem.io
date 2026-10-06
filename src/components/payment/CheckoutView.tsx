import React, { useState } from 'react';
import { 
  CreditCard, 
  Smartphone, 
  Upload, 
  CheckCircle2, 
  X, 
  ArrowLeft, 
  ShieldCheck, 
  Copy, 
  Check, 
  AlertCircle,
  FileText,
  Lock,
  MessageCircle,
  Mail
} from 'lucide-react';
import { PlanTier, PricingPlan, PaymentProof } from '../../types';

interface CheckoutViewProps {
  plan: PricingPlan;
  isYearly: boolean;
  onCancel: () => void;
  onSuccess: (details: {
    plan: PlanTier;
    billingCycle: 'monthly' | 'yearly';
    amountPaid: number;
    transactionId: string;
    customerName: string;
    customerEmail: string;
    isPendingVerification?: boolean;
  }) => void;
  onShowToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  plan,
  isYearly,
  onCancel,
  onSuccess,
  onShowToast,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'jazzcash'>('jazzcash');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(isYearly ? 'yearly' : 'monthly');
  const [copiedJazzNumber, setCopiedJazzNumber] = useState(false);

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [notes, setNotes] = useState('');
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [screenshotFileName, setScreenshotFileName] = useState<string>('');

  // Card demo fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jazzCashNumber = '03253598575';
  const supportEmail = 'aneelaisra125@gmail.com';
  const whatsappNumber = '03152867683';

  const pricePerMonth = billingCycle === 'yearly' ? plan.annualPrice : plan.monthlyPrice;
  const totalPrice = billingCycle === 'yearly' ? plan.annualPrice * 12 : plan.monthlyPrice;
  const pkrEstimate = Math.round(totalPrice * 280); // Approx PKR rate for manual payment convenience

  const handleCopyJazzNumber = () => {
    navigator.clipboard.writeText(jazzCashNumber);
    setCopiedJazzNumber(true);
    onShowToast('JazzCash details copied to clipboard!', 'success');
    setTimeout(() => setCopiedJazzNumber(false), 2000);
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        onShowToast('File size must be under 5MB', 'error');
        return;
      }
      setScreenshotFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
        onShowToast('Screenshot uploaded successfully!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleJazzCashSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      onShowToast('Please enter your full name', 'error');
      return;
    }
    if (!customerEmail.trim()) {
      onShowToast('Please enter your email address', 'error');
      return;
    }
    if (!transactionId.trim()) {
      onShowToast('Please enter your JazzCash Transaction ID (TID)', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess({
        plan: plan.id,
        billingCycle,
        amountPaid: totalPrice,
        transactionId: transactionId.trim(),
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        isPendingVerification: true,
      });
      onShowToast('Payment proof submitted! Verification in progress.', 'success');
    }, 900);
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      onShowToast('Please enter name on card', 'error');
      return;
    }
    if (!customerEmail.trim()) {
      onShowToast('Please enter your email', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess({
        plan: plan.id,
        billingCycle,
        amountPaid: totalPrice,
        transactionId: `TXN-CARD-${Date.now().toString().slice(-6)}`,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        isPendingVerification: false,
      });
      onShowToast(`Subscribed to ${plan.name} Plan successfully!`, 'success');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 text-white shadow-2xl my-8">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Return / Cancel"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Upgrade to {plan.name} Studio
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Secure Checkout
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Complete your payment to activate unlimited creator superpowers.
              </p>
            </div>
          </div>

          <button
            onClick={onCancel}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
            title="Cancel Checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Order Summary & Billing Cycle */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Order Summary
              </span>
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h4 className="text-lg font-bold text-white">{plan.name} Tier</h4>
                  <span className="text-xs text-indigo-400">{plan.credits}</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-mono text-white">${totalPrice}</span>
                  <span className="text-xs text-slate-400 block">
                    {billingCycle === 'yearly' ? '/ billed annually' : '/ billed monthly'}
                  </span>
                </div>
              </div>

              {/* Billing Cycle Switcher */}
              <div className="mt-4">
                <span className="text-xs text-slate-400 font-medium block mb-2">Billing Cadence:</span>
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <button
                    type="button"
                    onClick={() => setBillingCycle('monthly')}
                    className={`py-2 rounded-lg font-medium transition-all cursor-pointer ${
                      billingCycle === 'monthly'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Monthly (${plan.monthlyPrice}/mo)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle('yearly')}
                    className={`py-2 rounded-lg font-medium transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      billingCycle === 'yearly'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>Yearly (${plan.annualPrice}/mo)</span>
                    <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300">Save 20%</span>
                  </button>
                </div>
              </div>

              {/* Features List */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-2">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">Included in your plan:</span>
                {plan.features.slice(0, 5).map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Support guarantee badge */}
            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/40 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>100% Satisfaction & Support</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Need help or custom invoicing? Contact Aneela Israr at <a href={`mailto:${supportEmail}`} className="text-indigo-400 underline">{supportEmail}</a> or WhatsApp: <a href="https://wa.me/923152867683" target="_blank" rel="noreferrer" className="text-emerald-400 font-mono font-semibold hover:underline">0315-2867683</a>.
              </p>
            </div>
          </div>

          {/* Right Column: Payment Methods & Forms */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Payment Method Selector Tabs */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Select Payment Method
              </span>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('jazzcash')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    paymentMethod === 'jazzcash'
                      ? 'bg-rose-950/30 border-rose-500 shadow-md shadow-rose-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center shrink-0">
                    <Smartphone className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>Pakistan JazzCash</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
                        Manual
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400">Direct mobile transfer</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    paymentMethod === 'card'
                      ? 'bg-indigo-950/40 border-indigo-500 shadow-md shadow-indigo-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Credit / Debit Card</div>
                    <span className="text-[10px] text-slate-400">Instant Demo Gateway</span>
                  </div>
                </button>
              </div>
            </div>

            {/* TAB 1: JAZZCASH MANUAL PAYMENT & PROOF FORM */}
            {paymentMethod === 'jazzcash' && (
              <div className="space-y-5 animate-in fade-in">
                
                {/* JazzCash Instructions Box */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-900 border border-rose-900/60">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-rose-900/40">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-rose-400" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        JazzCash Account Details
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-rose-300 font-bold">
                      Rs. ~{pkrEstimate.toLocaleString()} PKR
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Account Title:</span>
                      <strong className="text-white font-semibold">Aneela Israr / Shoreem.io</strong>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">JazzCash Number:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-rose-400 font-mono font-bold text-sm bg-slate-950 px-2 py-0.5 rounded border border-rose-900/40">
                          {jazzCashNumber}
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyJazzNumber}
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Copy JazzCash Number"
                        >
                          {copiedJazzNumber ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 text-[11px] text-slate-300 leading-relaxed flex items-start gap-1.5">
                      <span className="text-rose-400 font-bold">Step:</span>
                      <span>Send <strong>Rs. {pkrEstimate.toLocaleString()} PKR</strong> (equivalent to ${totalPrice} USD) to the JazzCash number above and fill the confirmation form below.</span>
                    </div>
                  </div>
                </div>

                {/* Payment Proof Form */}
                <form onSubmit={handleJazzCashSubmit} className="space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Submit Payment Verification Proof
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g., Muhammad Ali / Sarah Khan"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-rose-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="e.g., creator@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      JazzCash Transaction ID (TID) *
                    </label>
                    <input
                      type="text"
                      required
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="e.g., 0394829104829 (From JazzCash SMS)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-white text-xs font-mono placeholder-slate-500 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  {/* Screenshot Upload with Live Preview */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Payment Screenshot Proof (Receipt Image)
                    </label>
                    <div className="relative border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-xl p-4 text-center bg-slate-950/60 transition-colors">
                      {screenshotPreview ? (
                        <div className="space-y-2">
                          <img
                            src={screenshotPreview}
                            alt="Payment Proof"
                            className="max-h-36 mx-auto rounded-lg object-contain border border-slate-800 shadow"
                          />
                          <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                            <span className="font-medium text-white">{screenshotFileName}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setScreenshotPreview(null);
                                setScreenshotFileName('');
                              }}
                              className="text-rose-400 hover:underline cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <label className="cursor-pointer block">
                          <Upload className="w-6 h-6 text-slate-500 mx-auto mb-1.5" />
                          <span className="text-xs text-indigo-400 font-semibold block">
                            Click to upload screenshot
                          </span>
                          <span className="text-[10px] text-slate-500 block mt-0.5">
                            PNG, JPG or JPEG up to 5MB
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleScreenshotUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-xs font-bold shadow-lg shadow-rose-600/25 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Verifying Proof...</span>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Submit Proof & Unlock {plan.name}</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={onCancel}
                      className="px-4 py-3.5 rounded-xl border border-slate-800 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: CREDIT / DEBIT CARD DEMO GATEWAY */}
            {paymentMethod === 'card' && (
              <form onSubmit={handleCardSubmit} className="space-y-4 animate-in fade-in">
                <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/40 text-xs text-indigo-200 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>256-bit SSL encrypted demo payment simulation. Instant activation.</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g., Aneela Israr"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="e.g., creator@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 •••• •••• 4242"
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-white text-xs font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                    <CreditCard className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Expires (MM/YY)
                    </label>
                    <input
                      type="text"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="12/28"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-white text-xs font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      CVC / CVV
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="•••"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-white text-xs font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Pay Button */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Processing Payment...</span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Pay ${totalPrice} & Activate {plan.name}</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-3.5 rounded-xl border border-slate-800 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
