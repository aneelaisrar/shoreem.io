import React from 'react';
import { XCircle, RefreshCw, Home, MessageCircle, Mail, ArrowLeft, ShieldAlert } from 'lucide-react';

interface PaymentCancelledViewProps {
  onRetry: () => void;
  onReturnHome: () => void;
}

export const PaymentCancelledView: React.FC<PaymentCancelledViewProps> = ({
  onRetry,
  onReturnHome,
}) => {
  const supportEmail = 'aneelaisra125@gmail.com';
  const whatsappNumber = '03152867683';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-md bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 text-white shadow-2xl text-center my-8">
        
        {/* Cancelled Icon */}
        <div className="w-16 h-16 rounded-2xl bg-rose-950/60 border border-rose-800/50 flex items-center justify-center mx-auto mb-6 text-rose-400 shadow-xl">
          <XCircle className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
          Payment Cancelled
        </h2>

        <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
          Your checkout process was cancelled or not completed. No charges were made to your account.
        </p>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs text-slate-300 space-y-2 mb-6">
          <div className="flex items-center gap-2 text-slate-200 font-semibold">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Need assistance with JazzCash or Card?</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            If you experienced an issue with JazzCash transfer or your card, our founder Aneela Israr is available on WhatsApp to assist you manually.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onRetry}
            className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Checkout Again</span>
          </button>

          <button
            onClick={onReturnHome}
            className="w-full py-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Studio Home</span>
          </button>
        </div>

        {/* Contacts */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400 space-y-2">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Direct Creator Support
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs">
            <a
              href="https://wa.me/923152867683?text=Hello%20Aneela,%20I%20had%20an%20issue%20with%20Shoreem.io%20payment"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-400 flex items-center gap-1.5 text-slate-300"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: 0315-2867683</span>
            </a>
            <span className="hidden sm:inline">·</span>
            <a
              href={`mailto:${supportEmail}`}
              className="hover:text-indigo-400 flex items-center gap-1.5 text-slate-300"
            >
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              <span>{supportEmail}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
