Notes REST API

A secure and RESTful Notes API built with Node Js, Express Js, and MongoDB, designed for user-based note management. Features full JWT authentication, CRUD operations, rate limiting, and Swagger documentation.


Features

User Authentication with JWT (Register & Login)
CRUD operations for notes (title, content)
User-specific notes — each user sees only their own
Rate Limiting – 100 requests/hour per user
Swagger API Documentation
Follows RESTful conventions
Clean, modular structure for maintainability and scalability
Test-ready design (integration test–friendly)


Tech Stack

Node.js + Express
MongoDB + Mongoose
JWT for authentication
bcrypt for password hashing
express-rate-limit, Helmet, CORS for security
swagger for API docs


Folder Structure

src/
  controllers/
  middleware/
  models/
  routes/
  services/
  validations/
tests/
swagger.js
server.js


Getting Started

git clone https://github.com/MobuchiElly/notes-api.git
cd notes-api
npm install
npm run dev


Check Swagger Docs at: ``