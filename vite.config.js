import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  // Use environment variables for API host and port
  const apiHost = env.VITE_API_HOST || '127.0.0.1'
  const apiPort = env.PORT || 3002
  
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0', // Listen on all interfaces for public access
      port: parseInt(env.VITE_PORT) || 3001,
      proxy: {
        '/api': `http://${apiHost}:${apiPort}`,
        '/ws': {
          target: `ws://${apiHost}:${apiPort}`,
          ws: true,
          changeOrigin: true
        }
      }
    },
    build: {
      outDir: 'dist'
    }
  }
})