import React, { useState } from 'react';
import { BirthChartData, PlanetaryPositionData } from '../types.ts';
import { Compass, RefreshCw, Sparkles, MapPin, Clock, Calendar, CheckCircle, ChevronRight, Mail } from 'lucide-react';
import { EmailReportModal } from './EmailReportModal.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';

interface BirthChartCalculatorProps {
  onOpenOracleWithBirthChart?: (chartSummary: string) => void;
}

const CITY_PRESETS = [
  { name: 'London, UK', lat: 51.5074, lon: -0.1278 },
  { name: 'New York, USA', lat: 40.7128, lon: -74.0060 },
  { name: 'Paris, France', lat: 48.8566, lon: 2.3522 },
  { name: 'Tokyo, Japan', lat: 35.6762, lon: 139.6503 },
  { name: 'Cairo, Egypt', lat: 30.0444, lon: 31.2357 },
  { name: 'Athens, Greece', lat: 37.9838, lon: 23.7275 },
  { name: 'Sydney, Australia', lat: -33.8688, lon: 151.2093 },
  { name: 'San Francisco, USA', lat: 37.7749, lon: -122.4194 },
];

export const BirthChartCalculator: React.FC<BirthChartCalculatorProps> = ({
  onOpenOracleWithBirthChart,
}) => {
  const { t, getSignName, getPlanetName, getElementName } = useLanguage();
  const [birthDate, setBirthDate] = useState<string>('1998-05-15');
  const [birthTime, setBirthTime] = useState<string>('14:30');
  const [selectedCity, setSelectedCity] = useState<string>('New York, USA');
  const [lat, setLat] = useState<number>(40.7128);
  const [lon, setLon] = useState<number>(-74.0060);
  const [locationName, setLocationName] = useState<string>('New York, USA');

  const [chartData, setChartData] = useState<BirthChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetaryPositionData | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState<boolean>(false);

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    const preset = CITY_PRESETS.find((c) => c.name === cityName);
    if (preset) {
      setLat(preset.lat);
      setLon(preset.lon);
      setLocationName(preset.name);
    }
  };

  const calculateChart = () => {
    setLoading(true);
    fetch('/api/birth-chart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        birthDate,
        birthTime,
        latitude: lat,
        longitude: lon,
        locationName,
      }),
    })
      .then((res) => res.json())
      .then((data: BirthChartData) => {
        setChartData(data);
        if (data.planets && data.planets.length) {
          setSelectedPlanet(data.planets[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Birth chart calculation error:', err);
        setLoading(false);
      });
  };

  // Run initial calculation once
  React.useEffect(() => {
    calculateChart();
  }, []);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-amber-400/90 mb-2">
            <span>Natalis Cosmica</span>
            <span aria-hidden="true">·</span>
            <span>Mathematical Natal Horizon</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-100">
            Astrological Birth Chart & Wheel
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl">
            Calculates your Ascendant (Rising sign), Midheaven (MC), 12 celestial houses, and planetary aspects using local sidereal time and Keplerian coordinates.
          </p>
        </div>
      </div>

      {/* Input Form Controls */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <h3 className="text-sm font-serif uppercase tracking-wider text-amber-200/90 font-semibold flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-400" />
          <span>{t('birthParametersHeading', 'NATAL BIRTH PARAMETERS')}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">{t('birthDateLabel', 'Birth Date')}</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-400 tabular-nums"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium flex items-center justify-between">
              <span>{t('birthTimeLabel', 'Birth Time (Local)')}</span>
              <span className="text-[10px] text-slate-500">24-hour</span>
            </label>
            <input
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-400 tabular-nums"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">{t('cityLocationLabel', 'City Location Preset')}</label>
            <select
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-400"
            >
              {CITY_PRESETS.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={calculateChart}
              disabled={loading}
              className="w-full py-2.5 px-4 text-xs font-semibold tracking-wide uppercase text-amber-950 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Computing...</span>
                </>
              ) : (
                <>
                  <Compass className="w-3.5 h-3.5" />
                  <span>{t('castChartButton', 'Cast Natal Chart')}</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
          <span>Lat: <strong className="text-slate-200 tabular-nums">{lat.toFixed(4)}°</strong></span>
          <span>Lon: <strong className="text-slate-200 tabular-nums">{lon.toFixed(4)}°</strong></span>
          <span>House System: <strong className="text-amber-300">Equal / Whole Sign</strong></span>
          <span>Sidereal Reference: <strong className="text-slate-200">Greenwich Mean Sidereal Time</strong></span>
        </div>
      </div>

      {/* Chart Output Display */}
      {chartData && (
        <div className="space-y-8">
          {/* Top Big Pillars: Sun, Moon, Rising (The Big Three) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Sun Card */}
            {(() => {
              const sun = chartData.planets.find((p) => p.name === 'Sun');
              return (
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="uppercase tracking-wider font-medium">{t('sunSignBig3', 'SUN SIGN (CORE WILL)')}</span>
                    <span className="text-xl text-amber-300 font-serif">☉</span>
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-slate-100">
                    {sun ? getSignName(sun.sign) : 'Taurus'}
                  </h4>
                  <p className="text-xs text-amber-400/90 font-mono mt-0.5 tabular-nums">
                    {sun ? sun.formatted : ''} · {t('houseCol', 'House')} {sun ? sun.house : 1}
                  </p>
                  <p className="text-xs text-slate-400 mt-2 font-light">
                    {t('coreWill', 'Core Will & Vital Essence')}
                  </p>
                </div>
              );
            })()}

            {/* Moon Card */}
            {(() => {
              const moon = chartData.planets.find((p) => p.name === 'Moon');
              return (
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="uppercase tracking-wider font-medium">{t('moonSignBig3', 'MOON SIGN (INNER SELF)')}</span>
                    <span className="text-xl text-amber-200 font-serif">☽</span>
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-slate-100">
                    {moon ? getSignName(moon.sign) : 'Cancer'}
                  </h4>
                  <p className="text-xs text-amber-400/90 font-mono mt-0.5 tabular-nums">
                    {moon ? moon.formatted : ''} · {t('houseCol', 'House')} {moon ? moon.house : 4}
                  </p>
                  <p className="text-xs text-slate-400 mt-2 font-light">
                    {t('innerSelf', 'Emotional Subconscious')}
                  </p>
                </div>
              );
            })()}

            {/* Ascendant / Rising Card */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="uppercase tracking-wider font-medium">{t('ascendantBig3', 'ASCENDANT / RISING (HELM)')}</span>
                <span className="text-xl text-amber-400 font-serif">ASC</span>
              </div>
              <h4 className="text-2xl font-serif font-bold text-slate-100">
                {getSignName(chartData.ascendant.sign)}
              </h4>
              <p className="text-xs text-amber-400/90 font-mono mt-0.5 tabular-nums">
                {chartData.ascendant.formatted} · Eastern Horizon
              </p>
              <p className="text-xs text-slate-400 mt-2 font-light">
                {t('helmRising', 'Physical Embodiment & Persona')}
              </p>
            </div>
          </div>

          {/* Interactive Natal Wheel & Manuscript Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Rendered Natal Wheel Circular SVG */}
            <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col items-center">
              <div className="w-full flex items-center justify-between text-xs text-slate-400 pb-4 mb-2 border-b border-slate-800">
                <span className="font-serif font-bold text-slate-200">Interactive Natal Wheel</span>
                <span className="tabular-nums">Ascendant: {chartData.ascendant.formatted}</span>
              </div>

              {/* Natal Wheel SVG */}
              <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center my-4">
                <svg viewBox="0 0 400 400" className="w-full h-full select-none">
                  {/* Outer Zodiac Belt */}
                  <circle cx="200" cy="200" r="185" fill="none" stroke="#334155" strokeWidth="2" />
                  <circle cx="200" cy="200" r="150" fill="none" stroke="#1e293b" strokeWidth="1.5" />
                  <circle cx="200" cy="200" r="100" fill="none" stroke="#334155" strokeWidth="1" />
                  <circle cx="200" cy="200" r="30" fill="#090b14" stroke="#d97706" strokeWidth="1.5" />

                  {/* 12 House Dividing Spokes */}
                  {Array.from({ length: 12 }).map((_, i) => {
                    const angle = i * 30 - 180; // Ascendant on left (180 deg)
                    const rad = (angle * Math.PI) / 180;
                    const x1 = 200 + 30 * Math.cos(rad);
                    const y1 = 200 + 30 * Math.sin(rad);
                    const x2 = 200 + 150 * Math.cos(rad);
                    const y2 = 200 + 150 * Math.sin(rad);

                    // House numbers
                    const midAngle = angle + 15;
                    const midRad = (midAngle * Math.PI) / 180;
                    const numX = 200 + 60 * Math.cos(midRad);
                    const numY = 200 + 60 * Math.sin(midRad);

                    return (
                      <g key={i}>
                        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1e293b" strokeWidth="1" />
                        <text
                          x={numX}
                          y={numY}
                          fill="#64748b"
                          fontSize="10"
                          textAnchor="middle"
                          dominantBaseline="central"
                          className="font-mono"
                        >
                          {i + 1}
                        </text>
                      </g>
                    );
                  })}

                  {/* Major Horizon & Meridian axes */}
                  {/* Ascendant - Descendant Axis (Horizontal) */}
                  <line x1="15" y1="200" x2="385" y2="200" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
                  <text x="25" y="195" fill="#f59e0b" fontSize="10" fontWeight="bold" className="font-mono">
                    ASC
                  </text>
                  <text x="365" y="195" fill="#f59e0b" fontSize="10" fontWeight="bold" className="font-mono">
                    DSC
                  </text>

                  {/* Midheaven - Imum Coeli Axis (Vertical) */}
                  <line x1="200" y1="15" x2="200" y2="385" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
                  <text x="205" y="25" fill="#38bdf8" fontSize="10" fontWeight="bold" className="font-mono">
                    MC
                  </text>
                  <text x="205" y="380" fill="#38bdf8" fontSize="10" fontWeight="bold" className="font-mono">
                    IC
                  </text>

                  {/* Geometric Aspect Lines across the wheel */}
                  {chartData.aspects.slice(0, 15).map((asp, idx) => {
                    const p1 = chartData.planets.find((p) => p.name === asp.planet1);
                    const p2 = chartData.planets.find((p) => p.name === asp.planet2);
                    if (!p1 || !p2) return null;

                    // Plot angles relative to ascendant on the 180 axis
                    const a1 = ((p1.longitude - chartData.ascendant.degree + 180) * Math.PI) / 180;
                    const a2 = ((p2.longitude - chartData.ascendant.degree + 180) * Math.PI) / 180;

                    const x1 = 200 + 95 * Math.cos(a1);
                    const y1 = 200 + 95 * Math.sin(a1);
                    const x2 = 200 + 95 * Math.cos(a2);
                    const y2 = 200 + 95 * Math.sin(a2);

                    let strokeColor = '#38bdf8'; // Trine/Sextile (blue)
                    if (asp.aspectType === 'Square' || asp.aspectType === 'Opposition') strokeColor = '#f43f5e'; // Red
                    if (asp.aspectType === 'Conjunction') strokeColor = '#fbbf24'; // Gold

                    return (
                      <line
                        key={idx}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={strokeColor}
                        strokeWidth="0.8"
                        strokeOpacity="0.4"
                      />
                    );
                  })}

                  {/* Planet Glyphs Plotted on Circumference */}
                  {chartData.planets.map((planet) => {
                    const angleRad = ((planet.longitude - chartData.ascendant.degree + 180) * Math.PI) / 180;
                    const px = 200 + 125 * Math.cos(angleRad);
                    const py = 200 + 125 * Math.sin(angleRad);
                    const isSelected = selectedPlanet?.name === planet.name;

                    return (
                      <g
                        key={planet.name}
                        className="cursor-pointer"
                        onClick={() => setSelectedPlanet(planet)}
                      >
                        <circle
                          cx={px}
                          cy={py}
                          r="12"
                          fill={isSelected ? '#d97706' : '#0f172a'}
                          stroke={isSelected ? '#fbbf24' : '#475569'}
                          strokeWidth="1.5"
                        />
                        <text
                          x={px}
                          y={py}
                          fill={isSelected ? '#090b14' : '#e2e8f0'}
                          fontSize="12"
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="central"
                        >
                          {planet.symbol}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Central Crest */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs uppercase tracking-widest text-amber-300 font-serif font-bold">
                    AstroVerse
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">NATAL WHEEL</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 bg-sky-400 inline-block" />
                  <span>Harmonious (Trine / Sextile)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 bg-rose-400 inline-block" />
                  <span>Dynamic (Square / Opp)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 bg-amber-400 inline-block" />
                  <span>Conjunction</span>
                </span>
              </div>
            </div>

            {/* Right: Selected Planet Detail & Archival Manuscript */}
            <div className="lg:col-span-5 space-y-6">
              {/* Archival Manuscript Graphic */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                <img
                  src="/src/assets/images/natal_wheel_manuscript_1793203136787.jpg"
                  alt="Natalis Cosmica - Archival Manuscript"
                  className="w-full h-44 object-cover object-top opacity-85"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                  <span className="font-serif font-bold text-amber-200">Natalis Cosmica Schema</span>
                  <span className="text-[11px] text-slate-400">Ptolemaic Houses & Moities</span>
                </div>
              </div>

              {/* Selected Planet Card */}
              {selectedPlanet && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl text-amber-300 font-serif font-bold">{selectedPlanet.symbol}</span>
                      <div>
                        <h4 className="text-lg font-serif font-bold text-slate-100">{selectedPlanet.name} in {selectedPlanet.sign}</h4>
                        <p className="text-xs text-amber-400 font-mono tabular-nums">{selectedPlanet.formatted} · House {selectedPlanet.house}</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {selectedPlanet.dignity}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-slate-500 uppercase block text-[10px]">Element</span>
                      <span className="text-slate-200 font-medium">{selectedPlanet.element}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 uppercase block text-[10px]">Motion</span>
                      <span className="text-slate-200 font-medium">{selectedPlanet.isRetrograde ? '℞ Retrograde' : 'Direct'}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    In house {selectedPlanet.house}, {selectedPlanet.name} directs its archetypal energy into this terrestrial domain.
                    {selectedPlanet.dignity === 'Domicile' && ' Operating with supreme sovereign authority.'}
                    {selectedPlanet.dignity === 'Exaltation' && ' Operating as an honored guest of royal status.'}
                    {selectedPlanet.dignity === 'Detriment' && ' Navigating challenging terrain requiring unique inventiveness.'}
                    {selectedPlanet.dignity === 'Fall' && ' Transforming vulnerabilities into unconventional strengths.'}
                  </p>
                </div>
              )}

              {/* Elemental & Modalities Meter */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h4 className="text-xs uppercase tracking-widest text-slate-400 font-serif font-medium">
                  Elemental Balance
                </h4>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300">
                    <span className="block font-bold text-base tabular-nums">{chartData.elementDistribution.fire}</span>
                    <span className="text-[10px] uppercase">Fire</span>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                    <span className="block font-bold text-base tabular-nums">{chartData.elementDistribution.earth}</span>
                    <span className="text-[10px] uppercase">Earth</span>
                  </div>
                  <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-300">
                    <span className="block font-bold text-base tabular-nums">{chartData.elementDistribution.air}</span>
                    <span className="text-[10px] uppercase">Air</span>
                  </div>
                  <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                    <span className="block font-bold text-base tabular-nums">{chartData.elementDistribution.water}</span>
                    <span className="text-[10px] uppercase">Water</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Cardinal: <strong className="text-slate-200 tabular-nums">{chartData.modalityDistribution.cardinal}</strong></span>
                  <span>Fixed: <strong className="text-slate-200 tabular-nums">{chartData.modalityDistribution.fixed}</strong></span>
                  <span>Mutable: <strong className="text-slate-200 tabular-nums">{chartData.modalityDistribution.mutable}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Planetary Placements Table */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-bold text-slate-100">
              Natal Planetary Positions
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Planet</th>
                    <th className="py-3 px-4">Sign</th>
                    <th className="py-3 px-4">Degree</th>
                    <th className="py-3 px-4">House</th>
                    <th className="py-3 px-4">Motion</th>
                    <th className="py-3 px-4">Dignity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200 font-light">
                  {chartData.planets.map((p) => (
                    <tr
                      key={p.name}
                      onClick={() => setSelectedPlanet(p)}
                      className={`hover:bg-slate-800/40 cursor-pointer transition-colors ${
                        selectedPlanet?.name === p.name ? 'bg-amber-400/10' : ''
                      }`}
                    >
                      <td className="py-3 px-4 font-medium flex items-center gap-2">
                        <span className="text-base text-amber-300 font-serif font-bold">{p.symbol}</span>
                        <span className="text-slate-100">{p.name}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-100">{p.sign}</td>
                      <td className="py-3 px-4 font-mono tabular-nums text-amber-300">{p.formatted}</td>
                      <td className="py-3 px-4 font-mono tabular-nums">House {p.house}</td>
                      <td className="py-3 px-4">
                        {p.isRetrograde ? (
                          <span className="text-rose-400 font-medium">℞ Retrograde</span>
                        ) : (
                          <span className="text-slate-400">Direct</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-300">{p.dignity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Geometric Aspects Matrix */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-bold text-slate-100">
              Geometric Planetary Aspects
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {chartData.aspects.map((asp, i) => (
                <div
                  key={i}
                  className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-semibold text-slate-200">
                      {asp.planet1} {asp.aspectType} {asp.planet2}
                    </span>
                    <span className="block text-[11px] text-slate-400 mt-0.5">
                      Angle: <span className="font-mono tabular-nums text-slate-300">{asp.angle}°</span> (Orb: <span className="font-mono tabular-nums text-amber-300">{asp.orb}°</span>)
                    </span>
                  </div>
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded border ${
                      asp.aspectType === 'Trine' || asp.aspectType === 'Sextile'
                        ? 'text-sky-300 border-sky-500/20 bg-sky-500/10'
                        : asp.aspectType === 'Square' || asp.aspectType === 'Opposition'
                        ? 'text-rose-300 border-rose-500/20 bg-rose-500/10'
                        : 'text-amber-300 border-amber-500/20 bg-amber-500/10'
                    }`}
                  >
                    {asp.nature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Ask Oracle Deep Dive on Chart */}
          {onOpenOracleWithBirthChart && (
            <div className="p-6 bg-gradient-to-r from-amber-950/30 via-slate-900/60 to-slate-900/60 border border-amber-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-serif font-bold text-amber-200">
                  Synthesize This Birth Chart with the Oracle
                </h4>
                <p className="text-xs text-slate-300 mt-1 max-w-xl font-light">
                  Query the AstroVerse Gemini Oracle to interpret the synthesis of Sun in {chartData.planets.find(p => p.name === 'Sun')?.sign}, Moon in {chartData.planets.find(p => p.name === 'Moon')?.sign}, and Ascendant in {chartData.ascendant.sign}.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  onClick={() => setIsEmailModalOpen(true)}
                  className="px-4 py-2.5 text-xs font-medium tracking-wide uppercase text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Email Report</span>
                </button>

                <button
                  onClick={() =>
                    onOpenOracleWithBirthChart(
                      `Sun in ${chartData.planets.find(p => p.name === 'Sun')?.sign}, Moon in ${chartData.planets.find(p => p.name === 'Moon')?.sign}, Ascendant in ${chartData.ascendant.sign}. What is the deeper karmic synthesis of this chart?`
                    )
                  }
                  className="px-5 py-2.5 text-xs font-semibold tracking-wide uppercase text-amber-950 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Oracle Interpretation</span>
                </button>
              </div>
            </div>
          )}

          {/* Email Dispatch Modal */}
          {chartData && (
            <EmailReportModal
              isOpen={isEmailModalOpen}
              onClose={() => setIsEmailModalOpen(false)}
              reportTitle={`Birth Chart (${chartData.birthData.dateTime.split('T')[0]}) - Ascendant in ${chartData.ascendant.sign}`}
              reportType="Natal Chart Synthesis"
              content={`Natal Horizon Calculated for ${chartData.birthData.locationName || 'Local Horizon'}.\nAscendant (Rising Sign): ${chartData.ascendant.formatted}\nSun Position: ${chartData.planets.find(p => p.name === 'Sun')?.formatted}\nMoon Position: ${chartData.planets.find(p => p.name === 'Moon')?.formatted}\nElemental Balance: Fire (${chartData.elementDistribution.fire}), Earth (${chartData.elementDistribution.earth}), Air (${chartData.elementDistribution.air}), Water (${chartData.elementDistribution.water}).\n\nYour celestial blueprint reflects sacred geometric aspects across the 12 celestial houses.`}
              chartData={{
                ascendant: chartData.ascendant,
                sun: chartData.planets.find(p => p.name === 'Sun'),
                moon: chartData.planets.find(p => p.name === 'Moon'),
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
