const express = require('express');
const authController = require('./../controllers/authControllers');
const userController = require('./../controllers/userControllers');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/refresh', authController.refreshToken);
router.get('/getUsers', userController.getUsersOnRoles);


module.exports = router;