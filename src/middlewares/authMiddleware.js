const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/error');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ status: "error", message: "Authorization token missing or invalid" });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the same secret used to sign the token
        req.user = {
            token: token,
            user_id : decoded.user_id,
            email: decoded.email,
            role_id: decoded.role,  
          };
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error(error);
      return res.status(403).json({ status: "error", message: "Invalid or expired token" });
    }
  };
  


module.exports = authMiddleware;
