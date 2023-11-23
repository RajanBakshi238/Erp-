const AppError = require('../utils/appError')
const sendErrorDev = (err, res) => {
   
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const handleValidationErrorDB = err => {
console.log('1111111111111111111')
    const errors = Object.values(err.errors).map(el => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400)
}

module.exports = (err, req, res, next) => {
    // console.log(err.stack, "Of Global Error Handler")

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 409

    if(process.env.NODE_ENV === 'development'){
        
        let error = {...err}
        if(err.name === "ValidationError") error = handleValidationErrorDB(error)


        sendErrorDev(error, res)
    } else if(process.env.NODE_ENV === 'production'){ 
        let error = {...err};

        sendErrorDev(error, res)
    }



}