const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: { 
    type: String, 
    required: true, 
    unique: true 
  },
  text: { 
    type: String, 
    required: true 
  },
  choices: [{ 
    type: String, 
    required: true 
  }]
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);