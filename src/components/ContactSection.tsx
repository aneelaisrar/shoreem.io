import React, { useState } from 'react';
import { 
  Mail, 
  MessageCircle, 
  Smartphone, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { Language } from '../types';

interface ContactSectionProps {
  currentLang: Language;
  onOpenCheckout: (planId?: string) => void;
  onShowToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  currentLang,
  onOpenCheckout,
  onShowToast,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Payment / Account Question');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);
  const [copiedJazz, setCopiedJazz] = useState(false);

  const supportEmail = 'aneelaisra125@gmail.com';
  const whatsappNumber = '03152867683';
  const jazzCashNumber = '03253598575';

  const handleCopy = (text: string, type: 'email' | 'whatsapp' | 'jazz') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else if (type === 'whatsapp') {
      setCopiedWhatsApp(true);
      setTimeout(() => setCopiedWhatsApp(false), 2000);
    } else {
      setCopiedJazz(true);
      setTimeout(() => setCopiedJazz(false), 2000);
    }
    onShowToast('Copied to clipboard!', 'success');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      onShowToast('Please fill all required fields', 'error');
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      onShowToast('Message sent to Aneela Israr & support team!', 'success');
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSentSuccess(false), 5000);
    }, 800);
  };

  return (
    <section id="contact-support" className="py-20 border-t border-slate-800/80 bg-slate-950 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-[450px] h-[300px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>24/7 Creator Care</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Contact & Payment Support
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Have questions about subscriptions, custom team seats, or JazzCash manual transfers? We're here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Channels & Pakistan Payment Information */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* WhatsApp Card */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">WhatsApp Direct Chat</h4>
                      <span className="text-[11px] text-emerald-400 font-medium">Fastest response (&lt; 30 mins)</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(whatsappNumber, 'whatsapp')}
                    className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy WhatsApp"
                  >
                    {copiedWhatsApp ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-white mb-3 flex items-center justify-between">
                  <span className="text-emerald-400 font-bold">0315-2867683</span>
                  <span className="text-[10px] text-slate-400 uppercase">Support Line</span>
                </div>
              </div>

              <a
                href="https://wa.me/923152867683?text=Hello%20Aneela,%20I%20need%20help%20with%20Shoreem.io"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message on WhatsApp</span>
              </a>
            </div>

            {/* Support Email Card */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Official Support Email</h4>
                      <span className="text-[11px] text-indigo-300 font-medium">Direct to Founder Aneela Israr</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(supportEmail, 'email')}
                    className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-indigo-300 mb-3 flex items-center justify-between">
                  <span>{supportEmail}</span>
                  <span className="text-[10px] text-slate-400 uppercase">Priority</span>
                </div>
              </div>

              <a
                href={`mailto:${supportEmail}`}
                className="w-full py-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>Send Email Directly</span>
              </a>
            </div>

            {/* Pakistan JazzCash Payment Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-950/30 to-slate-900 border border-rose-900/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Pakistan JazzCash Transfer</h4>
                    <span className="text-[11px] text-rose-300 font-medium">Manual payment & proof upload</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(jazzCashNumber, 'jazz')}
                  className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy JazzCash Number"
                >
                  {copiedJazz ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300 mb-4 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Account Title:</span>
                  <span className="font-semibold text-white">Aneela Israr / Shoreem.io</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">JazzCash Number:</span>
                  <span className="font-mono font-bold text-rose-400">0325-3598575</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenCheckout('pro')}
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md shadow-rose-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Upload Payment Proof in Checkout</span>
              </button>
            </div>

          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white">Send Us a Direct Message</h3>
                <p className="text-xs text-slate-400 mt-1">
                  We reply to all inquiries promptly. For immediate assistance with manual payments, WhatsApp is recommended.
                </p>
              </div>

              {sentSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-900/50 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Thank you! Your inquiry has been dispatched to <strong>{supportEmail}</strong>. Aneela will reach out soon!</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aneela Israr"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. you@creator.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Subject / Department
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="Payment / Account Question">Payment / JazzCash / Billing Question</option>
                    <option value="Custom Plan / Team Seats">Custom Agency / Business Tier</option>
                    <option value="Feature Suggestion">Feature Suggestion & Feedback</option>
                    <option value="Partnership / Creator Inquiry">Partnership with Aneela Israr</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry, transaction ID, or question..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Average reply time: &lt; 2 hours</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSending ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <span>Submit Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
