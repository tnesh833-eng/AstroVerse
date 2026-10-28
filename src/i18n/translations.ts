import { Language } from '../types.ts';

export interface TranslationDictionary {
  // Navigation & General
  siteName: string;
  tagline: string;
  zodiacSigns: string;
  horoscopes: string;
  ephemeris: string;
  birthChart: string;
  compendium: string;
  synastry: string;
  tarotOracle: string;
  adminConsole: string;
  signIn: string;
  register: string;
  signOut: string;
  askOracle: string;
  selectLanguage: string;
  welcomeBack: string;
  authenticatedAs: string;
  adminRole: string;
  seekerRole: string;
  signedOutMsg: string;

  // Hero Section
  heroBadge1: string;
  heroBadge2: string;
  heroBadge3: string;
  heroTitle: string;
  heroSubtitle: string;
  calcBirthChartBtn: string;
  currentTransitDate: string;
  sunPositionLabel: string;
  moonPositionLabel: string;

  // Auth Gate Card
  emailVerificationReq: string;
  gateTitle: string;
  gateSubtitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  sendCodeBtn: string;
  sendingCode: string;
  codeSentMsg: string;
  enterCodeLabel: string;
  codePlaceholder: string;
  verifyBtn: string;
  verifyingBtn: string;
  resendCode: string;
  orQuickDemo: string;
  continueAsSeeker: string;
  continueAsAdmin: string;
  portalLockNotice: string;
  unlockedFeaturesHeading: string;
  featZodiacTitle: string;
  featZodiacDesc: string;
  featHoroscopeTitle: string;
  featHoroscopeDesc: string;
  featEphemerisTitle: string;
  featEphemerisDesc: string;
  featBirthChartTitle: string;
  featBirthChartDesc: string;
  featCompendiumTitle: string;
  featCompendiumDesc: string;
  featSynastryTitle: string;
  featSynastryDesc: string;
  featTarotTitle: string;
  featTarotDesc: string;

  // Zodiac Wheel / Constellations
  zodiacHeadline: string;
  zodiacSubheadline: string;
  filterAll: string;
  filterFire: string;
  filterEarth: string;
  filterAir: string;
  filterWater: string;
  filterCardinal: string;
  filterFixed: string;
  filterMutable: string;
  eclipticWheelLabel: string;
  geocentricFrame: string;
  elementLabel: string;
  modalityLabel: string;
  gemstoneLabel: string;
  tarotLabel: string;
  ruledByLabel: string;
  houseLabel: string;
  cosmicArchetypeTitle: string;
  strengthsTitle: string;
  challengesTitle: string;
  loveCompatibilityTitle: string;
  careerVocationsTitle: string;
  viewHoroscopeBtn: string;
  checkCompatibilityBtn: string;

  // Daily Horoscopes
  dailyHoroscopesTitle: string;
  dailyHoroscopesSubtitle: string;
  chooseSignLabel: string;
  forecastForToday: string;
  cosmicOverview: string;
  loveRelationships: string;
  careerFinance: string;
  wellnessVitality: string;
  luckyColorLabel: string;
  luckyNumbersLabel: string;
  compatibleSignsLabel: string;
  celestialAspectLabel: string;
  askAiAboutSign: string;

  // Birth Chart Calculator
  birthChartTitle: string;
  birthChartSubtitle: string;
  birthParametersHeading: string;
  birthDateLabel: string;
  birthTimeLabel: string;
  cityLocationLabel: string;
  castChartButton: string;
  sunSignBig3: string;
  moonSignBig3: string;
  ascendantBig3: string;
  coreWill: string;
  innerSelf: string;
  helmRising: string;
  planetaryPlacementsTable: string;
  planetCol: string;
  symbolCol: string;
  signCol: string;
  degreeCol: string;
  motionCol: string;
  houseCol: string;
  dignityCol: string;
  directMotion: string;
  retrogradeMotion: string;
  houseCuspsHeading: string;
  elementDistributionHeading: string;
  modalityDistributionHeading: string;
  aspectsHeading: string;
  chartSynthesisHeading: string;

  // Ephemeris
  ephemerisTitle: string;
  ephemerisSubtitle: string;
  ephemerisRealTimeBadge: string;
  astronomicalJulianDate: string;
  celestialLongitude: string;
  ephemerisNotice: string;

  // Synastry
  synastryTitle: string;
  synastrySubtitle: string;
  firstPartnerSign: string;
  secondPartnerSign: string;
  overallHarmonyScore: string;
  romanceAffinity: string;
  intellectCommunication: string;
  emotionalResonance: string;
  elementalDynamic: string;
  synthesisAdvice: string;

  // Traditional Compendium
  compendiumTitle: string;
  compendiumSubtitle: string;
  classicalTraditions: string;
  keyPrinciplesLabel: string;
  planetaryDignities: string;
  aspectDoctrine: string;

  // Tarot Oracle
  tarotTitle: string;
  tarotSubtitle?: string;
  tarotOracleTitle?: string;
  tarotOracleSubtitle?: string;
  drawCardBtn: string;
  reshuffleBtn: string;
  cardDrawn: string;
  archetypalMeaning: string;
  cosmicAdvice: string;

  // Auth Page
  authLoginMode: string;
  authSignupMode: string;
  loginHeading: string;
  signupHeading: string;
  loginSubtext: string;
  signupSubtext: string;
  fullNameLabel: string;
  passwordLabel: string;
  sunSignOptional: string;
  needAccount: string;
  alreadyHaveAccount: string;
  backToHome: string;

  // Footer
  footerDesc: string;
  footerCopyright: string;
  julianDayLabel: string;
  emailSmtpLabel: string;
  verifiedSessionLabel: string;

  // Signs dictionary
  signNames: Record<string, string>;
  elementNames: Record<string, string>;
  modalityNames: Record<string, string>;
  planetNames: Record<string, string>;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    siteName: 'AstroVerse',
    tagline: 'Modern Web-Based Astrology Engine',
    zodiacSigns: 'Zodiac Signs',
    horoscopes: 'Horoscopes',
    ephemeris: 'Ephemeris',
    birthChart: 'Birth Chart',
    compendium: 'Compendium',
    synastry: 'Synastry',
    tarotOracle: 'Tarot Oracle',
    adminConsole: 'Admin Console',
    signIn: 'Sign In',
    register: 'Register',
    signOut: 'Sign Out',
    askOracle: 'Ask Oracle',
    selectLanguage: 'Language',
    welcomeBack: 'Welcome back',
    authenticatedAs: 'Authenticated as',
    adminRole: 'Administrator',
    seekerRole: 'Seeker',
    signedOutMsg: 'Signed out of AstroVerse session.',

    heroBadge1: 'Ephemeris Architecture',
    heroBadge2: 'Educational Astronomy',
    heroBadge3: 'Est. 2026',
    heroTitle: 'The Celestial Architecture of Mind & Cosmos',
    heroSubtitle: 'A modern, educational astrology portal engineered with relational precision. Explore 12 zodiac archetypes, real-time mathematical planetary ephemeris, birth charts, and traditional Hellenistic compendia.',
    calcBirthChartBtn: 'Calculate Birth Chart',
    currentTransitDate: 'Current Transit Date',
    sunPositionLabel: 'Sun Celestial Position',
    moonPositionLabel: 'Moon Celestial Position',

    emailVerificationReq: 'Email Verification Required',
    gateTitle: 'Verify Email Code to Unlock Astrological Portals',
    gateSubtitle: 'The topic tabs (Zodiac Wheel, Horoscopes, Ephemeris, Birth Chart, Compendium, Synastry, and Tarot Oracle) are secured. Enter your email below to receive a 6-digit verification code.',
    emailLabel: 'Email Address (SMTP Verification)',
    emailPlaceholder: 'e.g. yourname@domain.com',
    sendCodeBtn: 'Send Verification Code',
    sendingCode: 'Sending Code via SMTP...',
    codeSentMsg: 'Verification code dispatched to your email!',
    enterCodeLabel: 'Enter 6-Digit Code',
    codePlaceholder: '123456',
    verifyBtn: 'Verify & Unlock Portal',
    verifyingBtn: 'Verifying...',
    resendCode: 'Resend Code',
    orQuickDemo: 'Or Instant Demo Access',
    continueAsSeeker: 'Continue as Seeker (Demo)',
    continueAsAdmin: 'Continue as Admin (Demo)',
    portalLockNotice: 'Topic tabs are locked until verified with an email code.',
    unlockedFeaturesHeading: '7 Sacred Topic Modules Unlocked After Verification',
    featZodiacTitle: 'Zodiac Wheel & Archetypes',
    featZodiacDesc: 'Deep analytical taxonomy of 12 zodiac constellations, polarities, and decans.',
    featHoroscopeTitle: 'Daily Planetary Horoscopes',
    featHoroscopeDesc: 'Forecasts synthesized from current astrological aspects and daily transits.',
    featEphemerisTitle: 'Planetary Ephemeris',
    featEphemerisDesc: 'Mathematical degrees, speeds, and retrograde states calculated for this moment.',
    featBirthChartTitle: 'Natal Birth Chart Calculator',
    featBirthChartDesc: 'Big 3 calculations, whole-sign house placements, and planetary dignity tables.',
    featCompendiumTitle: 'Traditional Compendium',
    featCompendiumDesc: 'Classical Hellenistic doctrine, triplicities, and planetary dignities.',
    featSynastryTitle: 'Synastry & Compatibility',
    featSynastryDesc: 'Elemental resonance analysis across love, intellect, and emotional harmony.',
    featTarotTitle: 'Tarot Oracle Divination',
    featTarotDesc: '78-card archetypal divination engine for philosophical and spiritual reflection.',

