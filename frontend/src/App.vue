<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import AppFooter from '@/shared/components/ui/AppFooter.vue'
import ModalHost from '@/shared/components/modal/ModalHost.vue'
import ActiveTrack from '@/shared/components/ActiveTrack.vue'
const AsyncTracksView = defineAsyncComponent({
  loader: () => import('@/features/tracks/views/TracksView.vue'),
  delay: 0,
  timeout: 10000,
  suspensible: true,
})
</script>

<template>
  <div class="wrapper">
    <section class="hero">
      <div class="hero__background">
        <picture>
          <source srcset="/image-mobile.webp" media="(max-width: 625px)" type="image/webp" />
          <img src="/image-descktop.webp" alt="" aria-hidden="true" loading="eager" fetchpriority="high"
            decoding="async" width="1920" height="1080" style="aspect-ratio: 16 / 9; object-fit: cover;" />
        </picture>
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
        <AsyncTracksView />
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
