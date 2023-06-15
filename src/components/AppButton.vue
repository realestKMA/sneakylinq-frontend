<script setup>
const props = defineProps({
    label: {type: String, default: "Label"},
    type: {type: String, default: "button"},
    loading: {type: Boolean, default: false},
    disabled: {type: Boolean, default: false}
})

</script>


<template>
    <main class="w-full">

        <button
            :type="props.type"
            :disabled="props.disabled || props.loading"
            class="w-full bg-black p-3 text-sm text-white text-center rounded duration-300 md:text-base hover:shadow-lg hover:scale-105
            disabled:bg-black/20 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none">
            <p v-if="props.loading">Linqin please wait...</p>
            <p v-else>{{ props.label }}</p>
        </button>

    </main>
</template>