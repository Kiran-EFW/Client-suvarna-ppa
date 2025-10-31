import express from 'express';
import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import { generateToken } from '../utils/jwt.js';

const router = express.Router();

// POST /api/auth/register - Register a new buyer
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, companyName, firstName, lastName, location, state, mobile } = req.body;

    // Validation
    if (!email || !password || !companyName || !firstName || !lastName || !location || !state || !mobile) {
      return res.status(400).json({
        error: {
          message: 'Missing required fields',
          status: 400
        }
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        error: {
          message: 'Email already registered',
          status: 400
        }
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        companyName,
        firstName,
        lastName,
        location,
        state,
        mobile
      },
      select: {
        id: true,
        email: true,
        companyName: true,
        firstName: true,
        lastName: true,
        createdAt: true
      }
    });

    // Generate JWT token
    const token = generateToken(user.id, user.email);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    next(error);
  }
});

// POST /api/auth/login - Login buyer
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: {
          message: 'Email and password are required',
          status: 400
        }
      });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({
        error: {
          message: 'Invalid email or password',
          status: 401
        }
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: {
          message: 'Invalid email or password',
          status: 401
        }
      });
    }

    // Generate JWT token
    const token = generateToken(user.id, user.email);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          companyName: user.companyName,
          firstName: user.firstName,
          lastName: user.lastName
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
});

// POST /api/auth/logout - Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

// GET /api/auth/me - Get current user
router.get('/me', async (req, res, next) => {
  try {
    // Try to get token
    let token = req.cookies.token;
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.replace('Bearer ', '');
    }

    if (!token) {
      return res.status(401).json({
        error: {
          message: 'Not authenticated',
          status: 401
        }
      });
    }

    const { verifyToken } = await import('../utils/jwt.js');
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        error: {
          message: 'Invalid token',
          status: 401
        }
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        companyName: true,
        firstName: true,
        lastName: true,
        location: true,
        state: true,
        mobile: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({
        error: {
          message: 'User not found',
          status: 404
        }
      });
    }

    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    console.error('Get user error:', error);
    next(error);
  }
});

export default router;

