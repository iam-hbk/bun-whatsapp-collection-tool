import express from "express";
import { readCSV } from "./utils/read_csv";
import Database from "bun:sqlite";
import { sessionController } from "./controllers/sessionController";

const app = express();
const port = 3000;

const accountSid = Bun.env.TWILIO_ACCOUNT_SID;
const authToken = Bun.env.TWILIO_AUTH_TOKEN;
export const client = require("twilio")(accountSid, authToken);

let db: Database;
try {
  db = await readCSV();
  db.exec("PRAGMA journal_mode = WAL;");
  console.log("Database populated successfully");
} catch (error) {
  console.error("DATABASE ERROR", (error as Error).message);
}

app.get("/", async (req, res) => {
  res.send("Whatsapp bot is running!");
});

//listen to reponses
// In your server file
app.post(
  "/webhook",
  express.urlencoded({ extended: false }),
  async (req, res) => {
    const { Body, From } = req.body;
    console.log("Webhook ", Body, From);
    if (Body.toLowerCase() === "start") {
      await sessionController.startSession(From);
    } else if (Body.toLowerCase() === "stop") {
      await sessionController.stopSession(From);
    } else {
      await sessionController.processResponse(From, Body);
    }
    res.status(200).send();
  }
);

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
});

// Handle process termination
process.on("SIGINT", closeDatabase);
process.on("SIGTERM", closeDatabase);

function closeDatabase() {
  if (db) {
    db.close();
    console.log("Database connection closed");
    process.exit(0);
  } else {
    process.exit(0); // Exit the process if there's no database connection
  }
}
