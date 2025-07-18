const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// #swagger.tags = ['Auth']
// #swagger.description = 'Register a new user'
// #swagger.parameters['body'] = {
//   in: 'body',
//   description: 'User registration payload',
//   required: true,
//   schema: {
//     $email: 'user@example.com',
//     $password: 'password123',
//     name: 'John Doe'
//   }
// }
// #swagger.responses[201] = {
//   description: 'User successfully registered'
// }

router.post('/register', authController.register);


/**
 * @swagger
 * /:
 *   get:
 *     summary: Login endpoint
 *     responses:
 *       200:
 *         description: Login
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /:
 *   get:
 *     summary: User endpoint
 *     responses:
 *       200:
 *         description: Get logged-in user details
 */
router.get('/me', authMiddleware, authController.getCurrentUser);

module.exports = router;