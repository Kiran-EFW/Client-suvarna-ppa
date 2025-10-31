#!/bin/bash
cd ~/projects/Client-suvarna-ppa/suvarna-website/backend

# Generate password hash
PASSWORD="SuvarnaAdmin2025!"
HASH=$(node -e "const bcrypt = require('bcrypt'); bcrypt.hash('$PASSWORD', 10).then(h => console.log(h));")

# Wait for async hash generation
sleep 2

# Get the hash from a file
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('$PASSWORD', 10).then(h => { require('fs').writeFileSync('/tmp/admin_hash.txt', h); });"
sleep 1
ADMIN_HASH=$(cat /tmp/admin_hash.txt)

# Add to .env
echo "" >> .env
echo "ADMIN_EMAIL=admin@suvarnacapital.com" >> .env
echo "ADMIN_PASSWORD_HASH=$ADMIN_HASH" >> .env

echo "Admin credentials configured"
echo "Email: admin@suvarnacapital.com"
echo "Password: SuvarnaAdmin2025!"

