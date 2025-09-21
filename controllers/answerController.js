const { nanoid } = require('nanoid');
const User = require('../models/User');
const Answer = require('../models/Answer');

const answerController = {
  // Submit answer and update reward
  submitAnswer: async (req, res) => {
    try {
      const { questionId, choice } = req.body;
      
      // Get user from middleware (req.user is set by requireAuth middleware)
      const user = req.user;
      
      if (!user) {
        return res.status(401).json({ error: 'User not found in session' });
      }

      console.log('Submitting answer for user:', user.email); // Debug log

      // Validate input
      if (!questionId || !choice) {
        return res.status(400).json({ error: 'Question ID and choice are required' });
      }

      // Check if user already answered this question (uncomment if needed)
      // const existingAnswer = await Answer.findOne({ 
      //   userId: user._id, 
      //   questionId 
      // });

      // if (existingAnswer) {
      //   return res.status(400).json({ error: 'Question already answered' });
      // }

      // Save answer (uncomment when ready)
      // const answer = new Answer({
      //   userId: user._id,
      //   questionId,
      //   choice
      // });
      // await answer.save();

      // Add reward transaction
      const rewardAmount = 5; // 5 coins per answer
      const transaction = {
        id: nanoid(9),
        type: 'credit',
        amount_coins: rewardAmount,
        status: 'completed',
        created_at: Date.now()
      };

      user.transactions = user.transactions || [];
      user.transactions.push(transaction);
      user.balance = (user.balance || 0) + rewardAmount;
      await user.save();

      console.log('Answer submitted successfully for user:', user.email); // Debug log

      res.json({
        success: true,
        message: 'Answer submitted and reward credited',
        coinsEarned: rewardAmount,
        newBalance: user.balance,
        transaction
      });
    } catch (error) {
      console.error('Submit answer error:', error);
      res.status(500).json({ error: 'Failed to submit answer' });
    }
  }
};

module.exports = answerController;