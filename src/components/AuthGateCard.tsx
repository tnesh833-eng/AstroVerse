import React, { useState } from 'react';
import { Mail, KeyRound, ArrowRight, ShieldCheck, Sparkles, CheckCircle, AlertCircle, Compass, Moon, Orbit, BookOpen, Heart } from 'lucide-react';
import { UserProfile } from '../types.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

interface AuthGateCardProps {
  onSuccess: (user: UserProfile) => void;
  onOpenFullAuth: (mode: 'login' | 'signup') => void;
}

export const AuthGateCard: React.FC<AuthGateCardProps> = ({ onSuccess, onOpenFullAuth }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('vinayagarmurugan307@gmail.com');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [devCode, setDevCode] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Send 6-Digit OTP via SMTP
  const handleSendCode = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email || !email.includes('@')) {
      setError(t('emailPlaceholder', 'Please enter a valid email address.'));
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/auth/request-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch verification code');
      }

      setCodeSent(true);
      setSuccessMsg(`${t('codeSentMsg', 'Verification code dispatched to your email!')} (${email})`);
      if (data.devCode) {
        setDevCode(data.devCode);
        setCode(data.devCode);
      }
    } catch (err: any) {
      setError(err.message || 'Error sending verification code.');
    } finally {
      setLoading(false);
    }
  };

  // Verify 6-digit OTP code
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.trim().length < 6) {
      setError('Please enter the full 6-digit verification code.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: code.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid or expired verification code');
      }

      onSuccess(data.user);
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please check the code.');
    } finally {
      setLoading(false);
    }
  };

  // Instant demo access
  const handleQuickLogin = (role: 'user' | 'admin') => {
    const demoUser: UserProfile = {
      id: role === 'admin' ? 1 : 2,
      email: role === 'admin' ? 'admin@astroverse.com' : 'seeker@astroverse.com',
      name: role === 'admin' ? 'AstroVerse Administrator' : 'Celestial Seeker',
      role: role,
      sun_sign: 'Aries',
      created_at: new Date().toISOString(),
    };
    onSuccess(demoUser);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 bg-slate-900/80 border border-amber-500/30 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm">
      {/* Subtle ambient background glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-8">
        {/* Header section */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
            <KeyRound className="w-3.5 h-3.5" />
            <span>{t('emailVerificationReq', 'Email Verification Required')}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-100 tracking-tight">
            {t('gateTitle', 'Verify Email Code to Unlock Astrological Portals')}
          </h2>
        </div>

        {/* Status notifications */}
        {error && (
          <div className="max-w-xl mx-auto p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="max-w-xl mx-auto p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
            {devCode && (
              <span className="font-mono bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/50 text-emerald-200 text-xs">
                Code: {devCode}
              </span>
            )}
          </div>
        )}

        {/* Verification Form Card */}
        <div className="max-w-xl mx-auto bg-slate-950/70 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
          {!codeSent ? (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {t('emailLabel', 'Email Address (SMTP Verification)')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('emailPlaceholder', 'name@example.com')}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-amber-950 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 hover:from-amber-200 hover:to-amber-300 rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{loading ? t('sendingCode', 'Sending Code via SMTP...') : t('sendCodeBtn', 'Send Verification Code')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{t('emailVerificationReq', 'Verification')}: <span className="text-amber-200 font-mono">{email}</span></span>
                <button
                  type="button"
                  onClick={() => setCodeSent(false)}
                  className="text-amber-400 hover:underline cursor-pointer text-[11px]"
                >
                  Change email
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {t('enterCodeLabel', 'Enter 6-Digit Code')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-lg tracking-widest font-mono rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || code.length < 6}
                className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-amber-950 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 hover:from-amber-200 hover:to-amber-300 rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{loading ? t('verifyingBtn', 'Verifying...') : t('verifyBtn', 'Verify & Unlock Portal')}</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleSendCode()}
                  className="text-xs text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  {t('resendCode', 'Resend Code')}
                </button>
              </div>
            </form>
          )}

          {/* Quick Demo Access Bar */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <span className="block text-[11px] uppercase tracking-wider text-slate-400 text-center font-medium">
              {t('orQuickDemo', 'Or Instant Demo Access')}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('user')}
                className="py-2 px-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/60 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('continueAsSeeker', 'Continue as Seeker')}</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="py-2 px-3 bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('continueAsAdmin', 'Continue as Admin')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Overview of Locked Astrological Tools */}
        <div className="pt-6 border-t border-slate-800/80">
          <div className="text-xs uppercase tracking-wider text-slate-400 text-center mb-4 font-medium">
            {t('unlockedFeaturesHeading', '7 Sacred Topic Modules Unlocked After Verification')}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 text-slate-400 space-y-1">
              <Compass className="w-4 h-4 mx-auto text-amber-400/80" />
              <div className="text-xs font-medium text-slate-300">{t('zodiacSigns', 'Zodiac Wheel')}</div>
              <div className="text-[10px] text-slate-500">{t('featZodiacTitle', '12 Archetypes')}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 text-slate-400 space-y-1">
              <Moon className="w-4 h-4 mx-auto text-amber-400/80" />
              <div className="text-xs font-medium text-slate-300">{t('horoscopes', 'Horoscopes')}</div>
              <div className="text-[10px] text-slate-500">{t('featHoroscopeTitle', 'Daily Transits')}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 text-slate-400 space-y-1">
              <Orbit className="w-4 h-4 mx-auto text-amber-400/80" />
              <div className="text-xs font-medium text-slate-300">{t('ephemeris', 'Ephemeris')}</div>
              <div className="text-[10px] text-slate-500">{t('featEphemerisTitle', 'Planetary Data')}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 text-slate-400 space-y-1">
              <Compass className="w-4 h-4 mx-auto text-amber-400/80" />
              <div className="text-xs font-medium text-slate-300">{t('birthChart', 'Birth Chart')}</div>
              <div className="text-[10px] text-slate-500">{t('featBirthChartTitle', 'Natal Placements')}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 text-slate-400 space-y-1">
              <BookOpen className="w-4 h-4 mx-auto text-amber-400/80" />
              <div className="text-xs font-medium text-slate-300">{t('compendium', 'Compendium')}</div>
              <div className="text-[10px] text-slate-500">{t('featCompendiumTitle', 'Classical Lore')}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 text-slate-400 space-y-1">
              <Heart className="w-4 h-4 mx-auto text-amber-400/80" />
              <div className="text-xs font-medium text-slate-300">{t('synastry', 'Synastry')}</div>
              <div className="text-[10px] text-slate-500">{t('featSynastryTitle', 'Harmonics')}</div>
            </div>
          </div>
        </div>

        {/* Dedicated Pages link */}
        <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
          <button
            onClick={() => onOpenFullAuth('login')}
            className="text-amber-300 hover:text-amber-200 underline underline-offset-4 cursor-pointer"
          >
            login.html ({t('signIn', 'Sign In')})
          </button>
          <span>·</span>
          <button
            onClick={() => onOpenFullAuth('signup')}
            className="text-amber-300 hover:text-amber-200 underline underline-offset-4 cursor-pointer"
          >
            signup.html ({t('register', 'Register')})
          </button>
        </div>
      </div>
    </div>
  );
};
