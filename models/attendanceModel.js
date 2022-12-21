const mongoose = require("mongoose");
const moment = require("moment");

const attendanceSchema = new mongoose.Schema({
    uniqueStamp: {
        type: String,
        default: moment().startOf('day')
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Attendance must belong to user']
    },
    inTime: Date,
    outTime: Date
});

attendanceSchema.index({uniqueStamp: 1, user: 1}, {unique: true})

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
