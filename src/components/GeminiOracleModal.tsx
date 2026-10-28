import React, { useState } from 'react';
import { Sparkles, X, Send, RefreshCw, Compass, Moon, ShieldCheck, Mail } from 'lucide-react';
import { EmailReportModal } from './EmailReportModal.tsx';

interface GeminiOracleModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSign?: string;
  defaultQuestion?: string;
}

export const GeminiOracleModal: React.FC<GeminiOracleModalProps> = ({
  isOpen,
  onClose,
  defaultSign = 'Aries',
  defaultQuestion = '',
}) => {
  const [question, setQuestion] = useState<string>(defaultQuestion);
  const [sign, setSign] = useState<string>(defaultSign);
  const [focusArea, setFocusArea] = useState<string>('Life Path & Purpose');
  const [reading, setReading] = useState<string | null>(null);
  const [influences, setInfluences] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState<boolean>(false);

  React.useEffect(() => {
    if (defaultQuestion) setQuestion(defaultQuestion);
    if (defaultSign) setSign(defaultSign);
  }, [defaultQuestion, defaultSign]);

  if (!isOpen) return null;

  const handleAskOracle = (customQuery?: string) => {
    const q = customQuery || question;
    if (!q.trim()) return;

    setLoading(true);
    setError(null);

    fetch('/api/gemini/reading', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: q,
        sign,
        focusArea,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.reading) {
          setReading(data.reading);
          setInfluences(data.astrologicalInfluences || []);
        } else if (data.fallback) {
          setReading(data.fallback);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Oracle request failed:', err);
        setError('The astrological oracle is momentarily meditating. Please try again.');
        setLoading(false);
      });
  };

  const sampleQuestions = [
    'What does Saturn transiting my 10th house signify for my career?',
    'How can I best harness the current Taurus Sun and Cancer Moon alignments?',
    'What karmic growth edge is revealed by my North Node placement?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#0d101d] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-400/10 text-amber-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-slate-100">
                AstroVerse Astrological Oracle
              </h3>
              <p className="text-[11px] text-slate-400">
                Powered by Gemini 3.8 Flash & Classical Ephemeris Synthesis
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Controls: Sign & Focus Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 uppercase tracking-wider mb-1">
                Your Primary Sign
              </label>
              <select
                value={sign}
                onChange={(e) => setSign(e.target.value)}
                className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-400"
              >
                {['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 uppercase tracking-wider mb-1">
                Dimension of Focus
              </label>
              <select
                value={focusArea}
                onChange={(e) => setFocusArea(e.target.value)}
                className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="Life Path & Purpose">Life Path & Calling</option>
                <option value="Love & Synastry">Love & Relationships</option>
                <option value="Career & Abundance">Career & Ambition</option>
                <option value="Spiritual & Karmic Transits">Spiritual & Karmic Transits</option>
              </select>
            </div>
          </div>

          {/* Question Input */}
          <div className="space-y-2">
            <label className="block text-[11px] text-slate-400 uppercase tracking-wider">
              Ask your astrological inquiry:
            </label>
            <div className="relative">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={3}
                placeholder="Ask about a transit, planetary aspect, or guidance on your birth chart..."
                className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-3 text-xs focus:outline-none focus:border-amber-400 pr-12"
              />
              <button
                onClick={() => handleAskOracle()}
                disabled={loading || !question.trim()}
                className="absolute right-3 bottom-4 p-2 rounded-lg bg-amber-400 text-amber-950 hover:bg-amber-300 transition-colors disabled:opacity-40 cursor-pointer"
              >
                {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="space-y-1.5">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider">Suggested Inquiries:</span>
            <div className="flex flex-col gap-1.5">
              {sampleQuestions.map((qText, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setQuestion(qText);
                    handleAskOracle(qText);
                  }}
                  className="text-left text-slate-300 hover:text-amber-300 bg-slate-900/60 hover:bg-slate-900 p-2 rounded-lg border border-slate-800/80 transition-colors cursor-pointer text-[11px]"
                >
                  "{qText}"
                </button>
              ))}
            </div>
          </div>

          {/* Reading Display */}
          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl text-xs">
              {error}
            </div>
          )}

          {reading && (
            <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between text-xs text-amber-300 font-serif font-bold pb-2 border-b border-slate-800">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Oracle Reading Synthesis</span>
                </span>
                <span className="text-[10px] text-slate-500 font-sans uppercase font-normal">AstroVerse AI Engine</span>
              </div>

              <div className="text-slate-200 text-xs sm:text-sm leading-relaxed space-y-3 font-light">
                {reading.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {influences.length > 0 && (
                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-2">
                  <span className="text-[10px] text-slate-500 uppercase">Aspects Grounded:</span>
                  {influences.map((inf, i) => (
                    <span key={i} className="text-[11px] text-amber-200/90 font-mono">
                      {inf} {i < influences.length - 1 ? '·' : ''}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-end">
                <button
                  onClick={() => setIsEmailModalOpen(true)}
                  className="px-3.5 py-1.5 text-xs text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Email This Reading</span>
                </button>
              </div>
            </div>
          )}

          {reading && (
            <EmailReportModal
              isOpen={isEmailModalOpen}
              onClose={() => setIsEmailModalOpen(false)}
              reportTitle={`Astrological Oracle Reading for ${sign}`}
              reportType="Oracle Synthesis"
              content={`Oracle Inquiry: "${question}"\nSign: ${sign} · Focus: ${focusArea}\n\nSynthesis:\n${reading}`}
            />
          )}
        </div>
      </div>
    </div>
  );
};
