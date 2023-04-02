const mongoose = require("mongoose");
const moment = require("moment");

const attendanceSchema = new mongoose.Schema({
  uniqueStamp: {
    type: String,
    default: moment().startOf("day"),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Attendance must belong to user"],
  },
  status: {
    type: String,
    enum: ["absent", "present"],
    default: "absent",
  },
  inTime: Date,
  outTime: Date,
});

attendanceSchema.index({ uniqueStamp: 1, user: 1 }, { unique: true });

attendanceSchema.pre("save", function (next) {
  console.log(this, '>>>>>>>>>>>>>>>>>>>>>>>this of presave middleware........')
  if (!this.isNew) {
    const { inTime, outTime } = this;
    const duration = outTime - inTime;
    if (duration < 32400000) {      // 9 hours
      this.status = "absent";
    } else {
      this.status = "present";
    }
  }
  next();
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
