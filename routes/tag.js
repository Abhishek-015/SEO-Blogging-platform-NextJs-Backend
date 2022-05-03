const express = require("express");
const router = express.Router();

//middlewares
const { requireSignin, adminMiddleWare } = require("../controllers/auth");

//validators
const { runValidation } = require("../validators");
const { tagCreateValidator } = require("../validators/tag");
4;

//controllers
const { create, list, read, remove } = require("../controllers/tag");


//routes
router.post(
  "/tag",
  tagCreateValidator,
  runValidation,
  requireSignin,
  adminMiddleWare,
  create
);
router.get("/tags", list);
router.get("/tag/:slug", read);
router.delete("/tag/:slug", requireSignin, adminMiddleWare, remove);

module.exports = router;
