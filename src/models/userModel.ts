import { Database } from "bun:sqlite";
import { openDatabase } from "../database/bun_base";

const db: Database = openDatabase();

export const userModel = {
  setActive(user: string): void {
    /**
     * The following query uses the UPSERT syntax to insert a new user
     * @user is the user's phone number
     */
    const statement = db.query(
      `INSERT INTO users (phone_number, status) VALUES (?, 'active') ON CONFLICT(phone_number) DO UPDATE SET status = 'active';`
    );
    statement.run(user);
  },

  setInactive(user: string): void {
    /**
     * Set an existing user to inactive
     * @user is the user's phone number
     *
     */
    const statement = db.query(
      `UPDATE users SET status = 'inactive' WHERE phone_number = ?;`
    );
    statement.run(user);
  },

  // Other user-related methods can go here...
};
