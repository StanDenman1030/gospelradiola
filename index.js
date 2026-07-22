const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const path = require("path");
const env = require("dotenv");
const nodemailer = require("nodemailer");
const request = require("request");
const https = require("https");

env.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("home");
});

app.get("/station", (req, res) => {
    res.render("station");
});

app.get("/podcast", (req, res) => {
    res.render("podcast");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/events", (req, res) => {
    res.render("events");
});

app.get("/error", (req, res) => {
    res.render("error");
});

app.get("/message", (req, res) => {
    res.render("message");
});

app.get("/support", (req, res) => {
    res.render("support");
});

app.get("/success", (req, res) => {
    res.render("success");
});

app.get("/sSuccess", (req, res) => {
    res.render("sSuccess");
});

app.get("/sAbout", (req, res) => {
    res.render("sAbout");
});

app.get("/sAccount", (req, res) => {
    res.render("sAccount");
});

app.get("/sContact", (req, res) => {
    res.render("sContact");
});

app.get("/sHome", (req, res) => {
    res.render("sHome");
});

app.get("/sMessage", (req, res) => {
    res.render("sMessage");
});

app.get("/sPodcast", (req, res) => {
    res.render("sPodcast");
});

app.get("/sStation", (req, res) => {
    res.render("sStation");
});

app.get("/newsletter", (req, res) => {
    res.render("newsletter");
});

app.get("/sNewsletter", (req, res) => {
    res.render("sNewsletter");
});

app.get("/reports", (req, res) => {
    res.render("reports");
});

app.get("/sReports", (req, res) => {
    res.render("sReports");
});


app.post("/", (req, res) => {
    const email = req.body.email;
    
    const data = {
        members: [
            {
               email_address: email,
               status: "subscribed",
               merge_fields: {

               }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/be6665d4a6"
    const options = {
        method: "POST",
        auth: "Stan1:a07d16e711419cb7bd6b1caf8582264a-us21"
    }

    const request = https.request(url, options, function(response) {
        if (response.statusCode === 200) {
            res.render("success");
        } else {
            res.render("error");
        }

        response.on("data", function(data){
            console.log(data);
        })
    });

    request.write(jsonData);
    request.end();

});

app.post("/mail", (req, res) => {

        // create reusable transporter object 
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            secure: false,
            auth: {
            user: process.env.PMAIL_EMAIL, 
            pass: process.env.PMAIL_PAS  
            }
        });

        
        const mailOptions = {
            from: process.env.PMAIL_EMAIL, // sender address
            to: process.env.PMAIL_EMAIL, // list of receivers
            subject: "Message from Gospel Radio LA Web Form" + " " + "/" + req.body.subject + " " + "From" + " " + req.body.name + " " + req.body.phone, // Subject line
            text: req.body.message + " " + req.body.email // plain text body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            console.log(info);

            if (error) {
                console.log(error);
                res.render("error");
            } else {
                console.log("successfully sent " + info.envelopeTime);
                res.render("success");
            }
        });
    

    });        


app.listen(PORT, function () {
    console.log("Server started on port 3000");
});

// a07d16e711419cb7bd6b1caf8582264a-us21
//be6665d4a6