const express = require("express");
const router = express.Router();
const { signupUser } = require("../controller/authController");
const { signinUser } = require("../controller/authController");
const { getProfile } = require('../controller/authController');

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.get('/profile', getProfile);


module.exports = router;
