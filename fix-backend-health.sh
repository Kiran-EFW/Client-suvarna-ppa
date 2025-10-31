#!/bin/bash
cd ~/projects/Client-suvarna-ppa/suvarna-website/backend

# Create backup
cp server.js server.js.backup

# Check if /api/health route already exists
if ! grep -q 'app.get("/api/health"' server.js; then
  # Find line 46 (after /health endpoint closes)
  # Insert the new route
  sed -i '46a\
\
// Also add /api/health for Nginx proxy\
app.get("/api/health", (req, res) => {\
  res.json({ status: "ok", message: "Suvarna Capital API is running" });\
});
' server.js
  
  echo "Added /api/health route to server.js"
else
  echo "/api/health route already exists"
fi

# Restart backend
pm2 restart suvarna-backend
sleep 3

# Test the endpoint
curl -s http://localhost/api/health

