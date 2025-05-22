const Article = require("../models/Article");

const createArticle = async (req, res) => {
  try {
    const { title, content ,author } = req.body;
    const article = await Article.create({ 
        title, 
        content,
        author: req.user._id
     });
    res.status(201).json({ success: true, data: article });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


const getAllArticles  = async (req,res)=>{
    try {
        const articles = await Article.find().sort({createdAt : -1});
        res.status(200).json({success : true , data : articles});
    }catch(error){
        console.log(error);
        res.status(500).json({success: false , error : "server error"});
    }
};

module.exports = {
     createArticle,
  getAllArticles
};