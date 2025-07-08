import { defineConfig, devices } from '@playwright/experimental-ct-vue'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  testDir: './tests/component',
  use: {
    ctPort: 3100,
    ctViteConfig: {
      plugins: [vue()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'), // ось сюди
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
