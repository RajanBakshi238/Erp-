const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}


module.exports = (err, req, res, next) => {
    console.log(err.stack, "Of Global Error Handler")

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 409

    if(process.env.NODE_ENV === 'development'){
        sendErrorDev(err, res)
    } else if(process.env.NODE_ENV === 'production'){ 
        let error = {...err};

        sendErrorDev(err, res)
    }



}