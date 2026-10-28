import React, { useState, useEffect } from 'react';
import { ZodiacSign, CompatibilityData } from '../types.ts';
import { Heart, ArrowLeftRight, Sparkles, MessageSquare, Brain, Compass, RefreshCw } from 'lucide-react';

interface SynastryCompatibilityProps {
  signs: ZodiacSign[];
  initialSign1?: string;
  initialSign2?: string;
}

export const SynastryCompatibility: React.FC<SynastryCompatibilityProps> = ({
  signs,
  initialSign1 = 'aries',
  initialSign2 = 'leo',
}) => {
  const [sign1Key, setSign1Key] = useState<string>(initialSign1);
  const [sign2Key, setSign2Key] = useState<string>(initialSign2);
  const [compatData, setCompatData] = useState<CompatibilityData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const sign1 = signs.find((s) => s.sign_key === sign1Key) || signs[0];
  const sign2 = signs.find((s) => s.sign_key === sign2Key) || signs[4];

  const fetchCompatibility = () => {
    setLoading(true);
    fetch(`/api/compatibility/${sign1Key}/${sign2Key}`)
      .then((res) => res.json())
      .then((data: CompatibilityData) => {
        setCompatData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching compatibility:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCompatibility();
  }, [sign1Key, sign2Key]);

  const swapSigns = () => {
    const temp = sign1Key;
    setSign1Key(sign2Key);
    setSign2Key(temp);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-amber-400/90 mb-2">
            <span>Synastria</span>
            <span aria-hidden="true">·</span>
            <span>Relational Elemental Chemistry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-100">
            Zodiac Compatibility & Synastry
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl">
            Analyze harmonic triplicities, elemental resonances, and aspectual angles between any two astrological archetypes.
          </p>
        </div>
      </div>

      {/* Selector Strip */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* Sign 1 Selector */}
          <div className="md:col-span-5 bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2 font-medium">
              Primary Sign (Seeker)
            </label>
            <div className="flex items-center gap-3">
              <span className="text-3xl text-amber-300 font-serif">{sign1?.symbol}</span>
              <select
                value={sign1Key}
                onChange={(e) => setSign1Key(e.target.value)}
                className="w-full bg-slate-900 text-slate-100 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
              >
                {signs.map((s) => (
                  <option key={s.sign_key} value={s.sign_key}>
                    {s.name} ({s.element} · {s.date_range})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center">
            <button
              onClick={swapSigns}
              title="Swap Signs"
              className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-colors cursor-pointer"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          {/* Sign 2 Selector */}
          <div className="md:col-span-5 bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2 font-medium">
              Counterpart Sign (Partner)
            </label>
            <div className="flex items-center gap-3">
              <span className="text-3xl text-amber-300 font-serif">{sign2?.symbol}</span>
              <select
                value={sign2Key}
                onChange={(e) => setSign2Key(e.target.value)}
                className="w-full bg-slate-900 text-slate-100 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
              >
                {signs.map((s) => (
                  <option key={s.sign_key} value={s.sign_key}>
                    {s.name} ({s.element} · {s.date_range})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Result Card */}
      {loading ? (
        <div className="p-12 text-center text-slate-400">
          <RefreshCw className="w-6 h-6 animate-spin text-amber-400 mx-auto mb-3" />
          <p className="text-sm">Calculating elemental synthesis...</p>
        </div>
      ) : compatData && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
          {/* Top Banner with Overall Score */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 mb-1">
                <span>{compatData.elemental_dynamic}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-100">
                {sign1?.name} & {sign2?.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {sign1?.element} ({sign1?.modality}) meets {sign2?.element} ({sign2?.modality})
              </p>
            </div>

            {/* Overall Score Circle/Badge */}
            <div className="flex items-center gap-4 bg-slate-950/60 border border-slate-800 p-4 rounded-xl shrink-0">
              <div className="text-center">
                <span className="block text-3xl font-serif font-bold text-amber-300 tabular-nums">
                  {compatData.overall_score}%
                </span>
                <span className="text-[11px] uppercase tracking-wider text-slate-400">Overall Synergy</span>
              </div>
            </div>
          </div>

          {/* 3 Metric Progress Bars (Love, Intellect, Communication) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-rose-300 font-semibold uppercase">
                  <Heart className="w-3.5 h-3.5" />
                  <span>Romantic & Passion</span>
                </span>
                <span className="font-mono text-slate-200 tabular-nums font-bold">{compatData.love_score}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-rose-500 to-rose-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${compatData.love_score}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-sky-300 font-semibold uppercase">
                  <Brain className="w-3.5 h-3.5" />
                  <span>Intellectual Harmony</span>
                </span>
                <span className="font-mono text-slate-200 tabular-nums font-bold">{compatData.intellect_score}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-sky-500 to-sky-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${compatData.intellect_score}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-emerald-300 font-semibold uppercase">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Communication Cadence</span>
                </span>
                <span className="font-mono text-slate-200 tabular-nums font-bold">{compatData.communication_score}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${compatData.communication_score}%` }}
                />
              </div>
            </div>
          </div>

          {/* Deep Synthesis */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-amber-400/90 font-medium font-serif flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Astrological Synthesis</span>
            </h4>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
              {compatData.synthesis}
            </p>
          </div>

          {/* Practical Counsel Box */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-2">
            <h5 className="text-xs uppercase tracking-wider text-slate-300 font-medium font-serif flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Counsel for Sustained Growth</span>
            </h5>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              {compatData.advice}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
