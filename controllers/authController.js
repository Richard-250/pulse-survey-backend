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
          bank_account: user.bank_account,
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
          bank_account: user.bank_account,
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
        bank_account: freshUser.bank_account,
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
      const { display_name, country, mtn_mobile_number, bank_account } = req.body;

      // Validate phone number format if provided
      if (mtn_mobile_number !== undefined && mtn_mobile_number !== '') {
        // Basic validation for MTN Rwanda numbers (should start with +250 or 0 and be 10-13 digits)
        const phoneRegex = /^(\+?250|0)?[7][0-9]{8}$/;
        if (!phoneRegex.test(mtn_mobile_number.replace(/\s+/g, ''))) {
          return res.status(400).json({
            error: 'Invalid MTN mobile number format. Please use format: +25078XXXXXXX or 078XXXXXXX',
            code: 'INVALID_PHONE_FORMAT'
          });
        }
      }

      // Validate bank account format if provided
      if (bank_account !== undefined && bank_account !== '') {
        // Basic validation for bank account (should be numeric and reasonable length)
        const bankAccountRegex = /^[0-9]{8,20}$/;
        if (!bankAccountRegex.test(bank_account)) {
          return res.status(400).json({
            error: 'Invalid bank account format. Please use numeric format (8-20 digits)',
            code: 'INVALID_BANK_ACCOUNT_FORMAT'
          });
        }
      }

      // Update user fields
      const updateData = {};
      if (display_name !== undefined) updateData.display_name = display_name.trim();
      if (country !== undefined) updateData.country = country.trim();
      if (mtn_mobile_number !== undefined) {
        // Normalize phone number format
        let normalizedPhone = mtn_mobile_number.replace(/\s+/g, '');
        if (normalizedPhone.startsWith('0')) {
          normalizedPhone = '+250' + normalizedPhone.substring(1);
        } else if (!normalizedPhone.startsWith('+')) {
          normalizedPhone = '+250' + normalizedPhone;
        }
        updateData.mtn_mobile_number = normalizedPhone;
      }
      if (bank_account !== undefined) updateData.bank_account = bank_account.trim();

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
          bank_account: updatedUser.bank_account,
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
  },

  // Update phone number specifically (requires authentication)
  updatePhoneNumber: async (req, res) => {
    try {
      const user = req.user;
      const { mtn_mobile_number } = req.body;

      // Validate required field
      if (!mtn_mobile_number) {
        return res.status(400).json({
          error: 'MTN mobile number is required',
          code: 'MISSING_PHONE_NUMBER'
        });
      }

      // Validate phone number format
      const phoneRegex = /^(\+?250|0)?[7][0-9]{8}$/;
      if (!phoneRegex.test(mtn_mobile_number.replace(/\s+/g, ''))) {
        return res.status(400).json({
          error: 'Invalid MTN mobile number format. Please use format: +25078XXXXXXX or 078XXXXXXX',
          code: 'INVALID_PHONE_FORMAT'
        });
      }

      // Normalize phone number format
      let normalizedPhone = mtn_mobile_number.replace(/\s+/g, '');
      if (normalizedPhone.startsWith('0')) {
        normalizedPhone = '+250' + normalizedPhone.substring(1);
      } else if (!normalizedPhone.startsWith('+')) {
        normalizedPhone = '+250' + normalizedPhone;
      }

      // Check if phone number is already in use by another user
      const existingUser = await User.findOne({ 
        mtn_mobile_number: normalizedPhone,
        email: { $ne: user.email } // Exclude current user
      });

      if (existingUser) {
        return res.status(400).json({
          error: 'This phone number is already registered to another account',
          code: 'PHONE_NUMBER_EXISTS'
        });
      }

      // Update user phone number
      const updatedUser = await User.findOneAndUpdate(
        { email: user.email },
        { mtn_mobile_number: normalizedPhone },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ 
          error: 'User not found',
          code: 'USER_NOT_FOUND'
        });
      }

      res.json({
        message: 'Phone number updated successfully',
        mtn_mobile_number: updatedUser.mtn_mobile_number
      });
    } catch (error) {
      console.error('Phone number update error:', error);
      res.status(500).json({ 
        error: 'Failed to update phone number',
        code: 'PHONE_UPDATE_ERROR'
      });
    }
  },

  // Update bank account specifically (requires authentication)
  updateBankAccount: async (req, res) => {
    try {
      const user = req.user;
      const { bank_account } = req.body;

      // Validate required field
      if (!bank_account) {
        return res.status(400).json({
          error: 'Bank account number is required',
          code: 'MISSING_BANK_ACCOUNT'
        });
      }

      // Validate bank account format
      const bankAccountRegex = /^[0-9]{8,20}$/;
      if (!bankAccountRegex.test(bank_account)) {
        return res.status(400).json({
          error: 'Invalid bank account format. Please use numeric format (8-20 digits)',
          code: 'INVALID_BANK_ACCOUNT_FORMAT'
        });
      }

      // Check if bank account is already in use by another user
      const existingUser = await User.findOne({ 
        bank_account: bank_account.trim(),
        email: { $ne: user.email } // Exclude current user
      });

      if (existingUser) {
        return res.status(400).json({
          error: 'This bank account is already registered to another account',
          code: 'BANK_ACCOUNT_EXISTS'
        });
      }

      // Update user bank account
      const updatedUser = await User.findOneAndUpdate(
        { email: user.email },
        { bank_account: bank_account.trim() },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ 
          error: 'User not found',
          code: 'USER_NOT_FOUND'
        });
      }

      res.json({
        message: 'Bank account updated successfully',
        bank_account: updatedUser.bank_account
      });
    } catch (error) {
      console.error('Bank account update error:', error);
      res.status(500).json({ 
        error: 'Failed to update bank account',
        code: 'BANK_ACCOUNT_UPDATE_ERROR'
      });
    }
  }
};

module.exports = authController; 