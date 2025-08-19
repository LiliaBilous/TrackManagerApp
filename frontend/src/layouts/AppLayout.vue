<script setup lang="ts">
import AppFooter from '@/shared/components/ui/AppFooter.vue'
import ModalHost from '@/shared/components/modal/ModalHost.vue'
import ActiveTrack from '@/shared/components/ActiveTrack.vue'
import { ref, onMounted } from 'vue';
defineProps<{
    title: string
}>()
const isLoaded = ref(false);
const onImageLoad = () => {
    isLoaded.value = true;
};
onMounted(() => {
    const imgElement = new Image();

    if (imgElement.complete) {
        onImageLoad();
    }
});
</script>

<template>
    <div class="layout">
        <section class="hero">
            <div class="hero__background" :class="{ 'loaded': isLoaded }">
                <img src="/image-25.avif" alt="Placeholder" class="placeholder" />

                <img src="/image-desktop.avif" alt="Colorful audio waveform hero background" @load="onImageLoad" />
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
