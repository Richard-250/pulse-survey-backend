const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth')

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', requireAuth, authController.me); 

router.put('/profile/phone', requireAuth, authController.updatePhoneNumber);
router.put('/profile/bank-account', requireAuth, authController.updateBankAccount);


module.exports = router;  