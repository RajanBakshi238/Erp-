const mongoose = require("mongoose");

const assignedFeatureSchema = new mongoose.Schema({
    featureName: {
        type: String,
        required: [true, "Feature name is required"]
    },
    allowedTo: {
        type: [String],
        default: ['admin'],
    }
}, {
    timestamps:  true
});

const AssignedFeature = mongoose.model("AssignedFeature", assignedFeatureSchema);

module.exports = AssignedFeature;