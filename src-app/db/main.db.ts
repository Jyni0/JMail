import { app } from 'electron';
import BetterSqlite3 from 'better-sqlite3';
import { SqliteDialect, Kysely } from 'kysely';
import path from 'path';
import fs from 'fs';

// ? Interfaces
import type { Db as DbInterface } from '../interfaces/db/db.i.ts';

// ? Db initializer
import { initDatabase } from './initializer.db.ts';

// ? Validation
const userDataPath = app.getPath("userData");
if (!fs.existsSync(userDataPath)) {
  fs.mkdirSync(userDataPath, { recursive: true });
}

const dbPath = path.join(userDataPath, "app.db");

// ? better-sqlite3 Initialization
const sqlite = new BetterSqlite3(dbPath);

// ? Db settings
sqlite.pragma('journal_mode = WAL');
sqlite.pragma('foreign_keys = ON');

export const _db = new Kysely<DbInterface>({
  dialect: new SqliteDialect({
    database: sqlite,
  }),
});

// ? Setting up database
export async function setupDatabase() {
  try {
    await initDatabase(_db);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}
