module.exports = {
  apps: [{
    name: 'claude-code-ui',
    script: 'server/index.js',
    cwd: '/root/cc/claudecodeui',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    },
    log_file: '/root/cc/claudecodeui/logs/combined.log',
    out_file: '/root/cc/claudecodeui/logs/out.log',
    error_file: '/root/cc/claudecodeui/logs/error.log',
    time: true
  }]
};