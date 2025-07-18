const express = require('express');
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote
} = require('../controllers/noteController');
const validateNoteInput = require("../validations/note-validation");
const validateObjectId = require("../middleware/validateObjectId");

const router = express.Router();

router.route('/')
/**
 * @swagger
 * /api/v1/notes/:
 *   get:
 *     summary: Get all user notes
 *     responses:
 *       200:
 *         description: Get all user notes
 */
  .get(getNotes)

/**
 * @swagger
 * /api/v1/notes/:
 *   post:
 *     summary: Create note
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Create new note
 */
  .post(validateNoteInput, createNote);

router.route('/:id')

/**
 * @swagger
 * /api/v1/notes/{id}:
 *   put:
 *     summary: Update note
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update note created by logged in user
 */
  .put(validateObjectId(), validateNoteInput, updateNote)

/**
 * @swagger
 * /api/v1/notes/{id}:
 *   delete:
 *     summary: Delete note
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Delete note
 */
  .delete(validateObjectId(), deleteNote);

module.exports = router;