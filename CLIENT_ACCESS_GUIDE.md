# Suvarna Capital PPA Marketplace - Client Access Guide

**Live Platform URL:** http://35.225.94.127  
**Deployment Date:** October 31, 2025  
**Version:** 1.0.0 - Production Ready

---

## 🔐 User Access Credentials

### 1. Super Admin (Admin Panel)
- **URL:** http://35.225.94.127/admin/login
- **Email:** `admin@suvarnacapital.com`
- **Password:** `SuvarnaAdmin2025!`
- **Role:** Super Admin (Full system access)
- **Access:** Admin Dashboard, Buyers/Sellers/Matches Management

**⚠️ IMPORTANT:** Please change the password immediately after first login for security purposes.

---

### 2. Buyer Account (Corporate Buyer)
- **URL:** http://35.225.94.127/login
- **Email:** `buyer@testcompany.com`
- **Password:** `BuyerTest2025!`
- **Company:** Test Corporate Buyer
- **Name:** John Buyer
- **Location:** Mumbai, Maharashtra
- **Access:** Buyer Dashboard, View Matched Sellers

---

### 3. Employee Account - Agent (CRM System)
- **URL:** http://35.225.94.127/employee/login
- **Email:** `employee@crm.com`
- **Password:** `EmployeeTest2025!`
- **Name:** Jane Employee
- **Role:** Agent (CRM access)
- **Access:** CRM Dashboard, Lead Management, Tasks, Activities

---

### 4. Employee Account - Manager (CRM System)
- **URL:** http://35.225.94.127/employee/login
- **Email:** `manager@crm.com`
- **Password:** `ManagerTest2025!`
- **Name:** Mike Manager
- **Role:** Manager (Team management + CRM access)
- **Access:** All agent features + Team management

---

### 5. Employee Account - Super Admin (CRM System)
- **URL:** http://35.225.94.127/employee/login
- **Email:** `superadmin@crm.com`
- **Password:** `SuperAdminTest2025!`
- **Name:** Super Admin
- **Role:** Super Admin (Full CRM access)
- **Access:** All CRM features + Employee management

### Admin Panel Features
Once logged in, you can access:
- **Dashboard** (`/admin`) - Overview with statistics
- **Buyers Management** (`/admin/buyers`) - View and manage registered buyers
- **Sellers Management** (`/admin/sellers`) - Add, edit, delete sellers
- **Matches Management** (`/admin/matches`) - Create and manage buyer-seller matches

---

## 📋 Website Structure & Navigation

### Public Pages (No Login Required)

#### **Main Website**
- **Home** (`/`) - Landing page with company overview
- **About Us** (`/about`) - Company information
- **Services** (`/services`) - Service offerings
- **Team** (`/team`) - Team members
- **Contact** (`/contact`) - Contact form

#### **Legal & Policy Pages**
- **Code of Conduct** (`/code-of-conduct`)
- **Anti-Bribery Policy** (`/anti-bribery-policy`)
- **Privacy Policy** (`/privacy-policy`)
- **Disclaimer** (`/disclaimer`)

#### **Buyer Registration**
- **Buyer Registration** (`/register`) - Corporate buyer registration form
- **A/B Testing Landing** (`/landing-ab`) - Marketing landing page for buyers

#### **Seller Registration**
- **Seller Landing** (`/seller-landing`) - Marketing page for sellers with registration form

---

### Protected Routes (Login Required)

#### **Buyer Access** (Corporate Buyers)
1. **Buyer Login** (`/login`) - Login page for registered buyers
2. **Buyer Dashboard** (`/buyer/dashboard`) - Protected route requiring buyer login
   - View matched sellers (initially masked)
   - View seller details after terms agreement
   - Accept terms to unmask seller contact information

#### **Employee Access** (CRM System)
1. **Employee Login** (`/employee/login`) - Login page for CRM employees
2. **CRM Dashboard** (`/crm/dashboard`) - Main CRM overview
3. **Leads - Table View** (`/crm/leads/table`) - List all leads in table format
4. **Leads - Kanban View** (`/crm/leads/kanban`) - Lead management in Kanban board
5. **Lead Details** (`/crm/leads/:id`) - Individual lead detail page with:
   - Lead information (company, contact, status, priority, source)
   - Activity timeline (calls, emails, meetings, notes)
   - Task management
   - Document uploads
6. **Employees** (`/crm/employees`) - Manage CRM employees
7. **Tasks** (`/crm/tasks`) - Task management across leads
8. **Reports** (`/crm/reports`) - Analytics and reporting

#### **Admin Access** (Full System Access)
1. **Admin Login** (`/admin/login`) - Login page for super admin
2. **Admin Dashboard** (`/admin`) - System overview with statistics
3. **Admin - Buyers** (`/admin/buyers`) - View all registered buyers
4. **Admin - Sellers** (`/admin/sellers`) - CRUD operations for sellers
5. **Admin - Matches** (`/admin/matches`) - Create and manage buyer-seller matches

