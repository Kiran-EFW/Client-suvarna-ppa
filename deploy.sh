#!/bin/bash

# GCP VM Deployment Script for Suvarna Capital PPA Marketplace
# Run this script on the GCP VM after SSH connection

set -e

echo "🚀 Starting Suvarna Capital PPA Marketplace Deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Update system
echo -e "${YELLOW}📦 Updating system packages...${NC}"
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}📦 Installing Node.js 20.x...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
else
    echo -e "${GREEN}✅ Node.js already installed: $(node --version)${NC}"
fi

# Install PM2
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}📦 Installing PM2...${NC}"
    sudo npm install -g pm2
else
    echo -e "${GREEN}✅ PM2 already installed${NC}"
fi

# Install nginx
if ! command -v nginx &> /dev/null; then
    echo -e "${YELLOW}📦 Installing nginx...${NC}"
    sudo apt install -y nginx
else
    echo -e "${GREEN}✅ nginx already installed${NC}"
fi

# Install Git
if ! command -v git &> /dev/null; then
    echo -e "${YELLOW}📦 Installing Git...${NC}"
    sudo apt install -y git
else
    echo -e "${GREEN}✅ Git already installed${NC}"
fi

# Install build essentials
echo -e "${YELLOW}📦 Installing build essentials...${NC}"
sudo apt install -y build-essential

# Create project directory
PROJECT_DIR="$HOME/projects/Client-suvarna-ppa"
echo -e "${YELLOW}📁 Setting up project directory...${NC}"
mkdir -p ~/projects
cd ~/projects

# Clone or update repository
if [ -d "Client-suvarna-ppa" ]; then
    echo -e "${YELLOW}📥 Updating existing repository...${NC}"
    cd Client-suvarna-ppa
    git pull origin main
else
    echo -e "${YELLOW}📥 Cloning repository...${NC}"
    git clone https://github.com/Kiran-EFW/Client-suvarna-ppa.git
    cd Client-suvarna-ppa
fi

# Backend setup
echo -e "${YELLOW}⚙️ Setting up backend...${NC}"
cd suvarna-website/backend

# Install dependencies
npm install

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${YELLOW}📝 Creating backend .env file...${NC}"
    cat > .env << EOF
PORT=8000
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="suvarna-capital-jwt-secret-$(openssl rand -hex 32)"
JWT_EXPIRES_IN=7d
FRONTEND_URL="http://35.225.94.127"
NODE_ENV=production
EOF
fi

# Run database migrations
echo -e "${YELLOW}🗄️ Running database migrations...${NC}"
npx prisma migrate deploy || npx prisma migrate dev --name deploy
npx prisma generate

# Create necessary directories
mkdir -p uploads logs

# Frontend setup
echo -e "${YELLOW}⚙️ Setting up frontend...${NC}"
cd ../frontend

# Install dependencies
npm install

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${YELLOW}📝 Creating frontend .env file...${NC}"
    cat > .env << EOF
VITE_APP_BACKEND_API_URL=http://35.225.94.127:8000
EOF
fi

# Build frontend
echo -e "${YELLOW}🏗️ Building frontend...${NC}"
npm run build

# Configure PM2
echo -e "${YELLOW}⚙️ Configuring PM2...${NC}"
cd ../backend

# Create PM2 ecosystem file
cat > ecosystem.config.js << 'PM2EOF'
module.exports = {
  apps: [{
    name: 'suvarna-backend',
    script: 'server.js',
    cwd: '/home/kiran/projects/Client-suvarna-ppa/suvarna-website/backend',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 8000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M'
  }]
}
PM2EOF

# Stop existing PM2 process if running
pm2 delete suvarna-backend 2>/dev/null || true

# Start backend with PM2
echo -e "${YELLOW}🚀 Starting backend with PM2...${NC}"
pm2 start ecosystem.config.js
pm2 save

# Configure nginx
echo -e "${YELLOW}⚙️ Configuring nginx...${NC}"
sudo tee /etc/nginx/sites-available/suvarna-capital > /dev/null << 'NGINXEOF'
server {
    listen 80;
    server_name 35.225.94.127;

    # Frontend (React build)
    location / {
        root /home/kiran/projects/Client-suvarna-ppa/suvarna-website/frontend/dist;
        try_files $uri $uri/ /index.html;
        index index.html;
    }

    # Backend API proxy
    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header Cookie $http_cookie;
    }

    # CORS headers
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS";
    add_header Access-Control-Allow-Headers "Content-Type, Authorization";
}
NGINXEOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/suvarna-capital /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test and restart nginx
echo -e "${YELLOW}🔄 Restarting nginx...${NC}"
sudo nginx -t && sudo systemctl restart nginx
sudo systemctl enable nginx

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "📋 Next Steps:"
echo "1. Configure firewall in GCP Console to allow HTTP (port 80) and HTTPS (port 443)"
echo "2. Access your application at: http://35.225.94.127"
echo "3. Check backend status: pm2 status"
echo "4. Check nginx status: sudo systemctl status nginx"
echo ""
echo "🔗 Client Access URL: http://35.225.94.127"

