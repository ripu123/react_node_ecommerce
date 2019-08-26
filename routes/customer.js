const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/customer");
const { userSignupValidator } = require("../validator");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { userExist } = require("../validator");

router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;