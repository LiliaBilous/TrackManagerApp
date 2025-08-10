<script setup lang="ts">
import AppFooter from '@/shared/components/ui/AppFooter.vue'
import ModalHost from '@/shared/components/modal/ModalHost.vue'
import ActiveTrack from '@/shared/components/ActiveTrack.vue'

defineProps<{
    title: string
}>()
</script>

<template>
    <div class="layout">
        <section class="hero">
            <div class="hero__background">
                <picture>
                    <source srcset="/image-desktop.avif 1400w, /image-mobile.avif 720w" type="image/avif">
                    <source srcset="/image-desktop.webp 1400w, /image-mobile.webp 720w" type="image/webp">
                    <img src="/image-desktop.avif" alt="Colorful audio waveform hero background">
                </picture>
            </div>
            <div class="hero__content">
                <ActiveTrack />
                <h1 class="hero__title">{{ title }}</h1>
            </div>
        </section>

        <main class="main">
            <slot />
        </main>

        <ModalHost />
        <AppFooter />
    </div>
</template>
