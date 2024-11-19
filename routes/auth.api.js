const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");

router.post("/login", authController.emailLogin);
router.get("/logout", authController.logout);
router.post("/social", authController.socialLogin);

module.exports = router;
