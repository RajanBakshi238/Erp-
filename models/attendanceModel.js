const mongoose = require("mongoose");
const moment = require("moment");

const attendanceSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: moment().startOf('day')
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Attendance must belong to user']
    }
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
