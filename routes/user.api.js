const express = require("express");
const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");
const router = express.Router();

router.post("/", userController.createUser);
router.get("/", authController.authenticate, userController.getUser);
router.delete("/:id", authController.authenticate, userController.deleteUser);

module.exports = router;
