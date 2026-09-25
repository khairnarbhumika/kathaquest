import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { query } from '../db/index.js';

const COOKIE_NAME = 'kq_session';
const SESSION_DURATION_DAYS = 30;

declare global {
  namespace Express {
    interface Request {
      playerSessionId: string;
      playerToken: string;
    }
  }
}

function hashToken(token: string): string {
  const pepper = process.env.SESSION_TOKEN_PEPPER || 'default-kathaquest-pepper-2026';
  return crypto.createHmac('sha256', pepper).update(token).digest('hex');
}

export async function sessionMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    let token = req.cookies?.[COOKIE_NAME];
    let sessionId: string | null = null;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000);

    if (token) {
      const tokenHash = hashToken(token);
      const sessionRes = await query(
        `SELECT id, expires_at, revoked_at FROM player_sessions WHERE token_hash = $1`,
        [tokenHash]
      );

      if (sessionRes.rows.length > 0) {
        const session = sessionRes.rows[0];
        if (!session.revoked_at && new Date(session.expires_at) > now) {
          sessionId = session.id;
          // Refresh last_seen_at
          await query(`UPDATE player_sessions SET last_seen_at = now() WHERE id = $1`, [sessionId]);
        }
      }
    }

    // Create new anonymous player session if missing or expired
    if (!sessionId) {
      token = crypto.randomUUID();
      const tokenHash = hashToken(token);
      const newSessionRes = await query(
        `INSERT INTO player_sessions (token_hash, expires_at) VALUES ($1, $2) RETURNING id`,
        [tokenHash, expiresAt.toISOString()]
      );
      sessionId = newSessionRes.rows[0].id;

      // Initialize player_stats
      await query(
        `INSERT INTO player_stats (player_session_id, total_xp) VALUES ($1, 0)
         ON CONFLICT (player_session_id) DO NOTHING`,
        [sessionId]
      );

      // Set HTTP-only secure session cookie
      res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: expiresAt,
        path: '/',
      });
    }

    req.playerSessionId = sessionId;
    req.playerToken = token;
    next();
  } catch (err) {
    console.error('Session middleware error:', err);
    next(err);
  }
}
