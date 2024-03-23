const express = require('express')
const router = express.Router();

const leaveController = require('../controllers/leaveController');
const {isLogin, isAdmin} = require('../middlewares/authMiddleware')

router.route('/')
    .get(isLogin, leaveController.leaveInfo)
    .post(isLogin, leaveController.leaveRequest)

module.exports = router;