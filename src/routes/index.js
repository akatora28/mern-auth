/**
 * Express Router Setup
 */
const router = require('express').Router();

// Leaving this in for now just for testing
router.get('/', (req, res) => res.send('Hello world!'))

// Application Routes - all routes are pre-fixed with /api
router.use('/api/auth', require('./auth.routes'));

module.exports = router