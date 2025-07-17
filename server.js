require("dotenv").config();
const connectDB = require("./src/config/db");
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const helmet = require("helmet");
const {xss} = require("express-xss-sanitizer");
const authRouter = require("./src/routes/auth");
const notesRouter = require("./src/routes/notes");
const errorHandlerMiddleware = require("./src/middleware/error-handler-middleware");

const app = express();

//Middlewares
app.use(helmet());
//Rate limiting
// // Trust the proxy for X-Forwarded-For headers
// app.set('trust proxy', 1);  // 1 means trusting the first proxy
// const rateLimiter = rateLimit({
//   windowMS: 15 * 60 * 1000,
//   max: 100,
// });
// app.use(rateLimiter);

app.use(express.json());
app.use(xss());
app.use(cors());

//API ROUTES
app.use("/api/v1/auth", authRouter);
//app.use("/api/v1/notes", notesRouter);
app.use(errorHandlerMiddleware);


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