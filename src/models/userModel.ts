import { Database } from "bun:sqlite";
import { openDatabase } from "../database/bun_base";

const db: Database = openDatabase();

interface GetStatusResponse {
  status: string | null;
}

export const userModel = {
  setActive(user: string): void {
    /**
     * The following query uses the UPSERT syntax to insert a new user
     * @user is the user's phone number
     */
    try {
      const statement = db.query(
        `INSERT INTO users (phoneNumber, status) VALUES (?, 'active') ON CONFLICT(phoneNumber) DO UPDATE SET status = 'active';`
      );
      statement.run(user);
    } catch (error) {
      throw error;
    }
  },

  setInactive(user: string): void {
    /**
     * Set an existing user to inactive
     * @user is the user's phone number
     *
     */
    try {
      const statement = db.query(
        `UPDATE users SET status = 'inactive' WHERE phoneNumber = ?;`
      );
      statement.run(user);
    } catch (error) {
      throw error;
    }
  },

  getStatus(user: string): boolean {
    /**
     * Get the status of a user
     * @user is the user's phone number
     *
     */
    const statement = db.query(
      `SELECT status FROM users WHERE phoneNumber = ?;`
    );
    const row = statement.get(user);
    if (row) {
      return (row as GetStatusResponse).status === "active";
    }
    return false;
  },

  // Other user-related methods can go here...
};
