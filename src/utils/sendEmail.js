const nodemailer = require("nodemailer");
const fs = require("fs");
const handlebars = require("handlebars");

const sendemail = async(options) =>{
  console.log(options)
    const transporter = nodemailer.createTransport({
         service : "Gmail", 
         auth : {
            user : process.env.EMAIL_USER, // YOUR EMAIL
            pass: process.env.EMAIL_PASS, 
         },
    });
     let htmlContent = "";
    if (options.templatePath) {
    const source = fs.readFileSync(options.templatePath, "utf8");
    const compiled = handlebars.compile(source);
    htmlContent = compiled(options.templateData);
  }

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