<template>
  <div>
    <Transition name="fade">
      <TrackBulkActions
        v-if="selectedIds.length"
        :selected-ids="selectedIds"
        :select-all="selectAll"
        @update:selectAll="toggleSelectAll"
        @delete-selected="deleteSelected"
      />
    </Transition>
    <TransitionGroup class="track-list" name="list" tag="div" v-if="tracks.length > 0">
      <TrackCard
        v-for="track in tracks"
        :key="track.id"
        :track="track"
        :selected="selectedIds.includes(track.id)"
        :disable-actions="selectedIds.length > 0"
        @edit="emits('edit', track)"
        @delete="emits('delete', track)"
        @upload="emits('upload', track)"
        @play="handlePlay"
        @reset="handleReset"
        @select="handleSelect"
      />
    </TransitionGroup>
    <div v-else>
      <p>No tracks found.</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import TrackBulkActions from '@/features/tracks/components/TrackBulkActions.vue'
import TrackCard from '@/features/tracks/components/TrackCard.vue'
import ConfirmDeleteModal from '@/features/tracks/components/modals/ConfirmDeleteModal.vue'
import { useModal } from '@/shared/composables/useModal'
import type { Track } from '@/features/tracks/schema/trackSchema'
import { useTrackAudioStore } from '@/features/audio/store/audioStore'
const audioStore = useTrackAudioStore()

const props = defineProps<{
  tracks: Track[]
}>()

const emits = defineEmits<{
  (e: 'edit', track: Track): void
  (e: 'delete', track: Track): void
  (e: 'upload', track: Track): void
  (e: 'reset', trackId: string): void
  (e: 'bulk-delete', ids: string[]): void
}>()

const selectedIds = ref<string[]>([])
const selectAll = ref(false)
const { showModal, hideModal } = useModal()

function handlePlay(trackId: string) {
  audioStore.togglePlay(trackId)
}

function handleReset(trackId: string) {
  emits('reset', trackId)
}

function handleSelect(trackId: string) {
  const updated = [...selectedIds.value]
  const index = updated.indexOf(trackId)
  if (index === -1) {
    updated.push(trackId)
  } else {
    updated.splice(index, 1)
  }
  selectedIds.value = updated
}

function toggleSelectAll(val: boolean) {
  selectAll.value = val
  selectedIds.value = val ? props.tracks.map((t) => t.id) : []
}

function deleteSelected() {
  showModal(ConfirmDeleteModal, {
    props: {
      track: { id: '', title: `${selectedIds.value.length} selected tracks` },
    },
    listeners: {
      close: hideModal,
      confirm: () => {
        emits('bulk-delete', selectedIds.value)
        selectedIds.value = []
        selectAll.value = false
        hideModal()
      },
    },
  })
}

watch(
  () => props.tracks,
  () => {
    if (selectAll.value) {
      selectedIds.value = props.tracks.map((t) => t.id)
    }
  }
)
</script>
