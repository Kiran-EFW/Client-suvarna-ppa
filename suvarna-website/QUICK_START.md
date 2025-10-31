# Quick Start Guide

## Setup (First Time Only)

### 1. Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 2. Create Environment Files

**Frontend:**
```bash
cp env.example .env
```

**Backend:**
```bash
cp env.example .env
```

Update backend `.env` with your Zoho CRM credentials when available.

## Running the Application

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```
Backend will run on: http://localhost:8000

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
Frontend will run on: http://localhost:5173

## Testing the Lead Form

1. Navigate to http://localhost:5173/contact
2. Fill out the lead capture form
3. Submit - data will be sent to backend API
4. Check backend console for formatted Zoho CRM data

## Build for Production

**Frontend:**
```bash
cd frontend
npm run build
```
Output in: `frontend/dist/`

**Backend:**
```bash
cd backend
npm start
```

## Key URLs

- Home: http://localhost:5173/
- About: http://localhost:5173/about
- Services: http://localhost:5173/services
- Team: http://localhost:5173/team
- Contact: http://localhost:5173/contact
- Backend Health: http://localhost:8000/health

## Troubleshooting

### Port Already in Use
Change ports in:
- Frontend: `vite.config.ts` (default: 5173)
- Backend: `.env` file (default: 8000)

### Module Not Found
```bash
# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install

# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. Add Zoho CRM credentials to backend `.env`
2. Replace logo placeholders with actual Suvarna Capital logo
3. Add team member photos
4. Deploy to production hosting
