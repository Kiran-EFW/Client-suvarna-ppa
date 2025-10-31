import { verifyToken } from '../utils/jwt.js';

export const authMiddleware = (req, res, next) => {
  try {
    // Try to get token from cookie first
    let token = req.cookies.token;
    
    // If no cookie, try Authorization header
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.replace('Bearer ', '');
    }

    if (!token) {
      return res.status(401).json({
        error: {
          message: 'Authentication required. Please log in.',
          status: 401
        }
      });
    }

    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({
        error: {
          message: 'Invalid or expired token. Please log in again.',
          status: 401
        }
      });
    }

    // Attach user info to request
    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    
    next();
  } catch (error) {
    return res.status(401).json({
      error: {
        message: 'Authentication failed',
        status: 401
      }
    });
  }
};

