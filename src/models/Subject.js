const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Subject name is required"],
    enum: ["history", "nodejs", "javascript", "python", "java", "datascience"],
    unique: true,
    trime : true,
    lowercase : true
  },
  description:{ type : String,
                maxlength : [1000,"description cannot exceed 500 character"],
                trim : true
  },
  isActive : {
               type : Boolean,
               default : true

  }
}, { timestamps: true });


subjectSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Subject", subjectSchema);