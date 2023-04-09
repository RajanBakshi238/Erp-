const express = require("express");

const attendanceController = require("./../controllers/attendanceController");

const router = express.Router();

router.route("/:id").get(attendanceController.getAllAttendance);

router.route("/present-day/:userId").get(attendanceController.getPresentDayDetail)

router
  .post("/enter", attendanceController.signIn)
  .post("/exit", attendanceController.signOut);

module.exports = router;


// make one route get detail of present day attendance