<template>
  <div class="genre-wrapper">
    <label for="genre-select" class="form-label">Genres</label>
    <select
      id="genre-select"
      data-testid="genre-select"
      v-model="selectedOption"
      @change="handleSelect"
      class="form-input genre-select"
      aria-label="Select a genre to add"
    >
      <option data-testid="genre-add-option" value="">+ Add genre</option>
      <option
        v-for="option in genreOptions"
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>

    <div class="genre-container">
      <span
        v-for="(genre, index) in selected"
        :key="genre"
        class="genre-tag"
        data-testid="genre-tag"
      >
        {{ genre }}
        <button
          type="button"
          @click="removeGenre(index)"
          title="Remove genre"
          :aria-label="`Remove genre ${genre}`"
          data-testid="genre-remove-button"
        >
          &times;
        </button>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getGenres } from '@/services/api.js'

const props = defineProps({
  selected: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:selected'])

const availableGenres = ref([])
const selectedOption = ref('')

onMounted(async () => {
  const result = await getGenres()
  availableGenres.value = result
})

const genreOptions = computed(() =>
  availableGenres.value.filter(genre => !props.selected.includes(genre))
)

function handleSelect() {
  if (selectedOption.value) {
    emit('update:selected', [...props.selected, selectedOption.value])
    selectedOption.value = ''
  }
}

function removeGenre(index) {
  const updated = [...props.selected]
  updated.splice(index, 1)
  emit('update:selected', updated)
}
</script>
