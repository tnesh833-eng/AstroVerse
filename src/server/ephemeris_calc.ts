/**
 * AstroVerse Astronomical & Astrological Ephemeris Calculator
 * Calculates celestial longitudes, zodiac signs, degrees, planetary aspects,
 * and birth chart houses (Ascendant, Midheaven, Cusps) using Keplerian approximations.
 */

export interface PlanetaryPosition {
  name: string;
  symbol: string;
  longitude: number; // 0 - 360
  sign: string;
  signDegree: number; // 0 - 30
  formatted: string;
  speed: number;
  isRetrograde: boolean;
  dignity: string;
  element: string;
  house?: number;
}

export interface Aspect {
  planet1: string;
  planet2: string;
  aspectType: 'Conjunction' | 'Sextile' | 'Square' | 'Trine' | 'Opposition';
  angle: number;
  exactAngle: number;
  orb: number;
  nature: 'Harmonious' | 'Dynamic / Friction' | 'Conjunctive' | 'Polar';
}

export interface BirthChartResult {
  birthData: {
    dateTime: string;
    latitude: number;
    longitude: number;
    locationName?: string;
  };
  ascendant: {
    sign: string;
    degree: number;
    formatted: string;
    element: string;
  };
  midheaven: {
    sign: string;
    degree: number;
    formatted: string;
  };
  planets: PlanetaryPosition[];
  houses: { houseNumber: number; sign: string; cuspDegree: number; formatted: string }[];
  aspects: Aspect[];
  elementDistribution: { fire: number; earth: number; air: number; water: number };
  modalityDistribution: { cardinal: number; fixed: number; mutable: number };
}

const ZODIAC_SIGNS = [
  { name: 'Aries', symbol: '♈', element: 'Fire', modality: 'Cardinal', ruler: 'Mars' },
  { name: 'Taurus', symbol: '♉', element: 'Earth', modality: 'Fixed', ruler: 'Venus' },
  { name: 'Gemini', symbol: '♊', element: 'Air', modality: 'Mutable', ruler: 'Mercury' },
  { name: 'Cancer', symbol: '♋', element: 'Water', modality: 'Cardinal', ruler: 'The Moon' },
  { name: 'Leo', symbol: '♌', element: 'Fire', modality: 'Fixed', ruler: 'The Sun' },
  { name: 'Virgo', symbol: '♍', element: 'Earth', modality: 'Mutable', ruler: 'Mercury' },
  { name: 'Libra', symbol: '♎', element: 'Air', modality: 'Cardinal', ruler: 'Venus' },
  { name: 'Scorpio', symbol: '♏', element: 'Water', modality: 'Fixed', ruler: 'Mars' },
  { name: 'Sagittarius', symbol: '♐', element: 'Fire', modality: 'Mutable', ruler: 'Jupiter' },
  { name: 'Capricorn', symbol: '♑', element: 'Earth', modality: 'Cardinal', ruler: 'Saturn' },
  { name: 'Aquarius', symbol: '♒', element: 'Air', modality: 'Fixed', ruler: 'Saturn' },
  { name: 'Pisces', symbol: '♓', element: 'Water', modality: 'Mutable', ruler: 'Jupiter' },
];

export function getZodiacFromLongitude(deg: number): { sign: string; signDegree: number; formatted: string; element: string; symbol: string } {
  let normalized = deg % 360;
  if (normalized < 0) normalized += 360;

  const signIndex = Math.floor(normalized / 30);
  const signDegree = normalized % 30;
  const wholeDeg = Math.floor(signDegree);
  const mins = Math.floor((signDegree - wholeDeg) * 60);

  const signInfo = ZODIAC_SIGNS[signIndex] || ZODIAC_SIGNS[0];
  const formatted = `${wholeDeg.toString().padStart(2, '0')}°${mins.toString().padStart(2, '0')}' ${signInfo.name}`;

  return {
    sign: signInfo.name,
    signDegree,
    formatted,
    element: signInfo.element,
    symbol: signInfo.symbol
  };
}

// Convert Date to Julian Day Number
export function getJulianDay(date: Date): number {
  return (date.getTime() / 86400000) + 2440587.5;
}

