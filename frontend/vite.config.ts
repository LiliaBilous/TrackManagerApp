import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'
import { visualizer } from 'rollup-plugin-visualizer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      open: true,
      filename: 'bundle-report.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    sourcemap: true,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@apollo/client')) return 'apollo'
            if (id.includes('graphql')) return 'graphql'
            if (id.includes('zod')) return 'zod'
            if (id.includes('neverthrow')) return 'neverthrow'
            if (id.includes('@mobily/ts-belt')) return 'ts-belt'
          }
        },
      },
    },
  },

  optimizeDeps: {
    exclude: [
      'graphql/language/lexer',
      'graphql/language/parser',
      'graphql/utilities/stripIgnoredCharacters',
    ],
  },
})
