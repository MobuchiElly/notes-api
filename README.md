#  Simple Notes REST API

A secure and scalable RESTful API for managing personal notes. Built with **Node.js**, **Express**, and **MongoDB**, this project demonstrates robust authentication using JWT, CRUD operations, input validation, pagination, Swagger documentation, and optional rate limiting.

---

##  Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [API Documentation](#api-documentation)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

##  Features

- User registration and login using **JWT**
- Full **CRUD operations** for notes
- Secure **authentication middleware**
- **Input validation** with descriptive errors
- **Pagination** for retrieving notes
- Optional **rate limiting** to prevent abuse
- Fully documented using **Swagger/OpenAPI**
- Modular and testable codebase

---

##  Tech Stack

| Technology | Description         |
|------------|---------------------|
| Node.js    | JavaScript runtime  |
| Express.js | Web framework       |
| MongoDB    | NoSQL database      |
| Mongoose   | ODM for MongoDB     |
| JWT        | Authentication      |
| Swagger    | API documentation   |

---

##  Getting Started

###  Prerequisites

- Node.js >= 14.x
- MongoDB installed locally or cloud URI (MongoDB Atlas)

###  Installation

```bash
git clone https://github.com/MobuchiElly/notes-api.git
cd notes-api
npm install
````

###  Environment Variables

Create a `.env` file in the root directory with the following:

```env
PORT=5000
MONGO_URI=mongodb+srv://ugwueleazer:poErgFuE8ktDPrKy@cluster0.2wmnytp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
RATE_LIMIT_WINDOW_MS=3600000
RATE_LIMIT_MAX=100
```

###  Running the App

```bash
# Development
npm run dev

# Production
npm start
```

---

##  API Documentation

The API is documented using **Swagger**. After starting the server, visit:

```
http://localhost:5000/api-docs
```

You’ll see all available routes, request/response structures, and schemas.

---

##  API Endpoints

###  Authentication

| Method | Route                | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/v1/auth/register` | Register a new user   |
| POST   | `/api/v1/auth/login`    | Login and receive JWT |
| GET    | `/api/v1/auth/me`       | Get current user info |

###  Notes (Protected)

| Method | Route            | Description                     |
| ------ | ---------------- | ------------------------------- |
| GET    | `/api/v1/notes`     | Get all notes (with pagination) |
| POST   | `/api/v1/notes`     | Create a new note               |
| PUT    | `/api/v1/notes/:id` | Update a specific note          |
| DELETE | `/api/v1/notes/:id` | Delete a specific note          |

> **All note endpoints require a JWT token** in the `Authorization` header:
>
> `Authorization: Bearer <your_token>`

---

##  Project Structure

Thanks for pointing that out. Your actual folder structure is well-organized under a `src/` directory, which is a best practice for codebase separation. Let’s update the **Project Structure** section of the `README.md` to **accurately reflect your layout**.

---

###  Here's the updated section for your README:

```markdown
##  Project Structure

notes-api/
├── src/
│   ├── controllers/     # Route logic (auth, notes)
│   ├── middleware/      # JWT auth, input validation, error handling
│   ├── models/          # Mongoose schemas for User and Note
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic separated from controllers
│   ├── validations/     # Manual input validation logic
│   ├── config/          # MongoDB connection setup (db.js)
│   └── app.js           # Express app initialization
├── swagger.js           # Swagger setup and config
├── server.js            # Entry point to run the server
├── .env                 # Environment variables
├── .gitignore
├── package.json
└── README.md

---

##  Testability

The code is structured to allow unit and integration testing using tools like **Jest**, **Supertest**, or **Mocha**. You can easily write tests for services, routes, and controllers due to modular separation of concerns.

---

##  Rate Limiting

Protects API from abuse by limiting users to a set number of requests per hour. Configurable via `.env`:

```env
RATE_LIMIT_WINDOW_MS=3600000
RATE_LIMIT_MAX=100
```

Implemented with `express-rate-limit`.

---

To add a **Dependencies** section to your `README.md` using best practices — especially for an **interview project** — you should list only the key packages that are essential to the project’s functionality and security. You want to show that you're using the right tools without overwhelming the reviewer.

Here’s a clean and professional **Dependencies** section you can add:

---

##  Dependencies

| Package                | Purpose                                              |
| ---------------------- | ---------------------------------------------------- |
| **express**            | Web framework for building RESTful APIs              |
| **mongoose**           | MongoDB object modeling and schema enforcement       |
| **jsonwebtoken**       | Signing and verifying JWT tokens                     |
| **bcryptjs**           | Password hashing and verification                    |
| **dotenv**             | Environment variable management                      |
| **express-rate-limit** | Rate limiting to protect against brute force attacks |
| **morgan**             | Logging HTTP requests (optional for dev)             |
| **cors**               | Enable Cross-Origin Resource Sharing                 |
| **swagger-ui-express** | Serve Swagger UI docs                                |


### Dev Dependencies

| Package     | Purpose                          |
| ----------- | -------------------------------- |
| **nodemon** | Auto-restart server on file save |

---