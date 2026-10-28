import React, { useState, useEffect } from 'react';
import { ZodiacSign, HoroscopeData } from '../types.ts';
import { Heart, Briefcase, Activity, Sparkles, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';

interface DailyHoroscopesProps {
  signs: ZodiacSign[];
  initialSignKey?: string;
  onOpenOracleWithSign?: (signKey: string, question: string) => void;
}

export const DailyHoroscopes: React.FC<DailyHoroscopesProps> = ({
  signs,
  initialSignKey = 'aries',
  onOpenOracleWithSign,
}) => {
  const { t, getSignName, getElementName, language } = useLanguage();
  const [selectedSignKey, setSelectedSignKey] = useState<string>(initialSignKey);
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [horoscope, setHoroscope] = useState<HoroscopeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const currentSign = signs.find((s) => s.sign_key === selectedSignKey) || signs[0];

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(`/api/horoscope/${selectedSignKey}?period=${period}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setHoroscope(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching horoscope:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedSignKey, period]);

  const localeMap: Record<string, string> = {
    en: 'en-US',
    ta: 'ta-IN',
    te: 'te-IN',
    hi: 'hi-IN',
  };

  const todayStr = new Intl.DateTimeFormat(localeMap[language] || 'en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  const periodLabels: Record<string, Record<string, string>> = {
    daily: { en: 'Today', ta: 'இன்று', te: 'నేడు', hi: 'आज' },
    weekly: { en: 'This Week', ta: 'இந்த வாரம்', te: 'ఈ వారం', hi: 'इस सप्ताह' },
    monthly: { en: 'This Month', ta: 'இந்த மாதம்', te: 'ఈ నెల', hi: 'इस माह' },
  };

  return (
    <div className="space-y-8">
      {/* Header and Period Toggle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-amber-400/90 mb-2">
            <span>{t('featHoroscopeTitle', 'Daily Transits')}</span>
            <span aria-hidden="true">·</span>
            <span>{todayStr}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-100">
            {t('dailyHoroscopesTitle', 'DAILY CELESTIAL HOROSCOPES')}
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl">
            {t('dailyHoroscopesSubtitle', 'Daily planetary transits and archetypal forecasts calculated for each sign.')}
          </p>
        </div>

        {/* Period Selector Tabs */}
        <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
          {(['daily', 'weekly', 'monthly'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 rounded capitalize font-medium transition-colors cursor-pointer whitespace-nowrap ${
                period === p
                  ? 'bg-amber-400/20 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {periodLabels[p]?.[language] || periodLabels[p]?.en}
            </button>
          ))}
        </div>
      </div>

      {/* Sign Selector Bar */}
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
        {signs.map((sign) => {
          const isSelected = selectedSignKey === sign.sign_key;
          return (
            <button
              key={sign.sign_key}
              onClick={() => setSelectedSignKey(sign.sign_key)}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-400/15 border-amber-400 text-amber-200 shadow-sm'
                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span className="text-xl font-serif font-bold">{sign.symbol}</span>
              <span className="text-[11px] font-medium mt-1 truncate max-w-full">
                {getSignName(sign.sign_key)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Forecast Card */}
      {loading ? (
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-400">
          <RefreshCw className="w-6 h-6 animate-spin text-amber-400 mb-3" />
          <p className="text-sm">Calculating celestial transits for {currentSign ? getSignName(currentSign.sign_key) : ''}...</p>
        </div>
      ) : horoscope && currentSign ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
          {/* Top Banner of the Sign Forecast */}
          <div className="flex flex-wrap items-start justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <span className="text-5xl text-amber-300 font-serif">{currentSign.symbol}</span>
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <span>{getSignName(currentSign.sign_key)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{getElementName(currentSign.element)}</span>
                  <span aria-hidden="true">·</span>
                  <span className="uppercase">{periodLabels[period]?.[language] || period}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-100">
                  {getSignName(currentSign.sign_key)} · {t('forecastForToday', 'Forecast for Today')}
                </h3>
              </div>
            </div>

            {/* Micro Metas */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-slate-500">
                  {t('celestialAspectLabel', 'Primary Aspect')}
                </span>
                <span className="text-amber-300 font-medium tabular-nums">{horoscope.celestial_aspect}</span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-slate-500">
                  {t('luckyNumbersLabel', 'Lucky Numbers')}
                </span>
                <span className="text-slate-200 font-medium tabular-nums">{horoscope.lucky_numbers}</span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-slate-500">
                  {t('luckyColorLabel', 'Lucky Color')}
                </span>
                <span className="text-slate-200 font-medium">{horoscope.lucky_color}</span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-slate-500">
                  {t('compatibleSignsLabel', 'Compatible Signs')}
                </span>
                <span className="text-slate-200 font-medium">{horoscope.compatible_signs}</span>
              </div>
            </div>
          </div>

          {/* Core Overview */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-amber-400/90 font-medium font-serif flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('cosmicOverview', 'Cosmic Overview & Transit')}</span>
            </h4>
            <p className="text-base text-slate-200 leading-relaxed font-light">
              {horoscope.overview}
            </p>
          </div>

          {/* 3 Dedicated Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {/* Love Pillar */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-300">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>{t('loveRelationships', 'Love & Relationships')}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {horoscope.love_forecast}
              </p>
            </div>

            {/* Career Pillar */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-300">
                <Briefcase className="w-4 h-4 text-sky-400" />
                <span>{t('careerFinance', 'Career & Finance')}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {horoscope.career_forecast}
              </p>
            </div>

            {/* Wellness Pillar */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-300">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>{t('wellnessVitality', 'Mind & Body Vitality')}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {horoscope.wellness_forecast}
              </p>
            </div>
          </div>

          {/* Bottom Action strip */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              {t('ephemerisRealTimeBadge', 'Real-time transit')} · <span className="text-amber-300 font-medium">{getSignName(currentSign.sign_key)}</span>.
            </p>

            {onOpenOracleWithSign && (
              <button
                onClick={() => onOpenOracleWithSign(currentSign.name, `What does today's transit aspect (${horoscope.celestial_aspect}) signify for my life direction?`)}
                className="px-4 py-2 text-xs font-semibold tracking-wide uppercase text-amber-950 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 rounded-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('askAiAboutSign', 'Ask Oracle About This Forecast')}</span>
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
