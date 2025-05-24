const { model } = require("mongoose");
const Subject = require("../models/Subject");

// @desc    Create new subject
// @route   POST /api/v1/subjects
// @access  Private/Admin

const createSubject = async (req,res) =>{
    try {
        const existingSubject = await Subject.findOne({ name : req.body.name.toLowerCase()});

    if(existingSubject){
        return res.status(400).json({
            sucess : false,
            error : `subject '${req.body.name}' already existes`
        });
    }

    const subjectEntry = await Subject.create({
        name : req.body.name.toLowerCase(),
        description : req.body.description,
        isActive : req.body.isActive || true
    });

    res.status(201).json({
        success : true,
        data : subjectEntry
    })



} catch (error) {
    res.status(400).json({
      success: false,
      error: error.message.includes("validation") 
        ? Object.values(error.errors).map(el => el.message).join(", ")
        : error.message
    });
  }
}

// @desc    Get all subjects
// @route   GET /api/v1/subjects
// @access  Public

const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ isActive: true })
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: subjects.length,
      data: subjects
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};

module.exports = {createSubject,getSubjects};