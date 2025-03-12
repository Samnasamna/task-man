const express = require("express");
const tokenValidation = require("../middleware/validation");
const { getAllTasks, createTask, updateTask, deleteTask } = require("../controllers/taskController");
const router = express.Router();

router.use(tokenValidation)

router.route('/tasks').get(getAllTasks).post(createTask)

router.route('/tasks/:id').put(updateTask).delete(deleteTask)


module.exports = router