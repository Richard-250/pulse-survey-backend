const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin routes
router.get('/user/:email/pending', adminController.getUserPendingRequests);
router.get('/payouts/pending', adminController.getAllPendingPayouts);
router.put('/payout/:userEmail/:transactionId/complete', adminController.completePayout);
// router.post('/seed-questions', adminController.seedQuestions);

module.exports = router;