// Calculate Planetary Positions for a specific date
export function calculateEphemeris(date: Date): PlanetaryPosition[] {
  const jd = getJulianDay(date);
  const T = (jd - 2451545.0) / 36525; // Julian centuries from J2000.0
  const d = jd - 2451545.0; // Days from J2000.0

  // 1. Sun
  const L0 = 280.46646 + 36000.76983 * T;
  const M_sun = 357.52911 + 35999.05029 * T;
  const M_sun_rad = (M_sun * Math.PI) / 180;
  const C_sun = (1.914602 - 0.004817 * T) * Math.sin(M_sun_rad) + (0.019993 - 0.000101 * T) * Math.sin(2 * M_sun_rad);
  const sun_true_long = (L0 + C_sun) % 360;

  // 2. Moon (mean elongation, anomalies)
  const L_moon = 218.316 + 13.176396 * d;
  const M_moon = 134.963 + 13.064993 * d;
  const F_moon = 93.272 + 13.229350 * d;
  const moon_long = (L_moon + 6.289 * Math.sin((M_moon * Math.PI) / 180) - 1.274 * Math.sin(((2 * (L_moon - L0) - M_moon) * Math.PI) / 180)) % 360;

  // Approximate Mean Longitudes for Planets
  const mercury_long = (L0 + 48.0 * Math.sin(((M_sun + 80) * Math.PI) / 180) + 7.0 * Math.cos(((3 * d) * Math.PI) / 180)) % 360;
  const venus_long = (L0 + 44.0 * Math.sin(((d * 1.602) * Math.PI) / 180)) % 360;
  const mars_long = (355.43 + 0.524033 * d + 10.6 * Math.sin(((d * 0.524) * Math.PI) / 180)) % 360;
  const jupiter_long = (34.35 + 0.083091 * d + 5.5 * Math.sin(((d * 0.083) * Math.PI) / 180)) % 360;
  const saturn_long = (50.08 + 0.033459 * d + 6.3 * Math.sin(((d * 0.033) * Math.PI) / 180)) % 360;
  const uranus_long = (314.05 + 0.01173 * d + 2.0 * Math.sin(((d * 0.011) * Math.PI) / 180)) % 360;
  const neptune_long = (304.35 + 0.00598 * d + 1.2 * Math.sin(((d * 0.006) * Math.PI) / 180)) % 360;
  const pluto_long = (238.9 + 0.00398 * d) % 360;
  const node_long = (125.04 - 0.05295 * d) % 360; // Retrograde motion
  const chiron_long = (20.5 + 0.0195 * d) % 360;

  const rawBodies = [
    { name: 'Sun', sym: '☉', deg: sun_true_long, spd: 0.985, retro: false },
    { name: 'Moon', sym: '☽', deg: moon_long, spd: 13.176, retro: false },
    { name: 'Mercury', sym: '☿', deg: mercury_long, spd: 1.15, retro: false },
    { name: 'Venus', sym: '♀', deg: venus_long, spd: 1.20, retro: false },
    { name: 'Mars', sym: '♂', deg: mars_long, spd: 0.524, retro: false },
    { name: 'Jupiter', sym: '♃', deg: jupiter_long, spd: 0.083, retro: false },
    { name: 'Saturn', sym: '♄', deg: saturn_long, spd: 0.033, retro: false },
    { name: 'Uranus', sym: '♅', deg: uranus_long, spd: 0.011, retro: false },
    { name: 'Neptune', sym: '♆', deg: neptune_long, spd: 0.006, retro: false },
    { name: 'Pluto', sym: '♇', deg: pluto_long, spd: 0.004, retro: false },
    { name: 'North Node', sym: '☊', deg: node_long, spd: -0.053, retro: true },
    { name: 'Chiron', sym: '⚷', deg: chiron_long, spd: 0.02, retro: false },
  ];

  return rawBodies.map((b) => {
    let norm = b.deg % 360;
    if (norm < 0) norm += 360;
    const zod = getZodiacFromLongitude(norm);

    // Calculate Traditional Dignity
    let dignity = 'Peregrine';
    if (b.name === 'Sun') {
      if (zod.sign === 'Leo') dignity = 'Domicile';
      else if (zod.sign === 'Aries') dignity = 'Exaltation';
      else if (zod.sign === 'Aquarius') dignity = 'Detriment';
      else if (zod.sign === 'Libra') dignity = 'Fall';
    } else if (b.name === 'Moon') {
      if (zod.sign === 'Cancer') dignity = 'Domicile';
      else if (zod.sign === 'Taurus') dignity = 'Exaltation';
      else if (zod.sign === 'Capricorn') dignity = 'Detriment';
      else if (zod.sign === 'Scorpio') dignity = 'Fall';
    } else if (b.name === 'Venus') {
      if (zod.sign === 'Taurus' || zod.sign === 'Libra') dignity = 'Domicile';
      else if (zod.sign === 'Pisces') dignity = 'Exaltation';
      else if (zod.sign === 'Scorpio' || zod.sign === 'Aries') dignity = 'Detriment';
      else if (zod.sign === 'Virgo') dignity = 'Fall';
    } else if (b.name === 'Mars') {
      if (zod.sign === 'Aries' || zod.sign === 'Scorpio') dignity = 'Domicile';
      else if (zod.sign === 'Capricorn') dignity = 'Exaltation';
      else if (zod.sign === 'Libra' || zod.sign === 'Taurus') dignity = 'Detriment';
      else if (zod.sign === 'Cancer') dignity = 'Fall';
    } else if (b.name === 'Jupiter') {
      if (zod.sign === 'Sagittarius' || zod.sign === 'Pisces') dignity = 'Domicile';
      else if (zod.sign === 'Cancer') dignity = 'Exaltation';
      else if (zod.sign === 'Gemini' || zod.sign === 'Virgo') dignity = 'Detriment';
      else if (zod.sign === 'Capricorn') dignity = 'Fall';
    } else if (b.name === 'Saturn') {
      if (zod.sign === 'Capricorn' || zod.sign === 'Aquarius') dignity = 'Domicile';
      else if (zod.sign === 'Libra') dignity = 'Exaltation';
      else if (zod.sign === 'Cancer' || zod.sign === 'Leo') dignity = 'Detriment';
      else if (zod.sign === 'Aries') dignity = 'Fall';
    }

    return {
      name: b.name,
      symbol: b.sym,
      longitude: norm,
      sign: zod.sign,
      signDegree: zod.signDegree,
      formatted: zod.formatted,
      speed: b.spd,
      isRetrograde: b.retro,
      dignity,
      element: zod.element,
    };
  });
}

