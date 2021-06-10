// Auth.routes.js
const path = require('path');
const router = require('express').Router();
const { BadRequest } = require(path.resolve('src','utils','errors'));

router.post('/login', (req, res) => {
    throw new BadRequest("Is this working?");
    res.send("/login")
})

module.exports = router;