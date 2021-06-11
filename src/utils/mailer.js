/**
 * Mailer Setup
 * Currently configured to use smtp2go, but you should be able to swap out
 * for other smtp providers.
 */

const nodemailer = require('nodemailer')

const mailCredentials = {
    host: 'mail.smtp2go.com',
    port: 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    secure: true
}

const transporter = nodemailer.createTransport(mailCredentials)

async function sendAccountVerificationEmail(user, verificationCode) {
    // Sends an email to the newly created account with a verification code
    const content = `Your verification code is: ${verificationCode.verificationCode}`

    const message = {
        from: 'MERN AUTH <no-reply@testdomain.com>',
        to: `New User <${user.email}>`,
        subject: 'Verify your account',
        html: content.replace(/\n/g, "<br />")
    };


    try {
        var sentEmail = await transporter.sendMail(message)
    } catch (err) {
        console.log(err)
    }
    console.log(sentEmail)
    return sentEmail
}

module.exports = {
    sendAccountVerificationEmail,
}