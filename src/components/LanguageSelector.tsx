import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Language } from '../types.ts';

interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  region: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', region: 'Global' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', region: 'தமிழ்நாடு / இலங்கை' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', region: 'ఆంధ్రప్రదేశ్ / తెలంగాణ' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', region: 'भारत / विश्व' },
];

interface LanguageSelectorProps {
  variant?: 'navbar' | 'compact' | 'hero';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ variant = 'navbar' }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const handleSelectLanguage = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Familiar, recognizable Language Select Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        title={t('selectLanguage', 'Select Language')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all cursor-pointer select-none ${
          variant === 'hero'
            ? 'bg-slate-900/90 border-amber-500/50 text-amber-200 hover:bg-slate-800 shadow-md text-xs sm:text-sm font-medium'
            : 'bg-slate-900/80 border-slate-700/80 hover:border-amber-500/50 text-slate-200 hover:text-amber-200 text-xs font-medium'
        }`}
      >
        <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="font-medium tracking-wide">{currentOption.nativeLabel}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-amber-300' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#0e1222] border border-amber-500/30 shadow-2xl z-50 py-1.5 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 border-b border-slate-800/80 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400/90 font-semibold block">
              {t('selectLanguage', 'Select Language')}
            </span>
          </div>

          <div role="listbox" className="space-y-0.5 px-1">
            {LANGUAGES.map((item) => {
              const isSelected = item.code === language;
              return (
                <button
                  key={item.code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelectLanguage(item.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400/15 text-amber-200 font-semibold border border-amber-500/30'
                      : 'text-slate-300 hover:bg-slate-800/90 hover:text-slate-100'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium leading-tight">{item.nativeLabel}</span>
                    <span className="text-[10px] text-slate-400 leading-tight">
                      {item.label} · {item.region}
                    </span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
