<script setup lang="ts">
import AppFooter from '@/shared/components/ui/AppFooter.vue'
import ModalHost from '@/shared/components/modal/ModalHost.vue'
import ActiveTrack from '@/shared/components/ActiveTrack.vue'
import TracksView from '@/features/tracks/views/TracksView.vue'
import { ref, onMounted } from 'vue'
const isMobile = ref(false)
onMounted(() => {
  isMobile.value = window.matchMedia('(max-width: 625px)').matches
})
</script>

<template>
  <div class="wrapper">
    <section class="hero">
      <div class="hero__background">
        <img :src="isMobile ? '/image-mobile.webp' : '/image-descktop.webp'" :width="isMobile ? 720 : 1920"
          :height="isMobile ? 400 : 1080" fetchpriority="high" loading="eager" decoding="async" alt="hero img"
          aria-hidden="true" style="aspect-ratio: 16 / 9; object-fit: cover; display: block" />
      </div>
      <div class="hero__content">
        <ActiveTrack />
        <div>
          <h1 class="hero__title" data-testid="tracks-header">Track Manager</h1>
        </div>
      </div>
    </section>
    <Suspense>
      <template #default>
        <TracksView />
      </template>
      <template #fallback>
        <div class="async-tracks-placeholder">
          <div class="spinner" data-testid="loading-indicator" data-loading="true"></div>
        </div>
      </template>
    </Suspense>
    <ModalHost />
    <AppFooter />
  </div>
</template>
