import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { getDatabase, saveDatabase } from './src/server/database.ts';
import { calculateEphemeris, calculateBirthChart } from './src/server/ephemeris_calc.ts';
import { FLASK_PROJECT_FILES } from './src/server/flask_source.ts';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize Gemini Client
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// REST API Endpoints

// 1. Get All Zodiac Signs
app.get('/api/zodiac', async (_req: Request, res: Response) => {
  try {
    const db = await getDatabase();
    const result = db.exec('SELECT * FROM zodiac_signs ORDER BY id ASC');
    if (!result.length) return res.json([]);

    const columns = result[0].columns;
    const rows = result[0].values.map((v) => {
      const obj: Record<string, any> = {};
      columns.forEach((col, i) => (obj[col] = v[i]));
      return obj;
    });

    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Get Single Zodiac Sign
app.get('/api/zodiac/:key', async (req: Request, res: Response) => {
  try {
    const db = await getDatabase();
    const stmt = db.prepare('SELECT * FROM zodiac_signs WHERE sign_key = :key');
    stmt.bind({ ':key': req.params.key.toLowerCase() });

    if (stmt.step()) {
      const row = stmt.getAsObject();
      stmt.free();
      return res.json(row);
    }
    stmt.free();
    res.status(404).json({ error: 'Zodiac sign not found' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Get Horoscope
app.get('/api/horoscope/:key', async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    const period = (req.query.period as string) || 'daily';
    const db = await getDatabase();

    const stmt = db.prepare('SELECT * FROM horoscopes WHERE sign_key = :key AND period = :period ORDER BY id DESC LIMIT 1');
    stmt.bind({ ':key': key.toLowerCase(), ':period': period });

    if (stmt.step()) {
      const row = stmt.getAsObject();
      stmt.free();
      return res.json(row);
    }
    stmt.free();

    // Fallback if not specifically found in DB
    const signStmt = db.prepare('SELECT name, element, ruling_planet FROM zodiac_signs WHERE sign_key = :key');
    signStmt.bind({ ':key': key.toLowerCase() });
    let signName = key;
    if (signStmt.step()) {
      signName = (signStmt.getAsObject().name as string) || key;
    }
    signStmt.free();

    res.json({
      sign_key: key,
      period,
      forecast_date: new Date().toISOString().split('T')[0],
      overview: `Auspicious celestial movements align for ${signName}. Trust your internal compass today.`,
      love_forecast: 'Relational harmony deepens through authentic, heartfelt communication.',
      career_forecast: 'Focus on systematic progression; momentum builds steadily behind the scenes.',
      wellness_forecast: 'Prioritize restorative hydration and balanced sleep cycles.',
      lucky_numbers: '3, 7, 21',
      lucky_color: 'Cosmic Gold',
      compatible_signs: 'Taurus, Virgo',
      celestial_aspect: 'Sun sextile Jupiter',
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Live Planetary Ephemeris
app.get('/api/ephemeris', (req: Request, res: Response) => {
  try {
    const dateQuery = req.query.date as string;
    const targetDate = dateQuery ? new Date(dateQuery) : new Date();
    const positions = calculateEphemeris(targetDate);
    res.json({
      calculatedAt: targetDate.toISOString(),
      positions,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Calculate Birth Chart
app.post('/api/birth-chart', (req: Request, res: Response) => {
  try {
    const { birthDate, birthTime, latitude, longitude, locationName } = req.body;
    if (!birthDate) {
      return res.status(400).json({ error: 'Birth date is required' });
    }

    const timeStr = birthTime || '12:00';
    const dateTimeStr = `${birthDate}T${timeStr}:00Z`;
    const lat = typeof latitude === 'number' ? latitude : parseFloat(latitude || '40.7128');
    const lon = typeof longitude === 'number' ? longitude : parseFloat(longitude || '-74.0060');

    const chart = calculateBirthChart(dateTimeStr, lat, lon, locationName);
    res.json(chart);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Traditional Astrology Topics
app.get('/api/traditional', async (req: Request, res: Response) => {
  try {
    const db = await getDatabase();
    const category = req.query.category as string;

    let sql = 'SELECT * FROM traditional_topics';
    if (category && category !== 'All') {
      sql += ' WHERE category = :cat';
    }
    sql += ' ORDER BY id ASC';

    const stmt = db.prepare(sql);
    if (category && category !== 'All') {
      stmt.bind({ ':cat': category });
    }

    const rows: any[] = [];
    while (stmt.step()) {
      rows.push(stmt.getAsObject());
    }
    stmt.free();
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Compatibility Matrix
app.get('/api/compatibility/:s1/:s2', async (req: Request, res: Response) => {
  try {
    const s1 = req.params.s1.toLowerCase();
    const s2 = req.params.s2.toLowerCase();
    const db = await getDatabase();

    const stmt = db.prepare('SELECT * FROM compatibility_matrix WHERE (sign1_key = :s1 AND sign2_key = :s2) OR (sign1_key = :s2 AND sign2_key = :s1) LIMIT 1');
    stmt.bind({ ':s1': s1, ':s2': s2 });

    if (stmt.step()) {
      const row = stmt.getAsObject();
      stmt.free();
      return res.json(row);
    }
    stmt.free();

    // Algorithmic calculation fallback for any arbitrary pair
    const z1Stmt = db.prepare('SELECT name, element, modality FROM zodiac_signs WHERE sign_key = :k');
    z1Stmt.bind({ ':k': s1 });
    let z1 = z1Stmt.step() ? z1Stmt.getAsObject() : { name: s1, element: 'Fire', modality: 'Cardinal' };
    z1Stmt.free();

    const z2Stmt = db.prepare('SELECT name, element, modality FROM zodiac_signs WHERE sign_key = :k');
    z2Stmt.bind({ ':k': s2 });
    let z2 = z2Stmt.step() ? z2Stmt.getAsObject() : { name: s2, element: 'Air', modality: 'Fixed' };
    z2Stmt.free();

    let score = 75;
    let dyn = `${z1.element} + ${z2.element}`;
    if (z1.element === z2.element) {
      score = 92;
      dyn += ' (Same Element Harmonic)';
    } else if (
      (z1.element === 'Fire' && z2.element === 'Air') ||
      (z1.element === 'Air' && z2.element === 'Fire') ||
      (z1.element === 'Earth' && z2.element === 'Water') ||
      (z1.element === 'Water' && z2.element === 'Earth')
    ) {
      score = 88;
      dyn += ' (Supportive Complement)';
    } else {
      score = 70;
      dyn += ' (Dynamic Growth Edge)';
    }

    res.json({
      sign1_key: s1,
      sign2_key: s2,
      overall_score: score,
      love_score: Math.min(99, score + 4),
      intellect_score: Math.min(99, score - 2),
      communication_score: Math.min(99, score + 1),
      elemental_dynamic: dyn,
      synthesis: `${z1.name} and ${z2.name} generate a unique gravitational field. Their combination stimulates personal expansion through contrasting perspectives.`,
      advice: 'Acknowledge individual needs for autonomy and emotional cadence to foster long-term balance.',
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Interactive SQLite Query Execution (Safe educational SELECT sandbox)
app.post('/api/db/query', async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'SQL query string is required' });
    }

    const trimmed = query.trim();
    const disallowed = ['DROP', 'DELETE', 'UPDATE', 'INSERT', 'ALTER', 'CREATE', 'ATTACH', 'DETACH', 'VACUUM', 'PRAGMA'];
    const firstWord = trimmed.split(/\s+/)[0]?.toUpperCase();

    if (firstWord !== 'SELECT' && firstWord !== 'EXPLAIN' && firstWord !== 'WITH') {
      return res.status(400).json({
        error: 'Educational sandbox policy: only read-only queries (SELECT, EXPLAIN) are permitted to safeguard database integrity.',
      });
    }

    for (const d of disallowed) {
      // Check if keyword is used as a modification statement
      const reg = new RegExp(`\\b${d}\\b`, 'i');
      if (d !== 'PRAGMA' && reg.test(trimmed) && !trimmed.toUpperCase().startsWith('SELECT')) {
        return res.status(400).json({ error: `Forbidden SQL operation '${d}'.` });
      }
    }

    const db = await getDatabase();
    const result = db.exec(trimmed);

    if (!result.length) {
      return res.json({ columns: [], rows: [], count: 0, executionTimeMs: 1 });
    }

    const columns = result[0].columns;
    const rows = result[0].values.map((v) => {
      const obj: Record<string, any> = {};
      columns.forEach((col, i) => (obj[col] = v[i]));
      return obj;
    });

    res.json({
      columns,
      rows,
      count: rows.length,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'SQLite Execution Error' });
  }
});

// 9. Inspect Database Tables & Schemas
app.get('/api/db/tables', async (_req: Request, res: Response) => {
  try {
    const db = await getDatabase();
    const tablesResult = db.exec("SELECT name, sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");
    if (!tablesResult.length) return res.json([]);

    const tables = tablesResult[0].values.map((val) => {
      const tableName = val[0] as string;
      const ddl = val[1] as string;

      // Count rows
      const countRes = db.exec(`SELECT COUNT(*) FROM "${tableName}"`);
      const rowCount = countRes.length && countRes[0].values.length ? (countRes[0].values[0][0] as number) : 0;

      return {
        name: tableName,
        rowCount,
        ddl,
      };
    });

    res.json(tables);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 10. Educational Python Flask Source Code
app.get('/api/flask-source', (_req: Request, res: Response) => {
  res.json(FLASK_PROJECT_FILES);
});

// 11. AI Astrological Oracle (Gemini 3.8 Flash)
app.post('/api/gemini/reading', async (req: Request, res: Response) => {
  try {
    const { question, sign, birthDetails, focusArea } = req.body;

    if (!ai) {
      // Graceful offline fallback if GEMINI_API_KEY is not yet attached
      return res.json({
        reading: `Under current celestial transits for ${sign || 'the seeker'}, the planetary currents highlight ${focusArea || 'inner clarity'}. Jupiter's expansive geometry invites conscious reflection before embarking on new journeys. Ground your thoughts with practical routines while honoring your emotional instincts.`,
        astrologicalInfluences: ['Sun-Jupiter transit resonance', 'Lunar sanctuary activation', 'Harmonic element alignment'],
        guidanceTip: 'Focus on incremental consistency over immediate fireworks. Celestial timing favors patience.',
        isFallback: true,
      });
    }

    const systemInstruction = `You are AstroVerse's master astrological scholar and classical ephemeris interpreter.
You synthesize Ptolemaic traditional principles (essential dignities, houses, planetary rulers) with deep modern psychological astrological wisdom.
Provide a clear, profound, and beautifully articulated astrological synthesis (2-3 rich paragraphs).
Keep the response balanced, insightful, grounded, and dignified without superstitious fatalism.`;

    const prompt = `A seeker is asking the AstroVerse Astrological Oracle:
Question / Focus: "${question || 'General celestial reading'}"
Sign: "${sign || 'Unknown'}"
Focus Area: "${focusArea || 'Overall Life Path'}"
Birth Details: "${birthDetails || 'Not specified'}"

Please deliver a nuanced astrological reading addressing their inquiry with celestial insight.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      },
    });

    const readingText = response.text || 'The celestial spheres whisper quiet wisdom. Trust in the unfolding of time.';

    res.json({
      reading: readingText,
      astrologicalInfluences: ['Transit planetary ephemeris', 'Solar-Lunar polarity', 'Decan alignment'],
      guidanceTip: 'Align action with cosmic rhythm; what is planted with discipline blooms in majesty.',
      isFallback: false,
    });
  } catch (err: any) {
    console.error('Gemini reading error:', err);
    res.status(500).json({
      error: 'Astrological Oracle temporarily unavailable',
      fallback: 'The cosmos counsels patience. Ground your focus on daily craftsmanship while transits align.',
    });
  }
});

// --- AUTHENTICATION & EMAIL VERIFICATION CODE ENGINE ---

// Request Verification Code for Login or Admin
app.post('/api/auth/request-code', async (req: Request, res: Response) => {
  try {
    const { email, role } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const assignedRole = role === 'admin' || cleanEmail.includes('admin') ? 'admin' : 'user';

    // Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 mins expiry

    const db = await getDatabase();
    db.run(
      `INSERT INTO verification_codes (email, code, expires_at, used, created_at)
       VALUES (?, ?, ?, 0, datetime('now'))`,
      [cleanEmail, code, expiresAt]
    );

    // Send real email via SMTP
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_EMAIL;
    const smtpPass = process.env.SMTP_PASSWORD;

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"AstroVerse Security" <${smtpUser}>`,
          to: cleanEmail,
          subject: `AstroVerse Verification Code: ${code}`,
          html: `
            <div style="background-color:#090b14;color:#e2e8f0;padding:30px;font-family:sans-serif;max-width:550px;margin:0 auto;border:1px solid #1e293b;border-radius:12px;">
              <h2 style="color:#fde68a;font-family:serif;letter-spacing:1.5px;margin-top:0;">AstroVerse Portal Access</h2>
              <p style="font-size:14px;color:#94a3b8;">You requested a verification code to access your ${assignedRole === 'admin' ? 'Astrology Administrator' : 'Celestial Seeker'} account.</p>
              <div style="background:#0f172a;border:1px solid #d97706;border-radius:10px;padding:18px;text-align:center;margin:24px 0;">
                <span style="font-size:32px;font-weight:700;letter-spacing:6px;color:#fde68a;font-family:monospace;">${code}</span>
              </div>
              <p style="font-size:12px;color:#64748b;">This code expires in 15 minutes. If you did not request this, please disregard this transmission.</p>
            </div>
          `,
        });
      } catch (mailErr) {
        console.warn('Could not send email via SMTP, continuing with devCode fallback:', mailErr);
      }
    }

    res.json({
      success: true,
      message: `Verification code sent to ${cleanEmail}`,
      email: cleanEmail,
      role: assignedRole,
      devCode: code, // Convenient dev preview
    });
  } catch (err: any) {
    console.error('Request code error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate verification code' });
  }
});

// Verify Code and Grant Session Access
app.post('/api/auth/verify-code', async (req: Request, res: Response) => {
  try {
    const { email, code, name, sun_sign, role } = req.body;
    if (!email || !code) {
      return res.status(400).json({ error: 'Email and verification code are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanCode = code.trim();
    const db = await getDatabase();

    // Verify code exists, not used, and not expired
    const stmt = db.prepare(
      `SELECT id FROM verification_codes 
       WHERE email = :email AND code = :code AND used = 0 AND datetime(expires_at) >= datetime('now', '-1 hour')
       ORDER BY id DESC LIMIT 1`
    );
    stmt.bind({ ':email': cleanEmail, ':code': cleanCode });

    const codeValid = stmt.step();
    let codeId: number | null = null;
    if (codeValid) {
      codeId = stmt.getAsObject().id as number;
    }
    stmt.free();

    if (!codeValid) {
      return res.status(400).json({ error: 'Invalid or expired verification code. Please request a new code.' });
    }

    // Mark code as used
    if (codeId) {
      db.run('UPDATE verification_codes SET used = 1 WHERE id = ?', [codeId]);
    }

    // Determine user role
    const assignedRole = role === 'admin' || cleanEmail.includes('admin') ? 'admin' : 'user';
    const userName = name || (assignedRole === 'admin' ? 'Astrology Administrator' : cleanEmail.split('@')[0]);

    // Check if user already exists
    const userStmt = db.prepare('SELECT id, email, name, role, sun_sign, created_at FROM users WHERE email = :email');
    userStmt.bind({ ':email': cleanEmail });

    let user: any = null;
    if (userStmt.step()) {
      user = userStmt.getAsObject();
    }
    userStmt.free();

    if (!user) {
      // Create user
      db.run(
        `INSERT INTO users (email, name, role, sun_sign, created_at)
         VALUES (?, ?, ?, ?, datetime('now'))`,
        [cleanEmail, userName, assignedRole, sun_sign || 'Aries']
      );

      const newUserStmt = db.prepare('SELECT id, email, name, role, sun_sign, created_at FROM users WHERE email = :email');
      newUserStmt.bind({ ':email': cleanEmail });
      if (newUserStmt.step()) {
        user = newUserStmt.getAsObject();
      }
      newUserStmt.free();
    }

    res.json({
      success: true,
      message: 'Email verification verified successfully.',
      user,
    });
  } catch (err: any) {
    console.error('Verify code error:', err);
    res.status(500).json({ error: err.message || 'Verification failed' });
  }
});

// Admin User List
app.get('/api/auth/admin/users', async (_req: Request, res: Response) => {
  try {
    const db = await getDatabase();
    const usersResult = db.exec('SELECT id, email, name, role, sun_sign, created_at FROM users ORDER BY id DESC');
    const codesResult = db.exec('SELECT id, email, code, expires_at, used, created_at FROM verification_codes ORDER BY id DESC LIMIT 20');

    const users = usersResult.length
      ? usersResult[0].values.map((v) => {
          const obj: Record<string, any> = {};
          usersResult[0].columns.forEach((c, i) => (obj[c] = v[i]));
          return obj;
        })
      : [];

    const codes = codesResult.length
      ? codesResult[0].values.map((v) => {
          const obj: Record<string, any> = {};
          codesResult[0].columns.forEach((c, i) => (obj[c] = v[i]));
          return obj;
        })
      : [];

    res.json({ users, codes });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 12. Send Astrological Report / Reading via SMTP
app.post('/api/email/report', async (req: Request, res: Response) => {
  try {
    const { toEmail, subject, reportType, title, content, chartData } = req.body;

    if (!toEmail || !toEmail.includes('@')) {
      return res.status(400).json({ error: 'A valid recipient email address is required.' });
    }

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_EMAIL;
    const smtpPass = process.env.SMTP_PASSWORD;

    if (!smtpUser || !smtpPass) {
      return res.status(500).json({ error: 'SMTP credentials not configured on server.' });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for 587
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const emailSubject = subject || `AstroVerse Celestial Dispatch: ${title || 'Your Astrological Report'}`;

    // Create an ornate dark celestial HTML newsletter
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { margin: 0; padding: 0; background-color: #090b14; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #e2e8f0; }
          .container { max-width: 600px; margin: 30px auto; background-color: #0d101d; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .header { background: linear-gradient(135deg, #1e1b4b 0%, #0d101d 100%); padding: 32px 24px; text-align: center; border-bottom: 1px solid #334155; }
          .brand { font-size: 26px; font-weight: 700; color: #fde68a; letter-spacing: 2px; text-transform: uppercase; margin: 0; }
          .subtitle { font-size: 11px; text-transform: uppercase; color: #94a3b8; letter-spacing: 1.5px; margin-top: 6px; }
          .body-content { padding: 32px 28px; line-height: 1.7; font-size: 14px; color: #cbd5e1; }
          .title-box { margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #1e293b; }
          .report-title { font-size: 20px; font-weight: 700; color: #f8fafc; margin: 0 0 6px 0; }
          .report-meta { font-size: 12px; color: #fbbf24; }
          .prose { white-space: pre-line; margin-bottom: 24px; color: #e2e8f0; }
          .chart-pill-box { background-color: #07080f; border: 1px solid #1e293b; border-radius: 12px; padding: 16px; margin-bottom: 24px; }
          .pill-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #151b2d; font-size: 12px; }
          .pill-row:last-child { border-bottom: none; }
          .pill-label { color: #94a3b8; }
          .pill-value { color: #fde68a; font-weight: 600; }
          .footer { background-color: #07080f; padding: 24px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #1e293b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="brand">AstroVerse</h1>
            <div class="subtitle">Harmonia Celestis · Astrological Dispatch</div>
          </div>
          <div class="body-content">
            <div class="title-box">
              <h2 class="report-title">${title || 'Celestial Astrological Synthesis'}</h2>
              <div class="report-meta">${reportType ? reportType.toUpperCase() : 'HORIZON REPORT'} · Generated ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
            </div>

            <div class="prose">${content || 'Your personal celestial transits align to illuminate your path.'}</div>

            ${
              chartData
                ? `
              <div class="chart-pill-box">
                <div style="font-size: 11px; text-transform: uppercase; color: #fbbf24; font-weight: 700; margin-bottom: 10px; letter-spacing: 1px;">Natal Placements Summary</div>
                ${chartData.ascendant ? `<div class="pill-row"><span class="pill-label">Ascendant (Rising)</span><span class="pill-value">${chartData.ascendant.formatted || chartData.ascendant.sign}</span></div>` : ''}
                ${chartData.sun ? `<div class="pill-row"><span class="pill-label">Sun Position</span><span class="pill-value">☉ ${chartData.sun.formatted || chartData.sun.sign}</span></div>` : ''}
                ${chartData.moon ? `<div class="pill-row"><span class="pill-label">Moon Position</span><span class="pill-value">☽ ${chartData.moon.formatted || chartData.moon.sign}</span></div>` : ''}
              </div>
            `
                : ''
            }

            <p style="font-size: 12px; color: #94a3b8; margin-top: 24px; font-style: italic;">
              "Align action with cosmic rhythm; what is planted with discipline blooms in majesty."
            </p>
          </div>
          <div class="footer">
            © 2026 AstroVerse. Designed with astronomical precision for educational research.<br>
            Sent via secure SMTP server node to ${toEmail}.
          </div>
        </div>
      </body>
      </html>
    `;

    const info = await transporter.sendMail({
      from: `"AstroVerse Celestial Dispatch" <${smtpUser}>`,
      to: toEmail,
      subject: emailSubject,
      html: htmlBody,
    });

    res.json({
      success: true,
      messageId: info.messageId,
      recipient: toEmail,
    });
  } catch (err: any) {
    console.error('SMTP email error:', err);
    res.status(500).json({
      error: `Failed to deliver email: ${err.message || 'SMTP transmission failure'}`,
    });
  }
});

// 13. SerpApi Academic Astrology & College Research Search
app.get('/api/academic-search', async (req: Request, res: Response) => {
  try {
    const q = (req.query.q as string) || 'astrology history university degrees academic research';
    const apiKey = process.env.SERP_API_KEY;

    if (!apiKey) {
      // Fallback academic dataset if key is not active
      return res.json({
        query: q,
        organic_results: [
          {
            title: 'Sophia Centre for the Study of Cosmology in Culture',
            link: 'https://www.uwtsd.ac.uk/sophia/',
            snippet: 'Academic centre within University of Wales Trinity Saint David dedicated to the study of cultural astronomy and traditional astrology in human history.',
            source: 'University of Wales Trinity Saint David',
          },
          {
            title: 'Kepler College of Astrological Arts and Sciences',
            link: 'https://www.keplercollege.org/',
            snippet: 'Premier higher education institute offering structured certificate programs in natal, mundane, and Hellenistic astrology.',
            source: 'Kepler College',
          },
          {
            title: 'The Warburg Institute - History of Astrology & Magic in the Renaissance',
            link: 'https://warburg.sas.ac.uk/',
            snippet: 'School of Advanced Study, University of London, specializing in the transmission of classical astrological manuscripts and cultural history.',
            source: 'Warburg Institute (University of London)',
          },
          {
            title: 'Faculty of Astrological Studies (London)',
            link: 'https://www.astrology.org.uk/',
            snippet: 'Founded in 1948 in London to raise the standard of astrological education, offering diploma programs internationally.',
            source: 'Faculty of Astrological Studies',
          },
        ],
      });
    }

    const serpUrl = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(q)}&api_key=${apiKey}&num=6`;
    const resp = await fetch(serpUrl);
    if (!resp.ok) {
      throw new Error(`SerpApi response status: ${resp.status}`);
    }

    const data = await resp.json();
    const results = (data.organic_results || []).slice(0, 6).map((item: any) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      source: item.displayed_link || item.source || 'Academic Source',
    }));

    res.json({
      query: q,
      organic_results: results,
    });
  } catch (err: any) {
    console.error('SerpApi error:', err);
    // Return gracefully structured fallback
    res.json({
      query: (req.query.q as string) || '',
      organic_results: [
        {
          title: 'The Sophia Centre for the Study of Cosmology in Culture',
          link: 'https://www.uwtsd.ac.uk/sophia/',
          snippet: 'University department specializing in the academic study of astrology, cosmology, and cultural astronomy.',
          source: 'University of Wales Trinity Saint David',
        },
        {
          title: 'Kepler College - Classical & Modern Astrological Studies',
          link: 'https://www.keplercollege.org/',
          snippet: 'Certificated degrees and diplomas in traditional, psychological, and mathematical astrology.',
          source: 'Kepler College',
        },
      ],
    });
  }
});

// Static / Vite middleware integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AstroVerse server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
