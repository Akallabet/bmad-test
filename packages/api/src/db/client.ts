import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import * as schema from './schema';

// Create in-memory SQLite database
const sqlite = new Database(':memory:');

// Enable foreign keys (though we don't use them in MVP)
sqlite.pragma('foreign_keys = ON');

// Create Drizzle instance
export const db = drizzle(sqlite, { schema });

// Run migrations on startup
export function initializeDatabase() {
  try {
    migrate(db, { migrationsFolder: './src/db/migrations' });
    console.log('Database migrations applied successfully');
  } catch (error) {
    console.error('Database migration failed:', error);
    throw error;
  }
}

// Health check - verify database is accessible
export function checkDatabaseHealth(): boolean {
  try {
    const result = sqlite.prepare('SELECT 1').get();
    return result !== undefined;
  } catch {
    return false;
  }
}