---

## 🌐 Website Structure Diagram (Linktree)

```
📱 Suvarna Capital PPA Marketplace
│
├── 🏠 PUBLIC PAGES (No Login)
│   ├── Home (/)
│   ├── About Us (/about)
│   ├── Services (/services)
│   ├── Team (/team)
│   ├── Contact (/contact)
│   │
│   ├── 📄 LEGAL PAGES
│   │   ├── Code of Conduct (/code-of-conduct)
│   │   ├── Anti-Bribery Policy (/anti-bribery-policy)
│   │   ├── Privacy Policy (/privacy-policy)
│   │   └── Disclaimer (/disclaimer)
│   │
│   ├── 👤 BUYER PAGES
│   │   ├── Registration (/register)
│   │   └── A/B Landing Page (/landing-ab)
│   │
│   └── 🏢 SELLER PAGES
│       └── Seller Landing & Registration (/seller-landing)
│
├── 🔒 BUYER PORTAL (Login Required)
│   ├── Login (/login)
│   └── Dashboard (/buyer/dashboard)
│       ├── View Matched Sellers (Masked)
│       ├── Agree to Terms
│       └── View Full Seller Details
│
├── 💼 CRM SYSTEM (Employee Login Required)
│   ├── Employee Login (/employee/login)
│   └── CRM Dashboard (/crm/dashboard)
│       ├── Leads - Table View (/crm/leads/table)
│       ├── Leads - Kanban View (/crm/leads/kanban)
│       ├── Lead Details (/crm/leads/:id)
│       │   ├── Lead Information
│       │   ├── Activity Timeline
│       │   ├── Tasks
│       │   └── Documents
│       ├── Employees (/crm/employees)
│       ├── Tasks (/crm/tasks)
│       └── Reports (/crm/reports)
│
└── ⚙️ ADMIN PANEL (Super Admin Login Required)
    ├── Admin Login (/admin/login)
    └── Admin Dashboard (/admin)
        ├── Buyers Management (/admin/buyers)
        ├── Sellers Management (/admin/sellers)
        └── Matches Management (/admin/matches)
```

---

## 🔗 Quick Access Links

### For Clients (Public)
- **Main Website:** http://35.225.94.127
- **Buyer Registration:** http://35.225.94.127/register
- **Seller Registration:** http://35.225.94.127/seller-landing
- **Contact Us:** http://35.225.94.127/contact

### For Admin (Super Admin)
- **Admin Login:** http://35.225.94.127/admin/login
  - Email: `admin@suvarnacapital.com`
  - Password: `SuvarnaAdmin2025!`

### For Employees (CRM Access)
- **Employee Login:** http://35.225.94.127/employee/login
  - **Agent:** `employee@crm.com` / `EmployeeTest2025!`
  - **Manager:** `manager@crm.com` / `ManagerTest2025!`
  - **Super Admin:** `superadmin@crm.com` / `SuperAdminTest2025!`

### For Buyers (Corporate Buyers)
- **Buyer Login:** http://35.225.94.127/login
  - **Test Buyer:** `buyer@testcompany.com` / `BuyerTest2025!`
  - New buyers can register at `/register`

---

## 🎯 Key Features Overview

### 1. **Marketplace Platform**
- Buyer registration and profile management
- Seller registration and project listing
- Admin-created matches between buyers and sellers
- Data masking for seller information until terms agreement
- Terms agreement flow to unmask seller contact details

### 2. **Admin Management System**
- **Buyers:** View all registered buyers with match statistics
- **Sellers:** Complete CRUD (Create, Read, Update, Delete) operations
  - Add new sellers with project details
  - Edit existing seller information
  - Delete sellers
- **Matches:** Create matches between buyers and sellers, track status

### 3. **CRM System**
- **Lead Management:**
  - Create, update, and track leads
  - Status management (New, Qualified, Proposal, Negotiation, Closed Won, Closed Lost)
  - Priority levels (Low, Medium, High, Urgent)
  - Lead sources tracking
  - Estimated value and annual consumption
  - Industry and company size classification
  
- **Activity Tracking:**
  - Log calls, emails, meetings, notes
  - Track status changes
  - Next follow-up dates
  - Activity ratings (1-5 stars)
  
- **Task Management:**
  - Create and assign tasks
  - Due dates and completion tracking
  
- **Document Management:**
  - Upload, download, delete documents per lead

- **Employee Management:**
  - Role-based access (super_admin, manager, agent)
  - Employee CRUD operations

### 4. **Email Notifications**
- Buyer-seller match notifications
- Terms agreement notifications to admin
- *(SMTP configuration required for production)*

---

## 🚀 Getting Started

### For Super Admin

1. **Access Admin Panel:**
   - Navigate to http://35.225.94.127/admin/login
   - Login with provided credentials

2. **Change Password (Recommended):**
   - After first login, change the admin password in the backend `.env` file

