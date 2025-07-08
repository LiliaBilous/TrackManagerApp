<template>
  <div class="genre-wrapper">
    <label for="genre-select" class="form-label">Genres</label>
    <select id="genre-select" data-testid="genre-select" v-model="selectedOption" @change="handleSelect"
      class="form-input genre-select" aria-label="Select a genre to add" :disabled="isLoading || !!error">
      <option data-testid="genre-add-option" value="">
        {{ isLoading ? 'Loading genres...' : error ? 'Failed to load genres' : '+ Add genre' }}
      </option>
      <option v-for="option in genreOptions" :key="option" :value="option">
        {{ option }}
      </option>
    </select>

    <div class="genre-container">
      <span v-for="(genre, index) in props.selected" :key="genre" class="genre-tag" data-testid="genre-tag">
        {{ genre }}
        <button type="button" @click="removeGenre(index)" title="Remove genre" :aria-label="`Remove genre ${genre}`"
          data-testid="genre-remove-button">
          &times;
        </button>
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGenreQuery } from '@/shared/composables/useGenreQuery.ts'
const { genres, isLoading, error } = useGenreQuery()
const props = defineProps<{ selected: string[] }>()
const emit = defineEmits<{ (e: 'update:selected', value: string[]): void }>()

const selectedOption = ref('')

const genreOptions = computed(() => genres.value.filter((genre) => !props.selected.includes(genre)))

function handleSelect() {
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
  gap: 0.75rem;
  container-type: inline-size;
}

.genre-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: transparent;
  color: var(--color-text-base);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);

  &:focus-visible {
    border-color: var(--color-primary-cyan);
    box-shadow: var(--box-shadow-blue);
    outline: none;
  }
}

select.genre-select option {
  background-color: var(--color-bg-dark);
  color: var(--color-text-base);
  font-weight: 500;

  &:hover,
  :focus {
    color: var(--color-primary-cyan);
    border-color: var(--color-primary-cyan);
  }
}

.genre-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.genre-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-base);
  background-color: var(--color-accent-glow-blue);
  border: 1px solid transparent;
  border-radius: var(--border-radius-1);
  transition: var(--transition);

  &:hover {
    background-color: transparent;
    border: 1px solid var(--color-primary-cyan);
    color: var(--color-primary-cyan);
  }

  button {
    background: none;
    border: none;
    font-size: 1rem;
    line-height: 1;
    cursor: pointer;
    color: var(--color-text-base);
    transition: var(--transition);
  }

  &:hover button {
    color: var(--color-primary-cyan);
  }
}

@container (max-width: 40rem) {
  .genre-tag {
    font-size: 0.75rem;
    padding: 0.2rem 0.5rem;
  }

  .genre-tag button {
    font-size: 0.9rem;
  }
}
</style>
