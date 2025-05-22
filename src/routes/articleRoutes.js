const express = require("express");
const router = express.Router();
const authorizeRoles = require("../middleware/roleMiddleware");

// Only reviewers can access this route
router.get("/review-articles", authorizeRoles("reviewer"), (req, res) => {
  res.json({ message: `Welcome Reviewer ${req.user.id}` });
});

// Only publishers can access this
router.get("/publish-dashboard", authorizeRoles("publisher"), (req, res) => {
  res.json({ message: `Publisher Access: ${req.user.id}` });
});

// Admin-only route
router.get("/admin-panel", authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Admin Panel Access" });
});

module.exports = router;
