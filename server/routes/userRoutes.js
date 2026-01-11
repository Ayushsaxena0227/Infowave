const express = require("express");
const router = express.Router();
const { handleLike } = require("../controller/userController");

router.post("/like", handleLike);
module.exports = router;
