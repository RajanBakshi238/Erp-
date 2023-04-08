const express = require("express");

const { protect } = require("./../controllers/authControllers");
const { verifyRoles } = require("./../middlewares/Authorize");

const assignedFeatureController = require("./../controllers/assignedFeatureController");

const router = express.Router();

router.use(protect);

router
  .route("/")
  .post(assignedFeatureController.addFeature)
  .get(assignedFeatureController.getAllFeature);

router
  .route("/:id")
  .patch(assignedFeatureController.updateFeature)
  .delete(assignedFeatureController.deleteFeature);

module.exports = router;
