const {CustomError} = require('../errors'); 

const errorHandlerMiddleware = (err, req, res, next) => {
    //Handles Custom Errors
    if (err instanceof CustomError){
        return res.status(err.statusCode).json({error:err.message})
    }
    if (err.code === 11000){
      return res.status(400).json({error:'The email address already exists'})
    }
    if (err.name == 'CastError'){
      return res.status(400).json({error: 'Invalid data format (Cast Error)'});
    }
    //Handles mongoose conection error
    if(err.name == 'MongooseError') return res.status(503).json({error: "Database service unavailable. Restart your connection and try again"});

    //Handles validation errors
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((e) => {
          return `${e.path} - ${e.message}`;
        });
        return res.status(400).json({ errors: messages });
    }  
    return res.status(500).json({error: "Error occurred. " + err});
};

module.exports = errorHandlerMiddleware;