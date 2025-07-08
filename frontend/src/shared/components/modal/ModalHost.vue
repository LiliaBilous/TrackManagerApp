<template>
  <Teleport to="#modal">
    <Transition name="modal-fade">
      <component :is="component" v-if="show && component" v-bind="props" v-on="listeners" />
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useModal } from '@/shared/composables/useModal'
import { computed } from 'vue'

const { component, show, modalPayload } = useModal()

const props = computed(() => modalPayload.value?.props || {})
const listeners = computed(() => modalPayload.value?.listeners || {})
</script>
