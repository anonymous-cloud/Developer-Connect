const mongoose = require("mongoose");


const connectDb = async()=>{

    try{

        await mongoose.connect("mongodb+srv://abhishekPratap12:1234@cluster0.b55ht8m.mongodb.net/");
        console.log("✅ MongoDB connected successfully");
    }catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // exit the process with failure
  }
}
module.exports = connectDb;