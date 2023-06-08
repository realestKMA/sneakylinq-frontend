<script setup>
const props = defineProps({
    label: {type: String, default: "Label"},
    modelValue: {type: String},
})

const emit = defineEmits(["update:modelValue"])
</script>

<template>
    <main class="flex flex-col gap-2">

        <label :for="props.label" class="text-black text-lg">
            {{props.label}}
        </label>

        <input
            type="text"
            :value="props.modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :name="props.label"
            :id="props.label"
            class="w-full text-sm text-zinc-500 bg-white rounded-sm ring-1 ring-zinc-200 ring-offset-2
            p-2 duration-300 md:text-lg hover:ring-2 focus:outline-none focus:ring-2 focus:ring-black" />

    </main>
</template>