    zodiacHeadline: 'ZODIAC CONSTELLATIONS & ARCHETYPES',
    zodiacSubheadline: 'Each 30° ecliptic segment embodies a unique synthesis of primordial element, seasonal modality, and planetary rulership.',
    filterAll: 'All',
    filterFire: 'Fire',
    filterEarth: 'Earth',
    filterAir: 'Air',
    filterWater: 'Water',
    filterCardinal: 'Cardinal',
    filterFixed: 'Fixed',
    filterMutable: 'Mutable',
    eclipticWheelLabel: 'CELESTIAL ECLIPTIC WHEEL',
    geocentricFrame: '360° Geocentric Frame',
    elementLabel: 'Element',
    modalityLabel: 'Modality',
    gemstoneLabel: 'Gemstone',
    tarotLabel: 'Tarot',
    ruledByLabel: 'Ruled by',
    houseLabel: 'House',
    cosmicArchetypeTitle: 'COSMIC ARCHETYPE & OVERVIEW',
    strengthsTitle: 'STRENGTHS & GIFTS',
    challengesTitle: 'EVOLUTIONARY CHALLENGES',
    loveCompatibilityTitle: 'LOVE & RELATIONSHIP DYNAMICS',
    careerVocationsTitle: 'CAREER & VOCATIONAL DRIVE',
    viewHoroscopeBtn: 'View Daily Horoscope',
    checkCompatibilityBtn: 'Check Synastry Compatibility',

    dailyHoroscopesTitle: 'DAILY CELESTIAL HOROSCOPES',
    dailyHoroscopesSubtitle: 'Daily planetary transits and archetypal forecasts calculated for each sign.',
    chooseSignLabel: 'Select Your Zodiac Sign',
    forecastForToday: 'Forecast for Today',
    cosmicOverview: 'Cosmic Overview & Transit',
    loveRelationships: 'Love & Romance',
    careerFinance: 'Career & Ambition',
    wellnessVitality: 'Mind & Body Vitality',
    luckyColorLabel: 'Lucky Color',
    luckyNumbersLabel: 'Lucky Numbers',
    compatibleSignsLabel: 'Best Compatibility',
    celestialAspectLabel: 'Primary Aspect',
    askAiAboutSign: 'Ask Oracle About This Forecast',

    birthChartTitle: 'NATAL BIRTH CHART CALCULATOR',
    birthChartSubtitle: 'Calculate planetary degrees, the Big 3, and astrological houses from your exact birth parameters.',
    birthParametersHeading: 'NATAL BIRTH PARAMETERS',
    birthDateLabel: 'Birth Date',
    birthTimeLabel: 'Birth Time (Local)',
    cityLocationLabel: 'City Location Preset',
    castChartButton: 'Cast Natal Chart',
    sunSignBig3: 'SUN SIGN (CORE WILL)',
    moonSignBig3: 'MOON SIGN (INNER SELF)',
    ascendantBig3: 'ASCENDANT / RISING (HELM)',
    coreWill: 'Core Will & Vital Essence',
    innerSelf: 'Emotional Subconscious',
    helmRising: 'Physical Embodiment & Persona',
    planetaryPlacementsTable: 'PLANETARY PLACEMENTS & DEGREES',
    planetCol: 'Planet',
    symbolCol: 'Glyph',
    signCol: 'Zodiac Sign',
    degreeCol: 'Degree',
    motionCol: 'Motion',
    houseCol: 'House',
    dignityCol: 'Dignity',
    directMotion: 'Direct',
    retrogradeMotion: 'Retrograde',
    houseCuspsHeading: 'TWELVE ASTROLOGICAL HOUSES',
    elementDistributionHeading: 'ELEMENTAL HARMONY',
    modalityDistributionHeading: 'MODALITY BALANCE',
    aspectsHeading: 'MAJOR PLANETARY ASPECTS',
    chartSynthesisHeading: 'NATAL CHART SYNTHESIS',

    ephemerisTitle: 'MATHEMATICAL PLANETARY EPHEMERIS',
    ephemerisSubtitle: 'Real-time geocentric planetary positions calculated using celestial mechanics.',
    ephemerisRealTimeBadge: 'Real-Time Planetary Transit',
    astronomicalJulianDate: 'Julian Ephemeris Calculation',
    celestialLongitude: 'Celestial Longitude',
    ephemerisNotice: 'Planetary coordinates are calculated in real time with high astronomical precision.',

    synastryTitle: 'CELESTIAL SYNASTRY & COMPATIBILITY',
    synastrySubtitle: 'Analyze interpersonal archetypes, elemental chemistry, and harmonic balance.',
    firstPartnerSign: 'First Person Sign',
    secondPartnerSign: 'Second Person Sign',
    overallHarmonyScore: 'Overall Harmony',
    romanceAffinity: 'Romance Affinity',
    intellectCommunication: 'Intellect & Dialogue',
    emotionalResonance: 'Emotional Resonance',
    elementalDynamic: 'Elemental Dynamic',
    synthesisAdvice: 'Astrological Synthesis & Growth Advice',

    compendiumTitle: 'TRADITIONAL ASTROLOGY COMPENDIUM',
    compendiumSubtitle: 'Classical Hellenistic and medieval doctrines of essential dignities and aspects.',
    classicalTraditions: 'Classical Astrological Doctrines',
    keyPrinciplesLabel: 'Key Principles & Axioms',
    planetaryDignities: 'Essential Dignities Table',
    aspectDoctrine: 'Ptolemaic Aspects & Orbs',

    tarotOracleTitle: 'HERMETIC TAROT ORACLE',
    tarotOracleSubtitle: 'Draw from the 78 archetypal keys for contemplation and symbolic insight.',
    tarotTitle: 'HERMETIC TAROT ORACLE',
    drawCardBtn: 'Draw Sacred Card',
    reshuffleBtn: 'Reshuffle Deck',
    cardDrawn: 'Card Revealed',
    archetypalMeaning: 'Archetypal Meaning & Symbolism',
    cosmicAdvice: 'Oracle Guidance for Today',

    authLoginMode: 'Sign In (login.html)',
    authSignupMode: 'Register (signup.html)',
    loginHeading: 'Sign In to AstroVerse',
    signupHeading: 'Create Your AstroVerse Account',
    loginSubtext: 'Enter your verified email to receive an instant verification code or enter your credentials.',
    signupSubtext: 'Create a new seeker profile with email verification to explore all celestial tools.',
    fullNameLabel: 'Full Name',
    passwordLabel: 'Password',
    sunSignOptional: 'Your Zodiac Sign (Optional)',
    needAccount: "Don't have an account? Register now",
    alreadyHaveAccount: 'Already registered? Sign in',
    backToHome: 'Return to AstroVerse Portal',

    footerDesc: 'A modern web-based astrology engine reverse-engineered from classical astronomical ephemerides. Built for educational and informational study of celestial mechanics, planetary archetypes, and harmonic astrology.',
    footerCopyright: '© 2026 AstroVerse. Designed with astronomical precision for educational research.',
    julianDayLabel: 'Julian Day Ephemeris',
    emailSmtpLabel: 'Email Verification (SMTP)',
    verifiedSessionLabel: 'Verified User Authentication',

