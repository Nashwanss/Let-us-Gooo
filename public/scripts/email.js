const nodemailer = require("nodemailer");



let btn = document.getElementById("btnSubmit");
btn.addEventListener("click", () => {

    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "Let.Gooo.Becode@gmail.com",
          pass: "Letgooo123",
        },
      });
    
      var mailOptions = {
        from: "youremail@gmail.com",
        to: "Let.Gooo.Becode@gmail.com",
        subject: "Sending Email using Node.js",
        text: "That was easy!",
      };
    
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });


})








