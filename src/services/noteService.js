const Note = require('../models/note');
const { NotFoundError } = require('../errors');

const getNotes = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const notes = await Note.find({ creator: userId })
    .sort('-created_at')
    .skip(skip)
    .limit(limit).select("-creator");
  const total = await Note.countDocuments({ creator: userId });

  return { notes, total, page };
};

const createNote = async (userId, title, content) => {
  return await Note.create({ creator: userId, title, content });
};

const updateNote = async (userId, noteId, title, content) => {
  const note = await Note.findOneAndUpdate(
    { _id: noteId, creator: userId },
    { title, content },
    { new: true, runValidators: true }
  );
  if (!note) throw new NotFoundError('Note not found');
  return note;
};

const deleteNote = async (userId, noteId) => {
  const note = await Note.findOneAndDelete({ _id: noteId, creator: userId });
  if (!note) throw new NotFoundError('Note not found');
  return note;
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};