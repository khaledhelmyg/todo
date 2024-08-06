const express = require("express");

const { uploadControllers } = require("../controllers");
const { is_auth } = require("../middlewares");
const { uploadMiddleware } = require("../config");

const router = express.Router();

router
  .route("/image")
  .post(is_auth, uploadMiddleware, uploadControllers.uploadImage);

module.exports = router;
