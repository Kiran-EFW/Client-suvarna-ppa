import express from 'express';
import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import { generateToken } from '../utils/jwt.js';
import { adminAuthMiddleware } from '../middleware/adminAuthMiddleware.js';
import { sendMatchNotificationEmail } from '../services/emailService.js';

const router = express.Router();

// Admin login (separate from buyer login)
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

    // Check if admin credentials (simple check against env for now)
    // TODO: In production, create Admin table or role-based auth
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (email !== adminEmail || !adminPasswordHash) {
      return res.status(401).json({
        error: {
          message: 'Invalid admin credentials',
          status: 401
        }
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, adminPasswordHash);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: {
          message: 'Invalid admin credentials',
          status: 401
        }
      });
    }

    // Generate JWT token with admin role
    const token = generateToken('admin', email, 'admin');

    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours for admin
    });

    res.json({
      success: true,
      message: 'Admin login successful',
      data: { token, email }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    next(error);
  }
});

// GET /api/admin/me - Get current admin info
router.get('/me', adminAuthMiddleware, async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: {
        email: req.adminEmail,
        isAdmin: true
      }
    });
  } catch (error) {
    console.error('Get admin info error:', error);
    next(error);
  }
});

// POST /api/admin/logout - Admin logout
router.post('/logout', adminAuthMiddleware, async (req, res, next) => {
  try {
    res.clearCookie('admin_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    res.json({
      success: true,
      message: 'Admin logged out successfully'
    });
  } catch (error) {
    console.error('Admin logout error:', error);
    next(error);
  }
});

// Middleware to protect admin routes - requires admin authentication
router.use(adminAuthMiddleware);

// GET /api/admin/buyers - List all registered buyers
router.get('/buyers', async (req, res, next) => {
  try {
    const buyers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        companyName: true,
        firstName: true,
        lastName: true,
        location: true,
        state: true,
        mobile: true,
        createdAt: true,
        _count: {
          select: {
            matches: true,
            termsAgreements: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: { buyers }
    });
  } catch (error) {
    console.error('Get buyers error:', error);
    next(error);
  }
});

// GET /api/admin/buyers/:id - View buyer details
router.get('/buyers/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const buyer = await prisma.user.findUnique({
      where: { id },
      include: {
        matches: {
          include: {
            seller: true,
            termsAgreement: true
          },
          orderBy: { matchedAt: 'desc' }
        }
      }
    });

    if (!buyer) {
      return res.status(404).json({
        error: {
          message: 'Buyer not found',
          status: 404
        }
      });
    }

    // Remove password hash from response
    const { passwordHash, ...buyerData } = buyer;

    res.json({
      success: true,
      data: { buyer: buyerData }
    });
  } catch (error) {
    console.error('Get buyer error:', error);
    next(error);
  }
});

// GET /api/admin/sellers - List all sellers
router.get('/sellers', async (req, res, next) => {
  try {
    const sellers = await prisma.seller.findMany({
      include: {
        _count: {
          select: {
            matches: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: { sellers }
    });
  } catch (error) {
    console.error('Get sellers error:', error);
    next(error);
  }
});

// POST /api/admin/sellers - Add new seller
router.post('/sellers', async (req, res, next) => {
  try {
    const {
      companyName,
      contactPerson,
      contactEmail,
      contactPhone,
      projectType,
      capacity,
      location,
      state,
      askingPrice
    } = req.body;

    // Validation
    if (!companyName || !contactPerson || !contactEmail || !contactPhone ||
        !projectType || !capacity || !location || !state || !askingPrice) {
      return res.status(400).json({
        error: {
          message: 'Missing required fields',
          status: 400
        }
      });
    }

    const seller = await prisma.seller.create({
      data: {
        companyName,
        contactPerson,
        contactEmail,
        contactPhone,
        projectType,
        capacity: parseFloat(capacity),
        location,
        state,
        askingPrice: parseFloat(askingPrice)
      }
    });

    res.status(201).json({
      success: true,
      message: 'Seller added successfully',
      data: { seller }
    });
  } catch (error) {
    console.error('Add seller error:', error);
    next(error);
  }
});

// PUT /api/admin/sellers/:id - Update seller
router.put('/sellers/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      companyName,
      contactPerson,
      contactEmail,
      contactPhone,
      projectType,
      capacity,
      location,
      state,
      askingPrice,
      status
    } = req.body;

    const seller = await prisma.seller.update({
      where: { id },
      data: {
        ...(companyName && { companyName }),
        ...(contactPerson && { contactPerson }),
        ...(contactEmail && { contactEmail }),
        ...(contactPhone && { contactPhone }),
        ...(projectType && { projectType }),
        ...(capacity && { capacity: parseFloat(capacity) }),
        ...(location && { location }),
        ...(state && { state }),
        ...(askingPrice && { askingPrice: parseFloat(askingPrice) }),
        ...(status && { status })
      }
    });

    res.json({
      success: true,
      message: 'Seller updated successfully',
      data: { seller }
    });
  } catch (error) {
    console.error('Update seller error:', error);
    next(error);
  }
});

