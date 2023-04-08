const express = require("express");

const { protect } = require("./../controllers/authControllers");
const { verifyRoles } = require("./../middlewares/Authorize");

const assignedFeatureController = require("./../controllers/assignedFeatureController");

const router = express.Router();

router.use(protect);

// these verify roles argument should be dynamic


router
  .route("/")
  .post(verifyRoles("admin"), assignedFeatureController.addFeature)
  .get(assignedFeatureController.getAllFeature);

router.use(verifyRoles("admin"));

router
  .route("/:id")
  .patch(assignedFeatureController.updateFeature)
  .delete(assignedFeatureController.deleteFeature);

module.exports = router;
