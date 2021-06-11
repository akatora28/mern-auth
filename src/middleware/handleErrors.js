/**
 * Error Handling Middleware
 * Thanks, Kevin: https://codeburst.io/better-error-handling-in-express-js-b118fc29e9c7
 */
const path = require('path');
const { GeneralError, BadRequest, DuplicateUser } = require(path.resolve('src','utils','errors'));

const handleErrors = (err, req, res, next) => {
    if (err instanceof DuplicateUser) {
      return res.status(err.getStatusCode()).json({
        status: 'error',
        message: 'A user with that email already exists'
      })
    }

    // This will return true for all errors since they inherit from GeneralError
    // so put it last in the checks
    if (err instanceof GeneralError) {
      return res.status(err.getStatusCode()).json({
        status: 'error',
        message: err.message
      });
    }
  
    return res.status(500).json({
      status: 'error',
      message: err.message
    });
}

module.exports = handleErrors;