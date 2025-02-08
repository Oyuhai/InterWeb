const express = require("express");
const router = express.Router();
const { signupUser } = require("../controller/authController");

router.post("/signup", signupUser);

module.exports = router;