// DELETE /api/admin/sellers/:id - Remove seller
router.delete('/sellers/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if seller has any active matches
    const matches = await prisma.match.findMany({
      where: {
        sellerId: id,
        status: { not: 'completed' }
      }
    });

    if (matches.length > 0) {
      return res.status(400).json({
        error: {
          message: 'Cannot delete seller with active matches',
          status: 400
        }
      });
    }

    await prisma.seller.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Seller deleted successfully'
    });
  } catch (error) {
    console.error('Delete seller error:', error);
    next(error);
  }
});

// GET /api/admin/matches - View all matches
router.get('/matches', async (req, res, next) => {
  try {
    const matches = await prisma.match.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            companyName: true,
            firstName: true,
            lastName: true
          }
        },
        seller: true,
        termsAgreement: true
      },
      orderBy: { matchedAt: 'desc' }
    });

    res.json({
      success: true,
      data: { matches }
    });
  } catch (error) {
    console.error('Get matches error:', error);
    next(error);
  }
});

// POST /api/admin/matches - Create buyer-seller match
router.post('/matches', async (req, res, next) => {
  try {
    const { userId, sellerId } = req.body;

    if (!userId || !sellerId) {
      return res.status(400).json({
        error: {
          message: 'userId and sellerId are required',
          status: 400
        }
      });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({
        error: {
          message: 'Buyer not found',
          status: 404
        }
      });
    }

    // Check if seller exists
    const seller = await prisma.seller.findUnique({
      where: { id: sellerId }
    });

    if (!seller) {
      return res.status(404).json({
        error: {
          message: 'Seller not found',
          status: 404
        }
      });
    }

    // Check if match already exists
    const existingMatch = await prisma.match.findFirst({
      where: {
        userId,
        sellerId
      }
    });

    if (existingMatch) {
      return res.status(400).json({
        error: {
          message: 'Match already exists',
          status: 400
        }
      });
    }

    // Create match
    const match = await prisma.match.create({
      data: {
        userId,
        sellerId
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            companyName: true,
            firstName: true,
            lastName: true
          }
        },
        seller: {
          select: {
            id: true,
            companyName: true,
            projectType: true,
            capacity: true,
            location: true,
            state: true,
            askingPrice: true
          }
        }
      }
    });

    // Send email notification to buyer
    try {
      await sendMatchNotificationEmail(
        match.user.email,
        `${match.user.firstName} ${match.user.lastName}`,
        match.seller
      );
    } catch (error) {
      console.error('Failed to send match notification email:', error);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Match created successfully',
      data: { match }
    });
  } catch (error) {
    console.error('Create match error:', error);
    next(error);
  }
});

// DELETE /api/admin/matches/:id - Remove match
router.delete('/matches/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if terms agreed
    const match = await prisma.match.findUnique({
      where: { id },
      include: { termsAgreement: true }
    });

    if (!match) {
      return res.status(404).json({
        error: {
          message: 'Match not found',
          status: 404
        }
      });
    }

    if (match.termsAgreement) {
      return res.status(400).json({
        error: {
          message: 'Cannot delete match with terms agreement',
          status: 400
        }
      });
    }

    await prisma.match.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Match deleted successfully'
    });
  } catch (error) {
    console.error('Delete match error:', error);
    next(error);
  }
});

export default router;
