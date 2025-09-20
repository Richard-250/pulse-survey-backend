const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const userSchema = new mongoose.Schema({
  id: { 
    type: String, 
    default: () => nanoid(8), 
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  display_name: { 
    type: String, 
    required: true 
  },
  country: { 
    type: String, 
    default: '' 
  },
  mtn_mobile_number: { 
    type: String, 
    default: '' 
  },
  is_email_verified: { 
    type: Boolean, 
    default: false 
  },
  balance: { 
    type: Number, 
    default: 0 
  },
  transactions: [{
    id: { 
      type: String, 
      default: () => nanoid(9) 
    },
    type: { 
      type: String, 
      enum: ['credit', 'debit', 'payout_request'], 
      required: true 
    },
    amount_coins: { 
      type: Number, 
      required: true 
    },
    mtn_number: String,
    status: { 
      type: String, 
      enum: ['pending', 'completed', 'failed'], 
      default: 'completed' 
    },
    created_at: { 
      type: Number, 
      default: Date.now 
    }
  }],
  bank_account: { 
    type: String, 
    default: '' 
  },
  last_withdrawal_date: Number
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);