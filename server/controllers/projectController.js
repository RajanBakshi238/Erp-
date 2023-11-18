const mongoose = require("mongoose");

const Project = require("../models/projectModel");
const User = require("../models/userModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createProject = catchAsync(async (req, res, next) => {
  console.log(req.body, "poject console.");

  const projectManagers = await User.find({
    _id: { $in: req.body.projectManagers },
  });

  if (
    !projectManagers.every((manager) => manager.role === "admin") ||
    projectManagers.length != req.body.projectManagers.length
  ) {
    return next(new AppError("Invalid project manager", 400));
  }

  const teamMembers = await User.find({
    _id: { $in: req.body.teamMembers },
  });

  // @fixme  here instead of user we have to make developer role or designer
  if (
    !teamMembers.every((manager) => manager.role === "user") ||
    teamMembers.length != req.body.teamMembers.length
  ) {
    return next(new AppError("Invalid team member", 400));
  }

  // console.log(assignedTo)

  // const assignedTo = await User.findOne({_id: req.body.createdBy})
  // if(!assignedTo || assignedTo?.role != "pm"){
  //     return next(new AppError("Invalid role", 400));
  // }
  // // check left for user if needed we will proceed

  // console.log(assignedTo, "assignedTo>>>>>")

  // const newProject = await Project.create(req.body);

  res.status(200).json({
    status: 200,
    message: "Project Created Successfully.",
    data: {
      // project: newProject
      projectManagers,
      teamMembers
    },
  });
});
