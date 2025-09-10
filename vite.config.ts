import { defineConfig } from 'vite'
import visualizer from 'rollup-plugin-visualizer'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    visualizer()
  ],
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString()
          }
        }
      }
    }
  }
})