3. **Start Managing:**
   - View existing buyers, sellers, and matches
   - Add new sellers through the Sellers management page
   - Create matches between buyers and sellers

### For Buyers

1. **Register:**
   - Visit http://35.225.94.127/register
   - Fill in corporate buyer registration form
   - Submit to create account

2. **Login:**
   - Visit http://35.225.94.127/login
   - Use registered email and password

3. **View Matches:**
   - Access dashboard to see matched sellers
   - View masked seller information
   - Agree to terms to see full contact details

### For Sellers

1. **Register Project:**
   - Visit http://35.225.94.127/seller-landing
   - Fill in seller registration form with project details
   - Submit for admin review

2. **Wait for Match:**
   - Admin will review and create matches with buyers
   - Buyers will be notified of matches

### For CRM Employees

1. **Login:**
   - Visit http://35.225.94.127/employee/login
   - Use employee credentials (to be provided by admin)

2. **Manage Leads:**
   - Access CRM dashboard
   - Create and manage leads
   - Track activities and tasks
   - Upload documents

---

## 📊 Data Structure

### Buyer Registration Data
- Company name, email, phone
- Contact person details
- Annual electricity consumption
- Location (state, city)
- Project requirements

### Seller Registration Data
- Company name, contact person
- Project type (Solar, Wind, Hybrid)
- Capacity (MW)
- Location and state
- Asking price
- Contact information

### Match Data
- Buyer ID and Seller ID
- Match status (matched, terms_agreed, completed)
- Terms agreement timestamp
- Match creation date

### CRM Lead Data
- Company information (name, website, industry, size)
- Contact details (name, email, phone)
- Lead status, priority, source
- Estimated value, annual consumption
- Activity history
- Tasks and documents

---

## 🔒 Security Notes

1. **Admin Credentials:**
   - Default password provided above
   - **MUST be changed** after first login
   - Stored securely in backend `.env` file

2. **JWT Authentication:**
   - Tokens expire after 7 days (configurable)
   - HTTP-only cookies for secure storage
   - Role-based access control (admin, employee, buyer)

3. **Data Privacy:**
   - Seller contact information masked until terms agreement
   - Terms agreement required before revealing seller details
   - IP address logged for terms agreement

---

## 🛠️ Technical Details

### Backend
- **Framework:** Node.js with Express
- **Database:** SQLite (development), can be upgraded to PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT with bcrypt password hashing
- **Port:** 8000 (internal)

### Frontend
- **Framework:** React with TypeScript
- **UI Library:** shadcn/ui with Tailwind CSS
- **Routing:** React Router
- **State Management:** React Hooks
- **Build Tool:** Vite

### Server
- **Web Server:** Nginx (reverse proxy)
- **Process Manager:** PM2
- **Platform:** Google Cloud Platform (GCP)
- **Instance:** e2-medium (2 vCPUs, 4 GB RAM)
- **Zone:** us-central1-a

---

## 📞 Support & Maintenance

### Deployment Information
- **VM Instance:** scalix-vm
- **External IP:** 35.225.94.127
- **Zone:** us-central1-a
- **Project:** efwclouddeployment

### Updates & Maintenance
- Backend logs: `pm2 logs suvarna-backend`
- Nginx logs: `/var/log/nginx/`
- Database location: `/home/kiran/projects/Client-suvarna-ppa/suvarna-website/backend/prisma/dev.db`

### Backup Recommendations
- Regular database backups
- Environment variable backups
- Frontend build backups

---

## 📝 Notes

1. **Email Notifications:** Currently disabled until SMTP is configured. Emails will be logged to console.
2. **Database:** Using SQLite for development. Can be migrated to PostgreSQL for production scale.
3. **SSL/HTTPS:** Currently HTTP. SSL certificate recommended for production.
4. **Domain:** Can be configured to use custom domain instead of IP address.

---

## 👥 Test Accounts Created

All test accounts have been created and verified:

✅ **Super Admin** - `admin@suvarnacapital.com` / `SuvarnaAdmin2025!`
✅ **Buyer** - `buyer@testcompany.com` / `BuyerTest2025!`
✅ **Employee (Agent)** - `employee@crm.com` / `EmployeeTest2025!`
✅ **Employee (Manager)** - `manager@crm.com` / `ManagerTest2025!`
✅ **Employee (Super Admin)** - `superadmin@crm.com` / `SuperAdminTest2025!`

**Note:** These test accounts are ready for use. Please change passwords after first login for security.

---

## ✅ Pre-Flight Checklist

- [x] Platform deployed and accessible
- [x] Admin credentials configured
- [x] Test accounts created for all user types
- [x] All pages loading correctly
- [x] Authentication working
- [x] Database initialized
- [x] Firewall rules configured
- [x] Nginx reverse proxy configured
- [x] PM2 process management active

---

**🎉 Platform is ready for client review and feedback!**

For any questions or support, please contact the development team.

---

*Document Version: 1.0*  
*Last Updated: October 31, 2025*

