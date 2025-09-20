const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');
const { requireAuth } = require('../Middleware/auth');

// Answer routes
router.post('/submit', requireAuth, answerController.submitAnswer);

module.exports = router;