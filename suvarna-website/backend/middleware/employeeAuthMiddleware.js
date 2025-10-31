import prisma from '../lib/prisma.js';
import { verifyToken } from '../utils/jwt.js';

export const employeeAuthMiddleware = async (req, res, next) => {
  try {
    // Try to get token from cookie first
    let token = req.cookies.employee_token;
    
    // If no cookie, try Authorization header
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.replace('Bearer ', '');
    }

    if (!token) {
      return res.status(401).json({
        error: {
          message: 'Employee authentication required. Please log in.',
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

    // Fetch employee from database to ensure they're active and exist
    const employee = await prisma.employee.findUnique({
      where: { id: decoded.userId },
      include: {
        manager: true
      }
    });

    if (!employee || !employee.active) {
      return res.status(401).json({
        error: {
          message: 'Employee account not found or inactive',
          status: 401
        }
      });
    }

    // Attach employee info to request
    req.employee = {
      id: employee.id,
      email: employee.email,
      firstName: employee.firstName,
      lastName: employee.lastName,
      role: employee.role,
      phone: employee.phone,
      managerId: employee.managerId,
      manager: employee.manager
    };
    
    next();
  } catch (error) {
    console.error('Employee authentication error:', error);
    return res.status(401).json({
      error: {
        message: 'Employee authentication failed',
        status: 401
      }
    });
  }
};

