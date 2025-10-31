import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import prisma from '../lib/prisma.js';
import { maskSellerName } from '../utils/maskSellerName.js';
import { sendTermsAgreementNotificationEmail } from '../services/emailService.js';

const router = express.Router();

// Apply auth middleware to all buyer routes
router.use(authMiddleware);

// GET /api/buyer/matches - Get all matches for logged-in buyer
router.get('/matches', async (req, res, next) => {
  try {
    const userId = req.userId;

    const matches = await prisma.match.findMany({
      where: { userId },
      include: {
        seller: true,
        termsAgreement: true
      },
      orderBy: { matchedAt: 'desc' }
    });

    // Mask seller names unless terms agreed
    const maskedMatches = matches.map(match => {
      const isTermsAgreed = !!match.termsAgreement;
      return {
        id: match.id,
        sellerId: match.sellerId,
        status: match.status,
        matchedAt: match.matchedAt,
        seller: {
          id: match.seller.id,
          companyName: isTermsAgreed ? match.seller.companyName : maskSellerName(match.seller.id),
          contactPerson: isTermsAgreed ? match.seller.contactPerson : 'Contact Information Available After Terms Agreement',
          contactEmail: isTermsAgreed ? match.seller.contactEmail : null,
          contactPhone: isTermsAgreed ? match.seller.contactPhone : null,
          projectType: match.seller.projectType,
          capacity: match.seller.capacity,
          location: match.seller.location,
          state: match.seller.state,
          askingPrice: match.seller.askingPrice
        },
        termsAgreed: isTermsAgreed,
        termsAgreedAt: match.termsAgreement?.agreedAt || null
      };
    });

    res.json({
      success: true,
      data: { matches: maskedMatches }
    });
  } catch (error) {
    console.error('Get matches error:', error);
    next(error);
  }
});

// POST /api/buyer/terms/:matchId - Agree to terms for a match
router.post('/terms/:matchId', async (req, res, next) => {
  try {
    const { matchId } = req.params;
    const userId = req.userId;

    // Verify match belongs to user
    const match = await prisma.match.findFirst({
      where: {
        id: matchId,
        userId: userId
      }
    });

    if (!match) {
      return res.status(404).json({
        error: {
          message: 'Match not found',
          status: 404
        }
      });
    }

    // Check if already agreed
    const existingAgreement = await prisma.termsAgreement.findUnique({
      where: { matchId }
    });

    if (existingAgreement) {
      return res.status(400).json({
        error: {
          message: 'Terms already agreed for this match',
          status: 400
        }
      });
    }

    // Get IP address
    const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';

    // Create terms agreement
    const agreement = await prisma.termsAgreement.create({
      data: {
        matchId,
        userId,
        ipAddress
      }
    });

    // Update match status
    await prisma.match.update({
      where: { id: matchId },
      data: { status: 'terms_agreed' }
    });

    // Get full seller and buyer details for email
    const updatedMatch = await prisma.match.findUnique({
      where: { id: matchId },
      include: {
        seller: true,
        user: true
      }
    });

    // Send email notification to admin
    try {
      await sendTermsAgreementNotificationEmail(updatedMatch.user, updatedMatch.seller);
    } catch (error) {
      console.error('Failed to send terms agreement email:', error);
      // Don't fail the request if email fails
    }

    res.json({
      success: true,
      message: 'Terms agreed successfully',
      data: {
        seller: updatedMatch.seller
      }
    });
  } catch (error) {
    console.error('Terms agreement error:', error);
    next(error);
  }
});

// GET /api/buyer/seller/:matchId - Get full seller details (after terms)
router.get('/seller/:matchId', async (req, res, next) => {
  try {
    const { matchId } = req.params;
    const userId = req.userId;

    // Verify match belongs to user
    const match = await prisma.match.findFirst({
      where: {
        id: matchId,
        userId: userId
      },
      include: {
        seller: true,
        termsAgreement: true
      }
    });

    if (!match) {
      return res.status(404).json({
        error: {
          message: 'Match not found',
          status: 404
        }
      });
    }

    // Check if terms agreed
    if (!match.termsAgreement) {
      return res.status(403).json({
        error: {
          message: 'Must agree to terms before viewing seller details',
          status: 403
        }
      });
    }

    res.json({
      success: true,
      data: { seller: match.seller }
    });
  } catch (error) {
    console.error('Get seller error:', error);
    next(error);
  }
});

export default router;

