<script setup>
const props = defineProps({
    strokeWidth: {type: String, default: "2"}
})
</script>

<template>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Interface / Check">
            <path id="Vector" d="M6 12L10.2426 16.2426L18.727 7.75732" stroke="currentColor" :stroke-width="props.strokeWidth"
                stroke-linecap="round" stroke-linejoin="round" />
        </g>
    </svg>
</template>