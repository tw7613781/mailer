"use strict";
exports.__esModule = true;
var mailConfig_1 = require("./mailConfig");
var email_1 = require("./email");
var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var fs = require('fs');
var logPath = __dirname + '/mailer.log';
var log_file = fs.createWriteStream(logPath, { flags: 'a+', autoClose: true });
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/mailer', function (req, res) {
    var name = req.body.name.trim();
    var email = req.body.email.trim();
    if (email) {
        logger("Receive email addr: " + email + " form " + name);
        setTimeout(function () { return doMail(email); }, 200);
    }
    else {
        logger('fail to get email address');
    }
    res.end();
});
app.listen(3000, function () {
    logger('server is listening on localhost:3000');
});
function doMail(address) {
    var transporter = nodemailer.createTransport({
        host: mailConfig_1.mailConfig.host,
        port: 587,
        secure: false,
        auth: {
            user: mailConfig_1.mailConfig.username,
            pass: mailConfig_1.mailConfig.password // generated ethereal password
        }
    });
    var mailOptions = {
        from: '"HYCON" <no-reply@hycon.io>',
        to: address,
        subject: 'KYC Verification Completed (KYC 검증 완료)',
        html: email_1.confirmMail // html body
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return logger(error);
        }
        logger(address + ' sent: ' + info.messageId);
    });
}
function logger(logs) {
    var currentDate = new Date();
    log_file.write(currentDate.toLocaleString() + ": " + logs + "\n");
}
