import { defineConfig, devices } from '@playwright/experimental-ct-vue'
import vue from '@vitejs/plugin-vue'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  testDir: './tests/component',
  use: {
    ctPort: 3100,
    ctViteConfig: {
      plugins: [vue()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
