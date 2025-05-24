const nodemailer = require("nodemailer");

const sendemail = async(options) =>{
  console.log(options)
    const transporter = nodemailer.createTransport({
         service : "Gmail", 
         auth : {
            user : process.env.EMAIL_USER, // YOUR EMAIL
            pass: process.env.EMAIL_PASS, 
         },
    });

    const  mailOptions = {
          from : "hello.test.nodemail@gmail.com",
          to : options.to,
          subject : options.Subject,
          text : options.text,

    };
    console.log(mailOptions);
    await transporter.sendMail(mailOptions);
};

module.exports = sendemail;