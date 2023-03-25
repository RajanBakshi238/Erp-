const express = require('express');

const assignedFeatureController = require('./../controllers/assignedFeatureController');

const router = express.Router();

router.route("/").post(assignedFeatureController.addFeature).get(assignedFeatureController.getAllFeature);

module.exports = router;