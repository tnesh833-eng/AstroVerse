import React, { useState, useEffect } from 'react';
import { PlanetaryPositionData } from '../types.ts';
import { Calendar, Compass, RefreshCw, Orbit, Info, ShieldCheck } from 'lucide-react';

interface PlanetaryEphemerisProps {
  initialPositions?: PlanetaryPositionData[];
}

export const PlanetaryEphemeris: React.FC<PlanetaryEphemerisProps> = ({ initialPositions = [] }) => {
  const [positions, setPositions] = useState<PlanetaryPositionData[]>(initialPositions);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activePlanetName, setActivePlanetName] = useState<string>('Sun');

  const fetchEphemerisForDate = (dateStr: string) => {
    setLoading(true);
    fetch(`/api/ephemeris?date=${dateStr}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.positions) {
          setPositions(data.positions);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Ephemeris fetch error:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!positions.length) {
      fetchEphemerisForDate(selectedDate);
    }
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    fetchEphemerisForDate(newDate);
  };

  const setToday = () => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
    fetchEphemerisForDate(today);
  };

  const activePlanet = positions.find((p) => p.name === activePlanetName) || positions[0];

  const getDignityBadge = (dignity: string) => {
    if (dignity.includes('Domicile')) return 'text-amber-300 font-semibold';
    if (dignity.includes('Exaltation')) return 'text-emerald-300 font-semibold';
    if (dignity.includes('Detriment')) return 'text-rose-300 font-medium';
    if (dignity.includes('Fall')) return 'text-orange-300 font-medium';
    return 'text-slate-400';
  };

  return (
    <div className="space-y-10">
      {/* Header and Date Selector */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-amber-400/90 mb-2">
            <span>Harmonia Celestis</span>
            <span aria-hidden="true">·</span>
            <span>Keplerian Celestial Mechanics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-100">
            Planetary Ephemeris & Dignities
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl">
            Mathematical celestial longitudes, retrograde stations, and Ptolemaic essential dignities calculated for any geocentric epoch.
          </p>
        </div>

        {/* Date Controls */}
        <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 p-2 rounded-xl">
          <label className="text-xs text-slate-400 flex items-center gap-1.5 pl-1">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Epoch Date:</span>
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="bg-slate-950 text-slate-200 border border-slate-700/80 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-amber-400 tabular-nums"
          />
          <button
            onClick={setToday}
            className="px-2.5 py-1 text-xs text-slate-300 hover:text-amber-300 bg-slate-800 rounded transition-colors cursor-pointer"
          >
            Today
          </button>
        </div>
      </div>

      {/* Hero Visual & Active Planet Split Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
        {/* Left: Scientific Engraving Graphic */}
        <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-96 w-full overflow-hidden bg-slate-950">
          <img
            src="/src/assets/images/planetary_ephemeris_art_1793203137130.jpg"
            alt="Harmonia Celestis - Planetary Mechanics"
            className="w-full h-full object-cover object-center filter saturate-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-xs text-slate-300 backdrop-blur-sm bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
            <span className="font-serif text-amber-200 font-bold block">Fig. 1 — Geocentric Ecliptic Projection</span>
            <span className="text-[11px] text-slate-400">Calculation epoch: {selectedDate} · Julian Day format reference</span>
          </div>
        </div>

        {/* Right: Active Planet Deep-Dive Dossier */}
        {activePlanet && (
          <div className="lg:col-span-6 p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-4xl text-amber-300 font-serif font-bold">{activePlanet.symbol}</span>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-slate-100">{activePlanet.name}</h3>
                  <p className="text-xs text-slate-400">
                    Calculated Position: <strong className="text-amber-300 tabular-nums">{activePlanet.formatted}</strong>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs uppercase tracking-wider block text-slate-500">Motion Status</span>
                <span className={`text-xs font-semibold ${activePlanet.isRetrograde ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {activePlanet.isRetrograde ? '℞ Retrograde' : 'Direct Motion'}
                </span>
              </div>
            </div>

            {/* Micro Metrics Strip */}
            <div className="grid grid-cols-3 gap-3 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div>
                <span className="block text-[11px] text-slate-500 uppercase">Ecliptic Longitude</span>
                <span className="text-slate-200 font-mono tabular-nums">{activePlanet.longitude.toFixed(2)}°</span>
              </div>
              <div>
                <span className="block text-[11px] text-slate-500 uppercase">Daily Speed</span>
                <span className="text-slate-200 font-mono tabular-nums">{activePlanet.speed > 0 ? `+${activePlanet.speed.toFixed(3)}` : activePlanet.speed.toFixed(3)}°/day</span>
              </div>
              <div>
                <span className="block text-[11px] text-slate-500 uppercase">Ptolemaic Dignity</span>
                <span className={`tabular-nums ${getDignityBadge(activePlanet.dignity)}`}>{activePlanet.dignity}</span>
              </div>
            </div>

            {/* Meaning & Advice */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-widest text-slate-400 font-medium font-serif flex items-center gap-1.5">
                <Orbit className="w-3.5 h-3.5 text-amber-400" />
                <span>Astrological Signification</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {activePlanet.name === 'Sun' && 'The Sun represents the primary spark of vitality, conscious will, and life purpose.'}
                {activePlanet.name === 'Moon' && 'The Moon governs the subconscious emotional tide, habit patterns, and intuitive radar.'}
                {activePlanet.name === 'Mercury' && 'Mercury handles the transmission of thought, empirical logic, trade, and synthesis of data.'}
                {activePlanet.name === 'Venus' && 'Venus harmonizes relational beauty, values, diplomacy, and the arts.'}
                {activePlanet.name === 'Mars' && 'Mars drives assertive agency, boundary sovereignty, and the vital courage to initiate.'}
                {activePlanet.name === 'Jupiter' && 'Jupiter expands philosophical awareness, spiritual providence, and generous optimism.'}
                {activePlanet.name === 'Saturn' && 'Saturn constructs endurance, institutional integrity, and structural boundaries of time.'}
                {activePlanet.name === 'Uranus' && 'Uranus sparks radical awakening, intellectual liberation, and sudden innovation.'}
                {activePlanet.name === 'Neptune' && 'Neptune dissolves boundaries into transcendent imagination, mystical dreams, and universal empathy.'}
                {activePlanet.name === 'Pluto' && 'Pluto regenerates deep systemic power through psychological underworld transformation.'}
                {activePlanet.name === 'North Node' && 'The North Node indicates the evolutionary destiny axis and collective hunger.'}
                {activePlanet.name === 'Chiron' && 'Chiron bridges wounding and medicine, transforming vulnerability into master healing.'}
              </p>
            </div>

            <p className="text-xs text-slate-400 italic">
              Click any row in the ephemeris table below to focus on another celestial body.
            </p>
          </div>
        )}
      </div>

      {/* Complete Ephemeris Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-serif font-bold text-slate-100 flex items-center gap-2">
            <span>Ephemeris Table</span>
            <span className="text-xs font-sans font-normal text-slate-400 tabular-nums">
              ({positions.length} Celestial Bodies calculated for {selectedDate})
            </span>
          </h3>
          {loading && (
            <span className="text-xs text-amber-300 flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Recalculating...</span>
            </span>
          )}
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Body</th>
                <th className="py-3 px-4">Sign & Degree</th>
                <th className="py-3 px-4">Longitude</th>
                <th className="py-3 px-4">Motion</th>
                <th className="py-3 px-4">Speed / Day</th>
                <th className="py-3 px-4">Ptolemaic Dignity</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200 font-light">
              {positions.map((p) => {
                const isActive = activePlanetName === p.name;
                return (
                  <tr
                    key={p.name}
                    onClick={() => setActivePlanetName(p.name)}
                    className={`transition-colors cursor-pointer hover:bg-slate-800/40 ${
                      isActive ? 'bg-amber-400/10' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-medium flex items-center gap-2">
                      <span className="text-base text-amber-300 font-serif font-bold">{p.symbol}</span>
                      <span className="text-slate-100">{p.name}</span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-100 tabular-nums">
                      {p.formatted}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-300 tabular-nums">
                      {p.longitude.toFixed(2)}°
                    </td>
                    <td className="py-3 px-4">
                      {p.isRetrograde ? (
                        <span className="text-rose-400 font-medium">℞ Retrograde</span>
                      ) : (
                        <span className="text-slate-400">Direct</span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-slate-300">
                      {p.speed > 0 ? `+${p.speed.toFixed(3)}` : p.speed.toFixed(3)}°
                    </td>
                    <td className="py-3 px-4">
                      <span className={getDignityBadge(p.dignity)}>{p.dignity}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePlanetName(p.name);
                        }}
                        className="px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-amber-300 bg-slate-800 rounded border border-slate-700 transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