// Compute Geometric Aspects between planets
export function calculateAspects(planets: PlanetaryPosition[]): Aspect[] {
  const aspects: Aspect[] = [];
  const ASPECT_DEFS: { type: Aspect['aspectType']; target: number; maxOrb: number; nature: Aspect['nature'] }[] = [
    { type: 'Conjunction', target: 0, maxOrb: 8, nature: 'Conjunctive' },
    { type: 'Sextile', target: 60, maxOrb: 6, nature: 'Harmonious' },
    { type: 'Square', target: 90, maxOrb: 7, nature: 'Dynamic / Friction' },
    { type: 'Trine', target: 120, maxOrb: 8, nature: 'Harmonious' },
    { type: 'Opposition', target: 180, maxOrb: 8, nature: 'Polar' },
  ];

  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const p1 = planets[i];
      const p2 = planets[j];

      let diff = Math.abs(p1.longitude - p2.longitude);
      if (diff > 180) diff = 360 - diff;

      for (const def of ASPECT_DEFS) {
        const orb = Math.abs(diff - def.target);
        if (orb <= def.maxOrb) {
          aspects.push({
            planet1: p1.name,
            planet2: p2.name,
            aspectType: def.type,
            angle: Math.round(diff * 10) / 10,
            exactAngle: def.target,
            orb: Math.round(orb * 10) / 10,
            nature: def.nature,
          });
          break;
        }
      }
    }
  }

  return aspects;
}

