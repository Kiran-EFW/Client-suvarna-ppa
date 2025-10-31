#!/bin/bash
cat > /tmp/nginx-conf << 'EOF'
server {
    listen 80;
    server_name 35.225.94.127;
    location / {
        root /home/kiran/projects/Client-suvarna-ppa/suvarna-website/frontend/dist;
        try_files $uri $uri/ /index.html;
        index index.html;
    }
    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
EOF

sudo mv /tmp/nginx-conf /etc/nginx/sites-available/suvarna-capital
sudo ln -sf /etc/nginx/sites-available/suvarna-capital /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx
sudo usermod -a -G kiran www-data
sudo chmod 755 /home/kiran
sudo chmod -R 755 /home/kiran/projects

