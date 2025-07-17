const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /:
 *   get:
 *     summary: Register endpoint
 *     responses:
 *       201:
 *         description: Register new user
 */
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