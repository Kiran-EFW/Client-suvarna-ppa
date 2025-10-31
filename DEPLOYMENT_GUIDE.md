# GCP VM Deployment Guide

## VM Information
- **Instance Name**: scalix-vm
- **External IP**: 35.225.94.127
- **Zone**: us-central1-a
- **Machine Type**: e2-medium (2 vCPUs, 4 GB Memory)
- **OS**: Ubuntu 25.04
- **SSH User**: kiran

## Step 1: Connect to VM

### Option A: Using GCP Console
1. Go to https://console.cloud.google.com/compute/instances
2. Find `scalix-vm` instance
3. Click "SSH" button (opens browser-based SSH)

### Option B: Using gcloud CLI
```bash
gcloud compute ssh kiran@scalix-vm --zone=us-central1-a
```

## Step 2: Set Up Environment

Once connected via SSH, run these commands:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x
npm --version

# Install PM2 for process management
sudo npm install -g pm2

# Install nginx for reverse proxy
sudo apt install -y nginx

# Install Git if not present
sudo apt install -y git

# Install build essentials (for native modules)
sudo apt install -y build-essential
```

## Step 3: Clone Repository

```bash
# Create project directory
cd ~
mkdir -p projects
cd projects

# Clone the repository
git clone https://github.com/Kiran-EFW/Client-suvarna-ppa.git
cd Client-suvarna-ppa

# Verify structure
ls -la
```

## Step 4: Set Up Backend

```bash
cd suvarna-website/backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=8000
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN=7d
FRONTEND_URL="http://35.225.94.127"
NODE_ENV=production
EOF

# Run database migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Create uploads directory
mkdir -p uploads

# Test backend (optional, to verify it works)
npm run dev
# Press Ctrl+C to stop after verifying
```

## Step 5: Set Up Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
VITE_APP_BACKEND_API_URL=http://35.225.94.127:8000
EOF

# Build for production
npm run build

# Verify build
ls -la dist/
```

## Step 6: Configure PM2 for Backend

```bash
cd ~/projects/Client-suvarna-ppa/suvarna-website/backend

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
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
EOF

# Create logs directory
mkdir -p logs

# Start backend with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the command it outputs
```

## Step 7: Configure Nginx

```bash
# Create nginx configuration
sudo nano /etc/nginx/sites-available/suvarna-capital
```

Paste this configuration:

```nginx
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
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/suvarna-capital /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx

# Enable nginx on boot
sudo systemctl enable nginx
```

## Step 8: Configure Firewall Rules

### In GCP Console:
1. Go to VPC Network > Firewall Rules
2. Create new firewall rule:
   - **Name**: allow-http-https-scalix
   - **Direction**: Ingress
   - **Action**: Allow
   - **Targets**: Specified target tags
   - **Target tags**: scalix
   - **Source IP ranges**: 0.0.0.0/0
   - **Protocols and ports**: TCP: 80, 443
3. Click Create

### Or using gcloud CLI:
```bash
gcloud compute firewall-rules create allow-http-https-scalix \
    --allow tcp:80,tcp:443 \
    --target-tags scalix \
    --source-ranges 0.0.0.0/0 \
    --description "Allow HTTP and HTTPS traffic"
```

## Step 9: Verify Deployment

```bash
# Check backend is running
pm2 status

# Check nginx is running
sudo systemctl status nginx

# Check if services are listening
sudo netstat -tlnp | grep -E ':(80|8000)'

# Test from VM itself
curl http://localhost:8000/health
curl http://localhost/
```

## Step 10: Access the Application

Once firewall is configured, access:
- **Frontend**: http://35.225.94.127
- **Backend Health**: http://35.225.94.127/api/health

## Useful Commands

### PM2 Commands
```bash
pm2 status              # Check app status
pm2 logs suvarna-backend  # View logs
pm2 restart suvarna-backend  # Restart backend
pm2 stop suvarna-backend     # Stop backend
pm2 delete suvarna-backend   # Remove from PM2
```

### Nginx Commands
```bash
sudo systemctl status nginx    # Check status
sudo systemctl restart nginx  # Restart nginx
sudo nginx -t                 # Test configuration
sudo tail -f /var/log/nginx/error.log  # View error log
```

### Update Deployment
```bash
cd ~/projects/Client-suvarna-ppa
git pull origin main
cd suvarna-website/backend
npm install
npx prisma migrate deploy
pm2 restart suvarna-backend
cd ../frontend
npm install
npm run build
sudo systemctl reload nginx
```

## Troubleshooting

### Backend not starting
```bash
cd ~/projects/Client-suvarna-ppa/suvarna-website/backend
pm2 logs suvarna-backend
# Check for errors in logs
```

### Frontend not loading
```bash
# Verify build exists
ls -la ~/projects/Client-suvarna-ppa/suvarna-website/frontend/dist

# Check nginx error log
sudo tail -f /var/log/nginx/error.log
```

### Port already in use
```bash
# Check what's using port 8000
sudo lsof -i :8000
# Or
sudo netstat -tlnp | grep 8000
```

### Database issues
```bash
cd ~/projects/Client-suvarna-ppa/suvarna-website/backend
npx prisma migrate reset  # Reset database (WARNING: deletes data)
npx prisma migrate deploy  # Apply migrations
```

## Security Notes

1. **Change JWT_SECRET**: Update the JWT secret in `.env` with a strong random string
2. **HTTPS Setup**: For production, set up SSL certificate (Let's Encrypt with Certbot)
3. **Firewall**: Consider restricting source IPs for admin routes
4. **Environment Variables**: Never commit `.env` files

## Production Recommendations

1. Set up SSL certificate with Let's Encrypt
2. Configure domain name and update DNS
3. Set up automatic backups for database
4. Configure monitoring (PM2 Plus or similar)
5. Set up log rotation
6. Configure automatic security updates

## Client Access URL

Once deployed, share this URL with your client:
**http://35.225.94.127**

This will be accessible once firewall rules are configured in GCP.

