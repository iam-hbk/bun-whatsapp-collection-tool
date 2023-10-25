import csvParser from "csv-parser";
import fs from "fs";
import { initializeDatabase } from "../database/bun_base";
import { Database } from "bun:sqlite";
import { resolve } from "bun";

export type Unlabeled_Data = {
  label: string;
  text: string;
};
// @iam-hbk on Github
export async function readCSV(): Promise<Database> {
  const filePath = "src/data/unlabeled_data.csv";
  const db = await initializeDatabase();

  // check if the db is empty
  const statement = db.query(`SELECT * FROM data`);
  const row = statement.all();
  if (!!row) {
    console.log(`Database is not empty, ${row.length} records found `);
    return new Promise((resolve) => resolve(db));
  }
  console.log("Database is empty ! Populating...");
  return new Promise((resolve, reject) => {
    const data: Unlabeled_Data[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", async (row: Unlabeled_Data) => {
        data.push(row);
        const { text } = row;
        runInsertQuery(db, text);
      })
      .on("end", () => {
        resolve(db);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

function runInsertQuery(db: Database, text: string): void {
  try {
    const query = "INSERT INTO data (text) VALUES (?);";
    const prepared_query_statement = db.query(query);
    prepared_query_statement.run(text);
  } catch (error) {
    throw error;
  }
}
