import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ZodiacWheel } from './components/ZodiacWheel.tsx';
import { DailyHoroscopes } from './components/DailyHoroscopes.tsx';
import { PlanetaryEphemeris } from './components/PlanetaryEphemeris.tsx';
import { BirthChartCalculator } from './components/BirthChartCalculator.tsx';
import { TraditionalCompendium } from './components/TraditionalCompendium.tsx';
import { SynastryCompatibility } from './components/SynastryCompatibility.tsx';
import { TarotOracleDraw } from './components/TarotOracleDraw.tsx';
import { AuthGateCard } from './components/AuthGateCard.tsx';
import { AdminPanel } from './components/AdminPanel.tsx';
import { AuthPage } from './components/AuthPage.tsx';
import { GeminiOracleModal } from './components/GeminiOracleModal.tsx';
import { ZodiacSign, PlanetaryPositionData, UserProfile } from './types.ts';
import { useLanguage } from './context/LanguageContext.tsx';
import { Sparkles, Compass, Moon, Orbit, BookOpen, Heart, ShieldCheck, CheckCircle, LogIn, LogOut, User } from 'lucide-react';

export default function App() {
  const { t } = useLanguage();
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'signup'>('landing');
  const [activeTab, setActiveTab] = useState<string>('zodiac');
  const [signs, setSigns] = useState<ZodiacSign[]>([]);
  const [ephemerisPositions, setEphemerisPositions] = useState<PlanetaryPositionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Authenticated user session
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('astroverse_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Toast / notification after login
  const [authNotice, setAuthNotice] = useState<string | null>(null);

  // Oracle modal state
  const [isOracleOpen, setIsOracleOpen] = useState<boolean>(false);
  const [oracleSign, setOracleSign] = useState<string>('Aries');
  const [oracleQuestion, setOracleQuestion] = useState<string>('');

  // Initial data loading from server SQLite API
  useEffect(() => {
    let isMounted = true;

    Promise.all([
      fetch('/api/zodiac').then((res) => res.json()),
      fetch('/api/ephemeris').then((res) => res.json()),
    ])
      .then(([zodiacData, ephemData]) => {
        if (isMounted) {
          if (Array.isArray(zodiacData)) setSigns(zodiacData);
          if (ephemData && ephemData.positions) setEphemerisPositions(ephemData.positions);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load initial data:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('astroverse_user', JSON.stringify(user));
    } catch (e) {
      console.warn('Could not save user to localStorage:', e);
    }
    setCurrentView('landing');
    setAuthNotice(`Welcome back, ${user.name}! Authenticated as ${user.role === 'admin' ? 'Administrator' : 'Seeker'}.`);
    if (user.role === 'admin') {
      setActiveTab('admin');
    }
    setTimeout(() => setAuthNotice(null), 5000);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('astroverse_user');
    } catch (e) {
      console.warn('Could not clear user localStorage:', e);
    }
    if (activeTab === 'admin') setActiveTab('zodiac');
    setAuthNotice('Signed out of AstroVerse session.');
    setTimeout(() => setAuthNotice(null), 3000);
  };

  const handleOpenOracle = (sign = 'Aries', question = '') => {
    setOracleSign(sign);
    setOracleQuestion(question);
    setIsOracleOpen(true);
  };

  const handleSelectSignForHoroscope = (signKey: string) => {
    setActiveTab('horoscopes');
  };

  const handleSelectSignForCompatibility = (signKey: string) => {
    setActiveTab('compatibility');
  };

  // If in Login or Sign Up page mode
  if (currentView === 'login' || currentView === 'signup') {
    return (
      <AuthPage
        initialMode={currentView}
        onSuccess={handleAuthSuccess}
        onCancelToLanding={() => setCurrentView('landing')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#090b14] text-slate-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-200">
      {/* Strict 3-Zone Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenOracle={() => handleOpenOracle()}
        currentUser={currentUser}
        onOpenAuth={(mode) => setCurrentView(mode || 'login')}
        onSignOut={handleSignOut}
      />

      {/* Floating Auth Notification Toast */}
      {authNotice && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 border border-amber-500/40 text-amber-200 px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{authNotice}</span>
        </div>
      )}

      {/* Hero Section */}
      <HeroSection
        onSelectTab={setActiveTab}
        ephemerisData={ephemerisPositions}
        onOpenOracle={() => handleOpenOracle()}
      />

      {/* Main Content Workspace Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {!currentUser ? (
          /* Email Verification Code Gateway (Locked when not authenticated) */
          <div id="portal-auth-gate">
            <AuthGateCard
              onSuccess={handleAuthSuccess}
              onOpenFullAuth={(mode) => setCurrentView(mode)}
            />
          </div>
        ) : (
          /* Full Astrological Suite & Topic Tabs (Unlocked & Functional when Authenticated) */
          <div>
            {/* Secondary Sub-navigation Toolbar with Topic Tabs */}
            <div className="flex items-center justify-between pb-8 mb-8 border-b border-slate-800/80">
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                <button
                  onClick={() => setActiveTab('zodiac')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'zodiac'
                      ? 'bg-amber-400/20 text-amber-300 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>{t('zodiacSigns', 'Zodiac Wheel')}</span>
                </button>

                <button
                  onClick={() => setActiveTab('horoscopes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'horoscopes'
                      ? 'bg-amber-400/20 text-amber-300 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>{t('horoscopes', 'Horoscopes')}</span>
                </button>

                <button
                  onClick={() => setActiveTab('ephemeris')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'ephemeris'
                      ? 'bg-amber-400/20 text-amber-300 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Orbit className="w-3.5 h-3.5" />
                  <span>{t('ephemeris', 'Ephemeris')}</span>
                </button>

                <button
                  onClick={() => setActiveTab('birth-chart')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'birth-chart'
                      ? 'bg-amber-400/20 text-amber-300 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>{t('birthChart', 'Birth Chart')}</span>
                </button>

                <button
                  onClick={() => setActiveTab('compendium')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'compendium'
                      ? 'bg-amber-400/20 text-amber-300 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{t('compendium', 'Compendium')}</span>
                </button>

                <button
                  onClick={() => setActiveTab('compatibility')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'compatibility'
                      ? 'bg-amber-400/20 text-amber-300 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>{t('synastry', 'Synastry')}</span>
                </button>

                <button
                  onClick={() => setActiveTab('tarot')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'tarot'
                      ? 'bg-amber-400/20 text-amber-300 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t('tarotOracle', 'Tarot Oracle')}</span>
                </button>

                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => setActiveTab('admin')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      activeTab === 'admin'
                        ? 'bg-amber-400/20 text-amber-300 font-semibold border border-amber-500/30 shadow-sm'
                        : 'text-amber-400 hover:text-amber-300'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{t('adminConsole', 'Admin Console')}</span>
                  </button>
                )}
              </div>

              <div className="hidden sm:flex items-center gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{currentUser.name}</span>
                  <span className="text-[10px] text-amber-300 font-mono">
                    ({currentUser.role === 'admin' ? t('adminRole', 'Admin') : t('seekerRole', 'Seeker')})
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                  title={t('signOut', 'Sign Out')}
                >
                  <LogOut className="w-3 h-3" />
                  <span>{t('signOut', 'Sign Out')}</span>
                </button>
              </div>
            </div>

            {/* Active Functional Tab Views */}
            {activeTab === 'zodiac' && (
              <ZodiacWheel
                signs={signs}
                onSelectSignForHoroscope={handleSelectSignForHoroscope}
                onSelectSignForCompatibility={handleSelectSignForCompatibility}
              />
            )}

            {activeTab === 'horoscopes' && (
              <DailyHoroscopes
                signs={signs}
                initialSignKey="aries"
                onOpenOracleWithSign={(signName, question) => handleOpenOracle(signName, question)}
              />
            )}

            {activeTab === 'ephemeris' && (
              <PlanetaryEphemeris initialPositions={ephemerisPositions} />
            )}

            {activeTab === 'birth-chart' && (
              <BirthChartCalculator
                onOpenOracleWithBirthChart={(summary) => handleOpenOracle('Aries', summary)}
              />
            )}

            {activeTab === 'compendium' && (
              <TraditionalCompendium />
            )}

            {activeTab === 'compatibility' && (
              <SynastryCompatibility signs={signs} />
            )}

            {activeTab === 'tarot' && (
              <TarotOracleDraw />
            )}

            {activeTab === 'admin' && currentUser.role === 'admin' && (
              <AdminPanel currentUser={currentUser} />
            )}
          </div>
        )}
      </main>

      {/* Editorial Footer */}
      <footer className="border-t border-slate-800/80 bg-[#07080f] py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-base font-serif font-bold text-amber-200">{t('siteName', 'AstroVerse')}</span>
              <p className="text-slate-400 text-xs max-w-md">
                {t('footerDesc', 'A modern web-based astrology engine reverse-engineered from classical astronomical ephemerides. Built for educational and informational study of celestial mechanics, planetary archetypes, and harmonic astrology.')}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
              <button
                onClick={() => {
                  if (currentUser) setActiveTab('zodiac');
                  else document.getElementById('portal-auth-gate')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                {t('zodiacSigns', 'Zodiac Signs')}
              </button>
              <button
                onClick={() => {
                  if (currentUser) setActiveTab('ephemeris');
                  else document.getElementById('portal-auth-gate')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                {t('ephemeris', 'Ephemeris')}
              </button>
              <button
                onClick={() => {
                  if (currentUser) setActiveTab('birth-chart');
                  else document.getElementById('portal-auth-gate')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                {t('birthChart', 'Birth Chart')}
              </button>
              <button
                onClick={() => {
                  if (currentUser) setActiveTab('compendium');
                  else document.getElementById('portal-auth-gate')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                {t('compendium', 'Compendium')}
              </button>
              <button onClick={() => setCurrentView('login')} className="hover:text-amber-300 transition-colors cursor-pointer">
                {t('signIn', 'Sign In')} (login.html)
              </button>
              <button onClick={() => setCurrentView('signup')} className="hover:text-amber-300 transition-colors cursor-pointer">
                {t('register', 'Register')} (signup.html)
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <span>{t('footerCopyright', '© 2026 AstroVerse. Designed with astronomical precision for educational research.')}</span>
            <div className="flex items-center gap-3">
              <span>{t('julianDayLabel', 'Julian Day Ephemeris')}</span>
              <span>·</span>
              <span>{t('emailSmtpLabel', 'Email Verification (SMTP)')}</span>
              <span>·</span>
              <span>{t('verifiedSessionLabel', 'Verified User Authentication')}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Astrological Oracle Modal */}
      <GeminiOracleModal
        isOpen={isOracleOpen}
        onClose={() => setIsOracleOpen(false)}
        defaultSign={oracleSign}
        defaultQuestion={oracleQuestion}
      />
    </div>
  );
}
