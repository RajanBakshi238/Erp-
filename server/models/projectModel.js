const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project must have title."],
    },
    addedBy: {  // it is always for admin as we will make this route available for admin only
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Id of the person who is adding should be there."],
    },
    assignedTo: { // currently making for assigning to one project manager only
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "project manager whom it is assigned should be there"],
    },
    description: {
      type: String,
      required: [true, "Description should be there."],
    },
    priority: {
      // most probably we will convert to id.
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    price: {
      type: Number,
      required: [true, "Price should be there"],
    },
    // teamMember: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    teamMember: {
      type: [mongoose.Schema.ObjectId],
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const Project = mongoose.model("Project", projectSchema);

module.exports = Project;