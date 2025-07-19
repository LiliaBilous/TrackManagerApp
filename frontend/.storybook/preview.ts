import type { Preview } from '@storybook/vue3-vite'
import { setup } from '@storybook/vue3'
import { INITIAL_VIEWPORTS } from 'storybook/viewport';
import '../src/assets/main.css'
import { createPinia } from 'pinia'
setup((app) => {
  app.use(createPinia())
})

const preview: Preview = {
  parameters: {
    viewport: {
      options: { ...INITIAL_VIEWPORTS },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#242323' },
      ],
    },
  },
  initialGlobals: {
    backgrounds: { value: 'dark' },
    viewport: { value: 'mobile1', isRotated: false },
  },
}

export default preview
