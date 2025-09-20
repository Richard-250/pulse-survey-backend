// jobs/transactionCleanup.js
const cron = require('node-cron');
const User = require('../models/User');

// Clean up credit transactions every 15 minutes (immediate cleanup)
const cleanupCreditTransactions = async () => {
  try {
    console.log('Starting credit transactions cleanup...');
    
    const result = await User.updateMany(
      {},
      {
        $pull: {
          transactions: {
            type: 'credit'
          }
        }
      }
    );
    
    console.log(`Credit transactions cleanup completed. Modified ${result.modifiedCount} users.`);
  } catch (error) {
    console.error('Error during credit transactions cleanup:', error);
  }
};

// Clean up all transactions after 7 days
const cleanupAllTransactions = async () => {
  try {
    console.log('Starting all transactions cleanup...');
    
    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds
    
    const result = await User.updateMany(
      {},
      {
        $pull: {
          transactions: {
            created_at: { $lt: sevenDaysAgo }
          }
        }
      }
    );
    
    console.log(`All transactions cleanup completed. Modified ${result.modifiedCount} users.`);
  } catch (error) {
    console.error('Error during all transactions cleanup:', error);
  }
};

// Clean up specific transaction type (for admin use)
const cleanupTransactionsByType = async (transactionType) => {
  try {
    console.log(`Starting ${transactionType} transactions cleanup...`);
    
    // Validate transaction type
    if (!['credit', 'payout_request'].includes(transactionType)) {
      throw new Error('Invalid transaction type. Only "credit" and "payout_request" are allowed.');
    }
    
    const result = await User.updateMany(
      {},
      {
        $pull: {
          transactions: {
            type: transactionType
          }
        }
      }
    );
    
    console.log(`${transactionType} transactions cleanup completed. Modified ${result.modifiedCount} users.`);
    return result;
  } catch (error) {
    console.error(`Error during ${transactionType} transactions cleanup:`, error);
    throw error;
  }
};

// Manual cleanup function for immediate execution
const runCleanupNow = async () => {
  console.log('Running manual cleanup...');
  await cleanupCreditTransactions();
  await cleanupAllTransactions();
  console.log('Manual cleanup completed.');
};

// Schedule jobs
const scheduleCleanupJobs = () => {
  // Run credit cleanup every 15 minutes
  cron.schedule('*/15 * * * *', cleanupCreditTransactions);
  
  // Run all transactions cleanup daily at 2 AM
  cron.schedule('0 2 * * *', cleanupAllTransactions);
  
  console.log('Transaction cleanup jobs scheduled:');
  console.log('- Credit transactions cleanup: Every 15 minutes');
  console.log('- All transactions cleanup: Daily at 2:00 AM (7+ days old)');
};

module.exports = {
  cleanupCreditTransactions,
  cleanupAllTransactions,
  cleanupTransactionsByType,
  runCleanupNow,
  scheduleCleanupJobs
};