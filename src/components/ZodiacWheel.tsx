import React, { useState } from 'react';
import { ZodiacSign } from '../types.ts';
import { Sparkles, Compass, Heart, Briefcase, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';

interface ZodiacWheelProps {
  signs: ZodiacSign[];
  onSelectSignForHoroscope: (signKey: string) => void;
  onSelectSignForCompatibility: (signKey: string) => void;
}

export const ZodiacWheel: React.FC<ZodiacWheelProps> = ({
  signs,
  onSelectSignForHoroscope,
  onSelectSignForCompatibility,
}) => {
  const { t, getSignName, getElementName, getPlanetName, getModalityName } = useLanguage();
  const [selectedSignKey, setSelectedSignKey] = useState<string>('aries');
  const [elementFilter, setElementFilter] = useState<string>('all');
  const [modalityFilter, setModalityFilter] = useState<string>('all');
  const [wheelRotation, setWheelRotation] = useState<number>(0);

  const selectedSign = signs.find((s) => s.sign_key === selectedSignKey) || signs[0];

  const filteredSigns = signs.filter((s) => {
    if (elementFilter !== 'all' && s.element.toLowerCase() !== elementFilter) return false;
    if (modalityFilter !== 'all' && s.modality.toLowerCase() !== modalityFilter) return false;
    return true;
  });

  const rotateWheelTo = (index: number, signKey: string) => {
    setSelectedSignKey(signKey);
    setWheelRotation(-index * 30);
  };

  const getElementColor = (element: string) => {
    switch (element) {
      case 'Fire':
        return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
      case 'Earth':
        return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'Air':
        return 'text-sky-400 border-sky-500/30 bg-sky-500/10';
      case 'Water':
        return 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10';
      default:
        return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    }
  };

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-amber-400/90 mb-2">
            <span>{t('featZodiacTitle', '12 Archetypes')}</span>
            <span aria-hidden="true">·</span>
            <span>{t('eclipticWheelLabel', 'Ecliptic Frame')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-100">
            {t('zodiacHeadline', 'ZODIAC CONSTELLATIONS & ARCHETYPES')}
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl">
            {t('zodiacSubheadline', 'Each 30° ecliptic segment embodies a unique synthesis of primordial element, seasonal modality, and planetary rulership.')}
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center p-1 bg-slate-900/80 border border-slate-800 rounded-lg text-xs">
            {[
              { id: 'all', label: t('filterAll', 'All') },
              { id: 'fire', label: t('filterFire', 'Fire') },
              { id: 'earth', label: t('filterEarth', 'Earth') },
              { id: 'air', label: t('filterAir', 'Air') },
              { id: 'water', label: t('filterWater', 'Water') },
            ].map((elem) => (
              <button
                key={elem.id}
                onClick={() => setElementFilter(elem.id)}
                className={`px-2.5 py-1 rounded capitalize font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  elementFilter === elem.id
                    ? 'bg-amber-400/20 text-amber-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {elem.label}
              </button>
            ))}
          </div>

          <div className="flex items-center p-1 bg-slate-900/80 border border-slate-800 rounded-lg text-xs">
            {[
              { id: 'all', label: t('filterAll', 'All') },
              { id: 'cardinal', label: t('filterCardinal', 'Cardinal') },
              { id: 'fixed', label: t('filterFixed', 'Fixed') },
              { id: 'mutable', label: t('filterMutable', 'Mutable') },
            ].map((mod) => (
              <button
                key={mod.id}
                onClick={() => setModalityFilter(mod.id)}
                className={`px-2.5 py-1 rounded capitalize font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  modalityFilter === mod.id
                    ? 'bg-amber-400/20 text-amber-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {mod.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive 360° Wheel & Sign Spotlight Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive 360° Wheel Visualizer */}
        <div className="lg:col-span-5 bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800/80">
            <span className="font-serif tracking-wider text-amber-200/90 font-medium">
              {t('eclipticWheelLabel', 'CELESTIAL ECLIPTIC WHEEL')}
            </span>
            <span className="tabular-nums">{t('geocentricFrame', '360° Geocentric Frame')}</span>
          </div>

          <div className="relative w-72 h-72 sm:w-80 sm:h-80 my-4 flex items-center justify-center">
            {/* Rotating SVG Ecliptic Circle */}
            <svg
              viewBox="0 0 300 300"
              className="w-full h-full transition-transform duration-700 ease-out"
              style={{ transform: `rotate(${wheelRotation}deg)` }}
            >
              {/* Outer boundary rings */}
              <circle cx="150" cy="150" r="140" fill="none" stroke="#334155" strokeWidth="1.5" />
              <circle cx="150" cy="150" r="110" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="150" cy="150" r="80" fill="none" stroke="#334155" strokeWidth="1" />
              <circle cx="150" cy="150" r="35" fill="#0f172a" stroke="#d97706" strokeWidth="1.5" />

              {/* 12 radial cusp lines and sector signs */}
              {signs.map((sign, idx) => {
                const angle = idx * 30 - 90;
                const rad = (angle * Math.PI) / 180;
                const x1 = 150 + 80 * Math.cos(rad);
                const y1 = 150 + 80 * Math.sin(rad);
                const x2 = 150 + 140 * Math.cos(rad);
                const y2 = 150 + 140 * Math.sin(rad);

                const labelAngle = angle + 15;
                const labelRad = (labelAngle * Math.PI) / 180;
                const glyphX = 150 + 112 * Math.cos(labelRad);
                const glyphY = 150 + 112 * Math.sin(labelRad);

                const isSelected = selectedSignKey === sign.sign_key;

                return (
                  <g key={sign.sign_key} className="cursor-pointer" onClick={() => rotateWheelTo(idx, sign.sign_key)}>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#334155" strokeWidth="1" />
                    <text
                      x={glyphX}
                      y={glyphY}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="17"
                      fontWeight="bold"
                      fill={isSelected ? '#fbbf24' : '#94a3b8'}
                      className="transition-colors hover:fill-amber-300 select-none"
                    >
                      {sign.symbol}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Central hub showing active sign */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl text-amber-400 font-serif font-bold">{selectedSign?.symbol}</span>
              <span className="text-xs uppercase tracking-wider text-slate-300 font-serif font-semibold mt-0.5 text-center px-2 truncate max-w-[120px]">
                {selectedSign ? getSignName(selectedSign.sign_key) : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Sign Spotlight Dossier */}
        {selectedSign && (
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <span>{t('houseLabel', 'House')} {selectedSign.house_ruled} / 12</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedSign.date_range}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-4xl text-amber-300 font-serif">{selectedSign.symbol}</span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-100">
                      {getSignName(selectedSign.sign_key)}
                    </h3>
                    <p className="text-xs text-amber-400/90 font-medium tracking-wide">
                      {t('houseLabel', 'House')} {selectedSign.house_ruled} · {t('ruledByLabel', 'Ruled by')} {getPlanetName(selectedSign.ruling_planet)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Meta strip */}
              <div className="flex flex-col items-end gap-1 text-xs text-slate-400">
                <span className="text-slate-300 font-medium">
                  {t('elementLabel', 'Element')}: <span className="text-amber-300">{getElementName(selectedSign.element)}</span>
                </span>
                <span>
                  {t('modalityLabel', 'Modality')}: <span className="text-slate-200">{getModalityName(selectedSign.modality)}</span>
                </span>
                <span>
                  {t('gemstoneLabel', 'Gemstone')}: <span className="text-slate-300">{selectedSign.gemstone}</span>
                </span>
                <span>
                  {t('tarotLabel', 'Tarot')}: <span className="text-slate-300">{selectedSign.tarot_card}</span>
                </span>
              </div>
            </div>

            {/* Sign Overview */}
            <div>
              <h4 className="text-xs font-serif uppercase tracking-widest text-slate-400 mb-2 font-medium">
                {t('cosmicArchetypeTitle', 'COSMIC ARCHETYPE & OVERVIEW')}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {selectedSign.overview}
              </p>
            </div>

            {/* Dual Grid: Strengths vs Challenges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4">
                <h5 className="text-xs uppercase tracking-wider text-emerald-400 font-medium mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t('strengthsTitle', 'STRENGTHS & GIFTS')}</span>
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedSign.strengths}
                </p>
              </div>

              <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4">
                <h5 className="text-xs uppercase tracking-wider text-amber-400 font-medium mb-1.5 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{t('challengesTitle', 'EVOLUTIONARY CHALLENGES')}</span>
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedSign.challenges}
                </p>
              </div>
            </div>

            {/* Love & Career Dimensions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4">
                <h5 className="text-xs uppercase tracking-wider text-rose-300 font-medium mb-1.5 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  <span>{t('loveCompatibilityTitle', 'LOVE & RELATIONSHIP DYNAMICS')}</span>
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedSign.love_traits}
                </p>
              </div>

              <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4">
                <h5 className="text-xs uppercase tracking-wider text-sky-300 font-medium mb-1.5 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                  <span>{t('careerVocationsTitle', 'CAREER & VOCATIONAL DRIVE')}</span>
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedSign.career_traits}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectSignForHoroscope(selectedSign.sign_key)}
                className="px-4 py-2 text-xs font-semibold tracking-wide uppercase text-amber-950 bg-amber-300 hover:bg-amber-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>{t('viewHoroscopeBtn', 'View Daily Horoscope')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onSelectSignForCompatibility(selectedSign.sign_key)}
                className="px-4 py-2 text-xs font-medium tracking-wide uppercase text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>{t('checkCompatibilityBtn', 'Check Compatibility')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Grid of all 12 signs */}
      <div className="pt-4">
        <h3 className="text-lg font-serif font-bold text-slate-100 mb-6 flex items-center justify-between">
          <span>{t('zodiacSigns', '12 Zodiac Signs')}</span>
          <span className="text-xs font-sans font-normal text-slate-400 tabular-nums">
            {filteredSigns.length} / {signs.length}
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSigns.map((sign, index) => {
            const isSelected = selectedSignKey === sign.sign_key;
            return (
              <div
                key={sign.sign_key}
                onClick={() => rotateWheelTo(index, sign.sign_key)}
                className={`group p-5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-amber-400/80 shadow-md shadow-amber-500/5'
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl text-amber-300 font-serif font-bold">{sign.symbol}</span>
                    <div>
                      <h4 className="text-base font-serif font-bold text-slate-100 group-hover:text-amber-200 transition-colors">
                        {getSignName(sign.sign_key)}
                      </h4>
                      <p className="text-[11px] text-slate-400 tabular-nums">{sign.date_range}</p>
                    </div>
                  </div>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${getElementColor(sign.element)}`}>
                    {getElementName(sign.element)}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 text-xs text-slate-400 flex items-center justify-between">
                  <span>{t('ruledByLabel', 'Ruler')}: <strong className="text-slate-300">{getPlanetName(sign.ruling_planet)}</strong></span>
                  <span>{t('houseLabel', 'House')} {sign.house_ruled}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
