#!/bin/bash
# Fix all deployment issues

cd ~/projects/Client-suvarna-ppa/suvarna-website/backend

# Fix CORS in server.js
sed -i "s|'http://localhost:5173'|'http://35.225.94.127'|g" server.js
echo "Fixed CORS"

# Fix create-test-accounts.js
sed -i 's/await prisma\.\\\\()/await prisma.$disconnect()/g' create-test-accounts.js
sed -i 's/await prisma\.()/await prisma.$disconnect()/g' create-test-accounts.js
sed -i 's/prisma\.\\\\()/prisma.$disconnect()/g' create-test-accounts.js
echo "Fixed create-test-accounts.js"

# Restart backend
pm2 restart suvarna-backend --update-env
echo "Backend restarted"

# Create test accounts
sleep 2
node create-test-accounts.js


