const express = require("express")
const connectDb = require("./config/dbConnection.js");
const errorHandler = require("./middleware/errorHandling.js");
const dotenv = require("dotenv").config()
const cors = require("cors")


connectDb();  // data base connection
const app = express()
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json()) // middleware for parsing json data

app.use('/api/v1/auth', require("./routers/userRouter.js"))
app.use('/api/v1/user', require("./routers/taskRouter.js"))

app.use(errorHandler)

app.listen(process.env.PORT, ()=>{
    console.log("App has started......")
})