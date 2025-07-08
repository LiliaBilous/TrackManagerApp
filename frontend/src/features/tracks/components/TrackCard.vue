<template>
  <div class="track-list__track-item" :data-testid="`track-item-${track.id}`">
    <div class="track-item__card">
      <div class="track-item__content">
        <label class="custom-checkbox">
          <input
            :data-testid="`track-checkbox-${track.id}`"
            type="checkbox"
            :checked="selected"
            :aria-label="`Select track ${track.title}`"
            @change="handleSelection"
            :id="`${track.id}`"
          />
          <span class="checkmark"></span>
        </label>
        <img
          loading="lazy"
          :src="track.coverImage || DEFAULT_COVER_IMAGE"
          alt="cover"
          class="track-item__image"
        />
        <div>
          <h2 :data-testid="`track-item-${track.id}-title`" class="track-item__title">
            {{ track.title }}
          </h2>
          <p :data-testid="`track-item-${track.id}-artist`" class="track-item__subtitle">
            {{ track.artist }} — {{ track.album }}
          </p>
          <p class="track-item__genre">{{ track.genres.join(', ') }}</p>
        </div>
      </div>

      <TrackActionsButton
        :track="track"
        @edit="$emit('edit', track)"
        @delete="$emit('delete', track)"
        @upload="$emit('upload', track)"
        @play-track="$emit('play', track.id)"
      />
    </div>

    <TrackWaveForm
      :slug="track.slug"
      v-if="track.audioFile && playing"
      class="track-item__waveform"
      @reset="() => $emit('reset', track.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import type { Track } from '@/features/tracks/schema/trackSchema.ts'
const TrackWaveForm = defineAsyncComponent(
  () => import('@/features/audio/components/TrackWaveForm.vue')
)
import TrackActionsButton from '@/features/tracks/components/TrackActionsButton.vue'
import { DEFAULT_COVER_IMAGE } from '@/shared/constants.ts'

const props = defineProps<{
  track: Track
  selected: boolean
  playing: boolean
}>()

const emits = defineEmits<{
  (e: 'edit', track: Track): void
  (e: 'delete', track: Track): void
  (e: 'upload', track: Track): void
  (e: 'play', trackId: string): void
  (e: 'reset', trackId: string): void
  (e: 'select', trackId: string): void
}>()

function handleSelection() {
  emits('select', props.track.id)
}
</script>
