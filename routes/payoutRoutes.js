const express = require('express');
const router = express.Router();
const payoutController = require('../controllers/payoutController');
const { requireAuth } = require('../middleware/auth.js');

// Payout routes
router.post('/request', requireAuth, payoutController.requestPayout);

module.exports = router; 