// utils/manualCleanup.js
require('dotenv').config();
require('../config/database');
const { runCleanupNow, cleanupCreditTransactions, cleanupAllTransactions, cleanupTransactionsByType } = require('../jobs/transactionCleanup');

// Command line utility for manual cleanup
const runManualCleanup = async () => {
  const args = process.argv.slice(2);
  const command = args[0];

  try {
    switch (command) {
      case 'credit':
        console.log('Running credit transactions cleanup...');
        await cleanupCreditTransactions();
        break;
      
      case 'payout_request':
        console.log('Running payout_request transactions cleanup...');
        await cleanupTransactionsByType('payout_request');
        break;
      
      case 'all':
        console.log('Running all transactions cleanup (7+ days old)...');
        await cleanupAllTransactions();
        break;
      
      case 'complete':
      default:
        console.log('Running complete cleanup...');
        await runCleanupNow();
        break;
    }
    
    console.log('Cleanup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Cleanup failed:', error);
    process.exit(1);
  }
};

// Show usage if no valid command
if (process.argv.length < 2) {
  console.log('Usage:');
  console.log('  node utils/manualCleanup.js [command]');
  console.log('Commands:');
  console.log('  credit         - Clean up all credit transactions');
  console.log('  payout_request - Clean up all payout_request transactions');
  console.log('  all            - Clean up all transactions older than 7 days');
  console.log('  complete       - Run both credit and 7-day cleanups (default)');
  process.exit(0);
}

runManualCleanup();