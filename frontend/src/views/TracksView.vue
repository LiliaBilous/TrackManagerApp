<template>
  <main class="main">
    <div class="main__container">
      <TrackToolbar />

      <div
        v-if="trackStore.isLoading"
        data-testid="loading-tracks"
        data-loading="true"
        class="loading-indicator"
      >
        Loading tracks...
      </div>

      <Transition name="fade">
        <TrackBulkActions
          v-if="!trackStore.isLoading && selectedIds.length"
          :selected-ids="selectedIds"
          :select-all="selectAll"
          @update:selectAll="toggleSelectAll"
          @delete-selected="deleteSelected"
        />
      </Transition>

      <button
        data-testid="create-track-button"
        class="main__create-track-button button"
        @click="showModal = true"
        :disabled="trackStore.isLoading"
        :aria-disabled="trackStore.isLoading"
        :data-loading="trackStore.isLoading"
      >
        + Create Track
      </button>

      <TrackList
        v-if="!trackStore.isLoading"
        :tracks="trackStore.tracks"
        :selected-ids="selectedIds"
        :select-all="selectAll"
        @edit="openEditModal"
        @delete="openConfirmDelete"
        @update:selected-ids="val => selectedIds = val"
        @upload="openUploadModal"
        @reset="handleFileRemove"
      />

      <PaginationControls
        v-if="!trackStore.isLoading && trackStore.totalPages > 1"
        data-testid="pagination"
        :current-page="trackStore.page"
        :total-pages="trackStore.totalPages"
        @change="onPageChange"
      />
    </div>

    <Teleport to="#modal">
      <Transition name="modal-fade">
        <div v-if="showModal || isEditModalOpen || isUploadModalOpen || showConfirmDeleteModal">
          <CreateTrackModal
            v-if="showModal"
            @close="showModal = false"
            @new-track="addNewTrack"
          />
          <EditTrackModal
            v-if="isEditModalOpen"
            :track="selectedTrack"
            @close="isEditModalOpen = false"
            @updated="handleTrackUpdate"
          />
          <UploadFileModal
            v-if="isUploadModalOpen"
            :track="selectedTrack"
            @close="isUploadModalOpen = false"
            @upload="handleFileUpload"
          />
          <ConfirmDeleteModal
            v-if="showConfirmDeleteModal"
            :track="selectedTrack"
            @close="showConfirmDeleteModal = false"
            @confirm="deleteSingleTrack"
          />
        </div>
      </Transition>
    </Teleport>
  </main>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue'
import { useTrackStore } from '@/stores/trackStore'
import { notifySuccess, notifyError } from '@/services/toastService'

import TrackList from '@/components/TrackList.vue'
import CreateTrackModal from '@/components/modals/CreateTrackModal.vue'
import EditTrackModal from '@/components/modals/EditTrackModal.vue'
import ConfirmDeleteModal from '@/components/modals/ConfirmDeleteModal.vue'
import UploadFileModal from '@/components/modals/UploadFileModal.vue'
import PaginationControls from '@/components/common/Pagination.vue'
import TrackToolbar from '@/components/TrackToolbar.vue'
import TrackBulkActions from '@/components/TrackBulkActions.vue'

const trackStore = useTrackStore()
const showModal = ref(false)
const isEditModalOpen = ref(false)
const isUploadModalOpen = ref(false)
const showConfirmDeleteModal = ref(false)
const selectedTrack = ref(null)
const selectedIds = ref([])
const selectAll = ref(false)

onMounted(() => {
  trackStore.fetchTracks()
})
watch(selectedIds, (newVal) => {
  selectAll.value = newVal.length === trackStore.tracks.length
})

function toggleSelectAll(value) {
  selectAll.value = value
  selectedIds.value = value ? trackStore.tracks.map(t => t.id) : []
}
function onPageChange(page) {
  trackStore.page = page
  selectAll.value = false
  selectedIds.value = []
  trackStore.fetchTracks()
}
function openUploadModal(track) {
  selectedTrack.value = { ...track }
  isUploadModalOpen.value = true
}
function openEditModal(track) {
  selectedTrack.value = { ...track }
  isEditModalOpen.value = true
}
function openConfirmDelete(track) {
  selectedTrack.value = { ...track }
  showConfirmDeleteModal.value = true
}
function addNewTrack(newTrack) {
  try {
    trackStore.addTrack(newTrack)
    notifySuccess('New track added')
  } catch (e) {
    notifyError('Failed to add track')
  }
}
function handleTrackUpdate(updatedTrack) {
  try {
    trackStore.editTrack(updatedTrack)
    notifySuccess('Track updated successfully')
  } catch (e) {
    notifyError('Failed to update track')
  }
}
function handleFileUpload(id, file) {
  try {
    trackStore.uploadFile(id, file)
    notifySuccess('File uploaded successfully')
  } catch (e) {
    notifyError('Upload failed')
  }
}
function handleFileRemove(id) {
  try {
    trackStore.deleteFile(id)
    notifySuccess('File removed successfully')
  } catch (e) {
    notifyError('Failed to remove file')
  }
}
function deleteSingleTrack(id) {
  console.log('Deleting track with id:', id)
  try {
    trackStore.removeTrack(id)
    notifySuccess('Track deleted successfully!')
    showConfirmDeleteModal.value = false
  } catch (e) {
    notifyError('Failed to delete track')
  }
}


function deleteSelected() {
  try {
    trackStore.removeTracks(selectedIds.value)
    selectedIds.value = []
    selectAll.value = false
    notifySuccess('Selected tracks deleted')
  } catch (e) {
    notifyError('Failed to delete selected tracks')
  }
}

</script>
<style>
.main__create-track-button {
  position: relative;
  font-size: 1.25em;
  font-weight: 600;
  color: white;
  overflow: hidden;
  z-index: 1;
  background: linear-gradient(90deg, #7B2EFF 0%, #FF2D5E 50%, #FF6B2C 100%);
  transition: color 0.3s ease-in-out;
}

.main__create-track-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(262deg, #7B2EFF 0%, #FF2D5E 50%, #FF6B2C 100%);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  z-index: -1;
}

.main__create-track-button:hover::before {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* modal anim */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
}
</style>