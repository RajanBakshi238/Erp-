const express = require("express");

const taskController = require("./../controllers/taskControllers");

const router = express.Router();

router.route("/")
    .post(taskController.createTask)
    .get(taskController.getTasks)
    
module.exports = router;
