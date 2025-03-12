const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const tokenValidation = asyncHandler(async(req, res, next)=>{
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({ success: false, code: "TOKEN_EXPIRED", message: "Token expired. Please refresh or log in again." });
                }
                return res.status(401).json({ success: false, code: "INVALID_TOKEN", message: "Invalid token." });
            }
            
            req.user = decoded.user;
            next();
        });

        return; // Ensure no further execution happens if token exists
    }
    if(!token){
        res.status(401).json({message:"Unauthorized access! send your Token"})
    }
})

module.exports = tokenValidation