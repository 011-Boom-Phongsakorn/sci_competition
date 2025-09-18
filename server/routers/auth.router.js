const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

router.post("/signup", authController.signUp);
// router.post('/signin', authController.signIn)

// GET http://localhost:5000/api/v1/auth/verify/:token
router.get("/verify/:token", authController.verifyEmail);

module.exports = router;
