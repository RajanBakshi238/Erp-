const express = require("express");

const taskController = require("./../controllers/taskControllers");
const authController = require("./../controllers/authControllers")

const router = express.Router();

router.route("/")

.post(taskController.createTask)
    .get(authController.protect, taskController.getTasks)
    
module.exports = router;
