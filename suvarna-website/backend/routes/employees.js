import express from 'express';
import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import { generateToken } from '../utils/jwt.js';
import { employeeAuthMiddleware } from '../middleware/employeeAuthMiddleware.js';
import { requireRole, requireManager } from '../middleware/roleMiddleware.js';

const router = express.Router();

// POST /api/employees/login - Employee login
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

    // Find employee
    const employee = await prisma.employee.findUnique({
      where: { email }
    });

    if (!employee || !employee.active) {
      return res.status(401).json({
        error: {
          message: 'Invalid email or password',
          status: 401
        }
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, employee.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: {
          message: 'Invalid email or password',
          status: 401
        }
      });
    }

    // Generate JWT token
    const token = generateToken(employee.id, employee.email);

    // Set HTTP-only cookie
    res.cookie('employee_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      success: true,
      message: 'Employee login successful',
      data: {
        employee: {
          id: employee.id,
          email: employee.email,
          firstName: employee.firstName,
          lastName: employee.lastName,
          role: employee.role
        },
        token
      }
    });
  } catch (error) {
    console.error('Employee login error:', error);
    next(error);
  }
});

// GET /api/employees/me - Get current employee
router.get('/me', employeeAuthMiddleware, async (req, res, next) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: req.employee.id },
      include: {
        manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        agents: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            active: true
          }
        }
      }
    });

    if (!employee) {
      return res.status(404).json({
        error: {
          message: 'Employee not found',
          status: 404
        }
      });
    }

    res.json({
      success: true,
      data: employee
    });
  } catch (error) {
    console.error('Get employee error:', error);
    next(error);
  }
});

// GET /api/employees - List employees (Super Admin/Manager)
router.get('/', employeeAuthMiddleware, requireRole(['super_admin', 'manager']), async (req, res, next) => {
  try {
    let where = {};

    // Managers can only see their team
    if (req.employee.role === 'manager') {
      where = {
        OR: [
          { id: req.employee.id },
          { managerId: req.employee.id }
        ]
      };
    }

    const employees = await prisma.employee.findMany({
      where,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        active: true,
        managerId: true,
        createdAt: true,
        manager: {
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
    });

    res.json({
      success: true,
      data: employees
    });
  } catch (error) {
    console.error('List employees error:', error);
    next(error);
  }
});

// POST /api/employees - Create employee (Super Admin)
router.post('/', employeeAuthMiddleware, requireRole(['super_admin']), async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, role, phone, managerId } = req.body;

    // Validation
    if (!email || !password || !firstName || !lastName || !role) {
      return res.status(400).json({
        error: {
          message: 'Missing required fields: email, password, firstName, lastName, role',
          status: 400
        }
      });
    }

    if (!['super_admin', 'manager', 'agent'].includes(role)) {
      return res.status(400).json({
        error: {
          message: 'Invalid role. Must be super_admin, manager, or agent',
          status: 400
        }
      });
    }

    // Check if email already exists
    const existingEmployee = await prisma.employee.findUnique({
      where: { email }
    });

    if (existingEmployee) {
      return res.status(409).json({
        error: {
          message: 'Employee with this email already exists',
          status: 409
        }
      });
    }

    // Validate managerId if provided
    if (managerId && role !== 'agent') {
      return res.status(400).json({
        error: {
          message: 'Only agents can have a manager',
          status: 400
        }
      });
    }

    if (managerId) {
      const manager = await prisma.employee.findUnique({
        where: { id: managerId }
      });

      if (!manager || manager.role !== 'manager') {
        return res.status(400).json({
          error: {
            message: 'Invalid manager. Manager must be an active manager employee.',
            status: 400
          }
        });
      }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create employee
    const employee = await prisma.employee.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        role,
        phone,
        managerId
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        active: true,
        managerId: true,
        createdAt: true
      }
    });

    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: employee
    });
  } catch (error) {
    console.error('Create employee error:', error);
    next(error);
  }
});

// PUT /api/employees/:id - Update employee (Super Admin)
router.put('/:id', employeeAuthMiddleware, requireRole(['super_admin']), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, role, phone, managerId, active } = req.body;

    // Check if employee exists
    const existingEmployee = await prisma.employee.findUnique({
      where: { id }
    });

    if (!existingEmployee) {
      return res.status(404).json({
        error: {
          message: 'Employee not found',
          status: 404
        }
      });
    }

    // Validate role if provided
    if (role && !['super_admin', 'manager', 'agent'].includes(role)) {
      return res.status(400).json({
        error: {
          message: 'Invalid role. Must be super_admin, manager, or agent',
          status: 400
        }
      });
    }

    // Validate managerId if provided
    if (managerId && role !== 'agent') {
      return res.status(400).json({
        error: {
          message: 'Only agents can have a manager',
          status: 400
        }
      });
    }

    if (managerId) {
      const manager = await prisma.employee.findUnique({
        where: { id: managerId }
      });

      if (!manager || manager.role !== 'manager') {
        return res.status(400).json({
          error: {
            message: 'Invalid manager',
            status: 400
          }
        });
      }
    }

    // Build update data
    const updateData = {};
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (role !== undefined) updateData.role = role;
    if (phone !== undefined) updateData.phone = phone;
    if (managerId !== undefined) updateData.managerId = managerId;
    if (active !== undefined) updateData.active = active;

    const employee = await prisma.employee.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        active: true,
        managerId: true,
        updatedAt: true
      }
    });

    res.json({
      success: true,
      message: 'Employee updated successfully',
      data: employee
    });
  } catch (error) {
    console.error('Update employee error:', error);
    next(error);
  }
});

// DELETE /api/employees/:id - Deactivate employee (Super Admin)
router.delete('/:id', employeeAuthMiddleware, requireRole(['super_admin']), async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if employee exists
    const existingEmployee = await prisma.employee.findUnique({
      where: { id }
    });

    if (!existingEmployee) {
      return res.status(404).json({
        error: {
          message: 'Employee not found',
          status: 404
        }
      });
    }

    // Prevent deactivating yourself
    if (id === req.employee.id) {
      return res.status(400).json({
        error: {
          message: 'Cannot deactivate your own account',
          status: 400
        }
      });
    }

    // Soft delete - just set active to false
    await prisma.employee.update({
      where: { id },
      data: { active: false }
    });

    res.json({
      success: true,
      message: 'Employee deactivated successfully'
    });
  } catch (error) {
    console.error('Deactivate employee error:', error);
    next(error);
  }
});

// GET /api/employees/:id/team - Get manager's team
router.get('/:id/team', employeeAuthMiddleware, requireManager, async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if employee exists and is a manager
    const manager = await prisma.employee.findUnique({
      where: { id }
    });

    if (!manager || manager.role !== 'manager') {
      return res.status(404).json({
        error: {
          message: 'Manager not found',
          status: 404
        }
      });
    }

    // Get manager's team
    const team = await prisma.employee.findMany({
      where: { managerId: id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        active: true,
        createdAt: true
      }
    });

    res.json({
      success: true,
      data: team
    });
  } catch (error) {
    console.error('Get team error:', error);
    next(error);
  }
});

export default router;

