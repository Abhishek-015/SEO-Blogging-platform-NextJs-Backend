const express = require("express");
const router = express.Router();

//controllers
const { requireSignin, authMiddleWare} = require("../controllers/auth.js");

const { read } = require("../controllers/user.js");

router.get("/profile", requireSignin, authMiddleWare, read);

module.exports = router;
