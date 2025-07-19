import type { Meta, StoryObj } from '@storybook/vue3'
import TrackCardStoryWrapper from './TrackCardStoryWrapper.vue'
import type { Track } from '@/features/tracks/schema/trackSchema'

const meta: Meta<typeof TrackCardStoryWrapper> = {
  title: 'Track/TrackCard',
  component: TrackCardStoryWrapper,
  globals: {
    viewport: { value: 'mobile2', isRotated: false },
  },
  tags: ['autodocs'],
  argTypes: {
    selected: { control: 'boolean' },
    isActive: { control: 'boolean' },
    isMobileDropdownOpen: { control: 'boolean' },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'TrackCard побудований за принципами Material 3: компонування з базових елементів, візуальна ієрархія, responsive-дизайн та підтримка різних станів (checked, hovered, мобільне меню). Демонструє, як кастомні бізнес-компоненти можуть слідувати M3-підходу без використання зовнішніх UI-бібліотек.' +
          '\n\n** Примітка:** Для відображення плеєра має бути запущений бекенд, що віддає аудіофайл.',
      },
    },
  },
}
export default meta

const mockTrack: Track = {
  id: '1',
  title: 'Test Track',
  artist: 'Test Artist',
  album: 'Test Album',
  genres: ['Rock', 'Indie'],
  coverImage: 'https://placehold.co/100',
  audioFile: 'test.mp3',
  slug: 'test-track',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export const Default: StoryObj<typeof TrackCardStoryWrapper> = {
  args: {
    track: { ...mockTrack },
    selected: false,
  },
}

export const Checked: StoryObj<typeof TrackCardStoryWrapper> = {
  args: {
    track: { ...mockTrack },
    selected: true,
  },
}

export const WithPlayer: StoryObj<typeof TrackCardStoryWrapper> = {
  args: {
    track: { ...mockTrack },
    selected: false,
    isActive: true,
  },
}

export const Mobile: StoryObj<typeof TrackCardStoryWrapper> = {
  args: {
    track: { ...mockTrack },
    selected: false,
    isMobileDropdownOpen: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  globals: {
    viewport: { value: 'mobile2', isRotated: false },
  },
  play: async ({ canvasElement }) => {
    const menuButton = canvasElement.querySelector('.more-button')
    if (menuButton) (menuButton as HTMLButtonElement).click()
  },
}
