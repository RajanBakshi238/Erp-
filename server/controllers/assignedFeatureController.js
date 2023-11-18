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
                      $toString: "$featureKey",
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
        $replaceWith: "$docs",
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

exports.updateFeature = async (req, res) => {
  try {
    const assignedFeature = await AssignedFeature.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!assignedFeature) {
      throw new Error("No tour found with that ID");
    }

    res.status(200).json({
      status: 200,
      data: {
        assignedFeature,
      },
    });
  } catch (err) {
    console.log(err, ">>>>>>>>>>>>");
    res.status(400).json({
      status: 400,
      message: err?.message ?? err,
    });
  }
};

exports.deleteFeature = async (req, res) => {
  try {
    await AssignedFeature.findByIdAndDelete(req.params.id);


    // use 204 is best 
    res.status(200).json({
      status: 200,
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err?.message ?? err,
    });
  }
};

// For reference....
// https://stackoverflow.com/questions/74633508/how-to-convert-an-array-of-documents-to-a-single-specific-object-in-a-mongodb-ag
