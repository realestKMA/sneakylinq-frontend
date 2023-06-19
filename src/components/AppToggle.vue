<script setup>

// props
const props = defineProps({
    label: {type: String},
    text: {type: String, default: "Loading"},
    disabled: {type: Boolean, default: false},
    enabled: {type: Boolean, default: false},
})

// emits
const emit = defineEmits(['click'])
</script>

<template>
    <main>

        <div
            :class="props.enabled ? 'bg-black':'bg-slate-200'"
            class="relative flex items-center w-24 h-8 rounded-full shadow-inner duration-300">

            <!-- text -->
            <span :class="props.enabled ? 'right-10':'right-4'" class="absolute top-[0.4rem] z-10 text-sm font-medium text-zinc-400 duration-1000">
                <slot name="text">Text</slot>
            </span>
            <!-- text -->

            
            <!-- button -->
            <button
                type="button"
                @click="emit('click')"
                :disabled="props.disabled"
                :class="props.enabled ? 'translate-x-16 bg-white':'translate-x-px bg-zinc-400'"
                class="w-8 h-8 rounded-full shadow transition-all duration-1000 flex items-center justify-center z-20 cursor-pointer disabled:cursor-not-allowed">
                <slot name="icon"></slot>
            </button>
            <!-- button -->

        </div>

        <!-- <input
            type="checkbox"
            :name="props.label"
            :id="props.label"
            :checked="props.modelValue"
            @change="$emit('update:modelValue', $event.target.checked)"
            class="hidden" /> -->

    </main>
</template>