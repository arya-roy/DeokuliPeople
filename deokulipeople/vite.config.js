import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor-react'
            }
            if (id.includes('chart.js') || id.includes('recharts') || id.includes('react-d3-tree')) {
              return 'vendor-charts'
            }
            return 'vendor'
          }

          if (id.includes(path.resolve(__dirname, 'src/pages'))) {
            return 'page-' + path.basename(id, path.extname(id))
          }
        },
      },
    },
  },
})
