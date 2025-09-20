const requireAuth = (req, res, next) => {
  if (!req.session.userEmail) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

module.exports = { requireAuth };