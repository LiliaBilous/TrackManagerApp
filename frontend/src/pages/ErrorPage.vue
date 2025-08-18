<script setup lang="ts">
import BaseButton from '@/shared/components/ui/BaseButton.vue'
</script>

<template>
    <section class="error-section">
        <h2 class="error-title">404</h2>
        <p>The page you are looking for does not exist.</p>
        <BaseButton class="button button-outline edit-button">Return to tracks</BaseButton>
    </section>
</template>

<style scoped>
.error-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    gap: 1rem;
    height: 40vh;
}

.error-title {
    font-size: 6em;
    font-weight: 700;
    background: linear-gradient(45deg,
            #ff4d6d,
            #ff5f0e,
            #a64dff,
            #4d88ff,
            #00d1ff,
            #ff4d6d);
    background-size: 400% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: color-flow 8s ease-in-out infinite;
}

@keyframes color-flow {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
</style>
