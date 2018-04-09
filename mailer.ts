import {mailConfig} from './mailConfig'
import {confirmMail} from './email'
import { isUndefined } from 'util';
const express = require('express')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const queue = []

app.post('/mailer', function(req, res){
    let name = req.body.name.trim()
    let email = req.body.email.trim()
    if(email){
        console.log(name,': your email has been sent to: ',email)
        queue.push(email)
    }
    else{
        console.log('fail to get email address')
    }
    res.end()
})

setInterval(() => {
    let email = queue.splice(0,1)
    if(email.length > 0) {
        doMail(email[0])
    }
}, 200)

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
        subject: 'KYC Verification Completed (KYC 검증 완료)', // Subject line
        html: confirmMail // html body
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
       
        console.log('Message sent: %s', info.messageId);
    });
}
