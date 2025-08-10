<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
</script>

<template>
    <AppLayout title="Page Not Found">
        <section class="error-section">
            <h2>404</h2>
            <p>The page you are looking for does not exist.</p>
        </section>
    </AppLayout>
</template>

<style scoped>
.error-section {
    text-align: center;
    padding: 3rem 1rem;
}
</style>
