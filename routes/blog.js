const express = require("express");
const router = express.Router();

//controllers
const {time} = require("../controllers/blog.js")

router.get('/',time);

module.exports=router;