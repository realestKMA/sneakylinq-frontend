<script setup>
const props = defineProps({
    label: {type: String, default: "label"},
    placeholder: {type: String, default: "Enter text..."},
    disabled: {type: Boolean, default: false},
    max: {type: String, default: 200},
    min: {type: String, default: 1},
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
            :disabled="props.disabled"
            :maxlength="props.max"
            :minlength="props.min"
            cols="30"
            rows="1"
            :value="props.modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="w-full text-sm text-zinc-500 bg-white resize-none rounded-md ring-1 ring-zinc-200 ring-offset-2 shadow-lg
            p-3 duration-300 placeholder:text-zinc-300 md:text-lg hover:ring-2 hover:shadow-zinc-200
            focus:outline-none focus:shadow-zinc-400 focus:ring-2 focus:ring-black disabled:cursor-not-allowed">
        </textarea>

    </main>
</template>