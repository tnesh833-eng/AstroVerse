import React, { useState, useEffect } from 'react';
import { TraditionalTopic } from '../types.ts';
import { BookOpen, Layers, ShieldCheck, Sun, Compass, RefreshCw } from 'lucide-react';

export const TraditionalCompendium: React.FC = () => {
  const [topics, setTopics] = useState<TraditionalTopic[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const categories = ['All', 'Houses', 'Dignities', 'Aspects', 'Decans', 'Elements', 'Modalities'];

  useEffect(() => {
    setLoading(true);
    const url = activeCategory === 'All' ? '/api/traditional' : `/api/traditional?category=${activeCategory}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTopics(data);
        if (data.length) setSelectedTopicId(data[0].id);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching traditional topics:', err);
        setLoading(false);
      });
  }, [activeCategory]);

  const selectedTopic = topics.find((t) => t.id === selectedTopicId) || topics[0];

  return (
    <div className="space-y-10">
      {/* Header and Filter */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-amber-400/90 mb-2">
            <span>Traditio Hermetica</span>
            <span aria-hidden="true">·</span>
            <span>Hellenistic & Classical Foundations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-100">
            Traditional Astrology Compendium
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl">
            A scholarly compendium of foundational astrological principles: the 12 houses, Ptolemaic essential dignities, triplicities, decans, and planetary joys.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded capitalize font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-amber-400/20 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400">
          <RefreshCw className="w-6 h-6 animate-spin text-amber-400 mx-auto mb-3" />
          <p className="text-sm">Loading scholarly archives...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Article Index Rail (35%) */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-slate-400 font-serif font-medium mb-3">
              Scholarly Treatises ({topics.length})
            </h3>
            <div className="space-y-2">
              {topics.map((t) => {
                const isSelected = selectedTopic?.id === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTopicId(t.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-amber-400/80 shadow-sm'
                        : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span className="text-amber-400/90 font-medium">{t.category}</span>
                      <span className="text-slate-500">{t.historical_era}</span>
                    </div>
                    <h4 className="text-sm font-serif font-bold text-slate-100 mb-1">
                      {t.title}
                    </h4>
                    {t.traditional_name && (
                      <p className="text-[11px] text-amber-300/80 font-serif italic mb-1.5">
                        {t.traditional_name}
                      </p>
                    )}
                    <p className="text-xs text-slate-400 line-clamp-2 font-light">
                      {t.summary}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Editorial Reading Canvas (65%) */}
          {selectedTopic && (
            <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              {/* Header */}
              <div className="pb-6 border-b border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <span className="uppercase text-amber-400 font-medium tracking-wide">{selectedTopic.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedTopic.historical_era}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-100">
                  {selectedTopic.title}
                </h3>
                {selectedTopic.traditional_name && (
                  <p className="text-sm text-amber-300 font-serif italic mt-1">
                    Traditional nomenclature: {selectedTopic.traditional_name}
                  </p>
                )}
              </div>

              {/* Main Reading Essay */}
              <div className="prose prose-invert max-w-none space-y-4 text-sm text-slate-300 leading-relaxed font-light">
                <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed border-b border-slate-800/60 pb-4">
                  {selectedTopic.summary}
                </p>
                <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:text-amber-300">
                  {selectedTopic.content}
                </p>
              </div>

              {/* Traditional Rulerships / Significations Box */}
              {selectedTopic.traditional_rulerships && (
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2">
                  <h5 className="text-xs uppercase tracking-wider text-amber-300 font-medium font-serif flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Traditional Rulerships & Significations</span>
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono">
                    {selectedTopic.traditional_rulerships}
                  </p>
                </div>
              )}

              {/* Key Principles Box */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2">
                <h5 className="text-xs uppercase tracking-wider text-slate-300 font-medium font-serif flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Foundational Principles</span>
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedTopic.key_principles}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Academic Colleges & Scholarly Institutes Research Panel (SerpApi Integration) */}
      <div className="pt-8 border-t border-slate-800 space-y-6">
        <AcademicResearchSection />
      </div>
    </div>
  );
};

interface AcademicResult {
  title: string;
  link: string;
  snippet: string;
  source: string;
}

const AcademicResearchSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('astrology history university degrees academic research');
  const [results, setResults] = useState<AcademicResult[]>([]);
  const [searching, setSearching] = useState<boolean>(false);

  const performSearch = (q: string) => {
    setSearching(true);
    fetch(`/api/academic-search?q=${encodeURIComponent(q)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.organic_results) {
          setResults(data.organic_results);
        }
        setSearching(false);
      })
      .catch((err) => {
        console.error('Academic search error:', err);
        setSearching(false);
      });
  };

  useEffect(() => {
    performSearch(searchTerm);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) performSearch(searchTerm);
  };

  const presetTopics = [
    'Kepler College astrological studies',
    'University of Wales Trinity Saint David Sophia Centre',
    'Warburg Institute astrology history archive',
    'Faculty of Astrological Studies London diploma',
  ];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-amber-400/90 mb-1">
            <span>Scholarly Research & Higher Education</span>
            <span aria-hidden="true">·</span>
            <span>Live SerpApi Query Engine</span>
          </div>
          <h3 className="text-xl font-serif font-bold text-slate-100">
            Astrology Academic Programs & College Research
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Discover universities, accredited colleges, and scholarly research centers offering degrees in cultural astronomy and the history of astrology.
          </p>
        </div>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearchSubmit} className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search colleges, degrees, or scholarly papers..."
          className="flex-1 bg-slate-950 text-slate-200 border border-slate-800 rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-amber-400 font-sans"
        />
        <button
          type="submit"
          disabled={searching}
          className="px-4 py-2 text-xs font-semibold tracking-wide uppercase text-amber-950 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 rounded-lg transition-all cursor-pointer whitespace-nowrap"
        >
          {searching ? 'Querying...' : 'Search Colleges'}
        </button>
      </form>

      {/* Preset Pill Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] text-slate-500 uppercase tracking-wider">Academic Presets:</span>
        {presetTopics.map((topic, i) => (
          <button
            key={i}
            onClick={() => {
              setSearchTerm(topic);
              performSearch(topic);
            }}
            className="text-xs text-slate-300 hover:text-amber-300 bg-slate-950 px-2.5 py-1 rounded border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {results.map((res, idx) => (
          <a
            key={idx}
            href={res.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-slate-950/60 border border-slate-800 hover:border-amber-500/40 rounded-xl transition-all group block space-y-2 cursor-pointer"
          >
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="text-amber-400/90 font-medium font-mono">{res.source}</span>
              <span className="text-slate-600 group-hover:text-amber-300 transition-colors">Open ↗</span>
            </div>
            <h4 className="text-sm font-serif font-bold text-slate-100 group-hover:text-amber-200 transition-colors line-clamp-2">
              {res.title}
            </h4>
            <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-light">
              {res.snippet}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};
