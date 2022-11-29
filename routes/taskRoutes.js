const express = require("express");

const taskController = require("./../controllers/taskControllers");
const authController = require("./../controllers/authControllers");

const { Authorize } = require("./../middlewares");

const { verifyRoles } = Authorize;

const router = express.Router();

router
  .route("/")
  .post(taskController.createTask)
  .get(authController.protect, verifyRoles(222, 202), taskController.getTasks);

module.exports = router;
