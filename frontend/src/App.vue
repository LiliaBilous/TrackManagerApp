<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import { ref, onMounted } from 'vue'
const isMobile = ref(false)
onMounted(() => {
  isMobile.value = window.matchMedia('(max-width: 625px)').matches
})

</script>

<template>
  <AppLayout title="Track Manager">
    <Suspense>
      <template #default>
        <router-view></router-view>
      </template>
      <template #fallback>
        <div class="async-tracks-placeholder">
          <div class="spinner" data-testid="loading-indicator" data-loading="true"></div>
        </div>
      </template>
    </Suspense>
  </AppLayout>
</template>
