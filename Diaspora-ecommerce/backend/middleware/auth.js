const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Middleware d’authentification et d’autorisation
 * @param {Array|string} roles - Rôles autorisés (ex: 'fournisseur', 'admin_general')
 */
const auth = (roles = []) => {
  // Permet d’accepter une seule string comme rôle
  if (typeof roles === 'string') roles = [roles];

  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Missing or malformed token' });
      }

      const token = authHeader.split(' ')[1];

      if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET not defined in .env');
        return res.status(500).json({ message: 'Server misconfiguration' });
      }

      // Vérification du token
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      
      // Stocke les infos de l’utilisateur dans req.user
      req.user = payload;
      console.log('✅ Authenticated user:', payload);

      // Vérifie si le rôle est autorisé
      if (roles.length && !roles.includes(payload.role)) {
        return res.status(403).json({ message: 'Forbidden: role not allowed' });
      }

      next();
    } catch (err) {
      console.error('❌ Auth error:', err.message);
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      } else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      }
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
};

module.exports = auth;