import React from 'react';
import { CheckCircle2, Download, ArrowRight, MessageCircle, Mail, Sparkles, FileText, Clock } from 'lucide-react';
import { PlanTier, SubscriptionStatus } from '../../types';
import { exportContent } from '../../utils/exportUtils';

interface PaymentSuccessViewProps {
  subscription: SubscriptionStatus;
  onContinue: () => void;
  onShowToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const PaymentSuccessView: React.FC<PaymentSuccessViewProps> = ({
  subscription,
  onContinue,
  onShowToast,
}) => {
  const isPending = subscription.status === 'pending_verification';

  const handleDownloadReceipt = (format: 'txt' | 'pdf') => {
    const receiptContent = `=====================================================
SHOREEM.IO - OFFICIAL PAYMENT RECEIPT
=====================================================
Order Ref: ${subscription.transactionId || 'SHOREEM-' + Date.now()}
Date: ${new Date().toLocaleDateString()}
Customer Name: ${subscription.customerName || 'Valued Creator'}
Customer Email: ${subscription.customerEmail || 'creator@shoreem.io'}

PLAN DETAILS:
Tier: Shoreem ${subscription.plan.toUpperCase()} Plan
Billing Cadence: ${subscription.billingCycle.toUpperCase()}
Amount: $${subscription.amountPaid} USD
Status: ${subscription.status === 'pending_verification' ? 'JazzCash Verification in Progress' : 'Active & Verified'}
Renews On: ${subscription.renewsAt}

SUPPORT CONTACTS:
WhatsApp: 0315-2867683
Support Email: aneelaisra125@gmail.com
Founder: Aneela Israr
=====================================================
Thank you for powering your content with Shoreem.io!
`;

    exportContent(
      `Shoreem_Receipt_${subscription.plan}_${subscription.transactionId || Date.now()}`,
      receiptContent,
      format,
      {
        type: 'Payment Receipt',
        platform: 'Shoreem.io Billing',
      }
    );
    onShowToast(`Receipt downloaded as .${format.toUpperCase()}`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 text-white shadow-2xl text-center my-8">
        
        {/* Success Icon */}
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl ${
          isPending
            ? 'bg-amber-950/60 border border-amber-800/50 text-amber-400'
            : 'bg-emerald-950/60 border border-emerald-800/50 text-emerald-400'
        }`}>
          {isPending ? (
            <Clock className="w-8 h-8 animate-pulse" />
          ) : (
            <CheckCircle2 className="w-8 h-8" />
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
          {isPending ? 'Proof Submitted for Verification' : 'Payment Confirmed!'}
        </h2>

        <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto mb-6 leading-relaxed">
          {isPending
            ? 'Your JazzCash transfer proof has been logged. Our billing team will verify the Transaction ID and activate your full quota within 15-30 minutes.'
            : `Your subscription to Shoreem ${subscription.plan.toUpperCase()} is now fully active. Enjoy unlimited viral creations!`}
        </p>

        {/* Receipt Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-2.5 mb-6 text-xs font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
            <span>Transaction ID:</span>
            <span className="font-mono text-white font-bold">{subscription.transactionId}</span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
            <span className="text-slate-400">Plan Activated:</span>
            <span className="capitalize font-bold text-indigo-400">
              Shoreem {subscription.plan} ({subscription.billingCycle})
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
            <span className="text-slate-400">Amount Paid:</span>
            <span className="font-bold text-white font-mono">${subscription.amountPaid} USD</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-slate-400">Customer:</span>
            <span className="text-slate-200">{subscription.customerName || subscription.customerEmail}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onContinue}
            className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Launch Creator Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDownloadReceipt('pdf')}
              className="flex-1 py-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>Download Receipt (PDF)</span>
            </button>

            <button
              onClick={() => handleDownloadReceipt('txt')}
              className="px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
              title="Download as TXT"
            >
              <FileText className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Support hint */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-center gap-4">
          <a
            href="https://wa.me/923152867683?text=Hello%20Aneela,%20I%20subscribed%20to%20Shoreem.io"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-400 flex items-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp (0315-2867683)</span>
          </a>
          <span>·</span>
          <a
            href="mailto:aneelaisra125@gmail.com"
            className="hover:text-indigo-400 flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5 text-indigo-400" />
            <span>aneelaisra125@gmail.com</span>
          </a>
        </div>

      </div>
    </div>
  );
};
