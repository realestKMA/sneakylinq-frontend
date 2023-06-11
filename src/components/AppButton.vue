<script setup>
const props = defineProps({
    label: {type: String, default: "Label"},
    type: {type: String, default: "button"},
    disabled: {type: Boolean, default: false}
})

const emit = defineEmits(['click'])
</script>


<template>
    <main class="w-full">

        <button
            :type="props.type"
            :disabled="props.disabled"
            class="w-full bg-black p-3 text-sm text-white text-center rounded duration-300 md:text-base hover:shadow-lg hover:scale-105
            disabled:bg-black/50 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none">
            {{ props.label }}
        </button>

    </main>
</template>