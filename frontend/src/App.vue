<script setup>
import { defineAsyncComponent } from 'vue'
import AppFooter from '@/components/common/AppFooter.vue'

const AsyncTracksView = defineAsyncComponent({
  loader: () => import('@/views/TracksView.vue'),
  delay: 200, 
  timeout: 10000,
})
</script>

<template>
  <div class="wrapper">
    <section class="hero">
      <div class="hero__background"></div>
      <div class="hero__content">
        <h1 data-testid="tracks-header" class="hero__title">Track Manager</h1>
      </div>
    </section>

    <Suspense>
      <template #default>
        <AsyncTracksView />
      </template>
      <template #fallback>
        <div class="spinner" data-testid="loading-indicator" data-loading="true"></div>
      </template>
    </Suspense>

    <AppFooter />
  </div>
</template>
