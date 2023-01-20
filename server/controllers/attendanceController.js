const mongoose = require("mongoose");
const moment = require("moment");

const Attendance = require("./../models/attendanceModel");
const User = require("./../models/userModel");

exports.signIn = async (req, res) => {
  // const timeStamp = moment().startOf('day');
  // const timeStamp = moment().startOf('day').unix();
  // const timeStamp = moment().startOf('day').valueOf();

  // console.log(timeStamp, 'TIMESTAMP< ???????')

  try {
    const markAttendance = await Attendance.create({
      user: req.body.user,
      inTime: Date.now(),
    });

    // console.log(markAttendance, 'all>>>>>>>>>>>>>>>>')

    res.status(200).json({
      status: "success",

      data: {
        result: markAttendance,
      },
      message: "Attendance marked successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.signOut = async (req, res) => {
  try {
    const attendanceRecord = await Attendance.findOne({
      user: req.body.user,
      uniqueStamp: moment().startOf("day").valueOf(),
    });

    if (!attendanceRecord) {
      throw new Error("Please sign in first.");
    }

    if (attendanceRecord?.outTime) {
      throw new Error("Already Signed out !");
    }

    attendanceRecord.outTime = Date.now();
    await attendanceRecord.save();

    res.status(200).json({
      status: "success",
      data: {
        attendanceRecord,
      },
      message: "Signed out successfully",
    });
  } catch (err) {
    console.log(err, ">>>>>>>>>>>>");
    res.status(400).json({
      status: "fail",
      message: err?.message ?? err,
    });
  }
};

exports.getAllAttendance = async (req, res) => {
  var today = new Date();
  let days = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(), // getting last day of month
    store = {},
    i = 1;

  // console.log(days, '>>>>>>>>>>>>>days')

  while (i <= days) {
    store[i] = {};

    i++;
  }

  // console.log(store , '>>>>>>storeeee')

  try {
    const attendance = await User.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId("6384f8546ed92895ad31989f"),
        },
      },
      {
        $lookup: {
          from: "attendances",
          localField: "_id",
          foreignField: "user",
          pipeline: [
            {
              $match: {
                inTime: {
                  $gte: new Date("2022-12-24"),
                },
              },
            },
          ],
          as: "allAttendance",
        },
      },
    ]);

    attendance[0].allAttendance.forEach((attend) => {
      store[attend.inTime.getDate()] = attend;
      // console.log(attend.inTime.getDate(), 'result result result', attend)
    });

    console.log(store, ">>>>>store stroree");

    res.status(200).json({
      status: "success",
      data: {
        attendance: store,
      },
    });
  } catch (e) {
    console.log(e, ">>>>>>>>>>");
    res.status(400).json({
      status: "fail",
      message: err?.message ?? err,
    });
  }
};
