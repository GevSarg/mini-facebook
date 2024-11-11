const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/Auth");
const { checkAuth } = require("../middlewares/checkAuth");
const controller = new AuthController();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/me", checkAuth, controller.authMe);
router.get("/logout", controller.logout);

module.exports = router;
