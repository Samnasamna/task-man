const errorHandler = (err, req, res, next)=>{
    console.log("inside error handling")
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        success:false,
        code:statusCode,
        message: err.message || "Internal Server error"
    })

}

module.exports = errorHandler