// Compute Complete Birth Chart (Houses, Ascendant, Midheaven, Planets, Aspects)
export function calculateBirthChart(dateTimeStr: string, lat: number, lon: number, locationName?: string): BirthChartResult {
  const birthDate = new Date(dateTimeStr);
  const planets = calculateEphemeris(birthDate);

  // Compute Local Sidereal Time (LST)
  const jd = getJulianDay(birthDate);
  const d = jd - 2451545.0;
  const hours = birthDate.getUTCHours() + birthDate.getUTCMinutes() / 60 + birthDate.getUTCSeconds() / 3600;

  // Greenwich Mean Sidereal Time in degrees
  let gmst = (280.46061837 + 360.98564736629 * d + 0.000387933 * Math.pow(d / 36525, 2)) % 360;
  if (gmst < 0) gmst += 360;

  // Local Sidereal Time
  let lstDeg = (gmst + lon) % 360;
  if (lstDeg < 0) lstDeg += 360;
  const lstRad = (lstDeg * Math.PI) / 180;
  const latRad = (lat * Math.PI) / 180;
  const obliquityRad = (23.4392911 * Math.PI) / 180;

  // Ascendant Calculation
  const y = -Math.cos(lstRad);
  const x = Math.sin(lstRad) * Math.cos(obliquityRad) + Math.tan(latRad) * Math.sin(obliquityRad);
  let ascRad = Math.atan2(y, x);
  let ascDeg = (ascRad * 180) / Math.PI;
  if (ascDeg < 0) ascDeg += 360;

  // Midheaven (MC) Calculation
  let mcRad = Math.atan2(Math.sin(lstRad), Math.cos(lstRad) * Math.cos(obliquityRad));
  let mcDeg = (mcRad * 180) / Math.PI;
  if (mcDeg < 0) mcDeg += 360;

  const ascZod = getZodiacFromLongitude(ascDeg);
  const mcZod = getZodiacFromLongitude(mcDeg);

  // Generate 12 Houses (Equal / Whole Sign derived from Ascendant degree)
  const houses: { houseNumber: number; sign: string; cuspDegree: number; formatted: string }[] = [];
  for (let h = 1; h <= 12; h++) {
    const cuspDeg = (ascDeg + (h - 1) * 30) % 360;
    const cuspZod = getZodiacFromLongitude(cuspDeg);
    houses.push({
      houseNumber: h,
      sign: cuspZod.sign,
      cuspDegree: cuspDeg,
      formatted: cuspZod.formatted,
    });
  }

  // Assign each planet to a house
  planets.forEach((p) => {
    let diff = (p.longitude - ascDeg) % 360;
    if (diff < 0) diff += 360;
    p.house = Math.floor(diff / 30) + 1;
  });

  const aspects = calculateAspects(planets);

  // Elements & Modalities Distribution
  const elementDistribution = { fire: 0, earth: 0, air: 0, water: 0 };
  const modalityDistribution = { cardinal: 0, fixed: 0, mutable: 0 };

  planets.slice(0, 10).forEach((p) => {
    const signInfo = ZODIAC_SIGNS.find((s) => s.name === p.sign);
    if (signInfo) {
      if (signInfo.element === 'Fire') elementDistribution.fire++;
      else if (signInfo.element === 'Earth') elementDistribution.earth++;
      else if (signInfo.element === 'Air') elementDistribution.air++;
      else if (signInfo.element === 'Water') elementDistribution.water++;

      if (signInfo.modality === 'Cardinal') modalityDistribution.cardinal++;
      else if (signInfo.modality === 'Fixed') modalityDistribution.fixed++;
      else if (signInfo.modality === 'Mutable') modalityDistribution.mutable++;
    }
  });

  return {
    birthData: {
      dateTime: dateTimeStr,
      latitude: lat,
      longitude: lon,
      locationName,
    },
    ascendant: {
      sign: ascZod.sign,
      degree: ascDeg,
      formatted: ascZod.formatted,
      element: ascZod.element,
    },
    midheaven: {
      sign: mcZod.sign,
      degree: mcDeg,
      formatted: mcZod.formatted,
    },
    planets,
    houses,
    aspects,
    elementDistribution,
    modalityDistribution,
  };
}
