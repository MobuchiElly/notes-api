const Note = require('../models/note');
const { BadRequestError, NotFoundError } = require('../errors');


/**
 * @desc    Get all notes for the authenticated user 
 * @route   GET /notes
 * @access  Private
 */
const getNotes = async (req, res) => {
  const loggedInUser = req.user.userId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  const notes = await Note.find({ 
    creator: loggedInUser
  }).sort('-created_at').skip(skip).limit(limit);;
  const total = await Note.countDocuments({ creator: loggedInUser });

  res.status(200).json({ total, page,notes });
};


/**
 * @desc    Create a new note
 * @route   POST /notes
 * @access  Private
 */
const createNote = async (req, res) => {
  const { title, content } = req.body;
  const loggedInUser = req.user.userId;

  const note = await Note.create({
    creator: loggedInUser,
    title,
    content,
  });

  res.status(201).json({ success: true,"message":"Note created successfully", data:note });
};


/**
 * @desc    Update a note 
 * @route   PUT /notes/:id
 * @access  Private 
*/
const updateNote = async (req, res) => {
  const { id: noteId } = req.params;
  const { title, content } = req.body;
  const loggedInUser = req.user.userId;

  const note = await Note.findOneAndUpdate(
    { _id: noteId, creator: loggedInUser },
    { title, content },
    { new: true, runValidators: true }
  );

  if (!note) {
    throw new NotFoundError('Note not found');
  }

  res.status(200).json({ success: true, message:"Note updated successfully", data:note });
};


/**
 * @desc    Delete a note
 * @route   DELETE /notes/:id
 * @access  Private 
 */
const deleteNote = async (req, res) => {
  const { id: noteId } = req.params;
  const loggedInUser = req.user.userId;

  const note = await Note.findOneAndDelete({
    _id: noteId,
    creator: loggedInUser
  });

  if (!note) {
    throw new NotFoundError("Note not found");
  }

  res.status(200).json({ success: true, message: "Note deleted successfully" });
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};