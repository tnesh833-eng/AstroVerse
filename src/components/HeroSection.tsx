import React from 'react';
import { Compass, Calendar } from 'lucide-react';
import { PlanetaryPositionData } from '../types.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

interface HeroSectionProps {
  onSelectTab: (tab: string) => void;
  ephemerisData: PlanetaryPositionData[];
  onOpenOracle: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectTab, ephemerisData, onOpenOracle }) => {
  const { t, language } = useLanguage();
  const sun = ephemerisData.find((p) => p.name === 'Sun');
  const moon = ephemerisData.find((p) => p.name === 'Moon');

  const localeMap: Record<string, string> = {
    en: 'en-US',
    ta: 'ta-IN',
    te: 'te-IN',
    hi: 'hi-IN',
  };

  const todayStr = new Intl.DateTimeFormat(localeMap[language] || 'en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <section className="relative overflow-hidden border-b border-slate-800/80 bg-[#090b14]">
      {/* Background Hero Image with contrast scrim */}
      <div className="absolute inset-0 z-0 opacity-25 lg:opacity-30 mix-blend-screen pointer-events-none">
        <img
          src="/src/assets/images/celestial_zodiac_hero_1793203135285.jpg"
          alt="Celestial Zodiac Chart"
          className="w-full h-full object-cover object-center filter saturate-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090b14] via-[#090b14]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090b14] via-transparent to-[#090b14]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="max-w-3xl">
          {/* Unboxed Metadata Header (Zero-Pill discipline) */}
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-amber-300/80 mb-3 flex-wrap">
            <span>{t('heroBadge1', 'Ephemeris Architecture')}</span>
            <span aria-hidden="true">·</span>
            <span>{t('heroBadge2', 'Educational Astronomy')}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{t('heroBadge3', 'Est. 2026')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-100 tracking-tight leading-tight text-balance">
            {t('heroTitle', 'The Celestial Architecture of Mind & Cosmos')}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            {t('heroSubtitle', 'A modern, educational astrology portal engineered with relational precision. Explore 12 zodiac archetypes, real-time mathematical planetary ephemeris, birth charts, and traditional Hellenistic compendia.')}
          </p>

          {/* Action Row */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectTab('birth-chart')}
              className="px-5 py-2.5 text-xs font-semibold tracking-wide uppercase text-amber-950 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{t('calcBirthChartBtn', 'Calculate Birth Chart')}</span>
            </button>
          </div>
        </div>

        {/* Real-Time Celestial Transit Ribbon */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
          <div>
            <span className="block text-[11px] uppercase tracking-wider text-slate-500 mb-1">
              {t('currentTransitDate', 'Current Transit Date')}
            </span>
            <div className="flex items-center gap-1.5 text-slate-200 font-medium tabular-nums">
              <Calendar className="w-3.5 h-3.5 text-amber-400/80" />
              <span>{todayStr}</span>
            </div>
          </div>

          <div>
            <span className="block text-[11px] uppercase tracking-wider text-slate-500 mb-1">
              {t('sunPositionLabel', 'Sun Celestial Position')}
            </span>
            <span className="text-slate-200 font-medium tabular-nums">
              ☉ {sun ? sun.formatted : "14°31' Taurus"}
            </span>
          </div>

          <div>
            <span className="block text-[11px] uppercase tracking-wider text-slate-500 mb-1">
              {t('moonPositionLabel', 'Moon Celestial Position')}
            </span>
            <span className="text-slate-200 font-medium tabular-nums">
              ☽ {moon ? moon.formatted : "22°11' Cancer"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
