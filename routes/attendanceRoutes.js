const express = require("express");

const attendanceController = require("./../controllers/attendanceController")

const router = express.Router();

router.route("/entry").post(attendanceController.signIn);

module.exports = router;