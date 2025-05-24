const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const Subject = require("../models/Subject");
const { text } = require("body-parser");

require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const signup = async(req,res)=>{
    try {
        const {name,email,password,role} = req.body;
        const exitingUser = await User.findOne({email});

        if(exitingUser){
            return res.status(409).json({message : "user alreday exits"});

        }

        const saltRounds = 10;

        const hasedPassword = await bcrypt.hash(password,saltRounds)


      const newUser = new User({name,email : email.toLowerCase(),password : hasedPassword,role : role || user});
        
      await sendEmail({
        to : req.body.email,
        Subject : "Welcome to Developer connect 🚀",
        text : `Hi ${newUser.name},welcome to our platform. We're excited to have you!`,
      });
      await newUser.save();


res.status(201).json({
      success: true,
      message: "User created & email sent",
      data: newUser,
    });

    }catch(err){
        console.error("Email send error:", err)
        res.status(500).json({error : err.message});
    }
};

const login = async (req,res)=>{
    try{

        const {email,password} = req.body;

        const dataUser = await User.findOne({email});

        if(!dataUser){
         return res.status(400).json({message :"invalid credentials"})

        }
        const isMatch = await bcrypt.compare(password,dataUser.password);
        if(!isMatch){
            return res.status(400).json({message : "invalid credentials"});
        }

           const token = jwt.sign(
                   { id: dataUser._id, role: dataUser.role },
                     JWT_SECRET,
                    { expiresIn: "24h" }
);



        res.status(200).json({message : "login successful", token})
    }catch(err){
        console.log(err)
        return res.status(500).json({err : err.message});
    }
    
};


module.exports = {signup,login};
