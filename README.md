# Client-suvarna-ppa

PPA Marketplace Platform for Suvarna Capital Advisors LLP - A comprehensive B2B renewable energy marketplace connecting corporate buyers with renewable energy project sellers.

## 🎯 Project Overview

This platform facilitates Power Purchase Agreements (PPAs) between corporate energy buyers and renewable energy project sellers, with integrated CRM functionality for sales pipeline management.

## ✨ Key Features

### Marketplace Platform
- **Buyer Registration & Dashboard**: Corporate buyers can register, view matched sellers, and access contact details after terms agreement
- **Seller Management**: Admin-controlled seller listing with public seller registration landing page
- **Matchmaking System**: Admin-curated buyer-seller matching with automated email notifications
- **Data Privacy**: Seller contact information masked until buyer agrees to terms
- **Terms Agreement**: Legal compliance tracking with IP address and timestamp

### CRM System
- **Lead Management**: Complete lead lifecycle from capture to conversion
- **Activity Tracking**: Calls, emails, meetings, notes with follow-up scheduling
- **Task Management**: Task assignment, prioritization, and completion tracking
- **Document Management**: Upload and manage proposals, contracts, presentations
- **Employee Management**: Role-based access (super_admin, manager, agent)
- **Reports & Analytics**: Sales pipeline analytics and performance metrics

### Admin Panel
- **Dashboard**: Overview of buyers, sellers, and matches
- **Buyer Management**: View and manage registered buyers
- **Seller CRUD**: Add, edit, delete sellers and project listings
- **Match Management**: Create and manage buyer-seller matches

## 🛠️ Technology Stack

### Frontend
- React 18 with TypeScript
- Vite (Build tool)
- shadcn/ui + Tailwind CSS
- Framer Motion (Animations)
- React Router v6

### Backend
- Node.js + Express.js
- Prisma ORM
- SQLite (Development) / PostgreSQL ready
- JWT Authentication
- Nodemailer (Email notifications)

### Database
- Prisma ORM with SQLite (dev)
- PostgreSQL ready for production

## 📁 Project Structure

```
├── suvarna-website/
│   ├── frontend/          # React frontend
│   │   ├── src/
│   │   │   ├── components/    # UI components
│   │   │   ├── pages/         # Page components
│   │   │   ├── lib/           # API & utilities
│   │   │   └── data/          # Static data
│   │   └── public/            # Static assets
│   ├── backend/           # Node.js backend
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Auth middleware
│   │   ├── prisma/        # Database schema
│   │   └── utils/         # Utilities
│   └── README.md
├── BUSINESS_ANALYSIS.md   # Complete business analysis
├── MARKETPLACE_TEST_REPORT.md  # Testing documentation
└── PROJECT_DOCUMENTATION.md    # Project specs
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Kiran-EFW/Client-suvarna-ppa.git
cd Client-suvarna-ppa
```

2. **Backend Setup**
```bash
cd suvarna-website/backend
npm install
npx prisma migrate dev
npm run dev
```
Backend runs on `http://localhost:8000`

3. **Frontend Setup**
```bash
cd suvarna-website/frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

## 📋 Environment Variables

### Backend (.env)
```env
PORT=8000
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_APP_BACKEND_API_URL=http://localhost:8000
```

## 🔐 Access Points

- **Buyer Registration**: `/register` or `/landing-ab`
- **Seller Landing**: `/seller-landing`
- **Buyer Dashboard**: `/buyer/dashboard` (requires login)
- **Admin Panel**: `/admin/login přes /admin`
- **CRM System**: `/employee/login` then `/crm/dashboard`

## 📚 Documentation

- [Business Analysis](./BUSINESS_ANALYSIS.md) - Complete platform analysis
- [Testing Report](./MARKETPLACE_TEST_REPORT.md) - Testing documentation
- [Project Documentation](./PROJECT_DOCUMENTATION.md) - Original project specs
- [Implementation Summary](./suvarna-website/IMPLEMENTATION_SUMMARY.md) - Feature list

## 🧪 Testing

Comprehensive end-to-end testing has been completed for:
- Buyer registration and authentication
- Matchmaking flow with data masking
- Terms agreement workflow
- Admin panel functionality
- CRM system with new fields

See [MARKETPLACE_TEST_REPORT.md](./MARKETPLACE_TEST_REPORT.md) for detailed test results.

## 📝 License

Copyright © 2025 Suvarna Capital Advisors LLP. All rights reserved.

## 📞 Contact

**Suvarna Capital Advisors LLP**
- Location: Dharwad, Karnataka, India
- Phone: +91 98864 90099
- Email: info@suvarnacapital.com

