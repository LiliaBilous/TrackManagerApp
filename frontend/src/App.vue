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
        <img src="/image.webp" aria-hidden="true" loading="eager" fetchpriority="high" />
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
<style>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  position: relative;
  overflow: auto;
  gap: 1rem;
  container-type: inline-size;
}


.hero {
  position: relative;
  height: var(--hero-height);
  width: 100%;
}

.hero__background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
}

.hero__content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: var(--color-text-base);
}

.hero__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero__title {
  line-height: 1.2;
  min-height: 4rem;
  font-size: 4rem;
  font-weight: 700;
}

@media screen and (max-width: 40rem) {
  .hero__title {
    font-size: 3em;
    margin-top: 2rem;
  }
}

@media screen and (max-width: 30rem) {
  .hero__title {
    font-size: 2.5em;
  }
}

.async-tracks-placeholder {
  min-height: 20vh;
}
</style>
