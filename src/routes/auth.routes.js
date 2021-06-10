// Auth.routes.js
const router = require('express').Router();
const { BadRequest } = require('../utils/errors');

router.post('/login', (req, res) => {
    throw new BadRequest("Is this working?");
    res.send("/login")
})

module.exports = router;