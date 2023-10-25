import { Database } from "bun:sqlite";

export async function initializeDatabase() {
  try {
    const db = new Database("src/database/database.sqlite", { create: true });
    await createTables(db);
    console.log("Database initialized successfully");
    return db;
  } catch (error) {
    throw error;
  }
}
export function openDatabase(): Database {
  try {
    const db = new Database("src/database/database.sqlite");
    console.log("Database opened successfully");
    return db;
  } catch (error) {
    throw error;
  }
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
      );`,
  ];

  for (const query of createTableQueries) {
    await runQuery(db, query);
  }
}

function runQuery(db: Database, query: string): void {
  const prepared_query_statement = db.query(query);
  try {
    prepared_query_statement.run();
  } catch (error) {
    throw error;
  }
}
