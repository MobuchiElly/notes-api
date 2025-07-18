const { BadRequestError } = require('../errors');

const validateNoteInput = (req, res, next) => {
  const { title, content } = req.body;
  const errors = [];

  if (title === undefined || title === null || title === '') {
    errors.push({ field: 'title', message: 'Title is required' });
  } else if (typeof title !== 'string') {
    errors.push({ field: 'title', message: 'Title must be a string' });
  } else if (title.trim().length > 100) {
    errors.push({ field: 'title', message: 'Title must be under 100 characters' });
  }

  if (content === undefined || content === null || content === '') {
    errors.push({ field: 'content', message: 'Content is required' });
  } else if (typeof content !== 'string') {
    errors.push({ field: 'content', message: 'Content must be a string' });
  }

  //My error arr contains all errors.
  if (errors.length > 0) {
    const message = errors.map(err => err.message).join('. ') + '.';
    throw new BadRequestError(message);
  }

  next();
};

module.exports = validateNoteInput;