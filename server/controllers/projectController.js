const mongoose = require("mongoose");

const Project = require("../models/projectModel");
const User = require("../models/userModel")


const catchAsync = require("../utils/catchAsync");

exports.createProject = catchAsync (async (req, res) => {
    
    const assignedTo = await User.findOne({_id: req.body.addedBy})

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