import {mailConfig} from './mailConfig'
import {confirmMail} from './email'
const express = require('express')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.post('/mailer', function(req, res){
    let name = req.body.name
    let email = req.body.email
    if(email){
        console.log(name,': your email has been sent to: ',email)
        doMail(email)
    }
    else{
        console.log('fail to get email address')
    }
    res.end()
})

app.listen(3000, function(){
    console.log('server is lestening on localhost:3000')
})

function doMail(address){
    let transporter = nodemailer.createTransport({
        host: mailConfig.host,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: mailConfig.username, // generated ethereal user
            pass: mailConfig.password // generated ethereal password
        }
    });
    
    let mailOptions = {
        from: '"HYCON" <no-reply@hycon.io>', // sender address
        to: address, // list of receivers
        subject: 'KYC Verification Completed', // Subject line
        html: confirmMail // html body
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
       
        console.log('Message sent: %s', info.messageId);
    });
}
