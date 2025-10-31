import express from 'express';
import prisma from '../lib/prisma.js';
import { employeeAuthMiddleware } from '../middleware/employeeAuthMiddleware.js';
import { requireOwnLead, requireManager } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Apply authentication to all CRM routes
router.use(employeeAuthMiddleware);

// GET /api/crm/leads - List leads with filters & pagination
router.get('/leads', async (req, res, next) => {
  try {
    const {
      status,
      priority,
      source,
      assignedToId,
      search,
      page = 1,
      limit = 50
    } = req.query;

    // Build where clause based on filters and role
    let where = {};

    // Agents can only see their assigned leads
    if (req.employee.role === 'agent') {
      where.assignedToId = req.employee.id;
    } else if (req.employee.role === 'manager') {
      // Managers can see leads assigned to their agents
      where.assignedTo = {
        managerId: req.employee.id
      };
    }
    // Super admins can see all leads (no additional filter)

    // Apply filters
    if (status) {
      where.status = status;
    }
    if (priority) {
      where.priority = priority;
    }
    if (source) {
      where.source = source;
    }
    if (assignedToId && ['super_admin', 'manager'].includes(req.employee.role)) {
      where.assignedToId = assignedToId;
    }
    if (search) {
      where.OR = [
        { companyName: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email1: { contains: search, mode: 'insensitive' } },
        { mobile1: { contains: search } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get leads with pagination
    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        include: {
          assignedTo: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              role: true
            }
          },
          createdBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          },
          _count: {
            select: {
              activities: true,
              tasks: true
            }
          }
        },
        orderBy: {
          updatedAt: 'desc'
        },
        skip,
        take: parseInt(limit)
      }),
      prisma.lead.count({ where })
    ]);

    res.json({
      success: true,
      data: leads,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('List leads error:', error);
    next(error);
  }
});

// GET /api/crm/leads/:id - Get single lead details
router.get('/leads/:id', requireOwnLead, async (req, res, next) => {
  try {
    const { id } = req.params;

    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        assignedTo: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            phone: true
          }
        },
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        activities: {
          include: {
            employee: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 20
        },
        tasks: {
          include: {
            assignedTo: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        documents: {
          include: {
            uploadedBy: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!lead) {
      return res.status(404).json({
        error: {
          message: 'Lead not found',
          status: 404
        }
      });
    }

    res.json({
      success: true,
      data: lead
    });
  } catch (error) {
    console.error('Get lead error:', error);
    next(error);
  }
});

// POST /api/crm/leads - Create manual lead (Manager/Agent)
router.post('/leads', async (req, res, next) => {
  try {
    const {
      companyName,
      location,
      state,
      creditRating,
      firstName,
      lastName,
      designation,
      mobile1,
      mobile2,
      landline,
      landline2,
      email1,
      email2,
      priority,
      source,
      remarks,
      estimatedValue,
      assignedToId
    } = req.body;

    // Validation
    if (!companyName || !firstName || !mobile1 || !email1) {
      return res.status(400).json({
        error: {
          message: 'Missing required fields: companyName, firstName, mobile1, email1',
          status: 400
        }
      });
    }

    // Check assignment permissions
    if (assignedToId) {
      // Only managers and super admins can assign leads
      if (!['super_admin', 'manager'].includes(req.employee.role)) {
        return res.status(403).json({
          error: {
            message: 'Only managers and super admins can assign leads',
            status: 403
          }
        });
      }

      // If manager, validate the agent is in their team
      if (req.employee.role === 'manager') {
        const agent = await prisma.employee.findUnique({
          where: { id: assignedToId }
        });

        if (!agent || agent.managerId !== req.employee.id) {
          return res.status(403).json({
            error: {
              message: 'You can only assign leads to your team members',
              status: 403
            }
          });
        }
      }
    } else {
      // If no assignment, auto-assign to current employee if they're an agent
      if (req.employee.role === 'agent') {
        assignedToId = req.employee.id;
      }
    }

    const lead = await prisma.lead.create({
      data: {
        companyName,
        location,
        state,
        creditRating,
        firstName,
        lastName,
        designation,
        mobile1,
        mobile2,
        landline,
        landline2,
        email1,
        email2,
        priority: priority || 'medium',
        source: source || 'manual',
        remarks,
        estimatedValue,
        assignedToId,
        createdById: req.employee.id
      },
      include: {
        assignedTo: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: lead
    });
  } catch (error) {
    console.error('Create lead error:', error);
    next(error);
  }
});

// PUT /api/crm/leads/:id - Update lead
router.put('/leads/:id', requireOwnLead, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove fields that shouldn't be updated directly
    delete updateData.id;
    delete updateData.createdAt;
    delete updateData.createdById;

    const lead = await prisma.lead.update({
      where: { id },
      data: updateData,
      include: {
        assignedTo: {
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
      message: 'Lead updated successfully',
      data: lead
    });
  } catch (error) {
    console.error('Update lead error:', error);
    next(error);
  }
});

// PUT /api/crm/leads/:id/assign - Assign lead to agent
router.put('/leads/:id/assign', requireManager, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { assignedToId } = req.body;

    if (!assignedToId) {
      return res.status(400).json({
        error: {
          message: 'assignedToId is required',
          status: 400
        }
      });
    }

    // If manager, validate the agent is in their team
    if (req.employee.role === 'manager') {
      const agent = await prisma.employee.findUnique({
        where: { id: assignedToId }
      });

      if (!agent || agent.managerId !== req.employee.id) {
        return res.status(403).json({
          error: {
            message: 'You can only assign leads to your team members',
            status: 403
          }
        });
      }
    }

    const lead = await prisma.lead.update({
      where: { id },
      data: { assignedToId },
      include: {
        assignedTo: {
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
      message: 'Lead assigned successfully',
      data: lead
    });
  } catch (error) {
    console.error('Assign lead error:', error);
    next(error);
  }
});

// PUT /api/crm/leads/:id/status - Update lead status
router.put('/leads/:id/status', requireOwnLead, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        error: {
          message: 'status is required',
          status: 400
        }
      });
    }

    const validStatuses = ['new', 'contacted', 'meeting_scheduled', 'proposal_sent', 'negotiation', 'won', 'lost'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: {
          message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
          status: 400
        }
      });
    }

    const lead = await prisma.lead.update({
      where: { id },
      data: {
        status,
        // Update lastContactedAt if status changed
        lastContactedAt: new Date()
      },
      include: {
        assignedTo: {
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
      message: 'Lead status updated successfully',
      data: lead
    });
  } catch (error) {
    console.error('Update lead status error:', error);
    next(error);
  }
});

