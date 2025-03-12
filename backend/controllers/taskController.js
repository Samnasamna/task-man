const asyncHandler = require("express-async-handler")
const Tasks = require("../models/taskModel.js"); 
const taskModel = require("../models/taskModel.js");

//@desc get all tasks
//@route GET /api/v1/user/tasks
//@access private

const getAllTasks = asyncHandler(async (req, res) => {
    const { status } = req.query;

    const filter = { userId: req.user.id };
    if (status) {
        filter.status = status;
    }

    const tasks = await Tasks.find(filter).sort({ createdAt: -1 });

    res.status(200).json(tasks);
});


//@desc  create Task
//@route POSt /api/v1/user/tasks
//@access private

const createTask = asyncHandler(async (req, res)=>{
    const {title, priority} = req.body;
    if(!title){
        res.status(400)
        throw new Error("Title & priority mandatory")
    }
    console.log(req.user)

    const newTask = await Tasks.create({
        ...req.body,
        userId:req.user.id
    })
    res.status(200).json(newTask)
})

//@desc update task
//@route PUT /api/v1/user/tasks/:id
//@access private

const updateTask = asyncHandler(async (req, res)=>{
    const task = await Tasks.findById(req.params.id)
    if(!task){
        res.status(400)
        throw new Error("Not found!")
    }
    if(req.user.id !== task.userId.toString()){
        res.status(403)
        throw new Error("Unauthorized Accss!")
    }
    const updatedTask = await Tasks.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updatedTask)
})

//@desc delete task
//@route DELETE /api/v1/user/tasks/:id
//@access private

const deleteTask = asyncHandler(async (req, res)=>{
    const task = await Tasks.findById(req.params.id)
    if(!task){
        res.status(400)
        throw new Error("Not found!")
    }

    if(req.user.id !== task.userId.toString()){
        res.status(403)
        throw new Error("Unauthorized Accss!")
    }
    await Tasks.deleteOne({_id:req.params.id})
    res.status(200).json({success:true, message:"deleted successfully.."})
})

module.exports = {getAllTasks, createTask, updateTask, deleteTask}