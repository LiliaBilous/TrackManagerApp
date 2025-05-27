<template>
  <header class="toolbar">
    <div class="toolbar__container">
      <div class="toolbar__actions">
        <button class="toolbar__button button" @click="dropdownOpen = !dropdownOpen"
          :aria-expanded="dropdownOpen.toString()" aria-controls="filters-section" aria-label="Toggle filters">
          {{ dropdownOpen ? 'Hide Filters' : 'Show Filters' }} <span>{{ dropdownOpen ? '▲' : '▼' }}</span>
        </button>

        <button class="toolbar__button reset-button button" @click="resetFilters" :disabled="!isFilterActive"
          aria-label="Reset all filters">
          Reset Filters <span>&times;</span>
        </button>
      </div>

      <div class="toolbar__body" v-if="dropdownOpen" id="filters-section" aria-label="Filter options">
        <div class="toolbar__filter-genre">
          <p>Filter by Genre:</p>
          <div class="genre-tabs" role="group" aria-label="Genre tabs">
            <button v-for="genre in availableGenres" :key="genre"
              :class="['genre-tab', trackStore.genres[0] === genre ? 'active' : '']" @click="selectGenre(genre)"
              :aria-pressed="trackStore.genres[0] === genre"
              :aria-label="trackStore.genres[0] === genre ? `Unselect genre ${genre}` : `Select genre ${genre}`">
              {{ genre }}
            </button>
          </div>
        </div>

        <div class="toolbar__footer">
          <label for="sort-select" class="visually-hidden">Sort tracks</label>
          <select id="sort-select" class="toolbar__sort input" data-testid="sort-select" v-model="trackStore.sort"
            @change="trackStore.fetchTracks" aria-label="Sort tracks">
            <option disabled value="">Sort By</option>
            <option value="title">Title</option>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
            <option value="createdAt">Created At</option>
          </select>

          <label for="search-input" class="visually-hidden">Search tracks</label>
          <input id="search-input" class="toolbar__search input" data-testid="search-input" type="text"
            v-model="trackStore.search" @input="debouncedSearch" placeholder="Search..."
            aria-label="Search tracks by title or metadata" />

          <label for="filter-artist" class="visually-hidden">Filter by Artist</label>
          <input id="filter-artist" class="toolbar__filter-input input" data-testid="filter-artist" type="text"
            v-model="trackStore.artist" @input="trackStore.fetchTracks" placeholder="Filter by Artist"
            aria-label="Filter tracks by artist" />
        </div>
      </div>
    </div>
  </header>
</template>


<script setup>
import { useTrackStore } from '@/stores/trackStore'
import { ref, onMounted, computed } from 'vue'
import debounce from 'lodash.debounce'
import { getGenres } from '@/services/api'

const trackStore = useTrackStore()
const availableGenres = ref([])
const dropdownOpen = ref(true)

const debouncedSearch = debounce(() => {
  trackStore.page = 1
  trackStore.fetchTracks()
}, 500)

onMounted(async () => {
  try {
    const genres = await getGenres()
    availableGenres.value = genres
  } catch (e) {
    console.error('Failed to load genres:', e)
  }
})

function selectGenre(genre) {
  if (trackStore.genres[0] === genre) {
    trackStore.genres = []
  } else {
    trackStore.genres = [genre]
  }
  trackStore.page = 1
  trackStore.fetchTracks()
}
function resetFilters() {
  trackStore.search = ''
  trackStore.artist = ''
  trackStore.genres = []
  trackStore.sort = ''
  trackStore.page = 1
  trackStore.fetchTracks()
}
const isFilterActive = computed(() => {
  return (
    trackStore.search ||
    trackStore.artist ||
    trackStore.genres.length > 0 ||
    trackStore.sort
  )
})

</script>
<style>
.toolbar {
  border-radius: 0.5rem;
  background-color: var(--text-color);
  color: var(--white-color);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

.toolbar__container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 1rem;
}

.toolbar__actions {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.toolbar__body {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  animation: fadeIn 0.3s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.toolbar__filter-genre {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.toolbar__footer {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
}

.toolbar__sort,
.toolbar__search,
.toolbar__filter-input {
  color: var(--white-color);
  background-color: transparent;
  border: 1px solid var(--white-color);
  width: 30%;
  font-weight: 500;
  outline: none;
  transition: all 0.3s ease-in-out;
}

.toolbar__sort:focus-within,
.toolbar__search:focus-within,
.toolbar__filter-input:focus-visible {
  color: var(--secondary-color);
  border: 1px solid var(--secondary-color);
}

.genre-tabs {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.genre-tab {
  border: 1px solid var(--secondary-color);
  padding: 0.5rem 0.75rem;
  border-radius: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
}

.genre-tab:hover,
.genre-tab.active {
  background-color: var(--secondary-color);
  color: var(--white-color);
  border: 1px solid transparent;
}

.toolbar__button {
  transition: all ease-in-out 0.3s;
  border: 1px solid var(--white-color);
  display: flex;
  align-items: center;
  gap: .5rem;
}

.toolbar__button:hover {
  background-color: var(--white-color);
  color: var(--text-color);
}

.toolbar__button span {
  font-size: 1rem;
}

.reset-button {
  color: var(--accent-color);
  border: 1px solid var(--accent-color);
}

.reset-button:hover {
  background-color: var(--accent-color);
  color: var(--white-color);
}

.reset-button:active {
  background-color: var(--white-color);
  color: var(--accent-color);
}

.reset-button:disabled {
  border: 1px solid var(--border-color);
  color: var(--border-color);
  cursor: not-allowed;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

@media screen and (max-width: 20rem) {
  .toolbar__container {
    padding: 0.35rem;
  }

  .genre-tabs {
    width: 100%;
    gap: 0.25rem;
  }

  .genre-tab {
    padding: 0.25rem 0.5rem;
    border-radius: .5rem;
  }

  .toolbar__footer {
    gap: 0.25rem;
  }
}
</style>