const express = require("express");
const connectDB = require('./config/db'); 
const router = require("./routes/authRoutes")
const bodyParser = require('body-parser');

const app = express()
connectDB();

app.use(bodyParser.json());
app.use("/",router)

app.listen("3000",()=>{
    console.log("server  is sussesfully listening to port number 3000")
});