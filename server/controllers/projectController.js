const mongoose = require("mongoose");

const Project = require("../models/projectModel");
const User = require("../models/userModel")


const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createProject = catchAsync (async (req, res, next) => {
    

    console.log(req.body, "poject console.")


    const assignedTo = await User.findOne({_id: req.body.addedBy})
    if(!assignedTo || assignedTo?.role != "pm"){
        return next(new AppError("Invalid role", 400));
    }
    // check left for user if needed we will proceed
    

    console.log(assignedTo, "assignedTo>>>>>")

    
    const newProject = await Project.create(req.body);
    
    res.status(200).json({
        status: 200,
        message: "Project Created Successfully.",
        data:{
            project: newProject
        }
    })


});