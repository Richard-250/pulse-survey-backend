const { nanoid } = require('nanoid');
const User = require('../models/User');

const payoutController = {
  // Make payout request
  requestPayout: async (req, res) => {
    try {
      const { amount_coins, mtn_number } = req.body;
      // Use req.user from JWT middleware instead of session
      const user = req.user;

      if (!user) {
        return res.status(404).json({ 
          error: 'User not found',
          code: 'USER_NOT_FOUND'
        });
      }

      // Validate required fields
      if (!amount_coins || !mtn_number) {
        return res.status(400).json({ 
          error: 'Amount and MTN number are required',
          code: 'MISSING_REQUIRED_FIELDS'
        });
      }

      // Validate amount is positive
      if (amount_coins <= 0) {
        return res.status(400).json({ 
          error: 'Amount must be greater than 0',
          code: 'INVALID_AMOUNT'
        });
      }

      if (user.balance < amount_coins) {
        return res.status(400).json({ 
          error: 'Insufficient balance',
          code: 'INSUFFICIENT_BALANCE'
        });
      }

      // Minimum payout check
      const minPayoutAmount = 10;
      if (amount_coins < minPayoutAmount) {
        return res.status(400).json({ 
          error: `Minimum payout amount is ${minPayoutAmount} coins`,
          code: 'MINIMUM_PAYOUT_ERROR'
        });
      }

      // Create payout request transaction
      const transaction = {
        id: nanoid(9),
        type: 'payout_request',
        amount_coins,
        mtn_number,
        status: 'pending',
        created_at: Date.now()
      };

      user.transactions.push(transaction);
      user.balance -= amount_coins;
      user.last_withdrawal_date = Date.now();
      await user.save();

      res.json({
        message: 'Payout request submitted successfully',
        transaction,
        newBalance: user.balance
      });
    } catch (error) {
      console.error('Payout request error:', error);
      res.status(500).json({ 
        error: 'Failed to create payout request',
        code: 'PAYOUT_REQUEST_ERROR'
      });
    }
  }
};

module.exports = payoutController;