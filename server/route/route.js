const express = require("express");
const reject = require('../controller/reject');
const router = express.Router();

router.get("/reject", reject.reject);

module.exports = router ;
