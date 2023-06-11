<script setup>
const props = defineProps({
    label: {type: String, default: "label"},
    placeholder: {type: String, default: "Enter text..."},
    modelValue: {type: String},
})

const emit = defineEmits(["update:modelValue"])
</script>

<template>
    <main class="flex flex-col gap-2">

        <textarea
            :name="props.label"
            :id="props.label"
            :placeholder="props.placeholder"
            cols="30"
            rows="1" 
            :value="props.modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="w-full text-sm text-zinc-500 bg-white resize-none rounded-md ring-1 ring-zinc-200 ring-offset-2 shadow-lg
            p-3 duration-300 placeholder:text-zinc-300 md:text-lg hover:ring-2 hover:shadow-cyan-200
            focus:outline-none focus:shadow-cyan-300 focus:ring-2">
        </textarea>

    </main>
</template>