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
   * @route   GET /api/notes
   * @desc    Get all notes
   * @access  Private
   */
  .get(getNotes)

  /**
   * @route   POST /api/notes
   * @desc    Create a new note
   * @access  Private
   */
  .post(validateNoteInput, createNote);

router.route('/:id')
  /**
   * @route   PUT /api/notes/:id
   * @desc    Update a note by ID
   * @access  Private
   */
  .put(validateObjectId(), validateNoteInput, updateNote)

  /**
   * @route   DELETE /api/notes/:id
   * @desc    Delete a note by ID
   * @access  Private
   */
  .delete(validateObjectId(), deleteNote);

module.exports = router;