import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import prisma from '../lib/prisma.js';
import { employeeAuthMiddleware } from '../middleware/employeeAuthMiddleware.js';
import { requireOwnLead } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Apply authentication to all document routes
router.use(employeeAuthMiddleware);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
      'text/plain',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Allowed types: PDF, Word, Excel, Images, PowerPoint, Text'));
    }
  }
});

// GET /api/crm/leads/:id/documents - List documents for a lead
router.get('/leads/:id/documents', requireOwnLead, async (req, res, next) => {
  try {
    const { id } = req.params;

    const documents = await prisma.document.findMany({
      where: { leadId: id },
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
    });

    res.json({
      success: true,
      data: documents
    });
  } catch (error) {
    console.error('Error listing documents:', error);
    next(error);
  }
});

// POST /api/crm/leads/:id/documents - Upload a document
router.post('/leads/:id/documents', requireOwnLead, upload.single('file'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type } = req.body;

    if (!req.file) {
      return res.status(400).json({
        error: {
          message: 'No file uploaded',
          status: 400
        }
      });
    }

    // Verify lead exists
    const lead = await prisma.lead.findUnique({
      where: { id }
    });

    if (!lead) {
      // Delete uploaded file if lead doesn't exist
      fs.unlinkSync(req.file.path);
      return res.status(404).json({
        error: {
          message: 'Lead not found',
          status: 404
        }
      });
    }

    const document = await prisma.document.create({
      data: {
        leadId: id,
        name: req.file.originalname,
        type: type || 'other',
        fileUrl: `/uploads/${req.file.filename}`,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        uploadedById: req.employee.id
      },
      include: {
        uploadedBy: {
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
      message: 'Document uploaded successfully',
      data: document
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    // Delete file if there was an error
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }
    next(error);
  }
});

// GET /api/crm/documents/:id - Get document info
router.get('/documents/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const document = await prisma.document.findUnique({
      where: { id },
      include: {
        lead: {
          select: {
            id: true,
            companyName: true
          }
        },
        uploadedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    if (!document) {
      return res.status(404).json({
        error: {
          message: 'Document not found',
          status: 404
        }
      });
    }

    res.json({
      success: true,
      data: document
    });
  } catch (error) {
    console.error('Error getting document:', error);
    next(error);
  }
});

// DELETE /api/crm/documents/:id - Delete a document
router.delete('/documents/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const document = await prisma.document.findUnique({
      where: { id }
    });

    if (!document) {
      return res.status(404).json({
        error: {
          message: 'Document not found',
          status: 404
        }
      });
    }

    // Only allow owner or managers to delete
    if (document.uploadedById !== req.employee.id && !['super_admin', 'manager'].includes(req.employee.role)) {
      return res.status(403).json({
        error: {
          message: 'You can only delete your own documents',
          status: 403
        }
      });
    }

    // Delete file from filesystem
    const filePath = path.join('./uploads', path.basename(document.fileUrl));
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (unlinkError) {
      console.warn('Error deleting file from filesystem:', unlinkError);
      // Continue with database deletion even if file deletion fails
    }

    // Delete from database
    await prisma.document.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting document:', error);
    next(error);
  }
});

// Serve uploaded files
router.use('/uploads', express.static('./uploads'));

export default router;

