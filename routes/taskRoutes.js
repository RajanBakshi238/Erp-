const express = require("express");

const taskController = require("./../controllers/taskControllers");
const authController = require("./../controllers/authControllers");

const { Authorize } = require("./../middlewares");

const { verifyRoles } = Authorize;

const router = express.Router();

router
  .route("/")
  .post(taskController.createTask)
  .get(taskController.getTasks);
  // .get(authController.protect, verifyRoles(222, 202), taskController.getTasks);

  router.route("/start").post(taskController.handleTask);

  router.route("/pause").post(taskController.togglePausedTask)


module.exports = router;
