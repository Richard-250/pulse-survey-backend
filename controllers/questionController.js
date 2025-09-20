const Question = require('../models/Question');

const questionController = {
  // Get questions with pagination
  getQuestions: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 5;
      const skip = (page - 1) * limit;

      const questions = await Question.find({})
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: 1 });

      const totalQuestions = await Question.countDocuments();
      const totalPages = Math.ceil(totalQuestions / limit);

      res.json({
        questions,
        pagination: {
          currentPage: page,
          totalPages,
          totalQuestions,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      });
    } catch (error) {
      console.error('Get questions error:', error);
      res.status(500).json({ error: 'Failed to fetch questions' });
    }
  }
};

module.exports = questionController;