const noteService = require("../services/noteService");


/**
 * @desc    Get all notes for the authenticated user 
 * @route   GET /notes
 * @access  Private
 */
const getNotes = async (req, res) => {
  const userId = req.user.userId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const { notes, total } = await noteService.getNotes(userId, page, limit);
  res.status(200).json({
    success: true,
    message: "Note fetched successfully",data:{
      total, page, notes
    }
  });
};


/**
 * @desc    Create a new note
 * @route   POST /notes
 * @access  Private
 */
const createNote = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.userId;

  const note = await noteService.createNote(userId, title, content);
  res.status(201).json({ 
    success: true, 
    message: "Note created successfully", 
    data: note 
  });
};


/**
 * @desc    Update a note 
 * @route   PUT /notes/:id
 * @access  Private 
*/
const updateNote = async (req, res) => {
  const { id: noteId } = req.params;
  const { title, content } = req.body;
  const userId = req.user.userId;

  const updatedNote = await noteService.updateNote(userId, noteId, title, content);
  res.status(200).json({ 
    success: true, 
    message: "Note updated successfully", data: updatedNote 
  });
};


/**
 * @desc    Delete a note
 * @route   DELETE /notes/:id
 * @access  Private 
 */
const deleteNote = async (req, res) => {
  const { id: noteId } = req.params;
  const userId = req.user.userId;

  await noteService.deleteNote(userId, noteId);
  res.status(200).json({ 
    success: true, 
    message: "Note deleted successfully" });
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};