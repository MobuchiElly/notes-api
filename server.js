require("dotenv").config();
const connectDB = require("./src/config/db");
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const helmet = require("helmet");
//const mongoSanitize = require('express-mongo-sanitize');
const {xss} = require("express-xss-sanitizer");
const authRouter = require("./src/routes/auth");
const notesRouter = require("./src/routes/notes");
const authMiddleware = require("./src/middleware/authMiddleware");
const errorHandlerMiddleware = require("./src/middleware/error-handler-middleware");

const app = express();

//Middlewares
app.use(helmet());

// Rate limiting. Trust the proxy for X-Forwarded-For headers
app.set('trust proxy', 1);
const rateLimiter = rateLimit({
  windowMS: 60 * 60 * 1000,
  max: 100,
  message: 'Too many requests from you. Please try again after an hour.',
  standardHeaders: true,
  legacyHeaders: false
});
app.use(rateLimiter);

app.use(express.json());
//app.use(mongoSanitize());
app.use(xss());
app.use(cors());

//API ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/notes", authMiddleware, notesRouter);
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