import csvParser from "csv-parser";
import fs from "fs";
import { initializeDatabase } from "../database/bun_base";
import { Database } from "bun:sqlite";

export type Unlabeled_Data = {
  label: string;
  text: string;
}
// @iam-hbk on Github
export async function readCSV(): Promise<Database> {
  const filePath = "src/data/unlabeled_data.csv";
  const db = await initializeDatabase();

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

  // db.run(query, [text], (err) => {
  //   if (err) {
  //     reject(err);
  //   } else {
  //     resolve();
  //   }
  // });
}
