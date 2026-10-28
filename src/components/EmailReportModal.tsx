import React, { useState } from 'react';
import { Mail, CheckCircle, RefreshCw, X, Sparkles, Send } from 'lucide-react';

interface EmailReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportTitle: string;
  reportContent?: string;
  content?: string;
  reportType?: string;
  chartData?: any;
}

export const EmailReportModal: React.FC<EmailReportModalProps> = ({
  isOpen,
  onClose,
  reportTitle,
  reportContent,
  content,
  reportType = 'Celestial Report',
  chartData,
}) => {
  const actualContent = content || reportContent || '';
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    fetch('/api/email/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        toEmail: email,
        title: reportTitle,
        content: actualContent,
        reportType,
        chartData,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to dispatch email.');
        }
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Error transmitting email via SMTP.');
        setLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#0d101d] border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-amber-300">
            <Mail className="w-4 h-4" />
            <h3 className="text-sm font-serif font-bold text-slate-100">
              Email Celestial Report
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer rounded hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        {success ? (
          <div className="py-6 text-center space-y-3">
            <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-base font-serif font-bold text-slate-100">
              Celestial Dispatch Transmitted!
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Your report <strong className="text-amber-300 font-medium">"{reportTitle}"</strong> has been sent to <span className="font-mono text-slate-200">{email}</span>.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSendEmail} className="space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Receive a beautifully formatted copy of your <strong className="text-amber-300">{reportTitle}</strong> with celestial aspects and planetary placements.
            </p>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                Recipient Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seeker@example.com"
                required
                className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-300 text-xs">
                {error}
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-xs font-semibold tracking-wide uppercase text-amber-950 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-sm disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Report</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
