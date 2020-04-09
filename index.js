require('dotenv').config()
const express = require('express')
const nodemailer = require('nodemailer')

const server = express()

server.use(express.json())

server.post('/', (req,res)=>{
    const message = req.body
    if (!message) {
        res.status(400).json({error: "something went wrong"})
    } else {
        const mailOptions = {
            from: "uziasrivera.pro@gmail.com",
            to: 'uziasrivera@gmail.com',
            subject: `${message.subject} - ${message.email} - ${message.name}`,
            text: message.message,
            auth: {
              user: 'uziasrivera.pro@gmail.com',
            }
        };
        transporter.sendMail(mailOptions, (err, info)=>{
            err ? console.log(err) : console.log("email sent "+ info.response )
        })
        res.status(200).json({success:"you message has been sent"})
    }
})


const transporter = nodemailer.createTransport({
host: 'smtp.gmail.com',
port: 465,
secure: true,
service: 'Gmail',
auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
    }
});

port = process.env.PORT || 8000
server.listen(port, ()=>{
    console.log("now listening on PORT ", port)
})