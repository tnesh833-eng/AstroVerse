import React, { useState } from 'react';
import { Sparkles, RefreshCw, Compass, BookOpen } from 'lucide-react';

interface TarotCard {
  id: number;
  name: string;
  arcana: string;
  astrologicalCorrespondence: string;
  element: string;
  rulingPlanet: string;
  keywords: string;
  divination: string;
  reversedMeaning: string;
}

const DECK: TarotCard[] = [
  {
    id: 21,
    name: 'XXI The Cosmos (The World)',
    arcana: 'Major Arcana',
    astrologicalCorrespondence: 'Saturn / Earth Center',
    element: 'Earth & Quintessence',
    rulingPlanet: 'Saturn & The Cosmic Spheres',
    keywords: 'Completion, Wholeness, Integration, Cosmic Synthesis, Triumph',
    divination: 'The ultimate culmination of a long cycle. You have integrated fragmented lessons into a unified diamond of wisdom. Step into global consciousness and celebrated wholeness.',
    reversedMeaning: 'Delayed completion, fear of final release, feeling on the precipice of graduation without stepping through.'
  },
  {
    id: 1,
    name: 'IV The Emperor',
    arcana: 'Major Arcana',
    astrologicalCorrespondence: 'Aries (♈)',
    element: 'Fire',
    rulingPlanet: 'Mars',
    keywords: 'Sovereignty, Structure, Foundation, Strategic Will, Authority',
    divination: 'Embody structured leadership and bold pioneering courage. Protect your boundaries with calm martial dignity rather than aggressive reaction.',
    reversedMeaning: 'Domineering control, stubborn inflexibility, or abdication of personal authority.'
  },
  {
    id: 2,
    name: 'V The Hierophant',
    arcana: 'Major Arcana',
    astrologicalCorrespondence: 'Taurus (♉)',
    element: 'Earth',
    rulingPlanet: 'Venus',
    keywords: 'Tradition, Spiritual Lineage, Sacred Craft, Enduring Wisdom',
    divination: 'Anchor your spiritual ideals in tangible daily ritual. Seek mentorship from enduring lineages and respect time-tested methods.',
    reversedMeaning: 'Dogmatic rigidity, outworn institutional orthodoxy, questioning inherited conditioning.'
  },
  {
    id: 3,
    name: 'VI The Lovers',
    arcana: 'Major Arcana',
    astrologicalCorrespondence: 'Gemini (♊)',
    element: 'Air',
    rulingPlanet: 'Mercury',
    keywords: 'Choice, Sacred Polarities, Alignment of Values, Divine Dialogue',
    divination: 'A crossroads demanding ethical congruency. Bring your intellect and heart into holy communion before making your pledge.',
    reversedMeaning: 'Internal contradiction, misalignment of core values, fear of commitment.'
  },
  {
    id: 4,
    name: 'VII The Chariot',
    arcana: 'Major Arcana',
    astrologicalCorrespondence: 'Cancer (♋)',
    element: 'Water',
    rulingPlanet: 'The Moon',
    keywords: 'Emotional Mastery, Focused Momentum, Protective Shield, Triumph',
    divination: 'Harness opposing emotional currents and direct them with unflinching resolve. Your vulnerability becomes your impregnable armor.',
    reversedMeaning: 'Directionless aggression, emotional burnout, feeling pulled apart by rival loyalties.'
  },
  {
    id: 5,
    name: 'VIII Strength',
    arcana: 'Major Arcana',
    astrologicalCorrespondence: 'Leo (♌)',
    element: 'Fire',
    rulingPlanet: 'The Sun',
    keywords: 'Gentle Mastery, Radiant Courage, Compassion, Animal Soul',
    divination: 'Tame inner instinctual fears not through brute suppression, but through unconditional warmth, kindness, and royal presence.',
    reversedMeaning: 'Self-doubt, raw pride, exhaustion from fighting internal passions.'
  },
  {
    id: 6,
    name: 'IX The Hermit',
    arcana: 'Major Arcana',
    astrologicalCorrespondence: 'Virgo (♍)',
    element: 'Earth',
    rulingPlanet: 'Mercury',
    keywords: 'Introspection, Inner Lantern, Solitude, Sacred Discernment',
    divination: 'Withdraw from noisy external chatter to hear your quiet inner guide. The lantern of wisdom shines only one step ahead at a time.',
    reversedMeaning: 'Isolation, antisocial withdrawal, getting lost in overly clinical over-analysis.'
  },
  {
    id: 7,
    name: 'XI Justice',
    arcana: 'Major Arcana',
    astrologicalCorrespondence: 'Libra (♎)',
    element: 'Air',
    rulingPlanet: 'Venus',
    keywords: 'Equilibrium, Karmic Truth, Rational Objectivity, Sacred Law',
    divination: 'Truth seeks its natural balance. Be impeccably honest with yourself; the scales of cause and effect operate with mathematical grace.',
    reversedMeaning: 'Unfair treatment, dishonesty, rationalizing biased prejudices.'
  },
  {
    id: 8,
    name: 'XIII Death (Transformation)',
    arcana: 'Major Arcana',
    astrologicalCorrespondence: 'Scorpio (♏)',
    element: 'Water',
    rulingPlanet: 'Mars & Pluto',
    keywords: 'Alchemical Rebirth, Sacred Ending, Metamorphosis, Release',
    divination: 'The autumn leaves must fall to nourish the soil of spring. Grieve what has completed its natural lifespan and welcome the dawn of your rebirth.',
    reversedMeaning: 'Resistance to necessary closure, clinging to dead forms out of fear.'
  },
  {
    id: 9,
    name: 'XIV Temperance',
    arcana: 'Major Arcana',
    astrologicalCorrespondence: 'Sagittarius (♐)',
    element: 'Fire',
    rulingPlanet: 'Jupiter',
    keywords: 'Alchemy, Middle Way, Synthesis of Opposites, Divine Timing',
    divination: 'Pour water between two chalices until the blend is golden. Avoid extreme polarization; true mastery is patient transmutation.',
    reversedMeaning: 'Excessive indulgence, impatience, clashing disharmony.'
  },
  {
    id: 10,
    name: 'XVII The Star',
    arcana: 'Major Arcana',
    astrologicalCorrespondence: 'Aquarius (♒)',
    element: 'Air',
    rulingPlanet: 'Saturn & Uranus',
    keywords: 'Hope, Stellar Inspiration, Renewal, Clarity, Guiding Light',
    divination: 'After the storm, the crystal skies open. Pour your pure essence into the stream of humanity with faith in the cosmic promise.',
    reversedMeaning: 'Disillusionment, despair, feeling disconnected from your higher calling.'
  },
  {
    id: 11,
    name: 'XVIII The Moon',
    arcana: 'Major Arcana',
    astrologicalCorrespondence: 'Pisces (♓)',
    element: 'Water',
    rulingPlanet: 'Jupiter & Neptune',
    keywords: 'Subconscious Depths, Dreams, Illusion, Intuitive Passage',
    divination: 'Walk by the gentle lunar silver light when the bright sun cannot penetrate. Dreams and synchronicities carry vital subconscious keys.',
    reversedMeaning: 'Confusion, paranoiac illusions, getting lost in mirages.'
  }
];

