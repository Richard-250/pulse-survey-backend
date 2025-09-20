const { nanoid } = require('nanoid');
const User = require('../models/User');

const payoutController = {
  // Make payout request
  requestPayout: async (req, res) => {
    try {
      const { amount_coins, mtn_number } = req.body;
      const userEmail = req.session.userEmail;

      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (user.balance < amount_coins) {
        return res.status(400).json({ error: 'Insufficient balance' });
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
        message: 'Payout request submitted',
        transaction,
        newBalance: user.balance
      });
    } catch (error) {
      console.error('Payout request error:', error);
      res.status(500).json({ error: 'Failed to create payout request' });
    }
  }
};

module.exports = payoutController;