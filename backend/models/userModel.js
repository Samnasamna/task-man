const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name is required"]
    },
    email:{
        type:String,
        required:[true, "email is required"],
        unique: true, 
        trim: true, 
        lowercase: true 
    },
    password:{
        type:String,
        required:[true, "all fields are mandatory"],
        select:false
    },
    picture:{
        type:String,
        default:"https://example.com/default-profile.png"
    }
    },
    { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)