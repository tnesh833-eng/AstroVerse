export type Language = 'en' | 'ta' | 'te' | 'hi';

export interface ZodiacSign {
  id: number;
  sign_key: string;
  name: string;
  symbol: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  modality: 'Cardinal' | 'Fixed' | 'Mutable';
  polarity: string;
  ruling_planet: string;
  secondary_ruler?: string;
  house_ruled: number;
  date_range: string;
  start_month?: number;
  start_day?: number;
  end_month?: number;
  end_day?: number;
  gemstone: string;
  tarot_card: string;
  color: string;
  keywords: string;
  strengths: string;
  challenges: string;
  overview: string;
  love_traits: string;
  career_traits: string;
}

export interface HoroscopeData {
  id?: number;
  sign_key: string;
  period: 'daily' | 'weekly' | 'monthly';
  forecast_date: string;
  overview: string;
  love_forecast: string;
  career_forecast: string;
  wellness_forecast: string;
  lucky_numbers: string;
  lucky_color: string;
  compatible_signs: string;
  celestial_aspect: string;
}

export interface PlanetaryPositionData {
  name: string;
  symbol: string;
  longitude: number;
  sign: string;
  signDegree: number;
  formatted: string;
  speed: number;
  isRetrograde: boolean;
  dignity: string;
  element: string;
  house?: number;
}

export interface AspectData {
  planet1: string;
  planet2: string;
  aspectType: 'Conjunction' | 'Sextile' | 'Square' | 'Trine' | 'Opposition';
  angle: number;
  exactAngle: number;
  orb: number;
  nature: string;
}

export interface BirthChartData {
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
  planets: PlanetaryPositionData[];
  houses: { houseNumber: number; sign: string; cuspDegree: number; formatted: string }[];
  aspects: AspectData[];
  elementDistribution: { fire: number; earth: number; air: number; water: number };
  modalityDistribution: { cardinal: number; fixed: number; mutable: number };
}

export interface TraditionalTopic {
  id: number;
  category: string;
  title: string;
  traditional_name?: string;
  historical_era: string;
  summary: string;
  content: string;
  traditional_rulerships?: string;
  key_principles: string;
}

export interface CompatibilityData {
  sign1_key: string;
  sign2_key: string;
  overall_score: number;
  love_score: number;
  intellect_score: number;
  communication_score: number;
  elemental_dynamic: string;
  synthesis: string;
  advice: string;
}

export interface DbQueryResult {
  columns: string[];
  rows: Record<string, any>[];
  count: number;
  error?: string;
}

export interface DbTableInfo {
  name: string;
  rowCount: number;
  ddl: string;
}

export interface PythonCodeFile {
  filename: string;
  language: string;
  description: string;
  code: string;
}

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  role: 'user' | 'admin';
  sun_sign?: string;
  created_at?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  codeSent?: boolean;
  email?: string;
  devCode?: string;
  user?: UserProfile;
  error?: string;
}
