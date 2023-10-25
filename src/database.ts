import { Database } from 'sqlite3';

export async function initializeDatabase(): Promise<Database> {
  return new Promise((resolve, reject) => {
    const db = new Database('./database.db', (err) => {
      if (err) {
        reject(err);
      } else {
        createTables(db).then(() => resolve(db)).catch(reject);
      }
    });
  });
}

async function createTables(db: Database): Promise<void> {
  const createTableQueries = [
    `CREATE TABLE IF NOT EXISTS data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT,
      label TEXT DEFAULT 'unknown',
      status TEXT DEFAULT 'unprocessed'
    );`,
    `CREATE TABLE IF NOT EXISTS users (
      phoneNumber TEXT PRIMARY KEY,
      status TEXT DEFAULT 'inactive'
    );`
  ];

  for (const query of createTableQueries) {
    await runQuery(db, query);
  }
}

function runQuery(db: Database, query: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
