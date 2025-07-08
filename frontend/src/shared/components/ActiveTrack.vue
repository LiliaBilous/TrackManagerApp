<template>
  <div class="active-track-container">
    <div class="active-track">
      🎧 Active track:
      <Transition name="fade-in" mode="out-in">
        <div :key="activeTrack" class="track-title">
          {{ activeTrack ?? 'Loading...' }}
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import gql from 'graphql-tag'
import { useSubscription } from '@vue/apollo-composable'

const ACTIVE_TRACK = gql`
  subscription {
    activeTrackTitle
  }
`
const { result } = useSubscription(ACTIVE_TRACK)
const activeTrack = computed(() => result.value?.activeTrackTitle)
</script>

<style>
.active-track-container {
  min-height: 3rem;
  width: 25rem;
}

.active-track {
  background: var(--color-bg-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius-0-5);
  border: 1px solid var(--color-glow-soft);

  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;

  font-size: 1rem;
  color: var(--color-text-base);
  max-width: 100%;
  margin: 1rem auto;
  transition: all 0.4s ease;
}

.fade-in-enter-active {
  animation: fadeIn 0.5s ease;
}

.fade-in-leave-active {
  opacity: 0;
  transition: var(--transition);
}

.track-title {
  font-weight: 600;
  color: var(--color-primary-cyan);
}

@media (width < 30rem) {
  .active-track {
    font-size: 0.875rem;
    padding: 0.5rem;
    max-width: 80%;
  }
}
</style>
