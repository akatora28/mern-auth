/**
 * Express Router Setup
 */
const path = require('path');
const router = require('express').Router();

// Leaving this in for now just for testing
router.get('/', (req, res) => res.send('Hello world!'))

// Application Routes - all routes are pre-fixed with /api
router.use('/api/auth', require(path.resolve('src','routes','auth.routes')));

module.exports = router