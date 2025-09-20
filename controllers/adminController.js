const User = require('../models/User');
const Question = require('../models/Question');

const adminController = {
  // Get specific user's pending requests
  getUserPendingRequests: async (req, res) => {
    try {
      const { email } = req.params;
      
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const pendingRequests = user.transactions.filter(
        t => t.type === 'payout_request' && t.status === 'pending'
      );

      res.json({
        userEmail: email,
        pendingRequests
      });
    } catch (error) {
      console.error('Get user pending requests error:', error);
      res.status(500).json({ error: 'Failed to fetch pending requests' });
    }
  },

  // Get all pending payout requests
  getAllPendingPayouts: async (req, res) => {
    try {
      const users = await User.find({
        'transactions': {
          $elemMatch: {
            type: 'payout_request',
            status: 'pending'
          }
        }
      });

      const allPendingRequests = [];
      
      users.forEach(user => {
        const pendingRequests = user.transactions.filter(
          t => t.type === 'payout_request' && t.status === 'pending'
        );
        
        pendingRequests.forEach(request => {
          allPendingRequests.push({
            ...request.toObject(),
            userEmail: user.email,
            userName: user.display_name,
            userId: user.id
          });
        });
      });

      res.json({
        totalPending: allPendingRequests.length,
        requests: allPendingRequests
      });
    } catch (error) {
      console.error('Get all pending requests error:', error);
      res.status(500).json({ error: 'Failed to fetch all pending requests' });
    }
  },

  // Complete specific payout request
  completePayout: async (req, res) => {
    try {
      const { userEmail, transactionId } = req.params;
      
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const transaction = user.transactions.id(transactionId);
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      if (transaction.status !== 'pending') {
        return res.status(400).json({ error: 'Transaction is not pending' });
      }

      transaction.status = 'completed';
      await user.save();

      res.json({
        message: 'Payout request completed',
        transaction
      });
    } catch (error) {
      console.error('Complete payout error:', error);
      res.status(500).json({ error: 'Failed to complete payout request' });
    }
  },

  // Seed initial questions (run once)
//   seedQuestions: async (req, res) => {
//     try {
//       const questions = [
//         {
//           id: "q1",
//           text: "How many minutes do you typically spend commuting each weekday?",
//           choices: ["Less than 15", "15–30", "30–60", "More than 60"]
//         },
//         {
//           id: "q2",
//           text: "Which grocery item have you noticed has increased most in price recently?",
//           choices: ["Bread & staples", "Vegetables & fruits", "Cooking oil", "Dairy & eggs"]
//         },
//         {
//           id: "q3",
//           text: "How reliable is your mobile network during peak evening hours?",
//           choices: ["Very reliable", "Mostly reliable", "Occasionally drops", "Often unavailable"]
//         },
//         {
//           id: "q4",
//           text: "Do you prefer mobile money or cash for small purchases under 5,000 RWF?",
//           choices: ["Mobile money", "Cash", "Depends on merchant", "No preference"]
//         },
//         {
//           id: "q5",
//           text: "How many hours of uninterrupted electricity did you have yesterday?",
//           choices: ["0–4", "5–8", "9–16", "More than 16"]
//         },
//         {
//           id: "q6",
//           text: "How often do you shop using online delivery services in a month?",
//           choices: ["Never", "1–3 times", "4–8 times", "More than 8"]
//         },
//         {
//           id: "q7",
//           text: "Which social media platform do you use most for news?",
//           choices: ["Facebook", "Twitter/X", "WhatsApp/Telegram", "Other"]
//         },
//         {
//           id: "q8",
//           text: "How comfortable are you using contactless payments in small shops?",
//           choices: ["Very comfortable", "Somewhat comfortable", "Not comfortable", "I avoid them"]
//         },
//         {
//           id: "q9",
//           text: "Do you use any fitness or health apps daily?",
//           choices: ["Yes", "No", "Occasionally", "I used to"]
//         },
//         {
//           id: "q10",
//           text: "How often do power outages affect your work or study?",
//           choices: ["Never", "Rarely", "Sometimes", "Often"]
//         }
//       ];

//       // Clear existing questions
//       await Question.deleteMany({});
      
//       // Insert new questions
//       await Question.insertMany(questions);

//       res.json({ 
//         message: 'Questions seeded successfully', 
//         count: questions.length 
//       });
//     } catch (error) {
//       console.error('Seed questions error:', error);
//       res.status(500).json({ error: 'Failed to seed questions' });
//     }
//   }
};

module.exports = adminController;