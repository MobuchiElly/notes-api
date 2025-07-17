const mongoose = require('mongoose');
const { BadRequestError } = require('../errors');

const validateObjectId = (param = 'id') => (req, res, next) => {
  const id = req.params[param];
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError(`Invalid ${param}`);
  }
  next();
};

module.exports = validateObjectId;