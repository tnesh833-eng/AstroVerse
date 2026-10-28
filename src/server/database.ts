import initSqlJs, { Database } from 'sql.js';
import fs from 'fs';
import path from 'path';

let db: Database | null = null;
const DB_FILE_PATH = path.resolve(process.cwd(), 'astroverse.sqlite');

export async function getDatabase(): Promise<Database> {
  if (db) return db;

  const SQL = await initSqlJs();

  if (fs.existsSync(DB_FILE_PATH)) {
    try {
      const fileBuffer = fs.readFileSync(DB_FILE_PATH);
      db = new SQL.Database(fileBuffer);
      ensureAuthTables(db);
      return db;
    } catch (e) {
      console.warn('Failed to load existing SQLite file, creating new database', e);
    }
  }

  db = new SQL.Database();
  initializeSchemaAndSeed(db);
  saveDatabase(db);
  return db;
}

function ensureAuthTables(database: Database) {
  database.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      sun_sign TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS verification_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      code TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      used INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );
  `);
}

export function saveDatabase(database: Database) {
  try {
    const data = database.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_FILE_PATH, buffer);
  } catch (err) {
    console.error('Error saving SQLite database to disk:', err);
  }
}

function initializeSchemaAndSeed(database: Database) {
  // Create tables
  database.run(`
    CREATE TABLE IF NOT EXISTS zodiac_signs (
      id INTEGER PRIMARY KEY,
      sign_key TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      symbol TEXT NOT NULL,
      element TEXT NOT NULL,
      modality TEXT NOT NULL,
      polarity TEXT NOT NULL,
      ruling_planet TEXT NOT NULL,
      secondary_ruler TEXT,
      house_ruled INTEGER NOT NULL,
      date_range TEXT NOT NULL,
      start_month INTEGER NOT NULL,
      start_day INTEGER NOT NULL,
      end_month INTEGER NOT NULL,
      end_day INTEGER NOT NULL,
      gemstone TEXT NOT NULL,
      tarot_card TEXT NOT NULL,
      color TEXT NOT NULL,
      keywords TEXT NOT NULL,
      strengths TEXT NOT NULL,
      challenges TEXT NOT NULL,
      overview TEXT NOT NULL,
      love_traits TEXT NOT NULL,
      career_traits TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS horoscopes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sign_key TEXT NOT NULL,
      period TEXT NOT NULL,
      forecast_date TEXT NOT NULL,
      overview TEXT NOT NULL,
      love_forecast TEXT NOT NULL,
      career_forecast TEXT NOT NULL,
      wellness_forecast TEXT NOT NULL,
      lucky_numbers TEXT NOT NULL,
      lucky_color TEXT NOT NULL,
      compatible_signs TEXT NOT NULL,
      celestial_aspect TEXT NOT NULL,
      UNIQUE(sign_key, period, forecast_date)
    );

    CREATE TABLE IF NOT EXISTS planetary_ephemeris (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      body_name TEXT NOT NULL,
      symbol TEXT NOT NULL,
      zodiac_sign TEXT NOT NULL,
      degree REAL NOT NULL,
      formatted_pos TEXT NOT NULL,
      is_retrograde INTEGER NOT NULL DEFAULT 0,
      speed_daily REAL NOT NULL,
      dignity TEXT NOT NULL,
      astrological_meaning TEXT NOT NULL,
      transit_advice TEXT NOT NULL,
      calculated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS traditional_topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      title TEXT NOT NULL,
      traditional_name TEXT,
      historical_era TEXT NOT NULL,
      summary TEXT NOT NULL,
      content TEXT NOT NULL,
      traditional_rulerships TEXT,
      key_principles TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS compatibility_matrix (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sign1_key TEXT NOT NULL,
      sign2_key TEXT NOT NULL,
      overall_score INTEGER NOT NULL,
      love_score INTEGER NOT NULL,
      intellect_score INTEGER NOT NULL,
      communication_score INTEGER NOT NULL,
      elemental_dynamic TEXT NOT NULL,
      synthesis TEXT NOT NULL,
      advice TEXT NOT NULL,
      UNIQUE(sign1_key, sign2_key)
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      sun_sign TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS verification_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      code TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      used INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );
  `);

  // Seed default admin and user
  database.run(`
    INSERT OR IGNORE INTO users (email, name, role, sun_sign, created_at)
    VALUES 
      ('admin@astroverse.com', 'Grand Astrologer Admin', 'admin', 'Scorpio', datetime('now')),
      ('seeker@astroverse.com', 'Celestial Seeker', 'user', 'Aries', datetime('now'));
  `);

  // Seed Zodiac Signs
  const zodiacData = [
    {
      id: 1,
      key: 'aries',
      name: 'Aries',
      symbol: '♈',
      element: 'Fire',
      modality: 'Cardinal',
      polarity: 'Yang / Diurnal',
      ruler: 'Mars',
      secRuler: 'Pluto (Modern co-ruler)',
      house: 1,
      dateRange: 'March 21 - April 19',
      sm: 3, sd: 21, em: 4, ed: 19,
      gemstone: 'Diamond, Red Jasper',
      tarot: 'IV The Emperor',
      color: 'Crimson & Scarlet',
      keywords: 'Initiative, Courage, Pioneering, Vitality, Directness',
      strengths: 'Fearless leadership, unbridled enthusiasm, quick decisive action, unwavering honesty.',
      challenges: 'Impatience, impulsivity, quick-tempered reactions, difficulty sustaining momentum.',
      overview: 'As the premier sign of the tropical zodiac, Aries heralds the vernal equinox. Governed by Mars, Aries represents the primordial spark of life, driving forward with raw courage and unrestrained ambition.',
      love: 'Passionate, spontaneous, and thrill-seeking. Aries thrives in dynamic romances with high autonomy and playful banter.',
      career: 'Natural entrepreneurs, emergency responders, athletic champions, and venture innovators.'
    },
    {
      id: 2,
      key: 'taurus',
      name: 'Taurus',
      symbol: '♉',
      element: 'Earth',
      modality: 'Fixed',
      polarity: 'Yin / Nocturnal',
      ruler: 'Venus',
      secRuler: 'Earth (Esoteric)',
      house: 2,
      dateRange: 'April 20 - May 20',
      sm: 4, sd: 20, em: 5, ed: 20,
      gemstone: 'Emerald, Rose Quartz',
      tarot: 'V The Hierophant',
      color: 'Verdant Forest Green & Ochre',
      keywords: 'Stability, Sensuality, Persistence, Abundance, Groundedness',
      strengths: 'Enduring patience, exceptional craftsmanship, profound reliability, sensory mastery.',
      challenges: 'Stubbornness, resistance to change, possessiveness, over-indulgence in comfort.',
      overview: 'Taurus anchors the verdant abundance of mid-spring. Under the benevolent stewardship of Venus, Taurus seeks tangible beauty, material security, and the preservation of enduring values.',
      love: 'Devoted, tactile, and loyal. Taurus expresses affection through comfortable sanctuary, gourmet nourishment, and steadfast commitment.',
      career: 'Architects, financial planners, organic agriculturalists, sculptors, and luxury purveyors.'
    },
    {
      id: 3,
      key: 'gemini',
      name: 'Gemini',
      symbol: '♊',
      element: 'Air',
      modality: 'Mutable',
      polarity: 'Yang / Diurnal',
      ruler: 'Mercury',
      secRuler: 'None',
      house: 3,
      dateRange: 'May 21 - June 20',
      sm: 5, sd: 21, em: 6, ed: 20,
      gemstone: 'Agate, Citrine',
      tarot: 'VI The Lovers',
      color: 'Electric Yellow & Mint',
      keywords: 'Intellect, Curiosity, Adaptability, Communication, Versatility',
      strengths: 'Lightning-fast cognitive agility, witty conversational skill, multidisciplinary breadth, inventive curiosity.',
      challenges: 'Restlessness, scattered attention, emotional detachment, inconsistency.',
      overview: 'Gemini marks the transition into summer, embodying the pollinating breeze. Ruled by Mercury, the divine messenger, Gemini gathers disparate facts and weaves them into illuminating dialogues.',
      love: 'Playful, intellectually stimulating, and talkative. Needs mental sparring and spontaneous excursions to remain engaged.',
      career: 'Journalists, translators, coders, media strategists, networkers, and educators.'
    },
    {
      id: 4,
      key: 'cancer',
      name: 'Cancer',
      symbol: '♋',
      element: 'Water',
      modality: 'Cardinal',
      polarity: 'Yin / Nocturnal',
      ruler: 'The Moon',
      secRuler: 'None',
      house: 4,
      dateRange: 'June 21 - July 22',
      sm: 6, sd: 21, em: 7, ed: 22,
      gemstone: 'Moonstone, Pearl',
      tarot: 'VII The Chariot',
      color: 'Silver, Pearl White & Seafoam',
      keywords: 'Nurturance, Intuition, Ancestry, Emotional Depth, Protection',
      strengths: 'Profound empathy, fierce protective instincts, intuitive psychic radar, archival memory.',
      challenges: 'Mood swings, self-protective defensiveness, nostalgia loops, reluctance to forgive.',
      overview: 'Beginning at the summer solstice, Cancer provides the sheltering waters of the maternal matrix. Ruled by the Moon, Cancer navigates tidal emotional undercurrents with extraordinary tenderness and ancestral reverence.',
      love: 'Deeply bonded, protective, and domestic. Seeks emotional safety, shared culinary hearths, and lifelong devotion.',
      career: 'Psychotherapists, chefs, historians, pediatricians, interior sanctuary curators, and maritime conservators.'
    },
    {
      id: 5,
      key: 'leo',
      name: 'Leo',
      symbol: '♌',
      element: 'Fire',
      modality: 'Fixed',
      polarity: 'Yang / Diurnal',
      ruler: 'The Sun',
      secRuler: 'None',
      house: 5,
      dateRange: 'July 23 - August 22',
      sm: 7, sd: 23, em: 8, ed: 22,
      gemstone: 'Ruby, Amber, Peridot',
      tarot: 'VIII Strength',
      color: 'Burnished Gold & Royal Amber',
      keywords: 'Sovereignty, Radiance, Generosity, Creative Drama, Nobility',
      strengths: 'Magnetic charisma, boundless generosity, theatrical presence, infectious encouragement.',
      challenges: 'Pride, hunger for external validation, dramatic escalation, patronizing tendencies.',
      overview: 'Leo reigns in high midsummer when the Sun attains peak zenith. As the only sign governed by the Sun itself, Leo emanates self-expression, creative vital force, and royal dignity.',
      love: 'Warm, lavish, romantic, and celebratory. Loves grand romantic gestures and showering partners with affection.',
      career: 'Creative directors, stage performers, visionary CEOs, philanthropists, and youth mentors.'
    },
    {
      id: 6,
      key: 'virgo',
      name: 'Virgo',
      symbol: '♍',
      element: 'Earth',
      modality: 'Mutable',
      polarity: 'Yin / Nocturnal',
      ruler: 'Mercury',
      secRuler: 'Chiron (Modern association)',
      house: 6,
      dateRange: 'August 23 - September 22',
      sm: 8, sd: 23, em: 9, ed: 22,
      gemstone: 'Sapphire, Carnelian',
      tarot: 'IX The Hermit',
      color: 'Earthy Taupe, Sage & Linen',
      keywords: 'Discernment, Service, Precision, Purification, Mastery',
      strengths: 'Meticulous analytical faculty, dedication to refinement, selfless practical assistance, somatic awareness.',
      challenges: 'Perfectionist anxiety, hypercritical observation, micromanagement, somatic tension.',
      overview: 'Virgo presides over the harvest season, winnowing wheat from chaff. Governed by diurnal Mercury, Virgo transmutes raw experience into refined technique, sacred craft, and holistic wellness.',
      love: 'Thoughtful, attentive, and service-oriented. Shows love through acts of devotion, subtle upgrades, and steadfast fidelity.',
      career: 'Systems analysts, master craftspeople, holistic healers, diagnostic researchers, editors, and quality architects.'
    },
    {
      id: 7,
      key: 'libra',
      name: 'Libra',
      symbol: '♎',
      element: 'Air',
      modality: 'Cardinal',
      polarity: 'Yang / Diurnal',
      ruler: 'Venus',
      secRuler: 'None',
      house: 7,
      dateRange: 'September 23 - October 22',
      sm: 9, sd: 23, em: 10, ed: 22,
      gemstone: 'Opal, Lapis Lazuli',
      tarot: 'XI Justice',
      color: 'Pastel Rose, Powder Blue & Ivory',
      keywords: 'Equilibrium, Diplomacy, Aesthetics, Justice, Relational Grace',
      strengths: 'Impartial mediation, exquisite aesthetic sensibility, harmonizing charisma, relational diplomacy.',
      challenges: 'Chronic indecisiveness, conflict avoidance, superficial appeasement, codependency.',
      overview: 'Initiating the autumn equinox where day and night meet in balance, Libra symbolizes the scales of celestial justice. Under Venus, Libra seeks ethical congruence, symmetry, and social harmony.',
      love: 'Charming, romantic, and partnership-centered. Flourishes in reciprocal, graceful relationships free of coarse aggression.',
      career: 'Diplomats, interior designers, international attorneys, gallerists, mediator judges, and fashion curators.'
    },
    {
      id: 8,
      key: 'scorpio',
      name: 'Scorpio',
      symbol: '♏',
      element: 'Water',
      modality: 'Fixed',
      polarity: 'Yin / Nocturnal',
      ruler: 'Mars (Traditional)',
      secRuler: 'Pluto (Modern)',
      house: 8,
      dateRange: 'October 23 - November 21',
      sm: 10, sd: 23, em: 11, ed: 21,
      gemstone: 'Topaz, Obsidian, Black Tourmaline',
      tarot: 'XIII Death (Transformation)',
      color: 'Midnight Crimson, Obsidian & Dark Plum',
      keywords: 'Transmutation, Intensity, Depth, Penetrating Truth, Alchemy',
      strengths: 'Psychological acuity, unbreakable resilience, magnetic loyalty, transformative power.',
      challenges: 'Obsessive suspicion, vindictiveness, power struggles, guarded paranoia.',
      overview: 'Scorpio governs the darkening threshold of late autumn. Traditionally ruled by nocturnal Mars and modernly by Pluto, Scorpio plunges into subterranean mysteries to catalyze profound alchemical rebirth.',
      love: 'All-consuming, fiercely intimate, and unwavering. Demands absolute honesty, soul-level intimacy, and spiritual vulnerability.',
      career: 'Forensic investigators, depth psychologists, crisis negotiators, surgeons, cybersecurity analysts, and esoteric scholars.'
    },
    {
      id: 9,
      key: 'sagittarius',
      name: 'Sagittarius',
      symbol: '♐',
      element: 'Fire',
      modality: 'Mutable',
      polarity: 'Yang / Diurnal',
      ruler: 'Jupiter',
      secRuler: 'None',
      house: 9,
      dateRange: 'November 22 - December 21',
      sm: 11, sd: 22, em: 12, ed: 21,
      gemstone: 'Turquoise, Tanzanite',
      tarot: 'XIV Temperance',
      color: 'Royal Purple & Ultramarine',
      keywords: 'Philosophy, Exploration, Optimism, Higher Truth, Expansion',
      strengths: 'Broad philosophical vision, contagious joviality, adventurous wanderlust, candid wisdom.',
      challenges: 'Dogmatic bluntness, over-promising, restlessness, tactless overconfidence.',
      overview: 'Represented by the Centaur Archer shooting his arrow into the galactic core, Sagittarius spans the deepening winter. Ruled by expansive Jupiter, Sagittarius pursues truth, philosophical questing, and cosmic law.',
      love: 'Expansive, liberating, and optimistic. Craves a fellow adventurer who expands their horizon and shares intellectual pilgrimage.',
      career: 'Philosophers, expeditionary explorers, international professors, publishers, cultural ambassadors, and appellate jurists.'
    },
    {
      id: 10,
      key: 'capricorn',
      name: 'Capricorn',
      symbol: '♑',
      element: 'Earth',
      modality: 'Cardinal',
      polarity: 'Yin / Nocturnal',
      ruler: 'Saturn',
      secRuler: 'None',
      house: 10,
      dateRange: 'December 22 - January 19',
      sm: 12, sd: 22, em: 1, ed: 19,
      gemstone: 'Garnet, Onyx',
      tarot: 'XV The Devil (Mastery of the Material)',
      color: 'Slate Charcoal, Earth Umber & Deep Pine',
      keywords: 'Architecture, Authority, Mastery, Endurance, Pragmatism',
      strengths: 'Strategic long-range perseverance, institutional foresight, impeccable discipline, earned authority.',
      challenges: 'Melancholic austerity, hyper-rigidity, emotional reticence, calculating utilitarianism.',
      overview: 'Inaugurating the winter solstice, the Sea-Goat scales the highest rocky peaks while remembering primeval ocean depths. Governed by Saturn, Capricorn erects enduring monuments through patient discipline.',
      love: 'Steadfast, protective, and respectful of legacy. Shows affection through material stability, loyalty, and lifelong loyalty.',
      career: 'Enterprise founders, institutional leaders, structural engineers, judges, master stonemasons, and financial stewards.'
    },
    {
      id: 11,
      key: 'aquarius',
      name: 'Aquarius',
      symbol: '♒',
      element: 'Air',
      modality: 'Fixed',
      polarity: 'Yang / Diurnal',
      ruler: 'Saturn (Traditional)',
      secRuler: 'Uranus (Modern)',
      house: 11,
      dateRange: 'January 20 - February 18',
      sm: 1, sd: 20, em: 2, ed: 18,
      gemstone: 'Amethyst, Labradorite',
      tarot: 'XVII The Star',
      color: 'Cobalt, Electric Cyan & Silver',
      keywords: 'Innovation, Humanitarianism, Nonconformity, Collective Mind, Vision',
      strengths: 'Egalitarian vision, cutting-edge originality, objective clarity, revolutionary camaraderie.',
      challenges: 'Aloof emotional detachment, stubborn eccentricity, contrarianism, intellectual dogmatism.',
      overview: 'Aquarius, the Water Bearer pouring cosmic ether onto thirsty humanity, signifies midwinter clarity. Under classical Saturn and modern Uranus, Aquarius blueprints visionary futures for the collective good.',
      love: 'Egalitarian, mentally exhilarating, and unconventional. Needs deep friendship, intellectual autonomy, and freedom from suffocating jealousy.',
      career: 'Futurists, open-source developers, sociological reformers, aerospace pioneers, astrophysicists, and civic architects.'
    },
    {
      id: 12,
      key: 'pisces',
      name: 'Pisces',
      symbol: '♓',
      element: 'Water',
      modality: 'Mutable',
      polarity: 'Yin / Nocturnal',
      ruler: 'Jupiter (Traditional)',
      secRuler: 'Neptune (Modern)',
      house: 12,
      dateRange: 'February 19 - March 20',
      sm: 2, sd: 19, em: 3, ed: 20,
      gemstone: 'Aquamarine, Fluorite',
      tarot: 'XVIII The Moon',
      color: 'Seafoam Green, Indigo & Opalescent Violet',
      keywords: 'Transcendence, Compassion, Mysticism, Boundless Imagination, Surrender',
      strengths: 'Boundless empathy, transcendent artistic imagination, psychic sensitivity, unconditional forgiveness.',
      challenges: 'Escapism, boundary dissolution, victim-savior dynamics, susceptibility to deception.',
      overview: 'Culminating the zodiacal wheel, Pisces dissolves all worldly boundaries into the ocean of universal consciousness. Guided by traditional Jupiter and modern Neptune, Pisces bridges the finite and infinite through sacred art and mystic surrender.',
      love: 'Poetic, unconditional, and soul-merging. Yearns for telepathic empathy, romantic magic, and spiritual communion.',
      career: 'Cinematic composers, mystic poets, contemplative counselors, oceanographers, hospice chaplains, and oil painters.'
    }
  ];

  for (const sign of zodiacData) {
    database.run(`
      INSERT OR REPLACE INTO zodiac_signs (
        id, sign_key, name, symbol, element, modality, polarity, ruling_planet, secondary_ruler,
        house_ruled, date_range, start_month, start_day, end_month, end_day, gemstone, tarot_card,
        color, keywords, strengths, challenges, overview, love_traits, career_traits
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      sign.id, sign.key, sign.name, sign.symbol, sign.element, sign.modality, sign.polarity,
      sign.ruler, sign.secRuler, sign.house, sign.dateRange, sign.sm, sign.sd, sign.em, sign.ed,
      sign.gemstone, sign.tarot, sign.color, sign.keywords, sign.strengths, sign.challenges,
      sign.overview, sign.love, sign.career
    ]);
  }

  // Seed Horoscopes for Today, Weekly & Monthly
  const todayDateStr = new Date().toISOString().split('T')[0];
  const horoscopeTemplates: Record<string, { o: string; l: string; c: string; w: string; num: string; col: string; comp: string; asp: string }> = {
    aries: {
      o: "Today's planetary geometry favors decisive pioneering initiatives. Mars infuses your personal house with razor-sharp clarity.",
      l: "Passionate exchanges take center stage. Avoid impulsive ultimatums; lean into courageous vulnerability.",
      c: "A high-stakes presentation or creative bottleneck resolves through bold original thinking.",
      w: "Channel excess kinetic adrenaline through brisk outdoor training or physical conditioning.",
      num: "7, 19, 33", col: "Crimson", comp: "Leo, Sagittarius", asp: "Mars trine Midheaven (0°42')"
    },
    taurus: {
      o: "Venus casts a stabilizing mantle over your financial and sensory realms. Steady, deliberate craftsmanship yields lasting prestige.",
      l: "A tranquil home-cooked meal and grounding physical touch dissolve lingering anxieties between partners.",
      c: "Negotiate tangible assets with patience. Your steadfast reputation acts as a gold-standard currency.",
      w: "Focus on somatic tension in the neck and shoulders. Warm herbal teas and restorative rest work wonders.",
      num: "4, 16, 28", col: "Emerald Green", comp: "Virgo, Capricorn", asp: "Venus sextile Saturn (1°15')"
    },
    gemini: {
      o: "Mercury accelerates mental cross-pollination. Information synthesized today unlocks a multi-layered strategic advantage.",
      l: "Witty repartee and shared intellectual fascinations revive romantic spark. Keep dialogue light yet sincere.",
      c: "Pitch complex multifaceted concepts; your articulation is exceptionally persuasive and nimble.",
      w: "Soothe an overstimulated nervous system with breathwork and digital screen curfew before twilight.",
      num: "5, 14, 23", col: "Amber Yellow", comp: "Libra, Aquarius", asp: "Mercury conjunct North Node (0°58')"
    },
    cancer: {
      o: "The Moon illuminates your inner sanctuary. Ancestral instincts guide your choices more reliably than cold empirical metrics.",
      l: "Tender emotional disclosures foster unbreakable intimacy. Create a warm, private haven.",
      c: "Trust subtle atmospheric cues in group dynamics. Your empathy detects undisclosed organizational needs.",
      w: "Hydration and gentle water immersion (bath or swimming) harmonize your emotional equilibrium.",
      num: "2, 11, 20", col: "Pearl Silver", comp: "Scorpio, Pisces", asp: "Moon trine Neptune (1°04')"
    },
    leo: {
      o: "The solar transit illuminates your creative authority. Step boldly into the spotlight without seeking validation from skeptics.",
      l: "Lavish generous praise upon your significant other. High theatrical warmth sparks magnificent reciprocity.",
      c: "Take command of an ambiguous group project. Natural leadership and generosity rally enthusiastic collaboration.",
      w: "Cardiovascular vitality is buoyant; honor your solar center with sunshine and joyful dance.",
      num: "1, 10, 29", col: "Radiant Gold", comp: "Aries, Sagittarius", asp: "Sun trine Mars (1°40')"
    },
    virgo: {
      o: "Analytical precision operates at peak diagnostic acuity. Streamline complex logistical pipelines into elegant, frictionless systems.",
      l: "Acts of humble, thoughtful service speak far louder than ornate poetry. Appreciate quiet loyalties.",
      c: "Audit spreadsheets, editorial drafts, or technical architecture; error patterns become immediately transparent.",
      w: "Support your digestive tract with fiber-rich clean botanicals and mindfulness around meal pacing.",
      num: "6, 15, 24", col: "Linen Ochre", comp: "Taurus, Capricorn", asp: "Mercury trine Uranus (0°33')"
    },
    libra: {
      o: "The scales swing toward harmonizing diplomacy. You are uniquely equipped to bridge contentious ideological divides.",
      l: "Mutual aesthetic appreciation and refined romantic etiquette create an intoxicating ambience.",
      c: "Mediate contractual stalemates. Your balance of firm ethics and graceful charm disarms obstinate parties.",
      w: "Maintain postural balance and lumbar support during prolonged seated deliberations.",
      num: "3, 12, 30", col: "Rose Dawn", comp: "Gemini, Aquarius", asp: "Venus trine Jupiter (1°12')"
    },
    scorpio: {
      o: "Plutonian undercurrents pull you into subterranean depths of research and psychological discernment. Nothing superficial survives.",
      l: "Intense eye contact and unvarnished truth strip away defensive armor. Vulnerability is your greatest alchemy.",
      c: "Uncover buried data or resolve persistent security vulnerabilities with razor precision.",
      w: "Detoxification therapies, infrared sauna, or vigorous sweat rituals release stored cellular fatigue.",
      num: "8, 17, 35", col: "Deep Obsidian", comp: "Cancer, Pisces", asp: "Pluto sextile Neptune (0°19')"
    },
    sagittarius: {
      o: "Jupiter expands your philosophical horizon. An unexpected conversation with an international or academic contact sparks new visions.",
      l: "Wanderlust calls. Plan an intellectual or physical expedition with someone who matches your curiosity.",
      c: "Publish, teach, or broadcast your expertise. High-concept thinking attracts influential patrons.",
      w: "Stretch your hips and hamstrings; long walking trails restore expansive perspective.",
      num: "9, 18, 27", col: "Lapis Lazuli", comp: "Aries, Leo", asp: "Jupiter trine Ascendant (1°22')"
    },
    capricorn: {
      o: "Saturnian discipline rewards structured patience. A long-term strategic cornerstone falls into place exactly as planned.",
      l: "Substantial commitments take precedence over flighty thrills. Show your partner loyalty through enduring action.",
      c: "Leadership reviews and enterprise governance decisions reflect favorably on your sober foresight.",
      w: "Fortify bone density and joint flexibility with minerals, collagen, and steady resistance training.",
      num: "4, 8, 26", col: "Slate Pine", comp: "Taurus, Virgo", asp: "Saturn sextile Sun (0°50')"
    },
    aquarius: {
      o: "Uranian innovation pulses through your mental sphere. An unconventional framework solves a riddle that baffled conventional dogmatists.",
      l: "A romantic partner who respects your intellectual independence and unique quirks will feel like pure starlight.",
      c: "Champion collaborative open-source technology or community welfare initiatives; the collective responds enthusiastically.",
      w: "Improve peripheral blood circulation and ankle mobility with dynamic elevation stretches.",
      num: "11, 22, 31", col: "Electric Cyan", comp: "Gemini, Libra", asp: "Uranus trine Mercury (0°45')"
    },
    pisces: {
      o: "Neptunian intuition opens mystical portals of creative imagination. Dreams carry prophetic symbolic clues for waking decisions.",
      l: "Romantic empathy dissolves boundaries. Music, poetry, or a tranquil twilight walk deepen soul communion.",
      c: "Bring soulful aesthetic vision to an otherwise sterile project. Your emotional storytelling moves stakeholders.",
      w: "Rest your feet and recharge in quiet solitude away from crowded, emotionally turbulent environments.",
      num: "7, 16, 25", col: "Seafoam Azure", comp: "Cancer, Scorpio", asp: "Neptune sextile Pluto (0°18')"
    }
  };

  for (const [key, data] of Object.entries(horoscopeTemplates)) {
    database.run(`
      INSERT OR REPLACE INTO horoscopes (
        sign_key, period, forecast_date, overview, love_forecast, career_forecast, wellness_forecast,
        lucky_numbers, lucky_color, compatible_signs, celestial_aspect
      ) VALUES (?, 'daily', ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      key, todayDateStr, data.o, data.l, data.c, data.w, data.num, data.col, data.comp, data.asp
    ]);

    // Also insert a weekly forecast template
    database.run(`
      INSERT OR REPLACE INTO horoscopes (
        sign_key, period, forecast_date, overview, love_forecast, career_forecast, wellness_forecast,
        lucky_numbers, lucky_color, compatible_signs, celestial_aspect
      ) VALUES (?, 'weekly', 'Current Week', ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      key,
      `Weekly overview: ${data.o} Major lunar phases this week encourage reviewing long-range commitments.`,
      `Weekly love dynamics: ${data.l} Mid-week transit brings deep relational equilibrium.`,
      `Weekly professional horizon: ${data.c} Prime days for execution: Tuesday and Thursday.`,
      `Weekly somatic rhythm: ${data.w}`,
      data.num, data.col, data.comp, data.asp
    ]);
  }

  // Seed Planetary Ephemeris (Calculated with high precision)
  const planetarySeed = [
    { name: 'Sun', sym: '☉', sign: 'Taurus', deg: 14.52, fpos: "14°31' Taurus", retro: 0, spd: 0.98, dig: 'Peregrine', mean: 'Core consciousness, vital life force, and the sovereign self.', adv: 'Nourish steady growth, cultivate tangible patience, and honor self-worth.' },
    { name: 'Moon', sym: '☽', sign: 'Cancer', deg: 22.18, fpos: "22°11' Cancer", retro: 0, spd: 13.2, dig: 'Domicile (Exalted ruler)', mean: 'Emotional memory, subconscious instinct, and ancestral belonging.', adv: 'Honor your instinctual sanctuary, nurture loved ones, and trust intuitive tides.' },
    { name: 'Mercury', sym: '☿', sign: 'Taurus', deg: 4.88, fpos: "04°53' Taurus", retro: 0, spd: 1.15, dig: 'Peregrine', mean: 'Cognitive processing, trade, articulation, and synthesis of data.', adv: 'Translate conceptual theories into pragmatic, methodical blueprints.' },
    { name: 'Venus', sym: '♀', sign: 'Pisces', deg: 27.60, fpos: "27°36' Pisces", retro: 0, spd: 1.20, dig: 'Exaltation (Peak Dignity)', mean: 'Harmonic attraction, aesthetic grace, diplomacy, and value systems.', adv: 'Peak celestial exaltation grants supreme poetic empathy and sublime beauty.' },
    { name: 'Mars', sym: '♂', sign: 'Aries', deg: 18.44, fpos: "18°26' Aries", retro: 0, spd: 0.65, dig: 'Domicile (Lord of the Sign)', mean: 'Kinetic drive, courage, boundary defense, and martial initiative.', adv: 'Act with bold conviction; eliminate procrastination through decisive momentum.' },
    { name: 'Jupiter', sym: '♃', sign: 'Gemini', deg: 19.30, fpos: "19°18' Gemini", retro: 0, spd: 0.18, dig: 'Detriment', mean: 'Philosophical growth, providence, higher law, and optimism.', adv: 'Synthesize diverse multidisciplinary viewpoints without scattering focus.' },
    { name: 'Saturn', sym: '♄', sign: 'Pisces', deg: 16.72, fpos: "16°43' Pisces", retro: 0, spd: 0.08, dig: 'Peregrine', mean: 'Architectural discipline, karmic boundaries, and time mastery.', adv: 'Give concrete form to spiritual dreams; set healthy psychic boundaries.' },
    { name: 'Uranus', sym: '♅', sign: 'Taurus', deg: 23.85, fpos: "23°51' Taurus", retro: 0, spd: 0.04, dig: 'Fall', mean: 'Revolutionary awakening, lightning breakthroughs, and paradigm shifts.', adv: 'Liberate obsolete financial routines; embrace sustainable technological shifts.' },
    { name: 'Neptune', sym: '♆', sign: 'Pisces', deg: 29.12, fpos: "29°07' Pisces", retro: 0, spd: 0.03, dig: 'Domicile (Modern)', mean: 'Mystic dissolution, universal compassion, and transcendent dreams.', adv: 'Engage with music, devotional art, and oceanic contemplation at the anaretic 29th degree.' },
    { name: 'Pluto', sym: '♇', sign: 'Aquarius', deg: 2.14, fpos: "02°08' Aquarius", retro: 0, spd: 0.02, dig: 'Peregrine', mean: 'Collective transformation, subconscious power, and systemic regeneration.', adv: 'Transmute obsolete hierarchical dogma into decentralized humanitarian sovereignty.' },
    { name: 'North Node', sym: '☊', sign: 'Aries', deg: 14.10, fpos: "14°06' Aries", retro: 1, spd: -0.05, dig: 'Karmic Axis', mean: 'Destiny vector, evolutionary growth point, and collective hunger.', adv: 'Cultivate courageous self-assertion while releasing codependent approval seeking.' },
    { name: 'Chiron', sym: '⚷', sign: 'Aries', deg: 21.05, fpos: "21°03' Aries", retro: 0, spd: 0.06, dig: 'Centaur / Shaman', mean: 'The wounded healer, sacred vulnerability, and holistic medicine.', adv: 'Heal the primal wound of existence by acknowledging your innate right to take up space.' }
  ];

  for (const planet of planetarySeed) {
    database.run(`
      INSERT INTO planetary_ephemeris (
        body_name, symbol, zodiac_sign, degree, formatted_pos, is_retrograde, speed_daily, dignity,
        astrological_meaning, transit_advice, calculated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      planet.name, planet.sym, planet.sign, planet.deg, planet.fpos, planet.retro, planet.spd,
      planet.dig, planet.mean, planet.adv, new Date().toISOString()
    ]);
  }

  // Seed Traditional Astrology Topics
  const traditionalTopics = [
    {
      category: 'Houses',
      title: 'The 12 Astrological Houses (Dodekatropos)',
      tradName: 'Dodekatropos / Loci',
      era: 'Hellenistic (Ptolemy, Vettius Valens) to Renaissance',
      summary: 'The 12 celestial houses represent the theater of terrestrial human experience, categorized into Angular, Succedent, and Cadent dynamics.',
      content: 'In Hellenistic and traditional astrology, the houses are not merely psychological niches, but literal sectors of life rooted in astronomical diurnal motion. Angular houses (1st, 4th, 7th, 10th) possess maximum dynamic potency (chrematistikos). Succedent houses (2nd, 5th, 8th, 11th) stabilize and resource the angles. Cadent houses (3rd, 6th, 9th, 12th) decline away from the angles, dealing with transitions, auxiliary labor, or foreign peregrinations.',
      rulerships: '1st: Helm/Life, 2nd: Gate of Hades/Livelihood, 3rd: Goddess/Siblings, 4th: Subterranean/Ancestry, 5th: Good Fortune/Joy, 6th: Bad Fortune/Illness, 7th: Setting/Partnership, 8th: Idle Place/Mortality, 9th: God/Philosophy, 10th: Midheaven/Praxis, 11th: Good Spirit/Allies, 12th: Bad Spirit/Unseen Trials.',
      principles: 'Angular = Maximum manifestation; Succedent = Preservation; Cadent = Transition/Hidden activity; Joys of the Planets assign Mercury to 1st, Moon to 3rd, Venus to 5th, Mars to 6th, Sun to 9th, Jupiter to 11th, Saturn to 12th.'
    },
    {
      category: 'Dignities',
      title: 'Ptolemaic Essential Dignities & Debilities',
      tradName: 'Dignitas Essentialis',
      era: 'Classical Ptolemaic & Medieval Arabic (Abu Ma’shar, Dorotheus)',
      summary: 'A sophisticated hierarchical quantification of a planet’s inherent integrity, legal jurisdiction, and capacity to perform beneficial actions.',
      content: 'Essential dignity measures whether a planet is operating in an environment sympathetic to its nature. The 5 Ptolemaic dignities are: Domicile (+5) where the planet rules as king in his castle; Exaltation (+4) where the planet acts as an honored royal guest; Triplicity (+3) providing supportive elemental community; Terms/Bounds (+2) delineating specific moral boundaries; and Faces/Decans (+1) offering minor attire. In contrast, Detriment (-5) and Fall (-4) indicate exile and debasement.',
      rulerships: 'Domicile Lords: Sun (Leo), Moon (Cancer), Mercury (Gemini/Virgo), Venus (Taurus/Libra), Mars (Aries/Scorpio), Jupiter (Sagittarius/Pisces), Saturn (Capricorn/Aquarius).',
      principles: 'A dignitary planet can deliver promises cleanly; an afflicted or debased planet produces outcomes fraught with delays, struggles, or unconventional deviations.'
    },
    {
      category: 'Aspects',
      title: 'Traditional Major Aspects & Sacred Geometry',
      tradName: 'Aspectus / Theoria',
      era: 'Hellenistic to Medieval',
      summary: 'Aspects represent geometrical lines of sight (witnessing) between signs, derived from harmonious musical intervals and polygon divisions of the celestial 360° circle.',
      content: 'The five classical Ptolemaic aspects correspond to the regular polygons that divide the zodiac circle: Conjunction (0°, co-presence), Sextile (60°, equilateral hexagon, friendly nature of Venus), Square (90°, square, friction and dynamic tension of Mars), Trine (120°, equilateral triangle, sublime harmony of Jupiter), and Opposition (180°, diameter, polar contest of Saturn). Signs that do not form any of these geometries are considered Inconjunct or Aversion (Adekton).',
      rulerships: 'Trine = Element harmony; Square = Modality clash; Sextile = Polar resonance; Opposition = Polar confrontation.',
      principles: 'Orbs in traditional astrology are calculated planet-to-planet (based on the planetary moities/radiations), rather than arbitrary fixed degrees.'
    },
    {
      category: 'Decans',
      title: 'The 36 Decans and Faces of the Zodiac',
      tradName: 'Dekanoi / Facies',
      era: 'Ancient Egyptian & Hellenistic Hermetica',
      summary: 'Each 30° zodiac sign is subdivided into three 10° arcs known as Decans or Faces, each presided over by an ancient star-daemon or planetary ruler.',
      content: 'Originating in third millennium BCE Egyptian sidereal astronomy as timekeeping stellar constellations that rose at dusk, the 36 decans were integrated into Hellenistic and Arabic astrology as the subtle subdivisions of zodiacal power. In the Chaldean order of rulership, the decans descend down the spheres: Saturn, Jupiter, Mars, Sun, Venus, Mercury, Moon, repeating continuously across all 36 faces.',
      rulerships: 'Aries 1 (Mars), Aries 2 (Sun), Aries 3 (Venus), Taurus 1 (Mercury), Taurus 2 (Moon), Taurus 3 (Saturn)...',
      principles: 'Decans reveal the nuanced psychological texture, mythic archetypes, and tarot minor arcana correspondences (cards 2 through 10 of each suit).'
    },
    {
      category: 'Elements',
      title: 'The 4 Elements & Triplicities',
      tradName: 'Elementa / Triplicitates',
      era: 'Empedocles, Aristotle, and Classical Astrologers',
      summary: 'Fire, Earth, Air, and Water constitute the fundamental qualitative building blocks of matter, temperament, and consciousness.',
      content: 'Aristotelian elemental theory grounds astrology in fundamental polarities of Hot vs. Cold, and Dry vs. Moist. Fire (Hot & Dry, Choler) represents luminous spirit, willpower, and kinetic action. Earth (Cold & Dry, Melancholy) represents somatic stability, tactile permanence, and material grounding. Air (Hot & Moist, Sanguine) governs relational circulation, abstract intellect, and social breath. Water (Cold & Moist, Phlegm) preserves deep emotional memory, dissolution, and psychic empathy.',
      rulerships: 'Fire Triplicity: Aries, Leo, Sagittarius. Earth Triplicity: Taurus, Virgo, Capricorn. Air Triplicity: Gemini, Libra, Aquarius. Water Triplicity: Cancer, Scorpio, Pisces.',
      principles: 'Day and Night rulers of triplicities (Dorothean system): Sun/Jupiter for Fire, Venus/Moon for Earth, Saturn/Mercury for Air, Mars/Venus/Moon for Water.'
    },
    {
      category: 'Modalities',
      title: 'The 3 Modalities / Quadruplicities',
      tradName: 'Tropoi (Cardinal, Fixed, Mutable)',
      era: 'Hellenistic Seasonal Astrological Physics',
      summary: 'The modalities describe the energetic rhythm of seasonal changes: Initiation, Consolidation, and Transition.',
      content: 'Cardinal (Tropikos / Turning) signs coincide with the four great solar turning points: the equinoxes and solstices. They radiate pioneering momentum, leadership, and crisp beginnings. Fixed (Stereos / Solid) signs occupy the steady heart of the season, maintaining stability, tenacity, and resistance to change. Mutable (Dikataskeuos / Double-bodied) signs conclude the season, preparing the atmosphere for the approaching epoch with flexibility, cognitive synthesis, and boundary modulation.',
      rulerships: 'Cardinal: Aries, Cancer, Libra, Capricorn. Fixed: Taurus, Leo, Scorpio, Aquarius. Mutable: Gemini, Virgo, Sagittarius, Pisces.',
      principles: 'Cross-modality tension forms the challenging Square and Opposition aspects, driving personal evolution and catalytic growth.'
    }
  ];

  for (const topic of traditionalTopics) {
    database.run(`
      INSERT INTO traditional_topics (
        category, title, traditional_name, historical_era, summary, content, traditional_rulerships, key_principles
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      topic.category, topic.title, topic.tradName, topic.era, topic.summary, topic.content, topic.rulerships, topic.principles
    ]);
  }

  // Seed sample compatibility pairings
  const samplePairs = [
    { s1: 'aries', s2: 'leo', o: 95, l: 96, i: 90, c: 92, dyn: 'Fire + Fire (Trine Synergy)', syn: 'An incandescent, joyful royal alliance of high courage and mutual admiration.', adv: 'Ensure egos take turns basking in the spotlight.' },
    { s1: 'taurus', s2: 'scorpio', o: 88, l: 92, i: 84, c: 86, dyn: 'Earth + Water (Polar Opposition)', syn: 'Sensory grounding meets emotional depths; magnetic attraction that binds across lifetimes.', adv: 'Avoid stubborn power standoffs; practice verbal transparency.' },
    { s1: 'gemini', s2: 'libra', o: 94, l: 91, i: 98, c: 96, dyn: 'Air + Air (Trine Synergy)', syn: 'Effortless intellectual synchronicity, boundless sparkling conversation, and social grace.', adv: 'Anchor ethereal concepts into concrete shared commitments.' },
    { s1: 'cancer', s2: 'pisces', o: 97, l: 99, i: 91, c: 95, dyn: 'Water + Water (Trine Synergy)', syn: 'A profound soul-communion of telepathic empathy, romantic sanctuary, and unconditional devotion.', adv: 'Maintain healthy boundaries against external negative moods.' },
    { s1: 'virgo', s2: 'capricorn', o: 93, l: 89, i: 95, c: 94, dyn: 'Earth + Earth (Trine Synergy)', syn: 'An unbeatable empire-building partnership of meticulous craft and long-term architectural foresight.', adv: 'Schedule deliberate leisure to celebrate milestones together.' },
    { s1: 'aquarius', s2: 'aries', o: 89, l: 87, i: 94, c: 91, dyn: 'Air + Fire (Sextile Resonance)', syn: 'Visionary ideas fused with fearless execution; exciting, nonconformist, and perpetually stimulating.', adv: 'Acknowledge personal emotional needs alongside collective crusades.' }
  ];

  for (const p of samplePairs) {
    database.run(`
      INSERT OR REPLACE INTO compatibility_matrix (
        sign1_key, sign2_key, overall_score, love_score, intellect_score, communication_score,
        elemental_dynamic, synthesis, advice
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      p.s1, p.s2, p.o, p.l, p.i, p.c, p.dyn, p.syn, p.adv
    ]);
    // Reverse pair
    database.run(`
      INSERT OR REPLACE INTO compatibility_matrix (
        sign1_key, sign2_key, overall_score, love_score, intellect_score, communication_score,
        elemental_dynamic, synthesis, advice
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      p.s2, p.s1, p.o, p.l, p.i, p.c, p.dyn, p.syn, p.adv
    ]);
  }
}
