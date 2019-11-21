"use strict"
const nodemailer = require('nodemailer');

function mailSend(email) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dummy100211@gmail.com',
            pass: 'izahizul102'
        }
    })

    let mailOptions = {
        from: 'dummy100211@gmail.com',
        to: email,
        subject: 'Setim Yuk!!',
        text: `Terimakasih anda telah mencuci di tempat kami`
    }

    transporter.sendMail(mailOptions, (error, info) => {
    })
}
module.exports = mailSend