<script setup>
const props = defineProps({
    strokeWidth: { type: String, default: "2" }
})
</script>


<template>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="System / Wifi_None">
            <path id="Vector"
                d="M11 18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18C13 17.4477 12.5523 17 12 17C11.4477 17 11 17.4477 11 18Z"
                stroke="currentColor" :stroke-width="props.strokeWidth" stroke-linecap="round" stroke-linejoin="round" />
        </g>
    </svg>
</template>