const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");
const { getAnalytics } = require("../controllers/analyticsController");

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getAnalytics);

module.exports = router;
