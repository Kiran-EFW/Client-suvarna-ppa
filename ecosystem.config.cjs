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
};

