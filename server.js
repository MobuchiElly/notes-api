require("dotenv").config();
const connectDB = require("./src/config/db");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.json("Tracking...");
})

const PORT = process.env.PORT;
//connect to database, then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}).catch((err) => {
  console.error('Database connection failure:', err);
  process.exit(1);
}); 