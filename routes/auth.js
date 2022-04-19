const express = require("express");
const router = express.Router();

//controllers
const { signup } = require("../controllers/auth.js");

//validators
const { runValidation } = require("../validators");
const { userSignupValidator } = require("../validators/auth");

router.post("/signup", userSignupValidator, runValidation, signup);

module.exports = router;
