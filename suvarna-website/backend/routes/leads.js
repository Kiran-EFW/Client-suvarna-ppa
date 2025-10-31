import express from 'express';
import prisma from '../lib/prisma.js';
import { submitLeadToZoho } from '../services/zohoService.js';
import { sendNewLeadNotification } from '../services/emailService.js';

const router = express.Router();

// POST /api/leads - Submit a new lead
router.post('/', async (req, res, next) => {
  try {
    const leadData = req.body;

    // Basic validation
    if (!leadData.companyName || !leadData.firstName || !leadData.email1 || !leadData.mobile1) {
      return res.status(400).json({
        error: {
          message: 'Missing required fields: companyName, firstName, email1, mobile1',
          status: 400
        }
      });
    }

    // Map frontend data to CRM Lead model
    const crmLeadData = {
      companyName: leadData.companyName,
      location: leadData.location || '',
      state: leadData.state || '',
      creditRating: leadData.creditRating || null,
      firstName: leadData.firstName,
      lastName: leadData.lastName || '',
      designation: leadData.designation || null,
      mobile1: leadData.mobile1,
      mobile2: leadData.mobile2 || null,
      landline: leadData.landline || null,
      landline2: leadData.landline2 || null,
      email1: leadData.email1,
      email2: leadData.email2 || null,
      status: 'new',
      priority: leadData.priority || 'medium',
      source: 'website',
      remarks: leadData.remarks || null,
      estimatedValue: null,
      assignedToId: null, // Can implement auto-assignment logic later
      createdById: null, // No created by when coming from website
    };

    // Save to internal CRM database
    const crmLead = await prisma.lead.create({
      data: crmLeadData,
    });

    // Optionally submit to Zoho CRM (if configured)
    let zohoResult = null;
    try {
      zohoResult = await submitLeadToZoho(leadData);
    } catch (zohoError) {
      console.warn('Zoho submission failed (continuing anyway):', zohoError);
      // Don't fail the entire request if Zoho fails
    }

    // Send email notification
    try {
      await sendNewLeadNotification(leadData);
    } catch (emailError) {
      console.warn('Email notification failed (continuing anyway):', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Lead submitted successfully',
      data: {
        id: crmLead.id,
        zoho: zohoResult
      }
    });
  } catch (error) {
    console.error('Error submitting lead:', error);
    next(error);
  }
});

// GET /api/leads/status - Check service status
router.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Leads API',
    timestamp: new Date().toISOString()
  });
});

export default router;
