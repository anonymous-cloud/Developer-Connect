const express = require("express");

const app = express()

app.use("/",(req,res)=>{
    res.send("sussesfully shown on server")
})



app.listen("3000",()=>{
    console.log("server  is sussesfully listening to port number 3000")
});