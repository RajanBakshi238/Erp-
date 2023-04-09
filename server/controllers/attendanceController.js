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
      uniqueStamp: moment().startOf("day").valueOf(),
    });

    // console.log(markAttendance, 'all>>>>>>>>>>>>>>>>')

    res.status(200).json({
      status: 200,

      data: markAttendance,
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
      status: 200,
      data: attendanceRecord,
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
  console.log(
    req.query,
    "get all attendance "
    // moment(new Date("2023-04-05")).utc().endOf("day").toISOString(),
    // ">>>>>>>>>>",
    // typeof moment("2023-04-05").utc().endOf("day").toDate()
  );

  // we will make  query according to the month
  // query parameters are month and year pagination

  const month = req.query.month || new Date().getMonth();
  const year = req.query.year || new Date().getFullYear();

  // if   given month is current month then last day is today date.

  var date = moment(new Date(year, month, 2)).utc().startOf("day").toDate();
  let days, lastDate;

  if (month == new Date().getMonth()) {
    days = new Date().getDate();
    lastDate = moment(new Date()).utc().endOf("day").toDate();
  } else {
    days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); // getting last day of month
    // console.log(new Date(date.getFullYear(), date.getMonth() + 1, 0), "...........")
    lastDate = moment(new Date(date.getFullYear(), date.getMonth() + 1, 1))
      .utc()
      .endOf("day")
      .toDate();
  }

  let store = {},
    i = 1;

  console.log(date, ">>>>>>>>>>>>>days", lastDate);

  while (i <= days) {
    store[i] = {};

    i++;
  }

  // console.log(store , '>>>>>>storeeee')

  try {
    const attendance = await User.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.params.id),
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
                // inTime: {
                createdAt: {
                  // $gte: new Date("2023-04-01"),
                  $gte: date,
                  $lte: lastDate,
                },
              },
            },

            // {
            //   $skip: 1,
            // },
            // {
            //   $limit: 2,
            // },
          ],
          as: "allAttendance",
        },
      },
    ]);
    // console.log(attendance[0].allAttendance, "array")

    if (!attendance[0].allAttendance.length) {
      return res.status(200).json({
        status: 200,
        data: {
          attendance: {},
          // attendance,
        },
      });
    }
    attendance[0].allAttendance.forEach((attend) => {
      // attend.date =
      store[attend.inTime.getDate()] = attend;
      // console.log(attend.inTime.getDate(), 'result result result', attend)
    });

    let data = [];
    for (let record in store) {
      data.push({
        ...store[record],
        date: (`${year}-${month*1 + 1}-${record}`),
      
      });
    }

    console.log(store, ">>>>>store stroree");

    res.status(200).json({
      status: 200,
      data: {
        attendance: data,
        // attendance,
      },
    });
  } catch (err) {
    console.log(err, ">>>>>>>>>>");
    res.status(400).json({
      status: "fail",
      message: err?.message ?? err,
    });
  }
};

exports.getPresentDayDetail = async (req, res) => {
  try {
    const presentDay = await Attendance.find({
      user: req.params.userId,
      uniqueStamp: moment().startOf("day").valueOf(),
    });

    console.log(req.body.user, moment().startOf("day"), presentDay);

    res.status(200).json({
      status: 200,
      data: {
        presentDay,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
