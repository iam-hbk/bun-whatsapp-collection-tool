import { Database } from "bun:sqlite";

export async function initializeDatabase() {
  try {
    const db = new Database("src/database/database.sqlite", { create: true });
    const statement = db.query(`SELECT * FROM data`);
    const row = statement.all();
    if (!!row) {
      return db;
    }
    await createTables(db);
    console.log("\nDatabase initialized successfully ☄️");

    return db;
  } catch (error) {
    throw error;
  }
}
export function openDatabase(): Database {
  try {
    const db = new Database("src/database/database.sqlite");
    return db;
  } catch (error) {
    throw error;
  }
}
async function createTables(db: Database): Promise<void> {
  const createTableQueries = [
    `CREATE TABLE IF NOT EXISTS data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT UNIQUE NOT NULL,
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
