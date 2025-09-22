const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../middleware/auth');

const authController = {
  // Register user
  register: async (req, res) => {
    try {
      const { email, password, display_name, country, mtn_mobile_number } = req.body;

      // Validate required fields
      if (!email || !password || !display_name) {
        return res.status(400).json({ 
          error: 'Email, password, and display name are required',
          code: 'MISSING_REQUIRED_FIELDS'
        });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ 
          error: 'User already exists',
          code: 'USER_EXISTS'
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user
      const user = new User({
        email,
        password: hashedPassword,
        display_name,
        country: country || '',
        mtn_mobile_number: mtn_mobile_number || ''
      });

      await user.save();

      // Generate JWT token
      const token = generateToken(user);

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: user.id,
          email: user.email,
          display_name: user.display_name,
          country: user.country,
          mtn_mobile_number: user.mtn_mobile_number,
          balance: user.balance,
          is_email_verified: user.is_email_verified
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ 
        error: 'Registration failed',
        code: 'REGISTRATION_ERROR'
      });
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({ 
          error: 'Email and password are required',
          code: 'MISSING_CREDENTIALS'
        });
      }

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ 
          error: 'Invalid credentials',
          code: 'INVALID_CREDENTIALS'
        });
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ 
          error: 'Invalid credentials',
          code: 'INVALID_CREDENTIALS'
        });
      }

      // Generate JWT token
      const token = generateToken(user);

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          display_name: user.display_name,
          country: user.country,
          mtn_mobile_number: user.mtn_mobile_number,
          balance: user.balance,
          is_email_verified: user.is_email_verified
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ 
        error: 'Login failed',
        code: 'LOGIN_ERROR'
      });
    }
  },

  // Logout user (client-side token removal)
  logout: (req, res) => {
    try {
      // In JWT-based auth, logout is typically handled client-side by removing the token
      // You can implement token blacklisting here if needed for additional security
      res.json({ 
        message: 'Logout successful',
        note: 'Please remove the token from client storage'
      });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ 
        error: 'Logout failed',
        code: 'LOGOUT_ERROR'
      });
    }
  },

  // Get current user (requires authentication)
  me: async (req, res) => {
    try {
      // User is already available from JWT middleware
      const user = req.user;
      
      if (!user) {
        return res.status(404).json({ 
          error: 'User not found',
          code: 'USER_NOT_FOUND'
        });
      }

      // Get fresh user data from database to ensure balance is current
      const freshUser = await User.findOne({ email: user.email });
      if (!freshUser) {
        return res.status(404).json({ 
          error: 'User not found',
          code: 'USER_NOT_FOUND'
        });
      }

      res.json({
        id: freshUser.id,
        email: freshUser.email,
        display_name: freshUser.display_name,
        balance: freshUser.balance,
        country: freshUser.country,
        mtn_mobile_number: freshUser.mtn_mobile_number,
        is_email_verified: freshUser.is_email_verified,
        last_withdrawal_date: freshUser.last_withdrawal_date
      });
    } catch (error) {
      console.error('Get user info error:', error);
      res.status(500).json({ 
        error: 'Failed to get user information',
        code: 'GET_USER_ERROR'
      });
    }
  },

  // Update user profile (requires authentication)
  updateProfile: async (req, res) => {
    try {
      const user = req.user;
      const { display_name, country, mtn_mobile_number } = req.body;

      // Update user fields
      const updateData = {};
      if (display_name !== undefined) updateData.display_name = display_name;
      if (country !== undefined) updateData.country = country;
      if (mtn_mobile_number !== undefined) updateData.mtn_mobile_number = mtn_mobile_number;

      const updatedUser = await User.findOneAndUpdate(
        { email: user.email },
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ 
          error: 'User not found',
          code: 'USER_NOT_FOUND'
        });
      }

      res.json({
        message: 'Profile updated successfully',
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          display_name: updatedUser.display_name,
          country: updatedUser.country,
          mtn_mobile_number: updatedUser.mtn_mobile_number,
          balance: updatedUser.balance,
          is_email_verified: updatedUser.is_email_verified
        }
      });
    } catch (error) {
      console.error('Profile update error:', error);
      res.status(500).json({ 
        error: 'Failed to update profile',
        code: 'PROFILE_UPDATE_ERROR'
      });
    }
  }
};

module.exports = authController;