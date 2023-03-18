class AppError extends Error {
    constructor(message, statusCode){
        super(message);

        this.statusCode = statusCode;
        // this.status = `${statusCode}`.startsWith('4') ? 400 : 409   ;
        this.status = `${statusCode}`.startsWith('4') ? this.statusCode : 409   ;
        this.operational = true

        Error.captureStackTrace(this, this.constructor); // google it ?

    }
}

module.exports = AppError;
