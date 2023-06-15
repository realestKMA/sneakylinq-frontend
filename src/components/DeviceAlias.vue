<script setup>
import { ref } from 'vue';
import IconMoreGridSmall from './icons/IconMoreGridSmall.vue';
import IconEditPencilLineOne from './icons/IconEditPencilLineOne.vue';
import IconLogOut from './icons/IconLogOut.vue';
import IconTrashFull from './icons/IconTrashFull.vue';
import { onClickOutside } from '@vueuse/core'
import { useBase } from '../stores/base';

// refs
const toggleMenu = ref(false)
const root = ref(null)

// stores
const useBaseStore = useBase()

// created
onClickOutside(root, () => toggleMenu.value = false)
</script>


<template>
    <main ref="root" class="relative bg-transparent w-full flex items-center space-x-2 px-4 py-6">

        <!-- alias initial logo -->
        <div class="bg-cyan-400 rounded-sm">
            <p class="font-roboto font-bold text-white text-xs px-2 py-1 uppercase">{{ useBaseStore.device.data.alias[0] }}</p>
        </div>
        <!-- alias initial logo -->


        <!-- alias -->
        <p class="lowercase font-semibold text-zinc-300">{{ useBaseStore.device.data.alias }}</p>
        <!-- alias -->

        <!-- menu button -->
        <div class="relative flex-grow flex justify-end items-center">
            <button type="button" @click="toggleMenu = !toggleMenu">
                <IconMoreGridSmall class="w-8 h-8 text-zinc-400 duration-500 hover:text-white" />
            </button>
        </div>
        <!-- menu button -->

        <!-- menu -->
        <Transition
            enter-from-class="opcaity-0 -translate-y-2"
            enter-active-class="duration-150"
            leave-to-class="opacity-0 -translate-y-2"
            leave-active-class="duration-150">
            <div v-if="toggleMenu" class="absolute z-30 top-20 left-1 w-11/12 h-auto bg-zinc-800 rounded-sm flex flex-col gap-y-10 justify-between shadow-xl shadow-zinc-800/50 md:left-px">

                <span class="inline-flex flex-col w-full">
                    <button type="button" class="w-full flex items-center gap-x-3 p-4 text-zinc-400 duration-300 hover:text-white hover:bg-zinc-900 md:p-3">
                        <IconTrashFull class="w-5 h-5" />
                        <p class="text-lg md:text-base">Clear all chat</p>
                    </button>
                    <button type="button" class="w-full flex items-center gap-x-3 p-4 text-zinc-400 duration-300 hover:text-white hover:bg-zinc-900 md:p-3">
                        <IconEditPencilLineOne class="w-5 h-5" />
                        <p class="text-lg md:text-base">Change alias</p>
                    </button>
                </span>

                <span class="inline-flex flex-col w-full border-t border-zinc-700">
                    <button type="button" @click="useBaseStore.disconnect = true" class="w-full flex items-center gap-x-3 p-4 text-zinc-400 duration-300 hover:text-white hover:bg-zinc-900 md:p-3">
                        <IconLogOut class="w-5 h-5" />
                        <p class="text-lg md:text-base">Log out</p>
                    </button>
                </span>
            </div>
        </Transition>
        <!-- menu -->

    </main>

</template>