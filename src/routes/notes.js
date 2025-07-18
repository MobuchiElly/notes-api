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
 * /:
 *   get:
 *     summary: get notes endpoint
 *     responses:
 *       201:
 *         description: Get all user notes
 */
  .get(getNotes)

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create note
 *       201:
 *         description: create new note
 */
  .post(validateNoteInput, createNote);

router.route('/:id')

/**
 * @swagger
 * /:
 *   put:
 *     summary: Update note
 *     responses:
 *       201:
 *         description: Update note created by logged in user
 */
  .put(validateObjectId(), validateNoteInput, updateNote)

/**
 * @swagger
 * /:
 *   delete:
 *     summary: Delete note
 *     responses:
 *       201:
 *         description: Delete note
 */
  .delete(validateObjectId(), deleteNote);

module.exports = router;