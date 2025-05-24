const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
   subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: [true, "Subject ID is required"]
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

 articleStatus : {
  type : String,
  enum : ["pending ","new","draft", "accepted ", "completed ","inProgess" ],
  default : "draft"
 },
  articlePic : {
    type: String,
  },
}, { timestamps: true }); // Adds createdAt/updatedAt

module.exports = mongoose.model("Article", articleSchema);