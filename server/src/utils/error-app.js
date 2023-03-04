const STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UN_AUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
}

class BaseError extends Error {
    constructor(name,statusCode,description, isOperational, errorStack, loggingErrorResponse){
        super(description);

        Object.setPrototypeOf(this,new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational
        this.errorStack = errorStack;
        this.logError = loggingErrorResponse;
        Error.captureStackTrace(this);
    }
}

//500
class InternalError extends BaseError {
    constructor(errorStack) {
        super('INTERNAL SERVER', STATUS_CODES.INTERNAL_ERROR, 'Internal Server', false, errorStack)
    }
}

//400
class BadRequestError extends BaseError {
    constructor(errorStack){
        super('NOT FOUND', STATUS_CODES.BAD_REQUEST,'Bad request',true, errorStack);
    }
}

//400
class ValidationError extends BaseError {
    constructor(errorStack){
        super('BAD REQUEST', STATUS_CODES.BAD_REQUEST,'Validation Error',true, errorStack);
    }
}

//404
class NotFoundError extends BaseError {
    constructor(errorStack){
        super('NOT FOUND', STATUS_CODES.NOT_FOUND, 'Data not found', true, errorStack)
    }
}

//500 Specific Errors
class Api404Error extends BaseError {
    constructor(errorStack){
        super('DATA NOT FOUND', STATUS_CODES.INTERNAL_ERROR, 'Internal Server Error', false, errorStack);
    }
}
module.exports = {
    BaseError,
    Api404Error,
    BadRequestError,
    ValidationError,
    STATUS_CODES,
    NotFoundError,
    InternalError
}