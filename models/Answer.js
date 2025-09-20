const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true 
  },
  questionId: { 
    type: String, 
    required: true 
  },
  choice: { 
    type: String, 
    required: true 
  },
  answeredAt: { 
    type: Number, 
    default: Date.now 
  }
}, { timestamps: true });

// Compound index to ensure one answer per user per question
answerSchema.index({ userId: 1, questionId: 1 }, { unique: true });

module.exports = mongoose.model('Answer', answerSchema);