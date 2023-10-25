import express from "express";
const app = express();
const port = 3000;

const accountSid = Bun.env.TWILIO_ACCOUNT_SID;
const authToken = Bun.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

app.get("/", async (req, res) => {
  res.send("Whatsapp bot is running!");
});

app.get("/send", async (req, res) => {
  // const { to, message } = req.query;
  // console.log(to, message);
  const message = await client.messages.create({
    from: "whatsapp:+14155238886",
    body: "MR Ronny should buy an iPhone",
    to: `whatsapp:+27642448112`,
  });

  res.send(message);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// const body = figlet.textSync("P a v e!", "Swan");
// return new Response(body);
