const mongoose = require("mongoose");
const moment = require("moment");

const Attendance = require("./../models/attendanceModel");


exports.signIn = async (req, res) => {

    // const timeStamp = moment().startOf('day');
    // const timeStamp = moment().startOf('day').unix();
    // const timeStamp = moment().startOf('day').valueOf();

    // console.log(timeStamp, 'TIMESTAMP< ???????')


    try{

        const markAttendance = await Attendance.create({
            user: req.body.user,
            inTime: Date.now()
        });

        console.log(markAttendance, 'all>>>>>>>>>>>>>>>>')

        res.status(200).json({
            status: "success",
            timeStamp,
            data: {
                result: markAttendance,
            },
            message: "Attendance marked successfully"
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err,
        })
    }
}

exports.signOut = async (req, res) => {
    try{
        const attendanceRecord = await Attendance.findOne({user: req.body.user, uniqueStamp: moment().startOf('day').valueOf()})


        if(!attendanceRecord){
            throw new Error("Please sign in first.")
        }


        res.status(200).json({
            status:"success",
            data: {
                attendanceRecord
            }
        })
    } catch (err) {
        console.log(err, '>>>>>>>>>>>>')
        res.status(400).json({
            status: "fail",
            message: err?.message ?? err,
        })
    }
 }
