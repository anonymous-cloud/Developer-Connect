const express = require("express");
const router = express.Router();
const { 
  createArticle,
  getArticleById,
  getArticlesBySubject
} = require("../controllers/articleController");

// Create article
router.post("/", createArticle);

// Get article by ID
router.get("/:id", getArticleById);

// Get articles by subject ID
router.get("/subject/:subjectId", getArticlesBySubject);

module.exports = router;