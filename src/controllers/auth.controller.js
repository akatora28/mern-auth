const path = require('path')
const authService = require(path.resolve('src','services','auth.service'))

const mailer = require(path.resolve('src','utils','mailer'))

exports.register = async function(req, res, next) {
    // Call authService to try creating new User
    try {
        await authService.registerUser(req.body);
    } catch (err) {
        return next(err)
    }

    res.status(200).json({status:"success",message:"User created successfully"});
}

exports.verify = async function(req, res, next) {
    const { verificationCode } = req.body
    try {
        await authService.verifyToken(verificationCode)
    } catch (err) {
        console.log(err)
        return next(err)
    }

    res.status(200).json({status:"success",message:"User email verified successfully"})
}