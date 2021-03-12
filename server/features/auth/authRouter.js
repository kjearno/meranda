const { Router } = require("express");
const authController = require("./authController");

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/token", authController.refreshToken);

module.exports = router;
