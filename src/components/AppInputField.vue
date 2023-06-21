<script setup>
const props = defineProps({
    label: {type: String, default: "Label"},
    placeholder: {type: String, default: "Enter text..."},
    min: {type: String, default: "4"},
    max: {type: String, default: "15"},
    modelValue: {type: String},
    modelModifiers: { default: () => ({}) },
})

const emit = defineEmits(["update:modelValue"])

// methods
const emitValue = (event) => {
    let value = event.target.value;

    if (props.modelModifiers.lower) {
        value = value.toLowerCase();
    }

    emit('update:modelValue', value)
}
</script>

<template>
    <main class="flex flex-col gap-2">

        <label :for="props.label" class="text-black text-lg">
            {{props.label}}
        </label>

        <input
            type="text"
            :value="props.modelValue"
            @input="emitValue"
            :name="props.label"
            :id="props.label"
            :placeholder="props.placeholder"
            :minlength="props.min"
            :maxlength="props.max"
            autocomplete="off"
            class="w-full text-sm text-zinc-500 bg-white rounded-sm ring-1 ring-zinc-200 ring-offset-2
            p-2 duration-300 md:text-lg hover:ring-2 focus:outline-none focus:ring-2 focus:ring-black placeholder:text-zinc-200" />

    </main>
</template>