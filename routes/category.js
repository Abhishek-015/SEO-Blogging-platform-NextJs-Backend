const express = require("express");
const router = express.Router();
const { create, list, read, remove } = require("../controllers/category");

//validators
const { runValidation } = require("../validators");
const { categoryCreateValidator } = require("../validators/category");

//middlewares
const { requireSignin, adminMiddleWare } = require("../controllers/auth");

router.post(
  "/category",
  categoryCreateValidator,
  runValidation,
  requireSignin,
  adminMiddleWare,
  create
);

router.get("/categories", list);

// we are not using id for single category search because id is not SEO
router.get("/category/:slug", read);

router.delete("/category/:slug", requireSignin, adminMiddleWare, remove);

module.exports = router;
