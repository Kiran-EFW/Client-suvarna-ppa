import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import leadsRouter from './routes/leads.js';
import authRouter from './routes/auth.js';
import buyerRouter from './routes/buyer.js';
import adminRouter from './routes/admin.js';
import sellersRouter from './routes/sellers.js';
import employeesRouter from './routes/employees.js';
import crmRouter from './routes/crm.js';
import activitiesRouter from './routes/activities.js';
import tasksRouter from './routes/tasks.js';
import documentsRouter from './routes/documents.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/leads', leadsRouter);
app.use('/api/auth', authRouter);
app.use('/api/buyer', buyerRouter);
app.use('/api/admin', adminRouter);
app.use('/api/sellers', sellersRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/crm', crmRouter);
app.use('/api/crm', activitiesRouter);
app.use('/api/crm', tasksRouter);
app.use('/api/crm', documentsRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Suvarna Capital API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
