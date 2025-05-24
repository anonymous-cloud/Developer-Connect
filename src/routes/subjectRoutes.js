const express = require("express");
const router = express.Router();
const { 
  createSubject,
  getSubjects
} = require("../controllers/subjectController");

// Public routes
router.get("/", getSubjects);

// Protected admin routes
router.post("/",  
  createSubject
);

module.exports = router;