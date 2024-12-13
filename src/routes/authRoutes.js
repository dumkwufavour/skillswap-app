const express = require("express");
const { registerUser, loginUser, requestPasswordReset, resetPassword } = require("../controllers/authController");
const router = express.Router();

// Existing routes for register and login
router.post("/register", registerUser);
router.post("/login", loginUser);

// New route to request a password reset (sends the reset link to email)
router.post("/reset-password-request", requestPasswordReset);

// New route to reset the password (when the user provides the reset token and new password)
router.post("/reset-password", resetPassword);

module.exports = router;
