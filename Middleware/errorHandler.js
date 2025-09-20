const errorHandler = (error, req, res, next) => {
  console.error('Unhandled error:', error);
  
  // MongoDB validation errors
  if (error.name === 'ValidationError') {
    return res.status(400).json({ 
      error: 'Validation error', 
      details: error.message 
    });
  }
  
  // MongoDB duplicate key error
  if (error.code === 11000) {
    return res.status(400).json({ 
      error: 'Duplicate entry', 
      details: 'Resource already exists' 
    });
  }
  
  // MongoDB cast error
  if (error.name === 'CastError') {
    return res.status(400).json({ 
      error: 'Invalid ID format' 
    });
  }
  
  // Default error
  res.status(500).json({ error: 'Internal server error' });
};

module.exports = errorHandler;