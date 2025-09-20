const express = require('express');
const router = express.Router();
const payoutController = require('../controllers/payoutController');
const { requireAuth } = require('../Middleware/auth');

// Payout routes
router.post('/request', requireAuth, payoutController.requestPayout);

module.exports = router;