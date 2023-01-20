const express = require("express");

const attendanceController = require("./../controllers/attendanceController");

const router = express.Router();

router.route("/").get(attendanceController.getAllAttendance);

router
  .post("/enter", attendanceController.signIn)
  .post("/exit", attendanceController.signOut);

module.exports = router;
