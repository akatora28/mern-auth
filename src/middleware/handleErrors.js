/**
 * Error Handling Middleware
 * Thanks, Kevin: https://codeburst.io/better-error-handling-in-express-js-b118fc29e9c7
 */
const path = require('path');
const { GeneralError } = require(path.resolve('src','utils','errors'));

const handleErrors = (err, req, res, next) => {
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