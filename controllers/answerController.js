const { nanoid } = require('nanoid');
const User = require('../models/User');
const Answer = require('../models/Answer');

const answerController = {
  // Submit answer and update reward
  submitAnswer: async (req, res) => {
    try {
      const { questionId, choice } = req.body;
      const userEmail = req.session.userEmail;
     
      // Find user
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if user already answered this question
    //   const existingAnswer = await Answer.findOne({ 
    //     userId: user.id, 
    //     questionId 
    //   });

    //   if (existingAnswer) {
    //     return res.status(400).json({ error: 'Question already answered' });
    //   }

      // Save answer
      const answer = new Answer({
        userId: user.id,
        questionId,
        choice
      });
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

      user.transactions.push(transaction);
      user.balance += rewardAmount;
      await user.save();

      res.json({
        message: 'Answer submitted and reward credited',
        reward: rewardAmount,
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