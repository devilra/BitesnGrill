const express = require("express");
const {
  register,
  login,
  logout,
  getMe,
  getAdmins,
} = require("../controllers/userController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Logged-in user info
router.get("/me", authMiddleware, getMe);

// Admin-only routes
router.get("/admins", authMiddleware, adminMiddleware, getAdmins);

module.exports = router;
