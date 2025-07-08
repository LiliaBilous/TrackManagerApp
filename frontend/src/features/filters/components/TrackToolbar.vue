<template>
  <header class="toolbar">
    <div class="toolbar__container">
      <div class="toolbar__header">
        <button class="toolbar__button button" @click="dropdownOpen = !dropdownOpen" :aria-expanded="dropdownOpen"
          aria-controls="filters-section" aria-label="Toggle filters">
          {{ dropdownOpen ? 'Hide Filters' : 'Show Filters' }}
          <span>{{ dropdownOpen ? '▲' : '▼' }}</span>
        </button>

        <button class="toolbar__button reset-button button" @click="resetAllFilters" :disabled="!isFilterActive"
          aria-label="Reset all filters">
          Reset Filters <span>&times;</span>
        </button>
      </div>

      <div class="toolbar__body" v-if="dropdownOpen" id="filters-section" aria-label="Filter options">
        <div class="toolbar__item">
          <label for="search-input" class="visually-hidden">Search tracks</label>
          <input id="search-input" class="toolbar__search input" data-testid="search-input" type="text"
            v-model="filterStore.search" placeholder="Search..." aria-label="Search tracks by title or metadata" />
        </div>
        <div class="toolbar__item">
          <h2>Filter by Genre:</h2>
          <FilterTabGroup @modelValue="selectGenre" :options="availableGenres" v-model="filterStore.genre"
            ariaLabel="Select genre" variant="genre" />
        </div>
        <div class="toolbar__item">
          <label for="filter-artist" class="">Filter by Artist</label>
          <input id="filter-artist" class="toolbar__filter-input input" data-testid="filter-artist" type="text"
            v-model="filterStore.artist" placeholder="Filter by Artist" aria-label="Filter tracks by artist" />
        </div>
        <div class="toolbar__item">
          <h2>Sort by:</h2>
          <FilterTabGroup @modelValue="selectSort" :options="sortOptions" v-model="filterStore.sort"
            ariaLabel="Sort tracks" variant="sort" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import { useTrackFilterStore } from '@/features/filters/store/trackFilterStore.ts'

import { useSyncFiltersWithUrl } from '@/features/filters/composables/useFiltersWithUrl'
import FilterTabGroup from '@/features/filters/components/FilterTabGroup.vue'
import { useGenreQuery } from '@/shared/composables/useGenreQuery.ts'
const { genres: availableGenres } = useGenreQuery()

const route = useRoute()
const dropdownOpen = ref(false)
const filterStore = useTrackFilterStore()

const sortOptions = ['title', 'artist', 'album', 'createdAt']

function selectSort(value: string) {
  filterStore.sort = value
}
function selectGenre(value: string) {
  filterStore.genre = value
}
function resetAllFilters() {
  filterStore.resetFilters()
}

const isFilterActive = computed((): boolean => {
  return !!filterStore.search || !!filterStore.artist || !!filterStore.genre || !!filterStore.sort
})

useSyncFiltersWithUrl()
onMounted(() => {
  filterStore.initFromQuery(route.query)
})
</script>