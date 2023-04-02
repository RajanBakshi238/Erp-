const express = require("express");

const attendanceController = require("./../controllers/attendanceController");

const router = express.Router();

router.route("/").get(attendanceController.getAllAttendance);

router.route("/present-day").post(attendanceController.getPresentDayDetail)

router
  .post("/enter", attendanceController.signIn)
  .post("/exit", attendanceController.signOut);

module.exports = router;


// make one route get detail of present day attendance