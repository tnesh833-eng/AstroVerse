import React, { useState, useEffect } from 'react';
import { DbTableInfo, DbQueryResult, PythonCodeFile } from '../types.ts';
import { Database, Terminal, Code2, Layers, Play, Copy, Check, FileText, Sparkles, BookOpen } from 'lucide-react';

const PRESET_QUERIES = [
  {
    label: 'All Fire Signs & Rulers',
    sql: "SELECT name, symbol, element, modality, ruling_planet, date_range FROM zodiac_signs WHERE element = 'Fire';",
  },
  {
    label: 'Live Planetary Ephemeris',
    sql: 'SELECT body_name, symbol, zodiac_sign, formatted_pos, is_retrograde, dignity FROM planetary_ephemeris;',
  },
  {
    label: 'Today’s Horoscopes (Sample)',
    sql: 'SELECT sign_key, period, celestial_aspect, lucky_numbers, compatible_signs FROM horoscopes WHERE period = "daily" LIMIT 6;',
  },
  {
    label: 'Traditional Treatises Index',
    sql: 'SELECT category, title, traditional_name, historical_era FROM traditional_topics ORDER BY id ASC;',
  },
  {
    label: 'Top Compatibility Scores',
    sql: 'SELECT sign1_key, sign2_key, overall_score, elemental_dynamic, synthesis FROM compatibility_matrix ORDER BY overall_score DESC LIMIT 5;',
  },
];

