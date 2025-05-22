const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
//const { authenticate } = require("../middleware/authMiddleware");

router.get("/", articleController.getAllArticles);
router.post("/", articleController.createArticle);

module.exports = router;