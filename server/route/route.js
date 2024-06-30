const express = require("express");
const userController = require('../controller/uerController');
const router = express.Router();

router.get("/getListUers", userController.getUsers);
router.get("/insertUser", userController.insertUser);

module.exports = router ;
