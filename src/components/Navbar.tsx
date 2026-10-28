import React from 'react';
import { Sparkles, ShieldCheck, LogOut } from 'lucide-react';
import { UserProfile } from '../types.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { LanguageSelector } from './LanguageSelector.tsx';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenOracle: () => void;
  currentUser: UserProfile | null;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenOracle,
  currentUser,
  onOpenAuth,
  onSignOut,
}) => {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-[#090b14]/95 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => setActiveTab('zodiac')}
          className="text-xl font-serif font-bold tracking-wider text-amber-200 hover:text-amber-100 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
        >
          {t('siteName', 'AstroVerse')}
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('zodiac')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-300 cursor-pointer ${
              activeTab === 'zodiac' ? 'text-amber-300 underline underline-offset-8 decoration-amber-400 font-semibold' : ''
            }`}
          >
            {t('zodiacSigns', 'Zodiac Signs')}
          </button>
          <button
            onClick={() => setActiveTab('horoscopes')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-300 cursor-pointer ${
              activeTab === 'horoscopes' ? 'text-amber-300 underline underline-offset-8 decoration-amber-400 font-semibold' : ''
            }`}
          >
            {t('horoscopes', 'Horoscopes')}
          </button>
          <button
            onClick={() => setActiveTab('ephemeris')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-300 cursor-pointer ${
              activeTab === 'ephemeris' ? 'text-amber-300 underline underline-offset-8 decoration-amber-400 font-semibold' : ''
            }`}
          >
            {t('ephemeris', 'Ephemeris')}
          </button>
          <button
            onClick={() => setActiveTab('birth-chart')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-300 cursor-pointer ${
              activeTab === 'birth-chart' ? 'text-amber-300 underline underline-offset-8 decoration-amber-400 font-semibold' : ''
            }`}
          >
            {t('birthChart', 'Birth Chart')}
          </button>
          <button
            onClick={() => setActiveTab('compendium')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-300 cursor-pointer ${
              activeTab === 'compendium' ? 'text-amber-300 underline underline-offset-8 decoration-amber-400 font-semibold' : ''
            }`}
          >
            {t('compendium', 'Compendium')}
          </button>
          {currentUser && currentUser.role === 'admin' && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 text-amber-300 hover:text-amber-200 cursor-pointer ${
                activeTab === 'admin' ? 'underline underline-offset-8 decoration-amber-400 font-semibold' : ''
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('adminConsole', 'Admin Console')}</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Language Selector, Auth Controls & Oracle CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Familiar, accessible Language Selector Button with Globe */}
          <LanguageSelector variant="navbar" />

          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="text-xs font-medium text-slate-200 truncate max-w-[110px]">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-amber-300 font-mono">
                  {currentUser.role === 'admin' ? t('adminRole', 'Administrator') : t('seekerRole', 'Seeker')}
                </span>
              </div>

              <button
                onClick={onSignOut}
                title={t('signOut', 'Sign Out')}
                className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-amber-300 hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                {t('signIn', 'Sign In')}
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="hidden sm:inline-block px-2.5 py-1.5 text-xs text-amber-300 hover:text-amber-200 bg-amber-400/10 border border-amber-500/20 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                {t('register', 'Register')}
              </button>
            </div>
          )}

          <button
            onClick={onOpenOracle}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-wide uppercase text-amber-950 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 hover:from-amber-200 hover:to-amber-300 rounded-lg shadow-sm hover:shadow-amber-500/20 transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-950" />
            <span className="hidden xs:inline">{t('askOracle', 'Ask Oracle')}</span>
          </button>
        </div>
      </div>

      {/* Mobile nav rail */}
      <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 bg-[#0d101d] border-t border-slate-800/60 gap-4 text-xs font-medium text-slate-300 scrollbar-none">
        <button
          onClick={() => setActiveTab('zodiac')}
          className={`whitespace-nowrap ${activeTab === 'zodiac' ? 'text-amber-300 font-bold' : ''}`}
        >
          {t('zodiacSigns', 'Zodiac')}
        </button>
        <button
          onClick={() => setActiveTab('horoscopes')}
          className={`whitespace-nowrap ${activeTab === 'horoscopes' ? 'text-amber-300 font-bold' : ''}`}
        >
          {t('horoscopes', 'Horoscopes')}
        </button>
        <button
          onClick={() => setActiveTab('ephemeris')}
          className={`whitespace-nowrap ${activeTab === 'ephemeris' ? 'text-amber-300 font-bold' : ''}`}
        >
          {t('ephemeris', 'Ephemeris')}
        </button>
        <button
          onClick={() => setActiveTab('birth-chart')}
          className={`whitespace-nowrap ${activeTab === 'birth-chart' ? 'text-amber-300 font-bold' : ''}`}
        >
          {t('birthChart', 'Birth Chart')}
        </button>
        <button
          onClick={() => setActiveTab('compendium')}
          className={`whitespace-nowrap ${activeTab === 'compendium' ? 'text-amber-300 font-bold' : ''}`}
        >
          {t('compendium', 'Compendium')}
        </button>
        {currentUser && currentUser.role === 'admin' && (
          <button
            onClick={() => setActiveTab('admin')}
            className={`whitespace-nowrap text-amber-300 ${activeTab === 'admin' ? 'font-bold' : ''}`}
          >
            {t('adminConsole', 'Admin')}
          </button>
        )}
      </div>
    </header>
  );
};
