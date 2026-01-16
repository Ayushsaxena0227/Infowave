const express = require("express");
const { getMyFeed } = require("../controller/myFeedController");
const router = express.Router();

router.get("/myfeed", getMyFeed);

module.exports = router;
