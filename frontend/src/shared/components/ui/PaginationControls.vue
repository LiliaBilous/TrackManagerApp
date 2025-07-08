<template>
  <div class="pagination">
    <button data-testid="pagination-prev" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
      class="pagination-button">
      &laquo;
    </button>

    <button v-for="page in visiblePages" :key="page" @click="goToPage(page)"
      :class="['pagination-page', { active: page === currentPage }]">
      {{ page }}
    </button>

    <button data-testid="pagination-next" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
      class="pagination-button">
      &raquo;
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
  maxVisible?: number
}>()

const emit = defineEmits<{
  (e: 'change', page: number): void
}>()

const maxVisible = computed(() => props.maxVisible ?? 5)

function goToPage(page: number) {
  if (page >= 1 && page <= props.totalPages) {
    emit('change', page)
  }
}

const visiblePages = computed(() => {
  const half = Math.floor(maxVisible.value / 2)
  let start = props.currentPage - half
  let end = props.currentPage + half

  if (start < 1) {
    end += 1 - start
    start = 1
  }

  if (end > props.totalPages) {
    start -= end - props.totalPages
    end = props.totalPages
  }

  start = Math.max(start, 1)

  const pages: number[] = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})
</script>

<style></style>
