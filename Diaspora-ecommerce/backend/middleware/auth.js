const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (roles = []) => {
  if (typeof roles === 'string') roles = [roles];
  return (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: 'Missing token' });
    const token = header.split(' ')[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
      if (roles.length && !roles.includes(payload.role)) return res.status(403).json({ message: 'Forbidden' });
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}

module.exports = auth;
