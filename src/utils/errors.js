/**
 * Error Handling
 * Thanks, Kevin: https://codeburst.io/better-error-handling-in-express-js-b118fc29e9c7
 */

class GeneralError extends Error {
    constructor(message) {
        super();
        this.message = message;
    }

    getStatusCode() {
        if (this instanceof BadRequest) {
            return 400;
        } else {
            return 500;
        }
    }
}

class BadRequest extends GeneralError { }

module.exports = {
    GeneralError,
    BadRequest
}