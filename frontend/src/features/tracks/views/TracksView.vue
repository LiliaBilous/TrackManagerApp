<template>
  <main class="main">
    <div class="main__container">
      <TrackToolbar />
      <BaseButton data-testid="create-track-button" class="main__create-track-button button" @click="openCreateModal"
        :disabled="trackStore.isLoading" :aria-disabled="trackStore.isLoading" :data-loading="trackStore.isLoading">
        + Create Track
      </BaseButton>
      <div class="tracks-container">
        <div v-if="trackStore.isLoading" data-testid="loading-tracks" data-loading="true"
          class="async-tracks-placeholder">
          Loading tracks...
          <div class="spinner" data-testid="loading-indicator" data-loading="true"></div>
        </div>
        <AsyncTrackList v-if="!trackStore.isLoading" :tracks="trackStore.tracks" @edit="openEditModal"
          @delete="openConfirmDelete" @upload="openUploadModal" @reset="handleFileRemove"
          @bulk-delete="deleteSelected" />
      </div>
      <PaginationControls v-if="!trackStore.isLoading && trackStore.totalPages > 1" data-testid="pagination"
        :current-page="filterStore.page" :total-pages="trackStore.totalPages" @change="onPageChange" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import type { Track } from '@/features/tracks/schema/trackSchema.ts'
import { ref, onMounted } from 'vue'
import { useTrackStore } from '@/features/tracks/stores/trackStore'
import { useTrackFileStore } from '@/features/tracks/stores/useTrackFileStore.ts'
import { useTrackFilterStore } from '@/features/filters/store/trackFilterStore.ts'
import { notifySuccess, notifyError } from '@/shared/services/toastService'
import { useModal } from '@/shared/composables/useModal'
import PaginationControls from '@/shared/components/ui/PaginationControls.vue'
import TrackToolbar from '@/features/filters/components/TrackToolbar.vue'
import BaseButton from '@/shared/components/ui/BaseButton.vue'

const AsyncTrackList = defineAsyncComponent(
  () => import('@/features/tracks/components/TrackList.vue')
)
const CreateTrackModal = defineAsyncComponent(
  () => import('@/features/tracks/components/modals/CreateTrackModal.vue')
)
const EditTrackModal = defineAsyncComponent(
  () => import('@/features/tracks/components/modals/EditTrackModal.vue')
)
const ConfirmDeleteModal = defineAsyncComponent(
  () => import('@/features/tracks/components/modals/ConfirmDeleteModal.vue')
)
const UploadFileModal = defineAsyncComponent(
  () => import('@/features/tracks/components/modals/UploadFileModal.vue')
)

const trackStore = useTrackStore()
const trackFileStore = useTrackFileStore()
const filterStore = useTrackFilterStore()
const { showModal, hideModal } = useModal()

const selectedTrack = ref<Track | null>(null)
const selectedIds = ref<string[]>([])
const selectAll = ref(false)

onMounted(() => {
  trackStore.fetchTracks()
})

function onPageChange(page: number) {
  filterStore.page = page
  selectAll.value = false
  selectedIds.value = []
  trackStore.fetchTracks()
}

function openCreateModal() {
  showModal(CreateTrackModal, {
    listeners: {
      close: hideModal,
      'new-track': (track: unknown) => addNewTrack(track as Track),
    },
  })
}
function openUploadModal(track: Track) {
  selectedTrack.value = { ...track }
  showModal(UploadFileModal, {
    props: { track: selectedTrack.value },
    listeners: {
      close: hideModal,
      upload: (id: unknown, file: unknown) => {
        if (typeof id === 'string' && file instanceof File) {
          handleFileUpload(id, file)
        }
      },
    },
  })
}
function openEditModal(track: Track) {
  selectedTrack.value = { ...track }
  showModal(EditTrackModal, {
    props: { track: selectedTrack.value },
    listeners: {
      close: hideModal,
      updated: (track: unknown) => handleTrackEdit(track as Track),
    },
  })
}
function openConfirmDelete(track: Track) {
  selectedTrack.value = { ...track }
  showModal(ConfirmDeleteModal, {
    props: { track: selectedTrack.value },
    listeners: {
      close: hideModal,
      confirm: (...args: unknown[]) => {
        const [id] = args
        if (typeof id === 'string') {
          deleteSingleTrack(id)
          hideModal()
        }
      },
    },
  })
}
async function addNewTrack(newTrack: Track) {
  const result = await trackStore.addTrack(newTrack)

  if (result.isOk()) {
    notifySuccess('New track added')
    selectAll.value = false
    selectedIds.value = []
  } else {
    notifyError(`Failed to add track: ${result.error.message}`)
  }
}
async function handleTrackEdit(updatedTrack: Track) {
  const result = await trackStore.editTrack(updatedTrack)
  if (result.isOk()) {
    notifySuccess('Track updated successfully')
  } else {
    notifyError('Failed to update track')
  }
}
async function deleteSingleTrack(id: string) {
  const result = await trackStore.removeTrack(id)
  if (result.isOk()) {
    notifySuccess('Track deleted successfully')
    selectAll.value = false
    selectedIds.value = []
  } else {
    notifyError(`Failed to delete track: ${result.error.message}`)
  }
}
async function deleteSelected(ids: string[]) {
  const result = await trackStore.removeTracks(ids)
  if (result.isOk()) {
    notifySuccess('Selected tracks deleted')
    selectAll.value = false
    selectedIds.value = []
  } else {
    notifyError('Failed to delete selected tracks')
  }
}
async function handleFileUpload(id: string, file: File) {
  const result = await trackFileStore.uploadFile(id, file)
  if (result.isOk()) {
    notifySuccess('File uploaded successfully')
  } else {
    notifyError('Upload failed')
  }
}
async function handleFileRemove(id: string) {
  const result = await trackFileStore.deleteFile(id)
  if (result.isOk()) {
    notifySuccess('File removed successfully')
  } else {
    notifyError('Failed to remove file')
  }
}
</script>
