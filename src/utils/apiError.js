// The ApiError class allows for structured error handling in your API.

class ApiError extends Error{
    constructor(
        statusCode, //The HTTP status code that should be sent when this error occurs

        message = "Something went wrong!!!", //A human-readable error message, which defaults to "Something went wrong!!!" if not provided.

        errors=[], //An array to hold additional error information, useful when there are multiple validation errors or more detailed error data.

        stack = ""//The stack trace, which shows where the error occurred in the code.
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors
        if (stack) {
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}