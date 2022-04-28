const express = require("express");
const router = express.Router();

//controllers
const {
  signup,
  signin,
  signout,
  requireSignin,
} = require("../controllers/auth.js");

//validators
const { runValidation } = require("../validators");
const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/auth");

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/signout", signout);
//test
router.get("/secret", requireSignin, (req, res) => {
  try {
    res.json({
      message: req.user,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

module.exports = router;
