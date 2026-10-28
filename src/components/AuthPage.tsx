import React, { useState } from 'react';
import { UserProfile } from '../types.ts';
import { Sparkles, Mail, ShieldCheck, KeyRound, User, ArrowRight, RefreshCw, CheckCircle, Compass, ArrowLeft } from 'lucide-react';

interface AuthPageProps {
  initialMode?: 'login' | 'signup';
  onSuccess: (user: UserProfile) => void;
  onCancelToLanding: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'login',
  onSuccess,
  onCancelToLanding,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [sunSign, setSunSign] = useState<string>('Aries');
  const [role, setRole] = useState<'user' | 'admin'>('user');

  // Step 1: Enter email/details; Step 2: Enter verification code
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [devCode, setDevCode] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleRequestCode = (targetEmail?: string, targetRole?: 'user' | 'admin') => {
    const emailToUse = targetEmail || email;
    const roleToUse = targetRole || role;

    if (!emailToUse || !emailToUse.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    setLoading(true);
    setError(null);
    setFeedbackMsg(null);

    fetch('/api/auth/request-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailToUse, role: roleToUse }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to dispatch verification code.');
        }
        setStep('verify');
        setDevCode(data.devCode);
        setFeedbackMsg(`A 6-digit verification code was dispatched to ${emailToUse}. Check your inbox!`);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Error communicating with authentication server.');
        setLoading(false);
      });
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.trim().length !== 6) {
      setError('Please enter the 6-digit verification code.');
      return;
    }

    setLoading(true);
    setError(null);

    fetch('/api/auth/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        code: code.trim(),
        name: mode === 'signup' ? name : undefined,
        sun_sign: sunSign,
        role,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Verification failed.');
        }
        onSuccess(data.user);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Invalid or expired code.');
        setLoading(false);
      });
  };

  const quickDemoLogin = (targetRole: 'user' | 'admin') => {
    const demoEmail = targetRole === 'admin' ? 'admin@astroverse.com' : 'seeker@astroverse.com';
    setEmail(demoEmail);
    setRole(targetRole);
    setName(targetRole === 'admin' ? 'Grand Astrologer Admin' : 'Celestial Seeker');
    handleRequestCode(demoEmail, targetRole);
  };

  return (
    <div className="min-h-screen bg-[#090b14] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background celestial glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img
          src="/src/assets/images/celestial_zodiac_hero_1793203135285.jpg"
          alt="Celestial Backdrop"
          className="w-full h-full object-cover object-center filter blur-xs"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090b14] via-[#090b14]/90 to-[#090b14]" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-[#0d101d] border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Brand Lockup */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-amber-400/10 border border-amber-500/20 text-amber-300 mb-1">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-100 tracking-wide">
            AstroVerse
          </h2>
          <p className="text-xs text-slate-400">
            {mode === 'login' ? 'Celestial Portal Authentication' : 'Create Your Astrological Sanctuary'}
          </p>
        </div>

        {/* Mode Toggle (Login vs Sign Up) */}
        <div className="grid grid-cols-2 p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs">
          <button
            onClick={() => {
              setMode('login');
              setStep('request');
              setError(null);
            }}
            className={`py-2 rounded-lg font-medium transition-colors cursor-pointer ${
              mode === 'login'
                ? 'bg-amber-400/20 text-amber-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In (login.html)
          </button>
          <button
            onClick={() => {
              setMode('signup');
              setStep('request');
              setError(null);
            }}
            className={`py-2 rounded-lg font-medium transition-colors cursor-pointer ${
              mode === 'signup'
                ? 'bg-amber-400/20 text-amber-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Register (signup.html)
          </button>
        </div>

        {/* Step 1: Request Code Form */}
        {step === 'request' && (
          <div className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Orion Vance"
                    required
                    className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                Email Address (Verification Destination)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-xs focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                  Sun Sign
                </label>
                <select
                  value={sunSign}
                  onChange={(e) => setSunSign(e.target.value)}
                  className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                >
                  {['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Role Selection */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                Access Role
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setRole('user')}
                  className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                    role === 'user'
                      ? 'bg-amber-400/15 border-amber-400/80 text-amber-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="font-semibold block">Seeker (User)</span>
                  <span className="text-[10px] text-slate-400">Personal charts & horoscopes</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                    role === 'admin'
                      ? 'bg-amber-400/15 border-amber-400/80 text-amber-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="font-semibold block flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-amber-400" />
                    <span>Administrator</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Database & security logs</span>
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs">
                {error}
              </div>
            )}

            <button
              onClick={() => handleRequestCode()}
              disabled={loading}
              className="w-full py-2.5 px-4 text-xs font-semibold tracking-wide uppercase text-amber-950 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Dispatching Email Code...</span>
                </>
              ) : (
                <>
                  <span>Send Verification Code</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            {/* Quick Demo Credentials */}
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <span className="block text-[10px] uppercase tracking-wider text-slate-500 text-center">
                One-Click Quick Test Demonstrations
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => quickDemoLogin('user')}
                  className="py-1.5 px-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded text-[11px] text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Test as Seeker (User)
                </button>
                <button
                  type="button"
                  onClick={() => quickDemoLogin('admin')}
                  className="py-1.5 px-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded text-[11px] text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Test as Admin
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Verify Code Form */}
        {step === 'verify' && (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-4 text-center space-y-1">
              <Mail className="w-5 h-5 text-amber-400 mx-auto" />
              <h4 className="text-xs font-serif font-bold text-slate-200">
                Verification Code Dispatched
              </h4>
              <p className="text-[11px] text-slate-400">
                Sent via SMTP to <strong className="text-amber-300 font-mono">{email}</strong>
              </p>
            </div>

            {/* Dev Code Assist Banner */}
            {devCode && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-center space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-amber-400 block font-medium">
                  Verification Code (Preview Assist)
                </span>
                <span className="text-2xl font-mono font-bold tracking-widest text-amber-300">
                  {devCode}
                </span>
                <p className="text-[10px] text-slate-400">
                  Click below to auto-fill or type the 6 digits from your email.
                </p>
                <button
                  type="button"
                  onClick={() => setCode(devCode)}
                  className="text-[11px] text-amber-400 underline hover:text-amber-300 cursor-pointer"
                >
                  Auto-fill code {devCode}
                </button>
              </div>
            )}

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1.5 font-medium text-center">
                Enter 6-Digit Email Code
              </label>
              <input
                type="text"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                required
                className="w-full text-center tracking-[0.5em] text-2xl font-mono bg-slate-950 text-amber-300 border border-slate-700 rounded-xl py-3 focus:outline-none focus:border-amber-400"
              />
            </div>

            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full py-2.5 px-4 text-xs font-semibold tracking-wide uppercase text-amber-950 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verify Code & Open Portal</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-xs pt-2">
              <button
                type="button"
                onClick={() => setStep('request')}
                className="text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Change email</span>
              </button>

              <button
                type="button"
                onClick={() => handleRequestCode()}
                className="text-amber-400 hover:text-amber-300 cursor-pointer"
              >
                Resend email code
              </button>
            </div>
          </form>
        )}

        {/* Back to Landing Page option */}
        <div className="pt-4 border-t border-slate-800 text-center">
          <button
            type="button"
            onClick={onCancelToLanding}
            className="text-xs text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            ← Continue to AstroVerse Landing Page as Guest
          </button>
        </div>
      </div>
    </div>
  );
};
