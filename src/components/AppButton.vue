<script setup>
const props = defineProps({
    label: {type: String, default: "Label"},
    type: {type: String, default: "button"},
    loading: {type: Boolean, default: false},
    loadingText: {type: String, default: "Loading..."},
    disabled: {type: Boolean, default: false}
})

const emit = defineEmits(['click'])
</script>


<template>
    <main>

        <button
            :type="props.type"
            :disabled="props.disabled || props.loading"
            @click="emit('click')"
            class="w-full bg-black p-3 text-sm text-white text-center rounded duration-300 md:text-base hover:shadow-lg hover:scale-105
            disabled:bg-black/20 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none">
            <p v-if="props.loading">{{ props.loadingText }}</p>
            <p v-else>{{ props.label }}</p>
        </button>

    </main>
</template>