import { verifyToken } from '../utils/jwt.js';

export const adminAuthMiddleware = (req, res, next) => {
  try {
    // Try to get admin token from cookie first
    let token = req.cookies.admin_token;
    
    // If no cookie, try Authorization header with Bearer token
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.replace('Bearer ', '');
    }

    if (!token) {
      return res.status(401).json({
        error: {
          message: 'Admin authentication required. Please log in.',
          status: 401
        }
      });
    }

    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({
        error: {
          message: 'Invalid or expired admin token. Please log in again.',
          status: 401
        }
      });
    }

    // Check if this is an admin token (userId === 'admin' or check role)
    if (decoded.userId !== 'admin' && decoded.role !== 'admin') {
      return res.status(403).json({
        error: {
          message: 'Access forbidden. Admin privileges required.',
          status: 403
        }
      });
    }

    // Attach admin info to request
    req.adminEmail = decoded.email;
    req.isAdmin = true;
    
    next();
  } catch (error) {
    return res.status(401).json({
      error: {
        message: 'Admin authentication failed',
        status: 401
      }
    });
  }
};