// GET /api/crm/leads/stats - Dashboard statistics
router.get('/leads/stats', async (req, res, next) => {
  try {
    let where = {};

    // Agents can only see stats for their assigned leads
    if (req.employee.role === 'agent') {
      where.assignedToId = req.employee.id;
    } else if (req.employee.role === 'manager') {
      // Get team member IDs
      const teamMembers = await prisma.employee.findMany({
        where: { managerId: req.employee.id },
        select: { id: true }
      });
      const teamIds = teamMembers.map(m => m.id);
      if (teamIds.length > 0) {
        where.assignedToId = { in: teamIds };
      } else {
        // No team members, return empty stats
        return res.json({
          success: true,
          data: {
            totalLeads: 0,
            recentLeads: 0,
            statusCounts: [],
            priorityCounts: [],
            winLossRatio: {
              won: 0,
              lost: 0,
              total: 0,
              winRate: '0.00'
            },
            pipelineValue: 0
          }
        });
      }
    }
    // Super admins can see all stats (no additional filter)

    // Get counts by status
    const statusCounts = await prisma.lead.groupBy({
      by: ['status'],
      where,
      _count: true
    });

    // Get counts by priority
    const priorityCounts = await prisma.lead.groupBy({
      by: ['priority'],
      where,
      _count: true
    });

    // Get total count
    const totalLeads = await prisma.lead.count({ where });

    // Get recent leads count (last 7 days)
    const recentLeads = await prisma.lead.count({
      where: {
        ...where,
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      }
    });

    // Get won/lost ratio
    const wonLeads = await prisma.lead.count({
      where: {
        ...where,
        status: 'won'
      }
    });

    const lostLeads = await prisma.lead.count({
      where: {
        ...where,
        status: 'lost'
      }
    });

    // Get total pipeline value
    const pipelineValue = await prisma.lead.aggregate({
      where: {
        ...where,
        status: {
          notIn: ['won', 'lost']
        }
      },
      _sum: {
        estimatedValue: true
      }
    });

    res.json({
      success: true,
      data: {
        totalLeads,
        recentLeads,
        statusCounts: statusCounts.map(s => ({ status: s.status, count: s._count })),
        priorityCounts: priorityCounts.map(p => ({ priority: p.priority, count: p._count })),
        winLossRatio: {
          won: wonLeads,
          lost: lostLeads,
          total: wonLeads + lostLeads,
          winRate: wonLeads + lostLeads > 0 ? (wonLeads / (wonLeads + lostLeads) * 100).toFixed(2) : 0
        },
        pipelineValue: pipelineValue._sum.estimatedValue || 0
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    next(error);
  }
});

export default router;

