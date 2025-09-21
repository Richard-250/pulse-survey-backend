const User = require('../models/User');

const requireAuth = async (req, res, next) => {
  try {
    // console.log('Session data:', req.session); // Debug log
    // console.log('Session ID:', req.sessionID); // Debug log
    // console.log('User email from session:', req.session.userEmail); // Debug log
    
    if (!req.session || !req.session.userEmail) {
      return res.status(401).json({ 
        error: 'Authentication required',
        message: 'No valid session found. Please log in again.'
      });
    }

    // Optional: Verify user still exists in database
    const user = await User.findOne({ email: req.session.userEmail });
    if (!user) {
      // Clear invalid session
      req.session.destroy((err) => {
        if (err) console.error('Session destroy error:', err);
      });
      return res.status(401).json({ 
        error: 'User not found',
        message: 'Please log in again.'
      });
    }

    // Attach user to request object for use in controllers
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ 
      error: 'Authentication error',
      message: 'Internal server error during authentication.'
    });
  }
};

module.exports = { requireAuth };