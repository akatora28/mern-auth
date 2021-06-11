// Auth.routes.js
const path = require('path')
const router = require('express').Router()
const authController = require(path.resolve('src','controllers','auth.controller'))

router.post('/login', (req, res) => {
    // TODO
    res.send("/login")
})
router.post('/register', authController.register)

module.exports = router;