export const DatabaseExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sql' | 'tables' | 'reverse' | 'flask'>('sql');
  const [query, setQuery] = useState<string>(PRESET_QUERIES[0].sql);
  const [queryResult, setQueryResult] = useState<DbQueryResult | null>(null);
  const [queryLoading, setQueryLoading] = useState<boolean>(false);
  const [queryError, setQueryError] = useState<string | null>(null);

  const [tables, setTables] = useState<DbTableInfo[]>([]);
  const [flaskFiles, setFlaskFiles] = useState<PythonCodeFile[]>([]);
  const [selectedFlaskFile, setSelectedFlaskFile] = useState<string>('app.py');
  const [copied, setCopied] = useState<boolean>(false);

  // Fetch tables and flask source on mount
  useEffect(() => {
    fetch('/api/db/tables')
      .then((res) => res.json())
      .then((data) => setTables(data))
      .catch((err) => console.error('Error fetching tables:', err));

    fetch('/api/flask-source')
      .then((res) => res.json())
      .then((data) => setFlaskFiles(data))
      .catch((err) => console.error('Error fetching flask files:', err));

    // Run first preset query
    runQuery(PRESET_QUERIES[0].sql);
  }, []);

  const runQuery = (sqlToRun?: string) => {
    const sql = sqlToRun || query;
    setQueryLoading(true);
    setQueryError(null);

    fetch('/api/db/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: sql }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to execute query');
        }
        setQueryResult(data);
        setQueryLoading(false);
      })
      .catch((err) => {
        setQueryError(err.message);
        setQueryResult(null);
        setQueryLoading(false);
      });
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeCodeFile = flaskFiles.find((f) => f.filename === selectedFlaskFile) || flaskFiles[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-amber-400/90 mb-2">
            <span>Relational Ephemeris Schema</span>
            <span aria-hidden="true">·</span>
            <span>Educational Reverse Engineering</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-100">
            SQLite Database & Reverse Engineering Studio
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl">
            Inspect the live SQLite relational storage, execute interactive SQL queries, study the database schema, and explore the complete Python Flask reverse-engineered architecture.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
          <button
            onClick={() => setActiveTab('sql')}
            className={`px-3 py-1.5 rounded font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'sql'
                ? 'bg-amber-400/20 text-amber-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>SQL Console</span>
          </button>
          <button
            onClick={() => setActiveTab('tables')}
            className={`px-3 py-1.5 rounded font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'tables'
                ? 'bg-amber-400/20 text-amber-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Tables & Schema</span>
          </button>
          <button
            onClick={() => setActiveTab('reverse')}
            className={`px-3 py-1.5 rounded font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'reverse'
                ? 'bg-amber-400/20 text-amber-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Reverse Engineering</span>
          </button>
          <button
            onClick={() => setActiveTab('flask')}
            className={`px-3 py-1.5 rounded font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'flask'
                ? 'bg-amber-400/20 text-amber-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Python Flask Code</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Interactive SQL Console */}
      {activeTab === 'sql' && (
        <div className="space-y-6">
          {/* Preset Buttons */}
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Quick Example Queries:</span>
            <div className="flex flex-wrap gap-2">
              {PRESET_QUERIES.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(preset.sql);
                    runQuery(preset.sql);
                  }}
                  className="px-2.5 py-1 text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded transition-colors cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* SQL Editor Box */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-amber-300 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>astroverse.sqlite (Read-Only Educational Sandbox)</span>
              </span>
              <span className="text-[11px] text-slate-500">Supports standard SQLite 3 SELECT statements</span>
            </div>

            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={3}
              className="w-full font-mono text-xs bg-slate-950 text-slate-100 p-3 rounded-lg border border-slate-800 focus:outline-none focus:border-amber-400"
              placeholder="SELECT * FROM zodiac_signs WHERE element = 'Fire';"
            />

            <div className="flex items-center justify-between pt-1">
              <p className="text-xs text-slate-400">
                Press Run Query to execute directly against the live in-engine SQLite database.
              </p>
              <button
                onClick={() => runQuery()}
                disabled={queryLoading}
                className="px-4 py-2 text-xs font-semibold tracking-wide uppercase text-amber-950 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{queryLoading ? 'Executing...' : 'Run Query'}</span>
              </button>
            </div>
          </div>

          {/* Error Message if query failed */}
          {queryError && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-mono">
              <strong>Query Error:</strong> {queryError}
            </div>
          )}

          {/* Query Results Table */}
          {queryResult && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-serif text-slate-200 font-bold">Query Execution Output</span>
                <span className="tabular-nums">
                  Returned {queryResult.count} {queryResult.count === 1 ? 'row' : 'rows'}
                </span>
              </div>

              {queryResult.count === 0 ? (
                <div className="p-8 text-center text-slate-500 border border-slate-800 rounded-xl bg-slate-900/40 text-xs">
                  Zero rows matched your query.
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 max-h-96 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="sticky top-0 bg-slate-950 text-slate-300 border-b border-slate-800 uppercase tracking-wider text-[11px]">
                      <tr>
                        {queryResult.columns.map((col) => (
                          <th key={col} className="py-2.5 px-3 whitespace-nowrap font-mono text-amber-300">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-200 font-mono text-[11px]">
                      {queryResult.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-800/40 transition-colors">
                          {queryResult.columns.map((col) => (
                            <td key={col} className="py-2 px-3 whitespace-nowrap truncate max-w-xs text-slate-300">
                              {row[col] !== null && row[col] !== undefined ? String(row[col]) : <em className="text-slate-600">NULL</em>}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Tables & Schema Inspector */}
      {activeTab === 'tables' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tables.map((table) => (
              <div key={table.name} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-amber-400" />
                    <h4 className="text-base font-mono font-bold text-slate-100">{table.name}</h4>
                  </div>
                  <span className="text-xs text-slate-400 tabular-nums">
                    {table.rowCount} records
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">SQLite DDL Schema</span>
                  <pre className="text-[11px] font-mono text-slate-300 bg-slate-950 p-3 rounded-lg overflow-x-auto max-h-40 border border-slate-800">
                    {table.ddl}
                  </pre>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('sql');
                    setQuery(`SELECT * FROM ${table.name} LIMIT 10;`);
                    runQuery(`SELECT * FROM ${table.name} LIMIT 10;`);
                  }}
                  className="text-xs text-amber-300 hover:text-amber-200 font-medium transition-colors cursor-pointer"
                >
                  Query this table →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Reverse Engineering Architecture Study */}
      {activeTab === 'reverse' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-serif font-bold text-slate-100">
              Reverse Engineering Astrology Software Architecture
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              By analyzing classical and modern astrology engines—such as Astrodienst (Astro.com), Astro-Seek, and CafeAstrology—we observe a consistent architectural pattern designed to balance astronomical rigor, query latency, and modular educational presentation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-2.5">
                <h4 className="text-sm font-serif font-bold text-amber-300">
                  1. The Ephemeris Dilemma: Real-Time vs. Relational Pre-Computation
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Production systems rely on high-precision numerical ephemerides (like Swiss Ephemeris / DE431). To avoid calculating Keplerian perturbations on every web request, high-traffic portals store daily celestial coordinates in structured relational tables (<code className="font-mono text-amber-300">planetary_ephemeris</code>) indexed by timestamp. AstroVerse replicates this dual approach by pairing real-time Julian Day algorithms with SQLite table persistence.
                </p>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-2.5">
                <h4 className="text-sm font-serif font-bold text-amber-300">
                  2. Relational Entity Normalization
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Rather than dumping unformatted text blobs, production astrology databases maintain strict foreign keys:
                  <br />
                  • <code className="font-mono text-amber-300">zodiac_signs</code> acts as the canonical lookup for elements, polarities, and domicile rulers.
                  <br />
                  • <code className="font-mono text-amber-300">horoscopes</code> is normalized on (sign_key, period, forecast_date).
                  <br />
                  • <code className="font-mono text-amber-300">compatibility_matrix</code> caches synastry pairs to avoid <span className="font-mono">O(N²)</span> runtime calculations.
                </p>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-2.5">
                <h4 className="text-sm font-serif font-bold text-amber-300">
                  3. Geocentric vs. Sidereal Coordinate Geometry
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Western astrology employs the Tropical Zodiac, anchored to the Vernal Equinox (0° Aries). The calculations require conversion from Gregorian calendar dates to Julian Day Numbers (JDN), calculation of the Obliquity of the Ecliptic (~23.44°), and Greenwich Mean Sidereal Time (GMST) to resolve the Eastern Horizon Ascendant angle.
                </p>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-2.5">
                <h4 className="text-sm font-serif font-bold text-amber-300">
                  4. Microservices & Python Flask Architecture
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  A common pattern across academic and educational astrology projects is deploying lightweight Python Flask or FastAPI backends connected to SQLite. Python provides rich scientific packages (<code className="font-mono text-amber-300">pyswisseph</code>, <code className="font-mono text-amber-300">ephem</code>) while SQLite offers zero-configuration, ACID-compliant local storage ideal for portable deployment.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Python Flask Codebase Inspector */}
      {activeTab === 'flask' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-serif font-bold text-slate-100">
                  Python Flask & SQLite Implementation Codebase
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Inspect the source code implementing the reverse-engineered astrology server.
                </p>
              </div>

              <button
                onClick={() => handleCopyCode(activeCodeFile?.code || '')}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-amber-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy File'}</span>
              </button>
            </div>

            {/* File Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {flaskFiles.map((f) => (
                <button
                  key={f.filename}
                  onClick={() => setSelectedFlaskFile(f.filename)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                    selectedFlaskFile === f.filename
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-500/40 font-semibold'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-3 h-3" />
                  <span>{f.filename}</span>
                </button>
              ))}
            </div>

            {/* Code Viewer */}
            {activeCodeFile && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{activeCodeFile.description}</span>
                  <span className="font-mono text-[11px] text-amber-300">{activeCodeFile.language.toUpperCase()}</span>
                </div>
                <pre className="text-xs font-mono bg-slate-950 text-slate-200 p-5 rounded-xl border border-slate-800 overflow-x-auto max-h-[500px] leading-relaxed">
                  <code>{activeCodeFile.code}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
