import express from 'express';
import prisma from '../lib/prisma.js';
import { employeeAuthMiddleware } from '../middleware/employeeAuthMiddleware.js';
import { requireManager } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Apply authentication to all task routes
router.use(employeeAuthMiddleware);

// GET /api/crm/tasks - List tasks for current user
router.get('/tasks', async (req, res, next) => {
  try {
    const { status, priority, dueDate } = req.query;

    let where = {};

    // Agents can only see their tasks
    if (req.employee.role === 'agent') {
      where.assignedToId = req.employee.id;
    } else if (req.employee.role === 'manager') {
      // Managers can see tasks assigned to their team
      where.assignedTo = {
        managerId: req.employee.id
      };
    }
    // Super admins can see all tasks (no additional filter)

    // Apply filters
    if (status) {
      where.status = status;
    }
    if (priority) {
      where.priority = priority;
    }
    if (dueDate) {
      where.dueDate = {
        lte: new Date(dueDate)
      };
    }

    const tasks = await prisma.task.findMany({
      where,
      include: {
        lead: {
          select: {
            id: true,
            companyName: true,
            firstName: true,
            lastName: true,
            status: true
          }
        },
        assignedTo: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy: [
        { status: 'asc' },
        { dueDate: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    res.json({
      success: true,
      data: tasks
    });
  } catch (error) {
    console.error('List tasks error:', error);
    next(error);
  }
});

// POST /api/crm/tasks - Create task
router.post('/tasks', async (req, res, next) => {
  try {
    const { leadId, title, description, priority, dueDate, assignedToId } = req.body;

    // Validation
    if (!leadId || !title) {
      return res.status(400).json({
        error: {
          message: 'leadId and title are required',
          status: 400
        }
      });
    }

    // Verify lead exists and user has access
    const lead = await prisma.lead.findUnique({
      where: { id: leadId }
    });

    if (!lead) {
      return res.status(404).json({
        error: {
          message: 'Lead not found',
          status: 404
        }
      });
    }

    // Check assignment - only managers can assign to others
    let taskAssignedToId = req.employee.id; // Default to current user

    if (assignedToId && assignedToId !== req.employee.id) {
      if (!['super_admin', 'manager'].includes(req.employee.role)) {
        return res.status(403).json({
          error: {
            message: 'Only managers and super admins can assign tasks to others',
            status: 403
          }
        });
      }

      // If manager, validate the assignee is in their team
      if (req.employee.role === 'manager') {
        const assignee = await prisma.employee.findUnique({
          where: { id: assignedToId }
        });

        if (!assignee || assignee.managerId !== req.employee.id) {
          return res.status(403).json({
            error: {
              message: 'You can only assign tasks to your team members',
              status: 403
            }
          });
        }
      }

      taskAssignedToId = assignedToId;
    }

    const task = await prisma.task.create({
      data: {
        leadId,
        assignedToId: taskAssignedToId,
        title,
        description,
        priority: priority || 'medium',
        dueDate: dueDate ? new Date(dueDate) : null
      },
      include: {
        lead: {
          select: {
            id: true,
            companyName: true,
            firstName: true,
            lastName: true
          }
        },
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
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    console.error('Create task error:', error);
    next(error);
  }
});

// PUT /api/crm/tasks/:id - Update task
router.put('/tasks/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, priority, dueDate, assignedToId } = req.body;

    // Check if task exists
    const existingTask = await prisma.task.findUnique({
      where: { id }
    });

    if (!existingTask) {
      return res.status(404).json({
        error: {
          message: 'Task not found',
          status: 404
        }
      });
    }

    // Check permissions - only assignee or manager can update
    if (existingTask.assignedToId !== req.employee.id) {
      if (!['super_admin', 'manager'].includes(req.employee.role)) {
        return res.status(403).json({
          error: {
            message: 'You can only update your own tasks',
            status: 403
          }
        });
      }
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (priority !== undefined) updateData.priority = priority;
    if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;
    if (assignedToId !== undefined) {
      // Check assignment permissions
      if (assignedToId !== existingTask.assignedToId && !['super_admin', 'manager'].includes(req.employee.role)) {
        return res.status(403).json({
          error: {
            message: 'Only managers and super admins can reassign tasks',
            status: 403
          }
        });
      }
      updateData.assignedToId = assignedToId;
    }

    const task = await prisma.task.update({
      where: { id },
      data: updateData,
      include: {
        lead: {
          select: {
            id: true,
            companyName: true,
            firstName: true,
            lastName: true
          }
        },
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
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    console.error('Update task error:', error);
    next(error);
  }
});

// PUT /api/crm/tasks/:id/complete - Mark task complete
router.put('/tasks/:id/complete', async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if task exists
    const existingTask = await prisma.task.findUnique({
      where: { id }
    });

    if (!existingTask) {
      return res.status(404).json({
        error: {
          message: 'Task not found',
          status: 404
        }
      });
    }

    // Only assignee can complete their task
    if (existingTask.assignedToId !== req.employee.id) {
      return res.status(403).json({
        error: {
          message: 'You can only complete your own tasks',
          status: 403
        }
      });
    }

    const task = await prisma.task.update({
      where: { id },
      data: {
        status: 'completed',
        completedAt: new Date()
      },
      include: {
        lead: {
          select: {
            id: true,
            companyName: true,
            firstName: true,
            lastName: true
          }
        },
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
      message: 'Task completed successfully',
      data: task
    });
  } catch (error) {
    console.error('Complete task error:', error);
    next(error);
  }
});

// DELETE /api/crm/tasks/:id - Delete task
router.delete('/tasks/:id', requireManager, async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if task exists
    const existingTask = await prisma.task.findUnique({
      where: { id }
    });

    if (!existingTask) {
      return res.status(404).json({
        error: {
          message: 'Task not found',
          status: 404
        }
      });
    }

    await prisma.task.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('Delete task error:', error);
    next(error);
  }
});

export default router;

