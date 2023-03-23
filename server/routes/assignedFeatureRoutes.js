const express = require('express');

const assignedFeatureController = require('./../controllers/assignedFeatureController');

const router = express.Router();

router.route("/").post(assignedFeatureController.addFeature);

module.exports = router;