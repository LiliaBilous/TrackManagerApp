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
        <img src="/image-desktop.webp" srcset="/image-mobile.webp 720w, /image-desktop.webp 1400w"
          sizes="(max-width: 768px) 100vw, 1400px" width="1400" height="800" fetchpriority="high" loading="eager"
          decoding="async" alt="Colorful audio waveform hero background" />

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
