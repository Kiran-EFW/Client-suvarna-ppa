import express from 'express';
import prisma from '../lib/prisma.js';
import { employeeAuthMiddleware } from '../middleware/employeeAuthMiddleware.js';
import { requireOwnLead } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Apply authentication to all activity routes
router.use(employeeAuthMiddleware);

// GET /api/crm/leads/:id/activities - List activities for lead
router.get('/leads/:id/activities', requireOwnLead, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { limit = 50 } = req.query;

    const activities = await prisma.activity.findMany({
      where: { leadId: id },
      include: {
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: parseInt(limit)
    });

    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    console.error('List activities error:', error);
    next(error);
  }
});

// POST /api/crm/leads/:id/activities - Add activity
router.post('/leads/:id/activities', requireOwnLead, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type, subject, description, outcome, duration } = req.body;

    // Validation
    if (!type) {
      return res.status(400).json({
        error: {
          message: 'Activity type is required',
          status: 400
        }
      });
    }

    const validTypes = ['call', 'email', 'meeting', 'note', 'status_change'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        error: {
          message: `Invalid activity type. Must be one of: ${validTypes.join(', ')}`,
          status: 400
        }
      });
    }

    // Verify lead exists
    const lead = await prisma.lead.findUnique({
      where: { id }
    });

    if (!lead) {
      return res.status(404).json({
        error: {
          message: 'Lead not found',
          status: 404
        }
      });
    }

    // Create activity
    const activity = await prisma.activity.create({
      data: {
        leadId: id,
        employeeId: req.employee.id,
        type,
        subject,
        description,
        outcome,
        duration
      },
      include: {
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    // Update lead's lastContactedAt
    await prisma.lead.update({
      where: { id },
      data: {
        lastContactedAt: new Date()
      }
    });

    res.status(201).json({
      success: true,
      message: 'Activity created successfully',
      data: activity
    });
  } catch (error) {
    console.error('Create activity error:', error);
    next(error);
  }
});

// PUT /api/crm/activities/:id - Update activity
router.put('/activities/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { subject, description, outcome, duration } = req.body;

    // Check if activity exists
    const existingActivity = await prisma.activity.findUnique({
      where: { id }
    });

    if (!existingActivity) {
      return res.status(404).json({
        error: {
          message: 'Activity not found',
          status: 404
        }
      });
    }

    // Check ownership - only the creator or their manager can update
    if (existingActivity.employeeId !== req.employee.id) {
      // Check if user is a manager
      if (!['super_admin', 'manager'].includes(req.employee.role)) {
        return res.status(403).json({
          error: {
            message: 'You can only update your own activities',
            status: 403
          }
        });
      }
    }

    // Update activity
    const activity = await prisma.activity.update({
      where: { id },
      data: {
        subject,
        description,
        outcome,
        duration
      },
      include: {
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    res.json({
      success: true,
      message: 'Activity updated successfully',
      data: activity
    });
  } catch (error) {
    console.error('Update activity error:', error);
    next(error);
  }
});

// DELETE /api/crm/activities/:id - Delete activity
router.delete('/activities/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if activity exists
    const existingActivity = await prisma.activity.findUnique({
      where: { id }
    });

    if (!existingActivity) {
      return res.status(404).json({
        error: {
          message: 'Activity not found',
          status: 404
        }
      });
    }

    // Check ownership - only the creator or their manager can delete
    if (existingActivity.employeeId !== req.employee.id) {
      // Check if user is a manager
      if (!['super_admin', 'manager'].includes(req.employee.role)) {
        return res.status(403).json({
          error: {
            message: 'You can only delete your own activities',
            status: 403
          }
        });
      }
    }

    // Delete activity
    await prisma.activity.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Activity deleted successfully'
    });
  } catch (error) {
    console.error('Delete activity error:', error);
    next(error);
  }
});

export default router;

