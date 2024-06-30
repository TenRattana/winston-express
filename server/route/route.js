const express = require("express");
const userController = require('../controller/uerController');
const router = express.Router();

router.get("/getListUers", userController.getUsers);
router.post("/insertUser", userController.insertUser);

module.exports = router ;
