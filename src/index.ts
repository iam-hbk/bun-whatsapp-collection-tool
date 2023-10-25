import express from "express";
import { readCSV } from "./read_csv";
import Database from "bun:sqlite";
const app = express();
const port = 3000;

const accountSid = Bun.env.TWILIO_ACCOUNT_SID;
const authToken = Bun.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

let db: Database;
try {
  db = await readCSV();
  db.exec("PRAGMA journal_mode = WAL;");
  console.log("Database populated successfully");
} catch (error) {
  console.error("DATABASE ERROR",(error as Error).message);
}

app.get("/", async (req, res) => {
  res.send("Whatsapp bot is running!");
});

app.get("/send", async (req, res) => {
  // const { to, message } = req.query;
  // console.log(to, message);
  try {
    const message = await client.messages.create({
      from: "whatsapp:+14155238886",
      // from: "whatsapp:+15187543384",
      body: "Message from Server",
      to: `whatsapp:+27642448112`,
    });

    res.json({ message });
  } catch (error) {
    res.status(500).json({ error });
  }
});

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
