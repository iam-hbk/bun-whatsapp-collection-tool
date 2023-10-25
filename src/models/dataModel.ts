import { Database } from "bun:sqlite";
import { openDatabase } from "../database/bun_base";

const db: Database = openDatabase();

interface GetUnlabeledDataResponse {
  id: number;
  text: string;
}

export const dataModel = {
  getUnlabeledData(): GetUnlabeledDataResponse | null {
    const statement = db.query(`
      SELECT id, text
      FROM data 
      WHERE label = 'unknown' AND status = 'unprocessed' 
      LIMIT 1;
    `);
    const row = statement.get() as GetUnlabeledDataResponse | null;
    return row;
  },

  updateLabel(response: { label: string; id: number }): void {
    const { id: rowId, label } = response;
    const statement = db.query(`
      UPDATE data 
      SET label = ? 
      WHERE id = ? AND status = 'unprocessed';
    `);
    statement.run(label, rowId);
  },
};
