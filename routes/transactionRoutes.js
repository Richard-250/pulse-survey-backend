// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { requireAuth } = require('../middleware/auth');
const { validateAnswer, validatePayout, validatePagination } = require('./middleware/validation');

// POST /api/answers/submit - Submit answer and get reward
router.post('/answers/submit', requireAuth, validateAnswer, transactionController.submitAnswer);

// GET /api/answers/my - Get user's answers
router.get('/answers/my', requireAuth, validatePagination, transactionController.getUserAnswers);

// POST /api/payout/request - Request payout
router.post('/payout/request', requireAuth, validatePayout, transactionController.requestPayout);

// GET /api/transactions/my - Get user's transaction history
router.get('/transactions/my', requireAuth, validatePagination, transactionController.getTransactionHistory);



module.exports = router;