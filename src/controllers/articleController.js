const Article = require("../models/Article");
const Subject = require("../models/Subject");

const createArticle = async (req, res) => {
  try {
const { title, content, subjectId , articleStatus , articlePic } = req.body;

    // Verify subject exists
    const subjectExists = await Subject.findById(subjectId);
    if (!subjectExists) {
      return res.status(400).json({
        success: false,
        error: "Subject not found"
      });
    }

    const article = await Article.create({
      title,
      content,
      subject: subjectId,
      author: req.user?._id ,// Optional if you implement auth later
      articleStatus,
  articlePic
    });

    res.status(201).json({
      success: true,
      data: article
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('subject', 'name')
      .populate('author', 'name');

    if (!article) {
      return res.status(404).json({
        success: false,
        error: "Article not found"
      });
    }

    res.status(200).json({
      success: true,
      data: article
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getArticlesBySubject = async (req, res) => {
  try {
    const articles = await Article.find({ subject: req.params.subjectId })
      .populate('subject', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: articles.length,
      data: articles
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  createArticle,
  getArticleById,
  getArticlesBySubject
};