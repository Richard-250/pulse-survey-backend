const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Question routes
router.get('/', questionController.getQuestions);

module.exports = router;