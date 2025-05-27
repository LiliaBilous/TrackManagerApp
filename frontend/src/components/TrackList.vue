<template>
  <div class="track-list">
    <TransitionGroup name="list" tag="div" class="track-list__container" v-if="tracks.length > 0">
      <div v-for="track in tracks" :key="track.id" class="track-list__track-item"
        :data-testid="`track-item-${track.id}`">
        <div class="track-item__card">
          <div class="track-item__content">
            <label class="custom-checkbox">
              <input :data-testid="`track-checkbox-${track.id}`" type="checkbox"
                :checked="selectedIds.includes(track.id)"
                @change="$emit('update:selected-ids', toggleSelection(track.id))" :id="`${track.id}`" />
              <span class="checkmark"></span>
            </label>
            <img :src="track.coverImage || defaultImage" alt="cover" class="track-item__image" />
            <div>
              <h2 :data-testid="`track-item-${track.id}-title`" class="track-item__title">{{ track.title }}</h2>
              <p :data-testid="`track-item-${track.id}-artist`" class="track-item__subtitle">{{ track.artist }} — {{
                track.album }}</p>
              <p class="track-item__genre">{{ track.genres.join(', ') }}</p>
            </div>
          </div>
          <TrackActionsButton :track="track" @edit="$emit('edit', track)" @delete="$emit('delete', track)"
            @upload="$emit('upload', track)" @play-track="handlePlay" />

        </div>
        <TrackWaveForm class="track-item__waveform" @reset="id => emits('reset', id)" :slug="track.slug"
          v-if="track.audioFile && playingTrackId === track.id" />
      </div>
    </TransitionGroup>
    <div v-else>
      <p>No tracks found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

import TrackWaveForm from '@/components/TrackWaveForm.vue'
import TrackActionsButton from '@/components/TrackActionsButton.vue'

const props = defineProps({
  tracks: Array,
  selectedIds: Array,
  selectAll: Boolean,
})
const playingTrackId = ref(null)
const isPlayerVisible = ref(false)


function handlePlay(trackId) {
  playingTrackId.value = playingTrackId.value === trackId ? null : trackId;
  isPlayerVisible.value = !isPlayerVisible.value
  console.log(`Кнопку "Play" натиснуто для треку з ID: ${trackId}`);
}

const emits = defineEmits(['edit', 'delete', 'update:selected-ids', 'upload', 'reset'])

const defaultImage = 'https://placehold.co/100'

function toggleSelection(id) {
  const updated = [...props.selectedIds]
  const index = updated.indexOf(id)
  if (index === -1) {
    updated.push(id)
  } else {
    updated.splice(index, 1)
  }
  return updated
}

watch(
  () => props.selectAll,
  (val) => {
    if (val) {
      emits('update:selected-ids', props.tracks.map(t => t.id))
    } else {
      emits('update:selected-ids', [])
    }
  },
)
watch(
  () => props.tracks,
  () => {
    if (props.selectAll) {
      emits('update:selected-ids', props.tracks.map(t => t.id))
    }
  }
)
</script>
<style>
.track-list__track-item {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--grey-fill-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.track-list__container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0;
}

.track-item__card {
  display: flex;
  justify-content: space-between;
  align-items: center;

}

.track-item__content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.track-item__image {
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;
}

.track-item__title {
  font-size: 1.25rem;
  font-weight: bold;
}

.track-item__subtitle {
  font-size: 1rem;
  color: var(--text-color);
}

.track-item__genre {
  font-size: 0.875rem;
}


.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@media screen and (max-width: 50rem) {
  .track-list__track-item {
    padding: 0.5rem;
  }
}


@media screen and (max-width: 30rem) {
  .track-item__content {
    gap: 0.5rem;
  }

  .track-item__image {
    width: 2.5rem;
    height: 2.5rem;
  }

  .track-item__title {
    font-size: 1rem;
    font-weight: 600;
  }

  .track-item__subtitle {
    font-size: 0.85rem;
    color: var(--text-color);
  }

  .track-item__genre {
    font-size: 0.75rem;
  }
}
</style>