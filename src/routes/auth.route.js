const express = require("express");

const { authControllers } = require("../controllers");
const { is_auth, verifyRefreshToken } = require("../middlewares");

const router = express.Router();

router.get("/profile", is_auth, authControllers.userProfile);
router.post("/register", authControllers.register);
router.post("/login", authControllers.login);
router.post("/logout", authControllers.logout);
router.get("/refresh-token", verifyRefreshToken, authControllers.refreshToken);

module.exports = router;
