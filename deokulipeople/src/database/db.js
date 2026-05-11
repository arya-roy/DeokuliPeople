import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database file path
const DB_PATH = path.join(__dirname, '../../data/deokuli.db');

// Database connection cache
let dbInstance = null;

export async function getDatabase() {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = await open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  });

  return dbInstance;
}

export async function closeDatabase() {
  if (dbInstance) {
    await dbInstance.close();
    dbInstance = null;
  }
}

// Initialize database with schema
export async function initializeDatabase() {
  const db = await getDatabase();

  // Read and execute schema
  const fs = await import('fs');
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');

  await db.exec(schema);
  console.log('Database initialized successfully');
}

export default {
  getDatabase,
  closeDatabase,
  initializeDatabase,
};