    signNames: {
      aries: 'Aries',
      taurus: 'Taurus',
      gemini: 'Gemini',
      cancer: 'Cancer',
      leo: 'Leo',
      virgo: 'Virgo',
      libra: 'Libra',
      scorpio: 'Scorpio',
      sagittarius: 'Sagittarius',
      capricorn: 'Capricorn',
      aquarius: 'Aquarius',
      pisces: 'Pisces',
    },
    elementNames: {
      Fire: 'Fire',
      Earth: 'Earth',
      Air: 'Air',
      Water: 'Water',
    },
    modalityNames: {
      Cardinal: 'Cardinal',
      Fixed: 'Fixed',
      Mutable: 'Mutable',
    },
    planetNames: {
      Sun: 'Sun',
      Moon: 'Moon',
      Mars: 'Mars',
      Mercury: 'Mercury',
      Jupiter: 'Jupiter',
      Venus: 'Venus',
      Saturn: 'Saturn',
      Uranus: 'Uranus',
      Neptune: 'Neptune',
      Pluto: 'Pluto',
    },
  },

  ta: {
    siteName: 'அஸ்ட்ரோவெர்ஸ்',
    tagline: 'நவீன வானியல் & ஜோதிட தளம்',
    zodiacSigns: 'இராசி மண்டலம்',
    horoscopes: 'தினசரி ராசிபலன்',
    ephemeris: 'பஞ்சாங்கம் & கோள்கள்',
    birthChart: 'ஜாதகக் கட்டம்',
    compendium: 'பாரம்பரிய ஜோதிடம்',
    synastry: 'திருமணப் பொருத்தம்',
    tarotOracle: 'டாரோட் ஆரக்கிள்',
    adminConsole: 'நிர்வாகக் கட்டுப்பாட்டகம்',
    signIn: 'உள்நுழைய',
    register: 'பதிவு செய்ய',
    signOut: 'வெளியேறு',
    askOracle: 'ஆரக்கிளிடம் கேட்க',
    selectLanguage: 'மொழி',
    welcomeBack: 'மீண்டும் நல்வரவு',
    authenticatedAs: 'அங்கீகரிக்கப்பட்டது',
    adminRole: 'நிர்வாகி',
    seekerRole: 'ஆராய்ச்சியாளர்',
    signedOutMsg: 'அஸ்ட்ரோவெர்ஸ் அமர்விலிருந்து வெளியேறினீர்கள்.',

    heroBadge1: 'துல்லிய பஞ்சாங்கக் கட்டமைப்பு',
    heroBadge2: 'கல்விசார் வானியல் ஆய்வு',
    heroBadge3: 'நிறுவப்பட்டது 2026',
    heroTitle: 'மனம் மற்றும் பேரண்டத்தின் வானியல் கட்டமைப்பு',
    heroSubtitle: 'துல்லிய கணித விதிகளுடன் வடிவமைக்கப்பட்ட நவீன வானியல் & ஜோதிட தளம். 12 ராசி பண்புகள், நிகழ்நேர கோள்களின் நிலைகள், ஜாதகக் கட்டம் மற்றும் பாரம்பரிய ஜோதிட நூல்களை ஆராயுங்கள்.',
    calcBirthChartBtn: 'ஜாதகக் கட்டம் கணக்கிடு',
    currentTransitDate: 'இன்றைய கோள்சார நாள்',
    sunPositionLabel: 'சூரியன் அமைவிடம்',
    moonPositionLabel: 'சந்திரன் அமைவிடம்',

    emailVerificationReq: 'மின்னஞ்சல் சரிபார்ப்புக் குறியீடு தேவை',
    gateTitle: 'ஜோதிட பகுதிகளைத் திறக்க மின்னஞ்சல் குறியீட்டைச் சரிபார்க்கவும்',
    gateSubtitle: 'அனைத்து ஜோதிடப் பகுதிகளும் (இராசி சக்கரம், தினசரி ராசிபலன், பஞ்சாங்கம், ஜாதகக் கட்டம், பாரம்பரிய ஜோதிடம், திருமணப் பொருத்தம், மற்றும் டாரோட் ஆரக்கிள்) பாதுகாக்கப்பட்டுள்ளன. 6-இலக்க சரிபார்ப்புக் குறியீட்டைப் பெற உங்கள் மின்னஞ்சலை உள்ளிடவும்.',
    emailLabel: 'மின்னஞ்சல் முகவரி (SMTP சரிபார்ப்பு)',
    emailPlaceholder: 'உதாரணம்: yourname@domain.com',
    sendCodeBtn: 'சரிபார்ப்புக் குறியீட்டை அனுப்பு',
    sendingCode: 'குறியீடு மின்னஞ்சலுக்கு அனுப்பப்படுகிறது...',
    codeSentMsg: '6-இலக்க சரிபார்ப்புக் குறியீடு உங்கள் மின்னஞ்சலுக்கு அனுப்பப்பட்டது!',
    enterCodeLabel: '6-இலக்க குறியீட்டை உள்ளிடவும்',
    codePlaceholder: '123456',
    verifyBtn: 'சரிபார்த்து தளத்தைத் திறக்கவும்',
    verifyingBtn: 'சரிபார்க்கப்படுகிறது...',
    resendCode: 'குறியீட்டை மீண்டும் அனுப்புக',
    orQuickDemo: 'அல்லது உடனடி டெமோ அணுகல்',
    continueAsSeeker: 'ஆராய்ச்சியாளராக நுழைக (டெமோ)',
    continueAsAdmin: 'நிர்வாகியாக நுழைக (டெமோ)',
    portalLockNotice: 'மின்னஞ்சல் சரிபார்ப்புக் குறியீடு மூலம் சரிபார்க்கப்படும் வரை தலைப்புகள் பூட்டப்பட்டிருக்கும்.',
    unlockedFeaturesHeading: 'சரிபார்ப்பிற்குப் பின் திறக்கப்படும் 7 முக்கிய ஜோதிடத் தொகுதிகள்',
    featZodiacTitle: '12 இராசி சக்கரங்கள் & தன்மைகள்',
    featZodiacDesc: '12 ராசிகளின் குணாதிசயங்கள், அதிபதிகள், நிறங்கள் மற்றும் தன்மைகள் குறித்த ஆழமான ஆய்வு.',
    featHoroscopeTitle: 'தினசரி ராசிபலன் கணிப்பு',
    featHoroscopeDesc: 'நடப்பு கோள்சார மாற்றங்களின்படி அனைத்து ராசிகளுக்குமான துல்லியமான தினசரி பலன்கள்.',
    featEphemerisTitle: 'வானியல் கோள்கள் நிலை (பஞ்சாங்கம்)',
    featEphemerisDesc: 'சூரியன், சந்திரன் உள்ளிட்ட நவகிரகங்களின் தற்போதைய பாகை, வக்ர கதி மற்றும் இருப்பு.',
    featBirthChartTitle: 'துல்லிய ஜாதகக் கட்டக் கணிப்பான்',
    featBirthChartDesc: 'லக்னம், ராசி, சூரிய நிலை, 12 பாவங்கள் மற்றும் நவகிரக நிலைகளின் உடனடி வரைபடம்.',
    featCompendiumTitle: 'பாரம்பரிய ஜோதிட கலைக்களஞ்சியம்',
    featCompendiumDesc: 'உச்சம், நீசம், ஆட்சி, திரிபு, பார்வைகள் உள்ளிட்ட பாரம்பரிய ஜோதிட விதிகள்.',
    featSynastryTitle: 'ஜாதக மற்றும் திருமணப் பொருத்தம்',
    featSynastryDesc: 'இரு நபர்களிடையே உள்ள நட்பு, காதல், மன அமைதி மற்றும் தனித்துவப் பொருத்தங்கள்.',
    featTarotTitle: 'டாரோட் ஆரக்கிள் உள்ளுணர்வு ஆய்வு',
    featTarotDesc: '78 டாரோட் கார்டுகளின் குறியீட்டு வழிகாட்டல் மற்றும் சிந்தனை வழிகாட்டல்.',

    zodiacHeadline: '12 இராசி மண்டலங்கள் & தத்துவங்கள்',
    zodiacSubheadline: 'ஒவ்வொரு 30° வானப் பகுதியும் பஞ்சபூத தத்துவம், பருவ நிலை மற்றும் ஆட்சி செய்யும் கிரகத்தின் ஆற்றலைக் குறிக்கிறது.',
    filterAll: 'அனைத்தும்',
    filterFire: 'நெருப்பு (அக்னி)',
    filterEarth: 'நிலம் (பிரித்வி)',
    filterAir: 'காற்று (வாயு)',
    filterWater: 'நீர் (அப்பு)',
    filterCardinal: 'சரம் (முன்னோடி)',
    filterFixed: 'ஸ்திரம் (நிலையானது)',
    filterMutable: 'உபயம் (மாறுபடும்)',
    eclipticWheelLabel: 'இராசி சக்கரம்',
    geocentricFrame: '360° பூமத்திய ரேகை வரைபடம்',
    elementLabel: 'பூதம்',
    modalityLabel: 'இயல்பு',
    gemstoneLabel: 'ராசிக்கல்',
    tarotLabel: 'டாரோட்',
    ruledByLabel: 'ஆட்சி கிரகம்',
    houseLabel: 'பாவம்',
    cosmicArchetypeTitle: 'ராசி தத்துவம் & பொதுப்பண்புகள்',
    strengthsTitle: 'நன்மைகள் & திறன்கள்',
    challengesTitle: 'சவால்கள் & திருத்தங்கள்',
    loveCompatibilityTitle: 'காதல் & உறவுமுறைகள்',
    careerVocationsTitle: 'தொழில் & உத்தியோக வழிகள்',
    viewHoroscopeBtn: 'தினசரி ராசிபலனைப் பார்',
    checkCompatibilityBtn: 'பொருத்தம் சரிபார்',

    dailyHoroscopesTitle: 'தினசரி கோள்சார ராசிபலன்கள்',
    dailyHoroscopesSubtitle: 'இன்றைய கிரக மாற்றங்கள் மற்றும் கோள்களின் பார்வைகளின் அடிப்படையில் கணிக்கப்பட்ட பலன்கள்.',
    chooseSignLabel: 'உங்கள் ராசியைத் தேர்ந்தெடுக்கவும்',
    forecastForToday: 'இன்றைய ராசிபலன்',
    cosmicOverview: 'பொதுவான கிரக தாக்கம்',
    loveRelationships: 'காதல் & குடும்பம்',
    careerFinance: 'தொழில் & பொருளாதாரம்',
    wellnessVitality: 'உடல் & மன ஆரோக்கியம்',
    luckyColorLabel: 'அதிர்ஷ்ட நிறம்',
    luckyNumbersLabel: 'அதிர்ஷ்ட எண்கள்',
    compatibleSignsLabel: 'பொருத்தமான ராசிகள்',
    celestialAspectLabel: 'முக்கிய கிரக பார்வை',
    askAiAboutSign: 'இந்த பலன் பற்றி ஆரக்கிளிடம் கேட்க',

    birthChartTitle: 'துல்லிய ஜாதகக் கட்டக் கணிப்பான்',
    birthChartSubtitle: 'பிறந்த தேதி, நேரம் மற்றும் இடத்தின் அடிப்படையில் லக்னம், நவகிரக நிலைகள் மற்றும் 12 பாவங்களைக் கணக்கிடுங்கள்.',
    birthParametersHeading: 'பிறப்பு விவரங்கள்',
    birthDateLabel: 'பிறந்த தேதி',
    birthTimeLabel: 'பிறந்த நேரம் (உள்ளூர்)',
    cityLocationLabel: 'பிறந்த இடம்',
    castChartButton: 'ஜாதகக் கட்டம் கணக்கிடு',
    sunSignBig3: 'சூரிய ராசி (ஆன்ம பலம்)',
    moonSignBig3: 'சந்திர ராசி (மன நிலை - ராசி)',
    ascendantBig3: 'லக்னம் (உடல் மற்றும் விதி)',
    coreWill: 'ஆன்ம பலம் & உயிராற்றல்',
    innerSelf: 'உள்ளுணர்வு & மனோபாவம்',
    helmRising: 'உடல் வடிவம் & ஆளுமை',
    planetaryPlacementsTable: 'நவகிரக அமைவிடங்கள் & பாகைகள்',
    planetCol: 'கிரகம்',
    symbolCol: 'குறியீடு',
    signCol: 'ராசி',
    degreeCol: 'பாகை',
    motionCol: 'கதி',
    houseCol: 'பாவம்',
    dignityCol: 'தன்மை',
    directMotion: 'நேர்கதி',
    retrogradeMotion: 'வக்ர கதி',
    houseCuspsHeading: '12 பாவங்களின் நிலைகள்',
    elementDistributionHeading: 'பஞ்சபூத சமநிலை',
    modalityDistributionHeading: 'இயல்பு சமநிலை (சரம்/ஸ்திரம்/உபயம்)',
    aspectsHeading: 'முக்கிய கிரக பார்வைகள்',
    chartSynthesisHeading: 'ஜாதகக் கட்ட விளக்கம்',

    ephemerisTitle: 'வானியல் நவகிரக பஞ்சாங்கம்',
    ephemerisSubtitle: 'வானியல் விதிகள் மூலம் துல்லியமாக கணக்கிடப்பட்ட கோள்களின் நிகழ்நேர நிலைகள்.',
    ephemerisRealTimeBadge: 'நிகழ்நேர கோள்சாரம்',
    astronomicalJulianDate: 'ஜூலியன் பஞ்சாங்கக் கணக்கீடு',
    celestialLongitude: 'வானியல் தீர்க்கரேகை',
    ephemerisNotice: 'அனைத்து கிரக நிலைகளும் மிகத் துல்லியமான வானியல் கணிதத்தின்படி கணக்கிடப்படுகின்றன.',

    synastryTitle: 'ஜாதக & திருமணப் பொருத்தம்',
    synastrySubtitle: 'இரு ராசிகளுக்கிடையேயான மன ஒற்றுமை, காதல் ஈர்ப்பு மற்றும் வாழ்வியல் பொருத்தத்தை ஆராயுங்கள்.',
    firstPartnerSign: 'முதல் நபர் ராசி',
    secondPartnerSign: 'இரண்டாம் நபர் ராசி',
    overallHarmonyScore: 'ஒட்டுமொத்தப் பொருத்தம்',
    romanceAffinity: 'காதல் ஈர்ப்பு',
    intellectCommunication: 'அறிவு & தகவல் தொடர்பு',
    emotionalResonance: 'மன ஒற்றுமை',
    elementalDynamic: 'பூதங்களின் சேர்க்கை',
    synthesisAdvice: 'ஜோதிட ஆய்வு & நல்வழிகாட்டுதல்',

    compendiumTitle: 'பாரம்பரிய ஜோதிட கலைக்களஞ்சியம்',
    compendiumSubtitle: 'பாரம்பரிய வேத மற்றும் ஹெலனிஸ்டிக் ஜோதிட மூலக் கோட்பாடுகள்.',
    classicalTraditions: 'பாரம்பரிய ஜோதிட கோட்பாடுகள்',
    keyPrinciplesLabel: 'முக்கிய ஜோதிட சூத்திரங்கள்',
    planetaryDignities: 'கிரகங்களின் ஆட்சி, உச்சம், நீசம் அட்டவணை',
    aspectDoctrine: 'கிரகங்களின் சிறப்புப் பார்வைகள்',

    tarotOracleTitle: 'டாரோட் ஆரக்கிள் வழிகாட்டல்',
    tarotOracleSubtitle: '78 தத்துவக் குறியீடுகள் மூலம் மன அமைதி மற்றும் உள்ளுணர்வு வழிகாட்டலைப் பெறுங்கள்.',
    tarotTitle: 'டாரோட் ஆரக்கிள் வழிகாட்டல்',
    drawCardBtn: 'கார்டு எடுக்கவும்',
    reshuffleBtn: 'மீண்டும் கலக்கு',
    cardDrawn: 'வெளிப்பட்ட குறியீடு',
    archetypalMeaning: 'தத்துவ அர்த்தம் & விளக்கம்',
    cosmicAdvice: 'இன்றைய வழிகாட்டுதல்',

    authLoginMode: 'உள்நுழைய (login.html)',
    authSignupMode: 'பதிவு செய்ய (signup.html)',
    loginHeading: 'அஸ்ட்ரோவெர்ஸ் உள்நுழைவு',
    signupHeading: 'புதிய கணக்கை உருவாக்கவும்',
    loginSubtext: 'சரிபார்க்கப்பட்ட மின்னஞ்சலை உள்ளிட்டு உடனடி குறியீட்டைப் பெற்று நுழையவும்.',
    signupSubtext: 'அனைத்து ஜோதிடக் கருவிகளையும் அணுக உங்கள் விவரங்களுடன் பதிவு செய்யவும்.',
    fullNameLabel: 'முழுப் பெயர்',
    passwordLabel: 'கடவுச்சொல்',
    sunSignOptional: 'உங்கள் ராசி (விருப்பத்தேர்வு)',
    needAccount: 'கணக்கு இல்லையா? புதிய கணக்கு தொடங்குங்கள்',
    alreadyHaveAccount: 'ஏற்கனவே கணக்கு உள்ளதா? உள்நுழையவும்',
    backToHome: 'அஸ்ட்ரோவெர்ஸ் முகப்புக்குத் திரும்பு',

    footerDesc: 'பாரம்பரிய வானியல் விதிகள் மூலம் துல்லியமாக வடிவமைக்கப்பட்ட நவீன ஜோதிட தளம். கல்வி மற்றும் ஆய்வு நோக்கங்களுக்காக உருவாக்கப்பட்டது.',
    footerCopyright: '© 2026 அஸ்ட்ரோவெர்ஸ். துல்லிய வானியல் கணக்கீடுகளுடன் உருவாக்கப்பட்டது.',
    julianDayLabel: 'ஜூலியன் பஞ்சாங்கம்',
    emailSmtpLabel: 'மின்னஞ்சல் சரிபார்ப்பு (SMTP)',
    verifiedSessionLabel: 'சரிபார்க்கப்பட்ட பயனர் அமர்வு',

    signNames: {
      aries: 'மேஷம்',
      taurus: 'ரிஷபம்',
      gemini: 'மிதுனம்',
      cancer: 'கடகம்',
      leo: 'சிம்மம்',
      virgo: 'கன்னி',
      libra: 'துலாம்',
      scorpio: 'விருச்சிகம்',
      sagittarius: 'தனுசு',
      capricorn: 'மகரம்',
      aquarius: 'கும்பம்',
      pisces: 'மீனம்',
    },
    elementNames: {
      Fire: 'நெருப்பு (அக்னி)',
      Earth: 'நிலம் (பிரித்வி)',
      Air: 'காற்று (வாயு)',
      Water: 'நீர் (அப்பு)',
    },
    modalityNames: {
      Cardinal: 'சரம்',
      Fixed: 'ஸ்திரம்',
      Mutable: 'உபயம்',
    },
    planetNames: {
      Sun: 'சூரியன்',
      Moon: 'சந்திரன்',
      Mars: 'செவ்வாய்',
      Mercury: 'புதன்',
      Jupiter: 'குரு (வியாழன்)',
      Venus: 'சுக்கிரன்',
      Saturn: 'சனி',
      Uranus: 'யுரேனஸ்',
      Neptune: 'நெப்டியூன்',
      Pluto: 'புளூட்டோ',
    },
  },

  te: {
    siteName: 'ఆస్ట్రోవర్స్',
    tagline: 'ఆధునిక ఖగోళ జ్యోతిష్య వేదిక',
    zodiacSigns: 'రాశి చక్రం',
    horoscopes: 'దిన ఫలాలు',
    ephemeris: 'గ్రహ స్థితులు & పంచాంగం',
    birthChart: 'జన్మ కుండలి',
    compendium: 'సాంప్రదాయ జ్యోతిష్యం',
    synastry: 'జాతక పొంతన',
    tarotOracle: 'టారో ఒరాకిల్',
    adminConsole: 'అడ్మిన్ కన్సోల్',
    signIn: 'లాగిన్',
    register: 'నమోదు',
    signOut: 'లాగ్ అవుట్',
    askOracle: 'ఒరాకిల్‌ని అడగండి',
    selectLanguage: 'భాష',
    welcomeBack: 'పునఃస్వాగతం',
    authenticatedAs: 'ధృవీకరించబడింది',
    adminRole: 'అడ్మినిస్ట్రేటర్',
    seekerRole: 'పరిశోధకుడు',
    signedOutMsg: 'ఆస్ట్రోవర్స్ నుండి విజయవంతంగా లాగ్ అవుట్ అయ్యారు.',

    heroBadge1: 'ఖగోళ పంచాంగ నిర్మాణం',
    heroBadge2: 'శాస్త్రీయ జ్యోతిష్య పరిశోధన',
    heroBadge3: 'స్థాపితం 2026',
    heroTitle: 'మనస్సు మరియు విశ్వం యొక్క ఖగోళ నిర్మాణం',
    heroSubtitle: 'ఖచ్చితమైన గణిత సూత్రాలతో రూపొందించబడిన ఆధునిక ఖగోళ జ్యోతిష్య పోర్టల్. 12 రాశుల లక్షణాలు, ప్రత్యక్ష గ్రహ స్థితులు, జన్మ కుండలి మరియు సాంప్రదాయ జ్యోతిష్య సూత్రాలను అన్వేషించండి.',
    calcBirthChartBtn: 'జన్మ కుండలి లెక్కించండి',
    currentTransitDate: 'ప్రస్తుత గోచార తేదీ',
    sunPositionLabel: 'సూర్యుని ఖగోళ స్థితి',
    moonPositionLabel: 'చంద్రుని ఖగోళ స్థితి',

    emailVerificationReq: 'ఇమెయిల్ ధృవీకరణ కోడ్ అవసరం',
    gateTitle: 'జ్యోతిష్య విభాగాలను తెరవడానికి ఇమెయిల్ కోడ్‌ను ధృవీకరించండి',
    gateSubtitle: 'అన్ని జ్యోతిష్య విభాగాలు (రాశి చక్రం, దిన ఫలాలు, పంచాంగం, జన్మ కుండలి, సాంప్రదాయ జ్యోతిష్యం, జాతక పొంతన, టారో ఒరాకిల్) సురక్షితం చేయబడ్డాయి. 6-అంకెల కోడ్ పొందడానికి మీ ఇమెయిల్‌ను నమోదు చేయండి.',
    emailLabel: 'ఇమెయిల్ చిరునామా (SMTP ధృవీకరణ)',
    emailPlaceholder: 'ఉదాహరణ: yourname@domain.com',
    sendCodeBtn: 'ధృవీకరణ కోడ్ పంపండి',
    sendingCode: 'కోడ్ పంపుతున్నాము...',
    codeSentMsg: 'ధృవీకరణ కోడ్ మీ ఇమెయిల్‌కు పంపబడింది!',
    enterCodeLabel: '6-అంకెల కోడ్‌ను నమోదు చేయండి',
    codePlaceholder: '123456',
    verifyBtn: 'ధృవీకరించి ప్రవేశించండి',
    verifyingBtn: 'ధృవీకరిస్తున్నాము...',
    resendCode: 'కోడ్‌ను మళ్లీ పంపండి',
    orQuickDemo: 'లేదా తక్షణ డెమో యాక్సెస్',
    continueAsSeeker: 'పరిశోధకుడిగా ప్రవేశించండి (డెమో)',
    continueAsAdmin: 'అడ్మిన్‌గా ప్రవేశించండి (డెమో)',
    portalLockNotice: 'ఇమెయిల్ ధృవీకరణ పూర్తయ్యే వరకు విభాగాలు లాక్ చేయబడి ఉంటాయి.',
    unlockedFeaturesHeading: 'ధృవీకరణ తర్వాత అన్‌లాక్ అయ్యే 7 ముఖ్య జ్యోతిష్య విభాగాలు',
    featZodiacTitle: '12 రాశులు & తత్వాలు',
    featZodiacDesc: '12 రాశుల గుణాలు, అధిపతులు మరియు స్వభావాల సమగ్ర విశ్లేషణ.',
    featHoroscopeTitle: 'రోజువారీ దిన ఫలాలు',
    featHoroscopeDesc: 'ప్రస్తుత గోచార గ్రహ స్థితుల ఆధారంగా అన్ని రాశులకు రోజువారీ ఫలితాలు.',
    featEphemerisTitle: 'ఖగోళ గ్రహ స్థితులు (పంచాంగం)',
    featEphemerisDesc: 'నవగ్రహాల ఖచ్చితమైన డిగ్రీలు, వక్ర గతులు మరియు కదలికలు.',
    featBirthChartTitle: 'ఖచ్చితమైన జన్మ కుండలి కాలిక్యులేటర్',
    featBirthChartDesc: 'లగ్నం, రాశి, గ్రహ స్థితులు మరియు 12 భావాల సంపూర్ణ చార్ట్.',
    featCompendiumTitle: 'సాంప్రదాయ జ్యోతిష్య విజ్ఞాన సర్వస్వం',
    featCompendiumDesc: 'ఉచ్ఛ, నీచ, స్వక్షేత్ర మరియు గ్రహ దృష్టిల శాస్త్రీయ సూత్రాలు.',
    featSynastryTitle: 'జాతక & వివాహ పొంతన',
    featSynastryDesc: 'ఇద్దరు వ్యక్తుల మధ్య ప్రేమ, మనస్తత్వం మరియు సంసార అనుకూలత.',
    featTarotTitle: 'టారో ఒరాకిల్ మార్గదర్శకత్వం',
    featTarotDesc: '78 టారో చిహ్నాల ద్వారా అంతర్దృష్టి మరియు ఆత్మపరిశీలన.',

    zodiacHeadline: '12 రాశి చక్రాలు & వాటి తత్వాలు',
    zodiacSubheadline: 'ప్రతి 30° ఖగోళ విభాగం పంచభూత తత్వాన్ని, ఋతు స్వభావాన్ని మరియు పాలక గ్రహ శక్తిని ప్రతిబింబిస్తుంది.',
    filterAll: 'అన్నీ',
    filterFire: 'అగ్ని తత్వం',
    filterEarth: 'భూ తత్వం',
    filterAir: 'వాయు తత్వం',
    filterWater: 'జల తత్వం',
    filterCardinal: 'చర రాశి',
    filterFixed: 'స్థిర రాశి',
    filterMutable: 'ద్విస్వభావ రాశి',
    eclipticWheelLabel: 'రాశి చక్రం',
    geocentricFrame: '360° భూకేంద్రక చార్ట్',
    elementLabel: 'తత్వం',
    modalityLabel: 'స్వభావం',
    gemstoneLabel: 'రత్నం',
    tarotLabel: 'టారో',
    ruledByLabel: 'అధిపతి',
    houseLabel: 'భావం',
    cosmicArchetypeTitle: 'రాశి తత్వం & సమగ్ర వివరాలు',
    strengthsTitle: 'బలాలు & సానుకూలతలు',
    challengesTitle: 'సవాళ్లు & సవరణలు',
    loveCompatibilityTitle: 'ప్రేమ & సంబంధాలు',
    careerVocationsTitle: 'వృత్తి & ఉద్యోగ అవకాశాలు',
    viewHoroscopeBtn: 'దిన ఫలాలు చూడండి',
    checkCompatibilityBtn: 'పొంతన తనిఖీ చేయండి',

    dailyHoroscopesTitle: 'రోజువారీ గోచార దిన ఫలాలు',
    dailyHoroscopesSubtitle: 'నేటి గ్రహ సంచారాల ఆధారంగా లెక్కించబడిన ఖచ్చితమైన రాశిఫలాలు.',
    chooseSignLabel: 'మీ రాశిని ఎంచుకోండి',
    forecastForToday: 'నేటి ఫలితాలు',
    cosmicOverview: 'గోచార గ్రహ ప్రభావం',
    loveRelationships: 'ప్రేమ & దాంపత్యం',
    careerFinance: 'ఉద్యోగం & ఆర్థికం',
    wellnessVitality: 'ఆరోగ్యం & మనశ్శాంతి',
    luckyColorLabel: 'అదృష్ట రంగు',
    luckyNumbersLabel: 'అదృష్ట సంఖ్యలు',
    compatibleSignsLabel: 'అనుకూల రాశులు',
    celestialAspectLabel: 'ప్రధాన గ్రహ దృష్టి',
    askAiAboutSign: 'ఈ ఫలితం గురించి ఒరాకిల్‌ని అడగండి',

    birthChartTitle: 'ఖచ్చితమైన జన్మ కుండలి కాలిక్యులేటర్',
    birthChartSubtitle: 'మీ జన్మ వివరాల ఆధారంగా లగ్నం, రాశి మరియు నవగ్రహ స్థితులను ఖచ్చితంగా లెక్కించండి.',
    birthParametersHeading: 'జన్మ వివరాలు',
    birthDateLabel: 'పుట్టిన తేదీ',
    birthTimeLabel: 'పుట్టిన సమయం (స్థానిక)',
    cityLocationLabel: 'పుట్టిన నగరం',
    castChartButton: 'జన్మ కుండలి లెక్కించండి',
    sunSignBig3: 'సూర్య రాశి (ఆత్మ బలం)',
    moonSignBig3: 'చంద్ర రాశి (మనస్సు - రాశి)',
    ascendantBig3: 'లగ్నం (శరీరం & వ్యక్తిత్వం)',
    coreWill: 'ఆత్మ బలం & ప్రాణ శక్తి',
    innerSelf: 'అంతఃచేతన & భావోద్వేగం',
    helmRising: 'శరీర ఆకృతి & వ్యక్తిత్వం',
    planetaryPlacementsTable: 'నవగ్రహ స్థితులు & డిగ్రీలు',
    planetCol: 'గ్రహం',
    symbolCol: 'చిహ్నం',
    signCol: 'రాశి',
    degreeCol: 'డిగ్రీ',
    motionCol: 'గతి',
    houseCol: 'భావం',
    dignityCol: 'స్థితి',
    directMotion: 'సవ్య గతి',
    retrogradeMotion: 'వక్ర గతి',
    houseCuspsHeading: '12 భావాల స్థితులు',
    elementDistributionHeading: 'పంచభూత సమతుల్యత',
    modalityDistributionHeading: 'స్వభావ సమతుల్యత (చర/స్థిర/ద్విస్వభావ)',
    aspectsHeading: 'ప్రధాన గ్రహ వీక్షణలు',
    chartSynthesisHeading: 'జన్మ కుండలి విశ్లేషణ',

    ephemerisTitle: 'ఖగోళ నవగ్రహ పంచాంగం',
    ephemerisSubtitle: 'ఖగోళ శాస్త్ర సూత్రాల ప్రకారం లెక్కించబడిన గ్రహాల ప్రత్యక్ష స్థితులు.',
    ephemerisRealTimeBadge: 'ప్రత్యక్ష గ్రహ సంచారం',
    astronomicalJulianDate: 'జూలియన్ పంచాంగ గణన',
    celestialLongitude: 'ఖగోళ రేఖాంశం',
    ephemerisNotice: 'అన్ని గ్రహ స్థితులు అత్యున్నత ఖగోళ ఖచ్చితత్వంతో లెక్కించబడుతున్నాయి.',

    synastryTitle: 'జాతక & వివాహ పొంతన',
    synastrySubtitle: 'ఇద్దరి రాశుల మధ్య మానసిక అనుకూలత, ప్రేమ మరియు సామరస్యాన్ని విశ్లేషించండి.',
    firstPartnerSign: 'మొదటి వ్యక్తి రాశి',
    secondPartnerSign: 'రెండవ వ్యక్తి రాశి',
    overallHarmonyScore: 'మొత్తం పొంతన',
    romanceAffinity: 'ప్రేమ బంధం',
    intellectCommunication: 'బుద్ధి & సంభాషణ',
    emotionalResonance: 'భావోద్వేగ సామరస్యం',
    elementalDynamic: 'తత్వాల కలయిక',
    synthesisAdvice: 'జ్యోతిష్య విశ్లేషణ & సలహా',

    compendiumTitle: 'సాంప్రదాయ జ్యోతిష్య గ్రంథం',
    compendiumSubtitle: 'వేద మరియు సాంప్రదాయ జ్యోతిష్య గ్రంథాల మూల సూత్రాలు.',
    classicalTraditions: 'సాంప్రదాయ జ్యోతిష్య సిద్ధాంతాలు',
    keyPrinciplesLabel: 'ముఖ్యమైన జ్యోతిష్య సూత్రాలు',
    planetaryDignities: 'గ్రహాల ఉచ్ఛ, నీచ, స్వక్షేత్ర పట్టిక',
    aspectDoctrine: 'గ్రహ దృష్టుల సిద్ధాంతం',

    tarotOracleTitle: 'టారో ఒరాకిల్ మార్గదర్శకత్వం',
    tarotOracleSubtitle: '78 తత్వ సంకేతాల ద్వారా అంతర్మథనం మరియు దివ్య జ్ఞానాన్ని పొందండి.',
    tarotTitle: 'టారో ఒరాకిల్ మార్గదర్శకత్వం',
    drawCardBtn: 'కార్డు తీయండి',
    reshuffleBtn: 'తిరిగి కలపండి',
    cardDrawn: 'వెల్లడైన కార్డు',
    archetypalMeaning: 'చిహ్నార్థం & విశ్లేషణ',
    cosmicAdvice: 'నేటి దివ్య సూచన',

    authLoginMode: 'లాగిన్ (login.html)',
    authSignupMode: 'నమోదు (signup.html)',
    loginHeading: 'ఆస్ట్రోవర్స్‌లో లాగిన్ అవ్వండి',
    signupHeading: 'కొత్త ఖాతాను ప్రారంభించండి',
    loginSubtext: 'ధృవీకరించబడిన ఇమెయిల్‌ను నమోదు చేసి తక్షణ కోడ్ ద్వారా ప్రవేశించండి.',
    signupSubtext: 'అన్ని జ్యోతిష్య సాధనాలను ఉపయోగించడానికి మీ వివరాలను నమోదు చేయండి.',
    fullNameLabel: 'పూర్తి పేరు',
    passwordLabel: 'పాస్‌వర్డ్',
    sunSignOptional: 'మీ రాశి (ఐచ్ఛికం)',
    needAccount: 'ఖాతా లేదా? ఇప్పుడే నమోదు చేసుకోండి',
    alreadyHaveAccount: 'ఖాతా ఉన్నదా? లాగిన్ అవ్వండి',
    backToHome: 'హోమ్ పేజీకి తిరిగి వెళ్లండి',

    footerDesc: 'సాంప్రదాయ ఖగోళ నియమాల ఆధారంగా రూపొందించబడిన ఆధునిక జ్యోతిష్య పోర్టల్. విద్యా మరియు పరిశోధన ప్రయోజనాల కొరకు నిర్మించబడింది.',
    footerCopyright: '© 2026 ఆస్ట్రోవర్స్. ఖచ్చితమైన ఖగోళ గణనలతో రూపొందించబడింది.',
    julianDayLabel: 'జూలియన్ పంచాంగం',
    emailSmtpLabel: 'ఇమెయిల్ ధృవీకరణ (SMTP)',
    verifiedSessionLabel: 'ధృవీకరించబడిన వినియోగదారు',

    signNames: {
      aries: 'మేషం',
      taurus: 'వృషభం',
      gemini: 'మిథునం',
      cancer: 'కర్కాటకం',
      leo: 'సింహం',
      virgo: 'కన్య',
      libra: 'తుల',
      scorpio: 'వృశ్చికం',
      sagittarius: 'ధనుస్సు',
      capricorn: 'మకరం',
      aquarius: 'కుంభం',
      pisces: 'మీనం',
    },
    elementNames: {
      Fire: 'అగ్ని తత్వం',
      Earth: 'భూ తత్వం',
      Air: 'వాయు తత్వం',
      Water: 'జల తత్వం',
    },
    modalityNames: {
      Cardinal: 'చర రాశి',
      Fixed: 'స్థిర రాశి',
      Mutable: 'ద్విస్వభావ రాశి',
    },
    planetNames: {
      Sun: 'సూర్యుడు',
      Moon: 'చంద్రుడు',
      Mars: 'కుజుడు (అంగారకుడు)',
      Mercury: 'బుధుడు',
      Jupiter: 'గురుడు (బృహస్పతి)',
      Venus: 'శుక్రుడు',
      Saturn: 'శని',
      Uranus: 'యురేనస్',
      Neptune: 'నెప్ట్యూన్',
      Pluto: 'ప్లూటో',
    },
  },

  hi: {
    siteName: 'एस्ट्रोवर्स',
    tagline: 'आधुनिक वेब-आधारित ज्योतिष मंच',
    zodiacSigns: 'राशि चक्र',
    horoscopes: 'दैनिक राशिफल',
    ephemeris: 'ग्रह स्थितियां व पंचांग',
    birthChart: 'जन्म कुंडली',
    compendium: 'पारंपरिक ज्योतिष',
    synastry: 'कुंडली मिलान',
    tarotOracle: 'टैरो ओराकल',
    adminConsole: 'व्यवस्थापक पैनल',
    signIn: 'साइन इन',
    register: 'पंजीकरण',
    signOut: 'साइन आउट',
    askOracle: 'ओराकल से पूछें',
    selectLanguage: 'भाषा',
    welcomeBack: 'पुनः स्वागत है',
    authenticatedAs: 'प्रमाणित रूप में',
    adminRole: 'व्यवस्थापक',
    seekerRole: 'जिज्ञासु',
    signedOutMsg: 'एस्ट्रोवर्स सत्र से साइन आउट हो गए।',

    heroBadge1: 'खगोलीय पंचांग संरचना',
    heroBadge2: 'शैक्षणिक ज्योतिषीय अनुसंधान',
    heroBadge3: 'स्थापित 2026',
    heroTitle: 'मन और ब्रह्मांड की दिव्य खगोलीय संरचना',
    heroSubtitle: 'गणितीय सटीकता के साथ निर्मित एक आधुनिक ज्योतिषीय पोर्टल। 12 राशियों के मूल स्वरूप, वास्तविक समय की ग्रहीय स्थितियों, जन्म कुंडली और शास्त्रीय ज्योतिष सूत्रों का अन्वेषण करें।',
    calcBirthChartBtn: 'जन्म कुंडली बनाएं',
    currentTransitDate: 'वर्तमान गोचर तिथि',
    sunPositionLabel: 'सूर्य की खगोलीय स्थिति',
    moonPositionLabel: 'चंद्रमा की खगोलीय स्थिति',

    emailVerificationReq: 'ईमेल सत्यापन कोड आवश्यक है',
    gateTitle: 'ज्योतिषीय अनुभागों को अनलॉक करने हेतु ईमेल कोड सत्यापित करें',
    gateSubtitle: 'सभी विषय अनुभाग (राशि चक्र, दैनिक राशिफल, पंचांग, जन्म कुंडली, पारंपरिक ज्योतिष, कुंडली मिलान, टैरो ओराकल) सुरक्षित हैं। 6-अंकीय सत्यापन कोड प्राप्त करने के लिए अपना ईमेल दर्ज करें।',
    emailLabel: 'ईमेल पता (SMTP सत्यापन)',
    emailPlaceholder: 'उदा. yourname@domain.com',
    sendCodeBtn: 'सत्यापन कोड भेजें',
    sendingCode: 'कोड भेजा जा रहा है...',
    codeSentMsg: '6-अंकीय कोड आपके ईमेल पर भेज दिया गया है!',
    enterCodeLabel: '6-अंकीय कोड दर्ज करें',
    codePlaceholder: '123456',
    verifyBtn: 'सत्यापित कर पोर्टल खोलें',
    verifyingBtn: 'सत्यापित हो रहा है...',
    resendCode: 'पुनः कोड भेजें',
    orQuickDemo: 'अथवा त्वरित डेमो प्रवेश',
    continueAsSeeker: 'जिज्ञासु के रूप में प्रवेश (डेमो)',
    continueAsAdmin: 'व्यवस्थापक के रूप में प्रवेश (डेमो)',
    portalLockNotice: 'ईमेल सत्यापन कोड से सत्यापित होने तक सभी विषय लॉक रहेंगे।',
    unlockedFeaturesHeading: 'सत्यापन के उपरांत अनलॉक होने वाले 7 मुख्य ज्योतिषीय मॉड्यूल',
    featZodiacTitle: '12 राशियां और उनके मूल तत्व',
    featZodiacDesc: '12 राशियों की विशेषताएं, स्वामी ग्रह, गुण, रत्न और व्यापक विश्लेषण।',
    featHoroscopeTitle: 'दैनिक ग्रहीय राशिफल',
    featHoroscopeDesc: 'वर्तमान गोचरीय ग्रह स्थितियों के आधार पर सभी राशियों का सटीक दैनिक भविष्यफल।',
    featEphemerisTitle: 'खगोलीय ग्रह स्थितियां (पंचांग)',
    featEphemerisDesc: 'सूर्य, चंद्र सहित नवग्रहों की तात्कालिक अंश स्थिति, गति और वक्रता।',
    featBirthChartTitle: 'सटीक जन्म कुंडली कैलकुलेटर',
    featBirthChartDesc: 'लग्न, राशि, 12 भाव और ग्रहों की उच्च-नीच अवस्थाओं का विस्तृत चार्ट।',
    featCompendiumTitle: 'शास्त्रीय ज्योतिषीय संहिता',
    featCompendiumDesc: 'ग्रहों के दिग्बल, दृष्टि, उच्च, नीच और युति के पारंपरिक शास्त्रीय नियम।',
    featSynastryTitle: 'कुंडली व गुण मिलान',
    featSynastryDesc: 'दो राशियों के मध्य प्रेम, वैचारिक सामंजस्य और भावनात्मक अनुकूलता।',
    featTarotTitle: 'टैरो ओराकल मार्गदर्शन',
    featTarotDesc: '78 टैरो प्रतीकों के माध्यम से जीवन दर्शन और आध्यात्मिक मार्गदर्शन।',

    zodiacHeadline: '12 राशियां और उनके दैवीय स्वरूप',
    zodiacSubheadline: 'प्रत्येक 30° का क्रांतिवृत्त खंड पंचतत्व, ऋतु स्वभाव और स्वामी ग्रह की ऊर्जा का प्रतीक है।',
    filterAll: 'सभी',
    filterFire: 'अग्नि तत्व',
    filterEarth: 'पृथ्वी तत्व',
    filterAir: 'वायु तत्व',
    filterWater: 'जल तत्व',
    filterCardinal: 'चर राशि',
    filterFixed: 'स्थिर राशि',
    filterMutable: 'द्विस्वभाव राशि',
    eclipticWheelLabel: 'क्रांतिवृत्त राशि चक्र',
    geocentricFrame: '360° भूकेन्द्रीय चक्र',
    elementLabel: 'तत्व',
    modalityLabel: 'स्वभाव',
    gemstoneLabel: 'रत्न',
    tarotLabel: 'टैरो',
    ruledByLabel: 'स्वामी ग्रह',
    houseLabel: 'भाव',
    cosmicArchetypeTitle: 'राशि स्वरूप और व्यापक परिचय',
    strengthsTitle: 'सकारात्मक गुण और विशेषताएं',
    challengesTitle: 'चुनौतियां और सुधार क्षेत्र',
    loveCompatibilityTitle: 'प्रेम और संबंध',
    careerVocationsTitle: 'करियर और कार्यक्षेत्र',
    viewHoroscopeBtn: 'दैनिक राशिफल देखें',
    checkCompatibilityBtn: 'अनुकूलता जांचें',

    dailyHoroscopesTitle: 'दैनिक गोचरीय राशिफल',
    dailyHoroscopesSubtitle: 'आज के ग्रहीय गोचर और दृष्टियों के आधार पर प्रत्येक राशि का फलादेश।',
    chooseSignLabel: 'अपनी राशि चुनें',
    forecastForToday: 'आज का भविष्यफल',
    cosmicOverview: 'गोचर ग्रहीय प्रभाव',
    loveRelationships: 'प्रेम और संबंध',
    careerFinance: 'कार्यक्षेत्र और धन',
    wellnessVitality: 'स्वास्थ्य और ऊर्जा',
    luckyColorLabel: 'शुभ रंग',
    luckyNumbersLabel: 'शुभ अंक',
    compatibleSignsLabel: 'अनुकूल राशियां',
    celestialAspectLabel: 'प्रमुख ग्रहीय दृष्टि',
    askAiAboutSign: 'इस राशिफल के बारे में ओराकल से पूछें',

    birthChartTitle: 'सटीक जन्म कुंडली कैलकुलेटर',
    birthChartSubtitle: 'जन्म तिथि, समय और स्थान के आधार पर लग्न, राशि और ग्रहों के अंशों की गणना करें।',
    birthParametersHeading: 'जन्म विवरण दर्ज करें',
    birthDateLabel: 'जन्म तिथि',
    birthTimeLabel: 'जन्म समय (स्थानीय)',
    cityLocationLabel: 'जन्म स्थान',
    castChartButton: 'जन्म कुंडली बनाएं',
    sunSignBig3: 'सूर्य राशि (आत्म बल)',
    moonSignBig3: 'चंद्र राशि (मन - राशि)',
    ascendantBig3: 'लग्न (शरीर व व्यक्तित्व)',
    coreWill: 'आत्म बल और जीवन शक्ति',
    innerSelf: 'अंतर्मन और भावनाएं',
    helmRising: 'व्यक्तित्व और शारीरिक रूप',
    planetaryPlacementsTable: 'ग्रह स्थितियां और अंश',
    planetCol: 'ग्रह',
    symbolCol: 'प्रतीक',
    signCol: 'राशि',
    degreeCol: 'अंश',
    motionCol: 'गति',
    houseCol: 'भाव',
    dignityCol: 'स्थिति',
    directMotion: 'मार्गी',
    retrogradeMotion: 'वक्री',
    houseCuspsHeading: 'द्वादश भावों की स्थिति',
    elementDistributionHeading: 'पंचतत्व संतुलन',
    modalityDistributionHeading: 'स्वभाव संतुलन (चर/स्थिर/द्विस्वभाव)',
    aspectsHeading: 'प्रमुख ग्रहीय दृष्टियां',
    chartSynthesisHeading: 'जन्म कुंडली विवेचना',

    ephemerisTitle: 'खगोलीय नवग्रह पंचांग',
    ephemerisSubtitle: 'खगोल विज्ञान के नियमों पर आधारित ग्रहों की तात्कालिक वास्तविक स्थितियां।',
    ephemerisRealTimeBadge: 'तात्कालिक गोचर स्थिति',
    astronomicalJulianDate: 'जूलियन पंचांग गणना',
    celestialLongitude: 'खगोलीय रेखांश',
    ephemerisNotice: 'समस्त ग्रहीय स्थितियां उच्चतम खगोलीय सटीकता के साथ आकलित की गई हैं।',

    synastryTitle: 'कुंडली व गुण मिलान',
    synastrySubtitle: 'दो व्यक्तियों के मध्य बौद्धिक, भावनात्मक और दांपत्य अनुकूलता का विश्लेषण करें।',
    firstPartnerSign: 'प्रथम व्यक्ति की राशि',
    secondPartnerSign: 'द्वितीय व्यक्ति की राशि',
    overallHarmonyScore: 'कुल सामंजस्य',
    romanceAffinity: 'प्रेम और आकर्षण',
    intellectCommunication: 'संवाद और विचार',
    emotionalResonance: 'भावनात्मक सामंजस्य',
    elementalDynamic: 'तत्वों का मेल',
    synthesisAdvice: 'ज्योतिषीय विवेचना और सुझाव',

    compendiumTitle: 'शास्त्रीय ज्योतिषीय संहिता',
    compendiumSubtitle: 'वैदिक और पारंपरिक ज्योतिषीय सिद्धांतों का प्रामाणिक संग्रह।',
    classicalTraditions: 'शास्त्रीय ज्योतिष सिद्धांत',
    keyPrinciplesLabel: 'प्रमुख ज्योतिषीय सूत्र',
    planetaryDignities: 'ग्रहों की उच्च, नीच, स्वराशि तालिका',
    aspectDoctrine: 'ग्रहों की पूर्ण दृष्टियां',

    tarotOracleTitle: 'टैरो ओराकल मार्गदर्शन',
    tarotOracleSubtitle: '78 प्रतीकात्मक कार्डों के माध्यम से आत्मचिंतन और प्रेरणा प्राप्त करें।',
    tarotTitle: 'टैरो ओराकल मार्गदर्शन',
    drawCardBtn: 'कार्ड निकालें',
    reshuffleBtn: 'पुनः फेंटें',
    cardDrawn: 'प्रकट हुआ कार्ड',
    archetypalMeaning: 'प्रतीकात्मक अर्थ और व्याख्या',
    cosmicAdvice: 'आज का दिव्य मार्गदर्शन',

    authLoginMode: 'साइन इन (login.html)',
    authSignupMode: 'पंजीकरण (signup.html)',
    loginHeading: 'एस्ट्रोवर्स में साइन इन करें',
    signupHeading: 'नया खाता बनाएं',
    loginSubtext: 'अपने सत्यापित ईमेल पर तुरंत 6-अंकीय कोड प्राप्त करके प्रवेश करें।',
    signupSubtext: 'सभी ज्योतिषीय उपकरणों का उपयोग करने के लिए अपना विवरण दर्ज करें।',
    fullNameLabel: 'पूरा नाम',
    passwordLabel: 'पासवर्ड',
    sunSignOptional: 'आपकी राशि (वैकल्पिक)',
    needAccount: 'खाता नहीं है? पंजीकरण करें',
    alreadyHaveAccount: 'पहले से पंजीकृत हैं? साइन इन करें',
    backToHome: 'एस्ट्रोवर्स मुख्य पृष्ठ पर वापस जाएं',

    footerDesc: 'शास्त्रीय खगोलीय सिद्धांतों पर आधारित एक आधुनिक ज्योतिषीय पोर्टल। शैक्षिक एवं अनुसंधान उद्देश्यों के लिए निर्मित।',
    footerCopyright: '© 2026 एस्ट्रोवर्स। उच्च खगोलीय सटीकता के साथ निर्मित।',
    julianDayLabel: 'जूलियन पंचांग',
    emailSmtpLabel: 'ईमेल सत्यापन (SMTP)',
    verifiedSessionLabel: 'सत्यापित उपयोगकर्ता',

    signNames: {
      aries: 'मेष',
      taurus: 'वृषभ',
      gemini: 'मिथुन',
      cancer: 'कर्क',
      leo: 'सिंह',
      virgo: 'कन्या',
      libra: 'तुला',
      scorpio: 'वृश्चिक',
      sagittarius: 'धनु',
      capricorn: 'मकर',
      aquarius: 'कुंभ',
      pisces: 'मीन',
    },
    elementNames: {
      Fire: 'अग्नि तत्व',
      Earth: 'पृथ्वी तत्व',
      Air: 'वायु तत्व',
      Water: 'जल तत्व',
    },
    modalityNames: {
      Cardinal: 'चर राशि',
      Fixed: 'स्थिर राशि',
      Mutable: 'द्विस्वभाव राशि',
    },
    planetNames: {
      Sun: 'सूर्य',
      Moon: 'चंद्रमा',
      Mars: 'मंगल',
      Mercury: 'बुध',
      Jupiter: 'गुरु (बृहस्पति)',
      Venus: 'शुक्र',
      Saturn: 'शनि',
      Uranus: 'यूरेनस',
      Neptune: 'नेपच्यून',
      Pluto: 'प्लूटो',
    },
  },
};
