const path = require('path')
const authService = require(path.resolve('src','services','auth.service'))

exports.register = async function(req, res, next) {
    // Call authService to try creating new User
    try {
        await authService.registerUser(req.body);
    } catch (err) {
        return next(err)
    }

    res.json({status:"success",message:"User created successfully"});
}