export const TarotOracleDraw: React.FC = () => {
  const [currentCard, setCurrentCard] = useState<TarotCard>(DECK[0]);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);

  const drawNewCard = () => {
    setIsFlipping(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * DECK.length);
      setCurrentCard(DECK[randomIndex]);
      setIsFlipping(false);
    }, 400);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-amber-400/90 mb-2">
            <span>Arcana Celestis</span>
            <span aria-hidden="true">·</span>
            <span>Tarot & Celestial Decan Correspondences</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-100">
            Celestial Tarot Oracle
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl">
            Each tarot archetype reflects classical astrological signs, planets, and decan faces. Draw an oracle card to receive celestial contemplation for your day.
          </p>
        </div>

        <button
          onClick={drawNewCard}
          disabled={isFlipping}
          className="px-5 py-2.5 text-xs font-semibold tracking-wide uppercase text-amber-950 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 rounded-lg transition-all cursor-pointer flex items-center gap-2 shrink-0 shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isFlipping ? 'animate-spin' : ''}`} />
          <span>Draw Oracle Card</span>
        </button>
      </div>

      {/* Card Spotlight Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8">
        {/* Left: Tarot Visual Artwork */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-64 sm:w-72 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl shadow-amber-500/10 group">
            <img
              src="/src/assets/images/mystic_tarot_oracle_1793203137285.jpg"
              alt={currentCard.name}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isFlipping ? 'scale-95 blur-xs' : 'group-hover:scale-105'
              }`}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-3 left-3 right-3 text-center bg-slate-950/80 backdrop-blur-sm py-1.5 px-3 rounded-lg border border-amber-500/30">
              <span className="text-xs font-serif font-bold text-amber-200 tracking-wider">
                {currentCard.name}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Card Interpretation & Celestial Mapping */}
        <div className="lg:col-span-7 space-y-6">
          <div className="pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span className="text-amber-400 font-medium">{currentCard.arcana}</span>
              <span aria-hidden="true">·</span>
              <span>{currentCard.astrologicalCorrespondence}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-100">
              {currentCard.name}
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Element: <strong className="text-slate-200">{currentCard.element}</strong> · Ruling Sphere: <strong className="text-amber-300">{currentCard.rulingPlanet}</strong>
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-slate-400 font-serif font-medium mb-1.5">
              Keywords & Resonant Themes
            </h4>
            <p className="text-xs text-amber-300/90 font-medium font-serif">
              {currentCard.keywords}
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-slate-400 font-serif font-medium mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Divinatory Wisdom & Counsel</span>
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed font-light">
              {currentCard.divination}
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <h5 className="text-[11px] uppercase tracking-wider text-slate-400 font-medium font-serif mb-1">
              Shadow Reflection (Reversed)
            </h5>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              {currentCard.reversedMeaning}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
