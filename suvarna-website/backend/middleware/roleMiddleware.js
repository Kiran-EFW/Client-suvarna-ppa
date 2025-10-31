// Role-based access control middleware

export const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.employee) {
      return res.status(401).json({
        error: {
          message: 'Authentication required',
          status: 401
        }
      });
    }

    if (!allowedRoles.includes(req.employee.role)) {
      return res.status(403).json({
        error: {
          message: 'Insufficient permissions',
          status: 403
        }
      });
    }

    next();
  };
};

// Check if employee is a manager or super admin
export const requireManager = (req, res, next) => {
  if (!req.employee) {
    return res.status(401).json({
      error: {
        message: 'Authentication required',
        status: 401
      }
    });
  }

  if (!['super_admin', 'manager'].includes(req.employee.role)) {
    return res.status(403).json({
      error: {
        message: 'Manager or Super Admin access required',
        status: 403
      }
    });
  }

  next();
};

// Check if agent owns the lead or is their manager/super admin
export const requireOwnLead = async (req, res, next) => {
  try {
    const prisma = (await import('../lib/prisma.js')).default;
    const { id } = req.params;

    if (!req.employee) {
      return res.status(401).json({
        error: {
          message: 'Authentication required',
          status: 401
        }
      });
    }

    // Super admins and managers can access any lead
    if (['super_admin', 'manager'].includes(req.employee.role)) {
      return next();
    }

    // Agents can only access their assigned leads
    const lead = await prisma.lead.findUnique({
      where: { id },
      select: { assignedToId: true }
    });

    if (!lead) {
      return res.status(404).json({
        error: {
          message: 'Lead not found',
          status: 404
        }
      });
    }

    if (lead.assignedToId !== req.employee.id) {
      return res.status(403).json({
        error: {
          message: 'You can only access your assigned leads',
          status: 403
        }
      });
    }

    next();
  } catch (error) {
    console.error('Error checking lead ownership:', error);
    res.status(500).json({
      error: {
        message: 'Internal server error',
        status: 500
      }
    });
  }
};

