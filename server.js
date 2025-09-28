// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Database connection
require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/questions');
const answerRoutes = require('./routes/answers');
const payoutRoutes = require('./routes/payoutRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Import seeder
const seedQuestions = require('./seeders/seedQuestions');

// Import cleanup jobs
const { scheduleCleanupJobs, runCleanupNow, cleanupTransactionsByType } = require('./jobs/transactionCleanup');
 
const app = express();

// Middleware
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'https://pulse-survey-theta.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
})); 
  
// Routes
app.use('/api/auth', authRoutes); 
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/payout', payoutRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', contactRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Survey API is running!' });
});

// Admin routes for manual cleanup
app.post('/api/admin/cleanup-transactions', async (req, res) => {
  try {
    await runCleanupNow();
    res.json({ message: 'Complete transaction cleanup completed successfully' });
  } catch (error) {
    console.error('Manual cleanup error:', error);
    res.status(500).json({ error: 'Failed to run cleanup' });
  }
});

// Admin route for cleaning specific transaction types
app.post('/api/admin/cleanup-transactions/:type', async (req, res) => {
  try {
    const { type } = req.params;
    
    // Validate transaction type
    if (!['credit', 'payout_request'].includes(type)) {
      return res.status(400).json({ 
        error: 'Invalid transaction type. Only "credit" and "payout_request" are allowed.' 
      });
    }
    
    const result = await cleanupTransactionsByType(type);
    res.json({ 
      message: `${type} transactions cleanup completed successfully`,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error(`${req.params.type} cleanup error:`, error);
    res.status(500).json({ error: `Failed to cleanup ${req.params.type} transactions` });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Run seeder here
  await seedQuestions();
  
  // Schedule cleanup jobs
  scheduleCleanupJobs();
  
  // Optional: Run initial cleanup on server start 
  // await runCleanupNow();
});

module.exports = app;