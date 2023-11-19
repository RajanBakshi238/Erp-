const express = require("express");

const { protect } = require("./../controllers/authControllers");
const { verifyRoles } = require("./../middlewares/Authorize");
const { verifyPerissionRoles } = require("./../middlewares/Authorize");
const {CREATE, READ, UPDATE, DELETE} = require("./../utils/constants/permissionsConstants");

const assignedFeatureController = require("./../controllers/assignedFeatureController");

const router = express.Router();

router.use(protect);

// these verify roles argument should be dynamic --> getFeature details by feature name which we pass from here and use in verify roles model

router
  .route("/")
  .post(verifyRoles("assign_feature"), assignedFeatureController.addFeature)
  .get(assignedFeatureController.getAllFeature);

// router.use(verifyRoles("assign_feature"));
// router.use(verifyPerissionRoles("assign_feature", []));

router
  .route("/:id")
  .patch(verifyPerissionRoles("assign_feature", UPDATE),assignedFeatureController.updateFeature)
  .delete(verifyPerissionRoles("assign_feature", DELETE), assignedFeatureController.deleteFeature);

module.exports = router;
