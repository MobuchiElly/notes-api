const CustomError = require("../custom-errors");

class UnauthenticatedError extends CustomError {
    constructor(message){
        super(message);
        this.statusCode = 401;
    }
}

module.exports = UnauthenticatedError;