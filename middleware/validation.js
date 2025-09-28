// middleware/validation.js
const { body, query, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};
 
// Validation rules
const validateRegister = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('display_name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Display name must be between 2-50 characters'),
  body('mtn_mobile_number')
    .optional()
    .matches(/^\d{10}$/)
    .withMessage('MTN number must be 10 digits'),
  handleValidationErrors
];

const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

const validateAnswer = [
  body('questionId')
    .notEmpty()
    .withMessage('Question ID is required'),
  body('choice')
    .trim()
    .notEmpty()
    .withMessage('Choice is required'),
  handleValidationErrors
];

const validatePayout = [
  body('amount_coins')
    .isInt({ min: 1 })
    .withMessage('Amount must be a positive integer'),
  body('mtn_number')
    .matches(/^\d{10}$/)
    .withMessage('Valid MTN number (10 digits) is required'),
  handleValidationErrors
];

const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  handleValidationErrors
];

module.exports = {
  validateRegister,
  validateLogin,
  validateAnswer,
  validatePayout,
  validatePagination,
  handleValidationErrors
};