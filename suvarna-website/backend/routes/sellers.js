import express from 'express';
import prisma from '../lib/prisma.js';

const router = express.Router();

// POST /api/sellers/register - Public seller registration
router.post('/register', async (req, res, next) => {
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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      return res.status(400).json({
        error: {
          message: 'Invalid email format',
          status: 400
        }
      });
    }

    // Validate capacity and price are positive numbers
    const capacityNum = parseFloat(capacity);
    const askingPriceNum = parseFloat(askingPrice);
    
    if (isNaN(capacityNum) || capacityNum <= 0) {
      return res.status(400).json({
        error: {
          message: 'Capacity must be a positive number',
          status: 400
        }
      });
    }

    if (isNaN(askingPriceNum) || askingPriceNum <= 0) {
      return res.status(400).json({
        error: {
          message: 'Asking price must be a positive number',
          status: 400
        }
      });
    }

    // Create seller with "pending" status (admin needs to verify)
    const seller = await prisma.seller.create({
      data: {
        companyName,
        contactPerson,
        contactEmail,
        contactPhone,
        projectType,
        capacity: capacityNum,
        location,
        state,
        askingPrice: askingPriceNum,
        status: 'active' // Will be reviewed by admin
      }
    });

    res.status(201).json({
      success: true,
      message: 'Seller registration submitted successfully. Our team will review and contact you within 2-3 business days.',
      data: { seller }
    });
  } catch (error) {
    console.error('Seller registration error:', error);
    next(error);
  }
});

export default router;

