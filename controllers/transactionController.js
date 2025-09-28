// controllers/transactionController.js
const User = require('../models/User');
const Answer = require('../models/Answer');
const Question = require('../models/Question');
const { nanoid } = require('nanoid');

// Submit answer and get reward
const submitAnswer = async (req, res) => {
  try {
    const { questionId, choice } = req.body;
    // Use req.user from JWT middleware instead of session
    const user = req.user;

    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // Check if question exists
    const question = await Question.findOne({ id: questionId, isActive: true });
    if (!question) {
      return res.status(404).json({ 
        error: 'Question not found or inactive',
        code: 'QUESTION_NOT_FOUND'
      });
    }

    // Validate choice
    if (!question.choices.includes(choice)) {
      return res.status(400).json({ 
        error: 'Invalid choice for this question',
        code: 'INVALID_CHOICE'
      });
    }

    // Check if user already answered this question
    const existingAnswer = await Answer.findOne({ 
      userId: user.id, 
      questionId 
    });

    if (existingAnswer) {
      return res.status(400).json({ 
        error: 'You have already answered this question',
        code: 'ALREADY_ANSWERED'
      });
    }

    // Save answer
    const answer = new Answer({
      userId: user.id,
      questionId,
      choice
    });
    await answer.save(); 
  
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
      transaction,
      answer: {
        questionId,
        choice,
        answeredAt: answer.answeredAt
      }
    });
  } catch (error) {
    console.error('Submit answer error:', error);
    res.status(500).json({ 
      error: 'Failed to submit answer',
      code: 'SUBMIT_ANSWER_ERROR'
    });
  }
};

// Get user's transaction history
const getTransactionHistory = async (req, res) => {
  try {
    // Use req.user from JWT middleware instead of session
    const user = req.user;
    
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Sort transactions by date (newest first)
    const sortedTransactions = user.transactions
      .sort((a, b) => b.created_at - a.created_at)
      .slice(skip, skip + limit);

    const totalTransactions = user.transactions.length;
    const totalPages = Math.ceil(totalTransactions / limit);

    res.json({
      transactions: sortedTransactions,
      pagination: {
        currentPage: page,
        totalPages,
        totalTransactions,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        limit
      },
      balance: user.balance
    });
  } catch (error) {
    console.error('Get transaction history error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch transaction history',
      code: 'GET_TRANSACTIONS_ERROR'
    });
  }
};

// Get user's answers
const getUserAnswers = async (req, res) => {
  try {
    // Use req.user from JWT middleware instead of session
    const user = req.user;
    
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const answers = await Answer.find({ userId: user.id })
      .select('-_id -__v -userId') // Exclude MongoDB fields and userId
      .sort({ answeredAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalAnswers = await Answer.countDocuments({ userId: user.id });
    const totalPages = Math.ceil(totalAnswers / limit);

    res.json({
      answers,
      pagination: {
        currentPage: page,
        totalPages,
        totalAnswers,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        limit
      }
    });
  } catch (error) {
    console.error('Get user answers error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch user answers',
      code: 'GET_ANSWERS_ERROR'
    });
  }
};

module.exports = {
  submitAnswer,
  getTransactionHistory,
  getUserAnswers
};