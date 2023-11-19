const express = require('express');

const projectController = require('./../controllers/projectController')
const { protect } = require("./../controllers/authControllers");
const { verifyPerissionRoles } = require("./../middlewares/Authorize");
const {CREATE, READ, UPDATE, DELETE} = require("./../utils/constants/permissionsConstants");



const router = express.Router();

router.use(protect);
router.post('/',verifyPerissionRoles("add_project", CREATE), projectController.createProject)


module.exports = router;