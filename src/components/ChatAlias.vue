<script setup>
import IconChat from './icons/IconChat.vue';
import IconCheck from './icons/IconCheck.vue';
import IconCloseSmall from './icons/IconCloseSmall.vue';
import IconTrashFull from './icons/IconTrashFull.vue';
import { ref } from 'vue';

// props
const props = defineProps({
    alias: {type: String, required: true}
})

// refs
const isDelete = ref(false)
</script>


<template>
    <main class="w-full">

        <button type="button" class="relative w-full flex items-center bg-transparent rounded duration-300 p-3 group hover:bg-zinc-800 md:p-2">
    
            <!-- situation actions -->
            <div class="duration-300">
                <IconTrashFull class="w-5 h-5 text-red-500" v-if="isDelete" />
                <IconChat v-else class="w-4 h-4 text-zinc-400 duration-300 group-hover:text-white" />
            </div>
            <!-- situation actions -->
    
            <!-- chat alias -->
            <p class="ml-3 lowercase text-zinc-400 text-base group-hover:text-white">{{ props.alias }}</p>
            <!-- chat alias -->
    
            <div class="duration-300 flex-grow flex items-center justify-end">
                <span v-if="isDelete" class="absolute flex items-center gap-x-4 bg-zinc-800/50 backdrop-blur-lg md:gap-x-2">
                    <button type="button">
                        <IconCheck class="w-6 h-6 text-zinc-400 duration-300 hover:text-white" />
                    </button>
                    <button type="button" @click="isDelete = false">
                        <IconCloseSmall class="w-6 h-6 text-zinc-400 duration-300 hover:text-white" />
                    </button>
                </span>

                <button v-else type="button" @click="isDelete = true">
                    <IconTrashFull class="w-5 h-5 text-zinc-400 duration-300 hover:text-white" />
                </button>
            </div>
    
        </button>

    </main>
</template>