const mongoose = require("mongoose");

const assignedFeatureSchema = new mongoose.Schema({
    featureName: {
        type: String,
        required: [true, "Feature check name is required."]
    },
    name: {
        type: String,
        required: [true, "Feature name is required."]
    },
    allowedTo: {
        type: [String],
        default: ['admin'],
        enum: ['user', 'admin', 'hr', 'pm'],
        required: [true, "Atleast one role required."]
    },
}, {
    timestamps:  true
});

const AssignedFeature = mongoose.model("AssignedFeature", assignedFeatureSchema);

module.exports = AssignedFeature;