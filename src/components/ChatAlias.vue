<script setup>
import { useRoute, useRouter } from 'vue-router';
import IconChat from './icons/IconChat.vue';
import IconCheck from './icons/IconCheck.vue';
import IconCloseSmall from './icons/IconCloseSmall.vue';
import IconTrashFull from './icons/IconTrashFull.vue';
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useChatP2P } from '../stores/chatp2p';

// props
const props = defineProps({
    alias: {type: String, required: true, default: 'Alias'},
    did: {type: String, required: true}
})

// emits
const emit = defineEmits(['clicked-main', 'clicked-delete'])

// router & route
const route = useRoute()
const router = useRouter()

// stores
const useChatP2PStore = useChatP2P()

// refs
const isDelete = ref(false)
const root = ref(null)

// created hook (implicit)
onClickOutside(root, () => isDelete.value = false)
</script>


<template>
    <main class="w-full relative" ref="root">

        <button
            @click="emit('clicked-main')"
            type="button"
            :class="route.params.did == props.did ? 'bg-zinc-800':'bg-transparent'"
            class="relative w-full flex items-center rounded duration-300 p-3 group hover:bg-zinc-800 md:p-2">
    
            <!-- situation actions -->
            <div class="duration-300">
                <IconTrashFull class="w-5 h-5 text-red-500" v-if="isDelete" />
                <IconChat
                    v-else
                    :class="route.params.did == props.did ? 'text-white':'text-zinc-400'"
                    class="w-4 h-4 duration-300 group-hover:text-white" />
            </div>
            <!-- situation actions -->
    
            <!-- chat alias -->
            <p
                :class="route.params.did == props.did ? 'text-white':'text-zinc-400'"
                class="ml-3 lowercase text-base group-hover:text-white">{{ props.alias }}</p>
            <!-- chat alias -->
    
            
        </button>
        
        <div
            v-if="route.params.did == props.did"
            :class="isDelete ? 'top-[0.77rem] md:top-[0.55rem]':'top-[0.90rem] md:top-[0.6rem]'"
            class="absolute right-2 duration-300 flex-grow flex items-center justify-end">
            
            <span v-if="isDelete" class="flex items-center gap-x-4 bg-zinc-800/50 backdrop-blur-lg md:gap-x-2">
                <button type="button" @click="emit('clicked-delete')">
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

    </main>
</template>