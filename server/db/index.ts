import pg from 'pg';
import { PGlite } from '@electric-sql/pglite';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

interface QueryResult<T = any> {
  rows: T[];
  rowCount: number | null;
}

let pool: pg.Pool | null = null;
let pglite: PGlite | null = null;
let isPgLiteMode = false;

export async function initDb(): Promise<void> {
  const dbUrl = process.env.DATABASE_URL;

  if (dbUrl && dbUrl.trim() !== '') {
    try {
      console.log('Attempting connection to PostgreSQL database...');
      const testPool = new Pool({ connectionString: dbUrl, connectionTimeoutMillis: 3000 });
      await testPool.query('SELECT 1');
      pool = testPool;
      console.log('Successfully connected to external PostgreSQL database via pg.');
      return;
    } catch (err: any) {
      console.warn('Failed to connect to DATABASE_URL Postgres instance. Falling back to PGlite WASM:', err.message);
    }
  }

  // Fallback to PGlite embedded Postgres
  console.log('Initializing embedded WASM PostgreSQL (PGlite) with persistence...');
  const dataDir = path.resolve(process.cwd(), '.data/kathaquest.db');
  if (!fs.existsSync(path.dirname(dataDir))) {
    fs.mkdirSync(path.dirname(dataDir), { recursive: true });
  }

  pglite = new PGlite(dataDir);
  isPgLiteMode = true;
  await pglite.waitReady;
  console.log('PGlite WASM database ready.');
}

export async function query<T = any>(sql: string, params: any[] = []): Promise<QueryResult<T>> {
  if (!pool && !pglite) {
    await initDb();
  }

  if (pool) {
    const res = await pool.query(sql, params);
    return { rows: res.rows, rowCount: res.rowCount };
  } else if (pglite) {
    const res = await pglite.query<T>(sql, params);
    return { rows: res.rows, rowCount: res.rows.length };
  } else {
    throw new Error('Database not initialized');
  }
}

/**
 * Execute callback within a transaction setting current player session context
 */
export async function withTransaction<T>(
  playerSessionId: string | null,
  fn: (dbQuery: typeof query) => Promise<T>
): Promise<T> {
  if (!pool && !pglite) {
    await initDb();
  }

  if (pool) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      if (playerSessionId) {
        await client.query("SELECT set_config('app.player_session_id', $1, true)", [playerSessionId]);
      }
      const clientQuery = async <R = any>(sql: string, params: any[] = []): Promise<QueryResult<R>> => {
        const res = await client.query(sql, params);
        return { rows: res.rows, rowCount: res.rowCount };
      };
      const result = await fn(clientQuery);
      await client.query('COMMIT');
      return result;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } else if (pglite) {
    // PGlite single process transaction
    await pglite!.query('BEGIN');
    try {
      if (playerSessionId) {
        // PGlite set_config support
        try {
          await pglite!.query("SELECT set_config('app.player_session_id', $1, true)", [playerSessionId]);
        } catch {
          // Ignores if set_config is not strictly supported in pglite WASM
        }
      }
      const result = await fn(query);
      await pglite!.query('COMMIT');
      return result;
    } catch (err) {
      await pglite!.query('ROLLBACK');
      throw err;
    }
  } else {
    throw new Error('Database not initialized');
  }
}

export function isPgLite(): boolean {
  return isPgLiteMode;
}
