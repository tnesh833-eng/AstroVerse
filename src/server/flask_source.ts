/**
 * Python Flask & SQLite Educational Project Codebase
 * Provides complete reverse-engineered Python Flask source files
 * for educational study and database inspection.
 */

export interface PythonFileItem {
  filename: string;
  language: string;
  description: string;
  code: string;
}

export const FLASK_PROJECT_FILES: PythonFileItem[] = [
  {
    filename: 'app.py',
    language: 'python',
    description: 'Main Flask Web Application & REST API Endpoints',
    code: `"""
AstroVerse - Modern Web-Based Astrology Engine
Reverse Engineered Educational Architecture using Python Flask & SQLite.
"""

from flask import Flask, jsonify, request, render_template
import sqlite3
from database import get_db_connection, init_db
from datetime import datetime

app = Flask(__name__)

# Ensure tables and initial seeds exist on startup
with app.app_context():
    init_db()

@app.route("/")
def index():
    """Serves the front-end SPA interface."""
    return render_template("index.html")

@app.route("/api/zodiac", methods=["GET"])
def get_zodiac_signs():
    """Retrieve all 12 zodiac signs from the SQLite database."""
    conn = get_db_connection()
    signs = conn.execute("SELECT * FROM zodiac_signs ORDER BY id ASC").fetchall()
    conn.close()
    return jsonify([dict(ix) for ix in signs])

@app.route("/api/zodiac/<sign_key>", methods=["GET"])
def get_zodiac_sign(sign_key):
    """Retrieve a single zodiac sign with complete rulerships and traits."""
    conn = get_db_connection()
    sign = conn.execute(
        "SELECT * FROM zodiac_signs WHERE sign_key = ?", (sign_key.lower(),)
    ).fetchone()
    conn.close()
    if sign is None:
        return jsonify({"error": "Zodiac sign not found"}), 404
    return jsonify(dict(sign))

@app.route("/api/horoscope/<sign_key>", methods=["GET"])
def get_horoscope(sign_key):
    """Retrieve daily/weekly horoscope forecasts."""
    period = request.args.get("period", "daily")
    conn = get_db_connection()
    horoscope = conn.execute(
        "SELECT * FROM horoscopes WHERE sign_key = ? AND period = ? ORDER BY id DESC LIMIT 1",
        (sign_key.lower(), period)
    ).fetchone()
    conn.close()
    if horoscope is None:
        return jsonify({"error": "Horoscope not found"}), 404
    return jsonify(dict(horoscope))

@app.route("/api/ephemeris", methods=["GET"])
def get_planetary_positions():
    """Retrieve live calculated celestial planetary ephemeris."""
    conn = get_db_connection()
    planets = conn.execute(
        "SELECT * FROM planetary_ephemeris ORDER BY id ASC"
    ).fetchall()
    conn.close()
    return jsonify([dict(ix) for ix in planets])

@app.route("/api/traditional", methods=["GET"])
def get_traditional_topics():
    """Retrieve traditional astrology compendium articles (Houses, Dignities, Aspects)."""
    category = request.args.get("category")
    conn = get_db_connection()
    if category:
        topics = conn.execute(
            "SELECT * FROM traditional_topics WHERE category = ?", (category,)
        ).fetchall()
    else:
        topics = conn.execute("SELECT * FROM traditional_topics").fetchall()
    conn.close()
    return jsonify([dict(ix) for ix in topics])

@app.route("/api/db/query", methods=["POST"])
def execute_query():
    """Educational read-only SQL query sandbox."""
    data = request.get_json() or {}
    sql_query = data.get("query", "").strip()
    
    # Enforce safe educational read-only queries
    forbidden = ["DROP", "DELETE", "UPDATE", "INSERT", "ALTER", "CREATE", "ATTACH"]
    if any(keyword in sql_query.upper() for keyword in forbidden):
        return jsonify({"error": "Educational sandbox restricts modifications. Use SELECT statements."}), 400
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(sql_query)
        columns = [desc[0] for desc in cursor.description] if cursor.description else []
        rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
        conn.close()
        return jsonify({"columns": columns, "rows": rows, "count": len(rows)})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
`
  },
  {
    filename: 'database.py',
    language: 'python',
    description: 'SQLite Connection Pool & Schema Initializer',
    code: `"""
Database management module for AstroVerse.
Connects to local SQLite database with Row Factory for dict-like row access.
"""

import sqlite3
import os

DATABASE_FILE = "astroverse.db"

def get_db_connection():
    """Create a connection with sqlite3.Row for column name mapping."""
    conn = sqlite3.connect(DATABASE_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Execute schema.sql if tables do not exist."""
    conn = get_db_connection()
    with open("schema.sql", "r") as f:
        conn.executescript(f.read())
    conn.commit()
    conn.close()
`
  },
  {
    filename: 'schema.sql',
    language: 'sql',
    description: 'Structured Relational SQLite DDL Schema',
    code: `-- AstroVerse Relational Schema (SQLite 3)
-- Modeled after reverse-engineered astrology databases (Astro.com, Astro-Seek)

CREATE TABLE IF NOT EXISTS zodiac_signs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sign_key TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    symbol TEXT NOT NULL,
    element TEXT NOT NULL CHECK(element IN ('Fire', 'Earth', 'Air', 'Water')),
    modality TEXT NOT NULL CHECK(modality IN ('Cardinal', 'Fixed', 'Mutable')),
    polarity TEXT NOT NULL,
    ruling_planet TEXT NOT NULL,
    secondary_ruler TEXT,
    house_ruled INTEGER NOT NULL,
    date_range TEXT NOT NULL,
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
    period TEXT NOT NULL CHECK(period IN ('daily', 'weekly', 'monthly')),
    forecast_date TEXT NOT NULL,
    overview TEXT NOT NULL,
    love_forecast TEXT NOT NULL,
    career_forecast TEXT NOT NULL,
    wellness_forecast TEXT NOT NULL,
    lucky_numbers TEXT NOT NULL,
    lucky_color TEXT NOT NULL,
    compatible_signs TEXT NOT NULL,
    celestial_aspect TEXT NOT NULL,
    FOREIGN KEY (sign_key) REFERENCES zodiac_signs(sign_key),
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

-- Indices for rapid query performance
CREATE INDEX IF NOT EXISTS idx_zodiac_element ON zodiac_signs(element);
CREATE INDEX IF NOT EXISTS idx_horoscope_date ON horoscopes(forecast_date);
CREATE INDEX IF NOT EXISTS idx_ephemeris_sign ON planetary_ephemeris(zodiac_sign);
`
  },
  {
    filename: 'requirements.txt',
    language: 'plaintext',
    description: 'Python Environment Dependencies',
    code: `Flask==3.0.3
Werkzeug==3.0.3
Jinja2==3.1.4
click==8.1.7
`
  }
];
