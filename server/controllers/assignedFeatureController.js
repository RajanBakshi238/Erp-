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

exports.getAllFeature = async (req, res) => {
  try {
    // const features = await AssignedFeature.find({});
    const feature = await AssignedFeature.aggregate([
      {
        $group: {
          _id: null,
          docs: {
            $mergeObjects: {
              $arrayToObject: [
                [
                  {
                    k: {
                      // "$toString": "$_id"
                      $toString: "$featureName",
                    },
                    v: "$$ROOT",
                  },
                ],
              ],
            },
          },
        },
      },
      {
        "$replaceWith": "$docs"
      },
      
    ]);

    res.status(200).json({
      status: 200,
      data: {
        feature: feature[0],
        // features,
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
