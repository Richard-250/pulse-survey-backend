const bcrypt = require('bcryptjs');
const User = require('../models/User');

const authController = {
  // Register user
  register: async (req, res) => {
    try {
      const { email, password, display_name, country, mtn_mobile_number } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = new User({
        email,
        password: hashedPassword,
        display_name,
        country: country || '',
        mtn_mobile_number: mtn_mobile_number || ''
      });

      await user.save();

      // Set session
      req.session.userEmail = email;

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          email: user.email,
          display_name: user.display_name,
          balance: user.balance
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Set session
      req.session.userEmail = email;

      res.json({
        message: 'Login successful',
        user: {
          email: user.email,
          display_name: user.display_name,
          balance: user.balance
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  },

  // Logout user
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Logout failed' });
      }
      res.clearCookie('connect.sid');
      res.json({ message: 'Logout successful' });
    });
  },

  // Get current user
  me: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.session.userEmail });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        email: user.email,
        display_name: user.display_name,
        balance: user.balance,
        country: user.country,
        mtn_mobile_number: user.mtn_mobile_number,
        is_email_verified: user.is_email_verified
      });
    } catch (error) {
      console.error('Session check error:', error);
      res.status(500).json({ error: 'Session check failed' });
    }
  }
};

module.exports = authController;