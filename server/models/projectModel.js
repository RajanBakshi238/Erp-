const mongoose = require("mongoose");

const {
  LOW,
  MEDIUM,
  HIGH,
  NEW,
  OPEN,
  IN_PROGRESS,
  COMPLETED,
  HOLD,
  HOURLY,
  FIXED,
} = require("../utils/constants/projectConstant");

const paymentReceivedSchema = new mongoose.Schema(
  {
    description: String,
    amount: {
      type: Number,
      require: [true, "Amount is required"],
    },
  },
  {
    timestamps: true,
  }
);

const projectPhaseSchema = new mongoose.Schema({
  period: mongoose.Schema({
    startDate: {
      type: Date,
      require: [true, "Start Date is required"],
    },
    endDate: {
      type: Date,
      require: [true, "End date is required"],
    },
  }),
  description: String,
  completedOn: {
    type: Date,
  },
});

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project must have title."],
    },
    startDate: {
      type: Date,
      require: [true, "Start Date is required"],
    },
    endDate: {
      type: Date,
      // require: [true, "Start Date is required"],
    },
    createdBy: {
      // it is always for admin as we will make this route available for admin only
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Id of the person who is adding should be there."],
    },
    projectManagers: {
      // currently making for assigning to one project manager only
      type: [mongoose.Schema.ObjectId],
      ref: "User",
      required: [true, "project manager whom it is assigned should be there"],
      minlength: 1,
    },
    description: {
      type: String,
      required: [true, "Description should be there."],
    },
    priority: {
      // most probably we will convert to id.
      type: String,
      enum: [LOW, MEDIUM, HIGH],
      default: "low",
    },
    price: {
      type: Number,
      required: [true, "Price should be there."],
    },
    priceType: {
      type: String,
      required: [true, "Project price type is required."],
      enum: [HOURLY, FIXED],
    },
    // teamMember: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    teamMembers: {
      type: [mongoose.Schema.ObjectId],
      ref: "User",
      required: true,
    },
    projectStatus: {
      type: String,
      enum: [NEW, IN_PROGRESS, OPEN, COMPLETED, HOLD],
      default: NEW,
    },
    payments: {
      type: [paymentReceivedSchema],
    },
    projectPhases: {
      type: [projectPhaseSchema],
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
