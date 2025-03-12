const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        title: {
            type: String,
            required: [true, "Title field is mandatory"]
        },
        description: {
            type: String
        },
        status: {
            type: String,
            enum: ["pending", "inprogress", "completed"],
            default: "pending"
        },
        createdOn:{
            type:Date,
            default:Date().now
        }
    },
    
);

module.exports = mongoose.model("Task", taskSchema);
