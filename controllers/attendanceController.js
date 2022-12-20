const mongoose = require("mongoose");
const moment = require("moment");

const Attendance = require("./../models/attendanceModel");


exports.signIn = async (req, res) => {

    const timeStamp = moment().startOf('day');

    try{

        const markAttendance = await Attendance.create(req.body);

        console.log(markAttendance, 'all>>>>>>>>>>>>>>>>')

        res.status(200).json({
            status: "success",
            data: {
                result: "AMRIT MAAN",
                timeStamp,
                markAttendance,
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err,
        })
    }
}