require("dotenv").config();
const connectDB = require("./src/config/db");
const express = require("express");
const {rateLimit, ipKeyGenerator} = require("express-rate-limit");
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const {xss} = require("express-xss-sanitizer");
const authRouter = require("./src/routes/auth");
const notesRouter = require("./src/routes/notes");
const authMiddleware = require("./src/middleware/authMiddleware");
const errorHandlerMiddleware = require("./src/middleware/error-handler-middleware");
const NotFound = require("./src/middleware/NotFound");

const app = express();

//Middlewares
app.use(helmet());

app.use(express.json());
app.use(express.static("./public"));
app.use(xss());
app.use(cors());

//Swagger middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//API ROUTES
app.use("/api/v1/auth", authRouter);

// Rate limiting. Trust the proxy for X-Forwarded-For headers
app.set('trust proxy', 1);
const userRateLimiter = rateLimit({
  windowMS: process.env.RATE_LIMIT_WINDOW_MS,
  max: process.env.RATE_LIMIT_MAX,
  keyGenerator: (req, res) => {
    // Use authenticated user's ID if available
    if (req.user && req.user.userId) {
      return req.user.userId;
    }
    return ipKeyGenerator(req);
  },
  message: {
    status: 429,
    message: 'Too many requests. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/v1/notes", authMiddleware, userRateLimiter, notesRouter);
app.use(errorHandlerMiddleware);
app.use(NotFound);

const PORT = process.env.PORT || 5000;
//connect to database, then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
  });
  console.log(`Swagger docs at Port ${PORT}/api-docs`);
}).catch((err) => {
  console.error('Database connection failure:', err);
  process.exit(1);
});