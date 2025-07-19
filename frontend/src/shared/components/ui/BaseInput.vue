<template>
    <div class="input-group" :class="{ 'has-error': error, 'is-focused': isFocused, 'has-value': !!inputValue }">
        <div class="input-wrapper">
            <input :id="id" :type="type" v-model="inputValue" :class="['input', inputClass]"
                :placeholder="isLabelFloating ? placeholder : ''" v-bind="$attrs" :aria-label="ariaLabel"
                :data-testid="dataTestid" @focus="onFocus" @blur="onBlur" @input="onInput" />
            <label v-if="label" :for="id" class="label" :data-testid="error ? errorTestid : undefined">
                <slot name="label">{{ label }}</slot>
            </label>
        </div>
        <p v-if="error" class="input-error" :data-testid="errorTestid">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits, ref } from 'vue'

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: '',
    },
    label: {
        type: String,
        default: '',
    },
    id: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'text',
    },
    placeholder: {
        type: String,
        default: '',
    },
    error: {
        type: String,
        default: '',
    },
    inputClass: {
        type: String,
        default: '',
    },
    ariaLabel: {
        type: String,
        default: '',
    },
    dataTestid: {
        type: String,
        default: '',
    },
    errorTestid: {
        type: String,
        default: '',
    },
})

const emit = defineEmits(['update:modelValue'])

const isFocused = ref(false)

const inputValue = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
})

const isLabelFloating = computed(() => isFocused.value || !!inputValue.value)

function onFocus() {
    isFocused.value = true
}
function onBlur() {
    isFocused.value = false
}
function onInput(event: Event) {
    emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style>
.input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.input-wrapper {
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    border-radius: var(--border-radius-0-5);
    min-height: 3.5rem;
}

.input {
    width: 100%;
    padding: 1.25rem 1rem 6px 1rem;
    border: 1px solid var(--color-glow-soft);
    border-radius: var(--border-radius-0-5);
    font-size: 1rem;
    background-color: transparent;
    color: var(--color-text-base);
    transition: var(--transition);
    outline: none;
    z-index: 2;

    &:focus-visible {
        border-color: var(--color-primary-cyan);
        outline: none;
    }
}

.label {
    position: absolute;
    left: 1rem;
    top: 1.25rem;
    font-size: 1rem;
    pointer-events: none;
    transition: all 0.18s cubic-bezier(.4, 0, .2, 1);
    background: transparent;
    z-index: 3;
    color: var(--color-text-base);
}

.input-group.is-focused .label {
    color: var(--color-primary-cyan);
}

.input-group.is-focused .label,
.input-group.has-value .label {
    top: 0;
    font-size: 0.85rem;
    background: var(--color-bg-dark);
    padding: 0;
}

.input-group.has-error.is-focused .label,
.input-group.has-error.has-value .label,
.input-group.has-error .label {
    color: var(--color-primary-pink);
}

.input-error,
.error-text {
    border-color: var(--color-primary-pink);
    color: var(--color-primary-pink);
    font-size: 0.875rem;
    margin-left: 0.5rem;
    margin-top: 2px;
}
</style>
