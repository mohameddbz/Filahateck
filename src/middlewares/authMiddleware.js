const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/error');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ status: "error", message: "Authorization token missing or invalid" });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        userId: decoded.userId,
        role: decoded.role,
      };
      next();
    } catch (error) {
      console.error(error);
      return res.status(403).json({ status: "error", message: "Invalid or expired token" });
    }
  };
  


module.exports = authMiddleware;
