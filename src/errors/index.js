const CustomError = require('./custom-errors/index');
const BadRequestError = require('./custom-errors/bad-request-error');
const NotFoundError = require('./custom-errors/not-found-error');
const UnauthenticatedError = require('./custom-errors/unauthenticated');

module.exports = {
    CustomError,
    BadRequestError,
    NotFoundError,
    UnauthenticatedError
}