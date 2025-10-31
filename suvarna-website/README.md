# Suvarna Capital Website

Modern, professional website for Suvarna Capital Limited - a renewable energy-focused investment advisory firm.

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Build tool and dev server
- **shadcn/ui** - Modern UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Routing

### Backend
- **Node.js** with Express
- **Zoho CRM** integration (placeholder structure)

## Project Structure

```
suvarna-website/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/           # shadcn/ui components
│   │   │   ├── forms/        # Form components
│   │   │   └── layout/       # Layout components
│   │   ├── pages/            # Page components
│   │   ├── lib/              # Utilities and API
│   │   └── data/             # Static data
│   └── public/               # Static assets
├── backend/           # Node.js backend API
│   ├── routes/       # API routes
│   └── services/     # Business logic
└── PROJECT_DOCUMENTATION.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env.example .env
```

4. Start development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env.example .env
```

4. Update `.env` with your Zoho CRM credentials when available

5. Start development server:
```bash
npm run dev
```

The backend will be available at `http://localhost:8000`

## Features

### Lead Capture Form
- Complete 15-field form matching current data collection
- Company information (Name, Location, State, Credit Rating, Priority)
- Contact person details (Name, Designation)
- Multiple contact methods (Mobile 1/2, Landline 1/2, Email 1/2)
- Remarks field
- Indian states dropdown (all 36 states/UTs)
- Form validation and error handling

### Zoho CRM Integration
- Data mapping to Zoho CRM format
- Placeholder structure ready for API credentials
- Field mapping as per PROJECT_DOCUMENTATION.md

### SEO Optimization
- Meta tags and Open Graph support
- Structured data (JSON-LD)
- Sitemap and robots.txt
- Semantic HTML

### Modern Design
- Professional green theme
- Framer Motion animations
- Responsive mobile-first design
- shadcn/ui components

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api
```

### Backend (.env)
```env
PORT=8000
ZOHO_CLIENT_ID=your_zoho_client_id_here
ZOHO_CLIENT_SECRET=your_zoho_client_secret_here
ZOHO_REFRESH_TOKEN=your_zoho_refresh_token_here
ZOHO_ACCESS_TOKEN_URL=https://accounts.zoho.com/oauth/v2/token
ZOHO_CRM_API_URL=https://www.zohoapis.com/crm/v2
NODE_ENV=development
```

## Development

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend
```bash
npm run dev      # Start with watch mode
npm start        # Start production server
```

## Project Documentation

See `PROJECT_DOCUMENTATION.md` in the parent directory for complete project specifications, scope of work, and detailed information about the Suvarna Capital business.

## License

Copyright © 2025 Suvarna Capital Limited. All rights reserved.

## Contact

**Suvarna Capital Limited**
- Registered Office: RS No.45, Plot No. 24, Sri Laxmi Nivas, 2nd Cross, Jaynagar, Saptapur, Dharwad 580001, Karnataka, India
- Phone: +91 98864 90099
- Email: info@suvarnacapital.com
- Website: https://suvarnacapital.com
