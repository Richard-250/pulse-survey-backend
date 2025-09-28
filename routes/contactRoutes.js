const express = require('express');
const { submitContactForm } = require('../controllers/contactController');

const router = express.Router();

// POST /api/contact - Submit contact form
router.post('/contact', submitContactForm);

module.exports = router;