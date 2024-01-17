const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const {isLogin, isAdmin} = require('../middlewares/authMiddleware')

router.route('/')
    .get(isLogin, employeeController.getEmployees)
    .post(isLogin, isAdmin, employeeController.addEmployee)

router.route('/:employeeID')
    .delete(isLogin, isAdmin, employeeController.deleteEmployee)
    .put(isLogin, isAdmin, employeeController.updateEmployee)

module.exports = router;