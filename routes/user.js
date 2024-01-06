const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/')
    .get(userController.getAllUser)

router.route('/register')
    .post(userController.addUser)

router.route('/login')
    .post(userController.login);

router.route('/logout')
    .post(userController.logout);



module.exports = router;
