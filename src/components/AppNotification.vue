<script setup>
/* eslint-disable */
import IconCircleCheck from './icons/IconCircleCheck.vue';
import IconCloseSmall from './icons/IconCloseSmall.vue';

// emits
const emit = defineEmits(["closeBtnClicked"])
</script>

<template>
    <main class="rounded max-w-[20rem]">

        <div class="flex items-start justify-center gap-3 px-2 py-2 gap-x-7">

            <!-- icon -->
            <div class="flex items-center justify-center rounded-full">
                <slot name="icon">
                    <IconCircleCheck class="w-5 h-5 text-white" />
                </slot>
            </div>
            <!-- icon -->

            <div class="flex items-start justify-center gap-x-7">

                <span class="flex flex-col">
                    <p class="text-sm text-white font-medium">
                        <slot name="title">Notification title</slot>
                    </p>
                    <p class="text-sm text-zinc-500 md:text-sm">
                        <slot name="details"></slot>
                    </p>
                </span>

                <!-- close button -->
                <button type="button" @click.prevent="$emit('closeBtnClicked')">
                    <IconCloseSmall class="w-6 h-6 text-white" />
                </button>
                <!-- close button -->

            </div>


        </div>
    </main>
</template>