const mongoose = require("mongoose");

const AssignedFeature = require("./../models/assignedFeaturesModel");

exports.addFeature = async (req, res) => {
  try {
    const feature = await AssignedFeature.create(req.body);

    res.status(200).json({
      status: "success",
      data: {
        feature,
      },
    });
  } catch (err) {
    console.log(err, ">>>>>>>>>>>>");
    res.status(400).json({
      status: "fail",
      message: err?.message ?? err,
    });
  }
};
