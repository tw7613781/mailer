import {mailConfig} from './mailConfig'
import {confirmMail} from './email'
import { currentId } from 'async_hooks';
const express = require('express')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')

const fs = require('fs')
const logPath = __dirname+'/mailer.log'
const log_file = fs.createWriteStream(logPath,{flags: 'a+',autoClose: true})

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.post('/mailer', function(req, res){
    let name = req.body.name.trim()
    let email = req.body.email.trim()
    if(email){
        logger("Receive email addr: "+email+" form "+name)
        setTimeout(() => doMail(email), 200)
    }
    else{
        logger('fail to get email address')
    }
    res.end()
})

app.listen(3000, function(){
    logger('server is listening on localhost:3000')
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
            return logger(error);
        }  
        logger(address + ' sent: ' + info.messageId);
    });
}

function logger(logs){
    let currentDate = new Date()
    log_file.write(currentDate.toLocaleString() + ": "+ logs + "\n")
}
