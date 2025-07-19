<template>
  <div class="genre-wrapper">
    <div class="add-genre-controls">
      <select id="add-genre-select" class="genre-add-select" data-testid="genre-select" v-model="selectedOption"
        @change="addGenre" :disabled="isLoading || !!error" :aria-label="selectAriaLabel">
        <option data-testid="genre-add-option" value="" disabled>
          {{ selectPlaceholder }}
        </option>
        <option v-for="option in availableGenres" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <div class="selected-genres-container" aria-live="polite" :class="{ 'has-genres': props.selected.length > 0 }">
      <label for="add-genre-select" class="form-label">
        Genres
      </label>
      <template v-if="props.selected.length > 0">
        <span v-for="(genre, index) in props.selected" :key="genre" class="selected-genre-chip" data-testid="genre-tag">
          {{ genre }}
          <button type="button" class="remove-genre-icon" @click="removeGenre(index)"
            :aria-label="`Remove genre ${genre}`" data-testid="genre-remove-button">
            &#x2715;
          </button>
        </span>
      </template>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGenreQuery } from '@/shared/composables/useGenreQuery.ts'

const { genres, isLoading, error } = useGenreQuery()

const props = defineProps<{
  selected: string[]
}>()

const emit = defineEmits<{
  (e: 'update:selected', value: string[]): void
}>()

const selectedOption = ref('')

const availableGenres = computed(() =>
  genres.value.filter((genre) => !props.selected.includes(genre))
)

const selectPlaceholder = computed(() => {
  if (isLoading.value) return 'Loading genres...'
  if (error.value) return 'Failed to load genres'
  return '+ Add genre'
})

const selectAriaLabel = computed(() =>
  props.selected.length > 0
    ? `Selected genres: ${props.selected.join(', ')}`
    : 'Select a genre to add'
)

function addGenre() {
  if (selectedOption.value) {
    emit('update:selected', [...props.selected, selectedOption.value])
    selectedOption.value = ''
  }
}

function removeGenre(index: number) {
  const updated = [...props.selected]
  updated.splice(index, 1)
  emit('update:selected', updated)
}
</script>
<style>
.genre-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  container-type: inline-size;
}

.selected-genres-container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 0.5rem 0.5rem 0.5rem;
  background-color: var(--color-bg-dark);
  border: 1px solid var(--color-glow-soft);
  border-radius: var(--border-radius-0-5);
  min-height: 2.5rem;

}

.form-label {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  font-size: 0.85rem;
  pointer-events: none;
  transition: all 0.2s ease;
}

.selected-genres-container.has-genres .form-label {
  position: absolute;
  top: -10px;
  left: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-base);
  background-color: var(--color-bg-dark);
  transform: none;
}

.selected-genre-chip {
  background-color: var(--color-accent-glow-blue);
  color: var(--color-bg-dark);
  padding: 6px 10px;
  border-radius: 1.25rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

.remove-genre-icon {
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: bold;
  color: var(--color-text-inverted);
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s ease-in-out;
}

.remove-genre-icon:hover {
  background-color: var(--color-bg-glass);
  color: var(--color-text-base);
}

select.genre-add-select {
  background-color: var(--color-bg-dark);
  border-radius: var(--border-radius-0-5);
  border: 1px solid var(--color-glow-soft);
  color: var(--color-text-base);
  font-weight: 500;
}

.add-genre-controls {
  width: 100%;
  display: flex;
}

.genre-add-select {
  font-weight: 500;
  font-family: 'Montserrat', Arial, Helvetica, sans-serif;
  flex-grow: 1;
  padding: 1rem;
  border-radius: var(--border-radius-0-5);
  background-color: transparent;
  border: 1px solid var(--color-glow-soft);
  color: var(--color-text-base);
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23b0b0b0'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 1em;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus-visible,
  &:focus {
    border-color: var(--color-primary-cyan);
    box-shadow: var(--box-shadow-blue);
    outline: none;
  }
}
</style>
